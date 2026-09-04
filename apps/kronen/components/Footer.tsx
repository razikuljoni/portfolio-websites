'use client';

import React, { useState } from 'react';
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  Building,
  Phone,
  MapPin,
  Globe,
  CheckCircle2,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (pageId: string) => void;
}

/**
 * Footer Component
 * Fat Swiss International Style footer featuring global office desks, newsletter dispatch,
 * Google Maps embed preview, social links, and cantonal regulatory disclosures.
 */
export default function Footer({ onNavigate }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedOfficeMap, setSelectedOfficeMap] = useState<'zurich' | 'geneva' | 'london'>('zurich');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && /\S+@\S+\.\S+/.test(newsletterEmail)) {
      setIsSubscribed(true);
    }
  };

  const offices = [
    {
      id: 'zurich',
      city: 'Zurich Flagship',
      address: 'Seestrasse 142, 8002 Zurich, Switzerland',
      phone: '+41 44 280 44 00',
      email: 'zurich@kronen-properties.ch',
      mapQuery: 'Seestrasse+142+Zurich+Switzerland',
    },
    {
      id: 'geneva',
      city: 'Geneva Private Desk',
      address: 'Chemin de Ruth 28, 1223 Cologny, Geneva',
      phone: '+41 22 710 99 20',
      email: 'geneva@kronen-properties.ch',
      mapQuery: 'Cologny+Geneva+Switzerland',
    },
    {
      id: 'london',
      city: 'London Mayfair',
      address: 'Upper Grosvenor Street, Mayfair, London W1K',
      phone: '+44 20 7946 0192',
      email: 'london@kronen-properties.ch',
      mapQuery: 'Upper+Grosvenor+Street+London',
    },
  ];

  const activeOffice = offices.find((o) => o.id === selectedOfficeMap) || offices[0];

  return (
    <footer
      id="kronen-fat-footer"
      className="bg-stone-950 text-stone-100 border-t border-stone-800 relative z-20 pt-16 pb-12 overflow-hidden"
    >
      {/* Swiss grid accent background */}
      <div className="absolute inset-0 swiss-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Top Newsletter & Manifesto Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-stone-800">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500">
                The Architectural Dispatch
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-stone-100">
              Receive confidential off-market architectural acquisitions.
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-lg leading-relaxed">
              Curated quarterly analysis of prime Swiss residential assets, Pritzker-laureate estates, and discreet private listings.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            {isSubscribed ? (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>Subscription confirmed. Confidential quarterly monograph dispatched.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                  <input
                    type="email"
                    required
                    placeholder="Enter discretionary email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-10 pr-4 py-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 font-mono transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 flex-shrink-0 active:scale-95"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[11px] font-mono text-stone-400 mt-2">
              Strictly confidential. No third-party syndication. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Middle Multi-Column Grid: Brand, Navigation, Offices & Google Maps Embed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Philosophy (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-stone-900 border border-amber-500/60 flex items-center justify-center text-amber-500">
                <span className="font-mono text-sm font-bold">K+</span>
              </div>
              <span className="font-sans text-lg font-bold tracking-widest text-stone-100 uppercase">
                KRONEN
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Founded in Zurich in 1974. Dedicated to the preservation, architectural curation, and discreet brokerage of landmark residential masterworks globally.
            </p>

            <div className="pt-2 text-xs font-mono text-stone-400 space-y-1">
              <p>Swiss Real Estate License: <span className="text-stone-300">CHE-109.844.210</span></p>
              <p>SVIT Member #4892 • MRICS Certified</p>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-amber-500 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {[
                { id: 'home', label: 'Overview' },
                { id: 'properties', label: 'Curated Portfolio' },
                { id: 'neighborhoods', label: 'Neighborhoods' },
                { id: 'heritage', label: 'Heritage & Vision' },
                { id: 'calculator', label: 'Financial Suite' },
                { id: 'journal', label: 'Journal' },
                { id: 'contact', label: 'Private Desk' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Global Office Salons (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-amber-500 font-semibold">
              Global Advisory Salons
            </h4>
            <div className="space-y-3 text-xs">
              {offices.map((office) => (
                <div
                  key={office.id}
                  onClick={() => setSelectedOfficeMap(office.id as any)}
                  className={`p-2.5 rounded border transition-all cursor-pointer ${
                    selectedOfficeMap === office.id
                      ? 'border-amber-500/50 bg-stone-900/90 text-stone-200'
                      : 'border-stone-800/80 bg-stone-950/40 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <p className="font-mono font-semibold text-stone-200 flex items-center justify-between">
                    <span>{office.city}</span>
                    <span className="text-[10px] text-amber-500 font-normal">View Map</span>
                  </p>
                  <p className="text-[11px] text-stone-400 truncate mt-0.5">{office.address}</p>
                  <p className="text-[11px] font-mono text-amber-500/80 mt-1">{office.phone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Interactive Google Maps Embed (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-mono text-xs uppercase tracking-wider text-amber-500 font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Salon Location
              </h4>
              <span className="text-[10px] font-mono text-stone-400">{activeOffice.city}</span>
            </div>

            {/* Google Maps Embed Container */}
            <div className="relative w-full h-44 rounded-lg overflow-hidden border border-stone-800 bg-stone-900 shadow-inner">
              <iframe
                title={`Map location for ${activeOffice.city}`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  activeOffice.mapQuery
                )}&t=m&z=14&output=embed&iwloc=near`}
                className="w-full h-full filter invert-[0.88] hue-rotate-180 contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute bottom-2 left-2 bg-stone-950/90 border border-stone-800 px-2 py-1 rounded text-[10px] font-mono text-stone-300 backdrop-blur-sm pointer-events-none">
                {activeOffice.city} Desk
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Social Links & Compliance */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400">
          <p>© {new Date().getFullYear()} KRONEN Real Estate AG. All rights reserved. Swiss International Architecture.</p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-stone-400">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <span>•</span>
            <a
              href="https://architecturaldigest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
              aria-label="Architectural Digest"
            >
              ArchDigest
            </a>
            <span>•</span>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
              aria-label="YouTube"
            >
              Spatial Films
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
