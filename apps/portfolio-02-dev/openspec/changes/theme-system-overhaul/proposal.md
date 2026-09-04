# Change Proposal: theme-system-overhaul

## Why
The current theme toggle applies the `dark` class only after hydration, causing a flash of light mode on first paint. It also adds a `light` class without a matching theme block, so light mode behavior is implicit and can drift. Users want the app to respect system preference by default, fall back to dark when system data is unavailable, and avoid harsh theme switches. The visual system also needs a full audit so every section reads clearly in both themes with consistent contrast.

## What
Implement a proper, SSR-safe theming system with two states (light/dark), system-aware default behavior that can react to OS changes when no manual preference exists, and a manual toggle that persists user choice and reflects the active theme. Add a smooth, intentional theme transition animation for manual toggles, and update the design system usage across all pages/components to ensure consistent light/dark contrast.

## Scope
- Add a theme manager that sets the correct class before first paint, honoring system preference with a dark fallback and listening for system changes when no manual override exists.
- Persist user choice and keep the two-state toggle in sync with the current theme (visual indicator included).
- Introduce a theme transition overlay animation for manual toggles only (respect reduced motion).
- Audit and update components/pages to rely on semantic color tokens so light/dark both look correct.
- Ensure contrast, borders, layout tokens, and interactive states meet readability expectations in both themes.

## Non-goals
- No third “system” toggle state or user accounts.
- No server-side user preferences.
- No redesign of layout or content beyond theme/contrast adjustments.

## Success Criteria
- Initial render matches system theme (or dark fallback) without a flash.
- Manual toggle switches instantly in state, with a smooth visual transition.
- All pages/sections look intentional in both light and dark modes, with legible contrast.
- Theme preference persists across reloads.
