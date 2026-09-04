# Design: fix-navigation-and-content-architecture

## Overview
Implement a stable information architecture with 3 content levels:
1. **Homepage previews** (limited, scannable)
2. **Listing pages** (complete collections)
3. **Detail pages** (full content)

Navigation anchors should map 1:1 with rendered homepage sections.

## IA and Route Model

```text
/ (landing, sectioned)
  ├─ #about
  ├─ #experience
  ├─ #projects (4-item preview)
  ├─ #blogs (5-item preview)
  └─ #github

/projects           (all projects)
/projects/[slug]    (single project detail)

/blogs              (all blogs)
/blogs/[slug]       (single blog detail)
```

## Navigation Behavior
- Desktop and mobile nav use the same section IDs.
- Internal page navigation should be smooth-scroll for in-page anchors.
- Cross-page links should use framework-native routing components for prefetch and accessibility.

## Content Strategy
### Projects
- Keep in structured data (`db/projects.json` + strict type).
- Best for metadata-rich content and filtering/search.

### Blogs
- Migrate to MDX-backed content (`content/blogs/*.mdx`) with frontmatter:
  - `slug`, `title`, `date`, `summary`, `readTime`, `tags`
- Use a thin loader layer to map frontmatter/body into the existing blog list/detail UI.

## Data/Component Responsibilities
- Home section components own preview limits only.
- Listing pages own full collection rendering.
- Detail pages render full content and canonical back-links.
- Shared helpers can normalize sorting (e.g., newest first).

## Risks and Mitigations
- **Risk:** ID/link mismatch causes dead nav links.
  - **Mitigation:** enforce a shared source of truth for nav keys and section IDs.
- **Risk:** MDX migration breaks existing blog routes.
  - **Mitigation:** staged migration with compatibility adapter.
- **Risk:** duplicated layout logic between preview/list pages.
  - **Mitigation:** extract small reusable card/list primitives.
