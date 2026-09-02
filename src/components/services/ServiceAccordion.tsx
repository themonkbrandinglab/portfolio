'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import type { Service } from '@/types'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function ServiceAccordion({ services }: { services: Service[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })
  const rm = useReducedMotion()

  return (
    <div ref={ref}>
      {services.map((service, i) => {
        const isOpen = openIndex === i
        return (
          <motion.div
            key={service.id}
            className="accordion-item"
            initial={rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.9, ease, delay: i * 0.05 }}
          >
            <button
              className="accordion-trigger"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`panel-${service.id}`}
              id={`btn-${service.id}`}
            >
              <span className="accordion-number">{service.number}</span>
              <span className="accordion-title">{service.title}</span>
              <span className={`accordion-icon ${isOpen ? 'accordion-icon--open' : ''}`} aria-hidden="true">+</span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`panel-${service.id}`}
                  role="region"
                  aria-labelledby={`btn-${service.id}`}
                  className="accordion-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <div className="accordion-content">
                    {service.description && (
                      <p className="accordion-desc">{service.description}</p>
                    )}
                    <div className="accordion-caps">
                      {service.capabilities.map((cap) => (
                        <span key={cap} className="accordion-cap-item">
                          <span className="accordion-cap-dot" aria-hidden="true" />
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
