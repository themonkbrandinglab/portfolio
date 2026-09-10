'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  const { scrollY } = useScroll()

  // Smooth scroll translations for layered depth
  const smoothScroll = useSpring(scrollY, { damping: 30, stiffness: 100, mass: 1 })
  const yHeadline = useTransform(smoothScroll, [0, 1000], [0, 150]) // 0.15x
  const yBackground = useTransform(smoothScroll, [0, 1000], [0, 50])  // 0.05x

  useEffect(() => {
    if (shouldReduceMotion) return
    const onMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [shouldReduceMotion])

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const loaderDelay = 1.6 // Wait for PremiumLoader to clear

  return (
    <section ref={heroRef} className="hero" aria-label="Hero section" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* BACKGROUND LAYER (0.05x parallax) */}
      <motion.div style={{ y: shouldReduceMotion ? 0 : yBackground }} className="absolute inset-0 pointer-events-none z-0">
        {/* Gradient veil for text readability */}
        <div className="hero__veil" aria-hidden="true" />
      </motion.div>

      {/* OBJECT LAYER (1.0x scroll / handled internally by Scene, plus mouse parallax) */}
      <div className="hero__canvas-wrap z-10" aria-hidden="true">
        <Scene
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          scrollProgress={0}
          reducedMotion={shouldReduceMotion ?? false}
        />
      </div>

      {/* FOREGROUND TYPOGRAPHY LAYER (0.15x parallax) */}
      <motion.div 
        style={{ y: shouldReduceMotion ? 0 : yHeadline }} 
        className="hero__content z-20 relative container-site editorial-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: loaderDelay }}
      >
        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Label */}
          <div className="mask-container" style={{ marginBottom: '2.5rem' }}>
            <motion.p
              className="hero__label mask-element"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.0, ease, delay: loaderDelay + 0.1 }}
              style={{ marginBottom: 0 }}
            >
              Strategy · Brand · Growth
            </motion.p>
          </div>

          {/* Headline - Line by Line Mask Reveal */}
          <h1 className="hero__headline text-display" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
            <div className="mask-container"><motion.span className="mask-element" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.2, ease, delay: loaderDelay + 0.2 }}>WE BUILD</motion.span></div>
            <div className="mask-container"><motion.span className="mask-element text-gradient-chrome" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.2, ease, delay: loaderDelay + 0.3 }}>STRATEGIC SYSTEMS</motion.span></div>
            <div className="mask-container"><motion.span className="mask-element" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.2, ease, delay: loaderDelay + 0.4 }}>FOR GROWTH.</motion.span></div>
          </h1>

          {/* Body */}
          <motion.p
            className="hero__body text-secondary"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: loaderDelay + 0.6 }}
          >
            We combine market intelligence, brand strategy, creative thinking
            and growth systems to help ambitious businesses find their edge
            and turn it into growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease, delay: loaderDelay + 0.8 }}
          >
            <Link href="/projects" className="btn-primary arrow-hover-container">
              Explore Our Work <span className="arrow">→</span>
            </Link>
            <Link href="/contact" className="btn-outline link-hover">
              Start a Conversation
            </Link>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: loaderDelay + 1.2 }}
        aria-hidden="true"
      >
        <span className="hero__scroll-label">Scroll</span>
        <div className="hero__scroll-line" />
      </motion.div>
    </section>
  )
}
