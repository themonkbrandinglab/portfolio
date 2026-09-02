/**
 * POST /api/contact
 *
 * Architecture:
 *   ContactForm → /api/contact → Google Apps Script → Google Sheet
 *
 * The Google Apps Script URL is stored server-side in GOOGLE_SHEETS_WEBHOOK_URL.
 * It is never exposed to the browser.
 */

import { NextRequest, NextResponse } from 'next/server'

// ── Types ────────────────────────────────────────────────────────────────────

interface ContactPayload {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
}

// ── Validation helpers ────────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  // RFC 5321 practical check
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

const LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  company: 150,
  service: 100,
  message: 5000,
} as const

function enforce(value: string | undefined, limit: number): string {
  return (value ?? '').trim().slice(0, limit)
}

function validate(body: ContactPayload): string | null {
  if (!body.name?.trim()) return 'Name is required.'
  if (body.name.trim().length > LIMITS.name) return 'Name is too long.'

  if (!body.email?.trim()) return 'Email address is required.'
  if (!isValidEmail(body.email.trim())) return 'Please enter a valid email address.'
  if (body.email.trim().length > LIMITS.email) return 'Email address is too long.'

  if (!body.message?.trim()) return 'Project details are required.'
  if (body.message.trim().length > LIMITS.message) return 'Project details are too long (max 5,000 characters).'

  if (!body.service?.trim()) return 'Please select an area of interest.'

  return null // valid
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body safely
    let body: ContactPayload
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid request format.' }, { status: 400 })
    }

    // Server-side validation
    const validationError = validate(body)
    if (validationError) {
      return NextResponse.json({ success: false, message: validationError }, { status: 400 })
    }

    // Sanitize — enforce length limits
    const sanitized = {
      name:    enforce(body.name,    LIMITS.name),
      email:   enforce(body.email,   LIMITS.email),
      phone:   enforce(body.phone,   LIMITS.phone),
      company: enforce(body.company, LIMITS.company),
      service: enforce(body.service, LIMITS.service),
      message: enforce(body.message, LIMITS.message),
    }

    // Development logging (no sensitive data in production logs)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Contact] Submission from:', sanitized.email, '| Service:', sanitized.service)
    }

    // ── Forward to Google Apps Script ─────────────────────────────────────────
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    if (!webhookUrl) {
      // No webhook configured — log and return success in dev, fail gracefully in prod
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Contact] GOOGLE_SHEETS_WEBHOOK_URL not set. Lead not forwarded.')
        return NextResponse.json(
          { success: true, message: 'Message received. We will be in touch soon.' },
          { status: 200 }
        )
      }
      console.error('[Contact] GOOGLE_SHEETS_WEBHOOK_URL is not configured.')
      return NextResponse.json(
        { success: false, message: 'Our contact system is temporarily unavailable. Please email us directly.' },
        { status: 503 }
      )
    }

    // POST to Apps Script with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10_000) // 10s timeout

    let sheetsResponse: Response
    try {
      sheetsResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitized),
        signal: controller.signal,
      })
    } catch (err: unknown) {
      clearTimeout(timeoutId)
      const isTimeout = err instanceof Error && err.name === 'AbortError'
      console.error('[Contact] Google Apps Script unreachable:', isTimeout ? 'Timeout' : err)
      return NextResponse.json(
        { success: false, message: 'Something went wrong. Please try again or email us directly.' },
        { status: 502 }
      )
    } finally {
      clearTimeout(timeoutId)
    }

    // Parse Apps Script response
    let sheetsResult: { success: boolean; message?: string }
    try {
      sheetsResult = await sheetsResponse.json()
    } catch {
      console.error('[Contact] Apps Script returned non-JSON response.')
      return NextResponse.json(
        { success: false, message: 'Something went wrong. Please try again.' },
        { status: 502 }
      )
    }

    if (!sheetsResult.success) {
      console.error('[Contact] Apps Script reported failure:', sheetsResult.message)
      return NextResponse.json(
        { success: false, message: 'Something went wrong. Please try again.' },
        { status: 502 }
      )
    }

    // ── Success ────────────────────────────────────────────────────────────────
    return NextResponse.json(
      { success: true, message: 'Message received. We will be in touch soon.' },
      { status: 200 }
    )
  } catch (err) {
    console.error('[Contact] Unexpected error:', err)
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 })
}
