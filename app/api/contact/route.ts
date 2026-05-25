// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactEmail } from '@/services/email/sendEmail'

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters.').max(80),
  email:   z.string().email({ message: 'Invalid email address.' }),  // ✅ fixed deprecation
  subject: z.string().max(120).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(5000),
})

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now  = Date.now()
  const data = rateLimitMap.get(ip)
  if (!data || now > data.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 })
    return false
  }
  if (data.count >= 5) return true
  data.count++
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })
  }

  let body: unknown
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }) }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Validation failed.'
    return NextResponse.json({ error: message }, { status: 422 })
  }

  try {
    await sendContactEmail(parsed.data)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Email error:', err)
    return NextResponse.json({ error: 'Failed to send message. Try again.' }, { status: 500 })
  }
}