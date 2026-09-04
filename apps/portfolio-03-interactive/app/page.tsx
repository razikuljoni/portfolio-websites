'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsCounter from '@/components/StatsCounter';
import AboutSection from '@/components/AboutSection';
import TechMatrixSection from '@/components/TechMatrixSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import TerminalPlayground from '@/components/TerminalPlayground';
import PublicationsSection from '@/components/PublicationsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ResumeModal from '@/components/ResumeModal';

/**
 * Main Page Component for Single-Page Portfolio
 * 
 * Features:
 * - Graphite & Copper aesthetic (#1c1c1e warm charcoal, #b87333 muted copper, #f5f0e8 cream, #2c2c2e dark cards)
 * - Interactive 2D Canvas Constellation Hero with mouse velocity & gravity
 * - Alternating left-right single-column layout with spacious breathing room
 * - Parallax depth layers and smooth scroll active-section tracking
 * - Animated stats counter triggered on viewport intersection
 * - High-resolution architecture diagram Lightbox modal with zoom and keyboard navigation
 * - Interactive CLI Terminal Playground
 * - Validated contact consultation form with real-time feedback & celebration confetti
 * - Dark / Light mode toggle with CSS custom properties
 * - Custom trailing copper cursor with magnetic hover detection
 * - Multi-column footer with live timezone clock and circular scroll progress back-to-top button
 */
export default function PortfolioPage() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const scrollToTerminal = () => {
    const el = document.getElementById('lab');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#b87333]/30 selection:text-[#f5f0e8] transition-colors duration-300">
      {/* Custom Trailing Copper Cursor */}
      <CustomCursor />

      {/* Fixed Top Navigation Bar */}
      <Navbar
        onOpenTerminal={scrollToTerminal}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Single-Page Scrolling Content */}
      <main id="main-content" className="relative flex flex-col">
        {/* 1. Hero Section with Interactive Canvas */}
        <HeroSection
          onOpenTerminal={scrollToTerminal}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 2. Animated Stats Counter Benchmarks */}
        <StatsCounter />

        {/* 3. About & Engineering Philosophy (Alternating Left-Right) */}
        <AboutSection
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={scrollToTerminal}
        />

        {/* 4. Technical Proficiency Matrix (Categorized & Searchable) */}
        <TechMatrixSection />

        {/* 5. Chronological Experience & Leadership Timeline (Alternating Layout) */}
        <ExperienceSection />

        {/* 6. Featured Systems & Projects Showcase with Lightbox (Alternating Layout) */}
        <ProjectsSection />

        {/* 7. Interactive Architecture CLI Console Lab */}
        <TerminalPlayground />

        {/* 8. Systems Publications, Whitepapers & RFCs */}
        <PublicationsSection />

        {/* 9. Peer Endorsements & Leadership Testimonials */}
        <TestimonialsSection />

        {/* 10. Direct Consultation & Validated Contact Form */}
        <ContactSection />
      </main>

      {/* Multi-Column Footer with Live Clock & Back to Top */}
      <Footer
        onOpenTerminal={scrollToTerminal}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
