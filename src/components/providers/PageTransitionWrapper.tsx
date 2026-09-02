'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

// Curtain variants — a full-screen black panel that wipes IN then OUT
const curtain = {
  // Page is about to leave — curtain slides up covering screen
  initial: { y: '100%' },
  // Curtain fully covers screen
  enter: {
    y: '0%',
    transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
  // Curtain exits upward revealing new page
  exit: {
    y: '-100%',
    transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.05 },
  },
}

// Page content — fades in after curtain exits
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isFirst = useRef(true)

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo({ top: 0 })
    isFirst.current = false
  }, [pathname])

  return (
    <>
      {/* Curtain overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`curtain-${pathname}`}
          variants={curtain}
          initial="initial"
          animate="exit"  // immediately exits = just slides through
          exit="enter"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#0a0a0a',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Studio name shown on curtain */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
              fontSize: '0.5625rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            the.monkbranding.lab
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
