'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import MobileMenu from './MobileMenu'

const navLinks = [
  { label: 'Services',  href: '/services'  },
  { label: 'Why Us',    href: '/#why-us'   },
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
          borderBottom: scrolled
            ? '1px solid rgba(0,0,0,0.10)'
            : '1px solid rgba(0,0,0,0.06)',
          background: scrolled
            ? 'rgba(250,250,250,0.96)'
            : 'rgba(250,250,250,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transition: 'background 0.4s var(--ease-premium), border-color 0.4s var(--ease-premium)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 'var(--content-max)',
            margin: '0 auto',
            paddingLeft: 'var(--page-gutter)',
            paddingRight: 'var(--page-gutter)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 'var(--header-height)',
          }}
        >

          {/* Logo */}
          <Link href="/" aria-label="the.monkbranding.lab home" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Image
              src="/brand/monk-logo.png"
              alt="the.monkbranding.lab"
              width={709}
              height={238}
              priority
              style={{
                height: 40,
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="header__nav">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="header__nav-link"
                  style={{
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    borderBottom: isActive ? '1px solid var(--text-primary)' : '1px solid transparent',
                    paddingBottom: '2px',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}

            {/* CTA — solid black border, fills black on hover */}
            <Link href="/contact" className="header__cta">
              Start a Conversation
            </Link>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="header__burger"
          >
            <span style={{ display: 'block', width: 22, height: 1, background: 'var(--text-primary)' }} />
            <span style={{ display: 'block', width: 14, height: 1, background: 'var(--text-primary)' }} />
          </button>

        </div>
      </header>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} links={navLinks} />}
      </AnimatePresence>
    </>
  )
}
