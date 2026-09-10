import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProjectsContent from '@/components/projects/ProjectsContent'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Strategic explorations and brand thinking across technology, SaaS, consumer and service businesses.',
}

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <ProjectsContent />
      </main>
      <Footer />
    </>
  )
}
