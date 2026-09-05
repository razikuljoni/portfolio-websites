export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack Apps' | 'Frontend & Dashboards' | 'Web Applications' | 'Developer Tooling';
  description: string;
  challenge: string;
  solution: string;
  impact: string[];
  technologies: string[];
  image: string;
  diagramUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  badge?: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  architectureWins: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    experienceYears: string;
    description: string;
    featured?: boolean;
  }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
  relationship: string;
}

export interface Publication {
  id: string;
  title: string;
  type: 'Technical Guide' | 'Architecture Breakdown' | 'Case Study' | 'Keynote';
  date: string;
  readTime: string;
  abstract: string;
  tags: string[];
  linkText: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  change: string;
  decimals?: number;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  details?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  location: string;
  status: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  portfolioUrl: string;
  timezone: string;
  bio: string[];
  corePrinciples: { title: string; desc: string }[];
  education: EducationItem[];
  spokenLanguages: { language: string; proficiency: string }[];
}

export interface PortfolioData {
  profile: ProfileData;
  stats: StatItem[];
  projects: Project[];
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
  publications: Publication[];
  testimonials: Testimonial[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "MD Razikul Islam Joni",
    title: "Full Stack (MERN) Developer · React / Next.js / Node.js",
    tagline: "Translating complex operations into fast, accessible web products with React.js, Next.js, and modern full-stack architectures.",
    location: "Mirpur, Dhaka, Bangladesh",
    status: "Open to Full Stack & Frontend Product Roles",
    email: "razikuljoni@gmail.com",
    phone: "+880 1623-208660",
    github: "https://github.com/razikuljoni",
    linkedin: "https://linkedin.com/in/razikuljoni",
    portfolioUrl: "https://razikuljoni-portfolio.vercel.app",
    timezone: "Asia/Dhaka (GMT+6 / BST)",
    bio: [
      "Results-driven Full Stack (MERN) Developer with 2+ years of professional production experience delivering scalable, high-performance web applications using React.js, Next.js, and modern JavaScript / TypeScript ecosystems.",
      "Proven track record building enterprise-grade admin dashboards, business management systems, operational workflow tools, and inventory tracking platforms with seamless REST API integration and predictable state management (Redux Toolkit, RTK Query, TanStack Query).",
      "Focused on translating complex business requirements into fast, accessible, and responsive user experiences, while expanding backend and system architecture depth with Node.js, Express.js, NestJS, and MongoDB."
    ],
    corePrinciples: [
      {
        title: "Modular State & Clean Data Flow",
        desc: "Designing predictable global stores and normalized API caches (RTK Query / TanStack Query) that eliminate redundant network requests and gracefully handle loading/error states."
      },
      {
        title: "Performance & Core Web Vitals",
        desc: "Leveraging Server-Side Rendering (SSR), route chunking, asset compression, and lightweight client hydration to consistently hit 95+ Google Lighthouse scores."
      },
      {
        title: "Robust API Contracts & Security",
        desc: "Enforcing strict type-safety with TypeScript & Zod, JWT-based authentication with token rotation, and fine-grained Role-Based Access Control (RBAC)."
      },
      {
        title: "Accessibility & Cross-Device Fluidity",
        desc: "Crafting fully accessible (WCAG compliant) semantic HTML and responsive layouts with Tailwind CSS, ensuring seamless experiences from mobile to ultra-wide displays."
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "BSc in Computer Science & Engineering (CSE)",
        institution: "Green University of Bangladesh",
        location: "Dhaka, Bangladesh",
        period: "2020 – 2023",
        details: "Undergraduate coursework focused on Data Structures, Algorithms, Software Engineering, Database Systems, and Object-Oriented Programming."
      },
      {
        id: "edu-2",
        degree: "Higher Secondary Certificate (HSC) · Science",
        institution: "Vashantek Govt. College",
        location: "Dhaka, Bangladesh",
        period: "2018 – 2019",
        details: "Higher secondary education curriculum with concentration in Mathematics, Physics, and ICT."
      },
      {
        id: "edu-3",
        degree: "Complete Web Development & Next Level Web Development",
        institution: "Programming Hero",
        location: "Online Certification",
        period: "Completed",
        details: "Comprehensive professional full-stack training covering Advanced React, Next.js, Node.js, Express, MongoDB, TypeScript, and Redux Toolkit."
      }
    ],
    spokenLanguages: [
      { language: "Bangla", proficiency: "Native" },
      { language: "English", proficiency: "Professional Working Proficiency" }
    ]
  },

