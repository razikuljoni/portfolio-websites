# Repository instructions

## Project

This repository is MD Razikul Islam Joni's standalone portfolio and printable
résumé. It is a small Next.js 16 App Router application using React 19,
TypeScript, Tailwind CSS 4 through PostCSS, and pnpm.

There is currently no database, authentication, route-handler API, analytics
SDK, or required environment variable. Do not add infrastructure or a client
dependency unless the requested feature needs it.

## Structure

- `app/page.tsx` contains the portfolio content and server-rendered markup.
- `app/globals.css` contains the portfolio design system and responsive styles.
- `app/resume/` contains the A4 résumé route and its print stylesheet.
- `app/layout.tsx` owns global metadata, fonts, and Person structured data.
- `app/{manifest,robots,sitemap}.ts` and `app/site.ts` own discovery metadata.
- `public/` contains static images, icons, and the social preview image.
- `.agents/skills/` contains reusable, vendored project skills. Their sources and
  hashes are recorded in `skills-lock.json`.

## Commands

Use the package manager pinned in `package.json`:

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm start
```

`pnpm check` runs ESLint and TypeScript. Run it after code changes. Run
`pnpm build` before handing off changes that can affect rendering, routing,
metadata, or production compilation.

## Implementation conventions

- Keep components as React Server Components unless they require browser APIs or
  interactive state. Keep client boundaries small; `PrintButton.tsx` is the
  current example.
- Use `next/image` for raster images and provide accurate `alt` text plus
  responsive `sizes` when using `fill`.
- Use Next.js Metadata APIs and metadata file conventions instead of manually
  assembling SEO tags.
- Preserve the editorial visual language, existing CSS custom properties, strong
  typography, and print behavior. Check desktop, mobile, and `/resume` when
  changing shared layout or styles.
- Prefer semantic HTML, visible focus states, keyboard access, and reduced-motion
  support. Do not remove accessibility behavior to simplify styling.
- Keep content data near the page that renders it until reuse or a content source
  justifies extraction.
- Keep external links and the canonical production origin consistent across
  layout metadata, structured data, sitemap, and robots files.
- Do not commit generated output, caches, local editor state, logs, secrets, or
  `.env` files. If configuration variables are introduced, document them and
  commit a safe `.env.example`.

## AI tooling

- Start `pnpm dev` before using the `next-devtools` MCP server; it discovers the
  active port and connects to Next.js' built-in development endpoint.
- Use the skills already in `.agents/skills/` when the task matches them. Do not
  duplicate those skills or edit vendored skill content for ordinary app work.
- See `docs/AI_SETUP.md` for tool-specific setup and the skill inventory.
