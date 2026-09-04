# Change Proposal: resume-driven-profile-refresh-and-blog-route-fix

## Why
The current portfolio messaging and hero presentation are too frontend-only and no longer reflect the latest resume. Navigation and blog detail behavior also have UX/functionality gaps:
- role/title messaging should represent Full Stack + MERN positioning,
- role title should rotate with smooth reveal animation,
- tech stack icons need richer tooltip metadata,
- section navigation should feel smooth and intentional,
- blog detail route currently falls through to not-found for valid blog links.

## What
1. Refresh profile copy (hero + about + metadata) to align with current professional focus.
2. Add animated rotating role title in hero.
3. Rebuild tech stack area with curated stacks and rich hover tooltip cards.
4. Improve section navigation smoothness and section offset behavior.
5. Fix blog dynamic route param handling so blog detail pages open correctly.

## Success Criteria
- Hero shows rotating titles: Frontend Developer / Full Stack Developer / MERN Stack Developer.
- Description/about content reflects real current profile and experience.
- Tech stack hover reveals name + official link + short practical purpose.
- Section nav transitions smoothly without jarring jumps.
- Clicking any valid blog from list opens blog detail page (no false 404).
