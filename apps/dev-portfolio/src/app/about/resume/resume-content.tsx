"use client";

import { Button } from "@/src/components/ui/button";
import { Download } from "lucide-react";

const skillCategories = [
    {
        label: "Frontend",
        tags: [
            "React.js",
            "Next.js",
            "TypeScript",
            "JavaScript (ES6+)",
            "TanStack Query (Intermediate)",
            "Redux Toolkit",
            "RTK Query",
            "HTML5",
            "CSS3 / SCSS",
            "Tailwind CSS",
            "Material UI",
            "Ant Design",
            "Bootstrap",
        ],
    },
    {
        label: "Backend & DB",
        tags: [
            "Node.js",
            "Express.js",
            "NestJS(Intermediate)",
            "REST API",
            "JWT Auth",
            "GraphQL (Basic)",
            "MongoDB",
        ],
    },
    {
        label: "Tools & Platforms",
        tags: [
            "Git & GitHub",
            "Vercel",
            "Firebase",
            "Supabase",
            "Postman",
            "Docker (Basic)",
            "Netlify",
        ],
    },
];

const experience = [
    {
        title: "Frontend Developer",
        company: "HawkEyes Digital Monitoring Ltd.",
        companyWebsite: "https://hawkeyesdigital.com",
        period: "May 2024 - April 2026",
        type: "On-site",
        location: "Uttara, Dhaka.",
        bullets: [
            "Designed and built <strong>responsive enterprise dashboards</strong> and operational workflow management systems for real-time business monitoring across multiple client environments.",
            "Developed scalable frontend interfaces for <strong>inventory management, product tracking, and reporting platforms</strong>, reducing manual workflow overhead for operations teams.",
            "Integrated <strong>RESTful APIs</strong> for real-time data sync, implementing secure authentication flows using JWT and role-based access control.",
            "Maintained complex application state using <strong>Redux Toolkit and RTK Query</strong>, improving data fetching efficiency and reducing redundant API calls.",
            "Collaborated with backend engineers to define <strong>API contracts and frontend data architecture</strong> for data-intensive enterprise applications.",
            "Improved <strong>UI performance, accessibility (a11y), and cross-device responsiveness</strong> with consistent behavior across all viewports.",
            "Managed <strong>Git-based version control workflows</strong> and contributed to CI/CD deployment pipelines via Vercel.",
        ],
    },
];

const projects = [
    {
        name: "Forge — Fitness & Gym Web Application",
        links: { live: "#", github: "#" },
        desc: "Production-ready gym platform built for performance, SEO, and scalability using Next.js App Router.",
        bullets: [
            "Built with <strong>Next.js App Router</strong> using modular component-based architecture; applied lazy loading and efficient asset handling for improved Core Web Vitals.",
            "Configured <strong>SEO-friendly server-side rendering</strong> with dynamic sections for services, training programs, and user interaction; deployed via Vercel.",
        ],
        stack: "Next.js · React.js · TypeScript · Tailwind CSS · Vercel",
    },
    {
        name: "Dashboard Wizard — Differend Type of Charts and Graphs",
        links: { live: "#", github: "#" },
        desc: "Frontend dashboard showing differend type of charts and graphs in many differend layouts.",
        bullets: [
            "Built a <strong>dashboard</strong> with React.js featuring dynamic routing, chart visualizations, and interactive widget controls.",
            "Developed a <strong>differend type of charts and graphs</strong> with different types of layouts; architected reusable modular panel components for scalable monitoring.",
        ],
        stack: "React.js · Tailwind CSS · Redux · Google Maps API · ECharts · Charts",
    },
];

