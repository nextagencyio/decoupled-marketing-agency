'use client'

import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_FEATURED_BLOG_POSTS } from '@/lib/queries'
import { DrupalBlogPost } from '@/lib/types'
import { Calendar, ArrowRight, Newspaper } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage'

interface FeaturedBlogData {
  nodeBlogPosts: {
    nodes: DrupalBlogPost[]
  }
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function BlogPreview() {
  const { data, loading, error } = useQuery<FeaturedBlogData>(GET_FEATURED_BLOG_POSTS)
  const posts = data?.nodeBlogPosts?.nodes || []

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">From Our Blog</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (<div key={i} className="animate-pulse"><div className="h-48 bg-gray-200 rounded-lg mb-4" /><div className="h-4 bg-gray-200 rounded w-1/4 mb-2" /><div className="h-6 bg-gray-200 rounded w-3/4 mb-2" /><div className="h-4 bg-gray-200 rounded w-full" /></div>))}
          </div>
        </div>
      </section>
    )
  }

  if (error || posts.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">From Our Blog</h2>
            <p className="text-lg text-gray-600 max-w-2xl">Marketing insights, industry trends, and actionable tips from our team.</p>
          </div>
          <Link href="/blog" className="hidden md:flex items-center text-pink-700 hover:text-pink-800 font-medium">All Posts <ArrowRight className="w-4 h-4 ml-1" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={post.path || `/blog/${post.id}`} className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                {post.image?.url ? (
                  <ResponsiveImage src={post.image.url} alt={post.image.alt || post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" variations={post.image.variations} targetWidth={400} />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center"><Newspaper className="w-10 h-10 text-white/30" /></div>
                )}
              </div>
              <div className="p-5">
                {post.blogCategory && post.blogCategory.length > 0 && <span className="text-pink-700 text-sm font-medium">{post.blogCategory[0].name}</span>}
                <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2 group-hover:text-pink-700 transition-colors line-clamp-2">{post.title}</h3>
                <div className="flex items-center text-gray-500 text-sm"><Calendar className="w-4 h-4 mr-2" />{formatDate(post.created.timestamp)}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10 md:hidden">
          <Link href="/blog" className="inline-flex items-center text-pink-700 hover:text-pink-800 font-medium">View All Posts <ArrowRight className="w-4 h-4 ml-1" /></Link>
        </div>
      </div>
    </section>
  )
}
