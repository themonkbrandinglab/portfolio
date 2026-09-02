import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProcessSection from '@/components/sections/ProcessSection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'the.monkbranding.lab is a strategy-led brand and growth studio focused on helping businesses understand their market, sharpen their positioning and build meaningful connections with their audience.',
}

const manifesto = [
  'INSIGHT BEFORE EXECUTION.',
  'STRATEGY BEFORE NOISE.',
  'RELEVANCE BEFORE REACH.',
  'CREATIVITY WITH PURPOSE.',
]

const journey = ['INSIGHT', 'STRATEGY', 'POSITIONING', 'CREATIVE', 'EXPERIENCE', 'ACTIVATION', 'GROWTH']

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section style={{ paddingTop: 'clamp(7rem, 14vw, 11rem)', paddingBottom: 'clamp(3rem, 8vw, 6rem)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
          <div className="container-site">
            <span className="section-label">About the Studio</span>
            <h1 className="section-title text-display" style={{ maxWidth: '14ch', marginBottom: '2rem' }}>
              WE THINK<br />BEFORE<br />WE MAKE.
            </h1>
            <p className="section-body" style={{ maxWidth: '52ch' }}>
              THE.MONKBRANDING.LAB is a strategy-led brand and growth studio
              focused on helping businesses understand their market, sharpen
              their positioning and build meaningful connections with their audience.
            </p>
          </div>
        </section>

        {/* What we bring */}
        <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
          <div className="container-site">
            <div className="project-section" style={{ borderBottom: 'none', padding: 0 }}>
              <span className="project-section__label">What We Bring Together</span>
              <p style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.625rem)', color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.55 }}>
                We bring together market intelligence, brand strategy, creative
                thinking, digital experience and growth systems to move from
                insight to execution.
              </p>
            </div>
          </div>
        </section>

        {/* Manifesto lines */}
        <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
          <div className="container-site">
            <span className="section-label">What We Believe</span>
            <div style={{ marginTop: '2rem' }}>
              {manifesto.map((statement) => (
                <div key={statement} className="manifesto-line">{statement}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey */}
        <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
          <div className="container-site">
            <span className="section-label">The Journey</span>
            <div className="journey-flow" style={{ marginTop: '2rem' }}>
              {journey.map((step, i) => (
                <span key={step} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className="journey-step">{step}</span>
                  {i < journey.length - 1 && <span className="journey-arrow" aria-hidden="true">→</span>}
                </span>
              ))}
            </div>
          </div>
        </section>

        <ProcessSection />

        {/* CTA */}
        <div className="cta-banner">
          <h2 className="cta-banner__title">
            LET&apos;S BUILD SOMETHING<br />WORTH REMEMBERING.
          </h2>
          <div className="cta-banner__actions">
            <Link href="/contact" className="btn-primary">Start a Conversation →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
