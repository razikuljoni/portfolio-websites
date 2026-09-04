import { BackgroundPaths } from "@/src/components/background-paths";
import HeroSection from "@/src/components/hero-section";
import dynamic from "next/dynamic";

const AboutSection = dynamic(() => import("@/src/components/about-section").then((m) => m.default));
const Experience = dynamic(() =>
    import("@/src/components/experience-section").then((m) => m.default),
);
const Projects = dynamic(() => import("@/src/components/projects-section").then((m) => m.default));
const AiDiscoverySection = dynamic(() =>
    import("@/src/components/ai-discovery-section").then((m) => m.default),
);
const Blogs = dynamic(() => import("@/src/components/blogs-section").then((m) => m.default));
const GithubSection = dynamic(() =>
    import("@/src/components/github-section").then((m) => m.default),
);
const FooterSection = dynamic(() =>
    import("@/src/components/footer-section").then((m) => m.default),
);

export default function Page() {
    return (
        <main className="mt-10">
            <div className="flex flex-col">
                <BackgroundPaths>
                    <HeroSection />
                </BackgroundPaths>
                <div className="cv-auto">
                    <AboutSection />
                </div>
                <div className="cv-auto">
                    <Experience />
                </div>
                <div className="cv-auto">
                    <Projects />
                </div>
                <div className="cv-auto">
                    <AiDiscoverySection />
                </div>
                <div className="cv-auto">
                    <Blogs />
                </div>
                <div className="cv-auto">
                    <GithubSection />
                </div>
                <div className="cv-auto">
                    <FooterSection />
                </div>
            </div>
        </main>
    );
}
