# Monorepo Instructions & Knowledge Base

## Overview
Monorepo containing MD Razikul Islam Joni's portfolio applications built with `pnpm` workspaces.

```
portfolio-websites/
├── apps/
│   ├── portfolio-01-minimal/       # Minimal Portfolio (Next.js 16)
│   ├── portfolio-02-dev/           # Full Dev Portfolio (Next.js 16)
│   ├── portfolio-03-interactive/   # Interactive Canvas Portfolio (Next.js 15)
│   └── portfolio-04-vite-express/  # Vite + React 19 + Express Portfolio
├── packages/
│   ├── profile-data/               # Shared single-source profile data
│   ├── ui/                         # Shared UI components & design primitives
│   ├── typescript-config/          # Base & specialized tsconfigs
│   └── eslint-config/              # Shared ESLint configurations
```

## Workspaces & Dependencies
- `@portfolio/profile-data`: Single source of truth for personal info, experience, education, projects.
- `@portfolio/ui`: Shared React component library (`HeaderBrand`, `Footer`, `SocialLinks`, `ProjectCardBadge`).
- `@portfolio/typescript-config`: Shared `tsconfig.json` bases (`base.json`, `nextjs.json`, `vite.json`).
- `@portfolio/eslint-config`: Shared ESLint flat configurations.

## Commands
```bash
pnpm install       # Install dependencies across monorepo
pnpm dev           # Parallel dev server for all apps
pnpm dev:01        # Dev server for portfolio-01-minimal
pnpm dev:02        # Dev server for portfolio-02-dev
pnpm dev:03        # Dev server for portfolio-03-interactive
pnpm dev:04        # Dev server for portfolio-04-vite-express
pnpm build         # Build all apps & packages
pnpm lint          # Lint all apps
pnpm format        # Format codebase with Prettier
pnpm check         # Run lint + typecheck across workspace
```

## Conventions
- Shared profile data belongs in `packages/profile-data/src/index.ts`.
- Reusable UI elements belong in `packages/ui/src/components/`.
- Strict TypeScript configuration enabled across all packages and apps.
