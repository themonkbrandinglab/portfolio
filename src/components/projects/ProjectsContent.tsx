'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const brands = [
  { name: 'Adobe',     logo: '/projects/adobe/logo.png'     },
  { name: 'Zoho',      logo: '/projects/zoho/logo.png'      },
  { name: 'Zepto',     logo: '/projects/zepto/logo.png'     },
  { name: 'SkinFirst', logo: '/projects/skinfirst/logo.png' },
  { name: 'Myntra',    logo: '/projects/myntra/logo.png'    },
  { name: 'Nykaa',     logo: '/projects/nykaa/logo.png'     },
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
      if ((window as any).instgrm) (window as any).instgrm.Embeds.process()
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
      <style>{`
        .reels-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--border-color);
        }
        @media (max-width: 640px) {
          .reels-grid { grid-template-columns: 1fr; }
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

        /* Logo grid */
        .logo-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border-color);
        }
        @media (max-width: 768px) {
          .logo-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 480px) {
          .logo-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Logo image — grayscale + dim by default, full colour on hover */
        .logo-cell {
          background: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1.5rem, 3vw, 2rem);
          height: 140px;
          transition: background 0.35s var(--ease-premium);
          cursor: default;
        }
        .logo-cell:hover {
          background: var(--bg-secondary);
        }
        .logo-img {
          width: auto;
          height: 48px;
          max-width: 100%;
          object-fit: contain;
          filter: grayscale(1);
          opacity: 0.4;
          transition: filter 0.4s var(--ease-premium), opacity 0.4s var(--ease-premium);
          display: block;
        }
        .logo-cell:hover .logo-img {
          filter: grayscale(0);
          opacity: 1;
        }
        /* SkinFirst has more detail — give it slightly more height */
        .logo-img--skinfirst {
          height: 40px;
        }
        /* Zoho icon is square — constrain width too */
        .logo-img--zoho {
          height: 52px;
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

      {/* Logo Grid */}
      <section
        ref={brandsRef}
        style={{ padding: 'var(--section-pad) 0', borderBottom: '1px solid var(--border-color)' }}
      >
        <div className="container-site">
          <div className="logo-grid">
            {brands.map((brand, i) => {
              const slug = brand.name.toLowerCase().replace(/\s/g, '')
              return (
                <motion.div
                  key={brand.name}
                  className="logo-cell"
                  initial={rm ? {} : { opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, ease, delay: i * 0.07 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={`logo-img logo-img--${slug}`}
                  />
                </motion.div>
              )
            })}
          </div>

          <p style={{ marginTop: '1.75rem', fontSize: 'var(--label-sm)', letterSpacing: '0.12em', color: 'var(--text-muted)', textAlign: 'center' }}>
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
