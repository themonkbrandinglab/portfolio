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
  { name: 'Myntra', logo: '/projects/myntra/logo.png' },
  { name: 'Nykaa', logo: '/projects/nykaa/logo.png' },
]

const reels = [
  'https://www.instagram.com/reel/DZ7dXvyTT4-/',
  'https://www.instagram.com/reel/DZUqjH9yLwT/',
  'https://www.instagram.com/reel/DTGD8uwFF07/',
  'https://www.instagram.com/reel/DaC5YnXJS6q/',
]

function InstagramReels() {
  useEffect(() => {
    const existing = document.getElementById('instagram-embed-script')
    if (existing) {
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
  }, [])

  return (
    <>
      {/* Uniform card grid CSS injected inline */}
      <style>{`
        .reels-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--border-color);
        }
        @media (max-width: 640px) {
          .reels-grid {
            grid-template-columns: 1fr;
          }
        }
        .reel-cell {
          background: var(--bg-primary);
          overflow: hidden;
          aspect-ratio: 9 / 16;
          position: relative;
        }
        .reel-cell .instagram-media,
        .reel-cell iframe {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
          height: 100% !important;
          min-width: unset !important;
          margin: 0 !important;
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }
      `}</style>

      <div className="reels-grid">
        {reels.map((url, i) => (
          <motion.div
            key={url}
            className="reel-cell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: i * 0.1 }}
          >
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
              data-instgrm-version="14"
              style={{
                background: 'var(--bg-secondary)',
                border: 'none',
                borderRadius: 0,
                boxShadow: 'none',
                margin: 0,
                padding: 0,
                width: '100%',
              }}
            />
          </motion.div>
        ))}
      </div>
    </>
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

      {/* Logo Grid — 3 columns desktop, 2 tablet, 1 mobile */}
      <section
        ref={brandsRef}
        style={{ padding: 'var(--section-pad) 0', borderBottom: '1px solid var(--border-color)' }}
      >
        <div className="container-site">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: 'var(--border-color)',
            }}
            className="logo-grid"
          >
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={rm ? {} : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                style={{
                  background: 'var(--bg-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'clamp(2rem, 4vw, 3.5rem)',
                  gap: '1.25rem',
                  height: '180px',
                  transition: 'background 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
                whileHover={{ background: 'var(--bg-secondary)' }}
              >
                <div style={{ width: '100%', maxWidth: '130px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {brand.logo.includes('nykaa') ? (
                    /* Nykaa placeholder until logo is uploaded */
                    <span style={{ fontSize: 'var(--label-sm)', letterSpacing: '0.3em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>NYKAA</span>
                  ) : (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={130}
                      height={44}
                      style={{ objectFit: 'contain', width: '100%', height: '100%', mixBlendMode: 'multiply' }}
                      className="brand-logo-img"
                    />
                  )}
                </div>
                <span style={{ fontSize: 'var(--label-sm)', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {brand.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Responsive override for logo grid */}
          <style>{`
            @media (max-width: 768px) { .logo-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 480px) { .logo-grid { grid-template-columns: 1fr !important; } }
          `}</style>

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
