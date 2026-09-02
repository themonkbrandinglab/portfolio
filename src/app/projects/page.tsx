import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProjectGrid from '@/components/projects/ProjectGrid'
import { projects } from '@/data/projects'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected strategic explorations and brand thinking across technology, SaaS, consumer and service businesses.',
}

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section style={{ paddingTop: 'clamp(7rem, 14vw, 11rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
          <div className="container-site">
            <span className="section-label">Selected Strategic Explorations</span>
            <h1 className="section-title text-display" style={{ marginBottom: '1.25rem' }}>
              SELECTED<br />PROJECTS
            </h1>
            <p className="section-body" style={{ maxWidth: '50ch' }}>
              Strategic explorations and brand thinking across technology, SaaS,
              consumer and service businesses.
            </p>
          </div>
        </section>

        {/* Project grid */}
        <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 0', background: 'var(--bg-primary)' }}>
          <div className="container-site">
            <ProjectGrid projects={projects} />
          </div>
        </section>

        {/* CTA */}
        <div className="cta-banner" style={{ background: 'var(--bg-secondary)' }}>
          <p className="section-label">Have a Business Challenge?</p>
          <h2 className="cta-banner__title">LET&apos;S THINK TOGETHER.</h2>
          <div className="cta-banner__actions">
            <Link href="/contact" className="btn-primary">Start a Conversation →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
