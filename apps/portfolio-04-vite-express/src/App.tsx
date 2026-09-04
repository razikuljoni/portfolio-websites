/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ArchitecturalApproach } from './components/ArchitecturalApproach';
import { TechStack } from './components/TechStack';
import { ArchitecturePhilosophy } from './components/ArchitecturePhilosophy';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { TechSkillModal } from './components/TechSkillModal';
import { ResumeModal } from './components/ResumeModal';
import { CaseStudy, TechSkill } from './types';

export default function App() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [activeSkill, setActiveSkill] = useState<TechSkill | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-neutral-100 flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-300">
      {/* Fixed Nav Header */}
      <Header
        onOpenContact={() => scrollToSection('contact')}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Portfolio Sections */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section */}
        <Hero
          onExploreArchitecture={() => scrollToSection('architecture')}
          onExploreTechStack={() => scrollToSection('tech-stack')}
        />

        {/* 2. Architectural Approach & Case Studies */}
        <ArchitecturalApproach
          onSelectCaseStudy={(study) => setActiveCaseStudy(study)}
          onSelectSkill={(skill) => setActiveSkill(skill)}
        />

        {/* 3. Tech Stack Matrix & Interactive Skill Icons */}
        <TechStack
          onSelectSkill={(skill) => setActiveSkill(skill)}
        />

        {/* 4. Architectural Philosophy & Core Tenets */}
        <ArchitecturePhilosophy />

        {/* 5. Systems Leadership & Experience Timeline */}
        <ExperienceTimeline />

        {/* 6. Contact & Advisory Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      {activeCaseStudy && (
        <CaseStudyModal
          caseStudy={activeCaseStudy}
          onClose={() => setActiveCaseStudy(null)}
          onSelectSkill={(skill) => {
            setActiveCaseStudy(null);
            setActiveSkill(skill);
          }}
        />
      )}

      {activeSkill && (
        <TechSkillModal
          skill={activeSkill}
          onClose={() => setActiveSkill(null)}
          onSelectCaseStudy={(study) => {
            setActiveSkill(null);
            setActiveCaseStudy(study);
          }}
        />
      )}

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
