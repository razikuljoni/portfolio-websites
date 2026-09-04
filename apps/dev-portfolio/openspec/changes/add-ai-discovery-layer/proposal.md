# Change Proposal: add-ai-discovery-layer

## Why
Visitors can scan projects and blogs, but discovery is manual. Recruiters/clients often ask intent-based queries like "React + backend", "real-time work", or "which post explains architecture". A lightweight AI discovery layer can improve findability and conversion without adding external LLM cost or backend complexity.

## What
Implement Milestone A (AI discovery layer) with three capabilities:

1. Semantic-like local search over projects and blogs using weighted keyword matching.
2. Smart project recommendations derived from query intent and stack overlap.
3. Retrieval-only Q&A over existing portfolio/blog content (no generation beyond extracted snippets).

## Scope
- Add a reusable client-side `AiDiscoverySection` component.
- Integrate section on homepage and projects page.
- Replace placeholder blogs page with real listing and AI Q&A box.
- Add utility functions for scoring, ranking, and retrieval.

## Non-goals
- No external model/provider integration.
- No vector database.
- No server-side personalization.
- No chat history persistence.

## Success Criteria
- User can type a query and receive ranked projects/blogs.
- User can ask a question and receive sourced snippets from portfolio content.
- Pages remain static-first and fast (no API calls required).
