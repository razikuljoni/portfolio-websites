import React, { useState, useEffect } from 'react';
import { Layers, Terminal, Cpu, FileText, Mail, Menu, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Architecture', href: '#architecture' },
    { label: 'Tech Stack', href: '#tech-stack' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#090A0F]/90 backdrop-blur-md border-b border-neutral-800/80 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent border-b border-neutral-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Identity */}
        <a
          href="#"
          id="header-brand-logo"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-700/80 flex items-center justify-center text-neutral-100 group-hover:border-amber-400/60 transition-colors shadow-inner">
            <Cpu className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-neutral-100 text-sm sm:text-base">
                MD Razikul Islam Joni
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-amber-400 border border-neutral-700 font-semibold">
                Full Stack
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline-block">
              React · Next.js · Node.js · Express
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-900/60 border border-neutral-800/80 rounded-full px-4 py-1.5 backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase()}`}
              className="px-3 py-1 text-xs font-medium text-neutral-300 hover:text-white rounded-full hover:bg-neutral-800/80 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenResume}
            id="header-resume-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Resume & Credentials</span>
          </button>

          <button
            onClick={onOpenContact}
            id="header-contact-btn"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-950 bg-neutral-100 hover:bg-white transition-all shadow-sm font-semibold cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden border-b border-neutral-800 bg-[#090A0F]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-800/80 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-neutral-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full justify-center inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-neutral-200 bg-neutral-900 border border-neutral-700"
            >
              <FileText className="w-4 h-4 text-neutral-400" />
              <span>View Architecture Spec & CV</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full justify-center inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-neutral-950 bg-neutral-100"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
