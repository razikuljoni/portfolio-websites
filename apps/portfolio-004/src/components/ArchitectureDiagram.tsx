import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, CheckCircle2, ArrowRight, ShieldCheck, Activity, Database, Server, Radio, Workflow, Zap } from 'lucide-react';
import { CaseStudy } from '../types';

interface ArchitectureDiagramProps {
  caseStudy: CaseStudy;
  interactive?: boolean;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ caseStudy, interactive = true }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = caseStudy.architecturalSolution.diagramSteps;

  // Auto-play interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, steps.length]);

  const activeStepData = steps[currentStep] || steps[0];

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Radio className="w-4 h-4 text-sky-400" />;
      case 1:
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 2:
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 3:
        return <Workflow className="w-4 h-4 text-indigo-400" />;
      default:
        return <Server className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="rounded-xl border border-neutral-800 bg-[#0A0D14] p-4 sm:p-5 overflow-hidden space-y-4">
      {/* Top Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-800/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-neutral-300 uppercase tracking-wider text-[11px] font-semibold">
            Interactive Architecture Pipeline
          </span>
        </div>

        {interactive && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              id="diagram-play-pause-btn"
              className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'Pause Flow' : 'Auto Play'}</span>
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep(0);
              }}
              id="diagram-reset-btn"
              className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Reset"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Visual Step Node Track */}
      <div className="relative py-3">
        {/* Connection Wire */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-neutral-800 pointer-events-none" />

        {/* Dynamic Highlight Line */}
        <div
          className="absolute top-1/2 left-4 -translate-y-1/2 h-0.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 transition-all duration-500 pointer-events-none"
          style={{
            width: `calc(${(currentStep / (steps.length - 1)) * 100}% - 2rem)`
          }}
        />

        {/* Nodes Grid */}
        <div className="relative flex justify-between items-center gap-2">
          {steps.map((s, idx) => {
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;

            return (
              <button
                key={s.step}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep(idx);
                }}
                id={`diagram-node-step-${idx}`}
                className={`group flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer transition-all z-10`}
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
                    isActive
                      ? 'bg-neutral-800 border-2 border-amber-400 text-amber-300 scale-110 shadow-amber-400/20'
                      : isCompleted
                      ? 'bg-neutral-900 border border-emerald-500/80 text-emerald-400'
                      : 'bg-neutral-950 border border-neutral-800 text-neutral-500 hover:border-neutral-700'
                  }`}
                >
                  {getStepIcon(idx)}
                </div>
                <span
                  className={`text-[10px] font-mono text-center max-w-[65px] sm:max-w-[90px] truncate transition-colors ${
                    isActive ? 'text-amber-300 font-semibold' : 'text-neutral-500 group-hover:text-neutral-300'
                  }`}
                >
                  Step {s.step}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Node Detail Card */}
      <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2.5 transition-all">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono text-[10px] font-bold">
              NODE {activeStepData.step} / {steps.length}
            </span>
            <span className="text-xs font-semibold text-neutral-200 font-mono">
              {activeStepData.component}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep((prev) => Math.max(0, prev - 1));
              }}
              disabled={currentStep === 0}
              className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-neutral-300 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
              }}
              disabled={currentStep === steps.length - 1}
              className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-neutral-300 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <h4 className="text-sm font-semibold text-neutral-100">
          {activeStepData.name}
        </h4>

        <p className="text-xs text-neutral-400 leading-relaxed">
          {activeStepData.desc}
        </p>
      </div>
    </div>
  );
};
