'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (shouldReduceMotion) return
    const onMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    const onScroll = () => {
      if (heroRef.current) {
        setScrollY(Math.min(window.scrollY / heroRef.current.offsetHeight, 1))
      }
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
    }
  }, [shouldReduceMotion])

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <section ref={heroRef} className="hero" aria-label="Hero section">
      {/* 3D Canvas */}
      <div className="hero__canvas-wrap" aria-hidden="true">
        <Scene
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          scrollProgress={scrollY}
          reducedMotion={shouldReduceMotion ?? false}
        />
      </div>

      {/* Gradient veil for text readability */}
      <div className="hero__veil" aria-hidden="true" />

      {/* Content */}
      <div className="hero__content">
        {/* Label */}
        <motion.p
          className="hero__label"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease, delay: 0.5 }}
        >
          Strategy · Brand · Growth
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="hero__headline"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.65 }}
        >
          WE BUILD{' '}
          <span className="text-gradient-chrome">BRANDS</span>
          <br />
          THAT EARN
          <br />
          ATTENTION.
        </motion.h1>

        {/* Body */}
        <motion.p
          className="hero__body"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.85 }}
        >
          We combine market intelligence, brand strategy, creative thinking
          and growth systems to help ambitious businesses find their edge
          and turn it into growth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.05 }}
        >
          <Link href="/projects" className="btn-primary">
            Explore Our Work
          </Link>
          <Link href="/contact" className="btn-outline">
            Start a Conversation
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        aria-hidden="true"
      >
        <span className="hero__scroll-label">Scroll</span>
        <div className="hero__scroll-line" />
      </motion.div>
    </section>
  )
}
