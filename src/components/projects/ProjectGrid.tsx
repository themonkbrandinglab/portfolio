'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import type { Project } from '@/types'
import ProjectCard from './ProjectCard'

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <div ref={ref} className="project-grid" role="list" aria-label="Selected strategic explorations">
      {projects.map((project, i) => (
        <div key={project.slug} role="listitem">
          <ProjectCard project={project} index={i} inView={inView} />
        </div>
      ))}
    </div>
  )
}
