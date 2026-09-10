'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const tiers = [
  {
    color: '#22c55e',
    emoji: 'green',
    name: 'BASIC',
    subtitle: 'FOUNDATION',
    features: [
      'Onboarding & Review Calls',
      'Research',
      'Scripting, Editing & Shoot',
      'Social Media Management',
      'Campaign Support',
      '4 Posts / Month',
      '8 Stories / Month',
      'Monthly Reports',
      'Revisions',
    ],
    bonus: 'Profile Optimization Checklist',
  },
  {
    color: '#3b82f6',
    emoji: 'blue',
    name: 'GROWTH',
    subtitle: 'BUILD & GROW',
    recommended: true,
    features: [
      'Everything in Basic, plus:',
      'Detailed Brand & Competitor Research',
      'Content Strategy & Monthly Calendar',
      '8 Posts / Reels per Month',
      '12-16 Stories / Month',
      'Campaign Strategy & Management',
      'Caption, CTA & Content Optimization',
      'Performance Analysis & Growth Insights',
      'Monthly Strategy Review Call',
    ],
    bonus: 'Personal Branding Strategy',
  },
  {
    color: '#ef4444',
    emoji: 'red',
    name: 'SCALE',
    subtitle: 'STRATEGY & AUTHORITY',
    features: [
      'Everything in Growth, plus:',
      'Complete GTM Strategy',
      'Advanced Market & Audience Research',
      'Personal Brand Positioning',
      '12-16 Premium Posts / Reels',
      '20+ Stories / Month',
      'High-Level Campaign Planning & Execution',
      'Growth Experiments & Content Optimization',
      'A/B Testing of Content / Campaign Ideas',
      'Detailed Analytics & Monthly Growth Report',
      'Priority Revisions & Strategic Consultation',
    ],
    bonus: 'Complete Brand Growth Roadmap',
  },
]

export default function ServiceTiers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const rm = useReducedMotion()

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        padding: 'var(--section-pad) 0',
      }}
      aria-label="Service packages"
    >
      <div className="container-site">

        <motion.span
          className="section-label"
          initial={rm ? {} : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          style={{ display: 'block', marginBottom: '1rem' }}
        >
          Service Packages
        </motion.span>

        <motion.h2
          className="section-title text-display"
          initial={rm ? {} : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          style={{ marginBottom: 'var(--space-md)' }}
        >
          CHOOSE YOUR<br />GROWTH PATH.
        </motion.h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            border: '1px solid var(--border-color)',
          }}
        >
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={rm ? {} : { opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, ease, delay: 0.2 + i * 0.12 }}
              style={{
                padding: 'clamp(2rem, 4vw, 3rem)',
                borderRight: i < tiers.length - 1 ? '1px solid var(--border-color)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                background: tier.recommended ? 'var(--bg-secondary)' : 'transparent',
              }}
            >
              {/* Recommended badge */}
              {tier.recommended && (
                <span style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  fontSize: '0.5rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-color)',
                  padding: '0.25rem 0.5rem',
                }}>
                  Recommended
                </span>
              )}

              {/* Dot + Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: tier.color, flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--label-sm)', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {tier.name}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-sm)',
                lineHeight: 1.1,
              }}>
                {tier.subtitle}
              </h3>

              {/* Feature list */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 auto 0', flex: 1 }}>
                {tier.features.map((f) => (
                  <li key={f} style={{
                    fontSize: 'var(--body-md)',
                    color: f.startsWith('Everything') ? 'var(--text-muted)' : 'var(--text-secondary)',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    fontStyle: f.startsWith('Everything') ? 'italic' : 'normal',
                  }}>
                    {!f.startsWith('Everything') && (
                      <span style={{ color: tier.color, flexShrink: 0, marginTop: '0.1em' }}>—</span>
                    )}
                    {f}
                  </li>
                ))}
              </ul>

              {/* Bonus */}
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
              }}>
                <span style={{ fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem' }}>
                  Bonus
                </span>
                <span style={{ fontSize: 'var(--body-md)', color: 'var(--text-primary)', fontWeight: 500 }}>
                  {tier.bonus}
                </span>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '1.5rem',
                  padding: '0.875rem 1.25rem',
                  background: tier.recommended ? 'var(--text-primary)' : 'transparent',
                  color: tier.recommended ? 'var(--bg-primary)' : 'var(--text-primary)',
                  border: '1px solid var(--text-primary)',
                  fontSize: 'var(--label-sm)',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  fontWeight: 500,
                }}
                className="arrow-hover-container"
              >
                Get Started <span className="arrow">&#8594;</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pricing note */}
        <motion.p
          initial={rm ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
          style={{
            marginTop: '2rem',
            fontSize: 'var(--label-sm)',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            textAlign: 'center',
          }}
        >
          Pricing is customised to your business needs. Start a conversation to find the right fit.
        </motion.p>

      </div>
    </section>
  )
}

