'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const steps = [
  "Business Strategy",
  "Brand Positioning",
  "Organic Growth",
  "Community",
  "Long-Term Scale"
]

export default function WorkflowTimeline() {
  const containerRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  
  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 40%"]
  })

  // Add physics to the scroll progress for a buttery smooth filling line
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Update React state for styling changes based on progress
  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      // Find the highest step threshold passed
      let current = 0
      for (let i = 0; i < steps.length; i++) {
        const threshold = i / (steps.length - 1)
        if (latest >= threshold - 0.05) {
          current = i
        }
      }
      setActiveStep(current)
    })
  }, [smoothProgress])

  // Map progress to width percentage
  const lineWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={containerRef} className="py-32 bg-[var(--bg-primary)] overflow-hidden relative">
      <div className="container-site">
        
        {/* Section Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label mb-6 inline-block tracking-widest text-[0.625rem] text-[var(--text-muted)] uppercase">
              02 WHY US? STRATEGY &gt; POSTING
            </span>
            <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-light tracking-tight max-w-[28ch] text-[var(--text-primary)] leading-[1.2]">
              We don&apos;t believe growth comes from simply posting content consistently. 
              <br/><br/>
              <span className="text-[var(--text-muted)]">We help brands build a strategic system for growth.</span>
            </h2>
          </motion.div>
        </div>

        {/* Timeline Component */}
        <div className="relative max-w-5xl mx-auto pt-12 pb-24 px-4 md:px-12">
          
          {/* Background Track */}
          <div className="absolute top-[57px] left-[5%] right-[5%] md:left-[8%] md:right-[8%] h-[1px] bg-black/10"></div>
          
          {/* Active Animated Track */}
          <motion.div 
            className="absolute top-[56px] left-[5%] md:left-[8%] h-[3px] bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 rounded-full origin-left"
            style={{ 
              width: useTransform(lineWidth, (w) => `calc(${w} * 0.9)`),
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)'
            }}
          />

          {/* Nodes */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isActive = activeStep >= index
              
              return (
                <div key={step} className="flex flex-col items-center relative z-10 w-24 md:w-32">
                  
                  {/* Glowing Node */}
                  <div 
                    className="w-4 h-4 rounded-full border-2 bg-[var(--bg-primary)] mb-6 transition-all duration-500 flex items-center justify-center relative"
                    style={{
                      borderColor: isActive ? '#818cf8' : 'rgba(0,0,0,0.15)',
                    }}
                  >
                    {/* Inner glowing dot */}
                    <div 
                      className="absolute inset-0 rounded-full bg-indigo-500 transition-all duration-500"
                      style={{
                        transform: isActive ? 'scale(1)' : 'scale(0)',
                        opacity: isActive ? 1 : 0,
                        boxShadow: isActive ? '0 0 20px 4px rgba(99, 102, 241, 0.4)' : 'none'
                      }}
                    />
                  </div>

                  {/* Label */}
                  <span 
                    className="text-center text-[0.625rem] md:text-[0.6875rem] font-medium tracking-wide uppercase transition-colors duration-500"
                    style={{
                      color: isActive ? 'var(--text-primary)' : 'var(--text-muted)'
                    }}
                  >
                    {step}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
