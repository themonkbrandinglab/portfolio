'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const steps = [
  { number: '01', title: 'UNDERSTAND', items: ['Market', 'Audience', 'Category', 'Business challenge'] },
  { number: '02', title: 'POSITION', items: ['Opportunity', 'Differentiation', 'Value', 'Strategic direction'] },
  { number: '03', title: 'CREATE', items: ['Brand', 'Content', 'Creative', 'Digital experience'] },
  { number: '04', title: 'ACTIVATE', items: ['Campaigns', 'Creators', 'Performance', 'Digital channels'] },
  { number: '05', title: 'OPTIMIZE', items: ['Measure', 'Learn', 'Experiment', 'Improve'] },
]

export default function HowWeThink() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const rm = useReducedMotion()

  return (
    <section
      ref={ref}
      style={{ padding: 'clamp(4rem, 10vw, 8rem) 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}
      aria-labelledby="how-we-think-heading"
    >
      <div className="container-site">
        {/* Heading */}
        <motion.div
          initial={rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.8, ease }}
          style={{ marginBottom: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          <span className="section-label">Methodology</span>
          <h2 id="how-we-think-heading" className="section-title text-heading">HOW WE THINK</h2>
        </motion.div>

        {/* Steps */}
        <div>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="think-step"
              initial={rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 1.0, ease, delay: i * 0.1 }}
            >
              <span className="think-step__num">{step.number}</span>
              <div className="think-step__body">
                <p className="think-step__title">{step.title}</p>
                <div className="think-step__tags">
                  {step.items.map((item) => (
                    <span key={item} className="think-step__tag">{item}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
