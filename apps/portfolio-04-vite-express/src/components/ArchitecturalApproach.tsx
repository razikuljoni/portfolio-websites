import React, { useState } from 'react';
import { Layers, ArrowRight, Activity, ShieldCheck, Scale, Cpu, Sparkles, ExternalLink, ChevronRight, CheckCircle2, Github, Globe } from 'lucide-react';
import { CaseStudy, TechSkill } from '../types';
import { CASE_STUDIES, TECH_SKILLS } from '../data/portfolioData';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface ArchitecturalApproachProps {
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
  onSelectSkill: (skill: TechSkill) => void;
}

export const ArchitecturalApproach: React.FC<ArchitecturalApproachProps> = ({ onSelectCaseStudy, onSelectSkill }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Full-Stack Commerce', label: 'Full-Stack Commerce' },
    { id: 'Enterprise Systems', label: 'Enterprise Systems' },
    { id: 'Performance & Web Platform', label: 'Performance & Web' },
    { id: 'Data Visualization', label: 'Data Visualization' },
    { id: 'Developer Tooling', label: 'Developer Tooling' },
  ];

  const filteredCaseStudies = selectedCategory === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.category === selectedCategory);

  return (
    <section id="architecture" className="py-20 border-t border-neutral-800/80 relative">
      {/* Background Accent */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono text-amber-400">
              <Layers className="w-3.5 h-3.5" />
              <span>FEATURED ENGINEERING WORK & CASE STUDIES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-100">
              High-Performance Products & Dashboards
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
              Deep dives into production web applications, enterprise monitoring suites, and developer tools I have engineered. Each case study details system architecture, state management patterns, and verified production benchmarks.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#0E1117] border border-neutral-800 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                id={`arch-filter-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-neutral-800 text-neutral-100 font-medium border border-neutral-700 shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredCaseStudies.map((study) => {
            const resolvedSkills = study.techStackIds
              .map((id) => TECH_SKILLS.find((s) => s.id === id))
              .filter(Boolean) as TechSkill[];

            return (
              <div
                key={study.id}
                id={`case-study-card-${study.id}`}
                className="rounded-2xl border border-neutral-800 bg-[#0E1117] hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl group"
              >
                {/* Card Top Banner */}
                <div className="p-6 pb-4 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-neutral-900 text-amber-400 border border-neutral-800">
                      {study.category}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                      <span>{study.clientOrDomain}</span>
                      <span>•</span>
                      <span>{study.year}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 leading-relaxed">
                      {study.tagline}
                    </p>
                  </div>

                  {/* Metrics Snapshot */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {study.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800/80"
                      >
                        <div className="text-[10px] text-neutral-400 truncate">{m.label}</div>
                        <div className="text-sm font-bold font-mono text-neutral-100 mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Diagram Preview Inside Card */}
                <div className="px-6 py-2">
                  <ArchitectureDiagram caseStudy={study} interactive={false} />
                </div>

                {/* Card Footer: Tech Stack & CTA */}
                <div className="p-6 pt-4 border-t border-neutral-800/80 bg-[#161B22]/50 space-y-4">
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] font-mono text-neutral-400 mr-1">Stack:</span>
                    {resolvedSkills.slice(0, 5).map((skill) => (
                      <button
                        key={skill.id}
                        onClick={() => onSelectSkill(skill)}
                        className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-[10px] font-mono text-neutral-300 border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer"
                      >
                        {skill.name}
                      </button>
                    ))}
                    {resolvedSkills.length > 5 && (
                      <span className="text-[10px] font-mono text-neutral-400">
                        +{resolvedSkills.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Primary Blueprint CTA & Links */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-mono text-emerald-400 font-semibold truncate max-w-[200px]">
                      {study.scale}
                    </span>
                    <div className="flex items-center gap-2">
                      {study.githubUrl && (
                        <a
                          href={study.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                          title="View Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {study.liveUrl && (
                        <a
                          href={study.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                          title="View Live Site"
                        >
                          <Globe className="w-4 h-4 text-emerald-400" />
                        </a>
                      )}
                      <button
                        onClick={() => onSelectCaseStudy(study)}
                        id={`open-blueprint-${study.id}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-950 bg-neutral-100 hover:bg-white transition-all cursor-pointer shadow-sm"
                      >
                        <span>Deep Dive Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
