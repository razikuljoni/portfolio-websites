<!-- Context: project-intelligence/decisions | Priority: high | Version: 1.0 | Updated: 2025-01-12 -->

# Decisions Log

> Record major architectural and business decisions with full context. This prevents "why was this done?" debates.

## Quick Reference

- **Purpose**: Document decisions so future team members understand context
- **Format**: Each decision as a separate entry
- **Status**: Decided | Pending | Under Review | Deprecated

## Decision Template

```markdown
## [Decision Title]

**Date**: YYYY-MM-DD
**Status**: [Decided/Pending/Under Review/Deprecated]
**Owner**: [Who owns this decision]

### Context
[What situation prompted this decision? What was the problem or opportunity?]

### Decision
[What was decided? Be specific about the choice made.]

### Rationale
[Why this decision? What were the alternatives and why were they rejected?]

### Alternatives Considered
| Alternative | Pros | Cons | Why Rejected? |
|-------------|------|------|---------------|
| [Alt 1] | [Pros] | [Cons] | [Why not chosen] |
| [Alt 2] | [Pros] | [Cons] | [Why not chosen] |

### Impact
**Positive**: [What this enables or improves]
**Negative**: [What trade-offs or limitations this creates]
**Risk**: [What could go wrong]

### Related
- [Links to related decisions, PRs, issues, or documentation]
```

---

## Decision: [Title]

**Date**: YYYY-MM-DD
**Status**: [Status]
**Owner**: [Owner]

### Context
[What was happening? Why did we need to decide?]

### Decision
[What we decided]

### Rationale
[Why this was the right choice]

### Alternatives Considered
| Alternative | Pros | Cons | Why Rejected? |
|-------------|------|------|---------------|
| [Option A] | [Good things] | [Bad things] | [Reason] |

### Impact
- **Positive**: [What we gain]
- **Negative**: [What we trade off]
- **Risk**: [What to watch for]

### Related
- [Link to PR #000]
- [Link to issue #000]
- [Link to documentation]

---

## Decision: Resume Integration

**Date**: 2026-05-19
**Status**: Decided
**Owner**: @razikuljoni

### Context
Had an HTML resume at a local file path and a Google Drive link for PDF access. The resume should live on the portfolio itself as a proper route instead of relying on external links.

### Decision
Create `/about/resume` route with:
- Server page (`page.tsx`) with SEO metadata
- Client component (`resume-content.tsx`) with full resume mark-up
- Dark mode using Tailwind CSS variables
- PDF download via `window.print()` with `beforeprint`/`afterprint` JS events to hide nav header and extra padding
- Hero "Show Resume" button + footer file icon → both point to `/about/resume`
- No nav link added to header (user preference)

### Rationale
- Keeps the resume on-site (no dependency on Google Drive)
- `window.print()` is zero-dependency, works in all browsers
- `beforeprint`/`afterprint` DOM manipulation is more reliable than `@media print` CSS with Tailwind 4 layers
- Print-only behavior (hide nav, remove padding) handled via JS, preserving full website UX

### Alternatives Considered
| Alternative | Pros | Cons | Why Rejected? |
|-------------|------|------|---------------|
| PDF generation library (jsPDF, Puppeteer) | More control over output | Adds dependency, complexity | `window.print()` is sufficient |
| CSS-only `@media print` | Simpler, no JS | Tailwind 4 layer cascade broke `display: none` on fixed header | JS fallback required anyway |
| Separate print stylesheet | Clean separation | Extra HTTP request, more maintenance | Inline JS + CSS works fine |

### Impact
- **Positive**: Resume is self-hosted, dark-mode aware, easy to maintain
- **Positive**: No more external link dependencies for resume access
- **Negative**: Print output quality depends on browser's print engine
- **Risk**: Browsers handle `beforeprint`/`afterprint` slightly differently — tested on Chrome primary

### Related
- `goals/resume-integration/` — goal package with facts, plan, and done condition
- `AGENTS.md` — project knowledge base updated

---

## Decision: [Title]

**Date**: YYYY-MM-DD
**Status**: [Status]
**Owner**: [Owner]

### Context
[What was happening?]

### Decision
[What we decided]

### Rationale
[Why this was right]

### Alternatives Considered
| Alternative | Pros | Cons | Why Rejected? |
|-------------|------|------|---------------|
| [Option A] | [Good things] | [Bad things] | [Reason] |

### Impact
- **Positive**: [What we gain]
- **Negative**: [What we trade off]

### Related
- [Link]

---

## Deprecated Decisions

Decisions that were later overturned (for historical context):

| Decision | Date | Replaced By | Why |
|----------|------|-------------|-----|
| [Old decision] | [Date] | [New decision] | [Reason] |

## Onboarding Checklist

- [ ] Understand the philosophy behind major architectural choices
- [ ] Know why certain technologies were chosen over alternatives
- [ ] Understand trade-offs that were made
- [ ] Know where to find decision context when questions arise
- [ ] Understand what decisions are pending and why

## Related Files

- `technical-domain.md` - Technical implementation affected by these decisions
- `business-tech-bridge.md` - How decisions connect business and technical
- `living-notes.md` - Current open questions that may become decisions
