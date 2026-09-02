'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const capabilities = [
  {
    number: '01', title: 'Strategy',
    description: 'Market understanding, positioning, go-to-market planning and customer insight.',
    services: ['Go-To-Market Strategy', 'Brand & Positioning', 'Growth Intelligence'],
  },
  {
    number: '02', title: 'Demand & Influence',
    description: 'Performance marketing, creator partnerships, UGC and social media systems.',
    services: ['Performance Marketing', 'Influencer & Creator Marketing', 'UGC & Social Proof', 'Social Media & Content'],
  },
  {
    number: '03', title: 'Brand Experience',
    description: 'Brand identity, digital experience, website design and development.',
    services: ['Brand & Positioning', 'Website Development & Digital Experience'],
  },
  {
    number: '04', title: 'Growth Systems',
    description: 'Community building, retention, growth loops and intelligence reporting.',
    services: ['Community & Growth', 'Growth Intelligence'],
  },
]

export default function CapabilitySection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const rm = useReducedMotion()

  return (
    <section
      ref={ref}
      style={{ padding: 'clamp(4rem, 10vw, 8rem) 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}
      aria-labelledby="capabilities-heading"
    >
      <div className="container-site">
        {/* Heading + link */}
        <motion.div
          initial={rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.8, ease }}
          style={{ marginBottom: 'clamp(2.5rem, 6vw, 5rem)', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}
        >
          <div>
            <span className="section-label">Our Capability System</span>
            <h2 id="capabilities-heading" className="section-title text-heading">WHAT WE DO</h2>
          </div>
          <Link href="/services" className="view-all-link">
            View All Services →
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="cap-grid">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.number}
              className="cap-card"
              initial={rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 1.0, ease, delay: i * 0.1 }}
            >
              <div className="cap-card__num">{cap.number}</div>
              <h3 className="cap-card__title">{cap.title}</h3>
              <p className="cap-card__desc">{cap.description}</p>
              <ul className="cap-card__services">
                {cap.services.map((s) => (
                  <li key={s} className="cap-card__service">
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--chrome-lo)', flexShrink: 0, display: 'inline-block' }} aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
