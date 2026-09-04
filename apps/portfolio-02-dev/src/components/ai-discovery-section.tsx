"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import type { BlogPost } from "@/src/db/blogs";
import type { Project } from "@/src/types/project";
import type { AnswerSnippet, DiscoveryResult } from "@/src/lib/ai-discovery";

type DiscoveryMode = "all" | "projects" | "blogs";

type AiDiscoverySectionProps = {
    mode?: DiscoveryMode;
    title?: string;
    description?: string;
};

type DiscoveryDependencies = {
    projects: Project[];
    blogs: BlogPost[];
    searchProjects: (query: string, items: Project[]) => DiscoveryResult<Project>[];
    searchBlogs: (query: string, items: BlogPost[]) => DiscoveryResult<BlogPost>[];
    answerWithSources: (
        question: string,
        projects: Project[],
        blogs: BlogPost[],
    ) => AnswerSnippet[];
};

let discoveryDependenciesPromise: Promise<DiscoveryDependencies> | null = null;

const loadDiscoveryDependencies = async (): Promise<DiscoveryDependencies> => {
    if (!discoveryDependenciesPromise) {
        discoveryDependenciesPromise = (async () => {
            const [projectsModule, blogsModule, discoveryModule] = await Promise.all([
                import("@/src/db/projects.json"),
                import("@/src/db/blogs"),
                import("@/src/lib/ai-discovery"),
            ]);

            return {
                projects: (projectsModule as { projects: Project[] }).projects,
                blogs: (blogsModule as { blogs: BlogPost[] }).blogs,
                searchProjects: (
                    discoveryModule as {
                        searchProjects: (
                            query: string,
                            items: Project[],
                        ) => DiscoveryResult<Project>[];
                    }
                ).searchProjects,
                searchBlogs: (
                    discoveryModule as {
                        searchBlogs: (
                            query: string,
                            items: BlogPost[],
                        ) => DiscoveryResult<BlogPost>[];
                    }
                ).searchBlogs,
                answerWithSources: (
                    discoveryModule as {
                        answerWithSources: (
                            question: string,
                            projects: Project[],
                            blogs: BlogPost[],
                        ) => AnswerSnippet[];
                    }
                ).answerWithSources,
            };
        })();
    }

    return discoveryDependenciesPromise;
};

const promptSuggestions = [
    "react + backend projects",
    "real-time collaboration work",
    "posts about architecture",
    "projects with stripe payments",
];

const confidenceClass: Record<"high" | "medium" | "low", string> = {
    high: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    medium: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    low: "border-zinc-500/30 bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
};

