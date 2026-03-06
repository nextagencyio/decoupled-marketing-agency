'use client'

import { DrupalHomepage } from '@/lib/types'

interface StatsSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

const defaultStats = [
  { value: '250+', label: 'Client Projects' },
  { value: '98%', label: 'Retention Rate' },
  { value: '24/7', label: 'Support Coverage' },
  { value: '12+', label: 'Years Experience' },
]

export default function StatsSection({ homepageContent }: StatsSectionProps) {
  const rawStats = (homepageContent as any)?.stats || (homepageContent as any)?.statsItems || []
  const stats = rawStats.length > 0 ? rawStats : defaultStats

  return (
    <section className="relative py-20 bg-white -mt-14 md:-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat: any, i: number) => (
            <div key={stat.id || i} className="text-center relative">
              <div className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                {stat.value || stat.number || stat.statValue}
              </div>
              <div className="text-gray-600 mt-2 font-medium uppercase tracking-wide text-sm">
                {stat.label || stat.statLabel || stat.title}
              </div>
              {i < stats.length - 1 && (
                <div
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-primary-200 to-transparent"
                  style={{ transform: 'translateY(-50%) rotate(15deg)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
