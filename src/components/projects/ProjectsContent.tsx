'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const brands = [
  { name: 'Adobe', logo: '/projects/adobe/logo.png' },
  { name: 'Zoho', logo: '/projects/zoho/logo.png' },
  { name: 'Zepto', logo: '/projects/zepto/logo.png' },
  { name: 'SkinFirst Clinic', logo: '/projects/skinfirst/logo.png' },
]

const reels = [
  'https://www.instagram.com/reel/DZ7dXvyTT4-/',
  'https://www.instagram.com/reel/DZUqjH9yLwT/',
  'https://www.instagram.com/reel/DTGD8uwFF07/',
  'https://www.instagram.com/reel/DaC5YnXJS6q/',
]

function InstagramReels() {
  useEffect(() => {
    // Load Instagram embed script
    const existing = document.getElementById('instagram-embed-script')
    if (existing) {
      // If script already loaded, re-process embeds
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process()
      }
      return
    }
    const script = document.createElement('script')
    script.id = 'instagram-embed-script'
    script.src = '//www.instagram.com/embed.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)
    return () => {
      // Don't remove — keep loaded for SPA navigation
    }
  }, [])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 'var(--space-sm)',
        alignItems: 'start',
      }}
    >
      {reels.map((url, i) => (
        <motion.div
          key={url}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: i * 0.1 }}
          style={{ width: '100%', minHeight: '480px' }}
        >
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
            data-instgrm-version="14"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 0,
              boxShadow: 'none',
              margin: 0,
              maxWidth: '100%',
              minWidth: '280px',
              padding: 0,
              width: '100%',
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default function ProjectsContent() {
  const brandsRef = useRef(null)
  const inView = useInView(brandsRef, { once: true, margin: '-10% 0px' })
  const rm = useReducedMotion()

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 'clamp(7rem, 14vw, 11rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container-site">
          <motion.span
            className="section-label"
            initial={rm ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            Strategic Explorations
          </motion.span>
          <motion.h1
            className="section-title text-display"
            initial={rm ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            style={{ marginBottom: '1.25rem' }}
          >
            BRANDS WE&apos;VE<br />STUDIED DEEPLY.
          </motion.h1>
          <motion.p
            className="section-body"
            initial={rm ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            style={{ maxWidth: '50ch' }}
          >
            We analyse the market, the customers and the competitive landscape
            to identify what makes brands grow. These are some of the companies we have explored.
          </motion.p>
        </div>
      </section>

      {/* Logo Grid */}
      <section
        ref={brandsRef}
        style={{ padding: 'var(--section-pad) 0', borderBottom: '1px solid var(--border-color)' }}
      >
        <div className="container-site">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1px',
              background: 'var(--border-color)',
            }}
          >
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={rm ? {} : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                style={{
                  background: 'var(--bg-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'clamp(2.5rem, 5vw, 4rem)',
                  gap: '1.25rem',
                  minHeight: '160px',
                  cursor: 'default',
                }}
                whileHover={{ background: 'var(--bg-secondary)' }}
              >
                <div style={{ width: '100%', maxWidth: '140px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={140}
                    height={48}
                    style={{ objectFit: 'contain', width: '100%', height: '100%', mixBlendMode: 'multiply' }}
                    className="brand-logo-img"
                  />
                </div>
                <span style={{ fontSize: 'var(--label-sm)', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {brand.name}
                </span>
              </motion.div>
            ))}
          </div>

          <p style={{ marginTop: '2rem', fontSize: 'var(--label-sm)', letterSpacing: '0.12em', color: 'var(--text-muted)', textAlign: 'center' }}>
            Strategic explorations — independent market research and brand analysis.
          </p>
        </div>
      </section>

      {/* Instagram Reels */}
      <section style={{ padding: 'var(--section-pad) 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container-site">
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>
            Growth Reels
          </span>
          <h2 className="section-title text-display" style={{ marginBottom: 'var(--space-md)' }}>
            OUR LATEST<br />THINKING.
          </h2>

          <InstagramReels />

          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <a
              href="https://www.instagram.com/themonkbrandinglab"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline arrow-hover-container"
              style={{ display: 'inline-flex' }}
            >
              Follow on Instagram <span className="arrow">&#8594;</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-banner">
        <p className="section-label" style={{ marginBottom: '1rem' }}>Have a Business Challenge?</p>
        <h2 className="cta-banner__title">LET&apos;S THINK TOGETHER.</h2>
        <div className="cta-banner__actions">
          <Link href="/contact" className="btn-primary arrow-hover-container">
            Start a Conversation <span className="arrow">&#8594;</span>
          </Link>
        </div>
      </div>
    </>
  )
}
