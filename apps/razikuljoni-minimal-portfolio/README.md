# Razikul Joni Portfolio

Standalone Next.js portfolio with a responsive editorial landing page, project case studies, professional experience, social metadata, and a printable A4 résumé at `/resume`.

## Requirements

- Node.js 22.13 or later
- pnpm 10 or npm 10+

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
pnpm build
pnpm start
```

## Validate changes

```bash
pnpm check
pnpm build
```

`pnpm check` runs ESLint and TypeScript validation.

## AI-assisted development

Project instructions are in [`AGENTS.md`](./AGENTS.md). The repository also
includes a Next.js DevTools MCP configuration and a locked set of reusable
skills. See [`docs/AI_SETUP.md`](./docs/AI_SETUP.md) for setup and usage.

This package is independent of ChatGPT Sites, Vite, Vinext, Wrangler, and Cloudflare-specific configuration.
