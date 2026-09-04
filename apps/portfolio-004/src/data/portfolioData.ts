import { TechSkill, CaseStudy, ArchitectureTenet, ExperienceItem, EducationItem, CertificationItem } from '../types';

export const PERSONAL_INFO = {
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
    languages: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3/Sass'],
    frontend: ['React 19', 'Next.js (App Router)', 'Redux Toolkit', 'TanStack Query', 'Tailwind CSS', 'Material UI', 'Ant Design', 'ECharts'],
    backend: ['Node.js', 'Express 5', 'NestJS', 'RESTful APIs', 'JWT Auth & RBAC', 'WebSockets', 'Zod'],
    databasesAndDevops: ['MongoDB', 'Mongoose', 'PostgreSQL', 'MySQL', 'Firebase', 'Docker', 'Git & GitHub', 'Vercel', 'Postman'],
    toolsAndAI: ['In-App AI Copilot (Gemini API)', 'VS Code Themes & Extension Tooling (OpenPalette)']
  },
  stats: {
    yearsOfExp: '2+',
    publicRepos: '123',
    editorThemesShipped: '11',
    iconsCreated: '390+',
    status: 'Open to Product-Focused Frontend & Full-Stack Roles'
  }
};

export const TECH_SKILLS: TechSkill[] = [
  // Languages & Core
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'languages',
    level: 'Expert',
    yearsOfExp: 2,
    iconName: 'Code2',
    description: 'Strict end-to-end type safety, generic utility types, discriminated unions for state management, and schema-driven API contracts.',
    productionHighlights: [
      'Engineered shared type contracts between Express/NestJS APIs and React frontend modules',
      'Implemented strict domain validation models with Zod and TypeScript type inference',
      'Maintained type safety across 120+ public and private repositories and npm tooling packages'
    ],
    architecturalPatterns: ['Discriminated Unions for UI State', 'Inferred Zod Types', 'Generic API Response Envelopes'],
    codeSample: {
      title: 'Strict API Response & State Discriminated Union',
      language: 'typescript',
      code: `export type ApiResponse<TData> =
  | { status: 'success'; data: TData; timestamp: number }
  | { status: 'error'; message: string; errorCode: number };

export type QueryState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

export const unwrapResponse = <T>(res: ApiResponse<T>): T => {
  if (res.status === 'error') {
    throw new Error(\`[\${res.errorCode}]: \${res.message}\`);
  }
  return res.data;
};`
    }
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'languages',
    level: 'Expert',
    yearsOfExp: 3,
    iconName: 'Code2',
    description: 'Modern asynchronous JavaScript, closures, event loop mechanics, DOM manipulation, functional data transformations, and Web APIs.',
    productionHighlights: [
      'Authored performant event listeners, debounced search streams, and memory-safe observer hooks',
      'Optimized runtime bundles using modern tree-shaking, code-splitting, and dynamic imports',
      'Created reusable utility libraries for mathematical aggregations in dashboard workflows'
    ],
    architecturalPatterns: ['Async/Await Pipelines', 'Debounce & Throttle Streams', 'Functional Array Pipelines']
  },

  // Frontend & UI
  {
    id: 'react',
    name: 'React.js (React 18/19)',
    category: 'frontend',
    level: 'Expert',
    yearsOfExp: 2,
    iconName: 'Layout',
    description: 'Component architecture, custom hooks, synthetic event handling, render lifecycle optimization, and accessible UI system design.',
    productionHighlights: [
      'Engineered complex enterprise dashboards with dynamic routing and interactive multi-chart layouts at HawkEyes',
      'Built predictable loading, error, empty, and permission states eliminating UI duplication across 10+ operational modules',
      'Leveraged React 19 hooks and compiler optimizations for high-performance interactive interfaces'
    ],
    architecturalPatterns: ['Compound Components', 'Custom Hook Extraction', 'Error Boundaries & Suspense'],
    codeSample: {
      title: 'Custom Resilient Data Hook with Auto-Retry',
      language: 'typescript',
      code: `import { useState, useEffect, useCallback } from 'react';

export function useOperationalFeed<T>(fetcher: () => Promise<T>, pollMs = 5000) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    try {
      const res = await fetcher();
      setData(res);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Feed error'));
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    execute();
    const interval = setInterval(execute, pollMs);
    return () => clearInterval(interval);
  }, [execute, pollMs]);

  return { data, loading, error, refresh: execute };
}`
    }
  },
  {
    id: 'nextjs',
    name: 'Next.js (App Router / SSR / SSG)',
    category: 'frontend',
    level: 'Expert',
    yearsOfExp: 2,
    iconName: 'Globe',
    description: 'Next.js App Router, Server Components (RSC), SEO-first rendering, streaming UI, image optimization, and Vercel edge deployment.',
    productionHighlights: [
      'Architected Forge gym platform achieving 98+ Google Lighthouse performance and strong Core Web Vitals',
      'Implemented SEO-friendly metadata generation and static page pre-rendering with incremental revalidation',
      'Configured server-side caching and dynamic client-side hydration for fast first contentful paint (FCP)'
    ],
    architecturalPatterns: ['React Server Components (RSC)', 'Edge Route Handlers', 'Streaming with Suspense'],
    codeSample: {
      title: 'Dynamic Next.js Route with Server Component Metadata',
      language: 'typescript',
      code: `// app/programs/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const program = await getTrainingProgram(params.id);
  if (!program) return { title: 'Program Not Found' };
  
  return {
    title: \`\${program.name} | Forge Performance\`,
    description: program.summary,
    openGraph: { images: [program.ogImage] },
  };
}

export default async function ProgramPage({ params }: { params: { id: string } }) {
  const program = await getTrainingProgram(params.id);
  if (!program) notFound();
  return <ProgramDetailView program={program} />;
}`
    }
  },
  {
    id: 'redux_rtk',
    name: 'Redux Toolkit & RTK Query',
    category: 'frontend',
    level: 'Expert',
    yearsOfExp: 2,
    iconName: 'Workflow',
    description: 'Predictable state management, normalized caching, optimistic updates, automatic cache invalidation, and RTK Query middleware.',
    productionHighlights: [
      'Architected enterprise state for real-time HawkEyes digital monitoring platform, eliminating redundant network calls by 45%',
      'Configured automated tag invalidation and polling endpoints for real-time field-work assignment tracking',
      'Maintained modular slice architecture with typed selectors and middleware listeners'
    ],
    architecturalPatterns: ['Normalized Entity Adapter', 'Optimistic UI Updates', 'Tag-Based Cache Invalidation']
  },
  {
    id: 'tanstack_query',
    name: 'TanStack Query & Zustand',
    category: 'frontend',
    level: 'Advanced',
    yearsOfExp: 2,
    iconName: 'Zap',
    description: 'Server state management, background refetching, client store micro-state with Zustand, and query hydration.',
    productionHighlights: [
      'Implemented full buyer/seller/admin state in Shoppershala full-stack commerce monorepo',
      'Built lightweight client-side shopping cart and checkout wallet store using Zustand with persistent storage',
      'Configured stale-while-revalidate data flow with smooth pagination and infinite scrolling'
    ],
    architecturalPatterns: ['Stale-While-Revalidate', 'Zustand Persistent Store', 'Mutation Side Effects']
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS & SCSS',
    category: 'frontend',
    level: 'Expert',
    yearsOfExp: 3,
    iconName: 'Palette',
    description: 'Utility-first CSS architecture, responsive design across mobile/tablet/desktop, dark theme design tokens, and clean layout geometry.',
    productionHighlights: [
      'Crafted cohesive dark mode themes with refined neutral scales and WCAG AA contrast compliance',
      'Built responsive layout grids for multi-viewport enterprise dashboards supporting mobile field operators',
      'Created custom utility plugins for custom scrollbars, animations, and typography pairings'
    ],
    architecturalPatterns: ['Design Token Architecture', 'Fluid Responsive Typography', 'Theme CSS Variable Mappings']
  },
  {
    id: 'component_libs',
    name: 'Ant Design, MUI & UI Systems',
    category: 'frontend',
    level: 'Advanced',
    yearsOfExp: 2,
    iconName: 'Layout',
    description: 'Enterprise design system integration, Material UI, Ant Design customization, accessible form controls, and theme overrides.',
    productionHighlights: [
      'Integrated Ant Design and Material UI components for dense operational forms, inventory tables, and filtering dialogs',
      'Customized enterprise table components with column filtering, multi-sort, export, and virtualized scrolling',
      'Standardized form validation rules with accessible error states and keyboard navigation'
    ],
    architecturalPatterns: ['Theme Token Overrides', 'Controlled Form Hierarchies', 'Accessible ARIA Attributes']
  },
  {
    id: 'echarts_maps',
    name: 'ECharts & Google Maps API',
    category: 'frontend',
    level: 'Advanced',
    yearsOfExp: 2,
    iconName: 'BarChart3',
    description: 'Data-heavy visualizations, multi-series time-series charts, geospatial telemetry mapping, and interactive widget dashboards.',
    productionHighlights: [
      'Engineered Dashboard Wizard data workspace with multi-layout charts and geographic device tracker views',
      'Implemented real-time sensor and product tracking overlays on interactive Google Maps viewports',
      'Rendered responsive bar, line, radar, and gauge visualizations using Apache ECharts with dynamic resize listeners'
    ],
    architecturalPatterns: ['Responsive Chart Viewport Observers', 'Geospatial Marker Clustering', 'Live Stream Series Appending']
  },

  // Backend & APIs
  {
    id: 'nodejs',
    name: 'Node.js & Express.js',
    category: 'backend',
    level: 'Advanced',
    yearsOfExp: 2,
    iconName: 'Server',
    description: 'Event-driven server runtimes, RESTful API architecture, Express 5 middleware pipelines, error handling, and file streaming.',
    productionHighlights: [
      'Built full-stack backend services for Shoppershala commerce monorepo with Express 5 and MongoDB',
      'Developed modular route handlers, centralized error-handling middlewares, and async request wrappers',
      'Implemented rate-limiting, CORS policies, helmet security headers, and compression'
    ],
    architecturalPatterns: ['Controller-Service-Repository Pattern', 'Centralized Error Middleware', 'Async Handler Wrapping'],
    codeSample: {
      title: 'Clean Express Controller with Zod Validation',
      language: 'typescript',
      code: `import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const CreateProductSchema = z.object({
  title: z.string().min(3).max(100),
  price: z.number().positive(),
  category: z.string(),
  inventoryCount: z.number().int().nonnegative(),
});

export const createProductHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = CreateProductSchema.parse(req.body);
    const product = await productService.create(validatedData, req.user.id);
    return res.status(201).json({ status: 'success', data: product });
  } catch (error) {
    next(error);
  }
};`
    }
  },
  {
    id: 'nestjs',
    name: 'NestJS (Modular Architecture)',
    category: 'backend',
    level: 'Proficient',
    yearsOfExp: 1,
    iconName: 'Boxes',
    description: 'TypeScript-first enterprise backend framework, dependency injection, modular architecture, DTO validation, and decorators.',
    productionHighlights: [
      'Structured clean architecture modules with Controllers, Services, Entities, and DTOs',
      'Applied custom NestJS Guards for JWT token verification and Role-Based Access Control (RBAC)',
      'Configured global validation pipes with Class-Validator and Swagger OpenAPI documentation'
    ],
    architecturalPatterns: ['Dependency Injection (IoC)', 'Guard-Based RBAC', 'Interceptors for Response Formatting']
  },
  {
    id: 'jwt_rbac',
    name: 'JWT Auth, RBAC & Security',
    category: 'backend',
    level: 'Advanced',
    yearsOfExp: 2,
    iconName: 'ShieldCheck',
    description: 'Stateless JSON Web Tokens (JWT), refresh token rotation, Role-Based Access Control (RBAC), password hashing with bcrypt, and Zod.',
    productionHighlights: [
      'Implemented 3-tier Role-Based Access Control (Buyer, Seller, Admin) with granular permission checks in Shoppershala',
      'Secured enterprise operational workflows with JWT authentication and silent token refresh flows at HawkEyes',
      'Protected endpoints with Zod schema validation, sanitization, and parameterized database queries'
    ],
    architecturalPatterns: ['Access/Refresh Token Pair Rotation', 'Role & Permission Bitmasks', 'Middleware Auth Guards']
  },
  {
    id: 'websockets_rest',
    name: 'REST APIs & WebSockets',
    category: 'backend',
    level: 'Advanced',
    yearsOfExp: 2,
    iconName: 'Radio',
    description: 'RESTful API contract design, HTTP status standards, real-time bi-directional WebSockets, and event broadcasting.',
    productionHighlights: [
      'Designed consistent REST API contracts and collaborated with backend teams on data models and edge cases',
      'Built live notification feeds and real-time field assignment status updates via WebSockets',
      'Documented and tested endpoints using Postman collections with automated integration tests'
    ],
    architecturalPatterns: ['Idempotent REST Methods', 'WebSocket Room Subscriptions', 'Heartbeat Connection Reconnection']
  },

  // Databases & Cloud
  {
    id: 'mongodb',
    name: 'MongoDB & Mongoose',
    category: 'cloud',
    level: 'Advanced',
    yearsOfExp: 2,
    iconName: 'Database',
    description: 'Document database modeling, Mongoose schemas, compound indexing, aggregation pipelines, and transactions.',
    productionHighlights: [
      'Designed multi-entity commerce database models for users, products, orders, reviews, and analytics in Shoppershala',
      'Created multi-stage MongoDB aggregation pipelines for seller revenue summaries and inventory metrics',
      'Optimized query performance by creating compound indexes on status, category, and creation timestamps'
    ],
    architecturalPatterns: ['Aggregation Framework Pipelines', 'Compound Indexing Strategy', 'Embedded Subdocuments vs References']
  },
  {
    id: 'postgresql_sql',
    name: 'PostgreSQL & MySQL',
    category: 'cloud',
    level: 'Proficient',
    yearsOfExp: 2,
    iconName: 'Database',
    description: 'Relational data modeling, foreign key constraints, SQL queries, joins, transactions, and basic indexing.',
    productionHighlights: [
      'Modeled relational schemas for inventory tracking, user accounts, and audit logging tables',
      'Wrote optimized SQL queries with joins, indexing, and transactional ACID guarantees',
      'Connected relational databases with Supabase and Node.js ORMs for rapid backend prototyping'
    ],
    architecturalPatterns: ['Relational Normalization (3NF)', 'Foreign Key Constraints', 'ACID Transactions']
  },
  {
    id: 'git_devops',
    name: 'Git, GitHub Actions & Docker',
    category: 'cloud',
    level: 'Advanced',
    yearsOfExp: 2,
    iconName: 'FolderGit2',
    description: 'Git branching strategies, continuous integration, GitHub Actions CI/CD workflows, Docker containerization, and automated release tooling.',
    productionHighlights: [
      'Maintained 120+ active GitHub repositories with automated versioning and CI/CD pipelines',
      'Containerized full-stack monorepo applications using multi-stage Dockerfiles for development and production',
      'Built automated extension publishing workflows with Standard Version and GitHub Actions for OpenPalette'
    ],
    architecturalPatterns: ['Git Feature Branching Workflows', 'Multi-Stage Docker Builds', 'Automated Semantic Versioning']
  },
  {
    id: 'vercel_deployment',
    name: 'Vercel, Netlify & Postman',
    category: 'cloud',
    level: 'Expert',
    yearsOfExp: 2,
    iconName: 'Network',
    description: 'Edge hosting, serverless functions, environment configuration, SSL management, preview branches, and API testing with Postman.',
    productionHighlights: [
      'Deployed high-performance Next.js and React applications to Vercel with automated preview branch deployments',
      'Configured custom domain routing, environment secrets, and serverless API rewrites',
      'Created comprehensive Postman test suites and environment variables for end-to-end API verification'
    ],
    architecturalPatterns: ['Serverless Edge Handlers', 'Preview Deployment Workflows', 'Postman Automation Test Suites']
  },

  // AI & Developer Tooling
  {
    id: 'ai_copilot',
    name: 'AI Integration & Assistant Copilots',
    category: 'ai_data',
    level: 'Advanced',
    yearsOfExp: 1,
    iconName: 'Sparkles',
    description: 'In-app AI assistant integration, Gemini API, intelligent catalog search, natural language queries, and contextual prompts.',
    productionHighlights: [
      'Integrated an in-app AI copilot into Shoppershala e-commerce monorepo to assist buyers with product search and recommendations',
      'Built streaming response UI components with markdown rendering and structured interactive suggestions',
      'Applied prompt engineering techniques to ground AI responses against product catalog metadata'
    ],
    architecturalPatterns: ['Streaming Text UI', 'Contextual Prompt Grounding', 'In-App Conversational Copilot']
  },
  {
    id: 'vscode_tooling',
    name: 'VS Code Tooling & Extension Architecture',
    category: 'ai_data',
    level: 'Advanced',
    yearsOfExp: 2,
    iconName: 'Terminal',
    description: 'VS Code Extension API, TextMate grammar theme tokens, custom file/folder icon themes, and snippet packages.',
    productionHighlights: [
      'Created and shipped OpenPalette: 11 cohesive dark themes, 300+ file icons, and 90+ folder icons for developers worldwide',
      'Packaged high-productivity JavaScript, TypeScript, and React code snippets with automated release pipelines',
      'Integrated VS Code Theme contributions and JSON schema validation for community extensions'
    ],
    architecturalPatterns: ['VS Code Extension Manifests', 'TextMate Scope Tokenization', 'File Icon Association Schemes']
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'shoppershala',
    title: 'Shoppershala — Full-Stack Commerce Monorepo & AI Copilot',
    tagline: 'Multi-role e-commerce platform with JWT RBAC, catalog search, wallet checkout, seller analytics, and an in-app AI assistant.',
    category: 'Full-Stack Commerce',
    clientOrDomain: 'E-Commerce & Digital Marketplace',
    year: '2025–2026',
    scale: 'Multi-Role • Monorepo • React 19 + Express 5',
    summary: 'Architected and built a full-stack e-commerce monorepo powering distinct buyer, seller, and admin experiences with strict role-based access control, rich catalog filtering, seller revenue analytics, and an integrated AI shopping copilot.',
    liveUrl: 'https://github.com/razikuljoni',
    githubUrl: 'https://github.com/razikuljoni/Shoppershala',
    challenge: {
      context: 'Multi-vendor marketplaces require complex role separation: buyers need lightning-fast catalog search and frictionless checkout; sellers need inventory management and real-time revenue analytics; admins need global platform governance.',
      painPoints: [
        'Complex state management across multi-step cart, wishlist, and wallet checkout flows',
        'Need for strict role-based authorization ensuring sellers only access their own product inventory and financial metrics',
        'High latency when executing unoptimized product searches and multi-facet category filters',
        'State desynchronization between client optimistic updates and backend database transactions'
      ],
      constraints: [
        'Strict schema validation on every API route using Zod',
        'Secure stateless authentication using JWT and role-based middleware',
        'Modular monorepo codebase deployable via Docker and Vercel'
      ]
    },
    architecturalSolution: {
      coreApproach: 'Engineered a modern React 19 + Express 5 monorepo backed by MongoDB. Utilized TanStack Query for server state caching, Zustand for lightweight client cart persistence, Zod for end-to-end schema validation, and integrated an AI shopping copilot.',
      keyDecisions: [
        {
          decision: 'Zustand + TanStack Query Hybrid State Architecture',
          rationale: 'Separated persistent client-only state (cart items, local preferences) from server-managed asynchronous state (catalog, orders, inventory) to prevent unnecessary re-renders.',
          alternativeConsidered: 'Single monolithic global state was rejected due to boilerplate and redundant re-render cascades.'
        },
        {
          decision: 'Granular Role-Based Access Control (RBAC) Middleware',
          rationale: 'Built reusable Express middleware validating JWT tokens and checking exact role capabilities (buyer, seller, admin) before hitting controller logic.',
          alternativeConsidered: 'Hardcoded controller-level if/else checks were rejected to avoid permission leaks and code duplication.'
        },
        {
          decision: 'In-App AI Assistant with Catalog Grounding',
          rationale: 'Integrated an AI copilot that parses customer intent and suggests products directly from the database catalog with streaming responses.',
          alternativeConsidered: 'Static keyword search was supplemented with conversational AI for enhanced buyer conversion.'
        }
      ],
      diagramSteps: [
        {
          step: 1,
          name: 'Client Ingress & Auth Guard',
          desc: 'User request with JWT verified through route guards; user role (Buyer/Seller/Admin) attached to request context.',
          component: 'JWT Auth Middleware'
        },
        {
          step: 2,
          name: 'Strict Zod Schema Validation',
          desc: 'Request payload parsed and validated against strict schema rules before touching business logic.',
          component: 'Zod Validator'
        },
        {
          step: 3,
          name: 'Controller & Service Execution',
          desc: 'Modular service executes business operations, handles order placement, and updates wallet balances.',
          component: 'Express 5 Service'
        },
        {
          step: 4,
          name: 'MongoDB Aggregation & Indexing',
          desc: 'Compound-indexed database queries execute sub-5ms lookups and generate seller analytics summaries.',
          component: 'MongoDB Database'
        },
        {
          step: 5,
          name: 'TanStack Query State Sync',
          desc: 'Client invalidates cache tags and optimistically updates cart, wishlist, and seller dashboards.',
          component: 'React 19 + TanStack Query'
        }
      ]
    },
    tradeoffs: [
      {
        accepted: 'Zustand localStorage synchronization requires schema versioning on client upgrades',
        mitigation: 'Implemented client migration checks on application startup to ensure schema compatibility.'
      },
      {
        accepted: 'Multi-role JWT tokens require token refresh flows on role promotion',
        mitigation: 'Configured automated silent token renewal interceptors in Axios/Fetch clients.'
      }
    ],
    metrics: [
      { label: 'Role Journeys', value: '3 Dedicated', change: 'Buyer, Seller & Admin', isPositive: true },
      { label: 'API Response Time', value: '< 45ms', change: 'Indexed MongoDB queries', isPositive: true },
      { label: 'Checkout Success', value: '99.8%', change: 'Validated wallet & cart flow', isPositive: true },
      { label: 'Codebase Safety', value: '100% Type-Safe', change: 'TypeScript + Zod contracts', isPositive: true }
    ],
    techStackIds: ['react', 'nodejs', 'mongodb', 'tanstack_query', 'typescript', 'tailwind', 'jwt_rbac', 'ai_copilot'],
    deliverables: [
      'Full-stack monorepo featuring React 19 frontend and Express 5 REST API',
      'Secure 3-tier Role-Based Access Control (RBAC) with JWT auth and route guards',
      'Interactive seller analytics dashboard with sales graphs and inventory controls',
      'In-app AI copilot with natural language product search and streaming advice'
    ]
  },
  {
    id: 'hawkeyes-monitoring',
    title: 'HawkEyes — Enterprise Digital Monitoring & Operational Workflows',
    tagline: 'Real-time enterprise operational management system for inventory tracking, field-work assignments, and multi-tenant reporting.',
    category: 'Enterprise Systems',
    clientOrDomain: 'HawkEyes Digital Monitoring Ltd.',
    year: '2024–2026',
    scale: 'Enterprise Multi-Tenant • Real-Time Workflows • On-Site Production',
    summary: 'Designed and engineered responsive enterprise dashboards and operational workflow systems at HawkEyes Digital Monitoring Ltd. Built scalable frontend interfaces for product tracking, inventory management, and field-work assignments with RTK Query and Redux Toolkit.',
    challenge: {
      context: 'Operational field teams and supervisors required a centralized, real-time dashboard to monitor ongoing digital monitoring tasks, inventory statuses, and field-work assignments without manual tracking overhead or data delays.',
      painPoints: [
        'Operations teams suffered from manual workflow overhead and disconnected tracking spreadsheets',
        'Frequent redundant API calls overloaded backend servers during peak monitoring shifts',
        'Inconsistent UI state patterns led to unpredictable loading, empty, and error views across modules',
        'Field operators on mobile devices experienced poor responsiveness and layout breakage'
      ],
      constraints: [
        'Must support dense data tables with filtering, sorting, and pagination across 10,000+ records',
        'Predictable role-based UI permissions separating field technicians from supervisors and admins',
        'Seamless operation across desktop, tablet, and mobile viewports'
      ]
    },
    architecturalSolution: {
      coreApproach: 'Architected a modular React + Redux Toolkit application with RTK Query caching layers. Built reusable UI state patterns (loading skeletons, error boundaries, empty states) and integrated REST APIs with JWT authentication.',
      keyDecisions: [
        {
          decision: 'RTK Query Automated Polling & Cache Invalidation',
          rationale: 'Configured tag-based cache invalidation and background polling for real-time field-work status, eliminating redundant manual page refreshes.',
          alternativeConsidered: 'Manual useEffect data fetching was replaced to prevent memory leaks and duplicate requests.'
        },
        {
          decision: 'Standardized Compound UI State Components',
          rationale: 'Created standardized skeleton loaders, error retry panels, and empty state templates, reducing duplicate implementation across 15+ sub-modules.',
          alternativeConsidered: 'Ad-hoc per-component loading state logic was eliminated for engineering consistency.'
        },
        {
          decision: 'Collaborative Frontend-Backend API Contract Design',
          rationale: 'Partnered with backend engineers on strict API contracts, data normalization, and error payloads before feature implementation.',
          alternativeConsidered: 'Building frontend against shifting unverified API endpoints was strictly avoided.'
        }
      ],
      diagramSteps: [
        {
          step: 1,
          name: 'User Authentication & Role Provisioning',
          desc: 'JWT authentication verifies user; permission claims determine accessible dashboard routes and actions.',
          component: 'JWT Auth System'
        },
        {
          step: 2,
          name: 'RTK Query Cache & Data Fetch',
          desc: 'Normalized entity queries fetch operational streams and cache data in Redux store.',
          component: 'RTK Query Engine'
        },
        {
          step: 3,
          name: 'Modular Workflow Management Panel',
          desc: 'Supervisors assign field tasks, track progress in real time, and adjust inventory allocations.',
          component: 'Workflow Interface'
        },
        {
          step: 4,
          name: 'Data Visualization & Reporting',
          desc: 'ECharts and tabular views render inventory levels, completion rates, and historical logs.',
          component: 'ECharts & Reporting UI'
        },
        {
          step: 5,
          name: 'Responsive Cross-Device Layout',
          desc: 'Tailwind CSS utility architecture ensures high-fidelity UX on both field mobile devices and office monitors.',
          component: 'Responsive UI Layer'
        }
      ]
    },
    tradeoffs: [
      {
        accepted: 'Aggressive polling interval on active assignments consumes higher client battery on low-end devices',
        mitigation: 'Implemented Page Visibility API to pause polling when dashboard tab is inactive or minimized.'
      },
      {
        accepted: 'Complex Redux state slice normalization requires initial setup overhead',
        mitigation: 'Created standardized slice boilerplates and custom hooks for streamlined feature additions.'
      }
    ],
    metrics: [
      { label: 'Redundant API Calls', value: '-45%', change: 'RTK Query smart caching', isPositive: true },
      { label: 'Workflow Overhead', value: '-60%', change: 'Automated field assignment UI', isPositive: true },
      { label: 'Cross-Device Score', value: '100%', change: 'Mobile, tablet & desktop verified', isPositive: true },
      { label: 'UI State Consistency', value: 'Zero Glitches', change: 'Standardized state templates', isPositive: true }
    ],
    techStackIds: ['react', 'redux_rtk', 'tailwind', 'component_libs', 'jwt_rbac', 'echarts_maps', 'typescript', 'vercel_deployment'],
    deliverables: [
      'Enterprise dashboard suite with operational workflow systems and inventory management',
      'Real-time field-work assignment tracking interface with role-based action triggers',
      'Reusable UI and state component library standardizing loading, error, and empty states',
      'Automated Git-based CI/CD deployment pipelines on Vercel'
    ]
  },
  {
    id: 'forge-gym',
    title: 'Forge — Performance-First Fitness & Gym Web Application',
    tagline: 'High-speed, SEO-optimized gym platform built with Next.js App Router, dynamic server rendering, and fluid motion.',
    category: 'Performance & Web Platform',
    clientOrDomain: 'Fitness & Health Tech',
    year: '2025',
    scale: 'Next.js 15/16 App Router • 98+ Lighthouse • Production Ready',
    summary: 'Engineered a production-ready gym platform designed for maximum speed, SEO visibility, and smooth interaction. Built using the Next.js App Router with modular components, lazy-loaded media assets, Motion transitions, and server-rendered dynamic sections.',
    liveUrl: 'https://forge-fitness.vercel.app',
    githubUrl: 'https://github.com/razikuljoni/Forge',
    challenge: {
      context: 'Modern fitness brands rely heavily on organic search traffic and high conversion rates. Slow mobile load times, heavy media files, and layout shifts directly harm user sign-ups and Google search rankings.',
      painPoints: [
        'Heavy image and video hero assets caused significant Largest Contentful Paint (LCP) delays on mobile networks',
        'Client-rendered single-page apps struggled with search engine indexing and dynamic social share previews',
        'Clunky mobile navigation and jarring state transitions increased user bounce rates'
      ],
      constraints: [
        'Target Core Web Vitals: LCP < 1.2s, CLS = 0, FID < 50ms',
        'Fully responsive layout with smooth, hardware-accelerated micro-interactions',
        'Dynamic program and membership schedules with fast server-side rendering'
      ]
    },
    architecturalSolution: {
      coreApproach: 'Leveraged Next.js App Router with React Server Components (RSC) to minimize client JavaScript bundle size. Configured next/image optimization, responsive modern typography, and Motion micro-animations.',
      keyDecisions: [
        {
          decision: 'Next.js App Router & Server Component Architecture',
          rationale: 'Rendered marketing sections, training programs, and schedule tables on the server, sending zero unnecessary JavaScript to the client.',
          alternativeConsidered: 'Client-side SPA was rejected due to SEO limitations and larger bundle size.'
        },
        {
          decision: 'Adaptive Media Loading & Next/Image Optimization',
          rationale: 'Served modern WebP/AVIF formats with exact srcSet responsive dimensions and blur placeholder placeholders, eliminating Cumulative Layout Shift (CLS).',
          alternativeConsidered: 'Unoptimized static asset serving was eliminated.'
        },
        {
          decision: 'Framer Motion Hardware-Accelerated Micro-Interactions',
          rationale: 'Created smooth scroll-triggered entry transitions and interactive pricing cards that render at 60 FPS without layout thrashing.',
          alternativeConsidered: 'Heavy CSS keyframe libraries were replaced with GPU-accelerated Motion transforms.'
        }
      ],
      diagramSteps: [
        {
          step: 1,
          name: 'Vercel Edge Ingress & SSR',
          desc: 'Incoming request routed to nearest edge server; React Server Components pre-render HTML in < 30ms.',
          component: 'Next.js Server Component'
        },
        {
          step: 2,
          name: 'Asset Optimization & WebP Delivery',
          desc: 'Images optimized on the fly, cached at CDN edge, and served with responsive width breakpoints.',
          component: 'Next.js Image Pipeline'
        },
        {
          step: 3,
          name: 'Selective Client Hydration',
          desc: 'Only interactive widgets (membership calculator, contact form) hydrate with lightweight JS bundles.',
          component: 'React Island Hydration'
        },
        {
          step: 4,
          name: 'Motion Entry Transitions',
          desc: 'Viewport intersection observers trigger smooth, staggered entrance animations as user scrolls.',
          component: 'Motion Animation Engine'
        },
        {
          step: 5,
          name: 'Dynamic Program & Schedule Views',
          desc: 'Users explore training schedules, trainer bios, and interact with membership tiers seamlessly.',
          component: 'Dynamic UI View'
        }
      ]
    },
    tradeoffs: [
      {
        accepted: 'Server-side rendering introduces small initial compute time on cache misses (~25ms)',
        mitigation: 'Enabled Incremental Static Regeneration (ISR) to cache generated pages at edge nodes.'
      },
      {
        accepted: 'Strict component splitting into Server and Client components requires disciplined code architecture',
        mitigation: 'Maintained strict file naming conventions and modular "use client" leaf boundaries.'
      }
    ],
    metrics: [
      { label: 'Google Lighthouse', value: '98/100', change: 'Near-perfect performance score', isPositive: true },
      { label: 'Largest Contentful Paint', value: '0.9s', change: 'Sub-second mobile LCP', isPositive: true },
      { label: 'Cumulative Layout Shift', value: '0.00', change: 'Zero visual jank or jumps', isPositive: true },
      { label: 'SEO Visibility', value: '100%', change: 'Dynamic OpenGraph & meta tags', isPositive: true }
    ],
    techStackIds: ['nextjs', 'react', 'typescript', 'tailwind', 'vercel_deployment'],
    deliverables: [
      'Production Next.js App Router application with modular component architecture',
      'Dynamic training program catalog with SEO metadata and schedule views',
      'Optimized asset handling pipeline with next/image and zero Cumulative Layout Shift',
      'Continuous deployment pipeline on Vercel with automated preview builds'
    ]
  },
  {
    id: 'dashboard-wizard',
    title: 'Dashboard Wizard — Modular Data Visualization Workspace',
    tagline: 'Interactive frontend analytics dashboard featuring dynamic routing, reusable modular panels, ECharts, and Google Maps.',
    category: 'Data Visualization',
    clientOrDomain: 'Analytics & Geospatial Intelligence',
    year: '2024–2025',
    scale: 'Modular Workspace • Multi-Chart Layouts • Geospatial Views',
    summary: 'Engineered a highly flexible data visualization dashboard in React featuring dynamic routing, multiple chart configurations, geospatial device tracking with Google Maps API, and scalable Redux state management.',
    liveUrl: 'https://dashboard-wizard.vercel.app',
    githubUrl: 'https://github.com/razikuljoni/Dashboard-Wizard',
    challenge: {
      context: 'Analytics operators and business managers need to visualize diverse data streams (time-series revenue, regional device distributions, comparative metrics) in a customizable and responsive workspace.',
      painPoints: [
        'Monolithic dashboard layouts locked users into fixed arrangements without configurable panel layouts',
        'Rendering multiple concurrent high-frequency charts caused browser UI lag and frame drops',
        'Complex cross-filter synchronization (filtering by region updating all charts simultaneously) was error-prone'
      ],
      constraints: [
        'Modular panel components capable of rendering various chart archetypes (line, bar, pie, radar, map)',
        'Seamless integration with Google Maps API for geographic telemetry tracking',
        'Fluid responsiveness across ultra-wide monitors and tablet screens'
      ]
    },
    architecturalSolution: {
      coreApproach: 'Architected a modular panel system using React, Redux, and Apache ECharts. Built a unified filter state bus that propagates temporal and geographic range selections to all child visualization cards synchronously.',
      keyDecisions: [
        {
          decision: 'Unified Redux Filter State Hub',
          rationale: 'Centralized active date ranges, category filters, and geographic bounding boxes into a normalized Redux slice, ensuring all chart widgets stay strictly synchronized.',
          alternativeConsidered: 'Passing filter props through deep component trees created prop-drilling headaches.'
        },
        {
          decision: 'ECharts Responsive Wrapper with ResizeObserver',
          rationale: 'Encapsulated Apache ECharts inside a custom React wrapper that listens to container dimension changes via ResizeObserver, preventing chart distortion on panel resize.',
          alternativeConsidered: 'Fixed pixel dimensions caused overflow and layout breakage on responsive screens.'
        },
        {
          decision: 'Google Maps Geospatial Marker Clustering',
          rationale: 'Integrated Google Maps API with marker clustering algorithms to render hundreds of device locations without slowing down map pan/zoom operations.',
          alternativeConsidered: 'Raw DOM markers caused catastrophic rendering stutter at scale.'
        }
      ],
      diagramSteps: [
        {
          step: 1,
          name: 'Dynamic Route & Workspace Setup',
          desc: 'Router loads user workspace configuration, panel layouts, and widget preferences.',
          component: 'React Router & Workspace'
        },
        {
          step: 2,
          name: 'Global Filter State Dispatch',
          desc: 'User changes date range or category; Redux store dispatches updated filter state to all active panels.',
          component: 'Redux State Hub'
        },
        {
          step: 3,
          name: 'Chart Data Transformation',
          desc: 'Raw metrics transformed into normalized series payloads for ECharts visualization adapters.',
          component: 'Data Transformer'
        },
        {
          step: 4,
          name: 'ECharts & Google Maps Rendering',
          desc: 'Charts render animated series transitions; Google Maps updates clustered geographic markers.',
          component: 'ECharts & Maps Engine'
        },
        {
          step: 5,
          name: 'Interactive Widget Control & Export',
          desc: 'Users drill down into metrics, toggle series visibility, and export data summaries.',
          component: 'Interactive Panel Controls'
        }
      ]
    },
    tradeoffs: [
      {
        accepted: 'ECharts canvas bundle adds ~180KB to initial JavaScript footprint',
        mitigation: 'Used dynamic imports to code-split visualization engines and load them on demand.'
      },
      {
        accepted: 'Google Maps API requires external script loading and API key management',
        mitigation: 'Created an asynchronous script loader with graceful fallback states if the network is restricted.'
      }
    ],
    metrics: [
      { label: 'Chart Render Latency', value: '< 16ms', change: '60 FPS smooth interactions', isPositive: true },
      { label: 'Layout Archetypes', value: '6+ Layouts', change: 'Grid, flex, split & full-screen', isPositive: true },
      { label: 'Filter Sync Time', value: 'Instant', change: 'Zero state lag across panels', isPositive: true },
      { label: 'Geospatial Markers', value: '1,000+ Clustered', change: 'Smooth map pan & zoom', isPositive: true }
    ],
    techStackIds: ['react', 'redux_rtk', 'tailwind', 'echarts_maps', 'javascript'],
    deliverables: [
      'Modular dashboard workspace with dynamic routing and configurable widget layouts',
      'Integrated Apache ECharts and Google Maps geospatial device tracking views',
      'Scalable Redux state architecture with synchronized multi-panel cross-filtering',
      'Production deployment on Vercel with responsive desktop and mobile support'
    ]
  },
  {
    id: 'openpalette',
    title: 'OpenPalette — Developer Tooling Suite & VS Code Ecosystem',
    tagline: 'Developer tooling ecosystem comprising 11 cohesive dark themes, 390+ file/folder icons, and productivity snippets with automated CI/CD.',
    category: 'Developer Tooling',
    clientOrDomain: 'Developer Experience & Open Source',
    year: '2024–2025',
    scale: '11 Themes • 390+ Custom Icons • Automated GitHub Actions',
    summary: 'Built and published OpenPalette, a developer tooling suite for VS Code featuring 11 cohesive dark themes, 300+ file icons, 90+ folder icons, and productivity snippets for JavaScript, TypeScript, and React. Built automated CI/CD release workflows with GitHub Actions.',
    liveUrl: 'https://marketplace.visualstudio.com',
    githubUrl: 'https://github.com/razikuljoni/OpenPalette',
    challenge: {
      context: 'Software developers spend hours daily in code editors where visual clutter, inconsistent syntax highlighting, and generic icons cause eye strain and decrease file navigation speed.',
      painPoints: [
        'Standard default themes lacked optical contrast balance across modern TypeScript/React syntax constructs',
        'Navigating large enterprise monorepos was slowed by generic, uninformative directory and file icons',
        'Manual publishing and versioning of multi-theme extension packages was tedious and error-prone'
      ],
      constraints: [
        'Strict conformance to TextMate grammar tokenization scopes and VS Code Extension API',
        'Mathematical color luminance harmony ensuring WCAG AA contrast across 11 theme variations',
        'Fully automated semantic versioning, changelog generation, and marketplace publishing'
      ]
    },
    architecturalSolution: {
      coreApproach: 'Architected a modular token generation system using TypeScript and JSON schemas. Built automated release pipelines using GitHub Actions, Standard Version, and VSCE for seamless multi-package deployment.',
      keyDecisions: [
        {
          decision: 'Semantic Color Token Architecture',
          rationale: 'Created a centralized palette dictionary that generates syntax token definitions across 11 themes with guaranteed optical luminance contrast.',
          alternativeConsidered: 'Manually editing 11 separate 2,000-line JSON files was rejected due to maintenance overhead.'
        },
        {
          decision: 'Comprehensive Icon Association Hierarchy',
          rationale: 'Mapped 300+ file extensions and 90+ folder naming conventions (e.g. .graphql, .dockerfile, /adapters, /controllers) to custom SVG icon sets.',
          alternativeConsidered: 'Generic icon fallbacks were minimized to provide instant visual recognition for modern full-stack stacks.'
        },
        {
          decision: 'Automated CI/CD Release with Standard Version',
          rationale: 'Configured GitHub Actions workflows that automatically bump semantic versions, generate changelogs, tag Git commits, and publish extension artifacts.',
          alternativeConsidered: 'Manual terminal publishing was replaced with deterministic pipeline releases.'
        }
      ],
      diagramSteps: [
        {
          step: 1,
          name: 'Token Dictionary & Palette Generation',
          desc: 'TypeScript build script compiles mathematical color palettes into 11 distinct theme JSON variants.',
          component: 'Token Builder'
        },
        {
          step: 2,
          name: 'Icon Association Mapping',
          desc: 'SVG icons compiled into VS Code icon theme definition with file extension and folder regex matches.',
          component: 'Icon Engine'
        },
        {
          step: 3,
          name: 'Snippet Library Compilation',
          desc: 'Productivity snippets for React hooks, Next.js components, and Express routes packaged with tab triggers.',
          component: 'Snippet Packager'
        },
        {
          step: 4,
          name: 'GitHub Actions Automated CI/CD',
          desc: 'Pipeline executes linters, validates JSON schemas, bumps version with Standard Version, and creates releases.',
          component: 'GitHub Actions CI/CD'
        },
        {
          step: 5,
          name: 'Marketplace Distribution',
          desc: 'VSCE publishes verified packages directly to developers globally with instant update delivery.',
          component: 'VS Code Marketplace'
        }
      ]
    },
    tradeoffs: [
      {
        accepted: 'Maintaining 390+ custom icons requires dedicated vector asset optimization',
        mitigation: 'Automated SVG minification pipeline to keep extension install bundle under 2MB.'
      },
      {
        accepted: 'Deep TextMate scope customization requires testing against various language grammars',
        mitigation: 'Created automated syntax snapshot tests across TypeScript, Python, Go, and Rust samples.'
      }
    ],
    metrics: [
      { label: 'Editor Themes', value: '11 Cohesive', change: 'Dark mode variations', isPositive: true },
      { label: 'Custom Icons', value: '390+ Icons', change: '300+ files, 90+ folders', isPositive: true },
      { label: 'Release Automation', value: '100% CI/CD', change: 'GitHub Actions & Standard Version', isPositive: true },
      { label: 'Snippets Shipped', value: '50+ Snippets', change: 'React, Next.js, Express & TS', isPositive: true }
    ],
    techStackIds: ['vscode_tooling', 'typescript', 'git_devops'],
    deliverables: [
      'Packaged 11 cohesive dark themes with balanced optical contrast for prolonged coding sessions',
      '300+ file icons and 90+ folder icons providing instant visual file tree navigation',
      'High-productivity JavaScript, TypeScript, and React code snippet collections',
      'Automated semantic release workflow with GitHub Actions and Standard Version'
    ]
  }
];

