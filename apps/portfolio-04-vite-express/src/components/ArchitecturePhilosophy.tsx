import React from 'react';
import { Compass, Sparkles, CheckCircle2, Shield, Scale, Zap, Activity } from 'lucide-react';
import { ARCHITECTURE_TENETS } from '../data/portfolioData';

export const ArchitecturePhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono text-amber-400">
            <Compass className="w-3.5 h-3.5" />
            <span>ARCHITECTURAL PHILOSOPHY & CORE TENETS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-100">
            Guiding Principles for Resilient Systems
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Technology stacks change rapidly, but fundamental distributed systems principles remain constant. These core engineering tenets guide every architectural decision I make.
          </p>
        </div>

        {/* Tenets Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {ARCHITECTURE_TENETS.map((tenet) => (
            <div
              key={tenet.id}
              id={`tenet-card-${tenet.id}`}
              className="p-6 sm:p-7 rounded-2xl bg-[#0E1117] border border-neutral-800 hover:border-neutral-700 transition-colors space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-mono text-amber-400/80">
                    {tenet.number}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                    Architectural Standard
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-neutral-100">
                    {tenet.title}
                  </h3>
                  <div className="text-xs font-mono text-amber-300 mt-0.5">
                    "{tenet.subtitle}"
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {tenet.description}
                </p>
              </div>

              {/* Rule of thumb */}
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800/80 text-xs font-mono text-neutral-300">
                <span className="text-emerald-400 font-semibold">Rule of Thumb: </span>
                <span>{tenet.ruleOfThumb}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
