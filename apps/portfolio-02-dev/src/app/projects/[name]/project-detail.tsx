"use client";

import { Button } from "@/src/components/ui/button";
import { Project } from "@/src/types/project";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";

interface ProjectDetailProps {
    project: Project;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

function StatusBadge({ status }: { status?: string }) {
    if (!status) return null;
    const isLive = status === "Live";
    return (
        <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
            <span className="relative flex size-2">
                <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isLive ? "bg-emerald-500" : "bg-red-500"}`}
                />
                <span
                    className={`relative inline-flex size-2 rounded-full ${isLive ? "bg-emerald-500" : "bg-red-500"}`}
                />
            </span>
            {status}
        </span>
    );
}

const navigateTo = (path: string) => {
    window.open(path, "_blank");
};

export default function ProjectDetail({ project }: ProjectDetailProps) {
    return (
        <LazyMotion features={domAnimation}>
            <m.div variants={containerVariants} initial="hidden" animate="visible">
                <section className="container mx-auto mt-16 max-w-(--content-max-width) px-4 py-8">
                    <m.div variants={itemVariants} className="mb-6">
                        <Link
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            href="/projects"
                        >
                            <FaArrowLeft />
                            Back to projects
                        </Link>
                    </m.div>

                    <m.div
                        variants={itemVariants}
                        className="mb-6 overflow-hidden rounded-xl border border-border bg-muted/30"
                    >
                        <div className="relative aspect-video w-full">
                            <Image
                                alt={project.name}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 896px"
                                src={project.thumb}
                            />
                        </div>
                    </m.div>

                    <m.div
                        variants={itemVariants}
                        className="mb-8 flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:flex-wrap sm:items-center"
                    >
                        <div className="flex flex-wrap items-center gap-3">
                            <Button
                                variant={"default"}
                                onClick={() => navigateTo(project.liveSite)}
                                // target="_blank"
                                // rel="noopener noreferrer"
                                // className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                                // href={project.liveSite}
                            >
                                <FaArrowUpRightFromSquare />
                                View Live
                            </Button>
                            <Button
                                variant={"secondary"}
                                onClick={() => navigateTo(project.github)}
                                // target="_blank"
                                // rel="noopener noreferrer"
                                // className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                // href={project.github}
                            >
                                <FaGithub />
                                GitHub Repo
                            </Button>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground sm:ml-auto">
                            <StatusBadge status={project.status} />
                        </div>
                    </m.div>

                    <m.div variants={itemVariants} className="mb-8 space-y-8">
                        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                            {project.name}
                        </h1>

                        <m.div variants={itemVariants}>
                            <h2 className="mb-2 text-sm font-semibold tracking-wider  uppercase">
                                Tech Stack
                            </h2>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {project.techStack.map((tech) => (
                                    <Button
                                        key={tech}
                                        variant="secondary"
                                        size="sm"
                                        className="cursor-text"
                                    >
                                        {tech}
                                    </Button>
                                ))}
                            </div>
                        </m.div>

                        <div className="space-y-2">
                            <h2 className="text-sm font-semibold tracking-wider uppercase">
                                About this project
                            </h2>
                            <ul className="list-none space-y-2 text-muted-foreground">
                                {project.description.map((desc: string) => (
                                    <li key={desc} className="flex items-start gap-3">
                                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                                        <span>{desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </m.div>
                </section>
            </m.div>
        </LazyMotion>
    );
}
