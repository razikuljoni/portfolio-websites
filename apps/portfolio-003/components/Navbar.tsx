'use client';

import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowUpRight, 
  Code2, 
  Briefcase, 
  Layers, 
  Cpu, 
  Mail, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

interface NavbarProps {
  onOpenTerminal?: () => void;
  onOpenResume?: () => void;
}

export default function Navbar({ onOpenTerminal, onOpenResume }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  // Handle theme toggle
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portfolio_theme', nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Scroll listener for progress and section activation
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(currentScroll > 40);

      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'lab', 'publications', 'contact'];
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about', icon: Code2 },
    { name: 'Tech Matrix', href: '#skills', id: 'skills', icon: Cpu },
    { name: 'Experience', href: '#experience', id: 'experience', icon: Briefcase },
    { name: 'Projects', href: '#projects', id: 'projects', icon: Layers },
    { name: 'Arch Lab', href: '#lab', id: 'lab', icon: Terminal },
    { name: 'Papers', href: '#publications', id: 'publications', icon: BookOpen },
    { name: 'Contact', href: '#contact', id: 'contact', icon: Mail },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar at top edge */}
      <div 
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#b87333] via-[#d97736] to-[#e49b58] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#1c1c1e]/85 dark:bg-[#1c1c1e]/85 light:bg-[#f8f5ef]/90 backdrop-blur-md border-b border-[#f5f0e8]/10 shadow-lg shadow-black/20 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Status */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            id="brand-logo-button"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2c2c2e] to-[#1c1c1e] border border-[#b87333]/40 flex items-center justify-center font-mono font-bold text-[#b87333] group-hover:border-[#b87333] group-hover:shadow-[0_0_12px_rgba(184,115,51,0.4)] transition-all">
              <span className="text-sm">RJ</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-[#f5f0e8] group-hover:text-[#b87333] transition-colors flex items-center gap-1.5">
                {PORTFOLIO_DATA.profile.name}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </span>
              <span className="text-[11px] font-mono text-[#8e8a82] tracking-wider uppercase">
                Full Stack Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#242426]/60 dark:bg-[#242426]/60 light:bg-[#eee8de]/70 border border-[#f5f0e8]/10 rounded-full px-3 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#b87333] text-[#f5f0e8] shadow-[0_2px_10px_rgba(184,115,51,0.35)]'
                      : 'text-[#c8c3bb] hover:text-[#f5f0e8] hover:bg-[#f5f0e8]/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2.5">
            {/* Terminal quick button */}
            {onOpenTerminal && (
              <button
                type="button"
                id="navbar-terminal-button"
                onClick={onOpenTerminal}
                title="Launch Architecture CLI Terminal"
                aria-label="Launch Architecture CLI Terminal"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#c8c3bb] bg-[#2c2c2e]/80 border border-[#f5f0e8]/10 rounded-lg hover:border-[#b87333]/50 hover:text-[#b87333] transition-all"
              >
                <Terminal className="w-3.5 h-3.5 text-[#b87333]" />
                <span className="hidden md:inline">CLI Lab</span>
              </button>
            )}

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              id="theme-toggle-button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-lg bg-[#2c2c2e]/80 border border-[#f5f0e8]/10 text-[#c8c3bb] hover:text-[#b87333] hover:border-[#b87333]/40 transition-all focus:outline-none"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#e49b58]" />
              ) : (
                <Moon className="w-4 h-4 text-[#b87333]" />
              )}
            </button>

            {/* Consultation / Advisory CTA */}
            <a
              id="navbar-consultation-cta"
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-[#b87333] to-[#d97736] text-[#f5f0e8] hover:shadow-[0_0_15px_rgba(184,115,51,0.4)] transition-all"
            >
              <span>Consult Advisory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              id="mobile-menu-toggle-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg bg-[#2c2c2e]/80 border border-[#f5f0e8]/10 text-[#f5f0e8] hover:text-[#b87333] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-backdrop"
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden flex flex-col justify-between p-6 pt-24 animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
            <div className="text-[11px] font-mono text-[#8e8a82] uppercase tracking-wider px-3 mb-2">
              Navigation Menu
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#b87333] text-[#f5f0e8]'
                      : 'text-[#c8c3bb] hover:bg-[#2c2c2e] hover:text-[#f5f0e8]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#b87333]" />
                  <span>{link.name}</span>
                </a>
              );
            })}

            <div className="pt-4 border-t border-[#f5f0e8]/10 mt-3 flex flex-col gap-3">
              {onOpenResume && (
                <button
                  type="button"
                  id="mobile-resume-button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#b87333]/50 text-[#b87333] text-xs font-mono"
                >
                  <span>View Curriculum Vitae</span>
                </button>
              )}

              <a
                id="mobile-contact-cta"
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-[#b87333] to-[#d97736] text-[#f5f0e8] text-sm font-semibold"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="text-center text-xs font-mono text-[#8e8a82]">
            MD Razikul Islam Joni • Full Stack Developer • Dhaka, BD
          </div>
        </div>
      )}
    </>
  );
}
