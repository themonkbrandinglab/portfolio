import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProjectNavigation from '@/components/projects/ProjectNavigation'
import { projects, getProjectBySlug, getAllProjectSlugs } from '@/data/projects'
import Link from 'next/link'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.company} — ${project.title}`,
    description: project.challenge,
  }
}

// ── Section wrapper ─────────────────────────────────────────────────────────
function CaseSection({
  label,
  children,
  noBorder,
}: {
  label: string
  children: React.ReactNode
  noBorder?: boolean
}) {
  return (
    <div className="project-section" style={noBorder ? { borderBottom: 'none' } : {}}>
      <span className="project-section__label">{label}</span>
      <div className="project-section__content">{children}</div>
    </div>
  )
}

// ── Focus tag list ───────────────────────────────────────────────────────────
function FocusList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.875rem',
            fontSize: 'clamp(0.9375rem, 1.6vw, 1.125rem)',
            color: 'var(--text-primary)',
            fontWeight: 300,
            lineHeight: 1.55,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'rgba(192,192,192,0.45)',
              marginTop: '0.55em',
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const S = project!

  return (
    <>
      <Header />
      <main id="main-content">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          style={{
            paddingTop: 'clamp(6.5rem, 14vw, 11rem)',
            paddingBottom: 'clamp(3.5rem, 8vw, 6rem)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'var(--bg-primary)',
          }}
        >
          <div className="container-site">

            {/* top row: project + number + back link */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '4rem',
              }}
            >
              <span 
                style={{ 
                  fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                  fontSize: 'clamp(0.6875rem, 1.5vw, 0.75rem)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                PROJECT
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem' }}>{S.number}</span>
              </span>
              <Link href="/projects" className="back-link">← All Projects</Link>
            </div>

            {/* Logo mark */}
            {S.logo && (
              <div style={{ marginBottom: '2.5rem', opacity: 0.95 }}>
                <img 
                  src={S.logo} 
                  alt={`${S.company} logo`} 
                  style={{
                    width: 'auto',
                    maxWidth: '200px',
                    height: 'clamp(48px, 6vw, 64px)',
                    objectFit: 'contain',
                    mixBlendMode: 'lighten'
                  }}
                />
              </div>
            )}

            {/* Company name */}
            <h1
              className="section-title text-display"
              style={{ 
                marginBottom: '1rem',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                color: 'rgba(255,255,255,0.95)',
                lineHeight: 1.1
              }}
            >
              {S.company}
            </h1>

            {/* Title / subtitle */}
            <p
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 300,
                lineHeight: 1.45,
                maxWidth: '56ch',
                marginBottom: '2.5rem'
              }}
            >
              {S.title}
            </p>

            {/* Category */}
            <span
              style={{ 
                fontSize: 'clamp(0.625rem, 1.5vw, 0.6875rem)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                display: 'block'
              }}
            >
              {S.category}
            </span>

          </div>
        </section>

        {/* ── BODY ──────────────────────────────────────────────────────── */}
        <div style={{ background: 'var(--bg-primary)' }}>
          <div className="container-site">

            {/* 01 — About the Brand */}
            <CaseSection label="About the Brand">
              <p>{S.aboutBrand}</p>
            </CaseSection>

            {/* 02 — The Challenge */}
            <CaseSection label="The Challenge">
              <p>{S.challenge}</p>
            </CaseSection>

            {/* 03 — The Insight (conditional) */}
            {S.insight && (
              <CaseSection label="The Insight">
                <p>{S.insight}</p>
              </CaseSection>
            )}

            {/* 04 — Our Strategic Focus */}
            <CaseSection label="Our Strategic Focus">
              <FocusList items={S.strategicFocus} />
            </CaseSection>

            {/* 05 — What We Explored */}
            <CaseSection label="What We Explored">
              <p>{S.exploration}</p>
            </CaseSection>

            {/* 06 — Strategic Direction (pull-quote block, conditional) */}
            {S.strategicDirection && (
              <div
                style={{
                  padding: 'clamp(3rem, 6vw, 5rem) 0',
                  borderBottom: '1px solid var(--border-color)',
                  borderTop: '1px solid var(--border-color)',
                  margin: '0 0',
                }}
              >
                <span className="section-label">Strategic Direction</span>
                <h2
                  className="section-title text-heading"
                  style={{ maxWidth: '22ch', marginBottom: 0 }}
                >
                  {S.strategicDirection}
                </h2>
              </div>
            )}

            {/* 07 — The Outcome (conditional) */}
            {S.outcome && (
              <CaseSection label="The Outcome">
                <p>{S.outcome}</p>
              </CaseSection>
            )}

            {/* 08 — Strategic Takeaway */}
            <CaseSection label="Strategic Takeaway" noBorder>
              <blockquote className="project-takeaway">
                &ldquo;{S.takeaway}&rdquo;
              </blockquote>
            </CaseSection>
          </div>
        </div>

        {/* ── NAVIGATION ────────────────────────────────────────────────── */}
        <ProjectNavigation prevSlug={S.prevSlug} nextSlug={S.nextSlug} projects={projects} />

      </main>
      <Footer />
    </>
  )
}
