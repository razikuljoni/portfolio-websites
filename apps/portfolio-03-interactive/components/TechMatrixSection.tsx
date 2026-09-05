"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { Cpu, Cloud, Database, Sparkles, Search, Layers, CheckCircle2 } from "lucide-react";

export default function TechMatrixSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", ...PORTFOLIO_DATA.skillCategories.map((c) => c.title)];

  // Filter skills based on category and search query
  const filteredCategories = PORTFOLIO_DATA.skillCategories
    .filter((cat) => selectedCategory === "All" || cat.title === selectedCategory)
    .map((cat) => {
      const matchingSkills = cat.skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return {
        ...cat,
        skills: matchingSkills,
      };
    })
    .filter((cat) => cat.skills.length > 0);

  const getCategoryIcon = (title: string) => {
    if (title.includes("Frontend")) return Layers;
    if (title.includes("Backend")) return Cpu;
    if (title.includes("Database")) return Database;
    if (title.includes("DevOps")) return Cloud;
    return Sparkles;
  };

  return (
    <section
      id="skills"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#141416] dark:bg-[#141416] light:bg-[#eee8de] border-t border-[#f5f0e8]/10 overflow-hidden"
    >
      {/* Subtle copper grid bg */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#242426] border border-[#b87333]/30 text-xs font-mono text-[#b87333] mb-4">
            <Layers className="w-3.5 h-3.5 text-[#e49b58]" />
            <span>TECHNICAL PROFICIENCY MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#f5f0e8] tracking-tight font-['Space_Grotesk'] max-w-2xl">
            Battle-Tested Tooling & Engineering Stack
          </h2>
          <p className="mt-4 text-[#c8c3bb] text-base max-w-2xl font-light">
            Production-honed proficiencies across modern frontend frameworks, scalable backend APIs,
            predictable state architectures, and robust database systems.
          </p>
          <div className="w-16 h-1 bg-[#b87333] mt-6 rounded-full" />
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                id={`tech-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-[#b87333] text-[#f5f0e8] shadow-[0_0_15px_rgba(184,115,51,0.35)]"
                    : "bg-[#1c1c1e] text-[#c8c3bb] hover:text-[#f5f0e8] border border-[#f5f0e8]/10 hover:border-[#b87333]/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8e8a82]" />
            <input
              type="text"
              id="skills-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full bg-[#1c1c1e] border border-[#f5f0e8]/15 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-[#f5f0e8] placeholder-[#8e8a82] focus:outline-none focus:border-[#b87333] transition-colors"
            />
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="space-y-12">
          {filteredCategories.map((category) => {
            const CatIcon = getCategoryIcon(category.title);
            return (
              <div
                key={category.title}
                id={`category-block-${category.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className="p-6 sm:p-8 rounded-3xl bg-[#1c1c1e] border border-[#f5f0e8]/10 shadow-xl"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#f5f0e8]/10">
                  <div className="w-10 h-10 rounded-xl bg-[#242426] text-[#b87333] flex items-center justify-center border border-[#b87333]/30">
                    <CatIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#f5f0e8] font-['Space_Grotesk']">
                      {category.title}
                    </h3>
                    <p className="text-xs text-[#8e8a82]">{category.description}</p>
                  </div>
                </div>

                {/* Skills 2-Column Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                      className="p-4 rounded-xl bg-[#242426] border border-[#f5f0e8]/5 hover:border-[#b87333]/40 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#f5f0e8] group-hover:text-[#e49b58] transition-colors">
                            {skill.name}
                          </span>
                          {skill.featured && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#b87333]/20 text-[#b87333] border border-[#b87333]/40">
                              Core Stack
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-[#8e8a82]">
                          {skill.experienceYears}
                        </span>
                      </div>

                      <p className="text-xs text-[#c8c3bb] mb-3 font-light leading-relaxed">
                        {skill.description}
                      </p>

                      {/* Proficiency Meter */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-[#1c1c1e] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#b87333] to-[#e49b58]"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-[#8e8a82]">{skill.level}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
