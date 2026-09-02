'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface ChromeObjectProps {
  mouseX?: number
  mouseY?: number
  scrollProgress?: number
}

/**
 * ChromeObject — inspired by the the.monkbranding.lab logo geometry:
 * an elongated horizontally pinched-center, flared-end arc form.
 *
 * We use LatheGeometry with a custom profile curve to approximate
 * the hourglass/arc silhouette of the actual logo mark.
 *
 * The geometry is rotated 90° so the elongated axis is horizontal,
 * matching the logo's orientation.
 */
export default function ChromeObject({
  mouseX = 0,
  mouseY = 0,
  scrollProgress = 0,
}: ChromeObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  // Build the LatheGeometry profile points — this creates the
  // pinched-center, flared-end silhouette matching the logo
  const geometry = useMemo(() => {
    const points: THREE.Vector2[] = []

    // Profile curve: from one flared end → narrow center → other flared end
    // Y = radius at that height, X = height (will become the lathe axis)
    // We create one half of the profile (LatheGeometry rotates it 360°)
    const segments = 40
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      // x goes from -1 to 1 (height along axis)
      const x = t * 2 - 1

      // Radius profile: large at ends, pinched at center
      // Use a smooth curve: high at |x|=1, low at x=0
      const bell = Math.pow(Math.abs(x), 0.7)
      // Add a subtle arc — the center dips slightly inward
      const pinch = 1 - Math.exp(-Math.pow(x * 2.5, 2)) * 0.55
      const radius = 0.08 + bell * 0.38 * pinch

      points.push(new THREE.Vector2(radius, x * 1.8))
    }

    const geo = new THREE.LatheGeometry(points, 64)

    // Rotate the geometry so the elongated axis is horizontal (X)
    // instead of vertical (Y, which is LatheGeometry's default)
    geo.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI / 2))

    // Compute smooth normals for chrome reflections
    geo.computeVertexNormals()

    return geo
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return

    const t = state.clock.getElapsedTime()

    // Subtle idle float
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.06

    // Gentle idle rotation
    meshRef.current.rotation.y += delta * 0.08

    // Mouse parallax — gentle, not aggressive
    const targetRotX = mouseY * 0.25
    const targetRotZ = mouseX * 0.12
    meshRef.current.rotation.x +=
      (targetRotX - meshRef.current.rotation.x) * 0.04
    meshRef.current.rotation.z +=
      (targetRotZ - meshRef.current.rotation.z) * 0.04

    // Scroll-based light tilt on the group
    groupRef.current.rotation.x = scrollProgress * 0.3
  })

  return (
    <>
      {/* Environment for chrome reflections */}
      <Environment preset="studio" />

      {/* Ambient light */}
      <ambientLight intensity={0.3} />

      {/* Key light — cool silver */}
      <directionalLight
        position={[3, 4, 2]}
        intensity={2.5}
        color="#e8e8e8"
      />

      {/* Fill light */}
      <directionalLight
        position={[-3, -1, 1]}
        intensity={0.8}
        color="#a0a0c0"
      />

      {/* Rim light */}
      <pointLight position={[0, 3, -2]} intensity={1.5} color="#ffffff" />

      <group ref={groupRef}>
        <mesh ref={meshRef} geometry={geometry} castShadow>
          <meshStandardMaterial
            color="#d0d0d0"
            metalness={1.0}
            roughness={0.06}
            envMapIntensity={2.5}
          />
        </mesh>
      </group>
    </>
  )
}
