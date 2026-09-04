# Resume Integration — Implementation Plan

## Approach
Convert the HTML resume into a Next.js route at `/about/resume`. The resume content lives in a dedicated client component with Tailwind classes adapted for dark mode. The print/download button uses `window.print()` with `@media print` styles. Update hero + footer links to point to the new route.

## Files Touched

| Step | File | Action | Verification |
|------|------|--------|-------------|
| 1 | `src/app/about/resume/page.tsx` | **Create** — server component, metadata, imports ResumeContent | Exists, no TS errors |
| 2 | `src/app/about/resume/resume-content.tsx` | **Create** — "use client" component, full resume HTML converted to Tailwind JSX with dark mode, print button with `window.print()`, `@media print` styles | Renders correctly, print dialog opens |
| 3 | `src/components/hero-section.tsx` | **Edit** — Change "Show Resume" button from `window.open(Google Drive)` to `<Link href="/about/resume">` | Click navigates to `/about/resume` |
| 4 | `src/components/footer-section.tsx` | **Edit** — Change footer resume icon href from `/narsi_resume.pdf` to `/about/resume`, remove `target="_blank"` | Click navigates to `/about/resume` |
| 5 | `src/app/about/resume/page.tsx` | **Edit** — Add `resume-page-wrapper` class to wrapper div for print targeting | Class present |
| 6 | `src/app/about/resume/resume-content.tsx` | **Edit** — Add `useEffect` with `beforeprint`/`afterprint` events to hide `<header>` and reset wrapper padding during print | Print excludes header and extra padding |
| 7 | `src/app/globals.css` | **Edit** — Add global `@media print` fallback rules for `header` and `.resume-page-wrapper` | Print fallback active |

## Step Details

### Step 1: Page route (`src/app/about/resume/page.tsx`)
- Simple server component
- Export metadata for SEO
- Import and render `<ResumeContent />`

### Step 2: Resume component (`src/app/about/resume/resume-content.tsx`)
- "use client" — uses `window.print()` for download button
- Convert HTML structure to JSX with Tailwind classes
- **Color mapping for dark mode:**
  - Body bg: `#fff` → `bg-background`
  - Body text: `#1a1a1a` → `text-foreground`
  - Name: `#0f172a` → `text-foreground`
  - Role title: `#1a56db` → `text-blue-600 dark:text-blue-400`
  - Section titles: `#1a56db` → `text-blue-600 dark:text-blue-400`
  - Contact/body text: `#374151` → `text-muted-foreground`
  - Job company: `#1a56db` → `text-blue-600 dark:text-blue-400`
  - Skill tags: `bg-#eff6ff text-#1e40af` → `bg-primary/10 text-primary`
  - Borders: `#dbeafe` → `border-border`
  - Muted text: `#6b7280` → `text-muted-foreground`
- **Print/Download button:**
  - Positioned in header area, opposite name & role (right-aligned)
  - Uses `Button` component from `@/src/components/ui/button`
  - Icon from `lucide-react` (`Download` or `Printer`)
  - `onClick={() => window.print()}`
  - Hidden during print via `@media print { .no-print { display: none } }`
- **Print styles** (`@media print`):
  - Hide `.no-print` elements (button, any non-essential UI)
  - Page margins: standard resume margins
  - page-break-inside: avoid on sections
  - Remove background colors/effects
  - Ensure the layout fits within print area

### Step 3: Hero section edit
- Import `useRouter` from `next/navigation`
- Change the "Show Resume" button onClick from Google Drive URL to `router.push('/about/resume')`

### Step 4: Footer section edit
- Change `<Link href="/narsi_resume.pdf">` to `<Link href="/about/resume">`

### Step 5: Print wrapper class
- Add `resume-page-wrapper` className alongside `py-20!` on the wrapper div in page.tsx
- This class enables CSS/JS targeting for print-specific behavior

### Step 6: Beforeprint/afterprint events
- Add `useEffect` hook that registers `beforeprint`/`afterprint` event listeners
- On `beforeprint`: hide `<header>` with `header.style.display = "none"` and reset wrapper padding with `wrapper.style.padding = "0"`
- On `afterprint`: restore both to their original values
- Direct DOM manipulation bypasses CSS layer/specificity issues that `@media print` can have with Tailwind 4's layered utilities
- Also keeps the global CSS `@media print` rules as a secondary fallback

### Step 7: Global print CSS fallback
- Add `header { display: none !important; }` to `@media print` in globals.css
- Add `.resume-page-wrapper { padding: 0 !important; }` to the same rule
- These act as fallback in case JS doesn't fire, though JS approach is primary

## Risks
- Skill tag styling needs careful dark-mode adaptation (translucent backgrounds)
- Print layout should match the original resume's A4 proportions (210mm × 297mm)
- The blue accent (`#1a56db`) needs a `text-blue-600 dark:text-blue-400` approach since there's no dedicated accent variable in the theme
- `window.print()` behavior varies slightly across browsers — testing needed
