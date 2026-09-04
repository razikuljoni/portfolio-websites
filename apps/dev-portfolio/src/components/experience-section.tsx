import Image from "next/image";

const responsibilities = [
    "Developed and maintained responsive admin dashboards and management systems.",
    "Built inventory tracking and product management platforms with dynamic data handling.",
    "Created field-work assignment interfaces with real-time status updates and reporting features.",
    "Integrated RESTful APIs and implemented JWT-based authentication workflows.",
    "Managed complex application state using Redux Toolkit and RTK Query.",
    "Deployed applications using Vercel and managed basic version control and CI/CD using Git/GitHub.",
];

const tags = [
    "React.js",
    "Redux",
    "Ant Design",
    "Charts",
    "Tables",
    "Google Maps",
    "GitHub Actions",
    "Vercel",
];

export default function Experience() {
    return (
        <section id="experience" className="scroll-mt-24 pb-2 cv-auto">
            <div className="relative w-full border-t-[1.5px] border-b-[1.5px] border-(--pattern-border) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1.5px,transparent_0,transparent_50%)] bg-size[6px_6px] bg-fixed">
                <div className="relative z-10 container mx-auto max-w-(--content-max-width) px-4 py-3">
                    <h2 className="text-5xl font-semibold tracking-tight text-foreground">
                        Experience
                    </h2>
                </div>
            </div>
            <div className="container mx-auto mt-8 max-w-(--content-max-width) px-4">
                <article>
                    <div className="reveal flex flex-col gap-3 sm:gap-4">
                        <details
                            open
                            className="interactive-card rounded-lg border border-border/50 [&_summary::-webkit-details-marker]:hidden"
                        >
                            <summary className="flex w-full cursor-pointer flex-col gap-2 rounded-lg p-3 text-left ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-muted/30 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:p-4">
                                <div className="flex w-full items-center justify-between gap-2 sm:min-w-0 sm:flex-1 sm:justify-start">
                                    <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border sm:size-12 bg-transparent">
                                        <Image
                                            alt=""
                                            aria-hidden="true"
                                            width={48}
                                            height={48}
                                            loading="lazy"
                                            className="size-[110%] max-w-none object-cover"
                                            src="/images/company-logos/hawkeyes.webp"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <span className="font-semibold text-foreground">
                                            HawkEyes Digital Monitoring Ltd.
                                        </span>
                                        <span className="ml-2 hidden rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground sm:inline-block">
                                            Full-time
                                        </span>
                                        <p className="mt-0.5 text-sm text-muted-foreground">
                                            Jr. Frontend Developer
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:shrink-0 sm:flex-col sm:items-end sm:gap-0.5 sm:text-sm">
                                    <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs font-medium sm:hidden">
                                        Full-time
                                    </span>
                                    <span className="text-foreground tabular-nums">
                                        May 2024 – April 2026
                                    </span>
                                    <span>In-Office</span>
                                </div>
                            </summary>
                            <div className="border-t border-border/50 px-3 pt-2 pb-4 sm:px-4">
                                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                                    {responsibilities.map((line) => (
                                        <li key={line}>{line}</li>
                                    ))}
                                </ul>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-md border border-border px-2 py-1 text-xs font-medium text-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </details>
                    </div>
                </article>
            </div>
        </section>
    );
}
