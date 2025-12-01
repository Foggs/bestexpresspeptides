import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { rateLimit, getRateLimitHeaders } from "@/lib/rate-limit"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
})

export async function POST(request: NextRequest) {
  const rateLimitResult = rateLimit(request, 50, 60000)
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many checkout requests. Please try again later." },
      { 
        status: 429,
        headers: getRateLimitHeaders(rateLimitResult.remaining, 50),
      }
    )
  }

  try {
    const body = await request.json()
    const { items, email, shippingAddress, coupon } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 })
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.name} - ${item.variantName}`,
          description: "For Research Use Only",
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }))

    const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)
    const shipping = subtotal >= 20000 ? 0 : 1500
    const discount = coupon ? coupon.discount : 0

    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping",
            description: "Standard shipping (2-3 business days)",
          },
          unit_amount: shipping,
        },
        quantity: 1,
      })
    }

    if (discount > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `Discount (${coupon.code})`,
            description: "Coupon applied",
          },
          unit_amount: -discount,
        },
        quantity: 1,
      })
    }

    const host = request.headers.get("host")
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
    const baseUrl = `${protocol}://${host}`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      customer_email: email,
      metadata: {
        items: JSON.stringify(items.map((item: any) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        }))),
        shippingAddress: JSON.stringify(shippingAddress),
        couponCode: coupon?.code || "",
        discount: discount.toString(),
      },
    })

    return NextResponse.json({ url: session.url }, {
      headers: getRateLimitHeaders(rateLimitResult.remaining, 50),
    })
  } catch (error) {
    console.error("Checkout error:", error)
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { error: "Error creating checkout session", details: message },
      { 
        status: 500,
        headers: getRateLimitHeaders(rateLimitResult.remaining, 50),
      }
    )
  }
}
