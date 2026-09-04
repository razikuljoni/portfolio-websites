# AI development setup

The repository keeps its agent setup small and project-specific. It includes
shared instructions, a Next.js development MCP server, and vendored skills. No
general-purpose filesystem, shell, GitHub, database, or browser MCP server is
required by the application itself.

## Instructions

- `AGENTS.md` is the canonical project context for coding agents.
- `.github/copilot-instructions.md` provides the compact GitHub Copilot entry
  point and directs Copilot to the canonical instructions.

Keep durable project facts in `AGENTS.md`; keep personal preferences and machine
paths in local agent settings that are ignored by Git.

## Next.js DevTools MCP

`.mcp.json` configures the official `next-devtools-mcp` bridge. Next.js 16
already exposes the development MCP endpoint, so `next.config.ts` needs no
experimental flag.

1. Install dependencies with `pnpm install`.
2. Start the application with `pnpm dev`.
3. Restart or reload the MCP-capable coding client after cloning the repository.
4. Ask the client to inspect routes, current errors, page metadata, or development
   logs through `next-devtools`.

The bridge is launched through `npx` on demand and may download its current
package version. It discovers the running Next.js port automatically. It is a
development tool and is not included in the production bundle.

## Skills

Project skills live in `.agents/skills/`; `skills-lock.json` records their source
and integrity hash. `.claude/skills/` contains relative links to the same skill
directories for Claude-compatible discovery. Commit all three together when the
skill inventory changes.

The current inventory covers:

- Next.js architecture, upgrades, and cache components
- React performance and composition
- frontend design, Tailwind CSS, accessibility, and SEO
- TypeScript types and Node.js/backend patterns

Use the smallest set relevant to a task. For example, a metadata change needs
the SEO and Next.js guidance, while a visual redesign also needs frontend design,
accessibility, and Tailwind guidance. Do not load backend skills for this static
portfolio unless a backend feature is actually requested.

## Validation tools

```bash
pnpm check   # ESLint followed by TypeScript checking
pnpm build   # optimized Next.js production build
```

For visual changes, also run `pnpm dev` and inspect `/` and `/resume` at desktop
and mobile widths. Confirm the résumé print preview remains A4.

## Secrets and local state

Do not place tokens in `.mcp.json`, instruction files, or committed settings.
Local environment files, MCP state, editor settings, caches, and tool-specific
local overrides are excluded by `.gitignore`. Add a documented `.env.example`
if the application later needs configuration.
