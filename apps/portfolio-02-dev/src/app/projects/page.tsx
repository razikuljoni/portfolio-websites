import AiDiscoverySection from "@/src/components/ai-discovery-section";
import ProjectCard from "@/src/components/project-card";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/src/components/ui/empty";
import projectData from "@/src/db/projects.json";
import type { ProjectResponse } from "@/src/types/project";
import { FolderX } from "lucide-react";
import type { Metadata } from "next";

const { projects } = projectData as ProjectResponse;

export const metadata: Metadata = {
    title: "Projects — MD Razikul Islam Joni",
    description:
        "Selected full stack and MERN projects covering dashboards, collaboration, and product UX.",
};

export default function Projects() {
    return (
        <div>
            <section className="mt-20 pb-16">
                <div
                    className="relative w-full border-t-[1.5px] border-b-[1.5px] border-(--pattern-border) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1.5px,transparent_0,transparent_50%)] bg-size[6px_6px] bg-fixed"
                    style={{ opacity: "1", transform: "none" }}
                >
                    <div className="relative z-10 container mx-auto max-w-(--content-max-width) px-4 py-3">
                        <h2 className="text-5xl font-semibold tracking-tight text-foreground">
                            Projects
                        </h2>
                    </div>
                </div>
                <AiDiscoverySection
                    mode="projects"
                    title="AI Project Match"
                    description="Describe what you need and get ranked project matches with source-backed snippets."
                />
                <div className="container mx-auto mt-8 max-w-(--content-max-width) px-4">
                    {projects?.length ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    ) : (
                        <Empty>
                            <EmptyMedia variant="icon">
                                <FolderX className="size-5" aria-hidden="true" />
                            </EmptyMedia>
                            <EmptyContent>
                                <EmptyHeader>
                                    <EmptyTitle>No projects yet</EmptyTitle>
                                    <EmptyDescription>
                                        New case studies will appear here once they are ready to
                                        share.
                                    </EmptyDescription>
                                </EmptyHeader>
                            </EmptyContent>
                        </Empty>
                    )}
                </div>
            </section>
        </div>
    );
}