const education = [
    {
        degree: "Higher Secondary Certificate (HSC)",
        school: "Vashantek Govt. College - Dhaka, Bangladesh.",
        year: "2018 - 2019",
        tag: "Science",
    },
    {
        degree: "BSc in Computer Science & Engineering (CSE)",
        school: "Green University of Bangladesh",
        year: "2020 - 2023",
        tag: "DropOut",
    },
    {
        degree: "Complete Web Development & Next Level Web Development",
        school: "Programming Hero · Certificate of Completion (Both tracks)",
        tag: "Completed",
        certificateLink:
            "https://drive.google.com/file/d/1oCowXYxD7oSqcXDWX1AyHtJ2OlRNHauT/view?usp=drive_link",
    },
];

function HtmlText({ html }: { html: string }) {
    const parts = html.split(/(<strong>|<\/strong>)/g);
    const nodes: React.ReactNode[] = [];
    let bold = false;
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === "<strong>") {
            bold = true;
        } else if (part === "</strong>") {
            bold = false;
        } else if (part) {
            nodes.push(
                bold ? (
                    <strong key={part} className="text-foreground">
                        {part}
                    </strong>
                ) : (
                    part
                ),
            );
        }
    }
    return nodes;
}

export default function ResumeContent() {
    return (
        <div className="bg-background">
            <div className="mx-auto min-h-[297mm] w-full max-w-[210mm] px-6 py-5 sm:px-7 md:px-8">
                <div className="flex items-start justify-between gap-4 border-b-2 border-blue-600 pb-2">
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">
                            MD Razikul Islam Joni
                        </h1>
                        <p className="mt-0.5 text-sm font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase">
                            Full Stack (MERN) Developer
                        </p>
                    </div>
                    <div className="no-print shrink-0 pt-1">
                        <Button
                            variant="default"
                            size="sm"
                            onClick={() => window.print()}
                            aria-label="Download resume as PDF"
                        >
                            <Download className="size-4" />
                            <span className="hidden sm:inline">Download PDF</span>
                        </Button>
                    </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                    <span>razikuljoni@gmail.com</span>
                    <span className="before:text-muted-foreground/50 before:content-['•_']">
                        (+880) 1623-208660
                    </span>
                    <span className="before:text-muted-foreground/50 before:content-['•_']">
                        Mirpur, Dhaka, Bangladesh
                    </span>
                    <span className="before:text-muted-foreground/50 before:content-['•_']">
                        <a
                            href="https://razikuljoni.dev"
                            className="text-blue-600 dark:text-blue-400 no-underline hover:underline"
                        >
                            Portfolio
                        </a>
                    </span>
                    <span className="before:text-muted-foreground/50 before:content-['•_']">
                        <a
                            href="https://linkedin.com/in/razikuljoni"
                            className="text-blue-600 dark:text-blue-400 no-underline hover:underline"
                        >
                            LinkedIn
                        </a>
                    </span>
                    <span className="before:text-muted-foreground/50 before:content-['•_']">
                        <a
                            href="https://github.com/razikuljoni"
                            className="text-blue-600 dark:text-blue-400 no-underline hover:underline"
                        >
                            GitHub
                        </a>
                    </span>
                </div>

                <section className="mt-3">
                    <SectionTitle>Professional Summary</SectionTitle>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                        Results-driven Full Stack (MERN) Developer with around 2 years of
                        professional experience delivering scalable, high-performance web
                        applications using <strong className="text-foreground">React.js</strong>,{" "}
                        <strong className="text-foreground">Next.js</strong>, and modern JavaScript
                        ecosystems. Proven track record building enterprise-grade admin dashboards,
                        business management systems, and inventory tracking platforms with seamless
                        REST API integration. Adept at state management with Redux Toolkit, UI
                        architecture design, and cross-team collaboration. Actively expanding
                        expertise in NestJS, GraphQL and advanced application architecture.
                    </p>
                </section>

                <section className="mt-3">
                    <SectionTitle>Technical Skills</SectionTitle>
                    <div className="grid grid-cols-[108px_1fr] gap-x-2 gap-y-0.5 text-xs">
                        {skillCategories.map((cat) => (
                            <SkillRow key={cat.label} label={cat.label} tags={cat.tags} />
                        ))}
                    </div>
                </section>

                <section className="mt-3">
                    <SectionTitle>Professional Experience</SectionTitle>
                    {experience.map((job) => (
                        <div key={job.title} className="mb-3">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-xs font-bold text-foreground">
                                        {job.title} at
                                    </p>
                                    <a
                                        href={job.companyWebsite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-semibold text-blue-600 dark:text-blue-400"
                                    >
                                        {job.company}
                                    </a>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="whitespace-nowrap text-xs text-muted-foreground">
                                        {job.period}
                                    </p>
                                    <p className="whitespace-nowrap text-xs text-muted-foreground">
                                        {job.type} · {job.location}
                                    </p>
                                </div>
                            </div>
                            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-muted-foreground">
                                {job.bullets.map((bullet) => (
                                    <li key={bullet} className="leading-relaxed">
                                        <HtmlText html={bullet} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                <section className="mt-3">
                    <SectionTitle>Key Projects</SectionTitle>
                    {projects.map((proj) => (
                        <div key={proj.name} className="mb-3">
                            <div className="flex items-start justify-between gap-2">
                                <p className="text-xs font-bold text-foreground">{proj.name}</p>
                                <div className="flex gap-2 text-xs">
                                    <a
                                        href={proj.links.live}
                                        className="text-blue-600 dark:text-blue-400 no-underline hover:underline"
                                    >
                                        Live Site
                                    </a>
                                    <a
                                        href={proj.links.github}
                                        className="text-blue-600 dark:text-blue-400 no-underline hover:underline"
                                    >
                                        GitHub
                                    </a>
                                </div>
                            </div>
                            <p className="text-xs italic text-muted-foreground">{proj.desc}</p>
                            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-muted-foreground">
                                {proj.bullets.map((bullet) => (
                                    <li key={bullet} className="leading-relaxed">
                                        <HtmlText html={bullet} />
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-1 text-xs text-muted-foreground">
                                <strong className="text-foreground">Stack:</strong> {proj.stack}
                            </p>
                        </div>
                    ))}
                </section>

                <section className="mt-3">
                    <SectionTitle>Education &amp; Courses</SectionTitle>
                    {education.map((edu) => (
                        <div
                            key={edu.degree}
                            className="mb-2 flex items-start justify-between gap-2"
                        >
                            <div>
                                <p className="text-xs font-bold text-foreground">{edu.degree}</p>
                                <p className="text-xs text-muted-foreground">{edu.school}</p>
                            </div>
                            <div>
                                <p className="whitespace-nowrap text-xs text-muted-foreground">
                                    {edu.year}
                                </p>
                                <p className="whitespace-nowrap text-xs text-muted-foreground font-bold text-right">
                                    {edu.certificateLink ? (
                                        <a
                                            href={edu.certificateLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 no-underline hover:underline"
                                        >
                                            Certificate
                                        </a>
                                    ) : (
                                        <>{edu.tag}</>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="mt-3">
                    <SectionTitle>Languages</SectionTitle>
                    <div className="flex gap-5 text-xs">
                        <div>
                            <strong className="text-foreground">Bangla</strong>{" "}
                            <span className="text-muted-foreground">: Native</span>
                        </div>
                        <div>
                            <strong className="text-foreground">English</strong>{" "}
                            <span className="text-muted-foreground">
                                : Professional Working Proficiency
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="mb-1 border-b border-border pb-0.5 text-[12px] font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase">
            {children}
        </h2>
    );
}

function SkillRow({ label, tags }: { label: string; tags: string[] }) {
    return (
        <>
            <p className="pt-0.5 text-xs font-semibold text-muted-foreground">{label}</p>
            <div>
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="mr-1 mb-0.5 inline-block rounded-sm border border-border bg-primary/10 px-1.5 py-0.5 text-[10.5px] font-medium text-primary"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </>
    );
}
