'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      bar.style.transform = `scaleX(${progress})`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        zIndex: 200,
        pointerEvents: 'none',
        background: 'var(--border-color)',
      }}
      aria-hidden="true"
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          background: 'linear-gradient(to right, var(--chrome-lo), var(--chrome-hi))',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          transition: 'transform 0.05s linear',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
