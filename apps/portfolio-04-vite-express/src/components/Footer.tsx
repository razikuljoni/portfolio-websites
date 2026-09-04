import React from 'react';
import { Cpu, Github, Linkedin, Mail, ArrowUp, Activity, Globe, Code2, GitCommit, Flame, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-800 bg-[#07090E] py-12 text-neutral-400 text-xs font-mono relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GitHub Continuous Activity Badge Bar in Footer */}
        <div className="mb-10 p-4 rounded-xl bg-[#0E1117] border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-amber-400 shrink-0">
              <Flame className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-200 text-xs sm:text-sm font-sans">
                  Active GitHub Contributor
                </span>
                <span className="px-2 py-0.2 rounded-full text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                  1,480+ Commits / Year
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                123+ public repositories, regular open-source contributions & release cycles.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="#github-activity-calendar"
              className="px-3 py-1.5 rounded-lg text-xs bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
            >
              View Activity Heatmap
            </a>
            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 hover:text-amber-200 transition-colors inline-flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>@{PERSONAL_INFO.githubUsername}</span>
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-neutral-800/80">
          
          {/* Identity */}
          <div className="space-y-3 sm:col-span-2">
            <div className="flex items-center gap-2 text-neutral-100 font-bold font-sans text-base">
              <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-amber-400">
                <Code2 className="w-4 h-4" />
              </div>
              <span>{PERSONAL_INFO.name}</span>
            </div>
            <p className="text-neutral-400 text-xs font-sans max-w-md leading-relaxed">
              Product-minded Full Stack Developer specializing in React, Next.js, Node.js, enterprise dashboard architectures, and high-performance web products.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Status: {PERSONAL_INFO.stats.status}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-neutral-200 font-semibold uppercase tracking-wider text-[11px]">
              Featured Projects
            </div>
            <ul className="space-y-1.5 text-neutral-400 text-xs">
              <li><a href="#architecture" className="hover:text-amber-400 transition-colors">Shoppershala (E-Commerce)</a></li>
              <li><a href="#architecture" className="hover:text-amber-400 transition-colors">HawkEyes Enterprise UI</a></li>
              <li><a href="#architecture" className="hover:text-amber-400 transition-colors">Forge Gym Web Platform</a></li>
              <li><a href="#architecture" className="hover:text-amber-400 transition-colors">Dashboard Wizard Viz</a></li>
              <li><a href="#architecture" className="hover:text-amber-400 transition-colors">OpenPalette Dev Tooling</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-2">
            <div className="text-neutral-200 font-semibold uppercase tracking-wider text-[11px]">
              Connect & Links
            </div>
            <ul className="space-y-2 text-neutral-400 text-xs">
              <li>
                <a href={PERSONAL_INFO.links.github} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub (@Razikuljoni)</span>
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.links.livePortfolio} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live Portfolio</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Mirpur, Dhaka, Bangladesh.
          </div>
          <div className="flex items-center gap-4">
            <span>React 19 • Next.js • TypeScript • Tailwind CSS</span>
            <button
              onClick={scrollToTop}
              id="footer-scroll-top-btn"
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

