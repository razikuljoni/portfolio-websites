# Design: resume-driven-profile-refresh-and-blog-route-fix

## Architecture Notes
- Keep hero and about as presentational components in `components/`.
- Use lightweight in-component data arrays for rotating titles and tech-stack metadata.
- Use Framer Motion `AnimatePresence` + variants for role-title swap animation.
- Keep nav smoothness in two layers:
  1) global CSS `scroll-behavior: smooth`,
  2) section `scroll-mt-*` offsets to account for fixed header.

## Role Rotation Behavior
- Rotate title index every ~2.6s.
- Exit animation: fade + translateY(-10)
- Enter animation: fade + translateY(10) -> 0

## Tech Stack Tooltip Model
Each stack item includes:
- `name`
- `href` (official docs/site)
- `description` (small practical purpose)
- optional `level` (e.g., "Learning")

Tooltip style:
- appears on hover/focus
- subtle blur + border + shadow
- includes external-link affordance

## Blog Route Fix
Update blog detail route to align with current App Router param pattern used in project detail route:
- `params` as async payload where needed
- await params in `generateMetadata` and page component

## Risks
- Large hero rewrite may accidentally regress UI details.
  - Mitigation: preserve existing CTAs and profile image structure.
- Tooltip content can get noisy on mobile.
  - Mitigation: compact text and constrained width.
