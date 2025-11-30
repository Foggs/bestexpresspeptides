import { NextRequest, NextResponse } from 'next/server'

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number }
}

const store: RateLimitStore = {}

export function rateLimit(
  request: NextRequest,
  limit: number = 100,
  windowMs: number = 60000,
): { success: boolean; remaining: number } {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const key = `${ip}`
  const now = Date.now()

  if (!store[key]) {
    store[key] = { count: 1, resetTime: now + windowMs }
    return { success: true, remaining: limit - 1 }
  }

  const record = store[key]

  if (now > record.resetTime) {
    record.count = 1
    record.resetTime = now + windowMs
    return { success: true, remaining: limit - 1 }
  }

  record.count++

  if (record.count > limit) {
    return { success: false, remaining: 0 }
  }

  return { success: true, remaining: limit - record.count }
}

export function getRateLimitHeaders(remaining: number, limit: number) {
  return {
    'RateLimit-Limit': limit.toString(),
    'RateLimit-Remaining': remaining.toString(),
    'RateLimit-Reset': new Date(Date.now() + 60000).toISOString(),
  }
}
