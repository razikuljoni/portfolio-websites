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
            "JavaScript",
            "Redux Toolkit",
            "RTK Query",
            "TanStack Query",
            "Zustand",
            "Tailwind CSS",
            "shadcn/ui",
            "Ant Design",
            "Material UI",
            "Recharts",
            "Maps Integration",
        ],
    },
    {
        label: "Backend & DB",
        tags: [
            "Node.js",
            "Express.js",
            "NestJS",
            "REST APIs",
            "WebSockets",
            "Socket.io",
            "JWT / RBAC",
            "Prisma",
            "Zod",
            "MongoDB",
            "MySQL",
            "PostgreSQL",
        ],
    },
    {
        label: "Tools & DevOps",
        tags: [
            "Git & GitHub Actions",
            "Docker",
            "Vercel",
            "Cloudflare",
            "Pnpm",
        ],
    },
];

const experience = [
    {
        title: "Junior Frontend Developer",
        company: "HawkEyes Digital Monitoring Ltd.",
        companyWebsite: "https://hawkeyesdigital.com",
        period: "Feb 2024 — Apr 2026",
        type: "Full-time · On-site",
        location: "Uttara, Dhaka",
        bullets: [
            "Architected <strong>responsive enterprise dashboards</strong>, workflow systems, inventory management, and reporting interfaces for real-time business monitoring across multiple client environments.",
            "Integrated <strong>REST APIs</strong> with JWT authentication, role-based access control, Redux Toolkit, and RTK Query, enabling secure live data synchronization across data-intensive applications.",
            "Developed <strong>reusable component patterns</strong> and centralized state management that reduced duplicate code and standardized complex loading, error, and permission states.",
            "Collaborated with backend engineers on <strong>API contracts and data models</strong>, improving cross-team delivery velocity and reducing integration defects.",
            "Enhanced <strong>performance, accessibility (a11y), and cross-device responsiveness</strong> across desktop, tablet, and mobile viewports.",
        ],
    },
];

const projects = [
    {
        name: "Z Shop — E-Commerce Platform & AI Shopping Advisor",
        links: {
            live: "https://z-shop-online.vercel.app",
            github: "https://razikuljoni/z-shop",
        },
        bullets: [
            "Architected a <strong>full-stack e-commerce platform</strong> with real-time inventory management, multi-currency checkout, live order tracking, and role-based dashboards for Customer, Seller, and Admin roles.",
            "Integrated <strong>Google Gemini AI</strong> as a serverless shopping advisor, providing personalized product recommendations and natural language search across the product catalog.",
            "Implemented <strong>2FA authentication</strong>, multi-step checkout with payment selection, Recharts-powered analytics dashboards, and server-side validation with Zod for data integrity.",
        ],
        stack: "Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Gemini AI · Recharts · Zod",
    },
    {
        name: "SensorGrid — IoT Device Intelligence Platform",
        links: {
            live: "https://github.com/razikuljoni/SensorGrid",
            github: "https://github.com/razikuljoni/SensorGrid",
        },
        bullets: [
            "Engineered a <strong>production-grade IoT platform</strong> with real-time WebSocket telemetry streaming, remote device control, and configurable automation workflows for industrial sensor networks.",
            "Designed <strong>unified dashboard</strong> for monitoring 50+ device metrics simultaneously with alert configuration, historical data visualization, and automated anomaly detection.",
            "Implemented <strong>secure authentication</strong> with NextAuth, Prisma ORM with PostgreSQL for persistent data, TanStack Query for efficient data fetching, and Zustand for global state orchestration.",
        ],
        stack: "Next.js · React · TypeScript · Prisma · PostgreSQL · socket.io · NextAuth · Zod",
    },
    {
        name: "TaskFlow — Collaborative Project Management Suite",
        links: {
            live: "https://github.com/razikuljoni/TaskFlow",
            github: "https://github.com/razikuljoni/TaskFlow",
        },
        bullets: [
            "Built a <strong>real-time collaborative project management tool</strong> with WebSocket-powered Kanban boards, Gantt chart visualization, and multi-user task assignment with live cursor tracking.",
            "Developed <strong>RESTful API layer</strong> with NestJS, PostgreSQL, and Prisma ORM supporting complex queries for task filtering, sprint planning, and team performance analytics.",
            "Implemented <strong>role-based access control</strong> with granular permissions, audit logging for compliance, and automated email notifications for task updates and deadline reminders.",
        ],
        stack: "Next.js · React · TypeScript · NestJS · PostgreSQL · Prisma · WebSocket · Tailwind CSS",
    },
];

