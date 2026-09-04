'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  SlidersHorizontal,
  Building,
  Bed,
  Bath,
  Move,
  Bookmark,
  Calendar,
  Eye,
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import Image from 'next/image';
import { Property, Testimonial } from '@/types';
import { PROPERTIES } from '@/data/properties';
import { TESTIMONIALS } from '@/data/testimonials';
import { NEIGHBORHOODS } from '@/data/neighborhoods';
import { JOURNAL_ARTICLES } from '@/data/journal';
import { HERITAGE_MILESTONES } from '@/data/milestones';
import AnimatedCounter from '@/components/AnimatedCounter';

interface HomePageProps {
  onNavigate: (pageId: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
  onToggleSave: (property: Property) => void;
  savedPropertyIds: string[];
  onOpenLightbox: (images: { url: string; caption: string }[], index: number) => void;
}

/**
 * HomePage Component
 * Swiss International Style flagship view featuring:
 * - Parallax Depth Architectural Hero with quick search
 * - Animated Statistics Counter Grid
 * - Curated Architectural Masterworks with asymmetric layout
 * - Interactive 50-Year Heritage Timeline
 * - Testimonial Slider Carousel with drag/autoplay
 * - Neighborhood Spotlight & Journal Monographs
 */
export default function HomePage({
  onNavigate,
  onSelectProperty,
  onScheduleTour,
  onToggleSave,
  savedPropertyIds,
  onOpenLightbox,
}: HomePageProps) {
  // Quick Search Hero State
  const [searchCity, setSearchCity] = useState<string>('all');
  const [searchType, setSearchType] = useState<string>('all');
  const [searchPriceMax, setSearchPriceMax] = useState<number>(35000000);

  // Testimonials Carousel State
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState<number>(0);
  const [isTestimonialAutoPlay, setIsTestimonialAutoPlay] = useState<boolean>(true);

  // Auto rotate testimonials
  useEffect(() => {
    if (!isTestimonialAutoPlay) return;
    const timer = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isTestimonialAutoPlay]);

  const featuredProperties = PROPERTIES.filter((p) => p.featured);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('properties');
  };

