'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Calendar,
  Building,
  CheckCircle2,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { AGENTS } from '@/data/agents';
import { HERITAGE_MILESTONES } from '@/data/milestones';

interface HeritagePageProps {
  onScheduleConsultation: () => void;
  onNavigateToProperties: () => void;
}

/**
 * HeritagePage Component
 * Dedicated to KRONEN's 50-year Swiss architectural brokerage legacy,
 * Bauhaus/International style principles, executive leadership profiles, and global awards.
 */
export default function HeritagePage({
  onScheduleConsultation,
  onNavigateToProperties,
}: HeritagePageProps) {
  const tenets = [
    {
      num: '01',
      title: 'Structural Provenance',
      description: 'We exclusively represent residences with clear architectural authorship, master craftsmanship, and permanent structural pedigree.',
    },
    {
      num: '02',
      title: 'A+++ Thermal & Passive Harmony',
      description: 'True architectural luxury harmonizes with its natural topography through net-zero geothermal heating, solar facades, and low-embodied carbon envelopes.',
    },
    {
      num: '03',
      title: 'Banking-Grade Discretion',
      description: 'Every transaction is conducted under Swiss banking confidentiality standards, safeguarding client sovereignty, privacy, and digital security.',
    },
    {
      num: '04',
      title: 'Form Following Spatial Purity',
      description: 'Rejecting fleeting stylistic fads in favor of geometric clarity, raw natural materials (Vals quartzite, French walnut, fair-faced concrete), and daylight choreography.',
    },
  ];

  const awards = [
    {
      year: '2025',
      organization: 'International Property Awards Europe',
      title: 'Best Global Luxury Real Estate Brokerage',
    },
    {
      year: '2024',
      organization: 'Swiss Federal Architectural Guild',
      title: 'Preservation Partner of the Decade',
    },
    {
      year: '2023',
      organization: 'Pritzker Architectural Alliance',
      title: 'Excellence in Modernist Monograph Curation',
    },
    {
      year: '2022',
      organization: 'World Heritage Real Estate Summit',
      title: 'Pioneer in Net-Zero Architectural Valuation',
    },
  ];

  const press = [
    { publication: 'Architectural Digest', quote: '“The gold standard in European modernist residential brokerage.”' },
    { publication: 'Financial Times', quote: '“KRONEN sets the benchmark for safe-haven Swiss architectural acquisitions.”' },
    { publication: 'Wallpaper*', quote: '“Where master architects meet the world’s most discerning patrons.”' },
    { publication: 'Monocle', quote: '“Swiss precision, structural integrity, and impeccable spatial curation.”' },
  ];

  return (
    <div id="heritage-view" className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header Banner */}
      <div className="border-b border-stone-800 pb-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
            Heritage & Architectural Creed • Since 1974
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-sans font-extrabold text-stone-100 tracking-tight max-w-4xl">
          Fifty Years of Curating Spatial Masterworks Across the Alps & the World.
        </h1>
        <p className="text-xs sm:text-base text-stone-300 max-w-3xl font-light leading-relaxed">
          Founded on the shores of Lake Zurich by architect Heinrich Kronen, our practice was established to treat prime real estate not as ephemeral assets, but as enduring cultural monuments of modern civilization.
        </p>
      </div>

      {/* 1. THE 4 SWISS DESIGN TENETS (Swiss Grid layout) */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
            The 4 Architectural Tenets
          </h2>
          <span className="text-xs font-mono text-stone-400">Swiss International Style</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tenets.map((tenet) => (
            <div
              key={tenet.num}
              className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-3 relative group hover:border-amber-500/50 transition-colors"
            >
              <span className="font-mono text-3xl font-bold text-amber-500/30 group-hover:text-amber-500 transition-colors block">
                {tenet.num}
              </span>
              <h3 className="text-base font-bold text-stone-100">{tenet.title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light font-sans">
                {tenet.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 50-YEAR HERITAGE TIMELINE */}
      <section className="bg-stone-900 border border-stone-800 rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="space-y-2 border-b border-stone-800 pb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
            Historical Evolution
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-100">
            From Lake Zurich Atelier to Global Architectural Network
          </h2>
        </div>

        <div className="relative border-l-2 border-amber-500/30 pl-6 sm:pl-10 space-y-10">
          {HERITAGE_MILESTONES.map((milestone, idx) => (
            <div key={idx} className="relative group">
              <span className="absolute -left-[31px] sm:-left-[47px] top-1 w-4 h-4 rounded-full bg-stone-950 border-2 border-amber-500 group-hover:scale-125 transition-transform" />

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-lg font-bold text-amber-400">
                    {milestone.year}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-stone-950 text-stone-300 border border-stone-800">
                    {milestone.subtitle}
                  </span>
                  {milestone.metric && (
                    <span className="text-xs font-mono text-amber-500/80">
                      • {milestone.metric}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-stone-100">
                  {milestone.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed font-light">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PRINCIPAL BROKERS & ARCHITECTURAL ADVISORS */}
      <section className="space-y-8">
        <div className="space-y-2 border-b border-stone-800 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
            Executive Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-100">
            Principal Brokers & Architectural Advisors
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl p-6 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500/50 flex-shrink-0">
                    <Image
                      src={agent.photo}
                      alt={agent.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-stone-100">{agent.name}</h3>
                    <p className="text-xs text-amber-400 font-mono">{agent.role}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{agent.office}</p>
                  </div>
                </div>

                <p className="text-xs text-stone-300 font-sans leading-relaxed font-light">
                  {agent.bio}
                </p>

                <div className="space-y-2 pt-2 border-t border-stone-800 text-xs font-mono text-stone-400">
                  <p><strong className="text-stone-300">Credentials:</strong> {agent.title}</p>
                  <p><strong className="text-stone-300">Specialization:</strong> {agent.specialization}</p>
                  <p><strong className="text-stone-300">Career Transacted:</strong> {agent.totalVolume}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs font-mono">
                <a
                  href={`mailto:${agent.email}`}
                  className="text-amber-400 hover:underline truncate mr-2"
                >
                  {agent.email}
                </a>
                <span className="text-stone-400">{agent.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. AWARDS & PRESS ENDORSEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Awards Column (6 cols) */}
        <div className="lg:col-span-6 bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-800">
            <Award className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
              Global Accreditations & Honors
            </h3>
          </div>

          <div className="space-y-3 text-xs font-mono">
            {awards.map((award, idx) => (
              <div key={idx} className="p-3 rounded bg-stone-950/60 border border-stone-800/80 space-y-1">
                <div className="flex justify-between text-amber-400 font-bold">
                  <span>{award.year}</span>
                  <span className="text-stone-400 text-[11px] font-normal">{award.organization}</span>
                </div>
                <p className="text-stone-200">{award.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Press Quotes (6 cols) */}
        <div className="lg:col-span-6 bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-800">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
              Selected Critical Press
            </h3>
          </div>

          <div className="space-y-3">
            {press.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded bg-stone-950/60 border border-stone-800/80 space-y-1.5">
                <p className="text-xs text-stone-300 italic font-light font-sans">
                  {item.quote}
                </p>
                <span className="text-[11px] font-mono text-amber-500 block text-right font-semibold">
                  — {item.publication}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
