'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import MobileMenu from './MobileMenu'

const navLinks = [
  { label: 'Services',  href: '/services'  },
  { label: 'Projects',  href: '/projects'  },
  { label: 'About',     href: '/about'     },
  { label: 'Contact',   href: '/contact'   },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          // ── 5. Border extremely subtle, disappears when not scrolled
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
          background: scrolled
            ? 'rgba(10,10,10,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
          transition: 'background 0.45s ease, border-color 0.45s ease, backdrop-filter 0.45s ease',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1440,
            marginLeft: 'auto',
            marginRight: 'auto',
            // ── 1. Left/right margin: 48px desktop, fluid on smaller screens
            paddingLeft:  'clamp(1.25rem, 3.5vw, 3rem)',
            paddingRight: 'clamp(1.25rem, 3.5vw, 3rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            // ── 1. Header height: 88px
            height: 88,
          }}
        >

          {/* ── Logo ────────────────────────────────────────────────────────
              mix-blend-mode: lighten makes the JPG's black background
              invisible against the dark page — logo integrates cleanly.
              Width: ~120px, height auto.
          ── */}
          <Link href="/" aria-label="the.monkbranding.lab — home">
            <Image
              src="/brand/monk-logo.jpg"
              alt="the.monkbranding.lab"
              width={240}
              height={80}
              priority
              style={{
                width: 120,         /* ── 1. 110–130px target */
                height: 'auto',
                display: 'block',
                // ── 1. Remove visible black box — black pixels become transparent
                mixBlendMode: 'lighten',
              }}
            />
          </Link>

          {/* ── Desktop navigation ───────────────────────────────────────── */}
          <nav
            aria-label="Main navigation"
            style={{ display: 'flex', alignItems: 'center', gap: '2.75rem' }} /* ── 4. Generous spacing */
            className="header__nav"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '0.625rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    // ── 3. 65–75% white default, 100% on hover
                    color: isActive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.68)',
                    transition: 'color 0.25s ease',
                    borderBottom: isActive
                      ? '1px solid rgba(255,255,255,0.3)'
                      : '1px solid transparent',
                    paddingBottom: 2,
                  }}
                  className="nav-link-hover"
                >
                  {link.label}
                </Link>
              )
            })}

            {/* ── 2. CTA: START A CONVERSATION ── */}
            <Link
              href="/contact"
              className="header__cta"
              style={{
                fontSize: '0.5625rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: '0.5625rem 1.25rem',
                border: '1px solid rgba(255,255,255,0.22)',
                color: 'rgba(255,255,255,0.75)',
                background: 'transparent',
                transition: 'background 0.25s ease, color 0.25s ease, border-color 0.25s ease',
                whiteSpace: 'nowrap',
              }}
            >
              Start a Conversation
            </Link>
          </nav>

          {/* ── Mobile burger ────────────────────────────────────────────── */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="header__burger"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            <span style={{ display: 'block', width: 22, height: 1, background: 'rgba(255,255,255,0.8)' }} />
            <span style={{ display: 'block', width: 14, height: 1, background: 'rgba(255,255,255,0.8)' }} />
          </button>

        </div>
      </header>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} links={navLinks} />}
      </AnimatePresence>
    </>
  )
}
