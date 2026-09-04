import Image from "next/image";
import Link from "next/link";
import portraitImage from "@/public/joni-portrait-new.webp";

const featuredProjects = [
  {
    index: "P/01",
    name: "Shoppershala",
    type: "Full-stack commerce platform",
    year: "2026",
    statement:
      "A production-minded commerce monorepo where buyers, sellers, and admins each get a purpose-built workflow.",
    challenge:
      "Commerce gets messy fast: identity, permissions, catalog discovery, transactions, reviews, analytics, and operational tooling all need to stay coherent.",
    system:
      "A layered Express REST API and React SPA connected through a pnpm monorepo, with JWT role-based access, Zod validation, MongoDB, structured logging, and Docker-backed local development.",
    decisions: [
      "Separated buyer, seller, and admin journeys instead of forcing one generic dashboard",
      "Added wallet checkout, reviews, wishlists, seller analytics, and an in-app AI copilot",
      "Kept the workspace deployable with CI, shared scripts, seed data, and documented architecture",
    ],
    stack: ["React 19", "Express 5", "MongoDB", "TanStack Query", "Zustand", "Zod", "Docker"],
    href: "https://github.com/razikuljoni/shoppershala",
    accent: "blue",
  },
  {
    index: "P/02",
    name: "CoSketch",
    type: "Realtime collaboration",
    year: "2025",
    statement:
      "A collaborative whiteboard that treats drawing as a synchronized system—not a pile of local canvas events.",
    challenge:
      "Multiple people need to draw, select, move, and erase at the same time without turning the shared canvas into a conflict machine.",
    system:
      "A Next.js and TypeScript client backed by Node.js, WebSockets, PostgreSQL, and Docker Compose for predictable multi-service development.",
    decisions: [
      "Designed low-latency event synchronization for multi-user drawing sessions",
      "Built deterministic selection, shape, and eraser mechanics",
      "Containerized the frontend, API, and socket services for local and production parity",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "WebSocket", "PostgreSQL", "Docker"],
    href: "https://razikuljoni-portfolio.vercel.app/projects/cosketch",
    accent: "yellow",
  },
  {
    index: "P/03",
    name: "OpenPalette",
    type: "Developer tooling",
    year: "2026",
    statement:
      "A complete VS Code customization suite built for developers who want a coherent workspace, not a random bag of extensions.",
    challenge:
      "Themes, file icons, folder semantics, and code snippets usually come from separate tools with inconsistent visual language and release processes.",
    system:
      "One install delivers 11 dark themes, 300+ file icons, 90+ folder icons, and JavaScript, TypeScript, and React snippets—with automated semantic releases.",
    decisions: [
      "Curated one consistent developer experience across theme, icon, and snippet layers",
      "Added conventional-commit release automation, changelogs, tags, and packaging",
      "Kept compatibility with VS Code, Cursor, and other VS Code forks",
    ],
    stack: ["TypeScript", "VS Code API", "JSON", "Standard Version", "GitHub Actions"],
    href: "https://github.com/razikuljoni/OpenPalette",
    accent: "coral",
  },
  {
    index: "P/04",
    name: "Cow Hut API",
    type: "Backend systems",
    year: "2026",
    statement:
      "A typed marketplace API with separate user and admin authentication flows and an end-to-end commerce domain.",
    challenge:
      "The backend needed secure identity, refresh tokens, profile management, livestock inventory, and order operations without muddying the domain boundaries.",
    system:
      "A TypeScript service exposing user, admin, cow, order, and profile modules through REST endpoints with JWT authentication and MongoDB persistence.",
    decisions: [
      "Separated admin and user authentication, including refresh-token flows",
      "Modeled complete CRUD lifecycles for inventory and accounts",
      "Documented the live API surface so the contract is easy to test and consume",
    ],
    stack: ["TypeScript", "Node.js", "Express", "MongoDB", "JWT", "REST API"],
    href: "https://github.com/razikuljoni/Cow-Hut-Backend",
    accent: "mint",
  },
];

