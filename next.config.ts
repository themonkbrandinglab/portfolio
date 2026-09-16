import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // GitHub Pages static export
  output: 'export',

  // GitHub Pages project URL:
  // https://USERNAME.github.io/themonkbrandinglab/
  basePath: '/themonkbrandinglab',

  // React
  reactStrictMode: true,

  // Three.js compatibility
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
  ],

  // GitHub Pages cannot use Next.js Image Optimization
  images: {
    unoptimized: true,
  },

  // Development only
  allowedDevOrigins: [
    'autotypic-febrifugal-vada.ngrok-free.dev',
  ],
}

export default nextConfig
