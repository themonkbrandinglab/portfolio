import type { Metadata, Viewport } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import PageTransitionWrapper from '@/components/providers/PageTransitionWrapper'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,   // allow pinch zoom for accessibility
  themeColor: '#0a0a0a',
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://themonkbrandinglab.com'),
  title: { default: 'the.monkbranding.lab — Brand, Strategy & Growth', template: '%s | the.monkbranding.lab' },
  description: 'the.monkbranding.lab is a strategy-led brand and growth studio.',
  authors: [{ name: 'the.monkbranding.lab' }],
  creator: 'the.monkbranding.lab',
  openGraph: {
    type: 'website', locale: 'en_US', url: 'https://themonkbrandinglab.com',
    siteName: 'the.monkbranding.lab',
    title: 'the.monkbranding.lab — Brand, Strategy & Growth',
    description: 'A strategy-led brand and growth studio.',
    images: [{ url: '/brand/monk-logo.jpg', width: 1200, height: 630, alt: 'the.monkbranding.lab' }],
  },
  twitter: { card: 'summary_large_image', images: ['/brand/monk-logo.jpg'] },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistSans.variable}`} suppressHydrationWarning>
      <body>
        <SmoothScrollProvider>
          <PageTransitionWrapper>
            {children}
          </PageTransitionWrapper>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
