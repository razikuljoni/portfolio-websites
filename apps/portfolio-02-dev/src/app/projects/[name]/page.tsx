import { projects } from "@/src/db/projects.json";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "./project-detail";

interface PageProps {
    params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { name } = await params;
    const project = projects.find((p) => p.id === name);
    if (!project) return { title: "Project Not Found" };
    return {
        title: `${project.name}`,
        description: project.description[0] || `${project.name} project details`,
        openGraph: {
            title: project.name,
            description: project.description[0] || `${project.name} project details`,
        },
    };
}

export default async function ProjectPage({ params }: PageProps) {
    const { name } = await params;
    const project = projects.find((p) => p.id === name);
    if (!project) notFound();
    return <ProjectDetail project={project} />;
}
