'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/portfolio-data';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  ExternalLink, 
  Github, 
  Layers,
  Cpu,
  CheckCircle2
} from 'lucide-react';

interface LightboxModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

export default function LightboxModal({
  project,
  allProjects,
  onClose,
  onSelectProject,
}: LightboxModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!project) return;

      const currentIndex = allProjects.findIndex((p) => p.id === project.id);
      if (e.key === 'ArrowRight') {
        const next = allProjects[(currentIndex + 1) % allProjects.length];
        setZoomLevel(1);
        onSelectProject(next);
      } else if (e.key === 'ArrowLeft') {
        const prev = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
        setZoomLevel(1);
        onSelectProject(prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, allProjects, onClose, onSelectProject]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const handlePrev = () => {
    const prev = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
    onSelectProject(prev);
  };
  const handleNext = () => {
    const next = allProjects[(currentIndex + 1) % allProjects.length];
    onSelectProject(next);
  };

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div
        id="lightbox-container"
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#1c1c1e] border border-[#b87333]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Controls */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#242426] border-b border-[#f5f0e8]/10 text-xs font-mono text-[#8e8a82]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#b87333]/20 border border-[#b87333]/40 text-[#e49b58] font-bold">
              {project.category}
            </span>
            <span className="text-[#f5f0e8] font-semibold text-sm hidden sm:inline">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <button
              type="button"
              id="lightbox-zoom-out"
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
              className="p-2 rounded-lg bg-[#1c1c1e] text-[#c8c3bb] hover:text-[#f5f0e8] transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] w-12 text-center text-[#8e8a82]">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              id="lightbox-zoom-in"
              onClick={() => setZoomLevel((z) => Math.min(2, z + 0.2))}
              className="p-2 rounded-lg bg-[#1c1c1e] text-[#c8c3bb] hover:text-[#f5f0e8] transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              type="button"
              id="lightbox-close-btn"
              onClick={onClose}
              className="p-2 ml-2 rounded-lg bg-[#2c2c2e] hover:bg-[#b87333] text-[#f5f0e8] transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Main Diagram / Architecture Image View with Zoom */}
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-[#141416] border border-[#f5f0e8]/10 flex items-center justify-center">
            <div
              className="relative w-full h-full transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <Image
                src={project.diagramUrl || project.image}
                alt={`${project.title} Architecture Diagram`}
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
                sizes="(max-width: 1200px) 100vw, 1000px"
              />
            </div>
            
            {/* Quick Prev / Next overlay buttons */}
            <button
              type="button"
              id="lightbox-prev-btn"
              onClick={handlePrev}
              aria-label="Previous project"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#b87333] text-[#f5f0e8] backdrop-blur-md transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              id="lightbox-next-btn"
              onClick={handleNext}
              aria-label="Next project"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#b87333] text-[#f5f0e8] backdrop-blur-md transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Project Technical Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1 & 2: Overview & Engineering Solution */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-[#f5f0e8] font-['Space_Grotesk']">
                  {project.title}
                </h3>
                <p className="text-sm text-[#b87333] font-mono mt-0.5">
                  {project.subtitle}
                </p>
              </div>

              <p className="text-sm text-[#c8c3bb] leading-relaxed font-light">
                {project.description}
              </p>

              <div className="p-4 rounded-2xl bg-[#242426] border border-[#f5f0e8]/10 space-y-2">
                <div className="text-xs font-mono text-[#e49b58] font-bold uppercase">
                  Technical Challenge:
                </div>
                <p className="text-xs text-[#c8c3bb] font-light">
                  {project.challenge}
                </p>
                <div className="text-xs font-mono text-[#34d399] font-bold uppercase pt-2">
                  Architectural Solution:
                </div>
                <p className="text-xs text-[#c8c3bb] font-light">
                  {project.solution}
                </p>
              </div>

              {/* Verified Production Impact */}
              <div>
                <div className="text-xs font-mono text-[#8e8a82] uppercase mb-2">
                  Key Architectural Wins:
                </div>
                <ul className="space-y-1.5">
                  {project.impact.map((imp, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#c8c3bb]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#b87333] shrink-0" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3: Telemetry Metrics & Links */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#242426] border border-[#f5f0e8]/10 space-y-3">
                <div className="text-xs font-mono text-[#8e8a82] uppercase">
                  Telemetry Benchmarks
                </div>
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex justify-between items-center py-1.5 border-b border-[#f5f0e8]/5">
                    <span className="text-xs text-[#8e8a82]">{m.label}</span>
                    <span className="text-xs font-mono font-bold text-[#e49b58]">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div>
                <div className="text-xs font-mono text-[#8e8a82] uppercase mb-2">
                  Stack Primitives
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-[#1c1c1e] border border-[#b87333]/30 text-[11px] font-mono text-[#c8c3bb]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#b87333] hover:bg-[#c98240] text-[#f5f0e8] text-xs font-semibold transition-colors"
                  >
                    <span>Launch Live Interactive Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2c2c2e] hover:bg-[#38383b] text-[#c8c3bb] hover:text-[#f5f0e8] text-xs font-mono border border-[#f5f0e8]/10 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-[#b87333]" />
                    <span>View Repository & Source</span>
                  </a>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Modal Bottom Status */}
        <div className="px-6 py-3 bg-[#242426] border-t border-[#f5f0e8]/10 flex items-center justify-between text-[11px] font-mono text-[#8e8a82]">
          <span>Use ← and → keys to navigate architectures</span>
          <span>Project {currentIndex + 1} of {allProjects.length}</span>
        </div>
      </div>
    </div>
  );
}
