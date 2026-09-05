"use client";

import React from "react";
import {
  X,
  Download,
  Printer,
  ExternalLink,
  Briefcase,
  Award,
  BookOpen,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div
        id="resume-modal-content"
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#1c1c1e] border border-[#b87333]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#242426] border-b border-[#f5f0e8]/10 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#f5f0e8]">
            <Briefcase className="w-4 h-4 text-[#b87333]" />
            <span className="font-bold">{PORTFOLIO_DATA.profile.name} — Curriculum Vitae</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="resume-print-btn"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c1c1e] hover:bg-[#b87333] text-[#c8c3bb] hover:text-[#f5f0e8] transition-colors"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              type="button"
              id="resume-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#2c2c2e] hover:bg-[#b87333] text-[#f5f0e8] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Resume Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 flex-1 text-[#c8c3bb] text-sm">
          {/* Header Identity */}
          <div className="border-b border-[#f5f0e8]/10 pb-6">
            <h1 className="text-3xl font-bold text-[#f5f0e8] font-['Space_Grotesk']">
              {PORTFOLIO_DATA.profile.name}
            </h1>
            <p className="text-[#b87333] font-mono text-sm mt-1">{PORTFOLIO_DATA.profile.title}</p>
            <div className="flex flex-wrap gap-3 text-xs font-mono text-[#8e8a82] mt-3">
              <span>{PORTFOLIO_DATA.profile.location}</span>
              <span>•</span>
              <span>{PORTFOLIO_DATA.profile.email}</span>
              <span>•</span>
              <span>{PORTFOLIO_DATA.profile.phone}</span>
              <span>•</span>
              <span>2+ Years Production Experience</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-[#e49b58] uppercase tracking-wider">
              Executive Profile
            </h2>
            <p className="text-xs sm:text-sm text-[#c8c3bb] leading-relaxed font-light">
              Results-driven Full Stack (MERN) Developer with 2+ years of professional production
              experience delivering scalable, high-performance web applications using React.js,
              Next.js, and modern JavaScript/TypeScript ecosystems. Proven track record building
              enterprise admin dashboards, business workflow systems, operational tracking
              platforms, and inventory platforms with seamless REST API integration and predictable
              state management (Redux Toolkit, RTK Query, TanStack Query).
            </p>
          </div>

          {/* Core Technical Arsenal */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-[#e49b58] uppercase tracking-wider">
              Technical Proficiencies Matrix
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-[#242426] border border-[#f5f0e8]/5">
                <div className="text-[#f5f0e8] font-bold mb-1">Frontend Engineering:</div>
                <div className="text-[#8e8a82]">
                  React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), Redux Toolkit, RTK
                  Query, TanStack Query
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#242426] border border-[#f5f0e8]/5">
                <div className="text-[#f5f0e8] font-bold mb-1">Interface & UI Styling:</div>
                <div className="text-[#8e8a82]">
                  Tailwind CSS, Material UI, Ant Design, HTML5, CSS3/SCSS, ECharts, Framer Motion,
                  Google Maps API
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#242426] border border-[#f5f0e8]/5">
                <div className="text-[#f5f0e8] font-bold mb-1">Backend & Database:</div>
                <div className="text-[#8e8a82]">
                  Node.js, Express.js, NestJS, MongoDB, Mongoose, PostgreSQL, MySQL, REST APIs, JWT,
                  RBAC, Zod
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#242426] border border-[#f5f0e8]/5">
                <div className="text-[#f5f0e8] font-bold mb-1">Tools & Deployment:</div>
                <div className="text-[#8e8a82]">
                  Git, GitHub, GitHub Actions, Vercel, Netlify, Firebase, Supabase, Postman, Docker
                </div>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono font-bold text-[#e49b58] uppercase tracking-wider">
              Professional Production Experience
            </h2>

            {PORTFOLIO_DATA.experience.map((exp) => (
              <div key={exp.id} className="space-y-2 border-l-2 border-[#b87333]/40 pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="text-base font-bold text-[#f5f0e8]">
                    {exp.role} — <span className="text-[#b87333]">{exp.company}</span>
                  </h3>
                  <span className="text-xs font-mono text-[#8e8a82]">{exp.period}</span>
                </div>
                <p className="text-xs text-[#8e8a82]">{exp.location}</p>
                <p className="text-xs text-[#c8c3bb] leading-relaxed">{exp.summary}</p>
                <ul className="space-y-1.5 pt-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-[#c8c3bb] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b87333] mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education & Verified Certifications */}
          <div className="space-y-3 pt-4 border-t border-[#f5f0e8]/10">
            <h2 className="text-xs font-mono font-bold text-[#e49b58] uppercase tracking-wider">
              Education & Professional Certifications
            </h2>
            <div className="space-y-3">
              {PORTFOLIO_DATA.profile.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-2xl bg-[#242426] border border-[#f5f0e8]/5 space-y-1.5"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-bold text-[#f5f0e8]">{edu.degree}</div>
                      <div className="text-xs text-[#8e8a82]">
                        {edu.institution} • {edu.location}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#b87333]">{edu.period}</span>
                  </div>
                  {edu.details && (
                    <div className="text-xs text-[#c8c3bb] leading-relaxed">{edu.details}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Spoken Languages */}
          <div className="space-y-3 pt-4 border-t border-[#f5f0e8]/10">
            <h2 className="text-xs font-mono font-bold text-[#e49b58] uppercase tracking-wider">
              Spoken Languages
            </h2>
            <div className="flex flex-wrap gap-4 text-xs font-mono">
              {PORTFOLIO_DATA.profile.spokenLanguages.map((lang) => (
                <div
                  key={lang.language}
                  className="px-3 py-1.5 rounded-xl bg-[#242426] border border-[#f5f0e8]/10"
                >
                  <span className="text-[#f5f0e8] font-bold">{lang.language}:</span>{" "}
                  <span className="text-[#b87333]">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#242426] border-t border-[#f5f0e8]/10 flex items-center justify-between">
          <span className="text-xs font-mono text-[#8e8a82]">
            Status: {PORTFOLIO_DATA.profile.status}
          </span>
          <a
            href="#contact"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#b87333] hover:bg-[#c98240] text-[#f5f0e8] text-xs font-semibold"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
}
