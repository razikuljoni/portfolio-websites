import type { Project } from "@/src/types/project";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function getBackgroundIndex(id: string): number {
    const seed = id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return (seed % 4) + 1;
}

export default function ProjectCard({ project }: { project: Project }) {
    const backgroundIndex = getBackgroundIndex(project.id);
    const isLive = project.status.toLowerCase() === "live";
    const statusColor = isLive ? "bg-emerald-500" : "bg-red-500";

    return (
        <div className="group/card relative z-10 rounded-lg border border-border/50 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lg sm:p-4">
            <Link
                className="flex w-full cursor-pointer flex-col gap-3"
                href={`/projects/${project.id}`}
            >
                <div className="rounded-[10px] border border-border p-1">
                    <div className="relative h-55 w-full overflow-hidden rounded-[6px] border border-border bg-muted select-none sm:h-[240px] md:h-[260px]">
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-0 transition-all duration-500 group-hover/card:opacity-100"
                            style={{
                                backgroundImage: `url('/images/bg${backgroundIndex}.webp')`,
                                filter: "blur(0.5px)",
                            }}
                        />
                        <div
                            className="absolute inset-0 bg-black/40 transition-all duration-300 group-hover/card:opacity-100"
                            style={{ opacity: 0 }}
                        />
                        <span className="project-tag absolute top-2 left-2 inline-block origin-center text-xs font-semibold text-muted-foreground drop-shadow-md transition-all duration-500 ease-out will-change-transform group-hover/card:left-1/2 group-hover/card:-translate-x-1/2 group-hover/card:scale-105 group-hover/card:text-foreground">
                            {project.tag}
                        </span>
                        <div
                            className="absolute bottom-0 left-1/2 w-[80%] rounded-t-[6px] bg-background p-[2px] pb-0"
                            style={{ height: "75%", transform: "translateX(-50%)" }}
                        >
                            <div className="size-full overflow-hidden rounded-t-lg">
                                <Image
                                    alt={`${project.name} preview`}
                                    width={1000}
                                    height={1000}
                                    loading="lazy"
                                    className="size-full object-contain transition-all duration-500 group-hover/card:scale-110"
                                    src={project.thumb}
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex min-h-30 flex-col justify-between gap-2 px-2 py-2.5">
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="min-w-0 flex-1 truncate text-[1.10rem] leading-[1.10] font-semibold text-foreground">
                            {project.name}
                        </h3>
                        <div className="flex shrink-0 items-center gap-1.5 select-none">
                            <span className="relative flex size-2">
                                <span
                                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${statusColor}`}
                                />
                                <span
                                    className={`relative inline-flex size-2 rounded-full ${statusColor}`}
                                />
                            </span>
                            <p className="text-sm font-medium text-muted-foreground">
                                {project.status}
                            </p>
                        </div>
                    </div>
                    <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">
                        {project.description?.map((desc: string) => desc).join(", ")}
                    </p>
                    <div className="flex items-center gap-1.5 select-none">
                        <p className="text-sm text-muted-foreground transition-colors group-hover/card:text-foreground">
                            View Project
                        </p>
                        <ArrowUpRight
                            className="size-3.5 text-muted-foreground transition-all duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-foreground"
                            aria-hidden
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
}
