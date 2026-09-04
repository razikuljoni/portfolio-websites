import { blogs } from "@/src/db/blogs";
import { siteConfig } from "@/src/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

type PageProps = {
    params: Promise<{ slug: string }>;
};

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });

export function generateStaticParams() {
    return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const blog = blogs.find((item) => item.slug === slug);

    if (!blog) {
        return {
            title: "Blog not found",
            description: siteConfig.description,
        };
    }

    return {
        title: blog.title,
        description: blog.summary,
        openGraph: {
            title: `${blog.title} — ${siteConfig.name}`,
            description: blog.summary,
            url: `${siteConfig.url}/blogs/${blog.slug}`,
            images: [
                {
                    url: siteConfig.ogImage,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${blog.title} — ${siteConfig.name}`,
            description: blog.summary,
            images: [siteConfig.ogImage],
        },
    };
}

export default async function BlogDetail({ params }: PageProps) {
    const { slug } = await params;
    const blog = blogs.find((item) => item.slug === slug);

    if (!blog) {
        notFound();
    }

    return (
        <main className="mt-24">
            <section className="container mx-auto max-w-(--content-max-width) px-4 pb-16">
                <Link
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    href="/blogs"
                >
                    <FaArrowLeft />
                    Back to blogs
                </Link>

                <div className="mt-6 rounded-xl border border-border bg-muted/20 p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {formatDate(blog.date)} · {blog.readTime}
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {blog.title}
                    </h1>
                    <p className="mt-3 text-base text-muted-foreground">{blog.summary}</p>
                </div>

                <div className="mt-8 space-y-4 text-base text-muted-foreground">
                    {blog.content.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </section>
        </main>
    );
}
