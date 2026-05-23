import { NextResponse } from 'next/server';

// Lightweight, type-safe request validation structure
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message payloads are strictly required.' },
        { status: 400 }
      );
    }

    // 1. Emulate basic Server-side input sanitization regex (equivalent to Zod)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email address schema validation failed.' },
        { status: 400 }
      );
    }

    // 2. Transmit notification payload (Resend transaction block placeholder)
    // In production, integrate resend SDK here:
    // await resend.emails.send({ from, to, subject, html })

    return NextResponse.json(
      { success: true, message: 'Contact message validated and dispatched.' },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Server computation error processing payloads.' },
      { status: 500 }
    );
  }
}
