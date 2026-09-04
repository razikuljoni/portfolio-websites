"use client";

import { blogs } from "@/src/db/blogs";
import projectsData from "@/src/db/projects.json";
import { Command } from "cmdk";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { BookOpen, Briefcase, FileText, FolderGit2, Wrench } from "lucide-react";
import { useCallback, useEffect, useEffectEvent, useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa6";

type SectionItem = {
    id: string;
    label: string;
    href: string;
    icon: React.ReactNode;
    category: "section";
};

type SearchItem =
    | SectionItem
    | {
          id: string;
          label: string;
          href: string;
          icon: React.ReactNode;
          category: "blog" | "project";
          description?: string;
      };

const heading = (cat: "section" | "blog" | "project") => {
    return (
        <span className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {cat === "section" ? "Pages" : cat === "blog" ? "Blogs" : "Projects"}
        </span>
    );
};

const sectionItems: SectionItem[] = [
    {
        id: "about",
        label: "About",
        href: "#about",
        icon: <Wrench className="size-4" />,
        category: "section",
    },
    {
        id: "experience",
        label: "Experience",
        href: "#experience",
        icon: <Briefcase className="size-4" />,
        category: "section",
    },
    {
        id: "projects",
        label: "Projects",
        href: "#projects",
        icon: <FolderGit2 className="size-4" />,
        category: "section",
    },
    {
        id: "blogs",
        label: "Blogs",
        href: "#blogs",
        icon: <BookOpen className="size-4" />,
        category: "section",
    },
    {
        id: "github",
        label: "GitHub",
        href: "https://github.com/razikuljoni",
        icon: <FaGithub size={16} />,
        category: "section",
    },
];

export default function CommandPalette({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const [query, setQuery] = useState("");

    const items: SearchItem[] = useMemo(() => {
        const blogItems: SearchItem[] = blogs.map((blog) => ({
            id: `blog-${blog.slug}`,
            label: blog.title,
            href: `/blogs/${blog.slug}`,
            icon: <FileText className="size-4" />,
            category: "blog" as const,
            description: blog.summary,
        }));

        const projectItems: SearchItem[] = projectsData.projects.map((project) => ({
            id: `project-${project.id}`,
            label: project.name,
            href: project.link,
            icon: <FolderGit2 className="size-4" />,
            category: "project" as const,
            description: project.description[0],
        }));

        return [...sectionItems, ...blogItems, ...projectItems];
    }, []);

    // Wrap onOpenChange to clear query when the palette closes — event-driven, not effect-driven
    const handleOpenChange = useCallback(
        (next: boolean) => {
            if (!next) setQuery("");
            onOpenChange(next);
        },
        [onOpenChange],
    );

    const handleSelect = useCallback(
        (item: SearchItem) => {
            handleOpenChange(false);
            if (item.category === "section") {
                if (item.href.startsWith("http")) {
                    window.open(item.href, "_blank", "noopener,noreferrer");
                } else {
                    const el = document.querySelector(item.href);
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                    }
                }
            } else {
                window.location.href = item.href;
            }
        },
        [handleOpenChange],
    );

    const handleOpenChangeEvent = useEffectEvent(handleOpenChange);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleOpenChangeEvent(!open);
            }
            if (e.key === "Escape" && open) {
                handleOpenChangeEvent(false);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [open]);

    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                {open && (
                    <m.div
                        className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <button
                            type="button"
                            className="fixed inset-0 cursor-default bg-black/50 backdrop-blur-sm"
                            aria-label="Close command palette"
                            onClick={() => handleOpenChange(false)}
                        />
                        <m.div
                            className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
                            initial={{ opacity: 0, scale: 0.96, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -20 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Command label="Command Palette" shouldFilter={true}>
                                <div className="flex items-center border-b border-border px-3">
                                    <Command.Input
                                        autoFocus
                                        placeholder="Search pages, blogs, projects..."
                                        value={query}
                                        onValueChange={setQuery}
                                        className="flex h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                                    />
                                </div>

                                <Command.List className="max-h-72 overflow-y-auto p-2">
                                    <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                                        No results found.
                                    </Command.Empty>
                                    {(["section", "blog", "project"] as const).map((cat) => {
                                        const groupItems = items.filter(
                                            (item) => item.category === cat,
                                        );
                                        if (groupItems.length === 0) return null;
                                        return (
                                            <Command.Group
                                                key={cat}
                                                heading={heading(
                                                    cat as "section" | "blog" | "project",
                                                )}
                                            >
                                                {groupItems.map((item) => (
                                                    <Command.Item
                                                        key={item.id}
                                                        value={`${cat}-${item.label}`}
                                                        onSelect={() => handleSelect(item)}
                                                        className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 text-sm text-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                                                    >
                                                        <span className="flex size-7 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground">
                                                            {item.icon}
                                                        </span>
                                                        <div className="flex flex-col">
                                                            <span>{item.label}</span>
                                                            {"description" in item &&
                                                                item.description && (
                                                                    <span className="line-clamp-1 text-xs text-muted-foreground">
                                                                        {item.description}
                                                                    </span>
                                                                )}
                                                        </div>
                                                    </Command.Item>
                                                ))}
                                            </Command.Group>
                                        );
                                    })}
                                </Command.List>
                            </Command>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>
        </LazyMotion>
    );
}
