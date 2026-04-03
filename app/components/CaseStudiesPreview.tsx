'use client'

import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GQL_FEATURED_CASE_STUDIES } from '@/lib/queries'
import { DrupalHomepage, DrupalCaseStudy } from '@/lib/types'
import { ArrowRight, BarChart3 } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage'

interface CaseStudiesPreviewProps {
  homepageContent?: DrupalHomepage | null
}

interface FeaturedCaseStudiesData {
  nodeCaseStudies: {
    nodes: DrupalCaseStudy[]
  }
}

export default function CaseStudiesPreview({ homepageContent }: CaseStudiesPreviewProps) {
  const { data, loading, error } = useQuery<FeaturedCaseStudiesData>(GQL_FEATURED_CASE_STUDIES)
  const caseStudies = data?.nodeCaseStudies?.nodes || []
  const sectionTitle = homepageContent?.featuredWorkTitle || 'Featured Work'

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{sectionTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl" />
                <div className="p-6"><div className="h-4 bg-gray-200 rounded w-1/4 mb-3" /><div className="h-6 bg-gray-200 rounded w-3/4 mb-3" /><div className="h-4 bg-gray-200 rounded w-full" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || caseStudies.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{sectionTitle}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">See how we have helped brands accelerate their growth with data-driven marketing strategies.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((cs) => (
            <Link key={cs.id} href={cs.path || `/case-studies/${cs.id}`} className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-pink-600 to-rose-700">
                {cs.image?.url ? (
                  <ResponsiveImage src={cs.image.url} alt={cs.image.alt || cs.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" variations={cs.image.variations} targetWidth={400} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center"><BarChart3 className="w-16 h-16 text-white/50" /></div>
                )}
                {cs.industry && cs.industry.length > 0 && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-pink-800 px-3 py-1 rounded-full text-sm font-semibold">{cs.industry[0].name}</div>
                )}
              </div>
              <div className="p-6">
                {cs.clientName && <div className="text-sm text-pink-700 font-medium mb-2">{cs.clientName}</div>}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-700 transition-colors">{cs.title}</h3>
                {cs.results && <p className="text-gray-600 text-sm mb-4">{cs.results}</p>}
                <div className="flex items-center text-pink-700 font-medium group-hover:gap-2 transition-all">
                  View case study <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/case-studies" className="inline-flex items-center px-8 py-4 bg-pink-700 text-white rounded-lg hover:bg-pink-800 transition-colors font-semibold">
            View All Case Studies <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