const labProjects = [
  {
    name: "Dashboard Wizard",
    copy: "Modular monitoring dashboard with dynamic routing, multiple visualization layouts, interactive widgets, Google Maps, and ECharts.",
    stack: "React · Redux · Tailwind · ECharts · Google Maps",
    href: "https://github.com/razikuljoni/dashboard-wizard",
  },
  {
    name: "Forge",
    copy: "Performance-focused gym experience built with the Next.js App Router, reusable sections, lazy loading, SEO-aware rendering, and motion.",
    stack: "Next.js 16 · TypeScript · Tailwind · Framer Motion",
    href: "https://github.com/razikuljoni/forge-frontend",
  },
  {
    name: "Nest LMS",
    copy: "Backend learning project for building authenticated CRUD services with a modular NestJS architecture and MongoDB persistence.",
    stack: "NestJS · TypeScript · MongoDB · JWT · bcrypt",
    href: "https://github.com/razikuljoni/nest-lms",
  },
];

const principles = [
  ["01", "Make complexity legible", "Good interfaces reveal the system without making people study it."],
  ["02", "Design for change", "Reusable components and clear boundaries beat a clever one-off every time."],
  ["03", "Performance is product", "Fast, stable, accessible software is not polish—it is the experience."],
  ["04", "Own the handoff", "A feature is not finished until the API contract, edge cases, and deployment story make sense."],
];

