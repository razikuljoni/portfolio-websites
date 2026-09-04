import type { IconType } from "react-icons";
import {
    SiExpress,
    SiJavascript,
    SiMongodb,
    SiMysql,
    SiNestjs,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiReact,
    SiRedux,
    SiTailwindcss,
    SiTypescript,
} from "react-icons/si";

export type TechCategory =
    | "Language"
    | "Framework"
    | "Runtime"
    | "Library"
    | "Database"
    | "Styling"
    | "Tooling";

export type TechLevel = "Primary" | "Advanced" | "Working";

export interface TechStackEntry {
    name: string;
    shortName?: string;
    category: TechCategory;
    level: TechLevel;
    description: string;
    href: string;
    /** Brand color used for the icon tile background. */
    bg: string;
    /** Simple-Icons brand mark (single icon library for all brand glyphs). */
    Icon: IconType;
}

export const techStack: readonly TechStackEntry[] = [
    {
        name: "JavaScript",
        category: "Language",
        level: "Primary",
        description:
            "The language of the web. ES2024+, async patterns, and modern runtime features.",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        bg: "#F7DF1E",
        Icon: SiJavascript,
    },
    {
        name: "TypeScript",
        category: "Language",
        level: "Primary",
        description: "Type-safe JavaScript for scalable, refactor-friendly application code.",
        href: "https://www.typescriptlang.org",
        bg: "#3178C6",
        Icon: SiTypescript,
    },
    {
        name: "React",
        category: "Library",
        level: "Primary",
        description: "Component-based UI library for building declarative, interactive interfaces.",
        href: "https://react.dev",
        bg: "#61DAFB",
        Icon: SiReact,
    },
    {
        name: "Next.js",
        category: "Framework",
        level: "Primary",
        description:
            "Full-stack React framework with App Router, SSR, RSC, and edge-ready deployment.",
        href: "https://nextjs.org",
        bg: "#111111",
        Icon: SiNextdotjs,
    },
    {
        name: "Node.js",
        category: "Runtime",
        level: "Advanced",
        description: "Server-side JavaScript runtime for fast, event-driven APIs and tooling.",
        href: "https://nodejs.org",
        bg: "#5FA04E",
        Icon: SiNodedotjs,
    },
    {
        name: "Express.js",
        category: "Framework",
        level: "Advanced",
        description:
            "Minimal, unopinionated Node.js framework for REST APIs and middleware pipelines.",
        href: "https://expressjs.com",
        bg: "#888888",
        Icon: SiExpress,
    },
    {
        name: "NestJS",
        category: "Framework",
        level: "Working",
        description:
            "Opinionated, modular Node.js framework for scalable server-side applications.",
        href: "https://nestjs.com",
        bg: "#E0234E",
        Icon: SiNestjs,
    },
    {
        name: "MongoDB",
        category: "Database",
        level: "Advanced",
        description:
            "Document-oriented NoSQL database with flexible schemas and aggregation pipelines.",
        href: "https://www.mongodb.com",
        bg: "#47A248",
        Icon: SiMongodb,
    },
    {
        name: "Redux Toolkit",
        shortName: "Redux",
        category: "Tooling",
        level: "Advanced",
        description: "Predictable state container with simplified slices, RTK Query, and devtools.",
        href: "https://redux-toolkit.js.org",
        bg: "#764ABC",
        Icon: SiRedux,
    },
    {
        name: "Tailwind CSS",
        shortName: "Tailwind",
        category: "Styling",
        level: "Primary",
        description:
            "Utility-first CSS framework for rapid, composable, design-system friendly UI.",
        href: "https://tailwindcss.com",
        bg: "#06B6D4",
        Icon: SiTailwindcss,
    },
    {
        name: "MySQL",
        category: "Database",
        level: "Working",
        description: "Mature relational database with strong tooling, transactions, and joins.",
        href: "https://www.mysql.com",
        bg: "#4479A1",
        Icon: SiMysql,
    },
    {
        name: "PostgreSQL",
        category: "Database",
        level: "Working",
        description: "Powerful, standards-compliant SQL database with rich types and extensions.",
        href: "https://www.postgresql.org",
        bg: "#4169E1",
        Icon: SiPostgresql,
    },
];
