'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Bookmark,
  Sun,
  Moon,
  PhoneCall,
  ChevronRight,
  Shield,
  Compass,
  Building,
  Layers,
  Calculator,
  BookOpen,
  Mail,
} from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  savedCount: number;
  onOpenSavedDrawer: () => void;
  onOpenConsultation: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

/**
 * Navbar Component
 * Fixed top navigation adhering to Swiss International Style with geometric alignment,
 * instant page switching, theme toggling, and watchlist status counter.
 */
export default function Navbar({
  activePage,
  setActivePage,
  savedCount,
  onOpenSavedDrawer,
  onOpenConsultation,
  isDarkMode,
  onToggleTheme,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Overview', icon: Compass },
    { id: 'properties', label: 'Curated Portfolio', icon: Building },
    { id: 'neighborhoods', label: 'Neighborhoods', icon: Layers },
    { id: 'heritage', label: 'Heritage & Vision', icon: Shield },
    { id: 'calculator', label: 'Financial Suite', icon: Calculator },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'contact', label: 'Private Desk', icon: Mail },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="kronen-main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-950/90 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-800 shadow-lg py-3.5'
          : 'bg-gradient-to-b from-stone-950/80 via-stone-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Identity / Logo */}
        <div
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Swiss Minimalist Insignia */}
          <div className="w-9 h-9 rounded bg-stone-900 border border-amber-500/60 flex items-center justify-center text-amber-500 shadow-md group-hover:border-amber-400 group-hover:scale-105 transition-all">
            <span className="font-mono text-base font-bold tracking-tighter">K+</span>
          </div>

          <div className="flex flex-col">
            <span className="font-sans text-lg font-bold tracking-widest text-stone-100 uppercase group-hover:text-amber-400 transition-colors">
              KRONEN
            </span>
            <span className="text-[9px] font-mono tracking-[0.25em] text-stone-400 uppercase -mt-0.5">
              Swiss Real Estate
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-all duration-200 rounded ${
                  isActive
                    ? 'text-amber-400 font-semibold'
                    : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/40'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark / Light Mode Switcher */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-stone-900/80 border border-stone-800 text-stone-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Saved Watchlist Button */}
          <button
            id="watchlist-toggle-btn"
            onClick={onOpenSavedDrawer}
            className="relative p-2 rounded-lg bg-stone-900/80 border border-stone-800 text-stone-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors flex items-center gap-1.5"
            aria-label="View Saved Properties"
          >
            <Bookmark className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline font-mono text-xs font-semibold text-stone-200">
              {savedCount}
            </span>
            {savedCount > 0 && (
              <span className="sm:hidden absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[10px] font-mono font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* VIP Consultation CTA */}
          <button
            id="nav-consultation-btn"
            onClick={onOpenConsultation}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>VIP Desk</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-stone-900/80 border border-stone-800 text-stone-200 hover:text-amber-400 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-stone-950 border-b border-stone-800 px-6 py-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between p-3 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'text-stone-300 hover:bg-stone-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-500' : 'text-stone-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-600" />
                  </button>
                );
              })}

              <div className="pt-4 border-t border-stone-800/80 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full py-3 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  Schedule VIP Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
