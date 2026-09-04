# Tasks: theme-system-overhaul

- [x] 1. Establish theme manager + pre-hydration theme script
  - [x] 1.1 Add inline theme init script in `app/layout.tsx` (system → dark fallback)
  - [x] 1.2 Add `suppressHydrationWarning` and ensure `dark` class is the only theme switch
  - [x] 1.3 Create a shared theme state/util (read + write localStorage)
  - [x] 1.4 Listen for system preference changes when no manual preference exists

- [x] 2. Rebuild the toggle as a two-state controller
  - [x] 2.1 Connect toggle to the shared theme state (no local-only state)
  - [x] 2.2 Persist manual choice and update `html` class immediately
  - [x] 2.3 Keep ARIA labels and focus styles intact
  - [x] 2.4 Add a clear visual indicator of the current theme

- [x] 3. Implement manual-toggle transition animation
  - [x] 3.1 Create overlay component with `clip-path` (radial reveal or corner wipe)
  - [x] 3.2 Trigger overlay only on manual toggles
  - [x] 3.3 Respect `prefers-reduced-motion` and provide a no-animation path

- [x] 4. Light/dark design system audit
  - [x] 4.1 Replace hard-coded colors with semantic tokens across pages/components
  - [x] 4.2 Review borders, muted text, and backgrounds for contrast in both themes
  - [x] 4.3 Normalize shared layout tokens across `:root` and `.dark`
  - [x] 4.4 Add `transition-colors` where appropriate for smoother theme shifts

- [ ] 5. Validation pass
  - [ ] 5.1 Test initial load: system dark/light + fallback dark
  - [ ] 5.2 Test live system theme changes with no manual preference
  - [ ] 5.3 Test toggle persistence across reloads
  - [ ] 5.4 Verify all sections/pages look correct in both themes