export const ARCHITECTURE_TENETS: ArchitectureTenet[] = [
  {
    id: 'tenet-1',
    number: '01',
    title: 'State Architecture & Predictable Cache Boundaries',
    subtitle: 'Server state and client state require distinct strategies.',
    description: 'Never mix ephemeral server cache with persistent client store. Leverage RTK Query and TanStack Query with normalized cache keys and automated tag invalidation for server data, while keeping client-side state minimal, focused, and predictable with tools like Zustand or Redux slices.',
    ruleOfThumb: 'If a component re-fetches data that is already fresh in cache or triggers redundant network requests, your state boundaries need refactoring.'
  },
  {
    id: 'tenet-2',
    number: '02',
    title: 'End-to-End Type Safety & Schema Contracts',
    subtitle: 'Validate at boundaries, trust within the application core.',
    description: 'Runtime validation must strictly guard all external inputs using Zod schemas at controller and form boundaries. Once parsed and validated, strong TypeScript type inference flows seamlessly through services, hooks, and presentation components with zero unsafe type assertions.',
    ruleOfThumb: 'Never use "any" or unvalidated type casts on incoming API payloads or user form submissions.'
  },
  {
    id: 'tenet-3',
    number: '03',
    title: 'Real-World Performance & Core Web Vitals',
    subtitle: 'Fast loading is a fundamental feature, not an afterthought.',
    description: 'Optimize user perceived latency by combining server-side rendering (SSR), image format optimization (WebP/AVIF), lazy-loaded component chunks, and CSS containment. Eliminate layout shifts (CLS) by giving all media explicit aspect ratios and skeleton placeholders.',
    ruleOfThumb: 'A production web app should deliver a sub-1.2s Largest Contentful Paint (LCP) and zero layout shift on standard 4G mobile devices.'
  },
  {
    id: 'tenet-4',
    number: '04',
    title: 'Component Reusability & Accessible UX',
    subtitle: 'Eliminate duplicate UI and build for all viewports and users.',
    description: 'Standardize compound components for complex patterns (data tables, modal dialogs, loading skeletons, error boundaries). Ensure WCAG AA color contrast, responsive typography math, accessible keyboard navigation, and seamless behavior across desktop, tablet, and mobile.',
    ruleOfThumb: 'Every async UI screen must handle loading, success, empty, and error states gracefully with accessible retry mechanisms.'
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: 'May 2024 — April 2026',
    role: 'Frontend Developer (Junior Frontend Developer)',
    company: 'HawkEyes Digital Monitoring Ltd.',
    location: 'Uttara, Dhaka, Bangladesh (On-site)',
    badge: 'Full-Time Professional Role',
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
    highlights: [
      'Built Shoppershala: full-stack commerce monorepo featuring React 19, Express 5, MongoDB, JWT RBAC, TanStack Query, Zustand, and an in-app AI copilot.',
      'Created Forge: performance-first gym platform with Next.js App Router, SSR, Motion, and 98+ Core Web Vitals.',
      'Engineered Dashboard Wizard: modular data visualization workspace with ECharts, Google Maps API, and Redux state.',
      'Published OpenPalette: 11 VS Code dark themes, 390+ custom file/folder icons, and automated GitHub Actions CI/CD workflows.'
    ],
    architecturesLed: [
      'Shoppershala Full-Stack Commerce Monorepo & AI Assistant',
      'Forge Performance-First Next.js App Router Architecture',
      'Dashboard Wizard Modular ECharts & Geospatial Maps Workspace',
      'OpenPalette VS Code Theme & Extension Ecosystem'
    ]
  }
];

export const EDUCATION_ITEMS: EducationItem[] = [
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

export const CERTIFICATION_ITEMS: CertificationItem[] = [
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

export const LANGUAGES = [
  { language: 'Bangla', proficiency: 'Native' },
  { language: 'English', proficiency: 'Professional Working Proficiency' }
];
