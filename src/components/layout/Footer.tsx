'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const navCols = [
  {
    label: 'Pages',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Projects', href: '/projects' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'Services',
    links: [
      { label: 'Brand Strategy', href: '/services' },
      { label: 'Performance Marketing', href: '/services' },
      { label: 'Social & Content', href: '/services' },
      { label: 'Website & Digital', href: '/services' },
      { label: 'Growth Intelligence', href: '/services' },
    ],
  },
  {
    label: 'Contact',
    links: [
      { label: 'Start a Project', href: '/contact' },
      { label: 'themonkbrandinglab@gmail.com', href: 'mailto:themonkbrandinglab@gmail.com' },
    ],
  },
]

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const year = new Date().getFullYear()

  return (
    <footer ref={ref} className="footer">
      <div className="container-site">

        {/* BIG CTA section at top of footer */}
        <div className="footer__cta">
          <motion.h2
            className="footer__cta-headline"
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1.1, ease }}
          >
            Ready to build something<br />
            <em>worth remembering?</em>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}
          >
            <Link href="/contact" className="btn-primary">
              Start a Conversation →
            </Link>
            <Link href="/services" className="btn-outline">
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* Middle: brand + nav columns */}
        <div className="footer__mid">
          {/* Brand col */}
          <motion.div
            className="footer__brand-col"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.05 }}
          >
            <Link href="/">
              <Image
                src="/brand/monk-logo.jpg"
                alt="the.monkbranding.lab"
                width={120}
                height={40}
                className="footer__logo-img"
                style={{ height: 'auto' }}
              />
            </Link>
            <span className="footer__tagline">Strategy · Brand · Growth</span>
            <p className="footer__desc">
              A strategy-led brand and growth studio helping ambitious businesses find their edge and turn it into growth.
            </p>
          </motion.div>

          {/* Nav columns */}
          {navCols.map((col, ci) => (
            <motion.div
              key={col.label}
              className="footer__col"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.0, ease, delay: 0.1 + ci * 0.08 }}
            >
              <span className="footer__col-label">{col.label}</span>
              {col.links.map((l) => (
                <Link key={l.href + l.label} href={l.href} className="footer__nav-link">
                  {l.label}
                </Link>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">© {year} the.monkbranding.lab. All rights reserved.</p>
          <a href="mailto:themonkbrandinglab@gmail.com" className="footer__email-link">
            themonkbrandinglab@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}
