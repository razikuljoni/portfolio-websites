# app/ — Routes & Layouts

## OVERVIEW

Next.js 16 App Router pages. Route groups, SEO metadata, loading/error states.

## STRUCTURE

```
app/
├── layout.tsx       # Root layout (fonts, metadata, providers)
├── page.tsx         # Home page
├── loading.tsx      # Root loading state
├── not-found.tsx    # 404 page
├── globals.css      # Global Tailwind styles
├── about/resume/    # /about/resume route
│   ├── page.tsx         # Server page (SEO metadata)
│   └── resume-content.tsx  # Client component (full resume)
├── blogs/           # /blogs routes
│   ├── page.tsx     # Blog listing
│   ├── loading.tsx  # Blog skeleton
│   ├── [slug]/
│   │   ├── page.tsx      # Blog detail
│   │   └── not-found.tsx # Blog 404
├── projects/        # /projects routes
│   ├── page.tsx     # Project listing
│   ├── loading.tsx  # Project skeleton
│   ├── [name]/
│   │   ├── page.tsx        # Project detail
│   │   └── project-detail.tsx # Detail component
├── (seo)/           # SEO images
│   ├── opengraph-image.tsx
│   └── twitter-image.tsx
├── feed.xml/
│   └── route.ts     # RSS feed
├── robots.ts        # robots.txt
└── sitemap.ts       # sitemap.xml
```

## CONVENTIONS

- Route groups `(seo)` for logical organization
- Dynamic routes `[slug]` (blogs), `[name]` (projects)
- Separate `loading.tsx` per route segment
- `export const metadata` for SEO
- Image remotePatterns in next.config.ts: drive.google.com, githubusercontent.com
