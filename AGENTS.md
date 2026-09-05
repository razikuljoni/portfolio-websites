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
pnpm dev           # Parallel dev server with colorful concurrently output
pnpm dev:ui        # Interactive TUI dashboard with sidebar app switcher (pnpm dev:dash)
pnpm dev:01        # Dev server for portfolio-01-minimal (port 3001)
pnpm dev:02        # Dev server for portfolio-02-dev (port 3002)
pnpm dev:03        # Dev server for portfolio-03-interactive (port 3003)
pnpm dev:04        # Dev server for portfolio-04-vite-express (port 3004)
pnpm build         # Build all apps & packages
pnpm lint          # Lint all apps
pnpm format        # Format codebase with Prettier
pnpm check         # Run lint + typecheck across workspace
```

## Conventions
- Shared profile data belongs in `packages/profile-data/src/index.ts`.
- Reusable UI elements belong in `packages/ui/src/components/`.
- Featured projects (`z-shop` #1, `SensorGrid` #2) take priority across all apps.
- Non-conflicting dev ports enforced: `3001` (01), `3002` (02), `3003` (03), `3004` (04).
- Strict TypeScript configuration enabled across all packages and apps.
