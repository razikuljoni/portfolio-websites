# Change Proposal: theme-toggle-hydration-fix

## Why
Two UX issues remain after the theming overhaul:
1) When the user has manually selected light mode, a reload sometimes shows the toggle in the dark position even though the page is light.
2) On dark reload, the center content flips to dark slightly after load while the side pattern columns lag, creating a mismatched flash.

These issues degrade trust in the toggle state and make the initial render feel unstable.

## What
Align the toggle with the resolved theme at hydration time and eliminate staggered background updates on reload. The fix will tighten the theme initialization pipeline so every layer (center + side columns + toggle UI) is synced from the first paint, while preserving radial transitions for manual toggles only.

## Scope
- Establish a single source of truth for the resolved theme (e.g., `data-theme` on `<html>`).
- Ensure the toggle reads that value on first client render or delays UI until hydration.
- Gate all color transitions behind the manual toggle transition class so reloads don’t animate.
- Ensure side pattern columns and center content update together.

## Non-goals
- No new theme states beyond light/dark.
- No change to the radial manual toggle animation itself.
- No additional user settings UI.

## Success Criteria
- Reloading in light mode shows the toggle in the light position every time.
- Reloading in dark mode does not show a light flash or staggered background updates.
- Manual toggles still use the radial transition animation.
