import React, { useState, useEffect } from 'react';
import { X, Layers, Activity, ShieldAlert, CheckCircle2, ChevronRight, Scale, Cpu, FileCode2, ExternalLink, ArrowRight } from 'lucide-react';
import { CaseStudy, TechSkill } from '../types';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { TECH_SKILLS } from '../data/portfolioData';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onSelectSkill: (skill: TechSkill) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudy, onClose, onSelectSkill }) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'challenge' | 'adrs' | 'tradeoffs' | 'metrics'>('blueprint');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!caseStudy) return null;

  const resolvedSkills = caseStudy.techStackIds
    .map((id) => TECH_SKILLS.find((s) => s.id === id))
    .filter(Boolean) as TechSkill[];

  return (
    <div
      id="case-study-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="case-study-modal-container"
        className="relative w-full max-w-4xl bg-[#0E1117] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#161B22] border-b border-neutral-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-neutral-800 text-amber-400 border border-neutral-700">
                {caseStudy.category}
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                {caseStudy.clientOrDomain} • {caseStudy.year}
              </span>
              <span className="text-xs text-emerald-400 font-mono font-semibold">
                [{caseStudy.scale}]
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
              {caseStudy.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {caseStudy.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            id="close-case-study-modal-btn"
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 bg-[#0E1117] border-b border-neutral-800 flex overflow-x-auto no-scrollbar gap-2 py-2">
          {[
            { id: 'blueprint', label: 'Architecture Blueprint' },
            { id: 'challenge', label: 'Problem & Constraints' },
            { id: 'adrs', label: 'Architectural Decisions (ADRs)' },
            { id: 'tradeoffs', label: 'Trade-offs & Mitigations' },
            { id: 'metrics', label: 'Production Impact' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              id={`modal-tab-${tab.id}`}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-neutral-800 text-amber-300 font-semibold border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-neutral-300">
          
          {/* TAB 1: BLUEPRINT */}
          {activeTab === 'blueprint' && (
            <div className="space-y-6">
              {/* Architecture Diagram */}
              <ArchitectureDiagram caseStudy={caseStudy} interactive={true} />

              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  Core Architectural Strategy
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {caseStudy.architecturalSolution.coreApproach}
                </p>
              </div>

              {/* Connected Tech Stack */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5">
                  Core Technologies in this Architecture (Click to inspect)
                </div>
                <div className="flex flex-wrap gap-2">
                  {resolvedSkills.map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => onSelectSkill(skill)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-xs font-mono text-neutral-200 hover:text-amber-300 transition-colors cursor-pointer group"
                    >
                      <Cpu className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400" />
                      <span>{skill.name}</span>
                      <ChevronRight className="w-3 h-3 text-neutral-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CHALLENGE */}
          {activeTab === 'challenge' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  System Context & Baseline
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {caseStudy.challenge.context}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-rose-900/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Bottlenecks & Pain Points</span>
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-300">
                    {caseStudy.challenge.painPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/80 border border-amber-900/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                    <Scale className="w-4 h-4" />
                    <span>Hard Engineering Constraints</span>
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-300">
                    {caseStudy.challenge.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ADRs */}
          {activeTab === 'adrs' && (
            <div className="space-y-4">
              <div className="text-xs text-neutral-400 font-mono">
                Architectural Decision Records (ADRs) and Trade-off evaluations:
              </div>
              <div className="space-y-3">
                {caseStudy.architecturalSolution.keyDecisions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-amber-400 font-semibold">
                        ADR-{idx + 1}: {item.decision}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                        ACCEPTED
                      </span>
                    </div>

                    <div className="text-xs text-neutral-300 leading-relaxed">
                      <strong className="text-neutral-100">Rationale: </strong>
                      {item.rationale}
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-neutral-800/80 text-[11px] text-neutral-400">
                      <span className="text-neutral-500 font-mono">Alternative Rejected: </span>
                      {item.alternativeConsidered}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TRADEOFFS */}
          {activeTab === 'tradeoffs' && (
            <div className="space-y-4">
              <div className="text-xs text-neutral-400 font-mono">
                System design is the science of deliberate trade-offs:
              </div>
              <div className="space-y-3">
                {caseStudy.tradeoffs.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2"
                  >
                    <div className="text-xs font-semibold text-amber-300 font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>Accepted System Cost #{idx + 1}</span>
                    </div>
                    <p className="text-xs text-neutral-300">
                      {item.accepted}
                    </p>
                    <div className="pt-1 text-xs text-emerald-400 font-mono">
                      <strong className="text-neutral-200">Mitigation Strategy: </strong>
                      {item.mitigation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: METRICS & DELIVERABLES */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  Production Impact & Telemetry Benchmarks
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {caseStudy.metrics.map((m, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                      <div className="text-[11px] text-neutral-400">{m.label}</div>
                      <div className="text-xl font-bold font-mono text-neutral-100 mt-1">
                        {m.value}
                      </div>
                      <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                        {m.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  Key Delivered Artifacts & Blueprints
                </div>
                <div className="space-y-2">
                  {caseStudy.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#161B22] border-t border-neutral-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400">
              Project ID: {caseStudy.id}
            </span>
            {caseStudy.githubUrl && (
              <a
                href={caseStudy.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-neutral-300 hover:text-white inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800"
              >
                <span>View GitHub Repo</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>
            )}
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-950 bg-neutral-100 hover:bg-white transition-colors cursor-pointer"
          >
            Close Blueprint
          </button>
        </div>

      </div>
    </div>
  );
};
