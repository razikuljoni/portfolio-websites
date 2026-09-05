import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "./PrintButton";
import { SITE_URL, SOCIAL_IMAGE } from "../site";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Résumé of MD Razikul Islam Joni, a product-minded full-stack developer building React, Next.js, Node.js, and enterprise web products.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Résumé — MD Razikul Islam Joni",
    description:
      "Full-stack developer with production experience in enterprise dashboards, workflow systems, APIs, and scalable web products.",
    url: "/resume",
    images: [SOCIAL_IMAGE],
  },
};

const skills = [
  {
    title: "Frontend",
    items: "React.js, Next.js, TypeScript, JavaScript, Redux Toolkit, RTK Query, TanStack Query",
  },
  {
    title: "Interface",
    items: "Tailwind CSS, Ant Design, MUI, responsive UI, accessibility, ECharts, Google Maps",
  },
  {
    title: "Backend",
    items: "Node.js, Express.js, NestJS, REST APIs, JWT, RBAC, Zod, WebSockets",
  },
  {
    title: "Data & delivery",
    items: "MongoDB, PostgreSQL, MySQL, Git, GitHub Actions, Docker, Vercel, Postman",
  },
];

const projects = [
  {
    name: "Shoppershala",
    kind: "Full-stack commerce monorepo",
    copy: "Built dedicated buyer, seller, and admin journeys around JWT RBAC, catalog search, cart and wallet checkout, reviews, wishlists, seller analytics, admin controls, and an in-app AI copilot.",
    stack: "React 19 · Express 5 · MongoDB · TanStack Query · Zustand · Zod · Docker",
    links: [{ label: "Source", href: "https://github.com/razikuljoni/shoppershala" }],
  },
  {
    name: "Forge",
    kind: "Performance-first gym experience",
    copy: "Created a responsive Next.js App Router site with reusable content sections, optimized assets, lazy loading, motion, and SEO-aware server rendering for strong Core Web Vitals.",
    stack: "Next.js 16 · React · TypeScript · Tailwind CSS · Motion · Vercel",
    links: [
      { label: "Live", href: "https://forge-frontend-gym.vercel.app" },
      { label: "Source", href: "https://github.com/razikuljoni/forge-frontend" },
    ],
  },
  {
    name: "Dashboard Wizard",
    kind: "Data visualization workspace",
    copy: "Engineered a modular monitoring dashboard with dynamic routing, reusable panels, multiple chart layouts, interactive controls, geographic views, and scalable Redux state.",
    stack: "React · Redux · Tailwind CSS · ECharts · Google Maps",
    links: [
      { label: "Live", href: "https://dashboard-wizard.vercel.app" },
      { label: "Source", href: "https://github.com/razikuljoni/dashboard-wizard" },
    ],
  },
  {
    name: "OpenPalette",
    kind: "Developer tooling suite",
    copy: "Packaged 11 cohesive dark themes, 300+ file icons, 90+ folder icons, and JavaScript, TypeScript, and React snippets with automated versioning and release workflows.",
    stack: "TypeScript · VS Code API · JSON · GitHub Actions · Standard Version",
    links: [{ label: "Source", href: "https://github.com/razikuljoni/OpenPalette" }],
  },
];

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

