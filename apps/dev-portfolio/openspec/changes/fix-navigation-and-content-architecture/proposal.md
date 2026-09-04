# Change Proposal: fix-navigation-and-content-architecture

## Why
The portfolio should behave as a clear funnel:
- one complete landing page with section-based navigation,
- short previews for long content sections,
- dedicated listing pages for all content,
- dedicated detail pages for full project/blog content.

Current behavior is close but inconsistent in key areas: broken/partial section navigation alignment, preview sections showing too many items, and mixed internal link patterns.

## What
1. Align homepage structure with navigation anchors (About, Experience, Projects, Blogs, GitHub).
2. Show limited previews on homepage:
   - Projects: first 4
   - Blogs: first 5
3. Keep "View All" buttons routing to full listing pages:
   - `/projects`
   - `/blogs`
4. Keep and polish full detail pages:
   - `/projects/[slug]`
   - `/blogs/[slug]`
5. Define a maintainable content architecture:
   - Projects in structured data (JSON/TS)
   - Blogs in MDX (or staged migration plan)
6. Seed demo content for both projects and blogs.

## Scope
- Navigation + homepage section composition
- Internal link consistency and route behavior
- Preview/list/detail content flow
- Content storage strategy documentation + starter demo data

## Non-goals
- CMS integration
- Authentication/authoring UI
- Multi-language content pipeline

## Success Criteria
- Header section links scroll to valid sections on homepage.
- Homepage shows limited previews only.
- "View All" routes show complete collections.
- Clicking a project/blog opens a full detail page.
- Content storage pattern is documented and applied with demo entries.