const education = [
    {
        degree: "BSc in Computer Science & Engineering",
        school: "Green University of Bangladesh",
        year: "2020 — 2023",
        note: "Undergraduate Coursework",
    },
    {
        degree: "Higher Secondary Certificate (HSC) — Science",
        school: "Vashantek Govt. College, Dhaka",
        year: "2018 — 2019",
    },
];

const training = [
    {
        program: "Complete Web Development",
        issuer: "Programming Hero",
        year: "2022",
        certificate: "https://drive.google.com/file/d/1oCowXYxD7oSqcXDWX1AyHtJ2OlRNHauT/view?usp=drive_link"
    },
    {
        program: "Next Level Web Development",
        issuer: "Programming Hero",
        year: "2023",
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
            <div className="mx-auto min-h-[297mm] w-full max-w-[210mm] px-6 py-5 sm:px-8 md:px-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b-2 border-blue-600 pb-2">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">
                            MD Razikul Islam Joni
                        </h1>
                        <p className="mt-0.5 text-[12px] font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase">
                            Full Stack Developer — React · Next.js · Node.js
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

                {/* Contact */}
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
                    <span>razikuljoni@gmail.com</span>
                    <span className="before:text-muted-foreground/50 before:content-['•_']">
                        +880 1623-208660
                    </span>
                    <span className="before:text-muted-foreground/50 before:content-['•_']">
                        Dhaka, Bangladesh
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

                {/* Professional Summary */}
                <section className="mt-3">
                    <SectionTitle>Professional Summary</SectionTitle>
                    <p className="text-[12px] leading-[1.5] text-muted-foreground">
                        Results-driven Full Stack Developer with{" "}
                        <strong className="text-foreground">2+ years</strong> of experience
                        building scalable, high-performance web applications with{" "}
                        <strong className="text-foreground">React, Next.js, and Node.js</strong>.
                        Proven expertise in enterprise dashboards, inventory management systems,
                        real-time data visualization, REST API integration, and state architecture.
                        Skilled in Redux Toolkit, TanStack Query, TypeScript, and cross-functional
                        collaboration with backend teams.
                    </p>
                </section>

                {/* Technical Skills */}
                <section className="mt-3">
                    <SectionTitle>Technical Skills</SectionTitle>
                    <div className="grid grid-cols-[100px_1fr] gap-x-2 gap-y-1 text-[12px]">
                        {skillCategories.map((cat) => (
                            <SkillRow key={cat.label} label={cat.label} tags={cat.tags} />
                        ))}
                    </div>
                </section>

                {/* Professional Experience */}
                <section className="mt-3">
                    <SectionTitle>Professional Experience</SectionTitle>
                    {experience.map((job) => (
                        <div key={job.title} className="mb-3">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-[12px] font-bold text-foreground">
                                        {job.title}
                                    </p>
                                    <a
                                        href={job.companyWebsite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[12px] font-semibold text-blue-600 dark:text-blue-400"
                                    >
                                        {job.company}
                                    </a>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="whitespace-nowrap text-[12px] text-muted-foreground">
                                        {job.period}
                                    </p>
                                    <p className="whitespace-nowrap text-[12px] text-muted-foreground">
                                        {job.type} · {job.location}
                                    </p>
                                </div>
                            </div>
                            <ul className="mt-1 list-disc space-y-1 pl-5 text-[12px] text-muted-foreground">
                                {job.bullets.map((bullet) => (
                                    <li key={bullet} className="leading-[1.5]">
                                        <HtmlText html={bullet} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                {/* Key Projects */}
                <section className="mt-3">
                    <SectionTitle>Key Projects</SectionTitle>
                    {projects.map((proj) => (
                        <div key={proj.name} className="mb-3">
                            <div className="flex items-start justify-between gap-2">
                                <p className="text-[12px] font-bold text-foreground">
                                    {proj.name}
                                </p>
                                <div className="flex gap-2 text-[11px]">
                                    <a
                                        href={proj.links.live}
                                        className="text-blue-600 dark:text-blue-400 no-underline hover:underline"
                                    >
                                        Live
                                    </a>
                                    <a
                                        href={proj.links.github}
                                        className="text-blue-600 dark:text-blue-400 no-underline hover:underline"
                                    >
                                        GitHub
                                    </a>
                                </div>
                            </div>
                            <ul className="mt-1 list-disc space-y-1 pl-5 text-[12px] text-muted-foreground">
                                {proj.bullets.map((bullet) => (
                                    <li key={bullet} className="leading-[1.5]">
                                        <HtmlText html={bullet} />
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                                <strong className="text-foreground">Stack:</strong> {proj.stack}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Educational Qualification */}
                <section className="mt-3">
                    <SectionTitle>Educational Qualification</SectionTitle>
                    {education.map((edu) => (
                        <div
                            key={edu.degree}
                            className="mb-2 flex items-start justify-between gap-2"
                        >
                            <div>
                                <p className="text-[12px] font-bold text-foreground">
                                    {edu.degree}
                                </p>
                                <p className="text-[12px] text-muted-foreground">
                                    {edu.school}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="whitespace-nowrap text-[12px] text-muted-foreground">
                                    {edu.year}
                                </p>
                                {edu.note && (
                                    <p className="whitespace-nowrap text-[11px] font-semibold text-muted-foreground">
                                        {edu.note}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Education & Training - combined */}
                <section className="mt-3">
                    <SectionTitle>Courses</SectionTitle>
                    {training.map((tr) => (
                         <div
                            key={tr.program}
                            className="mb-2 flex items-start justify-between gap-2"
                        >
                            <div>
                                <p className="text-[12px] font-bold text-foreground">
                                    {tr.program}
                                </p>
                                <p className="text-[12px] text-muted-foreground">
                                    {tr.issuer}
                                    {
                                        tr.certificate && <span> -  <a href={tr.certificate} className="text-blue-600 dark:text-blue-400 no-underline hover:underline">Certificate</a></span>
                                    }
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="whitespace-nowrap text-[12px] text-muted-foreground">
                                    {tr.year}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Languages */}
                <section className="mt-3">
                    <SectionTitle>Languages &amp; Proficiency</SectionTitle>
                    <div className="flex gap-6 text-[12px]">
                        <span>
                            <strong className="text-foreground">Bangla</strong>{" "}
                            <span className="text-muted-foreground">— Native</span>
                        </span>
                        <span>
                            <strong className="text-foreground">English</strong>{" "}
                            <span className="text-muted-foreground">
                                — Professional Working Proficiency
                            </span>
                        </span>
                    </div>
                </section>
            </div>
        </div>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="mb-1 border-b border-border pb-px text-[12px] font-bold tracking-wide text-blue-600 dark:text-blue-400 uppercase">
            {children}
        </h2>
    );
}

function SkillRow({ label, tags }: { label: string; tags: string[] }) {
    return (
        <>
            <p className="pt-0.5 text-[12px] font-semibold text-muted-foreground">{label}</p>
            <div>
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="mr-1 mb-1 inline-block rounded-sm border border-border bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </>
    );
}
