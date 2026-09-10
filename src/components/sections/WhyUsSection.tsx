'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const services = [
  {
    number: '01',
    title: 'STRATEGIZE',
    body: 'We understand the business, market, customers and opportunities before creating a plan.',
  },
  {
    number: '02',
    title: 'POSITION',
    body: 'We help brands find a clear position in the market so people understand who they are, what they offer and why they should choose them.',
  },
  {
    number: '03',
    title: 'GROW ORGANICALLY',
    body: 'We create content and growth systems designed to build genuine attention, trust and long-term audience growth.',
  },
  {
    number: '04',
    title: 'BUILD COMMUNITIES',
    body: 'We help transform audiences into communities by creating meaningful experiences, conversations and stronger customer relationships.',
  },
]

export default function WhyUsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const rm = useReducedMotion()

  const fadeUp = (delay = 0) => ({
    initial: rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 },
    transition: { duration: 1, ease, delay },
  })

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        padding: 'var(--section-pad) 0',
      }}
      aria-label="Why us section"
    >
      <div className="container-site">

        {/* WHY US */}
        <div style={{ maxWidth: '64rem', marginBottom: 'var(--space-lg)' }}>
          <motion.span className="section-label" {...fadeUp(0)}>
            Why Us?
          </motion.span>

          <motion.h2
            className="section-title text-display"
            style={{ marginBottom: 'var(--space-sm)' }}
            {...fadeUp(0.1)}
          >
            WE DON&apos;T BELIEVE GROWTH COMES<br />
            FROM POSTING CONTENT.
          </motion.h2>

          <motion.p
            className="section-body"
            style={{ maxWidth: '56ch', fontSize: 'var(--body-lg)' }}
            {...fadeUp(0.2)}
          >
            We help brands build a strategic system for growth — one that understands
            the market, the customer and the opportunity before anything else.
          </motion.p>
        </div>

        {/* WHAT WE DO */}
        <motion.span
          className="section-label"
          {...fadeUp(0.35)}
          style={{ display: 'block', marginBottom: 'var(--space-sm)' }}
        >
          What We Do
        </motion.span>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.number}
              {...fadeUp(0.4 + i * 0.08)}
              style={{
                padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 2rem) clamp(1.5rem, 3vw, 2.5rem) 0',
                borderRight: i < services.length - 1 ? '1px solid var(--border-color)' : 'none',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <span style={{ fontSize: 'var(--label-sm)', letterSpacing: '0.2em', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem' }}>
                {s.number}
              </span>
              <h3 style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif', fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '0.875rem', textTransform: 'uppercase' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 'var(--body-md)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* APPROACH */}
        <motion.div
          {...fadeUp(0.7)}
          style={{
            marginTop: 'var(--space-md)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            background: 'var(--bg-secondary)',
          }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>
            Our Approach
          </span>
          <p style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif', fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 300, letterSpacing: '0.03em', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '1rem' }}>
            Business Strategy &#8594; Brand Positioning &#8594; Organic Growth &#8594; Community &#8594; Long-Term Scale
          </p>
          <p style={{ fontSize: 'var(--body-md)', color: 'var(--text-secondary)', maxWidth: '52ch' }}>
            We don&apos;t just manage pages. We help build brands that people trust, follow and want to be part of.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

