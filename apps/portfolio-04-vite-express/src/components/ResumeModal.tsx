import React, { useEffect } from 'react';
import { X, Download, FileText, CheckCircle2, Cpu, Award, Globe, Mail, Phone, MapPin, Printer, Github, Linkedin, ExternalLink, GraduationCap, Code2 } from 'lucide-react';
import { CASE_STUDIES, TECH_SKILLS, EXPERIENCE_ITEMS, EDUCATION_ITEMS, CERTIFICATION_ITEMS, LANGUAGES, PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="resume-modal-container"
        className="relative w-full max-w-4xl bg-[#0E1117] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#161B22] border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-neutral-100 text-sm sm:text-base">
              Resume — {PERSONAL_INFO.name} ({PERSONAL_INFO.title})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="resume-print-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              id="close-resume-modal-btn"
              className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable / Viewable Resume Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-neutral-300 font-sans text-xs sm:text-sm leading-relaxed bg-[#0E1117]">
          
          {/* Header Info */}
          <div className="border-b border-neutral-800 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-100">
                  {PERSONAL_INFO.name}
                </h1>
                <div className="text-sm font-semibold text-amber-400 font-mono mt-0.5">
                  {PERSONAL_INFO.title}
                </div>
              </div>
              
              <div className="text-xs font-mono text-neutral-400 space-y-1 sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-neutral-500" />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-amber-400">{PERSONAL_INFO.email}</a>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-neutral-500" />
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-emerald-400">{PERSONAL_INFO.phone}</a>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-3 pt-1 text-xs font-mono">
              <a href={PERSONAL_INFO.links.github} target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-white inline-flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-amber-400" />
                <span>github.com/Razikuljoni</span>
              </a>
              <span className="text-neutral-600">•</span>
              <a href={PERSONAL_INFO.links.linkedin} target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-white inline-flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>linkedin.com/in/razikuljoni</span>
              </a>
              <span className="text-neutral-600">•</span>
              <a href={PERSONAL_INFO.links.livePortfolio} target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-white inline-flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>razikuljoni.vercel.app</span>
              </a>
            </div>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-neutral-300 pt-2 leading-relaxed">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Technical Skills Categorized */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              <span>Technical Skills</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-1">
                <span className="font-semibold text-neutral-200">Languages & Core:</span>
                <p className="text-neutral-400 font-sans">{PERSONAL_INFO.skillGroups.languages.join(', ')}</p>
              </div>
              <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-1">
                <span className="font-semibold text-neutral-200">Frontend & State:</span>
                <p className="text-neutral-400 font-sans">{PERSONAL_INFO.skillGroups.frontend.join(', ')}</p>
              </div>
              <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-1">
                <span className="font-semibold text-neutral-200">Backend & APIs:</span>
                <p className="text-neutral-400 font-sans">{PERSONAL_INFO.skillGroups.backend.join(', ')}</p>
              </div>
              <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-1">
                <span className="font-semibold text-neutral-200">Databases, Cloud & Tools:</span>
                <p className="text-neutral-400 font-sans">{PERSONAL_INFO.skillGroups.databasesAndDevops.join(', ')}, {PERSONAL_INFO.skillGroups.toolsAndAI.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {EXPERIENCE_ITEMS.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <span className="font-bold text-neutral-100 text-sm">{exp.role}</span>
                      <span className="text-neutral-400 text-xs"> — {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-amber-400">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-neutral-300">
                    {exp.highlights.map((h, idx) => (
                      <li key={idx} className="leading-relaxed pl-1">{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Featured Production Projects
            </h2>
            <div className="space-y-3">
              {CASE_STUDIES.map((cs) => (
                <div key={cs.id} className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1.5 text-xs">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-100 text-sm">{cs.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-amber-400 border border-neutral-700">{cs.category}</span>
                    </div>
                    <span className="font-mono text-emerald-400 text-[11px]">{cs.scale}</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">{cs.tagline}</p>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{cs.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Training Grid */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            {/* Education */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </h2>
              <div className="space-y-2">
                {EDUCATION_ITEMS.map((edu) => (
                  <div key={edu.id} className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-0.5">
                    <div className="font-semibold text-neutral-200 text-xs">{edu.degree}</div>
                    <div className="text-[11px] text-neutral-400 font-mono">{edu.institution} ({edu.period})</div>
                    {edu.notes && <div className="text-[11px] text-neutral-500">{edu.notes}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Training & Certifications</span>
              </h2>
              <div className="space-y-2">
                {CERTIFICATION_ITEMS.map((cert) => (
                  <div key={cert.id} className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-0.5">
                    <div className="font-semibold text-neutral-200 text-xs">{cert.title}</div>
                    <div className="text-[11px] text-neutral-400 font-mono">{cert.issuer} • <span className="text-emerald-400">{cert.status}</span></div>
                  </div>
                ))}
                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 text-xs font-mono">
                  <span className="text-neutral-400">Languages: </span>
                  <span className="text-neutral-200">Bengali (Native), English (Professional)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#161B22] border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-400 shrink-0">
          <span>MD Razikul Islam Joni — Full Stack Developer</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg font-medium text-neutral-950 bg-neutral-100 hover:bg-white transition-colors cursor-pointer font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
