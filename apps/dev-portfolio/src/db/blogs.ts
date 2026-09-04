export type BlogPost = {
    slug: string;
    title: string;
    date: string;
    summary: string;
    readTime: string;
    content: string[];
};

export const blogs: BlogPost[] = [
    {
        slug: "hello-world-axum",
        title: "Hello World in Rust with Axum",
        date: "2026-01-03",
        summary: "A minimal web server using Rust and the Axum framework.",
        readTime: "4 min read",
        content: [
            "This quick-start shows how to spin up a small Axum server, wire up a single route, and return JSON responses with minimal boilerplate.",
            "I cover project structure, routing, and a clean error-handling approach so you can extend the API without refactoring later.",
            "If you are new to Rust, this post is a friendly on-ramp to building production-style HTTP services.",
        ],
    },
    {
        slug: "cosketch-eraser-selection",
        title: "Eraser and Selection Mechanics in CoSketch",
        date: "2025-05-01",
        summary: "How a collaborative canvas tracks erasing and selection states.",
        readTime: "6 min read",
        content: [
            "CoSketch uses a small state machine for pointer events so every interaction maps to a predictable transition that syncs across collaborators.",
            "This article explains how the eraser tool calculates hit regions, queues updates, and resolves conflicts in real time.",
            "You will also see how selection metadata stays stable for multiple users without flicker or out-of-order updates.",
        ],
    },
    {
        slug: "cosketch-docker-architecture",
        title: "Inside CoSketch's Docker and Compose Architecture",
        date: "2025-04-10",
        summary: "A quick tour of the services powering realtime collaboration.",
        readTime: "5 min read",
        content: [
            "The stack includes a React frontend, a backend API, and a WebSocket server, all wired together with Docker Compose.",
            "I describe how local development mirrors production, how services communicate, and why this layout scales with small teams.",
            "If you are designing a collaborative app, this overview helps you align infra with product requirements.",
        ],
    },
    {
        slug: "cosketch-canvas-engine",
        title: "How CoSketch's Canvas Engine Works",
        date: "2025-03-15",
        summary: "From pointer events to render loops in a custom canvas engine.",
        readTime: "7 min read",
        content: [
            "This post breaks down the canvas architecture, including scene graphs, render scheduling, and input batching.",
            "I also walk through how shapes are modeled, how hit testing works, and why optimistic updates keep the UI responsive.",
            "The goal is to show a practical, maintainable approach rather than a demo-only prototype.",
        ],
    },
    {
        slug: "portfolio-information-architecture",
        title: "Designing a Portfolio Information Architecture That Converts",
        date: "2026-04-22",
        summary:
            "A practical structure for preview, listing, and detail pages in developer portfolios.",
        readTime: "8 min read",
        content: [
            "A strong portfolio should reduce cognitive load: preview sections on the homepage, full collections on list pages, and complete narratives on detail pages.",
            "This architecture helps recruiters scan quickly while still allowing deep technical validation on project and blog detail routes.",
            "I also share how anchor navigation and clear call-to-actions improve flow from exploration to contact intent.",
        ],
    },
    {
        slug: "mdx-vs-json-for-portfolio-content",
        title: "MDX vs JSON for Portfolio Content: A Hybrid Strategy",
        date: "2026-03-18",
        summary: "Why blogs belong in MDX while projects are easier to manage in structured data.",
        readTime: "6 min read",
        content: [
            "Narrative content like blogs benefits from MDX because headings, code blocks, and rich linking stay expressive and maintainable.",
            "Projects usually work better as structured JSON or TypeScript data since cards, filters, and recommendation logic rely on predictable fields.",
            "A hybrid model gives the best authoring experience without overengineering a CMS too early.",
        ],
    },
];