export default function AiDiscoverySection({
    mode = "all",
    title = "AI Discovery",
    description = "Ask in plain language to find relevant projects and blog insights.",
}: AiDiscoverySectionProps) {
    const [query, setQuery] = useState("");
    const [dependencies, setDependencies] = useState<DiscoveryDependencies | null>(null);
    const loadStartedRef = useRef(false);
    const hasQuery = query.trim().length > 0;
    const isDependenciesLoading = hasQuery && !dependencies;

    useEffect(() => {
        if (!hasQuery || dependencies || loadStartedRef.current) return;

        loadStartedRef.current = true;

        let mounted = true;
        loadDiscoveryDependencies().then((loaded) => {
            if (!mounted) return;
            setDependencies(loaded);
        });

        return () => {
            mounted = false;
        };
    }, [dependencies, hasQuery]);

    const projectResults = useMemo(() => {
        if (!hasQuery || !dependencies || mode === "blogs") return [];
        return dependencies.searchProjects(query, dependencies.projects);
    }, [dependencies, hasQuery, mode, query]);

    const blogResults = useMemo(() => {
        if (!hasQuery || !dependencies || mode === "projects") return [];
        return dependencies.searchBlogs(query, dependencies.blogs);
    }, [dependencies, hasQuery, mode, query]);

    const answers = useMemo(() => {
        if (!hasQuery || !dependencies) return [];
        return dependencies.answerWithSources(query, dependencies.projects, dependencies.blogs);
    }, [dependencies, hasQuery, query]);

    return (
        <section className="container mx-auto mt-8 max-w-(--content-max-width) px-4">
            <div className="rounded-xl border border-border/60 bg-muted/20 p-4 shadow-sm sm:p-5">
                <div className="mb-4 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold tracking-tight text-foreground">
                            {title}
                        </h3>
                        <span className="rounded-full border border-violet-500/25 bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-300">
                            beta
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label htmlFor="ai-query" className="sr-only">
                        {title}
                    </label>
                    <input
                        id="ai-query"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Try: realtime collaboration projects, Rust posts, Stripe integrations..."
                        aria-label={title}
                        className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    {hasQuery && (
                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            className="h-11 rounded-md border border-border bg-background px-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {!hasQuery && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {promptSuggestions.map((suggestion) => (
                            <button
                                key={suggestion}
                                type="button"
                                onClick={() => setQuery(suggestion)}
                                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}

                {hasQuery && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                        {isDependenciesLoading && (
                            <span className="rounded-full border border-border bg-background px-2.5 py-1">
                                Loading search index…
                            </span>
                        )}
                        {mode !== "blogs" && (
                            <span className="rounded-full border border-border bg-background px-2.5 py-1">
                                {projectResults.length} project matches
                            </span>
                        )}
                        {mode !== "projects" && (
                            <span className="rounded-full border border-border bg-background px-2.5 py-1">
                                {blogResults.length} blog matches
                            </span>
                        )}
                        <span className="rounded-full border border-border bg-background px-2.5 py-1">
                            {answers.length} source snippets
                        </span>
                    </div>
                )}

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    {mode !== "blogs" && (
                        <div className="rounded-lg border border-border/50 bg-background p-3">
                            <h4 className="mb-2 text-sm font-semibold text-foreground">
                                Project recommendations
                            </h4>
                            <div className="space-y-2">
                                {isDependenciesLoading ? (
                                    <div className="rounded-md border border-dashed border-border p-3 text-xs text-muted-foreground">
                                        Building search index…
                                    </div>
                                ) : projectResults.length > 0 ? (
                                    projectResults.map((result) => (
                                        <Link
                                            key={result.item.id}
                                            href={`/projects/${result.item.id}`}
                                            className="block rounded-md border border-border/50 p-2.5 transition-colors hover:border-border hover:bg-muted/30"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm font-medium text-foreground">
                                                    {result.item.name}
                                                </p>
                                                <span
                                                    className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${confidenceClass[result.confidence]}`}
                                                >
                                                    {result.confidence}
                                                </span>
                                            </div>
                                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                                {result.item.description[0]}
                                            </p>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="rounded-md border border-dashed border-border p-3 text-xs text-muted-foreground">
                                        No project matches yet. Try stack names like React, Node,
                                        Stripe, or MongoDB.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {mode !== "projects" && (
                        <div className="rounded-lg border border-border/50 bg-background p-3">
                            <h4 className="mb-2 text-sm font-semibold text-foreground">
                                Related blogs
                            </h4>
                            <div className="space-y-2">
                                {isDependenciesLoading ? (
                                    <div className="rounded-md border border-dashed border-border p-3 text-xs text-muted-foreground">
                                        Building search index…
                                    </div>
                                ) : blogResults.length > 0 ? (
                                    blogResults.map((result) => (
                                        <Link
                                            key={result.item.slug}
                                            href={`/blogs/${result.item.slug}`}
                                            className="block rounded-md border border-border/50 p-2.5 transition-colors hover:border-border hover:bg-muted/30"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm font-medium text-foreground">
                                                    {result.item.title}
                                                </p>
                                                <span
                                                    className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${confidenceClass[result.confidence]}`}
                                                >
                                                    {result.confidence}
                                                </span>
                                            </div>
                                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                                {result.item.summary}
                                            </p>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="rounded-md border border-dashed border-border p-3 text-xs text-muted-foreground">
                                        No blog matches yet. Ask about architecture, Rust, or
                                        collaboration.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-4 rounded-lg border border-border/50 bg-background p-3">
                    <h4 className="mb-2 text-sm font-semibold text-foreground">
                        Q&A (retrieval only)
                    </h4>
                    <div className="space-y-2">
                        {isDependenciesLoading ? (
                            <div className="rounded-md border border-dashed border-border p-3 text-xs text-muted-foreground">
                                Building search index…
                            </div>
                        ) : answers.length > 0 ? (
                            answers.map((answer) => (
                                <Link
                                    key={`${answer.kind}-${answer.title}-${answer.href}`}
                                    href={answer.href}
                                    className="block rounded-md border border-border/50 p-2.5 transition-colors hover:border-border hover:bg-muted/30"
                                >
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                        {answer.kind} source · {answer.title}
                                    </p>
                                    <p className="mt-1 text-sm text-foreground">{answer.snippet}</p>
                                </Link>
                            ))
                        ) : (
                            <div className="rounded-md border border-dashed border-border p-3 text-xs text-muted-foreground">
                                Ask a question to see source-backed snippets from projects and
                                blogs.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
