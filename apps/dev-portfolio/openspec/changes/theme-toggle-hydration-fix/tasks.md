# Tasks: theme-toggle-hydration-fix

- [ ] 1. Unify resolved theme source
  - [ ] 1.1 Update theme init script to set `data-theme` on `<html>`
  - [ ] 1.2 Initialize ThemeProvider state from `data-theme`

- [ ] 2. Fix toggle hydration mismatch
  - [ ] 2.1 Choose a toggle strategy (mount-gated or DOM-sourced)
  - [ ] 2.2 Implement toggle state mapping so UI matches resolved theme

- [ ] 3. Remove staggered reload transitions
  - [ ] 3.1 Gate color transitions behind `html.theme-transition`
  - [ ] 3.2 Ensure side pattern columns update in sync with the center content

- [ ] 4. Validate behavior
  - [ ] 4.1 Reload in light mode → toggle shows light
  - [ ] 4.2 Reload in dark mode → no light flash or staggered panels
  - [ ] 4.3 Manual toggle → radial transition still works