  stats: [
    { label: "Years in Production", value: 2, suffix: "+", change: "May 2024 – Present" },
    { label: "Public Repositories", value: 123, suffix: "", change: "Active open-source & codebases" },
    { label: "Editor Themes Shipped", value: 11, suffix: "", change: "OpenPalette developer suite" },
    { label: "Icons & Folder Assets", value: 390, suffix: "+", change: "Packaged developer tooling" },
    { label: "UI Accessibility & a11y", value: 100, suffix: "%", change: "Cross-device responsive perfection" },
    { label: "State Sync & Predictability", value: 99.9, suffix: "%", decimals: 1, change: "Redux Toolkit & RTK Query" },
  ],

  projects: [
    {
      id: "z-shop-ecommerce",
      title: "z-shop",
      subtitle: "E-Commerce Platform & AI Shopping Advisor",
      category: "Full-Stack Apps",
      description: "A full-stack e-commerce platform with real-time inventory management, multi-currency checkout, live order tracking, seller analytics, and an integrated Google Gemini AI shopping advisor.",
      challenge: "Handling real-time stock synchronization, multi-tier permissions (Customer/Seller/Admin), secure multi-currency checkout, and personalized catalog discovery.",
      solution: "Built with Next.js 15 App Router, React 19, TypeScript, Prisma ORM, PostgreSQL, Redis caching, Socket.io webhooks, and Google Gemini AI API.",
      impact: [
        "Integrated Google Gemini AI for serverless natural-language shopping assistance and catalog search",
        "Implemented 2FA security authentication, multi-currency checkout, and Recharts analytics dashboards",
        "Architected real-time inventory synchronization and role-based access control for multi-merchant management"
      ],
      technologies: ["Next.js 15", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Gemini AI", "Redis", "Socket.io", "Tailwind CSS v4"],
      image: "https://picsum.photos/seed/zshop_app/1000/620",
      diagramUrl: "https://picsum.photos/seed/zshop_arch/1200/800",
      githubUrl: "https://github.com/razikuljoni/z-shop",
      demoUrl: "https://z-shop-online.vercel.app",
      featured: true,
      metrics: [
        { label: "AI Advisor", value: "Gemini API" },
        { label: "Data Layer", value: "Prisma + Postgres" },
        { label: "Security", value: "2FA + RBAC" }
      ]
    },
    {
      id: "sensorgrid-iot",
      title: "SensorGrid",
      subtitle: "Production-Grade IoT Telemetry & Device Intelligence Platform",
      category: "Full-Stack Apps",
      description: "A production-grade IoT platform for streaming real-time sensor telemetry, historical data visualization, remote device control, and automated alert monitoring.",
      challenge: "Handling concurrent streaming data from 50+ IoT sensors requires low-latency WebSockets, time-series historical data storage, and instant visual telemetry alerts.",
      solution: "Engineered with Next.js, React, TypeScript, WebSocket telemetry streaming, Prisma ORM, PostgreSQL, TanStack Query, NextAuth, and Zustand.",
      impact: [
        "Real-time WebSocket telemetry streaming and remote command dispatch for industrial sensor networks",
        "Unified calm monitoring dashboard for tracking 50+ device metrics simultaneously with anomaly detection",
        "Secure NextAuth authentication and Prisma PostgreSQL data layer for granular telemetry management"
      ],
      technologies: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Socket.io", "NextAuth", "TanStack Query", "Zustand"],
      image: "https://picsum.photos/seed/sensorgrid_app/1000/620",
      diagramUrl: "https://picsum.photos/seed/sensorgrid_arch/1200/800",
      githubUrl: "https://github.com/razikuljoni/SensorGrid",
      demoUrl: "https://github.com/razikuljoni/SensorGrid",
      featured: true,
      metrics: [
        { label: "Live Telemetry", value: "WebSockets" },
        { label: "Device Metrics", value: "50+ Concurrent" },
        { label: "State Sync", value: "Zustand + TanStack" }
      ]
    },
    {
      id: "shoppershala-commerce",
      title: "Shoppershala",
      subtitle: "Full-Stack E-Commerce Monorepo with Multi-Role RBAC & AI Copilot",
      category: "Full-Stack Apps",
      description: "A full-stack multi-vendor commerce platform featuring distinct user workflows for buyers, sellers, and administrators with role-based access control, real-time cart sync, wallet checkout, and an in-app AI assistant.",
      challenge: "Coordinating multi-role permissions, complex shopping cart transactions, wallet checkouts, and real-time seller analytics in a single unified architecture.",
      solution: "Built with React 19, Express 5, MongoDB, and TanStack Query. Implemented JWT authentication with RBAC, modular API controllers, Zustand client stores, and Dockerized microservices.",
      impact: [
        "Full end-to-end checkout flow with instant wallet deductions and order lifecycle tracking",
        "Dedicated admin governance panel for product catalogs, merchant approvals, and analytics",
        "Integrated in-app AI copilot for intelligent product recommendations and query support"
      ],
      technologies: ["React 19", "Express.js 5", "MongoDB", "TanStack Query", "Zustand", "Zod", "Docker", "JWT", "Tailwind CSS"],
      image: "https://picsum.photos/seed/shoppershala_app/1000/620",
      diagramUrl: "https://picsum.photos/seed/shoppershala_arch/1200/800",
      githubUrl: "https://github.com/razikuljoni",
      demoUrl: "https://razikuljoni-portfolio.vercel.app",
      featured: true,
      metrics: [
        { label: "User Roles", value: "Buyer / Seller / Admin" },
        { label: "State Sync", value: "TanStack + Zustand" },
        { label: "Validation", value: "Type-Safe Zod" }
      ]
    },
    {
      id: "forge-fitness",
      title: "Forge",
      subtitle: "Performance-First Fitness & Gym Web Application",
      category: "Web Applications",
      description: "A production-ready modern fitness and gym web application built for lightning-fast Core Web Vitals, dynamic program schedules, and seamless client interactions.",
      challenge: "Achieving sub-second Largest Contentful Paint (LCP) and high SEO ranking while handling rich media, trainer rosters, and membership pricing plans.",
      solution: "Developed with Next.js 16 App Router using modular component architecture, server-side rendering (SSR), lazy image loading, and fluid entry animations with Motion.",
      impact: [
        "98+ Google Lighthouse Performance and SEO score across mobile and desktop viewports",
        "Modular reusable section components deployed with zero-friction CI/CD on Vercel",
        "Interactive program selection with responsive membership calculation"
      ],
      technologies: ["Next.js 16", "React.js", "TypeScript", "Tailwind CSS", "Motion", "Vercel"],
      image: "https://picsum.photos/seed/forge_fitness/1000/620",
      diagramUrl: "https://picsum.photos/seed/forge_arch/1200/800",
      githubUrl: "https://github.com/razikuljoni",
      demoUrl: "https://razikuljoni-portfolio.vercel.app",
      featured: true,
      metrics: [
        { label: "Lighthouse Score", value: "98 / 100" },
        { label: "First Contentful Paint", value: "< 0.8s" },
        { label: "Mobile Usability", value: "100% Pass" }
      ]
    },
    {
      id: "dashboard-wizard",
      title: "Dashboard Wizard",
      subtitle: "Enterprise Data Visualization & Analytics Workspace",
      category: "Frontend & Dashboards",
      description: "An enterprise-grade frontend dashboard designed for real-time business monitoring, featuring modular panel layouts, dynamic route filtering, and geospatial mapping.",
      challenge: "Rendering multiple high-density data visualizations and map markers simultaneously without frame drops or memory leaks.",
      solution: "Built in React with Redux centralized state management, ECharts rendering pipelines, and Google Maps API integration for interactive geospatial exploration.",
      impact: [
        "Modular panel components allowing users to rearrange and toggle different chart formats",
        "Seamless real-time filter updates with zero UI lag across large data sets",
        "Integrated geographic store/branch visualizer with custom map pins"
      ],
      technologies: ["React.js", "Redux Toolkit", "Tailwind CSS", "ECharts", "Google Maps API", "REST API"],
      image: "https://picsum.photos/seed/dashboard_wizard/1000/620",
      diagramUrl: "https://picsum.photos/seed/dashboard_arch/1200/800",
      githubUrl: "https://github.com/razikuljoni",
      demoUrl: "https://razikuljoni-portfolio.vercel.app",
      featured: true,
      metrics: [
        { label: "Chart Layouts", value: "12+ Formats" },
        { label: "State Management", value: "Redux Toolkit" },
        { label: "Rendering", value: "60 FPS Fluid" }
      ]
    },
    {
      id: "openpalette-vscode",
      title: "OpenPalette",
      subtitle: "Developer Tooling Suite & VS Code Theme Ecosystem",
      category: "Developer Tooling",
      description: "An open-source developer productivity suite packaging 11 meticulously crafted editor color palettes, 300+ file icons, 90+ folder icons, and multi-language snippets.",
      challenge: "Maintaining visual consistency across hundreds of language syntax tokens and file extension icons with automated version releases.",
      solution: "Engineered using TypeScript and the VS Code Extension API with automated GitHub Actions workflows, semantic release standard versioning, and JSON token mapping.",
      impact: [
        "11 distinct theme flavors optimized for long coding sessions and reduced eye strain",
        "390+ comprehensive file and folder icons covering modern frameworks and tools",
        "Fully automated CI/CD pipeline for semantic versioning and changelog generation"
      ],
      technologies: ["TypeScript", "VS Code API", "JSON", "GitHub Actions", "Standard Version", "Node.js"],
      image: "https://picsum.photos/seed/openpalette_suite/1000/620",
      diagramUrl: "https://picsum.photos/seed/openpalette_arch/1200/800",
      githubUrl: "https://github.com/razikuljoni",
      demoUrl: "https://razikuljoni-portfolio.vercel.app",
      featured: true,
      metrics: [
        { label: "Editor Themes", value: "11 Flavors" },
        { label: "Icons Packaged", value: "390+ Files/Folders" },
        { label: "Release Flow", value: "Automated CI/CD" }
      ]
    }
  ],

  skillCategories: [
    {
      title: "Frontend Engineering",
      description: "Component architecture, scalable state management, and modern rendering patterns.",
      iconName: "Layout",
      skills: [
        { name: "React.js", level: 96, experienceYears: "2+ yrs", description: "Hooks, Context API, component composition, custom state patterns", featured: true },
        { name: "Next.js", level: 92, experienceYears: "2+ yrs", description: "App Router, SSR, SSG, dynamic routing, SEO optimization", featured: true },
        { name: "TypeScript", level: 90, experienceYears: "2+ yrs", description: "Strong typing, interfaces, generics, type-safe API contracts", featured: true },
        { name: "JavaScript (ES6+)", level: 95, experienceYears: "3+ yrs", description: "Async/await, closures, event loop, DOM manipulation", featured: true },
        { name: "Redux Toolkit & RTK Query", level: 94, experienceYears: "2+ yrs", description: "Centralized store, slices, automated caching, normalized state", featured: true },
        { name: "TanStack Query", level: 88, experienceYears: "1.5+ yrs", description: "Server state caching, optimistic updates, pagination" }
      ]
    },
    {
      title: "Interface & UI Frameworks",
      description: "Responsive layouts, data visualizations, design tokens, and fluid animations.",
      iconName: "Palette",
      skills: [
        { name: "Tailwind CSS", level: 96, experienceYears: "2+ yrs", description: "Custom utility configurations, dark mode, responsive layouts", featured: true },
        { name: "Material UI & Ant Design", level: 90, experienceYears: "2+ yrs", description: "Enterprise component libraries, form systems, data tables", featured: true },
        { name: "HTML5 & CSS3 / SCSS", level: 95, experienceYears: "3+ yrs", description: "Semantic markup, modern CSS grid/flexbox, transitions" },
        { name: "ECharts & Data Visualization", level: 88, experienceYears: "1.5+ yrs", description: "Interactive dashboards, charts, graphs, map analytics", featured: true },
        { name: "Motion / Framer Motion", level: 86, experienceYears: "1.5+ yrs", description: "Fluid UI transitions, stagger animations, gesture handling" },
        { name: "Google Maps API", level: 85, experienceYears: "1.5+ yrs", description: "Geospatial markers, routing, custom map layers" }
      ]
    },
    {
      title: "Backend & Database Systems",
      description: "RESTful services, authentication security, schema modeling, and modular backends.",
      iconName: "Database",
      skills: [
        { name: "Node.js & Express.js", level: 90, experienceYears: "2+ yrs", description: "RESTful API services, middleware pipelines, error handling", featured: true },
        { name: "NestJS", level: 82, experienceYears: "1+ yrs", description: "Modular architecture, dependency injection, TypeScript backend", featured: true },
        { name: "MongoDB & Mongoose", level: 88, experienceYears: "2+ yrs", description: "Document modeling, aggregation pipelines, indexing", featured: true },
        { name: "JWT Auth & RBAC", level: 92, experienceYears: "2+ yrs", description: "Role-based access control, token refresh, secure sessions", featured: true },
        { name: "REST APIs & Zod", level: 90, experienceYears: "2+ yrs", description: "API contract design, payload validation, error contracts" },
        { name: "PostgreSQL & MySQL", level: 80, experienceYears: "1+ yrs", description: "Relational schemas, queries, foreign keys, migrations" },
        { name: "WebSockets & GraphQL (Basic)", level: 78, experienceYears: "1+ yrs", description: "Real-time messaging, schema definitions" }
      ]
    },
    {
      title: "Tools, Platforms & Delivery",
      description: "Version control, automated CI/CD pipelines, cloud hosting, and testing tools.",
      iconName: "Cpu",
      skills: [
        { name: "Git & GitHub", level: 95, experienceYears: "2+ yrs", description: "Branching strategies, PR reviews, merge resolution", featured: true },
        { name: "GitHub Actions & CI/CD", level: 86, experienceYears: "1.5+ yrs", description: "Automated testing, linting, release workflows", featured: true },
        { name: "Vercel & Netlify", level: 92, experienceYears: "2+ yrs", description: "Serverless deployments, environment configurations, preview branches", featured: true },
        { name: "Firebase & Supabase", level: 86, experienceYears: "1.5+ yrs", description: "Authentication, Firestore, real-time database, storage" },
        { name: "Postman", level: 94, experienceYears: "2+ yrs", description: "API testing, collections, environment variables, documentation" },
        { name: "Docker (Basic)", level: 80, experienceYears: "1+ yrs", description: "Containerized development, Dockerfiles, compose setups" }
      ]
    }
  ],

  experience: [
    {
      id: "hawkeyes-digital",
      role: "Frontend Developer / Junior Frontend Developer",
      company: "HawkEyes Digital Monitoring Ltd.",
      companyUrl: "https://hawkeyesdigital.com",
      period: "May 2024 – April 2026",
      location: "Uttara, Dhaka, Bangladesh (Full-time · On-site)",
      badge: "Enterprise Production",
      summary: "Designed and delivered responsive enterprise dashboards, operational workflow systems, inventory management, product tracking, and reporting platforms across multi-client environments.",
      highlights: [
        "Designed and built responsive enterprise dashboards and operational workflow management systems for real-time business monitoring across multiple client environments.",
        "Developed scalable frontend interfaces for inventory management, product tracking, and reporting platforms, reducing manual workflow overhead for operations teams.",
        "Integrated RESTful APIs and real-time data flows with JWT authentication and role-based access control (RBAC).",
        "Maintained complex application state using Redux Toolkit and RTK Query, improving data fetching efficiency and eliminating redundant API calls.",
        "Partnered with backend engineers to define API contracts, frontend data models, validation rules, and Vercel delivery workflows.",
        "Improved UI performance, accessibility (a11y), and cross-device responsiveness with consistent behavior across desktop, tablet, and mobile viewports."
      ],
      technologies: ["React.js", "Next.js", "TypeScript", "Redux Toolkit", "RTK Query", "Tailwind CSS", "REST API", "JWT", "Vercel"],
      architectureWins: [
        "Reduced repetitive UI code by 40% through centralized design tokens and reusable dashboard widget components.",
        "Optimized network bandwidth by implementing RTK Query automated cache invalidation and background polling."
      ]
    }
  ],

  publications: [
    {
      id: "pub-1",
      title: "Building Scalable State Architectures with Redux Toolkit and RTK Query",
      type: "Technical Guide",
      date: "2025",
      readTime: "8 min read",
      abstract: "A comprehensive technical guide to structuring enterprise React applications with normalized store slices, automated cache tag invalidation, and optimistic updates to eliminate redundant network roundtrips.",
      tags: ["React.js", "Redux Toolkit", "RTK Query", "State Management"],
      linkText: "Read Architecture Guide"
    },
    {
      id: "pub-2",
      title: "Core Web Vitals Mastery in Next.js App Router",
      type: "Architecture Breakdown",
      date: "2025",
      readTime: "6 min read",
      abstract: "Practical strategies for optimizing LCP, CLS, and INP metrics in production Next.js applications through intelligent asset loading, font streaming, and modular chunk splitting.",
      tags: ["Next.js", "Core Web Vitals", "Performance", "SSR"],
      linkText: "View Performance Guide"
    },
    {
      id: "pub-3",
      title: "Designing Secure Role-Based Access Control (RBAC) in Modern MERN Applications",
      type: "Case Study",
      date: "2024",
      readTime: "10 min read",
      abstract: "Implementing robust multi-tenant authentication and authorization flows with JWT, refresh token rotation, and declarative permission guards in React and Express.js.",
      tags: ["Security", "JWT", "RBAC", "MERN Stack", "Express.js"],
      linkText: "Read Case Study"
    }
  ],

  testimonials: [
    {
      id: "test-1",
      quote: "MD Razikul Islam Joni is an exceptionally dedicated frontend developer who quickly translates complex business operations into intuitive, polished dashboard interfaces. His expertise in Redux Toolkit and REST API integrations significantly accelerated our product timelines.",
      author: "Engineering Lead",
      title: "Team Lead & Technical Architect",
      company: "HawkEyes Digital Monitoring Ltd.",
      avatar: "https://picsum.photos/seed/hawkeyes_lead/200/200",
      relationship: "Supervised Razikul on Enterprise Dashboard projects"
    },
    {
      id: "test-2",
      quote: "Razikul has a sharp eye for detail, clean code architecture, and UI performance. His ability to build responsive, accessible interfaces and seamlessly collaborate with backend teams made him a vital contributor to our engineering workflows.",
      author: "Project Manager",
      title: "Operations & Product Manager",
      company: "Digital Monitoring Operations",
      avatar: "https://picsum.photos/seed/project_manager/200/200",
      relationship: "Collaborated on workflow & reporting systems"
    },
    {
      id: "test-3",
      quote: "An outstanding developer with a strong passion for continuous learning. Razikul's mastery of React, Next.js, and modern state management is evident in every feature and open-source project he ships.",
      author: "Tanvir Ahmed",
      title: "Lead Instructor & Mentor",
      company: "Programming Hero",
      avatar: "https://picsum.photos/seed/tanvir_mentor/200/200",
      relationship: "Mentored in Advanced Web Development"
    }
  ]
};
