import AiDiscoverySection from "@/src/components/ai-discovery-section";
import { blogs } from "@/src/db/blogs";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Blogs — MD Razikul Islam Joni",
    description: "Technical blogs on frontend, full stack architecture, and product engineering.",
};

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

export default function Blogs() {
    return (
        <main className="mt-20 pb-14">
            <section>
                <div
                    className="relative w-full border-t-[1.5px] border-b-[1.5px] border-(--pattern-border) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1.5px,transparent_0,transparent_50%)] bg-size[6px_6px] bg-fixed"
                    style={{ opacity: 1, transform: "none" }}
                >
                    <div className="relative z-10 container mx-auto max-w-(--content-max-width) px-4 py-3">
                        <h1 className="text-5xl font-semibold tracking-tight text-foreground">
                            Blogs
                        </h1>
                    </div>
                </div>

                <AiDiscoverySection
                    mode="blogs"
                    title="AI Blog Q&A"
                    description="Ask about architecture, Rust, collaboration, and get retrieval-backed snippets from posts."
                />

                <div className="container mx-auto mt-8 flex max-w-(--content-max-width) flex-col gap-4 px-4">
                    {blogs.map((blog) => (
                        <Link
                            key={blog.slug}
                            className="group rounded-lg border border-border/50 p-4 transition-all hover:border-border"
                            href={`/blogs/${blog.slug}`}
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <h2 className="text-lg font-semibold text-foreground group-hover:text-foreground/85">
                                    {blog.title}
                                </h2>
                                <span className="text-xs text-muted-foreground">
                                    {formatDate(blog.date)} · {blog.readTime}
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{blog.summary}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
