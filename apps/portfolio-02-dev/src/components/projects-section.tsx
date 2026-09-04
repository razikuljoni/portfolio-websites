import { projects } from "@/src/db/projects.json";
import type { Project } from "@/src/types/project";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ProjectCard from "./project-card";

export default function Projects() {
    return (
        <section id="projects" className="scroll-mt-24 pt-6 pb-2 cv-auto">
            <div className="relative w-full border-t-[1.5px] border-b-[1.5px] border-(--pattern-border) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1.5px,transparent_0,transparent_50%)] bg-size[6px_6px] bg-fixed">
                <div className="relative z-10 container mx-auto max-w-(--content-max-width) px-4 py-3">
                    <h2 className="text-5xl font-semibold tracking-tight text-foreground">
                        Projects
                    </h2>
                </div>
            </div>
            <div className="container mx-auto mt-8 flex max-w-(--content-max-width) flex-col gap-6 px-4">
                <div className="reveal-stagger grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {(projects as Project[]).slice(0, 4).map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
                <div className="flex justify-center pt-2">
                    <Link
                        className="group tap-shrink inline-flex items-center gap-2 bg-foreground px-4 py-2 text-sm font-medium text-background ring-2 ring-foreground/10 ring-offset-2 ring-offset-background transition-all hover:bg-foreground/90 active:scale-95"
                        href="/projects"
                    >
                        <span>View All Projects</span>
                        <ArrowUpRight
                            className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}
