'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function ManifestoSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const rm = useReducedMotion()

  const fadeUp = (delay = 0) => ({
    initial: rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 },
    transition: { duration: 1, ease, delay },
  })

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 12vw, 9rem) 0',
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        overflow: 'hidden',
      }}
      aria-label="Manifesto section"
    >
      {/* Background ghost word */}
      <div className="manifesto__ghost" aria-hidden="true">THINK</div>

      <div className="container-site">
        <div style={{ maxWidth: '72rem' }}>
          <motion.span className="section-label" {...fadeUp(0)}>
            Our Philosophy
          </motion.span>

          <motion.h2
            className="section-title text-display"
            style={{ marginBottom: '1.5rem' }}
            {...fadeUp(0.12)}
          >
            GROWTH DOESN&apos;T<br />
            START WITH AN AD.
          </motion.h2>

          <motion.p
            style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.75rem)',
              color: 'var(--text-secondary)',
              fontWeight: 300,
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
              marginBottom: '2rem',
              maxWidth: '56ch',
            }}
            {...fadeUp(0.24)}
          >
            IT STARTS WITH UNDERSTANDING THE MARKET,
            THE CUSTOMER AND THE OPPORTUNITY.
          </motion.p>

          <motion.p
            className="section-body"
            style={{ maxWidth: '46ch' }}
            {...fadeUp(0.36)}
          >
            We look beyond campaigns and channels to understand what makes
            people choose, trust and remember a brand.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
