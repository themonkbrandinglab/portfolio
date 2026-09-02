'use client'

import { useState } from 'react'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const serviceOptions = [
  'Go-To-Market Strategy',
  'Brand & Positioning',
  'Performance Marketing',
  'Social Media & Content',
  'Influencer & Creator Marketing',
  'UGC & Social Proof',
  'Website Development & Digital Experience',
  'Community & Growth',
  'Growth Intelligence',
  'Not sure yet',
]

const EMPTY: FormData = { name: '', email: '', phone: '', company: '', service: '', message: '' }

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(EMPTY)
  const [status, setStatus]     = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return  // prevent duplicate submission

    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json().catch(() => ({}))

      if (res.ok && data.success) {
        setStatus('success')
        setFormData(EMPTY)
      } else {
        setStatus('error')
        setErrorMsg(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Unable to send. Please email us directly at themonkbrandinglab@gmail.com')
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div style={{ padding: '4rem 0' }}>
        <div
          style={{
            width: 48,
            height: 48,
            border: '1px solid rgba(192,192,192,0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4 10l4 4 8-8"
              stroke="var(--chrome)"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-geist-sans),system-ui,sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: '0.875rem',
          }}
        >
          Thank you. We&apos;ve received your enquiry.
        </h2>
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            marginBottom: '2rem',
            maxWidth: '42ch',
          }}
        >
          We&apos;ll review the details and get back to you.
        </p>
        <button
          onClick={() => setStatus('idle')}
          style={{
            fontSize: '0.5625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            background: 'none',
            border: 'none',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '2px',
            cursor: 'pointer',
            transition: 'color 0.2s',
          }}
        >
          Send another message
        </button>
      </div>
    )
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  const isSubmitting = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

      {/* Name */}
      <div className="form-field">
        <label htmlFor="name" className="form-label">Name *</label>
        <input
          id="name" name="name" type="text" required
          autoComplete="name" placeholder="Your full name"
          value={formData.name} onChange={handleChange}
          className="form-input" maxLength={100}
          disabled={isSubmitting}
        />
      </div>

      {/* Email */}
      <div className="form-field">
        <label htmlFor="email" className="form-label">Email *</label>
        <input
          id="email" name="email" type="email" required
          autoComplete="email" placeholder="your@email.com"
          value={formData.email} onChange={handleChange}
          className="form-input" maxLength={254}
          disabled={isSubmitting}
        />
      </div>

      {/* Phone */}
      <div className="form-field">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input
          id="phone" name="phone" type="tel"
          autoComplete="tel" placeholder="+91 00000 00000"
          value={formData.phone} onChange={handleChange}
          className="form-input" maxLength={30}
          disabled={isSubmitting}
        />
      </div>

      {/* Company */}
      <div className="form-field">
        <label htmlFor="company" className="form-label">Company</label>
        <input
          id="company" name="company" type="text"
          autoComplete="organization" placeholder="Your company or brand"
          value={formData.company} onChange={handleChange}
          className="form-input" maxLength={150}
          disabled={isSubmitting}
        />
      </div>

      {/* Service */}
      <div className="form-field">
        <label htmlFor="service" className="form-label">Area of Interest *</label>
        <select
          id="service" name="service" required
          value={formData.service} onChange={handleChange}
          className="form-input" disabled={isSubmitting}
        >
          <option value="">Select a service area</option>
          {serviceOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="form-field">
        <label htmlFor="message" className="form-label">Project Details *</label>
        <textarea
          id="message" name="message" required rows={5}
          placeholder="Tell us about your business challenge, brand idea or growth opportunity."
          value={formData.message} onChange={handleChange}
          className="form-input" style={{ resize: 'none' }}
          maxLength={5000} disabled={isSubmitting}
        />
      </div>

      {/* Error message */}
      {status === 'error' && (
        <p role="alert" style={{ fontSize: '0.8125rem', color: '#f87171', lineHeight: 1.6 }}>
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
          aria-busy={isSubmitting}
          style={{
            opacity: isSubmitting ? 0.6 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? 'Sending…' : 'Start a Conversation →'}
        </button>
      </div>
    </form>
  )
}
