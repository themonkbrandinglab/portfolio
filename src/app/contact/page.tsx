import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Have a business challenge, brand idea or growth opportunity? Let's talk with the.monkbranding.lab.",
}

const socialIcons = [
  {
    name: 'LinkedIn', href: null,
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    name: 'Instagram', href: 'https://www.instagram.com/the.monkbranding.lab?igsi=enRjdXB2cmx4dzVk',
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>,
  },
  {
    name: 'Facebook', href: null,
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
]

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section style={{ paddingTop: 'clamp(7rem, 14vw, 11rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
          <div className="container-site">
            <span className="section-label">Get in Touch</span>
            <h1 className="section-title text-display" style={{ maxWidth: '18ch', marginBottom: '1.25rem' }}>
              LET&apos;S BUILD SOMETHING<br />WORTH REMEMBERING.
            </h1>
            <p className="section-body" style={{ maxWidth: '44ch' }}>
              Have a business challenge, brand idea or growth opportunity? Let&apos;s talk.
            </p>
          </div>
        </section>

        {/* Main */}
        <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 0', background: 'var(--bg-primary)' }}>
          <div className="container-site">
            <div className="contact-grid">
              {/* Form */}
              <div>
                <ContactForm />
              </div>

              {/* Info sidebar */}
              <aside style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div>
                  <span className="section-label" style={{ marginBottom: '0.875rem' }}>Email</span>
                  <a href="mailto:themonkbrandinglab@gmail.com" className="contact-email-link">
                    themonkbrandinglab@gmail.com
                  </a>
                </div>

                <div>
                  <span className="section-label" style={{ marginBottom: '1rem' }}>Follow the Studio</span>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {socialIcons.map(icon => (
                      icon.href ? (
                        <a
                          key={icon.name}
                          href={icon.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon-link"
                          aria-label={`Visit our ${icon.name} page`}
                          title={`Follow us on ${icon.name}`}
                          style={{ color: 'var(--text-primary)', transition: 'color 0.3s' }}
                        >
                          {icon.svg}
                        </a>
                      ) : (
                        <span
                          key={icon.name}
                          className="social-icon-placeholder"
                          aria-label={`${icon.name} — coming soon`}
                          title={`${icon.name} — link coming soon`}
                        >
                          {icon.svg}
                        </span>
                      )
                    ))}
                  </div>
                  <p style={{ marginTop: '0.875rem', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    {socialIcons.some(i => !i.href) ? 'Additional social profiles coming soon.' : ''}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                  <p style={{ fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Strategy · Brand · Growth
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
