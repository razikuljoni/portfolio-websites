# Resume Integration

**Goal:** Convert the HTML resume into a proper Next.js route at `/about/resume` with dark mode support and a PDF download button, then update the hero and footer links to point to the new page instead of external links.

**Facts:** `goals/resume-integration/facts.md`
**Plan:** `goals/resume-integration/plan.md`

## Done Condition
- Visiting `/about/resume` shows the resume with dark mode support
- The role title reads "Full Stack (MERN) Developer"
- A Download PDF button is visible opposite the name (hidden during print)
- The hero "Show Resume" button navigates to `/about/resume`
- The footer file icon links to `/about/resume`
- `window.print()` produces a clean PDF with proper A4 layout
- Printed PDF excludes the site header (`<header>`) via `beforeprint`/`afterprint` JS events
- Printed PDF has no extra padding (`.resume-page-wrapper` padding reset during print)
- Global `@media print` CSS provides fallback for both header hide and padding reset
