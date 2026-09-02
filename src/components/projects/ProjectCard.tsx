'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { Project } from '@/types'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project
  index: number
  inView: boolean
}) {
  const rm = useReducedMotion()

  return (
    <motion.article
      initial={rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.85, ease, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="project-card"
        aria-label={`${project.company} — ${project.tagline}`}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >

        {/* ── Logo area ── */}
        <div className="project-card__logo-wrap">
          {project.logo && (
            <img 
              src={project.logo} 
              alt={`${project.company} logo`} 
              className="project-card__logo-img"
            />
          )}
        </div>

        <div className="project-card__content-wrap">
          {/* ── Number ── */}
          <div className="project-card__num" aria-hidden="true">{project.number}</div>

          {/* ── Brand name ── */}
          <h3 className="project-card__company">{project.company}</h3>

          {/* ── Context badge ── */}
          <p className="project-card__context">{project.companyContext}</p>

          {/* ── Category ── */}
          <p className="project-card__category">
            <span className="project-card__category-line" aria-hidden="true">│</span> {project.category}
          </p>

          {/* ── Tagline ── */}
          <p className="project-card__tagline">{project.tagline}</p>
        </div>

        {/* ── CTA ── */}
        <div className="project-card__cta">
          <span>Explore Project</span>
          <span className="project-card__cta-arrow" aria-hidden="true">
            →
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
