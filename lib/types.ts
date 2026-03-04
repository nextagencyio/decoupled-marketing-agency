// Base node type
export interface DrupalNode {
  id: string
  title: string
  path: string
  created: {
    timestamp: number
  }
  changed: {
    timestamp: number
  }
}

// Paragraph types
export interface DrupalStatItem {
  id: string
  number: string
  label: string
}

// Homepage
export interface DrupalHomepage extends DrupalNode {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: {
    processed: string
  }
  statsItems?: DrupalStatItem[]
  featuredWorkTitle?: string
  ctaTitle?: string
  ctaDescription?: {
    processed: string
  }
  ctaPrimary?: string
  ctaSecondary?: string
}

export interface HomepageData {
  nodeHomepages: {
    nodes: DrupalHomepage[]
  }
}

// Service
export interface DrupalService extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  serviceArea?: DrupalTerm[]
  image?: DrupalImage
}

export interface ServicesData {
  nodeServices: {
    nodes: DrupalService[]
  }
}

// Case Study
export interface DrupalCaseStudy extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  industry?: DrupalTerm[]
  clientName?: string
  results?: string
  image?: DrupalImage
}

export interface CaseStudiesData {
  nodeCaseStudies: {
    nodes: DrupalCaseStudy[]
  }
}

// Team Member
export interface DrupalTeamMember extends DrupalNode {
  body?: {
    processed: string
  }
  position?: string
  email?: string
  photo?: DrupalImage
}

export interface TeamMembersData {
  nodeTeamMembers: {
    nodes: DrupalTeamMember[]
  }
}

// Blog Post
export interface DrupalBlogPost extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  blogCategory?: DrupalTerm[]
  image?: DrupalImage
  featured?: boolean
}

export interface BlogPostsData {
  nodeBlogPosts: {
    nodes: DrupalBlogPost[]
  }
}

// Basic Page
export interface DrupalPage extends DrupalNode {
  body?: {
    processed: string
  }
}

// Shared types
export interface DrupalImage {
  url: string
  alt?: string
  width?: number
  height?: number
  variations?: Array<{
    name: string
    url: string
    width: number
    height: number
  }>
}

export interface DrupalTerm {
  id: string
  name: string
  path?: string
}

// Feature color type
export type FeatureColor = 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo'
