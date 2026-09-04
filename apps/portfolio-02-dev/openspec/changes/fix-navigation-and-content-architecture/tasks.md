# Tasks: fix-navigation-and-content-architecture

- [x] 1. Align homepage sections with navigation anchors
  - [x] 1.1 Ensure `#about`, `#experience`, `#projects`, `#blogs`, `#github` all exist on landing page
  - [x] 1.2 Validate desktop and mobile nav anchor behavior

- [x] 2. Enforce preview limits on landing page
  - [x] 2.1 Limit projects preview to 4 items
  - [x] 2.2 Limit blogs preview to 5 items
  - [x] 2.3 Keep "View All" links at section end

- [x] 3. Normalize internal navigation links
  - [x] 3.1 Replace internal `<a href="/...">` usage with framework routing links where appropriate
  - [x] 3.2 Keep external links as `<a target="_blank" rel="noopener noreferrer">`

- [x] 4. Verify list/detail route flow
  - [x] 4.1 `/projects` shows all projects
  - [x] 4.2 `/projects/[slug]` shows full project details
  - [x] 4.3 `/blogs` shows all blogs
  - [x] 4.4 `/blogs/[slug]` shows full blog content

- [x] 5. Implement content storage strategy
  - [x] 5.1 Keep/refine projects in structured JSON/TS schema
  - [x] 5.2 Add MDX content structure for blogs (or adapter plan if staged)
  - [x] 5.3 Document content authoring conventions

- [x] 6. Seed demo content
  - [x] 6.1 Add at least 2 demo projects with realistic metadata
  - [x] 6.2 Add at least 2 demo blogs with full-detail-ready content

- [x] 7. Validate
  - [x] 7.1 Run lint/type checks for changed files
  - [x] 7.2 Manual navigation test: section anchors, view-all routes, detail pages

> Validation note: targeted eslint for changed files passes. Browser-level manual checks should still be confirmed in `pnpm dev`.
