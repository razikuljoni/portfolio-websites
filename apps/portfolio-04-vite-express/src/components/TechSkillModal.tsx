import React, { useState, useEffect } from 'react';
import { X, Cpu, Code2, Binary, Terminal, Database, Layout, Globe, Palette, Radio, Workflow, Network, Zap, Server, Boxes, FolderGit2, ShieldCheck, Activity, Sparkles, Search, BarChart3, CheckCircle2, ChevronRight, Copy, Check, ArrowRight } from 'lucide-react';
import { TechSkill, CaseStudy } from '../types';
import { CASE_STUDIES } from '../data/portfolioData';

interface TechSkillModalProps {
  skill: TechSkill | null;
  onClose: () => void;
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
}

export const TechSkillModal: React.FC<TechSkillModalProps> = ({ skill, onClose, onSelectCaseStudy }) => {
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!skill) return null;

  const renderIcon = (name: string) => {
    const iconProps = { className: "w-6 h-6 text-amber-400" };
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
      default: return <Cpu {...iconProps} />;
    }
  };

  const handleCopyCode = () => {
    if (skill.codeSample) {
      navigator.clipboard.writeText(skill.codeSample.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const relatedCaseStudies = CASE_STUDIES.filter((c) =>
    c.techStackIds.includes(skill.id)
  );

  return (
    <div
      id="tech-skill-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="tech-skill-modal-container"
        className="relative w-full max-w-2xl bg-[#0E1117] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#161B22] border-b border-neutral-800 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700/80 flex items-center justify-center shadow-inner">
              {renderIcon(skill.iconName)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-neutral-100">
                  {skill.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  {skill.level}
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400 mt-0.5">
                {skill.yearsOfExp} Years Production Experience • Domain: {skill.category.replace('_', ' ').toUpperCase()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-tech-skill-modal-btn"
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-neutral-300">
          {/* Summary */}
          <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-300 leading-relaxed">
            {skill.description}
          </div>

          {/* Architectural Patterns */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2">
              Architectural Design Patterns Applied
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.architecturalPatterns.map((pat, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200"
                >
                  {pat}
                </span>
              ))}
            </div>
          </div>

          {/* Production Highlights */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2.5">
              Production Battle-Tested Highlights
            </div>
            <div className="space-y-2">
              {skill.productionHighlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Sample */}
          {skill.codeSample && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-amber-400 font-semibold">
                  {skill.codeSample.title}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1 hover:text-neutral-200 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Snippet'}</span>
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-black/90 border border-neutral-800 overflow-x-auto text-[11px] font-mono text-neutral-300 leading-relaxed">
                <pre>{skill.codeSample.code}</pre>
              </div>
            </div>
          )}

          {/* Related Case Studies */}
          {relatedCaseStudies.length > 0 && (
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2.5">
                Case Studies Featuring this Tech
              </div>
              <div className="space-y-2">
                {relatedCaseStudies.map((study) => (
                  <button
                    key={study.id}
                    onClick={() => {
                      onClose();
                      onSelectCaseStudy(study);
                    }}
                    className="w-full text-left p-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-neutral-200 group-hover:text-amber-300 transition-colors">
                        {study.title}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-400">
                        {study.category} • {study.scale}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#161B22] border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-950 bg-neutral-100 hover:bg-white transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
