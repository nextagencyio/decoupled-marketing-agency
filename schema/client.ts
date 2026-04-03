/**
 * Stub typed client — replaced by `npm run sync-schema`.
 *
 * Run `npx decoupled-cli schema sync` after connecting to a Drupal space
 * to generate the real typed client with interfaces and queries.
 */

import type { DecoupledClient } from 'decoupled-client'
import type { DrupalNode } from 'decoupled-client'
import type { QueryOptions } from 'decoupled-client'

// Placeholder types — sync-schema will replace with actual content types
export type ContentNode = DrupalNode
export type ContentTypeName = string

export interface ContentTypeMap {
  [key: string]: DrupalNode
}

export interface TypedClient {
  getEntries<K extends ContentTypeName>(type: K, options?: QueryOptions): Promise<DrupalNode[]>
  getEntry<K extends ContentTypeName>(type: K, id: string): Promise<DrupalNode | null>
  getEntryByPath(path: string): Promise<ContentNode | null>
  raw<T = any>(query: string, variables?: Record<string, any>): Promise<T>
}

// Stub factory — uses raw queryByPath with a broad route query
export function createTypedClient(client: DecoupledClient): TypedClient {
  return {
    async getEntries() { return [] },
    async getEntry() { return null },
    async getEntryByPath(path) {
      return client.queryByPath(path, `
        query ($path: String!) {
          route(path: $path) {
            ... on RouteInternal {
              entity {
                ... on NodePage { __typename id title path body { processed } }
                ... on NodeHomepage { __typename id title path heroTitle heroSubtitle heroDescription { processed } statsItems { ... on ParagraphStatItem { id number label } } featuredWorkTitle ctaTitle ctaDescription { processed } ctaPrimary ctaSecondary }
                ... on NodeService { __typename id title path body { processed summary } serviceArea { ... on TermInterface { id name } } image { url alt width height } }
                ... on NodeCaseStudy { __typename id title path body { processed summary } industry { ... on TermInterface { id name } } clientName results image { url alt width height } }
                ... on NodeTeamMember { __typename id title path body { processed } position email photo { url alt width height } }
                ... on NodeBlogPost { __typename id title path created { timestamp } body { processed summary } blogCategory { ... on TermInterface { id name } } featured image { url alt width height } }
              }
            }
          }
        }
      `)
    },
    async raw(query, variables) { return client.query(query, variables) },
  }
}
