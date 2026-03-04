'use client'

import Link from 'next/link'
import { DrupalHomepage } from '@/lib/types'

interface CTASectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const title = (homepageContent as any)?.ctaTitle || 'Ready to Build Momentum?'
  const description = (homepageContent as any)?.ctaDescription?.processed || ''
  const primaryLabel = (homepageContent as any)?.ctaPrimary || 'Start a Conversation'
  const secondaryLabel = (homepageContent as any)?.ctaSecondary || 'See Our Approach'

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ clipPath: 'polygon(0 8%, 100% 0, 100% 100%, 0 100%)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950" />
      <div
        className="absolute top-0 right-0 w-1/3 h-full bg-accent-400/10"
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-6">
          {title}
        </h2>
        {description ? (
          <div className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
            Partner with a team that combines strategy, execution, and continuous optimization.
          </p>
        )}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/contact"
            className="px-10 py-4 bg-accent-400 text-primary-950 rounded-lg hover:bg-accent-300 transition-all duration-200 font-display font-bold text-lg uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {primaryLabel}
          </Link>
          <Link
            href="/about"
            className="px-10 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-950 transition-all duration-200 font-display font-bold text-lg uppercase tracking-wider"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
