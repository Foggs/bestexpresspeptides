import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function verifyAdminAuth(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return { valid: false, user: null }
    }

    const token = authHeader.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any

    if (!decoded.isAdmin) {
      return { valid: false, user: null }
    }

    return { valid: true, user: decoded }
  } catch (error) {
    return { valid: false, user: null }
  }
}

export function createUnauthorizedResponse() {
  return NextResponse.json(
    { error: "Unauthorized: Admin authentication required" },
    { status: 401 }
  )
}
