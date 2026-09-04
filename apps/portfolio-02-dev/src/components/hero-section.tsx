"use client";

import { techStack } from "@/src/lib/tech-stack";
import { FileText, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsLinkedin } from "react-icons/bs";
import { SiGithub, SiX } from "react-icons/si";
import { Button } from "./ui/button";

const ContactFormDialog = dynamic(
    () =>
        import("./contact-form").then((m) => ({
            default: m.ContactFormDialog,
        })),
    { ssr: false },
);

const roleTitles = ["Frontend Developer", "Full Stack Developer", "MERN Stack Developer"];

const socials = [
    { name: "GitHub", href: "https://github.com/razikuljoni", Icon: SiGithub },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/razikuljoni",
        Icon: BsLinkedin,
    },
    { name: "X", href: "https://x.com/razikuljoni", Icon: SiX },
] as const;

function TechBadge({
    name,
    category,
    level,
    description,
    href,
    bg,
    Icon,
}: {
    name: string;
    category: string;
    level: string;
    description: string;
    href: string;
    bg: string;
    Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
    return (
        <div className="group relative">
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={href}
                aria-label={`${name} — visit website`}
                style={{ backgroundColor: bg }}
                className="inline-flex size-9 items-center justify-center rounded-md text-white shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:size-10 dark:ring-white/10"
            >
                <Icon className="size-4 sm:size-5" aria-hidden />
            </a>

            <div
                role="tooltip"
                className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-20 hidden w-72 -translate-x-1/2 translate-y-1 rounded-lg border border-border/70 bg-popover/95 p-3 text-popover-foreground opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:block"
            >
                <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-tight text-foreground">{name}</p>
                    <span
                        className="shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white"
                        style={{ backgroundColor: bg }}
                    >
                        {category}
                    </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {description}
                </p>
                <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-1.5 text-[10px] text-muted-foreground">
                    <span className="font-medium uppercase tracking-wider">Level · {level}</span>
                    <span className="inline-flex items-center gap-0.5 font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                        Docs
                        <span aria-hidden>↗</span>
                    </span>
                </div>
                <span
                    aria-hidden
                    className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-b border-r border-border/70 bg-popover/95"
                />
            </div>
        </div>
    );
}

export default function HeroSection() {
    const [activeRoleIndex, setActiveRoleIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveRoleIndex((prev) => (prev + 1) % roleTitles.length);
        }, 2600);
        return () => window.clearInterval(timer);
    }, []);

    return (
        <section
            id="home"
            className="container mx-auto flex max-w-(--content-max-width) flex-col items-start justify-center px-4 pt-10 pb-4 sm:pt-12 sm:pb-6"
        >
            <div className="flex flex-col gap-6 py-8">
                <div className="flex flex-row gap-4 sm:items-start sm:gap-6">
                    <div className="h-24 w-24 shrink-0 rounded-2xl bg-muted p-1.5 ring-1 ring-border ring-inset sm:h-28 sm:w-28">
                        <div className="h-full w-full overflow-hidden rounded-xl">
                            <Image
                                alt="MD Razikul Islam Joni"
                                width={96}
                                height={96}
                                priority
                                fetchPriority="high"
                                className="h-full w-full rounded-xl object-cover"
                                src="/images/MD_Razikul_Islam_Joni-Casual.webp"
                            />
                        </div>
                    </div>

                    <div className="flex min-h-24 flex-col justify-end sm:min-h-28">
                        <div className="flex items-center gap-2">
                            <h1 className="text-4xl font-semibold tracking-tight">
                                MD Razikul Islam Joni
                            </h1>
                        </div>

                        <div
                            className="relative mt-1 h-8 overflow-hidden sm:h-10"
                            aria-live="polite"
                        >
                            {roleTitles.map((role, index) => (
                                <span
                                    key={role}
                                    className="absolute inset-0 flex items-center text-lg font-medium text-muted-foreground transition-all duration-500 ease-out sm:text-xl"
                                    style={{
                                        opacity: index === activeRoleIndex ? 1 : 0,
                                        transform:
                                            index === activeRoleIndex
                                                ? "translateY(0)"
                                                : index < activeRoleIndex
                                                  ? "translateY(-100%)"
                                                  : "translateY(100%)",
                                    }}
                                >
                                    {role}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="max-w-190 text-lg text-muted-foreground">
                    Full Stack (MERN) developer with around 2 years of professional frontend
                    engineering experience, building scalable dashboards, business management
                    systems, and performance-focused web applications with React, Next.js, Node.js,
                    Express.js, and MongoDB.
                </p>

                <div className="flex flex-wrap items-center gap-2">
                    <Link href="/about/resume" passHref>
                        <Button aria-label="Show Resume" variant="default">
                            <FileText className="size-4" aria-hidden />
                            <span>Show Resume</span>
                        </Button>
                    </Link>
                    <Button
                        className="cursor-pointer"
                        variant="secondary"
                        aria-label="Send an email"
                        onClick={() => setIsOpen(true)}
                    >
                        <Mail className="size-4" aria-hidden />
                        <span>Send an email</span>
                    </Button>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                        Social Links
                    </h3>
                    <nav
                        aria-label="Social links"
                        className="inline-flex flex-wrap items-center gap-2"
                    >
                        {socials.map(({ name, href, Icon }) => (
                            <a
                                key={name}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${name} profile`}
                                href={href}
                                className="contents"
                            >
                                <Button variant="secondary">
                                    <Icon className="size-4" aria-hidden />
                                    <span>{name}</span>
                                </Button>
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                        Tech Stack &amp; Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((entry) => (
                            <TechBadge
                                key={entry.name}
                                name={entry.name}
                                category={entry.category}
                                level={entry.level}
                                description={entry.description}
                                href={entry.href}
                                bg={entry.bg}
                                Icon={entry.Icon}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <ContactFormDialog open={isOpen} onOpenChange={setIsOpen} />
        </section>
    );
}
