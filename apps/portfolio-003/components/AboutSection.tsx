'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { 
  CheckCircle2, 
  FileText, 
  Cpu, 
  Terminal, 
  Layers, 
  ArrowUpRight, 
  Sparkles,
  Shield,
  Copy,
  Check
} from 'lucide-react';

interface AboutSectionProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export default function AboutSection({ onOpenResume, onOpenTerminal }: AboutSectionProps) {
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippet = `// Enterprise Dashboard RTK Query Slice with Typed Normalized Cache
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TelemetryMetrics, DashboardFilter } from '@/types/dashboard';

export const telemetryApi = createApi({
  reducerPath: 'telemetryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('Authorization', \`Bearer \${token}\`);
      return headers;
    },
  }),
  tagTypes: ['Telemetry', 'Inventory'],
  endpoints: (builder) => ({
    getLiveMetrics: builder.query<TelemetryMetrics, DashboardFilter>({
      query: (filter) => ({ url: '/analytics/live', params: filter }),
      providesTags: ['Telemetry'],
    }),
  }),
});`;

  const copySnippet = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section
      id="about"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#1c1c1e] dark:bg-[#1c1c1e] light:bg-[#f8f5ef] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c2c2e] border border-[#b87333]/30 text-xs font-mono text-[#b87333] mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#e49b58]" />
            <span>ENGINEERING PHILOSOPHY & BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#f5f0e8] tracking-tight font-['Space_Grotesk'] max-w-2xl">
            Translating Complex Operations into Fast, Accessible Products
          </h2>
          <div className="w-16 h-1 bg-[#b87333] mt-5 rounded-full" />
        </div>

        {/* Alternating Row 1: Profile & Bio (Left Bio, Right Portrait / Metrics Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left Column: Bio & Core Vision */}
          <div className="lg:col-span-7 space-y-6 text-[#c8c3bb] text-base sm:text-lg leading-relaxed font-light">
            <div className="text-xs font-mono text-[#b87333] uppercase tracking-widest font-semibold">
              {"// Background & Track Record"}
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#f5f0e8] font-['Space_Grotesk']">
              Building intuitive, high-performance web applications with predictable state architecture.
            </h3>
            {PORTFOLIO_DATA.profile.bio.map((paragraph, index) => (
              <p key={index} className="text-[#c8c3bb]">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                id="about-open-resume-btn"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#b87333] hover:bg-[#c98240] text-[#f5f0e8] font-medium text-sm transition-all shadow-md hover:shadow-[0_0_20px_rgba(184,115,51,0.4)]"
              >
                <FileText className="w-4 h-4" />
                <span>Examine Full Curriculum Vitae</span>
              </button>

              <button
                type="button"
                id="about-open-terminal-btn"
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2c2c2e] hover:bg-[#38383b] text-[#c8c3bb] hover:text-[#f5f0e8] border border-[#f5f0e8]/10 text-sm font-mono transition-all"
              >
                <Terminal className="w-4 h-4 text-[#b87333]" />
                <span>Run Interactive CLI</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Portrait & Engineering Signature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl bg-[#242426] border border-[#b87333]/30 p-4 shadow-2xl group hover:border-[#b87333]/60 transition-all duration-500">
              
              {/* Top Bar with decorative terminal dots */}
              <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-[#f5f0e8]/10 text-xs font-mono text-[#8e8a82]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span>razikul_joni_profile.ts</span>
              </div>

              {/* Portrait Image with subtle copper overlay */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[#1c1c1e]">
                <Image
                  src="https://picsum.photos/seed/razikul_fullstack_dev/800/600"
                  alt="MD Razikul Islam Joni - Full Stack Developer"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale contrast-125 group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-transparent to-transparent opacity-80" />
                
                {/* Floating Role Label */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#1c1c1e]/90 backdrop-blur-md border border-[#f5f0e8]/10 text-xs font-mono text-[#f5f0e8] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#e49b58]">{PORTFOLIO_DATA.profile.name}</div>
                    <div className="text-[11px] text-[#8e8a82]">Mirpur, Dhaka, Bangladesh</div>
                  </div>
                  <div className="px-2 py-1 rounded bg-[#b87333]/20 border border-[#b87333]/40 text-[#b87333] text-[10px]">
                    MERN / FULL STACK
                  </div>
                </div>
              </div>

              {/* Quick Spec list */}
              <div className="space-y-2 text-xs font-mono text-[#c8c3bb] p-2">
                <div className="flex justify-between py-1 border-b border-[#f5f0e8]/5">
                  <span className="text-[#8e8a82]">Primary Focus:</span>
                  <span className="text-[#f5f0e8]">React.js / Next.js / Dashboards</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f5f0e8]/5">
                  <span className="text-[#8e8a82]">Core Languages:</span>
                  <span className="text-[#b87333]">TypeScript, JavaScript, Node.js</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8e8a82]">State & Architecture:</span>
                  <span className="text-[#f5f0e8]">Redux Toolkit, RTK Query, REST</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Alternating Row 2: Code Architecture & Core Principles (Left Code, Right Principles) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Code Snippet */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="rounded-2xl bg-[#141416] border border-[#f5f0e8]/15 overflow-hidden shadow-2xl">
              <div className="bg-[#242426] px-4 py-3 border-b border-[#f5f0e8]/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#b87333]/40" />
                  <span className="text-xs font-mono text-[#c8c3bb]">telemetryApi.ts</span>
                  <span className="text-[10px] font-mono text-[#8e8a82] px-1.5 py-0.5 rounded bg-[#1c1c1e]">RTK Query Slice</span>
                </div>
                <button
                  type="button"
                  onClick={copySnippet}
                  id="copy-code-snippet-btn"
                  className="flex items-center gap-1.5 text-xs font-mono text-[#8e8a82] hover:text-[#b87333] transition-colors"
                  title="Copy code snippet"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-[#c8c3bb] overflow-x-auto leading-relaxed bg-[#141416]">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Right Column: 4 Core Architectural Principles */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="text-xs font-mono text-[#b87333] uppercase tracking-widest font-semibold">
              {"// Core Architectural Pillars"}
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#f5f0e8] font-['Space_Grotesk']">
              Engineered for Speed, Reliability & User Clarity
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {PORTFOLIO_DATA.profile.corePrinciples.map((principle, idx) => (
                <div
                  key={principle.title}
                  id={`principle-card-${idx}`}
                  className="p-4 rounded-xl bg-[#242426] border border-[#f5f0e8]/10 hover:border-[#b87333]/40 transition-all hover:bg-[#2c2c2e]"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1c1c1e] text-[#b87333] flex items-center justify-center text-xs font-mono font-bold mb-3 border border-[#b87333]/30">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-semibold text-[#f5f0e8] mb-1.5">
                    {principle.title}
                  </h4>
                  <p className="text-xs text-[#c8c3bb] leading-relaxed font-light">
                    {principle.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
