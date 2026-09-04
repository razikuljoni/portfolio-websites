# Design: theme-toggle-hydration-fix

## Overview
We will eliminate theme state mismatches by establishing a reliable, DOM-visible theme marker at the earliest possible time and ensuring the toggle UI uses it consistently. We will also remove any transition effects during initial load and apply transitions only when a manual toggle occurs. This keeps the initial render stable while preserving the radial transition for user-driven switches.

## Root Cause Hypotheses
- **Toggle mismatch**: The toggle renders before the client resolves the theme, so the initial DOM shows the server default (dark) even when the resolved theme is light.
- **Staggered reload**: The center content transitions color (via `transition-colors`) while the side pattern columns update immediately, creating a visual split.

## Architecture

### 1) Single source of truth: `data-theme` on `<html>`
- Theme init script sets `data-theme="light|dark"` and toggles the `dark` class.
- Theme provider reads `data-theme` for its initial state so it matches what was actually rendered.

### 2) Toggle hydration strategy
Two viable approaches (pick one):
- **Mount-gated render**: render a placeholder until client hydration completes, then show the toggle.
- **DOM-sourced render**: read `document.documentElement.dataset.theme` on first client render to avoid mismatch.

Either way, the toggle reflects the same theme the user sees on screen.

### 3) Transition gating
- Remove global color transitions on initial load.
- Only apply transitions when `html.theme-transition` is present (manual toggles).
- Ensure the side pattern columns share the same transition gating (or are fully captured by View Transitions).

## Interaction Flow (Desired)
```
Initial load:
  Theme script → sets data-theme + class BEFORE paint
  Toggle reads data-theme → matches rendered theme
  No transitions run

Manual toggle:
  Add html.theme-transition
  ViewTransition radial reveal
  Update theme
  Remove html.theme-transition
```

## Acceptance Notes
- Toggle must never show the opposite state after reload.
- Dark reloads should be visually stable with no light flash or staggered side panels.
- Radial reveal remains only for manual toggles.