  return (
    <div id="kronen-homepage-view" className="space-y-24 sm:space-y-32">
      {/* 1. HERO SECTION: Fullscreen Swiss Parallax Hero */}
      <section
        id="hero-section"
        className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
      >
        {/* Background Architectural Layer with subtle zoom */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
            alt="Swiss Modernist Architectural Masterwork"
            fill
            priority
            className="object-cover object-center filter brightness-[0.42] contrast-[1.08] scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Swiss grid overlay */}
          <div className="absolute inset-0 swiss-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        </div>

        {/* Centered Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-amber-500/30 text-amber-400 backdrop-blur-md text-xs font-mono tracking-widest uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>International Architectural Brokerage • Est. 1974</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight text-stone-100 leading-[1.08]"
          >
            Curating Landmark Living Spaces Across the Swiss Alps & Global Capitals.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-lg text-stone-300 max-w-2xl mx-auto font-sans leading-relaxed font-light"
          >
            A distinguished collection of modernist villas, lakefront pavilions, and alpine chalets selected for structural provenance and spatial purity.
          </motion.p>

          {/* Quick Search Widget */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <form
              onSubmit={handleHeroSearch}
              className="bg-stone-950/85 backdrop-blur-xl border border-stone-800 rounded-xl p-3 sm:p-4 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left"
            >
              {/* City Filter */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-amber-500 mb-1">
                  Location / Hub
                </label>
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
                >
                  <option value="all">All Global Hubs</option>
                  <option value="Zurich">Zurich Lakefront</option>
                  <option value="Geneva">Geneva & Cologny</option>
                  <option value="St. Moritz">St. Moritz & Engadin</option>
                  <option value="London">London Mayfair</option>
                  <option value="Tokyo">Tokyo Aoyama</option>
                  <option value="Aspen">Aspen Red Mountain</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-amber-500 mb-1">
                  Typology
                </label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
                >
                  <option value="all">All Typologies</option>
                  <option value="Modernist Villa">Modernist Villa</option>
                  <option value="Penthouse">Duplex Penthouse</option>
                  <option value="Alpine Chalet">Alpine Chalet</option>
                  <option value="Minimalist Haven">Minimalist Haven</option>
                  <option value="Historic Residence">Historic Residence</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-amber-500 mb-1">
                  Max Valuation
                </label>
                <select
                  value={searchPriceMax}
                  onChange={(e) => setSearchPriceMax(Number(e.target.value))}
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
                >
                  <option value={15000000}>Up to CHF 15M</option>
                  <option value={25000000}>Up to CHF 25M</option>
                  <option value={50000000}>Up to CHF 50M+</option>
                  <option value={100000000}>Unlimited Portfolio</option>
                </select>
              </div>

              {/* Submit CTA */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full h-[42px] rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Estates</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 2. ANIMATED STATISTICS COUNTER SECTION (Swiss Precision Grid) */}
      <section id="stats-counter-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-stone-800">
            {/* Stat 1 */}
            <div className="space-y-1 sm:px-4 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-semibold block">
                Total Portfolio Transacted
              </span>
              <p className="text-3xl sm:text-4xl font-mono font-extrabold text-stone-100">
                CHF <AnimatedCounter value={2.8} decimals={1} suffix="B+" />
              </p>
              <p className="text-xs text-stone-400 font-sans">
                Safe-haven Swiss & global prime residential assets.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1 pt-4 sm:pt-0 sm:px-4 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-semibold block">
                Valuation Accuracy
              </span>
              <p className="text-3xl sm:text-4xl font-mono font-extrabold text-stone-100">
                <AnimatedCounter value={99.4} decimals={1} suffix="%" />
              </p>
              <p className="text-xs text-stone-400 font-sans">
                ETH-calibrated spatial algorithmic appraisal models.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1 pt-4 sm:pt-0 sm:px-4 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-semibold block">
                Off-Market Exclusive Ratio
              </span>
              <p className="text-3xl sm:text-4xl font-mono font-extrabold text-stone-100">
                <AnimatedCounter value={78} suffix="%" />
              </p>
              <p className="text-xs text-stone-400 font-sans">
                Discreet private sales conducted under strict non-disclosure.
              </p>
            </div>

            {/* Stat 4 */}
            <div className="space-y-1 pt-4 sm:pt-0 sm:px-4 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-semibold block">
                Global Advisory Salons
              </span>
              <p className="text-3xl sm:text-4xl font-mono font-extrabold text-stone-100">
                <AnimatedCounter value={14} suffix=" Cities" />
              </p>
              <p className="text-xs text-stone-400 font-sans">
                Connected private banking & architectural liaison desks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CURATED MASTERWORKS (Swiss Asymmetric Cards) */}
      <section id="featured-residences-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
                Curated Selection
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-stone-100 tracking-tight">
              Landmark Architectural Residences
            </h2>
          </div>

          <button
            onClick={() => onNavigate('properties')}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 group"
          >
            <span>View Full Portfolio ({PROPERTIES.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, idx) => {
            const isSaved = savedPropertyIds.includes(property.id);
            return (
              <div
                key={property.id}
                className="group bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-xl hover:border-amber-500/60 transition-all duration-300 flex flex-col"
              >
                {/* Image Container with Lightbox & Quick View Triggers */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                  <Image
                    src={property.images[0]?.url || ''}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded bg-stone-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[10px] font-mono uppercase tracking-wider font-semibold pointer-events-auto">
                      {property.propertyType}
                    </span>

                    {/* Bookmark Save Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(property);
                      }}
                      className={`p-2 rounded-full backdrop-blur-md border transition-all pointer-events-auto ${
                        isSaved
                          ? 'bg-amber-500 border-amber-400 text-stone-950'
                          : 'bg-stone-950/70 border-stone-700 text-stone-200 hover:text-amber-400 hover:border-amber-500'
                      }`}
                      aria-label="Save to Watchlist"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Image Hover Actions */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onOpenLightbox(property.images, 0)}
                      className="px-2.5 py-1.5 rounded bg-stone-950/90 text-stone-200 text-[11px] font-mono border border-stone-700 hover:border-amber-500 hover:text-amber-400 backdrop-blur-md flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{property.images.length} Photos</span>
                    </button>
                  </div>
                </div>

                {/* Property Meta Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-1">
                      <span>{property.location.neighborhood}, {property.location.city}</span>
                      <span className="text-amber-500/90">A+++ Efficiency</span>
                    </div>

                    <h3
                      onClick={() => onSelectProperty(property)}
                      className="text-lg font-bold text-stone-100 hover:text-amber-400 cursor-pointer transition-colors line-clamp-1"
                    >
                      {property.title}
                    </h3>

                    <p className="text-xs text-stone-400 line-clamp-2 mt-1 font-sans">
                      {property.tagline}
                    </p>
                  </div>

                  {/* Specs Pill Strip */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-800 text-center font-mono text-xs text-stone-300">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-stone-400">BEDROOMS</span>
                      <span className="font-semibold">{property.specs.bedrooms} Suites</span>
                    </div>
                    <div className="flex flex-col border-x border-stone-800">
                      <span className="text-[10px] text-stone-400">LIVING AREA</span>
                      <span className="font-semibold">{property.specs.livingAreaSqM} m²</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-stone-400">ARCHITECT</span>
                      <span className="font-semibold truncate px-1">{property.specs.architect.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Price & Action CTA */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-stone-400 block">
                        Offer Price
                      </span>
                      <span className="text-base sm:text-lg font-mono font-bold text-amber-400">
                        {property.priceFormatted}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onScheduleTour(property)}
                        className="px-3 py-2 rounded bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-stone-950 border border-amber-500/30 text-xs font-mono font-medium transition-colors"
                      >
                        Tour
                      </button>
                      <button
                        onClick={() => onSelectProperty(property)}
                        className="p-2 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors"
                        aria-label="View Details"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SWISS ARCHITECTURAL PHILOSOPHY & 50-YEAR HERITAGE TIMELINE */}
      <section id="heritage-timeline-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Manifesto Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500">
                <ShieldCheck className="w-4 h-4" />
                <span>The Swiss Brokerage Manifesto</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-stone-100 tracking-tight leading-tight">
                Architecture is Not a Commodity. It is Preserved Structural Art.
              </h2>

              <p className="text-sm text-stone-300 leading-relaxed font-light">
                Since 1974, KRONEN has operated at the intersection of Swiss structural engineering, architectural history, and private wealth stewardship. We represent residences conceived by master architects where every angle, light well, and material joints are engineered for generational endurance.
              </p>

              <div className="space-y-3 pt-2 text-xs font-mono text-stone-300">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>100% Certified Passive & High-Tech Thermal Envelopes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Discreet Swiss Banking-Grade Non-Disclosure Protocol</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Comprehensive Historical Provenance & Architectural Blueprints</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('heritage')}
                className="pt-2 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
              >
                <span>Read Full 50-Year Heritage Monograph</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Interactive Timeline Stream */}
            <div className="lg:col-span-7 relative border-l-2 border-amber-500/30 pl-6 sm:pl-8 space-y-8">
              {HERITAGE_MILESTONES.slice(0, 4).map((milestone, idx) => (
                <div key={idx} className="relative group">
                  {/* Glowing timeline node */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-stone-950 border-2 border-amber-500 group-hover:scale-125 transition-transform" />

                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-amber-400">
                        {milestone.year}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                        {milestone.metric}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-stone-100">
                      {milestone.title}
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED CLIENT TESTIMONIALS SLIDER */}
      <section id="testimonials-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-stone-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
                Client Accreditations
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-stone-100 tracking-tight">
              Endorsed by Discerning Patrons & Architects
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsTestimonialAutoPlay(false);
                setActiveTestimonialIdx(
                  (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                );
              }}
              className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 hover:border-amber-500 transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setIsTestimonialAutoPlay(false);
                setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
              }}
              className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 hover:border-amber-500 transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Testimonial Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Avatar & Client Specs */}
            <div className="lg:col-span-4 flex sm:flex-col items-center sm:items-start gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-amber-500/60 shadow-xl flex-shrink-0">
                <Image
                  src={TESTIMONIALS[activeTestimonialIdx].avatar}
                  alt={TESTIMONIALS[activeTestimonialIdx].clientName}
                  fill
                  className="object-cover"
                  sizes="96px"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-100">
                  {TESTIMONIALS[activeTestimonialIdx].clientName}
                </h3>
                <p className="text-xs text-amber-500 font-mono">
                  {TESTIMONIALS[activeTestimonialIdx].clientTitle}
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  {TESTIMONIALS[activeTestimonialIdx].location}
                </p>
                <div className="flex items-center gap-1 mt-2 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="lg:col-span-8 space-y-4 border-t lg:border-t-0 lg:border-l border-stone-800 pt-6 lg:pt-0 lg:pl-8">
              <p className="text-lg sm:text-2xl font-sans font-light italic text-stone-200 leading-relaxed">
                &ldquo;{TESTIMONIALS[activeTestimonialIdx].quote}&rdquo;
              </p>

              <div className="pt-2 text-xs font-mono text-stone-400">
                Transacted Asset:{' '}
                <span className="text-amber-400 font-medium">
                  {TESTIMONIALS[activeTestimonialIdx].propertyTransacted}
                </span>{' '}
                • {TESTIMONIALS[activeTestimonialIdx].year}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-stone-800/80">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsTestimonialAutoPlay(false);
                  setActiveTestimonialIdx(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeTestimonialIdx ? 'w-8 bg-amber-500' : 'w-2 bg-stone-700'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEIGHBORHOOD SPOTLIGHT TEASER */}
      <section id="neighborhoods-teaser-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
                District Intelligence
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-stone-100 tracking-tight">
              Prime Global Enclaves
            </h2>
          </div>

          <button
            onClick={() => onNavigate('neighborhoods')}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 group"
          >
            <span>Explore All 6 Neighborhood Guides</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEIGHBORHOODS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('neighborhoods')}
              className="group relative h-80 rounded-xl overflow-hidden border border-stone-800 cursor-pointer shadow-xl"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.6]"
                sizes="(max-width: 768px) 100vw, 33vw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded bg-stone-950/80 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-amber-400 border border-amber-500/30">
                    {item.region}
                  </span>
                  <span className="text-xs font-mono text-stone-300">
                    {item.featuredEstatesCount} Estates
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-mono text-amber-500 uppercase tracking-wider">
                    {item.city}, {item.country}
                  </p>
                  <h3 className="text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs font-mono text-stone-400 pt-2 border-t border-stone-800/80">
                    <span>Median: {item.medianPricePerSqM}</span>
                    <span className="text-emerald-400">{item.fiveYearGrowth} (5yr)</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. ARCHITECTURAL JOURNAL INSIGHTS */}
      <section id="journal-preview-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
                Editorial Monographs
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-stone-100 tracking-tight">
              The Spatial Journal
            </h2>
          </div>

          <button
            onClick={() => onNavigate('journal')}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 group"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => onNavigate('journal')}
              className="group bg-stone-900 border border-stone-800 rounded-xl overflow-hidden cursor-pointer hover:border-amber-500/50 transition-all flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 px-2 py-1 rounded bg-stone-950/80 backdrop-blur-md text-[10px] font-mono text-amber-400 border border-amber-500/30 uppercase">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span>{article.publishedDate}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-100 group-hover:text-amber-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-stone-800">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                      sizes="28px"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-[11px] font-mono truncate">
                    <p className="text-stone-200 font-medium truncate">{article.author.name}</p>
                    <p className="text-stone-500 truncate">{article.author.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 8. VIP PRIVATE CONCIERGE BANNER */}
      <section id="vip-concierge-cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-2 border-amber-500/40 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="inline-block px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest">
              Confidential Private Client Desk
            </span>

            <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-stone-100 tracking-tight">
              Seeking an Unlisted Architectural Masterwork?
            </h2>

            <p className="text-sm text-stone-300 leading-relaxed font-light">
              Over 75% of our landmark transactions occur off-market under strict banking non-disclosure agreements. Schedule a private consultation with our Swiss managing partners.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 active:scale-95"
              >
                Schedule Confidential Consultation
              </button>
              <button
                onClick={() => onNavigate('calculator')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-stone-900 border border-stone-700 hover:border-amber-500 text-stone-200 hover:text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Financial & Yield Suite
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
