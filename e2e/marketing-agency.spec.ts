import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('renders hero section with content from Drupal', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Accelerate Your Brand')
    await expect(page.locator('text=Strategy. Creativity. Results.')).toBeVisible()
  })

  test('renders stats section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=200+')).toBeVisible()
    await expect(page.locator('text=Clients Served')).toBeVisible()
  })

  test('renders CTA section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Ready to Grow Your Brand?')).toBeVisible()
  })
})

test.describe('Services', () => {
  test('listing page shows services', async ({ page }) => {
    await page.goto('/services')
    await expect(page.locator('h1')).toContainText('Services')
    await expect(page.getByText('Brand Strategy & Identity')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Digital Marketing' })).toBeVisible()
  })

  test('detail page renders service content', async ({ page }) => {
    await page.goto('/services/brand-strategy')
    await expect(page.locator('h1')).toContainText('Brand Strategy')
    await expect(page.locator('text=Back to Services')).toBeVisible()
  })
})

test.describe('Case Studies', () => {
  test('listing page shows case studies', async ({ page }) => {
    await page.goto('/case-studies')
    await expect(page.locator('h1')).toContainText('Case Studies')
    await expect(page.getByRole('heading', { name: 'TechFlow SaaS Rebrand' })).toBeVisible()
  })

  test('detail page renders case study content', async ({ page }) => {
    await page.goto('/case-studies/techflow-rebrand')
    await expect(page.locator('h1')).toContainText('TechFlow')
    await expect(page.locator('text=Back to Case Studies')).toBeVisible()
  })
})

test.describe('Team', () => {
  test('listing page shows team members', async ({ page }) => {
    await page.goto('/team')
    await expect(page.locator('h1')).toContainText('Team Members')
    await expect(page.locator('text=Sarah Chen')).toBeVisible()
  })

  test('detail page renders team member content', async ({ page }) => {
    await page.goto('/team/sarah-chen')
    await expect(page.locator('h1')).toContainText('Sarah Chen')
  })
})

test.describe('Blog', () => {
  test('listing page shows blog posts', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.locator('h1')).toContainText('Blog Posts')
    await expect(page.locator('text=SEO Trends')).toBeVisible()
  })

  test('detail page renders blog post content', async ({ page }) => {
    await page.goto('/blog/seo-trends-2026')
    await expect(page.locator('h1')).toContainText('SEO Trends')
  })
})

test.describe('Navigation', () => {
  test('header navigation links work', async ({ page }) => {
    await page.goto('/')
    // Check navigation links exist
    await expect(page.locator('nav a[href="/services"]')).toBeVisible()
    await expect(page.locator('nav a[href="/case-studies"]')).toBeVisible()
    await expect(page.locator('nav a[href="/team"]')).toBeVisible()
    await expect(page.locator('nav a[href="/blog"]')).toBeVisible()
  })
})

test.describe('Static Pages', () => {
  test('contact page renders', async ({ page }) => {
    await page.goto('/contact')
    await expect(page).toHaveTitle(/Contact/)
  })
})
