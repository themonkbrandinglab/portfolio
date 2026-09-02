'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import ChromeObject from './ChromeObject'

interface SceneProps {
  className?: string
  mouseX?: number
  mouseY?: number
  scrollProgress?: number
  reducedMotion?: boolean
}

function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Elegant static chrome placeholder during load */}
      <div
        className="w-48 h-12 rounded-full opacity-30"
        style={{
          background: 'linear-gradient(135deg, #e8e8e8 0%, #808080 50%, #e8e8e8 100%)',
          filter: 'blur(2px)',
        }}
      />
    </div>
  )
}

export default function Scene({
  className = '',
  mouseX = 0,
  mouseY = 0,
  scrollProgress = 0,
  reducedMotion = false,
}: SceneProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <SceneFallback />

  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]} // Cap pixel ratio for performance
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ChromeObject
          mouseX={reducedMotion ? 0 : mouseX}
          mouseY={reducedMotion ? 0 : mouseY}
          scrollProgress={reducedMotion ? 0 : scrollProgress}
        />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
