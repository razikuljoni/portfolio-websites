"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_DATA, Project } from "@/lib/portfolio-data";
import LightboxModal from "./LightboxModal";
import {
  Layers,
  ExternalLink,
  Github,
  Maximize2,
  Zap,
  CheckCircle2,
  Cpu,
  ArrowUpRight,
} from "lucide-react";

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeLightboxProject, setActiveLightboxProject] = useState<Project | null>(null);

  const categories = [
    "All",
    "Full-Stack Apps",
    "Frontend & Dashboards",
    "Web Applications",
    "Developer Tooling",
  ];

  const filteredProjects: Project[] = PORTFOLIO_DATA.projects.filter(
    (p: Project) => selectedCategory === "All" || p.category === selectedCategory
  );

  return (
    <section
      id="projects"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#141416] dark:bg-[#141416] light:bg-[#eee8de] border-t border-[#f5f0e8]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#242426] border border-[#b87333]/30 text-xs font-mono text-[#b87333] mb-4">
            <Layers className="w-3.5 h-3.5 text-[#e49b58]" />
            <span>FEATURED PROJECTS & CODEBASES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#f5f0e8] tracking-tight font-['Space_Grotesk'] max-w-3xl">
            Full-Stack Web Applications, Dashboards & Developer Tooling
          </h2>
          <p className="mt-4 text-[#c8c3bb] text-base max-w-2xl font-light">
            Production e-commerce monorepos, high-performance Next.js portals, data-heavy
            dashboards, and open-source VS Code suites.
          </p>
          <div className="w-16 h-1 bg-[#b87333] mt-6 rounded-full" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              id={`project-category-btn-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-[#b87333] text-[#f5f0e8] shadow-[0_0_15px_rgba(184,115,51,0.4)]"
                  : "bg-[#1c1c1e] text-[#c8c3bb] hover:text-[#f5f0e8] border border-[#f5f0e8]/10 hover:border-[#b87333]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Alternating Left-Right Single Column Project Showcase */}
        <div className="space-y-20 lg:space-y-28">
          {filteredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={project.id}
                id={`project-item-${project.id}`}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                  isEven ? "" : "lg:grid-flow-dense"
                }`}
              >
                {/* Visual / Architecture Diagram Card (Alternating) */}
                <div
                  className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2 lg:col-start-7"}`}
                >
                  <div
                    className="relative group rounded-3xl bg-[#1c1c1e] border border-[#f5f0e8]/10 hover:border-[#b87333]/60 transition-all duration-500 overflow-hidden shadow-2xl cursor-pointer"
                    onClick={() => setActiveLightboxProject(project)}
                  >
                    {/* Top Bar with mock URL / status */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#242426] border-b border-[#f5f0e8]/10 text-xs font-mono text-[#8e8a82]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        <span className="text-[11px] text-[#c8c3bb] ml-2">
                          arch://{project.id}.spec
                        </span>
                      </div>
                      <span className="text-[10px] text-[#b87333] uppercase">
                        Click to inspect specs
                      </span>
                    </div>

                    {/* Image Preview with Hover Overlay */}
                    <div className="relative aspect-[16/10] w-full bg-[#141416] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} Preview`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale contrast-125 group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                        sizes="(max-width: 1024px) 100vw, 600px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-transparent to-transparent opacity-70" />

                      {/* Expand / Lightbox Indicator Button */}
                      <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 backdrop-blur-md text-[#f5f0e8] group-hover:bg-[#b87333] transition-colors">
                        <Maximize2 className="w-4 h-4" />
                      </div>

                      {/* Floating Key Metrics Pill */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-2xl bg-[#1c1c1e]/90 backdrop-blur-md border border-[#f5f0e8]/10 text-xs font-mono">
                        {project.metrics.slice(0, 2).map((m) => (
                          <div key={m.label} className="flex flex-col">
                            <span className="text-[10px] text-[#8e8a82]">{m.label}</span>
                            <span className="text-[#e49b58] font-bold">{m.value}</span>
                          </div>
                        ))}
                        <div className="text-[10px] text-[#34d399] font-mono flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                          <span>Production Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Context & Details (Alternating) */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1 lg:col-start-1"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-[#242426] border border-[#b87333]/30 text-xs font-mono text-[#b87333]">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-xs font-mono text-[#e49b58] flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Featured System</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f0e8] font-['Space_Grotesk']">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#c8c3bb] leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Impact Highlights */}
                  <div className="space-y-2">
                    {project.impact.map((imp, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#c8c3bb]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#b87333] shrink-0 mt-0.5" />
                        <span>{imp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-[#1c1c1e] border border-[#f5f0e8]/10 text-xs font-mono text-[#8e8a82]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Row */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      type="button"
                      id={`project-inspect-btn-${project.id}`}
                      onClick={() => setActiveLightboxProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#b87333] hover:bg-[#c98240] text-[#f5f0e8] text-xs font-semibold shadow-md transition-all"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect Architecture Lightbox</span>
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#242426] hover:bg-[#2c2c2e] text-[#c8c3bb] hover:text-[#f5f0e8] border border-[#f5f0e8]/10 text-xs font-mono transition-all"
                      >
                        <Github className="w-3.5 h-3.5 text-[#b87333]" />
                        <span>Repository</span>
                      </a>
                    )}

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#b87333] hover:text-[#e49b58] transition-colors"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxProject && (
        <LightboxModal
          project={activeLightboxProject}
          allProjects={filteredProjects}
          onClose={() => setActiveLightboxProject(null)}
          onSelectProject={(p) => setActiveLightboxProject(p)}
        />
      )}
    </section>
  );
}
