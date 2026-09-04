# Content Authoring Guide

## Recommended Storage Pattern

- **Projects**: `db/projects.json` (structured metadata)
- **Blogs**: `content/blogs/*.mdx` (long-form editorial content)

This hybrid model keeps cards/search/filtering simple while preserving rich writing ergonomics for articles.

## Projects (`db/projects.json`)

Required fields per project:
- `id` (kebab-case slug)
- `name`
- `description` (array of bullet paragraphs)
- `status` (`Live` | `Building`)
- `thumb` (public image path)
- `link` (canonical route)
- `liveSite`
- `github`
- `tag`
- `techStack` (string[])

## Blogs (`content/blogs/*.mdx`)

Use frontmatter:

```yaml
---
title: "..."
slug: "..."
date: "YYYY-MM-DD"
summary: "..."
readTime: "X min read"
tags:
  - ...
---
```

Then write full markdown/MDX body.

## Current Runtime Note

The app currently reads blog entries from `db/blogs.ts` for route rendering.

`content/blogs/*.mdx` has been added as the target authoring structure.
A next step can introduce a content loader adapter so routes read directly from MDX files.
