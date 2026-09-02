import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found">
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '40rem', margin: '0 auto' }}>
          <p className="not-found__ghost" aria-hidden="true">404</p>
          <h1 className="section-title text-heading" style={{ marginBottom: '1rem' }}>PAGE NOT FOUND.</h1>
          <p className="section-body" style={{ marginBottom: '2.5rem' }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.875rem' }}>
            <Link href="/" className="btn-primary">Back to Home</Link>
            <Link href="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
