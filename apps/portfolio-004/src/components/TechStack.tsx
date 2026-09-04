import React, { useState } from 'react';
import { Cpu, Code2, Binary, Terminal, Database, Layout, Globe, Palette, Radio, Workflow, Network, Zap, Server, Boxes, FolderGit2, ShieldCheck, Activity, Sparkles, Search, BarChart3, ChevronRight, Filter } from 'lucide-react';
import { TechSkill } from '../types';
import { TECH_SKILLS } from '../data/portfolioData';

interface TechStackProps {
  onSelectSkill: (skill: TechSkill) => void;
}

export const TechStack: React.FC<TechStackProps> = ({ onSelectSkill }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'languages', label: 'Languages' },
    { id: 'frontend', label: 'Frontend & State' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'cloud', label: 'Databases & Delivery' },
    { id: 'ai_data', label: 'AI & Developer Tools' },
  ];

  const filteredSkills = TECH_SKILLS.filter((skill) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.architecturalPatterns.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const renderSkillIcon = (name: string) => {
    const iconProps = { className: "w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" };
    switch (name) {
      case 'Code2': return <Code2 {...iconProps} />;
      case 'Cpu': return <Cpu {...iconProps} />;
      case 'Binary': return <Binary {...iconProps} />;
      case 'Terminal': return <Terminal {...iconProps} />;
      case 'Database': return <Database {...iconProps} />;
      case 'Layout': return <Layout {...iconProps} />;
      case 'Globe': return <Globe {...iconProps} />;
      case 'Palette': return <Palette {...iconProps} />;
      case 'Radio': return <Radio {...iconProps} />;
      case 'Workflow': return <Workflow {...iconProps} />;
      case 'Network': return <Network {...iconProps} />;
      case 'Zap': return <Zap {...iconProps} />;
      case 'Server': return <Server {...iconProps} />;
      case 'Boxes': return <Boxes {...iconProps} />;
      case 'FolderGit2': return <FolderGit2 {...iconProps} />;
      case 'ShieldCheck': return <ShieldCheck {...iconProps} />;
      case 'Activity': return <Activity {...iconProps} />;
      case 'Sparkles': return <Sparkles {...iconProps} />;
      case 'Search': return <Search {...iconProps} />;
      case 'BarChart3': return <BarChart3 {...iconProps} />;
      default: return <Code2 {...iconProps} />;
    }
  };

  return (
    <section id="tech-stack" className="py-20 border-t border-neutral-800/80 relative">
      {/* Background Accent */}
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono text-amber-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>TECHNICAL STRENGTHS & CAPABILITY MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-100">
              Battle-Tested Technologies & Tooling
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
              An interactive matrix of frontend frameworks, state managers, backend APIs, databases, and tooling. Click any capability to inspect production patterns, code samples, and benchmarked highlights.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill, pattern, or tech..."
              id="tech-stack-search-input"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0E1117] border border-neutral-800 focus:border-neutral-700 text-xs font-mono text-neutral-100 placeholder-neutral-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 pb-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              id={`tech-cat-btn-${cat.id}`}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-neutral-800 text-amber-300 font-semibold border border-neutral-700 shadow-xs'
                  : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-neutral-800/80 hover:bg-neutral-850'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              id={`tech-skill-card-${skill.id}`}
              onClick={() => onSelectSkill(skill)}
              className="p-5 rounded-2xl bg-[#0E1117] hover:bg-[#121620] border border-neutral-800 hover:border-neutral-700/90 transition-all duration-200 flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-black/60"
            >
              <div className="space-y-3.5">
                
                {/* Card Top Icon & Level */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 group-hover:border-amber-400/50 flex items-center justify-center transition-colors">
                    {renderSkillIcon(skill.iconName)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-neutral-400">
                      {skill.yearsOfExp} {skill.yearsOfExp === 1 ? 'Yr' : 'Yrs'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-neutral-800 text-amber-400 border border-neutral-700">
                      {skill.level}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Architectural Pattern Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skill.architecturalPatterns.slice(0, 2).map((pattern, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-neutral-900/90 text-neutral-300 text-[10px] font-mono border border-neutral-800"
                    >
                      {pattern}
                    </span>
                  ))}
                </div>

              </div>

              {/* Card Bottom Inspector Trigger */}
              <div className="pt-4 mt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 group-hover:text-neutral-200">
                <span className="font-mono text-[11px]">Inspect Patterns & Code</span>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>

            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-[#0E1117] border border-neutral-800">
            <p className="text-sm font-mono text-neutral-400">
              No matching technologies found for "{searchQuery}". Try clearing search.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