export default function ResumePage() {
  return (
    <main className="resume-shell">
      <nav className="resume-toolbar" aria-label="Résumé actions">
        <Link href="/">← Portfolio</Link>
        <PrintButton />
      </nav>

      <article className="resume-page">
        <header className="resume-header">
          <div className="resume-intro">
            <p className="resume-kicker">Full Stack Developer · React / Next.js / Node.js</p>
            <h1>
              MD Razikul <span>Islam Joni</span>
            </h1>
            <p className="summary">
              Product-minded full-stack developer with 2+ years of professional experience
              translating complex operations into fast, accessible web products. Strongest in React
              and Next.js interface systems, API integration, state architecture, and data-heavy
              dashboards; expanding backend depth with Node.js, Express, and NestJS.
            </p>
          </div>

          <address aria-label="Contact details">
            <a href="mailto:razikuljoni@gmail.com">razikuljoni@gmail.com</a>
            <a href="tel:+8801623208660">+880 1623-208660</a>
            <span>Dhaka, Bangladesh</span>
            <ExternalLink href="https://github.com/razikuljoni">GitHub / razikuljoni</ExternalLink>
            <ExternalLink href="https://www.linkedin.com/in/razikuljoni">
              LinkedIn / razikuljoni
            </ExternalLink>
            <ExternalLink href={SITE_URL}>Portfolio</ExternalLink>
          </address>

          <div className="resume-signals" aria-label="Professional highlights">
            <div>
              <strong>2+</strong>
              <span>years in production</span>
            </div>
            <div>
              <strong>123</strong>
              <span>public repositories</span>
            </div>
            <div>
              <strong>11</strong>
              <span>editor themes shipped</span>
            </div>
            <div>
              <strong>390+</strong>
              <span>file & folder icons</span>
            </div>
          </div>
        </header>

        <div className="resume-grid">
          <aside className="resume-sidebar">
            <section>
              <h2>
                <span>01</span> Technical strengths
              </h2>
              <div className="skill-list">
                {skills.map((skill) => (
                  <div className="skill-group" key={skill.title}>
                    <h3>{skill.title}</h3>
                    <p>{skill.items}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2>
                <span>02</span> Education
              </h2>
              <div className="compact-item">
                <b>Computer Science & Engineering studies</b>
                <span>Green University of Bangladesh</span>
                <small>2020—2023 · Undergraduate coursework</small>
              </div>
              <div className="compact-item">
                <b>Higher Secondary Certificate · Science</b>
                <span>Vashantek Government College</span>
                <small>2018—2019</small>
              </div>
            </section>

            <section>
              <h2>
                <span>03</span> Training
              </h2>
              <div className="compact-item">
                <b>Complete Web Development</b>
                <span>Programming Hero · Certificate</span>
              </div>
              <div className="compact-item">
                <b>Next Level Web Development</b>
                <span>Programming Hero · Certificate</span>
              </div>
            </section>

            <section className="language-section">
              <h2>
                <span>04</span> Languages
              </h2>
              <p>
                <b>Bangla</b> · Native
              </p>
              <p>
                <b>English</b> · Professional working proficiency
              </p>
            </section>
          </aside>

          <div className="resume-main">
            <section>
              <h2>
                <span>05</span> Professional experience
              </h2>
              <div className="resume-role">
                <div className="role-heading">
                  <div>
                    <h3>HawkEyes Digital Monitoring Ltd.</h3>
                    <p>Junior Frontend Developer · Full-time · On-site</p>
                  </div>
                  <span>
                    May 2024—Apr 2026
                    <br />
                    Uttara, Dhaka
                  </span>
                </div>
                <ul>
                  <li>
                    Designed and delivered responsive enterprise dashboards, operational workflow
                    systems, inventory management, product tracking, reporting, and field-work
                    assignment interfaces.
                  </li>
                  <li>
                    Integrated REST APIs and real-time data flows with JWT authentication,
                    role-based access control, Redux Toolkit, and RTK Query across data-intensive
                    applications.
                  </li>
                  <li>
                    Built reusable UI and state patterns that reduced duplicate implementation and
                    made complex loading, error, empty, and permission states predictable.
                  </li>
                  <li>
                    Partnered with backend engineers on API contracts, frontend data models,
                    validation rules, edge cases, Git workflows, and Vercel delivery.
                  </li>
                  <li>
                    Improved performance, accessibility, maintainability, and responsive behavior
                    across desktop, tablet, and mobile experiences.
                  </li>
                </ul>
              </div>
            </section>

            <section className="projects-section">
              <div className="section-heading">
                <h2>
                  <span>06</span> Selected engineering work
                </h2>
                <ExternalLink href="https://github.com/razikuljoni?tab=repositories">
                  All repositories
                </ExternalLink>
              </div>
              <div className="project-list">
                {projects.map((project) => (
                  <article className="resume-project" key={project.name}>
                    <div className="resume-project-heading">
                      <div>
                        <h3>{project.name}</h3>
                        <span>{project.kind}</span>
                      </div>
                      <div className="project-links">
                        {project.links.map((link) => (
                          <ExternalLink href={link.href} key={link.label}>
                            {link.label}
                          </ExternalLink>
                        ))}
                      </div>
                    </div>
                    <p>{project.copy}</p>
                    <small>{project.stack}</small>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

        <footer className="resume-footer">
          <span>MD Razikul Islam Joni · Full Stack Developer</span>
          <span>Open to product-focused frontend and full-stack roles</span>
        </footer>
      </article>
    </main>
  );
}
