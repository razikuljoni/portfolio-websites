import { siteConfig } from "@/src/lib/site";
import { FileText, Mail } from "lucide-react";
import Link from "next/link";
import { BsLinkedin } from "react-icons/bs";
import { SiGithub, SiX } from "react-icons/si";

const email = "contact.razikuljoni@gmail.com";

type IconComponent = React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const socials: ReadonlyArray<{
    label: string;
    href: string;
    internal?: boolean;
    Icon: IconComponent;
}> = [
    { label: "Email", href: `mailto:${email}`, Icon: Mail },
    {
        label: "Resume",
        href: "/about/resume",
        internal: true,
        Icon: FileText,
    },
    { label: "GitHub", href: "https://github.com/razikuljoni", Icon: SiGithub },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/razikuljoni",
        Icon: BsLinkedin,
    },
    { label: "X", href: "https://x.com/razikuljoni", Icon: SiX },
];

const resources = [
    { label: "Sitemap", href: "/sitemap.xml" },
    { label: "Robots", href: "/robots.txt" },
    { label: "Manifest", href: "/manifest.webmanifest" },
    { label: "llms.txt", href: "/llms.txt" },
];

const renderSocialIcon = (Icon: IconComponent) => (
    <Icon
        className="size-4 transition-transform duration-300 group-hover/link:scale-110"
        aria-hidden
    />
);

export default function FooterSection() {
    return (
        <footer className="border-t border-border py-8 text-center reveal">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4">
                <section className="flex flex-col items-center gap-3">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {socials.map((social) => {
                            const className =
                                "group/link flex size-11 items-center justify-center rounded-md border border-border bg-background text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none";
                            const content = renderSocialIcon(social.Icon);

                            if (social.internal) {
                                return (
                                    <Link
                                        key={social.label}
                                        aria-label={social.label}
                                        className={className}
                                        href={social.href}
                                    >
                                        {content}
                                    </Link>
                                );
                            }

                            return (
                                <a
                                    key={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className={className}
                                    href={social.href}
                                >
                                    {content}
                                </a>
                            );
                        })}
                    </div>
                </section>
                {/* <p className="text-sm text-muted-foreground">
                    Built by{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded font-medium text-foreground/90 underline decoration-border underline-offset-2 transition-colors hover:decoration-foreground/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                        href="https://x.com/razikuljoni"
                    >
                        razikuljoni
                    </a>
                    . The source code is available on{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded font-medium text-foreground/90 underline decoration-border underline-offset-2 transition-colors hover:decoration-foreground/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                        href="https://github.com/razikuljoni/razikuljoni.com"
                    >
                        GitHub
                    </a>
                    .
                </p> */}
                <nav
                    className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-xs text-muted-foreground"
                    aria-label="Developer and crawler resources"
                >
                    {resources.map((resource, index) => (
                        <span key={resource.label} className="inline-flex items-center gap-1">
                            {index > 0 && <span className="select-none">·</span>}
                            <Link
                                className="rounded transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                href={resource.href}
                            >
                                {resource.label}
                            </Link>
                        </span>
                    ))}
                </nav>
                <p className="text-xs text-muted-foreground/70" suppressHydrationWarning>
                    © {new Date().getFullYear()} {siteConfig.name}
                </p>
            </div>
        </footer>
    );
}
