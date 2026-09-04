import { projects } from "@/src/db/projects.json";
import { blogs } from "@/src/db/blogs";
import { siteConfig } from "@/src/lib/site";
import type { MetadataRoute } from "next";

const routes = ["", "/projects", "/blogs"];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const baseRoutes = routes.map((route) => ({
        url: `${siteConfig.url}${route}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.7,
    }));

    const projectRoutes = projects.map((project) => ({
        url: `${siteConfig.url}/projects/${project.id}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    const blogRoutes = blogs.map((blog) => ({
        url: `${siteConfig.url}/blogs/${blog.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...baseRoutes, ...projectRoutes, ...blogRoutes];
}
