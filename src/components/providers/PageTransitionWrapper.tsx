'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const overlay = {
  initial: { opacity: 1 },
  enter: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 },
  },
}

const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isFirst = useRef(true)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    isFirst.current = false
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative w-full min-h-screen">
        
        {/* The White Overlay */}
        <motion.div
          className="fixed inset-0 z-[100] bg-[var(--bg-primary)] pointer-events-none"
          initial={isFirst.current ? 'initial' : 'enter'}
          animate="exit"
          exit="enter"
          variants={overlay}
        />

        {/* Page Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageVariants}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
