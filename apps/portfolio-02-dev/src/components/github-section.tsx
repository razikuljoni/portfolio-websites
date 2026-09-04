"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaUpRightFromSquare } from "react-icons/fa6";

const GitHubCalendar = dynamic(
    () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
    {
        ssr: false,
    },
);

export default function GithubSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [shouldRenderCalendar, setShouldRenderCalendar] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || shouldRenderCalendar) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (!entry?.isIntersecting) return;

                setShouldRenderCalendar(true);
                observer.disconnect();
            },
            {
                rootMargin: "200px 0px",
            },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, [shouldRenderCalendar]);

    return (
        <LazyMotion features={domAnimation}>
            <section id="github" className="scroll-mt-24 py-6">
                <div
                    className="relative w-full border-t-[1.5px] border-b-[1.5px] border-(--pattern-border) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1.5px,transparent_0,transparent_50%)] bg-size[6px_6px] bg-fixed"
                    style={{ opacity: 1, transform: "none" }}
                >
                    <div className="relative z-10 container mx-auto max-w-(--content-max-width) px-4 py-3">
                        <h2 className="text-5xl font-semibold tracking-tight text-foreground">
                            GitHub
                        </h2>
                    </div>
                </div>
                <div
                    ref={sectionRef}
                    className="container mx-auto mt-8 max-w-(--content-max-width) px-4"
                >
                    <m.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <div className="rounded-xl border border-border/50 p-4 transition-all duration-200 hover:border-border sm:p-5">
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <FaGithub className="text-foreground" />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">
                                            Github Contributions
                                        </p>
                                    </div>
                                </div>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground transition-all hover:border-foreground/20 hover:bg-muted hover:text-foreground"
                                    href="https://github.com/razikuljoni"
                                >
                                    @razikuljoni
                                    <FaUpRightFromSquare />
                                </a>
                            </div>
                            <div className="flex flex-col gap-1 overflow-x-auto pb-2 md:overflow-visible">
                                <div className="min-w-fit mx-auto">
                                    {shouldRenderCalendar ? (
                                        <GitHubCalendar username="razikuljoni" />
                                    ) : (
                                        <div className="h-28 w-[680px] max-w-full animate-pulse rounded-md border border-border/40 bg-muted/30" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </m.div>
                </div>
            </section>
        </LazyMotion>
    );
}
