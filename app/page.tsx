import { getClient } from '@/lib/drupal-client'
import HomepageRenderer from './components/HomepageRenderer'
import SetupGuide from './components/SetupGuide'
import ContentSetupGuide from './components/ContentSetupGuide'
import { Metadata } from 'next'
import { checkConfiguration } from '../lib/config-check'
import { GET_HOMEPAGE_DATA } from '@/lib/queries'

export const revalidate = 3600
export const dynamic = 'force-dynamic'


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Velocity Marketing - Accelerating Brands, Delivering Results',
    description: 'Full-service marketing agency combining data-driven strategy with bold creative. From brand strategy to digital campaigns, we deliver measurable results.',
    keywords: ['Marketing Agency', 'Brand Strategy', 'Digital Marketing', 'Creative Agency'],
    openGraph: { title: 'Velocity Marketing - Accelerating Brands, Delivering Results', description: 'Full-service marketing agency delivering measurable results.', type: 'website', locale: 'en_US' },
  }
}

export default async function Home() {
  const configStatus = checkConfiguration()
  if (!configStatus.isConfigured) return <SetupGuide missingVars={configStatus.missingVars} />

  const client = getClient()
  const data = await client.raw(GET_HOMEPAGE_DATA)
  const homepageContent = data?.nodeHomepages?.nodes?.[0] || null

  if (!homepageContent) {
    const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
    return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
  }

  return <HomepageRenderer homepageContent={homepageContent} />
}
