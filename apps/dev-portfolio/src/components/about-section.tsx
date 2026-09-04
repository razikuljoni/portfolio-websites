export default function AboutSection() {
    return (
        <section id="about" className="scroll-mt-24 pt-6 pb-2 cv-auto">
            <div className="relative w-full border-t-[1.5px] border-b-[1.5px] border-(--pattern-border) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1.5px,transparent_0,transparent_50%)] bg-size[6px_6px] bg-fixed">
                <div className="relative z-10 container mx-auto max-w-(--content-max-width) px-4 py-3">
                    <h2 className="text-5xl font-semibold tracking-tight text-foreground">About</h2>
                </div>
            </div>
            <div className="container mx-auto mt-8 max-w-(--content-max-width) px-4">
                <div className="reveal grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                    <div className="interactive-card rounded-lg border border-border/50 bg-muted/20 p-4 sm:p-5">
                        <p className="text-base text-muted-foreground">
                            I&apos;m a Full Stack (MERN) developer with around 2 years of
                            professional frontend engineering experience, focused on building
                            reliable, scalable, and user-centered web applications.
                            <br />
                            <br />
                            My recent work includes enterprise dashboards, inventory and workflow
                            systems, API-driven interfaces, and role-based product experiences. I
                            care deeply about clean architecture, accessibility, performance, and
                            maintainable engineering standards.
                        </p>
                    </div>
                    <div className="reveal-stagger grid gap-3">
                        <div className="interactive-card rounded-lg border border-border/50 p-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider">
                                Product Engineering
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Build responsive, reliable user experiences with clean component
                                architecture, robust state management, and scalable patterns.
                            </p>
                        </div>
                        <div className="interactive-card rounded-lg border border-border/50 p-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider">
                                Design Systems
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Design reusable UI foundations and implementation patterns that keep
                                products consistent while accelerating team delivery.
                            </p>
                        </div>
                        <div className="interactive-card rounded-lg border border-border/50 p-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider">
                                Performance &amp; Quality
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Improve speed, accessibility, and stability while expanding backend
                                capability with NestJS and SQL-based data systems.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
