<!-- Context: project-intelligence/technical | Priority: critical | Version: 1.2 | Updated: 2026-05-19 -->

# Technical Domain

**Purpose**: Tech stack, architecture, and development patterns for dev-portfolio.
**Last Updated**: 2026-05-19

## Quick Reference
**Update Triggers**: Library upgrades | New components | Architecture changes
**Audience**: Developers, AI agents

## Primary Stack
| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Framework | Next.js (App Router) | 16.1.6 | SSG + file-based routing, optimal for portfolio |
| Language | TypeScript | 5 | Strict mode, type safety |
| Styling | Tailwind CSS | 4 | Utility-first, responsive design system |
| UI Components | shadcn/ui + Radix UI | — | Accessible, composable primitives |
| Animation | Framer Motion | 12.31 | Declarative animations, AnimatePresence |
| Icons | lucide-react, react-icons | — | Consistent icon library |
| Package Manager | pnpm | 10.30 | Fast, disk-efficient |
| Infrastructure | Vercel (inferred) | — | Optimized for Next.js deployment |

## Code Patterns

### Route Handler (only server endpoint)
```typescript
// app/feed.xml/route.ts
import { siteConfig } from "@/lib/site";

export async function GET() {
    // Build response content
    return new Response(xmlString, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
}
```

### Feature Component
```typescript
// components/hero-section.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function HeroSection() {
    // Framer Motion animated section with cn() class merging
    return <section className={cn("...")}>...</section>;
}
```

### UI Primitive (shadcn pattern)
```typescript
// components/ui/button.tsx
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("...", { variants: { ... } });

interface ButtonProps extends VariantProps<typeof buttonVariants> {}
// forwardRef + cn() + variants
```

### Button + Link (avoids nested interactive elements)
```typescript
// GOOD — renders as single <a> styled as button
<Button render={<Link href="/about/resume" />} nativeButton={false}
        aria-label="Show Resume" variant="default">
    <GrDocumentText />
    <span>Show Resume</span>
</Button>

// BAD — <a> wrapping <button>, invalid HTML
<Link href="/about/resume"><Button>...</Button></Link>
```

### Theme Init Script (next/script)
```typescript
// app/layout.tsx — replaces dangerouslySetInnerHTML
<Script id="theme-init" strategy="beforeInteractive">
    {`document.documentElement.classList.toggle("dark", ...)`}
</Script>
```

### React 19 `use()` Hook
```typescript
// theme-provider.tsx — replaces useContext
import { use } from "react";
// ...
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export function useTheme() {
    const context = use(ThemeContext);
    if (!context) throw new Error("useTheme must be within ThemeProvider");
    return context;
}
```

### Print-Friendly Resume
```typescript
// resume-content.tsx — beforeprint/afterprint JS events
useEffect(() => {
    const handleBeforePrint = () => {
        const header = document.querySelector("header");
        const wrapper = document.querySelector(".resume-page-wrapper");
        header!.style.display = "none";
        wrapper!.classList.add("printing");
    };
    const handleAfterPrint = () => {
        const header = document.querySelector("header");
        const wrapper = document.querySelector(".resume-page-wrapper");
        header!.style.display = "";
        wrapper!.classList.remove("printing");
    };
    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);
    return () => { window.removeEventListener("beforeprint", handleBeforePrint);
                   window.removeEventListener("afterprint", handleAfterPrint); };
}, []);
```

## Naming Conventions
| Type | Convention | Example |
|------|-----------|---------|
| Files | `kebab-case` | `hero-section.tsx` |
| Components | `PascalCase` | `HeroSection`, `ProjectCard` |
| Functions | `camelCase` | `validateEmail`, `validateForm` |
| Types/Interfaces | `PascalCase` | `FormData`, `FormErrors` |

## Code Standards
- TypeScript strict mode (no `any` type)
- Next.js App Router only (no Pages Router)
- `@/` path aliases for imports (e.g. `@/components/ui/button`)
- Tailwind CSS for all styling (no inline styles)
- shadcn/ui pattern: `cn()` + `cva` + forwardRef + variants
- Framer Motion for page/component animations; `LazyMotion`/`m`/`domAnimation` for bundle savings
- `"use client"` directive for interactive components
- `Button render={<Link />} nativeButton={false}` — never nest `<a>` inside `<button>`
- `next/script` with `strategy="beforeInteractive"` for theme init (not inline `<script>`)
- React 19 `use()` hook replaces `useContext` for context consumption

## Security Requirements
- Client-side form validation (email regex, required fields, min length)
- Web3Forms handles server-side spam protection for contact form
- Static portfolio — no database, reduced attack surface
- Proper HTTP headers via Next.js config

## 📂 Codebase References
**Feature components**: `app/page.tsx`, `components/*.tsx` — section compositions (23 files)
**UI primitives**: `components/ui/*.tsx` — shadcn-style components (9 files: accordion, button, card, empty, input, not-found-2, not-found-content, textarea, toggle-button)
**Resume route**: `app/about/resume/page.tsx` + `resume-content.tsx` — server page + client component (print via beforeprint/afterprint)
**Route handlers**: `app/feed.xml/route.ts` — RSS feed
**Button+Link pattern**: `components/hero-section.tsx` (line ~211) — `render={<Link />} nativeButton={false}`
**Theme init**: `app/layout.tsx` — `Script id="theme-init" strategy="beforeInteractive"`
**Theme provider**: `components/theme-provider.tsx` — React 19 `use()` hook for context
**Dock**: `components/ui/dock.tsx` — `LazyMotion`/`domAnimation` for reduced bundle
**Config**: `package.json`, `tsconfig.json`, `next.config.*`
