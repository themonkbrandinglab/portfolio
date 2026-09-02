'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Props {
  onClose: () => void
  links: { label: string; href: string }[]
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function MobileMenu({ onClose, links }: Props) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 1 }}
      animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
      exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem clamp(1.25rem, 5vw, 4rem)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <span style={{ fontSize: '0.5625rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          Navigation
        </span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'color 0.2s, border-color 0.2s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem clamp(1.25rem, 5vw, 4rem)',
        }}
        aria-label="Mobile navigation"
      >
        {links.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.55, ease, delay: 0.15 + i * 0.07 }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              style={{
                display: 'block',
                padding: '1.125rem 0',
                fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                fontSize: 'clamp(2.25rem, 8vw, 4.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                borderBottom: '1px solid var(--border-color)',
                transition: 'color 0.25s ease',
                lineHeight: 1,
              }}
              className="mobile-menu__link"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.15 + links.length * 0.07 + 0.1 }}
          style={{ marginTop: '2.5rem' }}
        >
          <Link
            href="/contact"
            onClick={onClose}
            className="btn-primary"
            style={{ display: 'inline-flex' }}
          >
            Start a Conversation →
          </Link>
        </motion.div>
      </nav>

      <p style={{ padding: '1.25rem clamp(1.25rem, 5vw, 4rem)', fontSize: '0.5625rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
        Strategy · Brand · Growth
      </p>
    </motion.div>
  )
}
