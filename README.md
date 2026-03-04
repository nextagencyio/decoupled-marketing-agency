# Decoupled Marketing Agency

A full-service marketing agency website starter template for Decoupled Drupal + Next.js. Built for creative agencies, digital marketing firms, branding studios, and advertising agencies that need to showcase services, case studies, team members, and thought leadership content.

![Decoupled Marketing Agency Screenshot](docs/screenshot.png)

## Features

- **Services** - Showcase marketing services with descriptions, service areas, and featured images
- **Case Studies** - Client success stories with industry tags, results metrics, and project details
- **Team Directory** - Agency team member profiles with positions, bios, and contact info
- **Blog** - Marketing insights, tips, and industry news with categories and featured flags
- **Homepage** - Hero section with agency stats, featured work, and lead generation CTA
- **Static Pages** - About, contact, and other informational pages
- **Modern Design** - Clean, bold UI optimized for creative agency content

## Quick Start

### 1. Clone the template

```bash
npx degit nextagencyio/decoupled-marketing-agency my-agency
cd my-agency
npm install
```

### 2. Run interactive setup

```bash
npm run setup
```

This interactive script will:
- Authenticate with Decoupled.io (opens browser)
- Create a new Drupal space
- Wait for provisioning (~90 seconds)
- Configure your `.env.local` file
- Import sample content

### 3. Start development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Manual Setup

If you prefer to run each step manually:

<details>
<summary>Click to expand manual setup steps</summary>

### Authenticate with Decoupled.io

```bash
npx decoupled-cli@latest auth login
```

### Create a Drupal space

```bash
npx decoupled-cli@latest spaces create "My Marketing Agency"
```

Note the space ID returned (e.g., `Space ID: 1234`). Wait ~90 seconds for provisioning.

### Configure environment

```bash
npx decoupled-cli@latest spaces env 1234 --write .env.local
```

### Import content

```bash
npm run setup-content
```

This imports:
- Homepage with hero, statistics, and CTAs
- 4 Services (Brand Strategy, Digital Marketing, Social Media, Content Marketing)
- 3 Case Studies (TechFlow SaaS Rebrand, GreenLeaf Product Launch, Summit Health Digital)
- 4 Team Members (Sarah Chen, Marcus Williams, Priya Patel, James O'Connor)
- 3 Blog Posts (SEO Trends, Social Media Strategy, Brand Storytelling)
- 2 Static Pages (About, Contact)

</details>

## Content Types

### Service
- Title, Body (detailed description)
- Service Area (taxonomy: Branding, Digital, Social Media, Content)
- Featured Image

### Case Study
- Title, Body (full project story)
- Industry (taxonomy)
- Client Name, Key Results
- Featured Image

### Team Member
- Title (name), Body (bio)
- Position, Email
- Photo

### Blog Post
- Title, Body (article content)
- Category (taxonomy: SEO, Social Media, Branding)
- Featured Image
- Featured flag (boolean)

### Homepage
- Hero Title, Subtitle, Description
- Statistics (paragraph items with number and label)
- Featured Work Title
- CTA Title, Description, Primary and Secondary buttons

## Customization

### Colors & Branding
Edit `tailwind.config.js` to customize colors, fonts, and spacing.

### Content Structure
Modify `data/marketing-agency-content.json` to add or change content types and sample content.

### Components
React components are in `app/components/`. Update them to match your design needs.

## Demo Mode

Demo mode allows you to showcase the application without connecting to a Drupal backend. It displays mock content for the homepage, services, case studies, team, and blog.

### Enable Demo Mode

Set the environment variable:

```bash
NEXT_PUBLIC_DEMO_MODE=true
```

Or add to `.env.local`:
```
NEXT_PUBLIC_DEMO_MODE=true
```

### What Demo Mode Does

- Shows a "Demo Mode" banner at the top of the page
- Returns mock data for all GraphQL queries
- Displays sample services, case studies, team members, and blog posts
- No Drupal backend required

### Removing Demo Mode

To convert to a production app with real data:

1. Delete `lib/demo-mode.ts`
2. Delete `data/mock/` directory
3. Delete `app/components/DemoModeBanner.tsx`
4. Remove `DemoModeBanner` from `app/layout.tsx`
5. Remove demo mode checks from `app/api/graphql/route.ts`

## Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nextagencyio/decoupled-marketing-agency)

Set `NEXT_PUBLIC_DEMO_MODE=true` in Vercel environment variables for a demo deployment.

### Other Platforms
Works with any Node.js hosting platform that supports Next.js.

## Documentation

- [Decoupled.io Docs](https://www.decoupled.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drupal GraphQL](https://www.decoupled.io/docs/graphql)

## License

MIT
