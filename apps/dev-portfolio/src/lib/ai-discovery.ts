import type { BlogPost } from "@/src/db/blogs";
import type { Project } from "@/src/types/project";

export type DiscoveryResult<T> = {
    item: T;
    score: number;
    confidence: "high" | "medium" | "low";
};

export type AnswerSnippet = {
    title: string;
    snippet: string;
    href: string;
    kind: "project" | "blog";
    score: number;
};

const SYNONYMS: Record<string, string[]> = {
    realtime: ["real-time", "websocket", "collaborative"],
    collaboration: ["collaborative", "realtime", "real-time"],
    backend: ["node", "express", "api", "server"],
    frontend: ["react", "ui", "next"],
    payments: ["stripe", "billing", "checkout"],
};

const normalize = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

const tokenize = (text: string) => normalize(text).split(" ").filter(Boolean);

const unique = (values: string[]) => [...new Set(values)];

const expandTokens = (tokens: string[]) =>
    unique(
        tokens.flatMap((token) => {
            const mapped = SYNONYMS[token] ?? [];
            return [token, ...mapped];
        }),
    );

const confidenceForScore = (score: number): "high" | "medium" | "low" => {
    if (score >= 16) return "high";
    if (score >= 8) return "medium";
    return "low";
};

const scoreText = ({
    queryTokens,
    name,
    tags,
    body,
}: {
    queryTokens: string[];
    name: string;
    tags: string[];
    body: string;
}) => {
    const normalizedName = normalize(name);
    const normalizedTags = normalize(tags.join(" "));
    const normalizedBody = normalize(body);

    return queryTokens.reduce((total, token) => {
        let score = 0;

        if (normalizedName.includes(token)) score += 6;
        if (normalizedTags.includes(token)) score += 4;
        if (normalizedBody.includes(token)) score += 2;

        if (token.length > 3) {
            const partial = token.slice(0, Math.min(5, token.length));
            if (
                normalizedName.includes(partial) ||
                normalizedTags.includes(partial) ||
                normalizedBody.includes(partial)
            ) {
                score += 1;
            }
        }

        return total + score;
    }, 0);
};

export function searchProjects(query: string, projects: Project[]): DiscoveryResult<Project>[] {
    const queryTokens = expandTokens(tokenize(query));
    if (queryTokens.length === 0) {
        return projects.slice(0, 3).map((item) => ({
            item,
            score: 0,
            confidence: "low",
        }));
    }

    const ranked = projects.reduce<DiscoveryResult<Project>[]>((acc, item) => {
        const score = scoreText({
            queryTokens,
            name: item.name,
            tags: [item.tag, ...item.techStack],
            body: item.description.join(" "),
        });

        if (score > 0) {
            acc.push({ item, score, confidence: confidenceForScore(score) });
        }

        return acc;
    }, []);

    return ranked.sort((a, b) => b.score - a.score).slice(0, 5);
}

export function searchBlogs(query: string, blogs: BlogPost[]): DiscoveryResult<BlogPost>[] {
    const queryTokens = expandTokens(tokenize(query));
    if (queryTokens.length === 0) {
        return blogs.slice(0, 3).map((item) => ({
            item,
            score: 0,
            confidence: "low",
        }));
    }

    const ranked = blogs.reduce<DiscoveryResult<BlogPost>[]>((acc, item) => {
        const score = scoreText({
            queryTokens,
            name: item.title,
            tags: [item.readTime],
            body: `${item.summary} ${item.content.join(" ")}`,
        });

        if (score > 0) {
            acc.push({ item, score, confidence: confidenceForScore(score) });
        }

        return acc;
    }, []);

    return ranked.sort((a, b) => b.score - a.score).slice(0, 5);
}

export function answerWithSources(
    question: string,
    projects: Project[],
    blogs: BlogPost[],
): AnswerSnippet[] {
    const queryTokens = expandTokens(tokenize(question));
    if (queryTokens.length === 0) return [];

    const projectSnippets: AnswerSnippet[] = projects.flatMap((project) =>
        project.description.map((line) => {
            const score = scoreText({
                queryTokens,
                name: project.name,
                tags: project.techStack,
                body: line,
            });

            return {
                title: project.name,
                snippet: line,
                href: `/projects/${project.id}`,
                kind: "project" as const,
                score,
            };
        }),
    );

    const blogSnippets: AnswerSnippet[] = blogs.flatMap((blog) => {
        const chunks = [blog.summary, ...blog.content];

        return chunks.map((line) => {
            const score = scoreText({
                queryTokens,
                name: blog.title,
                tags: [blog.readTime],
                body: line,
            });

            return {
                title: blog.title,
                snippet: line,
                href: `/blogs/${blog.slug}`,
                kind: "blog" as const,
                score,
            };
        });
    });

    return [...projectSnippets, ...blogSnippets]
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);
}
