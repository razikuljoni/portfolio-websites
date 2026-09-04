"use client";

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import Toggle from "./ui/toggle-button";

const CommandPalette = dynamic(() => import("./command-palette"), { ssr: false });

const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "Blogs", href: "/#blogs" },
    { label: "GitHub", href: "/#github" },
];

export default function Header() {
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    const closeMobile = useCallback(() => setMobileOpen(false), []);

    const handleSectionNav = useCallback(
        (event: MouseEvent<HTMLAnchorElement>, href: string) => {
            const [, hash] = href.split("#");
            const isHashLink = Boolean(hash);

            if (!isHashLink || pathname !== "/") return;

            event.preventDefault();
            const target = document.getElementById(hash);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        },
        [pathname],
    );

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMobileOpen(false);
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <LazyMotion features={domAnimation}>
            <>
                <header className="fixed w-full top-0 right-0 left-0 z-50 transition-all duration-700 ease-out md:top-2 md:left-1/2 md:max-w-(--content-max-width) md:-translate-x-1/2 md:px-3 translate-y-0 opacity-100">
                    <div className="flex items-center justify-between  border-b border-neutral-200 bg-background/90 px-4 py-2.5 backdrop-blur-md md:overflow-hidden md:rounded-2xl md:border md:border-border/50 md:shadow-lg md:shadow-black/5 dark:border-neutral-700 dark:md:shadow-black/20">
                        <div className="flex gap-3">
                            <Link
                                className="group border-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline"
                                href="/"
                            >
                                <Image
                                    alt="MD Razikul Islam Joni Logo"
                                    width={28}
                                    height={28}
                                    priority
                                    className="size-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 dark:invert"
                                    src="/logo.svg"
                                />
                            </Link>

                            <div className="hidden md:flex md:items-center md:gap-3">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                                        href={link.href}
                                        onClick={(event) => handleSectionNav(event, link.href)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setPaletteOpen(true)}
                                className="relative inline-flex items-start justify-start rounded-md border border-input bg-transparent px-3 py-1.5 text-sm font-medium whitespace-nowrap text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:pr-10 h-8 min-h-8 w-40 min-w-20 md:w-44 lg:w-60"
                            >
                                <span className="hidden lg:inline-flex">Search website…</span>
                                <span className="inline-flex min-w-0 truncate lg:hidden">
                                    Search…
                                </span>
                                <kbd className="pointer-events-none absolute top-1.5 right-1.5 hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
                                    <span className="text-xs">⌘</span>K
                                </kbd>
                            </button>

                            <Toggle />

                            <button
                                type="button"
                                onClick={() => setMobileOpen(true)}
                                className="flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:hidden"
                                aria-label="Open menu"
                            >
                                <Menu className="size-5" />
                            </button>
                        </div>
                    </div>
                </header>

                <AnimatePresence>
                    {mobileOpen && (
                        <m.div
                            className="fixed inset-0 z-60 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <button
                                type="button"
                                className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
                                aria-label="Close mobile menu"
                                onClick={closeMobile}
                            />
                            <m.div
                                className="absolute top-0 right-0 bottom-0 w-72 bg-background border-l border-border shadow-2xl"
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                            >
                                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                                    <span className="text-sm font-semibold">Navigation</span>
                                    <button
                                        type="button"
                                        onClick={closeMobile}
                                        className="flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                        aria-label="Close menu"
                                    >
                                        <X className="size-5" />
                                    </button>
                                </div>
                                <nav className="flex flex-col gap-1 p-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            onClick={(event) => {
                                                handleSectionNav(event, link.href);
                                                closeMobile();
                                            }}
                                            className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            </m.div>
                        </m.div>
                    )}
                </AnimatePresence>

                {paletteOpen ? (
                    <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
                ) : null}
            </>
        </LazyMotion>
    );
}
