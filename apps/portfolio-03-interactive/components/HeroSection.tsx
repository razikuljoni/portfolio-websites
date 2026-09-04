'use client';

import React, { useState, useEffect } from 'react';
import HeroCanvas from './HeroCanvas';
import { 
  ArrowDown, 
  Terminal, 
  Layers, 
  FileText, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Zap
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

interface HeroSectionProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export default function HeroSection({ onOpenTerminal, onOpenResume }: HeroSectionProps) {
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const tags = [
    'Production React.js & Next.js Ecosystems',
    'Enterprise Admin & Workflow Dashboards',
    'Scalable Node.js & Express REST APIs',
    'Predictable Redux & RTK Query State',
    '100% Accessible & Responsive UIs'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagIndex((prev) => (prev + 1) % tags.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [tags.length]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#1c1c1e] dark:bg-[#1c1c1e] light:bg-[#f8f5ef]"
    >
      {/* Interactive Constellation Particle Canvas */}
      <HeroCanvas />

      {/* Subtle radial ambient copper glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b87333]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container with Parallax feel */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Availability & Role Badge */}
        <div
          id="hero-status-badge"
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#2c2c2e]/90 border border-[#b87333]/30 shadow-lg shadow-black/20 mb-8 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]" />
          </span>
          <span className="text-xs font-mono text-[#c8c3bb] tracking-wide">
            {PORTFOLIO_DATA.profile.status}
          </span>
        </div>

        {/* Display Headline */}
        <h1
          id="hero-main-title"
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f5f0e8] leading-[1.1] mb-6 font-['Space_Grotesk']"
        >
          Crafting High-Performance,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b87333] via-[#e49b58] to-[#d97736]">
            Full-Stack
          </span>{' '}
          Web Products & Dashboards.
        </h1>

        {/* Dynamic Tagline Rotator */}
        <div className="h-9 flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#b87333] bg-[#242426]/70 border border-[#b87333]/25 px-4 py-1.5 rounded-lg transition-all duration-300">
            <Zap className="w-3.5 h-3.5 text-[#e49b58] animate-pulse" />
            <span className="tracking-wide">{tags[currentTagIndex]}</span>
          </div>
        </div>

        {/* Intro Paragraph */}
        <p
          id="hero-subtext"
          className="text-base sm:text-lg md:text-xl text-[#c8c3bb] max-w-3xl mb-10 leading-relaxed font-light"
        >
          I am <strong className="text-[#f5f0e8] font-semibold">{PORTFOLIO_DATA.profile.name}</strong>, a results-driven Full Stack (MERN) Developer with 2+ years of production experience translating complex operations into fast, accessible, and data-heavy web applications.
        </p>

        {/* Primary Action Button Cluster */}
        <div
          id="hero-cta-cluster"
          className="flex flex-wrap items-center justify-center gap-3.5 mb-14"
        >
          <a
            id="hero-explore-projects-cta"
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#b87333] to-[#d97736] text-[#f5f0e8] font-semibold text-sm shadow-[0_0_20px_rgba(184,115,51,0.35)] hover:shadow-[0_0_30px_rgba(184,115,51,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Layers className="w-4 h-4" />
            <span>Explore Featured Projects</span>
          </a>

          <button
            type="button"
            id="hero-terminal-cta"
            onClick={onOpenTerminal}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#2c2c2e]/90 hover:bg-[#38383b] text-[#f5f0e8] border border-[#f5f0e8]/15 hover:border-[#b87333]/60 font-mono text-sm transition-all"
          >
            <Terminal className="w-4 h-4 text-[#b87333]" />
            <span>Launch CLI Terminal</span>
          </button>

          <button
            type="button"
            id="hero-resume-cta"
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#242426]/80 hover:bg-[#2c2c2e] text-[#c8c3bb] hover:text-[#f5f0e8] border border-[#f5f0e8]/10 hover:border-[#f5f0e8]/25 font-mono text-sm transition-all"
          >
            <FileText className="w-4 h-4 text-[#8e8a82]" />
            <span>Curriculum Vitae</span>
          </button>
        </div>

        {/* Live Kernel / System Status Bar (Techy feel) */}
        <div
          id="hero-system-status-ticker"
          className="w-full max-w-3xl bg-[#242426]/80 border border-[#f5f0e8]/10 rounded-2xl p-4 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8e8a82]"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#34d399]" />
            <span className="text-[#c8c3bb]">CORE: React / Next.js / Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#8e8a82]">PROD:</span>
            <span className="text-[#e49b58]">HawkEyes Digital Ltd.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#8e8a82]">STATE:</span>
            <span className="text-[#c8c3bb]">Redux & RTK Query</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#8e8a82]">LOCATION:</span>
            <span className="text-[#b87333]">Dhaka, BD (GMT+6)</span>
          </div>
        </div>

      </div>

      {/* Down Scroll Indicator */}
      <a
        href="#about"
        id="hero-scroll-indicator"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs font-mono text-[#8e8a82] hover:text-[#b87333] transition-colors"
        aria-label="Scroll down to About section"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#b87333]" />
      </a>
    </section>
  );
}
