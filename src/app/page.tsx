import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/hero/Hero'
import ManifestoSection from '@/components/sections/ManifestoSection'
import HowWeThink from '@/components/sections/HowWeThink'
import CapabilitySection from '@/components/sections/CapabilitySection'
import ProcessSection from '@/components/sections/ProcessSection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'the.monkbranding.lab — Brand, Strategy & Growth',
  description: 'A strategy-led brand and growth studio helping ambitious businesses understand their market, sharpen their positioning and build meaningful connections with their audience.',
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <ManifestoSection />
        <HowWeThink />
        <CapabilitySection />
        <ProcessSection />

        {/* CTA Banner */}
        <div className="cta-banner">
          <p className="section-label" style={{ marginBottom: '1.5rem' }}>Ready to Begin?</p>
          <h2 className="cta-banner__title">
            LET&apos;S BUILD SOMETHING<br />
            WORTH REMEMBERING.
          </h2>
          <div className="cta-banner__actions">
            <Link href="/contact" className="btn-primary">Start a Conversation</Link>
            <Link href="/projects" className="btn-outline">View Our Work</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
