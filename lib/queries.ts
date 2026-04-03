import { gql as apolloGql } from '@apollo/client'

// Tagged template that returns the query string for server-side use with decoupled-client
const gql = (strings: TemplateStringsArray, ...values: any[]) => strings.reduce((a, s, i) => a + s + (values[i] || ''), '')

// Homepage query with stats
export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    nodeHomepages(first: 1) {
      nodes {
        id
        title
        path
        heroTitle
        heroSubtitle
        heroDescription {
          processed
        }
        statsItems {
          ... on ParagraphStatItem {
            id
            number
            label
          }
        }
        featuredWorkTitle
        ctaTitle
        ctaDescription {
          processed
        }
        ctaPrimary
        ctaSecondary
      }
    }
  }
`

// Services
export const GET_SERVICES = gql`
  query GetServices($first: Int = 20) {
    nodeServices(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeService {
          body {
            processed
            summary
          }
          serviceArea {
            ... on TermInterface {
              id
              name
            }
          }
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_SERVICE_BY_PATH = gql`
  query GetServiceByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeService {
            id
            title
            path
            body {
              processed
            }
            serviceArea {
              ... on TermInterface {
                id
                name
              }
            }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// Case Studies
export const GET_CASE_STUDIES = gql`
  query GetCaseStudies($first: Int = 20) {
    nodeCaseStudies(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeCaseStudy {
          body {
            processed
            summary
          }
          industry {
            ... on TermInterface {
              id
              name
            }
          }
          clientName
          results
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_CASE_STUDY_BY_PATH = gql`
  query GetCaseStudyByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeCaseStudy {
            id
            title
            path
            body {
              processed
            }
            industry {
              ... on TermInterface {
                id
                name
              }
            }
            clientName
            results
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// Team Members
export const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers($first: Int = 50) {
    nodeTeamMembers(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeTeamMember {
          body {
            processed
          }
          position
          email
          photo {
            url
            alt
            width
            height
            variations(styles: [MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_TEAM_MEMBER_BY_PATH = gql`
  query GetTeamMemberByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeTeamMember {
            id
            title
            path
            body {
              processed
            }
            position
            email
            photo {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// Blog Posts
export const GET_BLOG_POSTS = gql`
  query GetBlogPosts($first: Int = 20) {
    nodeBlogPosts(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeBlogPost {
          body {
            processed
            summary
          }
          blogCategory {
            ... on TermInterface {
              id
              name
            }
          }
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
          featured
        }
      }
    }
  }
`

export const GET_BLOG_POST_BY_PATH = gql`
  query GetBlogPostByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeBlogPost {
            id
            title
            path
            created {
              timestamp
            }
            body {
              processed
            }
            blogCategory {
              ... on TermInterface {
                id
                name
              }
            }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
            featured
          }
        }
      }
    }
  }
`

// Generic route query
export const GET_NODE_BY_PATH = gql`
  query GetNodeByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePage {
            id
            title
            body {
              processed
            }
          }
          ... on NodeService {
            id
            title
            path
            body {
              processed
            }
            serviceArea {
              ... on TermInterface {
                id
                name
              }
            }
            image {
              url
              alt
              width
              height
            }
          }
          ... on NodeCaseStudy {
            id
            title
            path
            body {
              processed
            }
            industry {
              ... on TermInterface {
                id
                name
              }
            }
            clientName
            results
            image {
              url
              alt
              width
              height
            }
          }
          ... on NodeTeamMember {
            id
            title
            path
            body {
              processed
            }
            position
            email
            photo {
              url
              alt
              width
              height
            }
          }
          ... on NodeBlogPost {
            id
            title
            path
            created {
              timestamp
            }
            body {
              processed
            }
            blogCategory {
              ... on TermInterface {
                id
                name
              }
            }
            featured
            image {
              url
              alt
              width
              height
            }
          }
          ... on NodeHomepage {
            id
            title
            heroTitle
            heroSubtitle
            heroDescription {
              processed
            }
            statsItems {
              ... on ParagraphStatItem {
                id
                number
                label
              }
            }
            featuredWorkTitle
            ctaTitle
            ctaDescription {
              processed
            }
            ctaPrimary
            ctaSecondary
          }
        }
      }
    }
  }
`

// Featured case studies for homepage
export const GET_FEATURED_CASE_STUDIES = gql`
  query GetFeaturedCaseStudies {
    nodeCaseStudies(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeCaseStudy {
          clientName
          results
          industry {
            ... on TermInterface {
              id
              name
            }
          }
          image {
            url
            alt
            variations(styles: [MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

// Featured blog posts for homepage
export const GET_FEATURED_BLOG_POSTS = gql`
  query GetFeaturedBlogPosts {
    nodeBlogPosts(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeBlogPost {
          body {
            summary
          }
          blogCategory {
            ... on TermInterface {
              id
              name
            }
          }
          image {
            url
            alt
            variations(styles: [MEDIUM]) {
              name
              url
              width
              height
            }
          }
          featured
        }
      }
    }
  }
`

// Apollo DocumentNode versions for client-side useQuery
export const GQL_FEATURED_CASE_STUDIES = apolloGql`
  query GetFeaturedCaseStudies {
    nodeCaseStudies(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeCaseStudy {
          clientName
          results
          industry {
            ... on TermInterface {
              id
              name
            }
          }
          image {
            url
            alt
            variations(styles: [MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GQL_FEATURED_BLOG_POSTS = apolloGql`
  query GetFeaturedBlogPosts {
    nodeBlogPosts(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeBlogPost {
          body {
            summary
          }
          blogCategory {
            ... on TermInterface {
              id
              name
            }
          }
          image {
            url
            alt
            variations(styles: [MEDIUM]) {
              name
              url
              width
              height
            }
          }
          featured
        }
      }
    }
  }
`
