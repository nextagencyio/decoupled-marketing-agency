import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_BLOG_POSTS } from '@/lib/queries'
import { BlogPostsData } from '@/lib/types'
import Header from '../components/Header'
import BlogPostCard from '../components/BlogPostCard'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog Posts | Marketing Agency',
  description: 'Browse our blog posts.',
}

async function getBlogPosts() {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<BlogPostsData>({
      query: GET_BLOG_POSTS,
      variables: { first: 50 },
      fetchPolicy: 'cache-first',
    })
    return data?.nodeBlogPosts?.nodes || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export default async function BlogPostsPage() {
  const items = await getBlogPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Blog Posts
            </h1>
            <p className="text-xl text-slate-100 max-w-3xl mx-auto">
              Explore our blog posts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Blog Posts Yet</h2>
              <p className="text-gray-500">
                Blog Posts will appear here once content is imported.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <BlogPostCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
