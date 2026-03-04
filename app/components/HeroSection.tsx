'use client'

import Link from 'next/link'
import { DrupalHomepage } from '@/lib/types'

interface HeroSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function HeroSection({ homepageContent }: HeroSectionProps) {
  const title = (homepageContent as any)?.heroTitle || (homepageContent as any)?.title || 'Performance-Focused Solutions'
  const subtitle = (homepageContent as any)?.heroSubtitle || 'Built for teams that move fast and deliver measurable outcomes.'
  const description = (homepageContent as any)?.heroDescription?.processed || ''

  return (
    <section
      className="relative overflow-hidden"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0 100%)' }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80&fit=crop)' }}
      />
      <div className="absolute inset-0 bg-primary-950/75" />
      <div
        className="absolute bottom-0 left-0 right-0 h-2 bg-accent-400"
        style={{ clipPath: 'polygon(0 0, 100% 35%, 100% 100%, 0 100%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 text-center">
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight mb-6 leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto font-light">
            {subtitle}
          </p>
        )}
        {description && (
          <div
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/services"
            className="px-8 py-4 bg-accent-400 text-primary-950 rounded-lg hover:bg-accent-300 transition-all duration-200 font-display font-bold text-lg uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore Services
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-950 transition-all duration-200 font-display font-bold text-lg uppercase tracking-wider"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
