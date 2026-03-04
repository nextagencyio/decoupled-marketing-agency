/**
 * Demo Mode Module
 *
 * This file contains ALL demo/mock mode functionality.
 * To remove demo mode from a real project:
 * 1. Delete this file (lib/demo-mode.ts)
 * 2. Delete the data/mock/ directory
 * 3. Delete app/components/DemoModeBanner.tsx
 * 4. Remove DemoModeBanner from app/layout.tsx
 * 5. Remove the demo mode check from app/api/graphql/route.ts
 */

import homepageData from '@/data/mock/homepage.json'
import servicesData from '@/data/mock/services.json'
import caseStudiesData from '@/data/mock/case-studies.json'
import teamMembersData from '@/data/mock/team.json'
import blogPostsData from '@/data/mock/blog.json'
import routesData from '@/data/mock/routes.json'

export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE !== 'false'
}

const mockDataMap: Record<string, any> = {
  'homepage.json': homepageData,
  'services.json': servicesData,
  'case-studies.json': caseStudiesData,
  'team.json': teamMembersData,
  'blog.json': blogPostsData,
  'routes.json': routesData,
}

function loadMockData(filename: string): any {
  return mockDataMap[filename] || null
}

export function handleMockQuery(body: string): any {
  try {
    const { query, variables } = JSON.parse(body)

    if (variables?.path) {
      const routePath = variables.path
      const routes = loadMockData('routes.json')
      if (routes && routes[routePath]) {
        return routes[routePath]
      }
    }

    if (query.includes('GetHomepageData') || query.includes('nodeHomepages')) {
      return loadMockData('homepage.json')
    }

    if (query.includes('GetServices') || query.includes('nodeServices')) {
      return loadMockData('services.json')
    }

    if (query.includes('GetCaseStudies') || query.includes('nodeCaseStudies')) {
      return loadMockData('case-studies.json')
    }

    if (query.includes('GetTeamMembers') || query.includes('nodeTeamMembers')) {
      return loadMockData('team.json')
    }

    if (query.includes('GetBlogPosts') || query.includes('nodeBlogPosts')) {
      return loadMockData('blog.json')
    }

    return { data: {} }
  } catch (error) {
    console.error('Mock query error:', error)
    return { data: {}, errors: [{ message: 'Mock data error' }] }
  }
}
