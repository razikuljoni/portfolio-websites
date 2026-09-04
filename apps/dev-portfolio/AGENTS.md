# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-16 18:52 UTC
**Commit:** 636e8fe
**Branch:** dev

## OVERVIEW

Next.js 16 portfolio site for Razikul Islam Joni. Full-stack with App Router, Framer Motion animations, shadcn/ui component system.

## STRUCTURE

```
dev-portfolio/
├── app/           # Routes, layouts, SEO (20 files)
│   ├── about/resume/  # Resume PDF-printable route
│   ├── blogs/     # Blog listing + [slug] detail
│   ├── projects/  # Project listing + [name] detail
│   └── (seo)/     # opengraph + twitter images
├── components/    # React components (23 files)
│   ├── ui/        # shadcn-style primitives (9 files)
│   └── *.tsx      # Feature sections (hero, blog, project cards)
├── db/            # Data layer (blogs.ts, projects.json)
├── lib/           # Utilities (site config, cn() helper)
├── types/         # TypeScript types (project.ts)
├── goals/         # Goal packages for tracked features
└── public/        # Static assets (images, screenshots)
```

## WHERE TO LOOK

| Task                    | Location                                            |
| ----------------------- | --------------------------------------------------- |
| Add/edit page           | `app/`                                              |
| Add/edit resume content | `app/about/resume/` (page.tsx + resume-content.tsx) |
| Add/edit component      | `components/` or `components/ui/`                   |
| Update portfolio data   | `db/` (blogs.ts, projects.json)                     |
| Update site config      | `lib/site.ts`                                       |
| Style utilities         | `lib/utils.ts` (cn())                               |
| Type definitions        | `types/project.ts`                                  |

## CONVENTIONS

- Next.js 16 App Router (file-based routing)
- `@/` path aliases (e.g. `@/components/ui/button`)
- React 19 + TypeScript strict mode
- Tailwind CSS 4 for styling
- shadcn/ui component pattern (forwardRef + cn() + variants)
- Framer Motion for page/component animations
- ESLint 9 with next/core-web-vitals + TypeScript plugins

## ANTI-PATTERNS

- Don't use Pages Router (App Router only)
- Don't inline styles (use Tailwind classes)
- Don't use `any` type (strict mode enforced)

## COMMANDS

```bash
pnpm dev      # Start dev server (localhost:3000)
pnpm build    # Production build
pnpm lint     # ESLint check
```

## NOTES

- Graphify knowledge graph at `graphify-out/` — run `/graphify` to query
- 533 nodes, 997 edges across 75 communities (see GRAPH_REPORT.md)
- God nodes: cn() (131 edges), Button() (18), siteConfig (16)
- Resume at `/about/resume` uses `window.print()` with `beforeprint`/`afterprint` JS events
- Print mode hides `<header>` via JS + resets `.resume-page-wrapper` padding

---

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, invoke the `skill` tool with `skill: "graphify"` before doing anything else.

Rules:

- ALWAYS read graphify-out/GRAPH_REPORT.md before reading any source files, running grep/glob searches, or answering codebase questions. The graph is your primary map of the codebase.
- IF graphify-out/wiki/index.md EXISTS, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

---

<skills_system priority="1">

## Available Skills

<!-- SKILLS_TABLE_START -->
<usage>
When users ask you to perform tasks, check if any of the available skills below can help complete the task more effectively. Skills provide specialized capabilities and domain knowledge.

How to use skills:

- Invoke: `npx openskills read <skill-name>` (run in your shell)
    - For multiple: `npx openskills read skill-one,skill-two`
- The skill content will load with detailed instructions on how to complete the task
- Base directory provided in output for resolving bundled resources (references/, scripts/, assets/)

Usage notes:

- Only use skills listed in <available_skills> below
- Do not invoke a skill that is already loaded in your context
- Each skill invocation is stateless
  </usage>

<available_skills>

<skill>
<name>algorithmic-art</name>
<description>Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration. Use this when users request creating art using code, generative art, algorithmic art, flow fields, or particle systems. Create original algorithmic art rather than copying existing artists' work to avoid copyright violations.</description>
<location>project</location>
</skill>

<skill>
<name>brand-guidelines</name>
<description>Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply.</description>
<location>project</location>
</skill>

<skill>
<name>canvas-design</name>
<description>Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece of art, design, or other static piece. Create original visual designs, never copying existing artists' work to avoid copyright violations.</description>
<location>project</location>
</skill>

<skill>
<name>frontend-design</name>
<description>Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.</description>
<location>project</location>
</skill>

<skill>
<name>openspec-apply-change</name>
<description>Implement tasks from an OpenSpec change. Use when the user wants to start implementing, continue implementation, or work through tasks.</description>
<location>project</location>
</skill>

<skill>
<name>openspec-archive-change</name>
<description>Archive a completed change in the experimental workflow. Use when the user wants to finalize and archive a change after implementation is complete.</description>
<location>project</location>
</skill>

<skill>
<name>openspec-explore</name>
<description>Enter explore mode - a thinking partner for exploring ideas, investigating problems, and clarifying requirements. Use when the user wants to think through something before or during a change.</description>
<location>project</location>
</skill>

<skill>
<name>openspec-propose</name>
<description>Propose a new change with all artifacts generated in one step. Use when the user wants to quickly describe what they want to build and get a complete proposal with design, specs, and tasks ready for implementation.</description>
<location>project</location>
</skill>

<skill>
<name>skill-creator</name>
<description>Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an existing skill, run evals to test a skill, benchmark skill performance with variance analysis, or optimize a skill's description for better triggering accuracy.</description>
<location>project</location>
</skill>

<skill>
<name>theme-factory</name>
<description>Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact that has been creating, or can generate a new theme on-the-fly.</description>
<location>project</location>
</skill>

<skill>
<name>web-artifacts-builder</name>
<description>Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui). Use for complex artifacts requiring state management, routing, or shadcn/ui components - not for simple single-file HTML/JSX artifacts.</description>
<location>project</location>
</skill>

<skill>
<name>webapp-testing</name>
<description>Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser logs.</description>
<location>project</location>
</skill>

</available_skills>

<!-- SKILLS_TABLE_END -->

</skills_system>
