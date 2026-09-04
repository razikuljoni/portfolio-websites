export interface PersonalInfo {
  name: string;
  fullName: string;
  shortName: string;
  title: string;
  role: string;
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  officeLocation: string;
  github: string;
  githubUsername: string;
  linkedin: string;
  linkedinUsername: string;
  portfolioUrl: string;
  links: {
    github: string;
    linkedin: string;
    livePortfolio: string;
  };
  skillGroups: {
    languages: string[];
    frontend: string[];
    backend: string[];
    databasesAndDevops: string[];
    toolsAndAI: string[];
  };
  stats: {
    yearsOfExp: string;
    publicRepos: string;
    editorThemesShipped: string;
    iconsCreated: string;
    status: string;
  };
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  badge?: string;
  summary?: string;
  highlights: string[];
  architecturesLed?: string[];
  technologies?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  notes?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  status: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  repoName: string;
  title: string;
  description: string;
  category: 'fullstack' | 'frontend' | 'backend' | 'mobile' | 'tooling';
  isFeatured: boolean;
  isRecent: boolean;
  stars: number;
  url?: string;
  githubUrl: string;
  technologies: string[];
  features: string[];
  updatedAt: string;
}

export const PERSONAL_INFO: PersonalInfo = {
  name: 'MD Razikul Islam Joni',
  fullName: 'MD Razikul Islam Joni',
  shortName: 'Razikul Joni',
  title: 'Full Stack (MERN / Next.js) Developer',
  role: 'Full Stack (MERN / Next.js) Developer',
  tagline: 'Product-minded Full Stack Developer with 2+ years of professional experience translating complex operations into fast, accessible web products. Strongest in React and Next.js interface systems, API integration, state architecture, and data-heavy dashboards; expanding backend depth with Node.js, Express, and NestJS.',
  summary: 'Product-minded Full Stack Developer with 2+ years of hands-on experience building fast, accessible web applications and real-time dashboard systems using React, Next.js, and Node.js. Experienced in designing modular frontend architecture, managing complex server/client state with Redux Toolkit and TanStack Query, and building RESTful APIs with MongoDB/Mongoose. Active open-source contributor with 120+ public repositories, 11 published developer editor themes, and 390+ handcrafted icons.',
  email: 'razikuljoni@gmail.com',
  phone: '+880 1623-208660',
  location: 'Mirpur, Dhaka, Bangladesh',
  officeLocation: 'Uttara, Dhaka (HawkEyes)',
  github: 'https://github.com/razikuljoni',
  githubUsername: 'razikuljoni',
  linkedin: 'https://linkedin.com/in/razikuljoni',
  linkedinUsername: 'razikuljoni',
  portfolioUrl: 'https://razikuljoni-portfolio.vercel.app',
  links: {
    github: 'https://github.com/razikuljoni',
    linkedin: 'https://linkedin.com/in/razikuljoni',
    livePortfolio: 'https://razikuljoni-portfolio.vercel.app'
  },
  skillGroups: {
    languages: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3/Sass', 'Kotlin'],
    frontend: ['React 19', 'Next.js (App Router)', 'Redux Toolkit', 'TanStack Query', 'Tailwind CSS', 'Material UI', 'Ant Design', 'Three.js', 'ECharts', 'Vite'],
    backend: ['Node.js', 'Express 5', 'NestJS', 'RESTful APIs', 'JWT Auth & RBAC', 'WebSockets', 'Zod', 'Prisma'],
    databasesAndDevops: ['MongoDB', 'Mongoose', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Git & GitHub', 'Vercel', 'Postman'],
    toolsAndAI: ['In-App AI Copilot (Gemini API)', 'VS Code Themes & Extension Tooling (OpenPalette)', 'Module Federation']
  },
  stats: {
    yearsOfExp: '2+',
    publicRepos: '120+',
    editorThemesShipped: '11',
    iconsCreated: '390+',
    status: 'Open to Product-Focused Frontend & Full-Stack Roles'
  }
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: 'May 2024 — April 2026',
    role: 'Frontend Developer (Junior Frontend Developer)',
    company: 'HawkEyes Digital Monitoring Ltd.',
    location: 'Uttara, Dhaka, Bangladesh (On-site)',
    badge: 'Full-Time Professional Role',
    summary: 'Designed and delivered responsive enterprise dashboards, operational workflow systems, inventory management, product tracking, reporting, and field-work assignment interfaces.',
    highlights: [
      'Designed and delivered responsive enterprise dashboards, operational workflow systems, inventory management, product tracking, reporting, and field-work assignment interfaces.',
      'Integrated REST APIs and real-time data flows with JWT authentication, role-based access control (RBAC), Redux Toolkit, and RTK Query across data-intensive applications.',
      'Built reusable UI and state patterns that reduced duplicate implementation and made complex loading, error, empty, and permission states predictable.',
      'Partnered closely with backend engineers on API contracts, frontend data models, validation rules, edge cases, Git workflows, and Vercel delivery.',
      'Improved performance, accessibility (a11y), maintainability, and responsive behavior across desktop, tablet, and mobile experiences.'
    ],
    architecturesLed: [
      'Enterprise Operational Workflow Management System',
      'RTK Query Normalized Caching & Polling Pipeline',
      'Standardized Loading / Error / Empty State UI Architecture',
      'Field-Work Assignment & Real-Time Product Tracking Interfaces'
    ]
  },
  {
    id: 'exp-2',
    period: '2023 — Present',
    role: 'Full Stack & Open Source Software Engineer',
    company: 'Independent Engineering & Open Source Monorepos',
    location: 'Dhaka, Bangladesh / Global Open Source',
    badge: 'Selected Projects & Tooling',
    summary: 'Building full-stack web applications, performance-first platforms, modular data visualization dashboards, and developer tooling packages.',
    highlights: [
      'Built z-shop: full-stack e-commerce platform featuring smart AI recommendations, 2FA security, live inventory, and multi-currency support.',
      'Engineered SensorGrid: production-grade IoT platform with realtime sensor telemetry, historical analytics, and automated workflows.',
      'Architected Aether: micro-frontend monorepo using React 19, Vite Module Federation, and Three.js 3D canvas.',
      'Published OpenPalette: 11 VS Code dark themes, 390+ custom file/folder icons, and automated GitHub Actions CI/CD workflows.'
    ],
    architecturesLed: [
      'z-shop Big-Scale E-Commerce Platform & AI Recommendation Engine',
      'SensorGrid Production-Grade IoT Realtime Telemetry Architecture',
      'Aether Micro-Frontend Module Federation & 3D Graphics Canvas',
      'OpenPalette VS Code Theme & Extension Ecosystem'
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'BSc in Computer Science & Engineering (CSE Coursework)',
    institution: 'Green University of Bangladesh',
    period: '2020 — 2023',
    location: 'Dhaka, Bangladesh',
    notes: 'Undergraduate coursework focusing on Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, and Software Engineering principles.'
  },
  {
    id: 'edu-2',
    degree: 'Higher Secondary Certificate (HSC) — Science',
    institution: 'Vashantek Government College',
    period: '2018 — 2019',
    location: 'Dhaka, Bangladesh',
    notes: 'Science background with coursework in Mathematics, Physics, Chemistry, and Information Technology.'
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Complete Web Development',
    issuer: 'Programming Hero',
    status: 'Certificate of Completion'
  },
  {
    id: 'cert-2',
    title: 'Next Level Web Development',
    issuer: 'Programming Hero',
    status: 'Certificate of Completion'
  }
];

export const LANGUAGES: LanguageItem[] = [
  { language: 'Bangla', proficiency: 'Native' },
  { language: 'English', proficiency: 'Professional Working Proficiency' }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'z-shop',
    repoName: 'z-shop',
    title: 'Z-Shop — Big-Scale E-Commerce Platform',
    description: 'Full-stack Big-scale e-commerce platform with smart recommendations, real-time inventory, live order tracking, multi-currency localization, 2FA security, customer analytics, and seller management.',
    category: 'fullstack',
    isFeatured: true,
    isRecent: true,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/z-shop',
    technologies: ['TypeScript', 'Next.js 16', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Redis', 'Socket.io', 'Tailwind CSS'],
    features: [
      'Smart AI product recommendation engine',
      'Real-time inventory stock synchronization',
      'Live order tracking & notification webhooks',
      'Multi-currency localization & tax calculator',
      '2FA security authentication & seller admin panel'
    ],
    updatedAt: '2026-09-04'
  },
  {
    id: 'proj-2',
    name: 'SensorGrid',
    repoName: 'SensorGrid',
    title: 'SensorGrid — Production-Grade IoT Telemetry Platform',
    description: 'Production-grade IoT platform for connecting physical devices, receiving realtime sensor telemetry, historical data visualization, remote device control, automation workflows, and alert monitoring.',
    category: 'fullstack',
    isFeatured: true,
    isRecent: true,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/SensorGrid',
    technologies: ['TypeScript', 'React', 'Node.js', 'WebSockets', 'MQTT', 'Timeseries DB', 'ECharts', 'Tailwind CSS'],
    features: [
      'Realtime sensor telemetry data streaming',
      'Interactive historical data charts & timeline',
      'Remote IoT device control & command dispatch',
      'Custom automation rules & alert webhooks',
      'Calm data-first environment monitoring dashboard'
    ],
    updatedAt: '2026-08-27'
  },
  {
    id: 'proj-3',
    name: 'aether',
    repoName: 'aether',
    title: 'Aether — Micro-Frontend Monorepo & 3D Interactive Web',
    description: 'Micro-frontend monorepo built with React 19, TypeScript, Vite Module Federation, Three.js, and Tailwind CSS for modular graphics-heavy web applications.',
    category: 'frontend',
    isFeatured: true,
    isRecent: true,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/aether',
    technologies: ['TypeScript', 'React 19', 'Vite', 'Module Federation', 'Three.js', 'Tailwind CSS', 'Turborepo'],
    features: [
      'Micro-frontend architecture using Vite Module Federation',
      'Interactive 3D graphics canvas powered by Three.js',
      'Cross-application dynamic component sharing',
      'Sub-second module loading & asset optimization',
      'Monorepo workflow with shared design tokens'
    ],
    updatedAt: '2026-08-27'
  },
  {
    id: 'proj-4',
    name: 'aura',
    repoName: 'aura',
    title: 'Aura — Luxury Hotel & Resort Booking Platform',
    description: 'High-converting luxury hotel and resort booking platform with real-time availability, dynamic pricing, curated travel experiences, itinerary management, and an AI luxury concierge.',
    category: 'fullstack',
    isFeatured: true,
    isRecent: true,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/aura',
    technologies: ['TypeScript', 'Next.js 15', 'Tailwind CSS', 'Framer Motion', 'Gemini AI API', 'Node.js'],
    features: [
      'Real-time room availability & reservation engine',
      'Dynamic pricing based on seasonal demand',
      'Curated travel experiences & custom itinerary planner',
      'In-app AI luxury travel concierge assistant',
      'Fluid page transitions & luxury UI aesthetic'
    ],
    updatedAt: '2026-08-23'
  },
  {
    id: 'proj-5',
    name: 'kronen',
    repoName: 'kronen',
    title: 'Kronen — Swiss Architectural Real Estate Platform',
    description: 'Swiss-inspired luxury real estate platform featuring curated modern architectural residences, interactive property portfolios, mortgage calculators, and neighborhood guides.',
    category: 'frontend',
    isFeatured: true,
    isRecent: true,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/kronen',
    technologies: ['TypeScript', 'Next.js 15', 'Tailwind CSS', 'Framer Motion', 'React Canvas'],
    features: [
      'Curated architectural residence showcases',
      'Interactive real-time mortgage rate calculator',
      'Neighborhood visual exploration maps',
      'High-resolution property image galleries',
      'Swiss minimalist typography & design system'
    ],
    updatedAt: '2026-08-23'
  },
  {
    id: 'proj-6',
    name: 'IgnoreGen',
    repoName: 'IgnoreGen',
    title: 'IgnoreGen — AI-Powered .gitignore Generator',
    description: 'Fast, customizable, and AI-powered .gitignore generator supporting 120+ stacks, frameworks, operating systems, and IDEs.',
    category: 'tooling',
    isFeatured: true,
    isRecent: true,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/IgnoreGen',
    technologies: ['TypeScript', 'Node.js', 'React', 'Tailwind CSS', 'AI Prompt Engine'],
    features: [
      'Support for 120+ programming stacks, frameworks & IDEs',
      'AI contextual stack recognition & generator',
      'One-click instant copy & file export',
      'Zero-dependency fast parsing CLI & web UI'
    ],
    updatedAt: '2026-08-24'
  },
  {
    id: 'proj-7',
    name: 'CSSnap',
    repoName: 'CSSnap',
    title: 'CSSnap — Production CSS Effects & Animation Catalog',
    description: 'Curated collection of 56+ production-ready CSS effects with live previews, filter tags, and one-click copy for UI designers and developers.',
    category: 'frontend',
    isFeatured: true,
    isRecent: true,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/CSSnap',
    technologies: ['TypeScript', 'React', 'Tailwind CSS', 'CSS Animation Specs'],
    features: [
      '56+ production-grade glassmorphism, glowing & hover effects',
      'Live interactive preview sandbox with dark/light toggle',
      'Instant copy for raw CSS and Tailwind classes',
      'Category filtering by component type'
    ],
    updatedAt: '2026-08-20'
  },
  {
    id: 'proj-8',
    name: 'x-shop',
    repoName: 'x-shop',
    title: 'X-Shop — Monochromatic E-Commerce Platform',
    description: 'Full-stack monochromatic e-commerce platform with real-time inventory, secure checkout, 2FA, seller admin dashboard, personalized AI recommendations, offline sync, and order tracking.',
    category: 'fullstack',
    isFeatured: true,
    isRecent: true,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/x-shop',
    technologies: ['TypeScript', 'Next.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT 2FA'],
    features: [
      'Monochromatic luxury UI aesthetic',
      'Real-time inventory updates & order status',
      'Seller admin dashboard & product analytics',
      'Offline cart & checkout state synchronization',
      'Personalized AI product recommendations'
    ],
    updatedAt: '2026-08-19'
  },
  {
    id: 'proj-9',
    name: 'legal-counsel',
    repoName: 'legal-counsel',
    title: 'Legal Counsel — High-Stakes Litigation & Practice Portal',
    description: 'Corporate and trial legal counsel platform specializing in mergers and acquisitions, high-stakes commercial litigation, IP, and regulatory compliance.',
    category: 'frontend',
    isFeatured: true,
    isRecent: true,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/legal-counsel',
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Practice area interactive directory & case studies',
      'Secure client consultation scheduling portal',
      'Regulatory compliance document guides',
      'High-contrast authoritative legal UI styling'
    ],
    updatedAt: '2026-08-23'
  },
  {
    id: 'proj-10',
    name: 'aurora-vault',
    repoName: 'aurora-vault',
    title: 'Aurora Vault — AI-Powered Note & Knowledge Workspace',
    description: 'Encrypted note taking and knowledge vault featuring AI smart linking, vector graph exploration, and distraction-free markdown editing.',
    category: 'fullstack',
    isFeatured: false,
    isRecent: true,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/aurora-vault',
    technologies: ['TypeScript', 'React', 'Node.js', 'Tailwind CSS', 'Markdown AST'],
    features: [
      'Distraction-free markdown editor with live preview',
      'AI concept extraction & backlink discovery',
      'Encrypted local & cloud note vault',
      'Tag organization & instant full-text search'
    ],
    updatedAt: '2026-08-28'
  },
  {
    id: 'proj-11',
    name: 'repo-lens',
    repoName: 'repo-lens',
    title: 'RepoLens — Codebase Analysis & Metric Engine',
    description: 'Automated project analysis tool for analyzing repo structure, dependency graphs, LOC metrics, and architectural health.',
    category: 'tooling',
    isFeatured: false,
    isRecent: true,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/repo-lens',
    technologies: ['TypeScript', 'Node.js', 'Git CLI', 'AST Parser'],
    features: [
      'Codebase LOC breakdown & language distribution',
      'Component dependency graph generator',
      'Code duplicate & complexity scanner'
    ],
    updatedAt: '2026-08-28'
  },
  {
    id: 'proj-12',
    name: 'nexora-pulse',
    repoName: 'nexora-pulse',
    title: 'NexoraPulse — Real-Time Automation & Event Dispatcher',
    description: 'Real-time automation engine handling pub/sub webhooks, event orchestration, and scheduled workflow execution.',
    category: 'backend',
    isFeatured: false,
    isRecent: true,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/nexora-pulse',
    technologies: ['TypeScript', 'Node.js', 'Express', 'Redis', 'Webhooks'],
    features: [
      'Async event processing job queue',
      'Webhook payload verification & retry queue',
      'System telemetry & rate-limiting middleware'
    ],
    updatedAt: '2026-08-28'
  },
  {
    id: 'proj-13',
    name: 'MohaRail',
    repoName: 'MohaRail',
    title: 'MohaRail — Android Transit & Ticket Reservation App',
    description: 'Mobile railway navigation and ticketing application providing real-time train tracking, schedule lookup, and seat reservations.',
    category: 'mobile',
    isFeatured: false,
    isRecent: true,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/MohaRail',
    technologies: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'REST API'],
    features: [
      'Live train location & status updates',
      'Interactive seat map selection',
      'Offline station timetable lookup'
    ],
    updatedAt: '2026-09-01'
  },
  {
    id: 'proj-14',
    name: 'nest-crud',
    repoName: 'nest-crud',
    title: 'NestJS Enterprise Microservice & CRUD Engine',
    description: 'Modular NestJS backend application with MongoDB Mongoose integration, Swagger REST docs, and JWT authentication.',
    category: 'backend',
    isFeatured: false,
    isRecent: false,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/nest-crud',
    technologies: ['TypeScript', 'NestJS', 'MongoDB', 'Mongoose', 'Swagger', 'JWT'],
    features: [
      'Modular NestJS architecture with dependency injection',
      'Class-validator DTO sanitization',
      'Swagger OpenAPI interactive documentation'
    ],
    updatedAt: '2026-05-04'
  },
  {
    id: 'proj-15',
    name: 'Cow-Hut-Backend',
    repoName: 'Cow-Hut-Backend',
    title: 'Cow Hut — Livestock E-Commerce REST API',
    description: 'Node.js & Express REST API for cattle marketplace featuring Zod validation, JWT authentication, and buyer/seller transaction flows.',
    category: 'backend',
    isFeatured: false,
    isRecent: false,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/Cow-Hut-Backend',
    technologies: ['TypeScript', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Zod'],
    features: [
      'Service-controller-route modular structure',
      'Strict Zod schema validation middleware',
      'Role-based access control for sellers and buyers'
    ],
    updatedAt: '2023-12-08'
  },
  {
    id: 'proj-16',
    name: 'OpenPalette',
    repoName: 'OpenPalette',
    title: 'OpenPalette — VS Code Developer Theme & Icon Suite',
    description: 'Ecosystem of 11 dark VS Code themes and 390+ custom SVG file icons built for developer aesthetic and focus.',
    category: 'tooling',
    isFeatured: false,
    isRecent: false,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/OpenPalette',
    technologies: ['TypeScript', 'VS Code Extension API', 'SVG', 'GitHub Actions'],
    features: [
      '11 contrast-tuned dark editor color schemes',
      '390+ custom SVG file and directory icons',
      'Automated VSIX packaging & GitHub release workflow'
    ],
    updatedAt: '2026-01-02'
  },
  {
    id: 'proj-17',
    name: 'Book-Finder-Client',
    repoName: 'Book-Finder-Client',
    title: 'BookFinder — MERN Stack Book Discovery & Reviews',
    description: 'Full-stack MERN application for exploring books, maintaining personal reading wishlists, submitting reviews, and managing collections.',
    category: 'fullstack',
    isFeatured: false,
    isRecent: false,
    stars: 0,
    githubUrl: 'https://github.com/razikuljoni/Book-Finder-Client',
    technologies: ['TypeScript', 'React', 'Redux Toolkit', 'RTK Query', 'Node.js', 'Express', 'MongoDB'],
    features: [
      'Redux Toolkit & RTK Query caching & optimistic updates',
      'User reading list & wishlist management',
      'Book submission & community review ratings'
    ],
    updatedAt: '2023-09-16'
  }
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.isFeatured);
export const RECENT_PROJECTS = PROJECTS.filter((p) => p.isRecent);
export const FULLSTACK_PROJECTS = PROJECTS.filter((p) => p.category === 'fullstack');
export const FRONTEND_PROJECTS = PROJECTS.filter((p) => p.category === 'frontend');
export const BACKEND_PROJECTS = PROJECTS.filter((p) => p.category === 'backend');
export const MOBILE_PROJECTS = PROJECTS.filter((p) => p.category === 'mobile');
export const TOOLING_PROJECTS = PROJECTS.filter((p) => p.category === 'tooling');
