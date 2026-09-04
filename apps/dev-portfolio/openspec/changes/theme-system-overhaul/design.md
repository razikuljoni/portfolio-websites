# Design: theme-system-overhaul

## Overview
We’ll introduce a small theme manager that applies the correct theme class before hydration, respects system preference by default, and persists manual choice. Manual toggles trigger a visual transition overlay so the shift feels intentional rather than abrupt. A UI audit will migrate remaining hardcoded colors to semantic tokens so both themes remain consistent and readable.

## Theme Selection Logic
Two states only (light/dark), with this priority order:

```
1) stored user preference (localStorage)
2) system preference (prefers-color-scheme)
3) fallback = dark
```

If no stored preference exists, listen to `prefers-color-scheme` changes and update the theme live. This logic must run before first paint (inline script in `head`) to avoid the initial flash.

## Architecture

### Theme manager
- **Location**: a small utility + provider in the App Router layout.
- **Responsibilities**:
  - Read stored preference (absence means “follow system”).
  - Resolve system theme when no preference exists.
  - Listen for `prefers-color-scheme` changes when following system.
  - Apply `class="dark"` (or remove it) on `<html>`.
  - Expose `theme` state to the toggle (light/dark) for a clear visual indicator.

### Early theme application (no flash)
Use an inline script in `app/layout.tsx` (or a dedicated ThemeScript component) that runs before hydration:
- Read `localStorage.getItem("theme")`.
- If absent, check `matchMedia('(prefers-color-scheme: dark)')`.
- If unavailable, default to dark.
- Add/remove `dark` class accordingly.

Also add `suppressHydrationWarning` on `<html>` to avoid mismatches when the client finalizes state.

### Toggle behavior (two-state)
- Toggle simply flips between light/dark.
- Persist new value to localStorage (and set a manual override flag by presence of the key).
- Use the same source of truth as the theme manager (no duplicate state).
- UI reflects the active theme (e.g., sun/moon state).

## Theme Transition Animation (manual toggle only)
We’ll introduce a temporary full-screen overlay that reveals the next theme in a directional wipe or radial reveal (pick one, default to radial).

**Concept:**
```
Toggle → create overlay with target theme colors
       → animate clip-path (radial expand or corner wipe)
       → apply actual theme class when animation completes
       → remove overlay
```

**Implementation sketch:**
- A `ThemeTransitionOverlay` component mounted at the root.
- On manual toggle:
  - Set `data-theme-transition="in"` and `data-theme-target="dark|light"` on `html`.
  - Render an overlay using CSS variables from the target theme.
  - Animate via `@keyframes` + `clip-path` (or scale/transform with transform-origin).
  - Respect `prefers-reduced-motion` by skipping the animation.

## Design System + Contrast Audit
- Replace any hard-coded light/dark colors with semantic tokens (`bg-background`, `text-foreground`, `border-border`, `bg-muted`, etc.).
- Ensure high-contrast text and focus states in both themes.
- Confirm patterns/gradients use theme tokens instead of fixed values.
- Normalize layout tokens (e.g., `--content-max-width`, `--pattern-fg`, `--pattern-border`) so they exist in both `:root` and `.dark`.
- Add gentle `transition-colors` for background/text on key wrappers to smooth the shift.

## Risks & Mitigations
- **FOUC persists**: ensure the inline script runs before hydration and doesn’t rely on React.
- **Inconsistent state**: make toggle read from the theme manager, not its own local state.
- **Heavy animation**: keep overlay lightweight and disable for reduced-motion.
- **Token drift**: audit all sections for any fixed color or background not aligned with tokens.

## Acceptance Notes
- Default theme is system-driven (dark fallback).
- System preference updates are honored when no manual override exists.
- Only two toggle states, with a visible indicator of the active theme.
- Transition only on manual toggle, not on initial load or system detection.
