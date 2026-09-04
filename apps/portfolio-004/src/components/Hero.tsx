import React, { useState } from 'react';
import { ArrowRight, Layers, Sparkles, Terminal, Activity, ShieldCheck, Database, CheckCircle2, ChevronRight, Copy, Check, Code2, Globe, Layout } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onExploreArchitecture: () => void;
  onExploreTechStack: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreArchitecture, onExploreTechStack }) => {
  const [activeScenario, setActiveScenario] = useState<'shoppershala' | 'hawkeyes' | 'forge'>('shoppershala');
  const [copiedCmd, setCopiedCmd] = useState(false);

  const scenarios = {
    shoppershala: {
      title: 'Shoppershala (Full-Stack Commerce & AI Copilot)',
      metric1: 'React 19 + Express 5',
      label1: 'Architecture Stack',
      metric2: '< 45ms',
      label2: 'Indexed DB Queries',
      metric3: '100% Type-Safe',
      label3: 'Zod + TypeScript',
      description: 'Dedicated Buyer, Seller, and Admin journeys with JWT RBAC, wallet checkout, seller analytics, and an in-app AI copilot.',
      command: 'npm run dev:monorepo --workspace=shoppershala --ai-copilot=gemini',
      tags: ['React 19', 'Express 5', 'MongoDB', 'TanStack Query', 'Zustand', 'Zod']
    },
    hawkeyes: {
      title: 'HawkEyes Enterprise Workflow Platform',
      metric1: '-45% Calls',
      label1: 'RTK Query Caching',
      metric2: '100% a11y',
      label2: 'Cross-Device UX',
      metric3: 'Real-Time',
      label3: 'Field Workflows',
      description: 'Responsive operational management systems for inventory tracking, product lifecycle, and field-work assignment tracking at HawkEyes.',
      command: 'npm run start:enterprise-dashboard --mode=production --client=multi-tenant',
      tags: ['React.js', 'Redux Toolkit', 'RTK Query', 'ECharts', 'JWT RBAC', 'Tailwind']
    },
    forge: {
      title: 'Forge High-Performance Fitness Platform',
      metric1: '98/100',
      label1: 'Lighthouse Score',
      metric2: '0.9s LCP',
      label2: 'Sub-Second Paint',
      metric3: '0.00 CLS',
      label3: 'Zero Layout Shift',
      description: 'Performance-first Next.js App Router platform with modular component architecture, server rendering, lazy loading, and Motion.',
      command: 'npx next build && npx next start --port 3000 --turbopack',
      tags: ['Next.js (App Router)', 'React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vercel']
    }
  };

  const current = scenarios[activeScenario];

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(current.command);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <section id="hero-section" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Bio & Core Pitch */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-neutral-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-400">Status:</span>
              <span className="text-neutral-100 font-semibold">{PERSONAL_INFO.stats.status}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-100 leading-[1.12]">
              Building <span className="text-white underline decoration-amber-400/60 decoration-2 underline-offset-4">High-Performance</span> Web Products & Scalable Dashboards
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-normal">
              Hi, I'm <strong className="text-white font-semibold">MD Razikul Islam Joni</strong>. Product-minded Full Stack Developer with 2+ years of professional experience building responsive enterprise dashboards, operational workflow systems, and high-conversion web applications with React, Next.js, and Node.js.
            </p>

            {/* Quick Metrics Bar from Resume */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
                <div className="text-xl font-bold text-amber-400 font-mono">{PERSONAL_INFO.stats.yearsOfExp} Yrs</div>
                <div className="text-xs text-neutral-400 mt-0.5">In Production</div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
                <div className="text-xl font-bold text-neutral-100 font-mono">{PERSONAL_INFO.stats.publicRepos}</div>
                <div className="text-xs text-neutral-400 mt-0.5">Public Repos</div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
                <div className="text-xl font-bold text-emerald-400 font-mono">{PERSONAL_INFO.stats.editorThemesShipped}</div>
                <div className="text-xs text-neutral-400 mt-0.5">Themes Shipped</div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
                <div className="text-xl font-bold text-neutral-100 font-mono">{PERSONAL_INFO.stats.iconsCreated}</div>
                <div className="text-xs text-neutral-400 mt-0.5">Icons Designed</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onExploreArchitecture}
                id="hero-explore-architecture-btn"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-neutral-950 bg-neutral-100 hover:bg-white transition-all shadow-md cursor-pointer hover:shadow-neutral-200/10"
              >
                <Layers className="w-4 h-4 text-neutral-900" />
                <span>Explore Featured Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreTechStack}
                id="hero-explore-techstack-btn"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-neutral-300 bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-all cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Technical Strengths</span>
              </button>
            </div>

          </div>

          {/* Right Column: Interactive System Scenario Console */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-neutral-800 bg-[#0E1117] shadow-2xl overflow-hidden">
              
              {/* Console Window Header */}
              <div className="px-4 py-3 bg-[#161B22] border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-neutral-400 ml-2">production-runtime.ctl</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ACTIVE SYSTEM
                </div>
              </div>

              {/* Scenario Switcher Tabs */}
              <div className="p-2 bg-[#0E1117] border-b border-neutral-800/80 flex gap-1">
                {(['shoppershala', 'hawkeyes', 'forge'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveScenario(key)}
                    id={`hero-scenario-tab-${key}`}
                    className={`flex-1 py-1.5 px-2 text-xs font-mono rounded-lg transition-all text-center cursor-pointer ${
                      activeScenario === key
                        ? 'bg-neutral-800 text-neutral-100 font-semibold border border-neutral-700'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                    }`}
                  >
                    {key === 'shoppershala' ? 'Shoppershala' : key === 'hawkeyes' ? 'HawkEyes UI' : 'Forge (Next)'}
                  </button>
                ))}
              </div>

              {/* Console Body */}
              <div className="p-5 space-y-4 font-mono text-xs">
                
                {/* Active Architecture Title */}
                <div>
                  <div className="text-neutral-400 text-[11px] uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Engineering Architecture</span>
                    <span className="text-amber-400 font-semibold">Production Verified</span>
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-100 font-sans">
                    {current.title}
                  </h3>
                  <p className="text-neutral-400 text-xs font-sans mt-1 leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Telemetry Matrix Grid */}
                <div className="grid grid-cols-3 gap-2 py-1">
                  <div className="p-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800">
                    <div className="text-[10px] text-neutral-400 uppercase truncate">{current.label1}</div>
                    <div className="text-xs font-bold text-neutral-100 mt-0.5 truncate">{current.metric1}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800">
                    <div className="text-[10px] text-neutral-400 uppercase truncate">{current.label2}</div>
                    <div className="text-xs font-bold text-emerald-400 mt-0.5 truncate">{current.metric2}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800">
                    <div className="text-[10px] text-neutral-400 uppercase truncate">{current.label3}</div>
                    <div className="text-xs font-bold text-amber-300 mt-0.5 truncate">{current.metric3}</div>
                  </div>
                </div>

                {/* Terminal Execution Snippet */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span>CLI Workflow Script</span>
                    <button
                      onClick={handleCopyCmd}
                      id="hero-copy-cmd-btn"
                      className="inline-flex items-center gap-1 hover:text-neutral-200 transition-colors cursor-pointer"
                    >
                      {copiedCmd ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/70 border border-neutral-800 text-neutral-300 break-all select-all flex items-start gap-2">
                    <span className="text-neutral-500 select-none">$</span>
                    <span className="text-emerald-400">{current.command}</span>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {current.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px] border border-neutral-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Console Footer Action */}
              <div className="px-4 py-2.5 bg-[#161B22] border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-mono text-[11px]">System Status: Operational</span>
                <button
                  onClick={onExploreArchitecture}
                  className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>View Project Blueprint</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
