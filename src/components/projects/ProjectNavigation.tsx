import Link from 'next/link'
import type { Project } from '@/types'

function getProjectBySlug(projects: Project[], slug?: string) {
  if (!slug) return null
  return projects.find((p) => p.slug === slug) || null
}

export default function ProjectNavigation({ prevSlug, nextSlug, projects }: { prevSlug?: string; nextSlug?: string; projects: Project[] }) {
  const prev = getProjectBySlug(projects, prevSlug)
  const next = getProjectBySlug(projects, nextSlug)

  return (
    <nav className="project-nav" aria-label="Project navigation">
      <div className="project-nav__grid">
        <div>
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="project-nav__link" aria-label={`Previous: ${prev.company}`}>
              <span className="project-nav__dir">← Previous</span>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Project {prev.number}</span>
              <span className="project-nav__company">{prev.company}</span>
            </Link>
          ) : <div style={{ padding: 'clamp(1.5rem,4vw,3rem)' }} />}
        </div>
        <div>
          {next ? (
            <Link href={`/projects/${next.slug}`} className="project-nav__link" aria-label={`Next: ${next.company}`}>
              <span className="project-nav__dir">Next →</span>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Project {next.number}</span>
              <span className="project-nav__company">{next.company}</span>
            </Link>
          ) : <div style={{ padding: 'clamp(1.5rem,4vw,3rem)' }} />}
        </div>
      </div>
      <Link href="/projects" className="project-nav__back">All Projects</Link>
    </nav>
  )
}
