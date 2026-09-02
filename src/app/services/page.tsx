import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ServiceAccordion from '@/components/services/ServiceAccordion'
import { services } from '@/data/services'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'From market understanding to brand building and growth activation, we bring strategy and execution together across 9 service areas.',
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section style={{ paddingTop: 'clamp(7rem, 14vw, 11rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
          <div className="container-site">
            <span className="section-label">What We Offer</span>
            <h1 className="section-title text-display" style={{ marginBottom: '1.25rem' }}>OUR SERVICES</h1>
            <p className="section-body" style={{ maxWidth: '50ch' }}>
              From market understanding to brand building and growth activation,
              we bring strategy and execution together.
            </p>
          </div>
        </section>

        {/* Accordion */}
        <section style={{ padding: 'clamp(1rem, 3vw, 2rem) 0 clamp(3rem, 6vw, 5rem)', background: 'var(--bg-primary)' }}>
          <div className="container-site">
            <ServiceAccordion services={services} />
          </div>
        </section>

        {/* CTA */}
        <div className="cta-banner" style={{ background: 'var(--bg-secondary)' }}>
          <h2 className="cta-banner__title">HAVE A BUSINESS CHALLENGE IN MIND?</h2>
          <div className="cta-banner__actions">
            <Link href="/contact" className="btn-primary">Start a Conversation →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
