# Design: add-ai-discovery-layer

## Overview
Use deterministic retrieval and ranking logic in a shared utility module. Build a client UI shell that:
- accepts free-form query text,
- shows ranked projects/blogs,
- returns top matching snippets as Q&A answers.

This gives an "AI-like" discovery experience while staying low-risk and maintainable.

## Architecture

- `lib/ai-discovery.ts`
  - tokenization
  - weighted scoring for projects/blogs
  - recommendation ranking
  - retrieval snippets for Q&A answers
- `components/ai-discovery-section.tsx`
  - query input + ask action
  - tabs/panels for recommendations and answer snippets
- Integration points
  - `app/page.tsx` (homepage)
  - `app/projects/page.tsx` (project-focused discovery)
  - `app/blogs/page.tsx` (blog list + Q&A)

## Ranking Strategy
Weighted score:
- Exact keyword in title/name: +6
- Match in tech stack/tags: +4
- Match in summary/description/content: +2
- Partial token overlap: +1

Q&A retrieval:
- Rank candidate snippets from project descriptions + blog summaries/content.
- Return top N snippets with source metadata (project/blog + link).

## UX Notes
- Default state: show "starter prompts" and top featured projects.
- On query: show ranked cards and confidence labels (High/Medium/Low by score bands).
- On empty/no match: show friendly fallback and popular suggestions.

## Risks & Mitigations
- **Risk**: Results feel brittle with tiny dataset.
  - **Mitigation**: normalize tokens, include synonyms map (e.g., realtime→real-time).
- **Risk**: Hallucination perception.
  - **Mitigation**: retrieval-only answers with explicit source links/snippets.
- **Risk**: UI noise.
  - **Mitigation**: compact section and clear hierarchy.
