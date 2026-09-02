export interface Service {
  id: string
  number: string
  title: string
  description?: string
  capabilities: string[]
}

export interface Project {
  slug: string
  number: string
  company: string
  logo: string | null
  category: string
  // Card
  tagline: string          // one-line card descriptor
  companyContext: string   // short factual "about the brand" line for card
  title: string            // longer case study title
  // Case study body
  aboutBrand: string       // factual paragraph — what the company is
  challenge: string
  insight?: string         // what was discovered
  strategicFocus: string[]
  exploration: string      // what we explored / the work
  strategicDirection?: string
  outcome?: string
  takeaway: string
  // Nav
  prevSlug?: string
  nextSlug?: string
}
