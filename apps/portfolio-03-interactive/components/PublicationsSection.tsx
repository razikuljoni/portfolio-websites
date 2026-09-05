"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA, Publication } from "@/lib/portfolio-data";
import { BookOpen, Calendar, Clock, ArrowUpRight, FileText, CheckCircle2 } from "lucide-react";

export default function PublicationsSection() {
  const [activePaper, setActivePaper] = useState<Publication | null>(null);

  return (
    <section
      id="publications"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#141416] dark:bg-[#141416] light:bg-[#eee8de] border-t border-[#f5f0e8]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#242426] border border-[#b87333]/30 text-xs font-mono text-[#b87333] mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#e49b58]" />
            <span>TECHNICAL WRITING & ENGINEERING GUIDES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#f5f0e8] tracking-tight font-['Space_Grotesk'] max-w-2xl">
            Articles, Case Studies & Guides
          </h2>
          <p className="mt-4 text-[#c8c3bb] text-base max-w-2xl font-light">
            Technical articles on modern React architecture, full-stack state synchronizations,
            RESTful API design, and web performance optimizations.
          </p>
          <div className="w-16 h-1 bg-[#b87333] mt-6 rounded-full" />
        </div>

        {/* 3-Column Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PORTFOLIO_DATA.publications.map((pub, idx) => (
            <div
              key={pub.id}
              id={`publication-card-${pub.id}`}
              className="p-6 sm:p-8 rounded-3xl bg-[#1c1c1e] border border-[#f5f0e8]/10 hover:border-[#b87333]/50 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Header Tag & Meta */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-[#242426] text-[#b87333] text-[11px] font-mono border border-[#b87333]/30">
                    {pub.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8e8a82]">
                    <Clock className="w-3 h-3" />
                    <span>{pub.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#f5f0e8] font-['Space_Grotesk'] group-hover:text-[#e49b58] transition-colors leading-snug mb-3">
                  {pub.title}
                </h3>

                {/* Abstract */}
                <p className="text-xs sm:text-sm text-[#c8c3bb] font-light leading-relaxed mb-6">
                  {pub.abstract}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-[#242426] text-[10px] font-mono text-[#8e8a82]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Trigger Button */}
                <button
                  type="button"
                  id={`read-paper-btn-${pub.id}`}
                  onClick={() => setActivePaper(pub)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#242426] group-hover:bg-[#b87333] text-[#c8c3bb] group-hover:text-[#f5f0e8] text-xs font-mono transition-all"
                >
                  <span>{pub.linkText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#b87333] group-hover:text-[#f5f0e8]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paper Reader Modal */}
      {activePaper && (
        <div
          id="paper-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePaper(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#1c1c1e] border border-[#b87333]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#f5f0e8]/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#b87333]">
                <FileText className="w-4 h-4 text-[#e49b58]" />
                <span>
                  {activePaper.type} • {activePaper.date}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActivePaper(null)}
                className="p-1.5 rounded-lg bg-[#242426] text-[#c8c3bb] hover:text-[#f5f0e8]"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#f5f0e8] font-['Space_Grotesk'] mb-2">
                {activePaper.title}
              </h3>
              <p className="text-xs font-mono text-[#8e8a82]">
                Author: {PORTFOLIO_DATA.profile.name} • {activePaper.readTime}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#242426] border border-[#f5f0e8]/10 space-y-3">
              <div className="text-xs font-mono text-[#e49b58] uppercase font-bold">
                Executive Synopsis:
              </div>
              <p className="text-sm text-[#c8c3bb] leading-relaxed font-light">
                {activePaper.abstract}
              </p>
              <div className="pt-2 text-xs text-[#8e8a82]">
                Key Keywords: {activePaper.tags.join(", ")}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActivePaper(null)}
                className="px-5 py-2.5 rounded-xl bg-[#2c2c2e] text-[#c8c3bb] hover:text-[#f5f0e8] text-xs font-mono"
              >
                Close Preview
              </button>
              <a
                href="#contact"
                onClick={() => setActivePaper(null)}
                className="px-5 py-2.5 rounded-xl bg-[#b87333] hover:bg-[#c98240] text-[#f5f0e8] text-xs font-semibold"
              >
                Request Full Technical Paper
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
