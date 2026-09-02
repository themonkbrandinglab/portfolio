'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const processSteps = [
  { number: '01', title: 'Understand', description: 'Understand the market, audience, category and business challenge.' },
  { number: '02', title: 'Position', description: 'Identify the opportunity, differentiation and strategic direction.' },
  { number: '03', title: 'Create', description: 'Translate strategy into brand, content and digital experiences.' },
  { number: '04', title: 'Activate', description: 'Bring strategy into the market through campaigns, creators, digital experiences and growth channels.' },
  { number: '05', title: 'Optimize', description: 'Measure, learn, experiment and improve.' },
]

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const rm = useReducedMotion()

  return (
    <section
      ref={ref}
      style={{ padding: 'clamp(4rem, 10vw, 8rem) 0', background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}
      aria-labelledby="how-we-work-heading"
    >
      <div className="container-site">
        <motion.div
          initial={rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.8, ease }}
          style={{ marginBottom: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          <span className="section-label">Process</span>
          <h2 id="how-we-work-heading" className="section-title text-heading">HOW WE WORK</h2>
        </motion.div>

        <div className="process-grid">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              className="process-step"
              initial={rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 1.0, ease, delay: i * 0.1 }}
            >
              <div className="process-step__num">{step.number}</div>
              <h3 className="process-step__title">{step.title}</h3>
              <p className="process-step__desc">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