const capabilities = [
  { name: "React / Next.js", level: "Primary", detail: "App Router, RSC, component systems, SSR, performance" },
  { name: "JavaScript / TypeScript", level: "Primary", detail: "Modern language patterns, async systems, safe refactoring" },
  { name: "State & data", level: "Advanced", detail: "Redux Toolkit, RTK Query, TanStack Query, Zustand" },
  { name: "Node / Express", level: "Advanced", detail: "REST APIs, middleware, authentication, validation" },
  { name: "NestJS", level: "Growing", detail: "Modules, services, guards, scalable backend structure" },
  { name: "Data systems", level: "Working", detail: "MongoDB, PostgreSQL, MySQL, schema thinking" },
  { name: "Interface craft", level: "Primary", detail: "Tailwind, Ant Design, responsive UI, accessibility" },
  { name: "Delivery", level: "Working", detail: "Docker, GitHub Actions, Vercel, CI/CD foundations" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function SparkMark() {
  return (
    <svg className="spark-mark" aria-hidden="true" viewBox="0 0 80 80" fill="none">
      <path d="M40 3v74M3 40h74M14 14l52 52M66 14 14 66" />
      <circle cx="40" cy="40" r="13" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <a className="identity" href="#top" aria-label="R/J — Joni, back to top">
          <span className="identity-mark">R/J</span>
          <span>MD Razikul Islam Joni</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#capabilities">Capabilities</a>
          <Link href="/resume">Résumé</Link>
        </nav>
        <a className="nav-contact" href="#contact">
          Start a conversation <Arrow diagonal />
        </a>
      </header>

      <main id="main-content" tabIndex={-1}>
      <section className="hero" id="top">
        <div className="hero-rail" aria-hidden="true">
          <span>PORTFOLIO / 2026</span>
          <span>24.23° N · 90.24° E</span>
        </div>

        <div className="hero-main">
          <p className="hero-kicker"><i /> Product-minded full-stack developer</p>
          <h1>
            I build the quiet systems behind
            <em>busy products.</em>
          </h1>
          <div className="hero-intro">
            <p>
              Two years inside real operational software taught me that the best
              interface is not the loudest one. It is the one that makes a complex
              workflow feel inevitable.
            </p>
            <div className="hero-actions">
              <a className="button solid" href="#projects">Read the work <Arrow /></a>
              <Link className="button ghost" href="/resume">Résumé <Arrow diagonal /></Link>
            </div>
          </div>
        </div>

        <div className="portrait-stage">
          <div className="portrait-frame">
            <Image
              src={portraitImage}
              alt="MD Razikul Islam Joni"
              sizes="(max-width: 608px) calc(100vw - 48px), (max-width: 820px) 560px, 39vw"
              placeholder="blur"
              quality={70}
              preload
            />
            <div className="portrait-screen" />
          </div>
          <span className="portrait-caption">Dhaka, Bangladesh / Available for full-stack roles / Onsite or Remote</span>
          <div className="portrait-note note-one"><small>Current edge</small><strong>Frontend depth</strong><span>React · Next · Systems UI</span></div>
          <div className="portrait-note note-two"><small>Building next</small><strong>Backend range</strong><span>NestJS · ExpressJS · MongoDB</span></div>
          <SparkMark />
        </div>

        <div className="signal-strip">
          <div><strong>02+</strong><span>Years in production teams</span></div>
          <div><strong>123</strong><span>Public GitHub repositories</span></div>
          <div><strong>11</strong><span>Editor themes shipped in OpenPalette</span></div>
          <div><strong>390+</strong><span>File and folder icons curated</span></div>
        </div>
      </section>

      <section className="manifesto section-wrap" id="profile">
        <div className="section-label"><span>00</span><p>Position</p></div>
        <div className="manifesto-copy">
          <p className="oversized-copy">
            Frontend specialist by experience. Full-stack engineer by direction.
            Product thinker by habit.
          </p>
          <div className="manifesto-columns">
            <p>
              I work best where data-heavy workflows, reusable interface systems,
              and real business constraints meet. My recent work spans enterprise
              dashboards, inventory and product tracking, field-work assignment,
              reporting, role-based access, and API-driven operations.
            </p>
            <p>
              I care about the details users feel but rarely name: immediate feedback,
              predictable state, useful empty screens, resilient loading behavior,
              keyboard access, and code another developer can safely extend.
            </p>
          </div>
        </div>
      </section>

      <section className="project-section" id="projects">
        <div className="project-heading section-wrap">
          <div className="section-label light"><span>01</span><p>Project dossiers</p></div>
          <div>
            <p className="eyebrow">Selected systems / not screenshot galleries</p>
            <h2>The work,<br /><em>opened up.</em></h2>
          </div>
          <p className="heading-note">
            Each case notes the problem, the system, and the decisions—not just the technology badges.
          </p>
        </div>

        <div className="project-dossiers">
          {featuredProjects.map((project) => (
            <article className={`dossier accent-${project.accent}`} key={project.name}>
              <div className="dossier-top">
                <div className="dossier-id"><span>{project.index}</span><small>{project.year}</small></div>
                <div className="dossier-title"><p>{project.type}</p><h3>{project.name}</h3></div>
                <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}><Arrow diagonal /></a>
              </div>
              <p className="project-statement">{project.statement}</p>
              <div className="dossier-body">
                <div><small>The challenge</small><p>{project.challenge}</p></div>
                <div><small>The system</small><p>{project.system}</p></div>
                <div className="decision-list"><small>Key decisions</small><ul>{project.decisions.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
              <div className="dossier-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-section section-wrap" id="experience">
        <div className="section-label"><span>02</span><p>Experience</p></div>
        <div className="experience-content">
          <div className="experience-heading">
            <p className="eyebrow">May 2024 — April 2026 / Uttara, Dhaka</p>
            <h2>HawkEyes Digital<br />Monitoring Ltd.</h2>
            <p className="role">Jr. Frontend Developer · Full-time</p>
          </div>
          <div className="experience-story">
            <p className="lead">
              Built the operational surfaces behind real business monitoring—where a small UI mistake can become a very large workflow problem.
            </p>
            <div className="experience-grid">
              <div><span>01</span><h3>Operational products</h3><p>Responsive enterprise dashboards, inventory systems, product tracking, reporting, and real-time field-work assignment interfaces.</p></div>
              <div><span>02</span><h3>Data architecture</h3><p>REST API integration, JWT and role-based access, reusable query flows, Redux Toolkit, and RTK Query for complex application state.</p></div>
              <div><span>03</span><h3>Cross-team delivery</h3><p>Partnered with backend engineers on API contracts, frontend data models, edge cases, Git workflows, and Vercel-based delivery.</p></div>
              <div><span>04</span><h3>Quality work</h3><p>Improved responsiveness, accessibility, maintainability, and performance across data-intensive interfaces and multiple viewports.</p></div>
            </div>
            <div className="experience-stack"><span>React.js</span><span>Redux Toolkit</span><span>RTK Query</span><span>Ant Design</span><span>Charts</span><span>Google Maps</span><span>GitHub Actions</span><span>Vercel</span></div>
          </div>
        </div>
      </section>

      <section className="principles-section section-wrap">
        <div className="section-label"><span>03</span><p>How I work</p></div>
        <div className="principles-content">
          <h2>A small set of<br /><em>strong defaults.</em></h2>
          <div className="principle-list">
            {principles.map(([number, title, copy]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="capabilities-section" id="capabilities">
        <div className="capabilities-head section-wrap">
          <div className="section-label light"><span>04</span><p>Capabilities</p></div>
          <div><p className="eyebrow">A working system, not a logo cloud</p><h2>Tools with<br /><em>context.</em></h2></div>
        </div>
        <div className="capability-table section-wrap">
          {capabilities.map((item, index) => (
            <div className="capability-row" key={item.name}>
              <span>0{index + 1}</span><h3>{item.name}</h3><p>{item.detail}</p><small>{item.level}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="lab-section section-wrap">
        <div className="section-label"><span>05</span><p>More from the lab</p></div>
        <div className="lab-content">
          <div className="lab-heading"><h2>Smaller builds.<br />Useful signals.</h2><a href="https://github.com/razikuljoni?tab=repositories" target="_blank" rel="noreferrer">Browse all 123 repositories <Arrow diagonal /></a></div>
          <div className="lab-grid">
            {labProjects.map((project, index) => (
              <a href={project.href} target="_blank" rel="noreferrer" className="lab-card" key={project.name}>
                <span>L/0{index + 1}</span><h3>{project.name}</h3><p>{project.copy}</p><small>{project.stack}</small><i><Arrow diagonal /></i>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="profile-section section-wrap">
        <div className="section-label"><span>06</span><p>Background</p></div>
        <div className="background-grid">
          <div className="education-block">
            <p className="eyebrow">Education & training</p>
            <div><span>2020—2023</span><h3>Computer Science & Engineering studies</h3><p>Green University of Bangladesh</p></div>
            <div><span>2018—2019</span><h3>Higher Secondary Certificate · Science</h3><p>Vashantek Government College</p></div>
            <div><span>Completed</span><h3>Web Development & Next Level Web Development</h3><p>Programming Hero · both tracks</p></div>
          </div>
          <div className="offclock-block">
            <p className="eyebrow">Off the clock</p>
            <h2>Good software needs a life outside software.</h2>
            <p>Music for focus. Movies for new perspectives. Long walks, open air, and new places for the reset button. Curiosity travels well between code and everything else.</p>
            <div><span>Bangla · Native</span><span>English · Professional working proficiency</span></div>
          </div>
        </div>
      </section>

      <section className="closing" id="contact">
        <div className="closing-orbit" aria-hidden="true"><span>LET&apos;S BUILD SOMETHING USEFUL · </span></div>
        <p>Available for the next serious product problem.</p>
        <h2>Bring the complexity.<br /><em>I&apos;ll bring the clarity.</em></h2>
        <div className="contact-actions">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=razikuljoni@gmail.com&su=Let%27s%20work%20together" target="_blank" rel="noreferrer">Write an email <Arrow diagonal /></a>
          <a href="https://cal.com/razikuljoni/15min" target="_blank" rel="noreferrer">Book a 15 min call <Arrow diagonal /></a>
        </div>
        <p className="contact-address">razikuljoni@gmail.com</p>
      </section>
      </main>

      <footer>
        <span>© 2026 MD Razikul Islam Joni</span>
        <div><Link href="/resume">Résumé</Link><a href="https://github.com/razikuljoni" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/razikuljoni" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://x.com/razikuljoni" target="_blank" rel="noreferrer">X</a><a href="https://cal.com/razikuljoni/15min" target="_blank" rel="noreferrer">15 min call</a><a href="#top">Top ↑</a></div>
      </footer>
    </>
  );
}
