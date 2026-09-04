import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Cpu, GraduationCap, Award, BookOpen, ExternalLink, Activity } from 'lucide-react';
import { EXPERIENCE_ITEMS, EDUCATION_ITEMS, CERTIFICATION_ITEMS, LANGUAGES } from '../data/portfolioData';
import { GithubContributionGraph } from './GithubContributionGraph';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Experience Section */}
        <div>
          {/* Section Header */}
          <div className="max-w-3xl mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono text-amber-400">
              <Briefcase className="w-3.5 h-3.5" />
              <span>PROFESSIONAL EXPERIENCE & ENGINEERING WORK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-100">
              Experience & Production Impact
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              2+ years of production experience translating complex business requirements and real-time operational workflows into fast, accessible, and resilient web applications.
            </p>
          </div>

          {/* Timeline List */}
          <div className="space-y-6">
            {EXPERIENCE_ITEMS.map((item) => (
              <div
                key={item.id}
                id={`experience-item-${item.id}`}
                className="p-6 sm:p-7 rounded-2xl bg-[#0E1117] border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-neutral-100">
                        {item.role}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-neutral-800 text-amber-400 border border-neutral-700">
                        {item.badge}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-neutral-300 mt-1">
                      {item.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{item.period}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2 mb-5">
                  {item.highlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Architectures Led */}
                <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-neutral-400 mr-1">
                    Key Systems & Modules:
                  </span>
                  {item.architecturesLed.map((arch, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200"
                    >
                      <Cpu className="w-3 h-3 text-amber-400" />
                      <span>{arch}</span>
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* GitHub Engineering Contribution Velocity & Heatmap */}
        <div className="pt-4">
          <GithubContributionGraph />
        </div>

        {/* Education, Training & Languages Grid */}
        <div className="grid lg:grid-cols-12 gap-8 pt-6 border-t border-neutral-800/80">
          
          {/* Education */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-neutral-100 font-bold text-base">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <span>Academic Background</span>
            </div>
            
            <div className="space-y-3">
              {EDUCATION_ITEMS.map((edu) => (
                <div key={edu.id} className="p-4 rounded-xl bg-[#0E1117] border border-neutral-800 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-neutral-100">{edu.degree}</h4>
                    <span className="text-[11px] font-mono text-amber-400 shrink-0">{edu.period}</span>
                  </div>
                  <div className="text-xs font-mono text-neutral-400">{edu.institution} • {edu.location}</div>
                  {edu.notes && (
                    <p className="text-xs text-neutral-400 pt-1 leading-relaxed">{edu.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Languages */}
          <div className="lg:col-span-6 space-y-6">
            {/* Certifications */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-100 font-bold text-base">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>Specialized Training & Certifications</span>
              </div>
              
              <div className="space-y-2.5">
                {CERTIFICATION_ITEMS.map((cert) => (
                  <div key={cert.id} className="p-3.5 rounded-xl bg-[#0E1117] border border-neutral-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-neutral-200">{cert.title}</div>
                      <div className="text-xs font-mono text-neutral-400">{cert.issuer}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-neutral-900 text-emerald-400 border border-neutral-700 shrink-0">
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                Spoken & Professional Languages
              </div>
              <div className="flex gap-3">
                {LANGUAGES.map((lang, idx) => (
                  <div key={idx} className="flex-1 p-2.5 rounded-xl bg-[#0E1117] border border-neutral-800 text-xs font-mono">
                    <span className="font-semibold text-neutral-100">{lang.language}: </span>
                    <span className="text-amber-400">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
