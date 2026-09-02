'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import ScrollProgress from '@/components/ui/ScrollProgress'

let lenisInstance: Lenis | null = null
export function getLenis() { return lenisInstance }

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (lenisInstance) { lenisInstance.destroy(); lenisInstance = null }

    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.6,
      infinite: false,
    })

    // RAF loop
    let rafId: number
    function raf(time: number) {
      lenisInstance?.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      if (lenisInstance) { lenisInstance.destroy(); lenisInstance = null }
    }
  }, [])

  return (
    <>
      <ScrollProgress />
      {children}
    </>
  )
}
