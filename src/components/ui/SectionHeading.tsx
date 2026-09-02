'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  large?: boolean
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = false,
  large = false,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  }

  return (
    <div
      ref={ref}
      className={`${centered ? 'text-center' : ''} space-y-5`}
    >
      {label && (
        <motion.p
          variants={variants}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="text-xs tracking-[0.25em] uppercase text-text-muted"
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        variants={variants}
        initial={shouldReduceMotion ? 'visible' : 'hidden'}
        animate={inView ? 'visible' : 'hidden'}
        transition={{ delay: label ? 0.1 : 0 }}
        className={`font-display font-light tracking-tightest text-text-primary ${
          large
            ? 'text-4xl md:text-6xl lg:text-7xl leading-[0.95]'
            : 'text-3xl md:text-5xl lg:text-6xl leading-[1]'
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={variants}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
