import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { rateLimit, getRateLimitHeaders } from "@/lib/rate-limit"
import { sendContactFormEmail } from "@/lib/contactEmail"

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .max(254, "Email is too long"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message is too long (max 5000 characters)"),
})

export async function POST(request: NextRequest) {
  const rateLimitResult = rateLimit(request, RATE_LIMIT, RATE_WINDOW_MS)
  const headers = getRateLimitHeaders(rateLimitResult.remaining, RATE_LIMIT)

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429, headers },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400, headers },
    )
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    return NextResponse.json(
      { error: firstIssue?.message ?? "Invalid form data." },
      { status: 400, headers },
    )
  }

  try {
    const result = await sendContactFormEmail(parsed.data)
    if (!result.success) {
      console.error("Contact form send failed:", result.error)
      return NextResponse.json(
        { error: "We couldn't send your message right now. Please try again later or email support@bestexpresspeptides.com directly." },
        { status: 500, headers },
      )
    }

    return NextResponse.json({ success: true }, { headers })
  } catch (error) {
    console.error("Contact form unexpected error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500, headers },
    )
  }
}
