"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  Award,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string>(PORTFOLIO_DATA.experience[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="experience"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#1c1c1e] dark:bg-[#1c1c1e] light:bg-[#f8f5ef] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c2c2e] border border-[#b87333]/30 text-xs font-mono text-[#b87333] mb-4">
            <Briefcase className="w-3.5 h-3.5 text-[#e49b58]" />
            <span>CHRONOLOGICAL LEADERSHIP & ENGINEERING IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#f5f0e8] tracking-tight font-['Space_Grotesk'] max-w-2xl">
            Professional Engineering Track Record
          </h2>
          <p className="mt-4 text-[#c8c3bb] text-base max-w-2xl font-light">
            A chronological journey through software development, scalable web apps, component
            architectures, and reliable product delivery.
          </p>
          <div className="w-16 h-1 bg-[#b87333] mt-6 rounded-full" />
        </div>

        {/* Alternating Timeline Layout */}
        <div className="relative">
          {/* Center Copper Line for desktop */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#b87333] via-[#8c5828] to-[#2c2c2e]" />

          <div className="space-y-16 lg:space-y-20">
            {PORTFOLIO_DATA.experience.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              const isExpanded = expandedId === exp.id;

              return (
                <div
                  key={exp.id}
                  id={`experience-node-${exp.id}`}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    isEven ? "lg:flex-row-reverse" : ""
                  } gap-8 lg:gap-16`}
                >
                  {/* Timeline Center Node Badge */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#1c1c1e] border-2 border-[#b87333] items-center justify-center text-[#b87333] font-mono text-xs font-bold shadow-[0_0_15px_rgba(184,115,51,0.5)] z-10">
                    0{idx + 1}
                  </div>

                  {/* Date / Location Summary Badge (Opposite Side) */}
                  <div
                    className={`w-full lg:w-1/2 ${isEven ? "lg:text-right" : "lg:text-left"} space-y-2`}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#242426] border border-[#f5f0e8]/10 text-xs font-mono text-[#b87333]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#8e8a82] justify-start lg:justify-inherit">
                      <MapPin className="w-3.5 h-3.5 text-[#8e8a82]" />
                      <span>{exp.location}</span>
                      {exp.badge && (
                        <span className="px-2 py-0.5 rounded bg-[#b87333]/20 border border-[#b87333]/40 text-[#e49b58] text-[10px]">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main Experience Card */}
                  <div className="w-full lg:w-1/2">
                    <div className="p-6 sm:p-8 rounded-3xl bg-[#242426] border border-[#f5f0e8]/10 hover:border-[#b87333]/50 transition-all duration-300 shadow-xl group">
                      {/* Role & Company */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-[#f5f0e8] font-['Space_Grotesk'] group-hover:text-[#e49b58] transition-colors">
                            {exp.role}
                          </h3>
                          <div className="text-sm font-semibold text-[#b87333] mt-0.5">
                            {exp.company}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(exp.id)}
                          aria-label={isExpanded ? "Collapse deep dive" : "Expand deep dive"}
                          className="p-2 rounded-xl bg-[#1c1c1e] text-[#8e8a82] hover:text-[#f5f0e8] border border-[#f5f0e8]/10 transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Summary */}
                      <p className="text-sm text-[#c8c3bb] leading-relaxed mb-6 font-light">
                        {exp.summary}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-3 mb-6">
                        {exp.highlights.map((highlight, hIdx) => (
                          <div
                            key={hIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-[#c8c3bb]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b87333] mt-2 shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Expandable Deep Dive Architecture Wins */}
                      {isExpanded && (
                        <div className="p-4 rounded-2xl bg-[#1c1c1e] border border-[#b87333]/30 mb-6 space-y-2 animate-fade-in">
                          <div className="text-xs font-mono font-bold text-[#e49b58] uppercase tracking-wider flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-[#b87333]" />
                            <span>Key Architectural Milestones</span>
                          </div>
                          {exp.architectureWins.map((win, wIdx) => (
                            <div
                              key={wIdx}
                              className="text-xs text-[#c8c3bb] font-mono leading-relaxed pl-2 border-l border-[#b87333]/40"
                            >
                              {win}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Technologies Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#f5f0e8]/10">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-[#1c1c1e] border border-[#f5f0e8]/5 text-[11px] font-mono text-[#8e8a82]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
