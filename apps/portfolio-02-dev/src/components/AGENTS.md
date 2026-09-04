# components/ — React Components

## OVERVIEW

23 React components — feature sections + UI primitives. React 19, TypeScript, Tailwind CSS 4, Framer Motion.

## STRUCTURE

```
components/
├── ui/              # shadcn-style primitives (9 files)
├── hero-section.tsx        # Home hero
├── about-section.tsx       # About
├── experience-section.tsx  # Experience timeline
├── projects-section.tsx    # Project grid
├── project-card.tsx        # Individual project card
├── blogs-section.tsx       # Blog listing
├── github-section.tsx      # GitHub activity
├── contact-form.tsx        # Contact form + validation
├── header-section.tsx      # Navigation header
├── footer-section.tsx      # Site footer
├── command-palette.tsx     # CMD+K search
└── background-paths.tsx    # Floating SVG paths
```

## CONVENTIONS

- Feature components: `export default function ComponentName()`
- UI primitives: named exports via `export { Name }` (shadcn pattern)
- `cn()` from `@/lib/utils` for class merging
- `cva` (class-variance-authority) for variants
- `@radix-ui/*` for accessible primitives
- `framer-motion` for animations
- `lucide-react` for icons
