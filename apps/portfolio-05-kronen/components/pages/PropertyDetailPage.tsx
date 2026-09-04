'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Calendar,
  Eye,
  CheckCircle2,
  Building,
  Bed,
  Bath,
  Move,
  Compass,
  FileText,
  Shield,
  Phone,
  Mail,
  Zap,
  Layers,
  MapPin,
  Check,
  Sparkles,
  Maximize2,
} from 'lucide-react';
import Image from 'next/image';
import { Property, Agent } from '@/types';
import { AGENTS } from '@/data/agents';
import { PROPERTIES } from '@/data/properties';
import MortgageCalculatorWidget from '@/components/MortgageCalculatorWidget';

interface PropertyDetailPageProps {
  property: Property;
  onBack: () => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
  onToggleSave: (property: Property) => void;
  isSaved: boolean;
  onOpenLightbox: (images: { url: string; caption: string }[], index: number) => void;
}

/**
 * PropertyDetailPage Component
 * In-depth architectural monograph and technical breakdown of an individual residence.
 */
export default function PropertyDetailPage({
  property,
  onBack,
  onSelectProperty,
  onScheduleTour,
  onToggleSave,
  isSaved,
  onOpenLightbox,
}: PropertyDetailPageProps) {
  const [activeFloorPlanIdx, setActiveFloorPlanIdx] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [virtualTourAngle, setVirtualTourAngle] = useState<number>(0);

  const assignedAgent: Agent =
    AGENTS.find((a) => a.id === property.agentId) || AGENTS[0];

  const similarProperties = PROPERTIES.filter(
    (p) => p.id !== property.id && (p.propertyType === property.propertyType || p.location.city === property.location.city)
  ).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div id="property-detail-view" className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Top Navigation & Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Curated Portfolio</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs font-mono text-stone-300 hover:text-white hover:border-stone-700 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{isCopied ? 'Link Copied!' : 'Share Dossier'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleSave(property)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
              isSaved
                ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                : 'bg-stone-900 border-stone-800 text-stone-300 hover:text-amber-400 hover:border-amber-500'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? 'In Watchlist' : 'Save Residence'}</span>
          </button>

          {/* Schedule VIP Tour Button */}
          <button
            onClick={() => onScheduleTour(property)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-amber-500/20"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Viewing</span>
          </button>
        </div>
      </div>

      {/* 1. PHOTO COLLAGE GALLERY & LIGHTBOX LAUNCHER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Hero Shot (8 cols) */}
        <div
          className="lg:col-span-8 relative aspect-[16/10] rounded-xl overflow-hidden bg-stone-950 cursor-pointer group shadow-2xl"
          onClick={() => onOpenLightbox(property.images, 0)}
        >
          <Image
            src={property.images[0]?.url || ''}
            alt={property.title}
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 66vw"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-stone-100">
            <span className="text-xs font-mono px-3 py-1 rounded bg-stone-950/80 backdrop-blur-md border border-stone-700">
              {property.images[0]?.caption}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded bg-amber-500 text-stone-950 font-bold">
              <Maximize2 className="w-3.5 h-3.5" />
              Expand High-Res Gallery
            </span>
          </div>
        </div>

        {/* 2 Side Thumbnails + View All button (4 cols) */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
          {property.images.slice(1, 3).map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-[16/10] lg:aspect-auto lg:h-[calc(50%-8px)] rounded-xl overflow-hidden bg-stone-950 cursor-pointer group"
              onClick={() => onOpenLightbox(property.images, idx + 1)}
            >
              <Image
                src={img.url}
                alt={img.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 50vw, 33vw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-950/30 group-hover:bg-transparent transition-colors" />
              <span className="absolute bottom-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-stone-950/80 text-stone-300 truncate max-w-[85%]">
                {img.caption}
              </span>
            </div>
          ))}

          {/* View All Photos Button */}
          <button
            onClick={() => onOpenLightbox(property.images, 0)}
            className="col-span-2 lg:col-span-1 py-3 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500 text-stone-300 hover:text-amber-400 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>View All {property.images.length} High-Res Architectural Plates</span>
          </button>
        </div>
      </div>

      {/* 2. TITLE, PRICE & KEY SPECS BANNER */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider font-semibold">
                {property.status} • {property.propertyType}
              </span>
              <span className="text-xs font-mono text-stone-400">
                Energy Rating: <strong className="text-emerald-400">{property.specs.energyRating}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-stone-100 tracking-tight">
              {property.title}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-stone-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              {property.location.address}
            </p>
          </div>

          <div className="lg:text-right">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block">
              Official Valuation
            </span>
            <span className="text-3xl sm:text-4xl font-mono font-extrabold text-amber-400">
              {property.priceFormatted}
            </span>
            <span className="text-xs font-mono text-stone-500 block mt-0.5">
              Approx. CHF {Math.round(property.price / property.specs.livingAreaSqM).toLocaleString()} / m²
            </span>
          </div>
        </div>

        {/* Architectural Specs 6-Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-800 text-center font-mono">
          <div className="space-y-1 sm:px-2">
            <span className="text-[10px] text-stone-400 uppercase">Living Area</span>
            <p className="text-base font-bold text-stone-200">{property.specs.livingAreaSqM} m²</p>
            <span className="text-[10px] text-stone-400">({property.specs.livingAreaSqFt.toLocaleString()} sq ft)</span>
          </div>

          <div className="space-y-1 pt-3 sm:pt-0 sm:px-2">
            <span className="text-[10px] text-stone-400 uppercase">Bedrooms</span>
            <p className="text-base font-bold text-stone-200">{property.specs.bedrooms} Suites</p>
            <span className="text-[10px] text-stone-400">All En-Suite</span>
          </div>

          <div className="space-y-1 pt-3 sm:pt-0 sm:px-2">
            <span className="text-[10px] text-stone-400 uppercase">Bathrooms</span>
            <p className="text-base font-bold text-stone-200">{property.specs.bathrooms} Full</p>
            <span className="text-[10px] text-stone-400">Natural Stone</span>
          </div>

          <div className="space-y-1 pt-3 sm:pt-0 sm:px-2">
            <span className="text-[10px] text-stone-400 uppercase">Year Built</span>
            <p className="text-base font-bold text-stone-200">{property.specs.yearBuilt}</p>
            <span className="text-[10px] text-stone-400">Mint Condition</span>
          </div>

          <div className="space-y-1 pt-3 sm:pt-0 sm:px-2">
            <span className="text-[10px] text-stone-400 uppercase">Architect</span>
            <p className="text-base font-bold text-stone-200 truncate">{property.specs.architect.split(' ')[0]}</p>
            <span className="text-[10px] text-stone-400 truncate">{property.specs.architecturalStyle}</span>
          </div>

          <div className="space-y-1 pt-3 sm:pt-0 sm:px-2">
            <span className="text-[10px] text-stone-400 uppercase">Lot Size</span>
            <p className="text-base font-bold text-stone-200">
              {property.specs.lotSizeSqM > 0 ? `${property.specs.lotSizeSqM} m²` : 'Freehold Air'}
            </p>
            <span className="text-[10px] text-stone-400">Private Grounds</span>
          </div>
        </div>
      </div>

      {/* 3. MAIN BODY GRID: Narrative, Amenities, Floor Plans & Broker Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Narrative, Amenities, Floor Plans, 360 Tour (8 cols) */}
        <div className="lg:col-span-8 space-y-12">
          {/* Architectural Narrative */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
                Architectural Monograph
              </h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-100">
              {property.tagline}
            </h3>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              {property.description}
            </p>
          </section>

          {/* Amenities & High-Tech Features Grid */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
                Luxury Specifications & Amenities
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-lg bg-stone-900 border border-stone-800 text-xs font-mono text-stone-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Floor Plans Tabbed Viewer */}
          <section className="space-y-4 bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
                  Architectural Floor Plans
                </h2>
              </div>

              {/* Level Switcher Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                {property.floorPlans.map((plan, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFloorPlanIdx(idx)}
                    className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-colors ${
                      activeFloorPlanIdx === idx
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'bg-stone-950 border border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    Level {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Floor Plan Display */}
            {property.floorPlans[activeFloorPlanIdx] && (
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-stone-100 font-semibold">
                    {property.floorPlans[activeFloorPlanIdx].level}
                  </span>
                  <span className="text-amber-400">
                    {property.floorPlans[activeFloorPlanIdx].dimensions}
                  </span>
                </div>

                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-950 border border-stone-800">
                  <Image
                    src={property.floorPlans[activeFloorPlanIdx].image}
                    alt={property.floorPlans[activeFloorPlanIdx].level}
                    fill
                    className="object-cover filter contrast-125 brightness-90"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 right-3 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono text-stone-300 border border-stone-700">
                    ETH Cadastre Verified
                  </div>
                </div>

                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  {property.floorPlans[activeFloorPlanIdx].description}
                </p>
              </div>
            )}
          </section>

          {/* 360° Virtual Walkthrough Panoramic Simulation */}
          <section className="space-y-4 bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
                  360° Interactive Spatial Walkthrough
                </h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Ultra-HD 8K Stream
              </span>
            </div>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-950 border border-stone-800 flex items-center justify-center">
              <Image
                src={property.images[1]?.url || property.images[0]?.url}
                alt="360 Virtual View"
                fill
                style={{
                  transform: `scale(1.15) rotate(${virtualTourAngle * 0.05}deg) translateX(${virtualTourAngle}px)`,
                }}
                className="object-cover transition-transform duration-300 filter brightness-95"
                referrerPolicy="no-referrer"
              />

              {/* Panoramic Controls Overlay */}
              <div className="absolute inset-0 bg-stone-950/30 flex flex-col justify-between p-6">
                <div className="flex justify-between items-center text-xs font-mono text-stone-200">
                  <span className="bg-stone-950/80 px-2.5 py-1 rounded border border-stone-700">
                    Grand Living Salon Viewpoint
                  </span>
                  <span className="text-amber-400">Drag or Use Arrows to Pan</span>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setVirtualTourAngle((prev) => prev - 20)}
                    className="px-4 py-2 rounded-lg bg-stone-950/80 border border-stone-700 text-stone-200 hover:text-amber-400 hover:border-amber-500 font-mono text-xs backdrop-blur-md"
                  >
                    ◀ Pan Left
                  </button>
                  <button
                    onClick={() => setVirtualTourAngle(0)}
                    className="px-4 py-2 rounded-lg bg-amber-500 text-stone-950 font-mono text-xs font-bold"
                  >
                    Reset View
                  </button>
                  <button
                    onClick={() => setVirtualTourAngle((prev) => prev + 20)}
                    className="px-4 py-2 rounded-lg bg-stone-950/80 border border-stone-700 text-stone-200 hover:text-amber-400 hover:border-amber-500 font-mono text-xs backdrop-blur-md"
                  >
                    Pan Right ▶
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Embedded Real-Time Financial Calculator */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
                Dedicated Financial & Debt Analysis
              </h2>
            </div>
            <MortgageCalculatorWidget
              initialPrice={property.price}
              currency={property.currency}
            />
          </section>
        </div>

        {/* Right Sidebar: Lead Broker, Viewing Booking, Scores (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Lead Broker Card */}
          <div className="bg-stone-900 border-2 border-stone-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-800">
              <Shield className="w-4 h-4 text-amber-500" />
              <span className="font-mono text-xs uppercase tracking-wider text-amber-500 font-semibold">
                Principal Estate Broker
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500/50 flex-shrink-0">
                <Image
                  src={assignedAgent.photo}
                  alt={assignedAgent.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-100">
                  {assignedAgent.name}
                </h3>
                <p className="text-xs text-amber-500 font-mono">
                  {assignedAgent.role}
                </p>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  {assignedAgent.title}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-sans">
              {assignedAgent.bio}
            </p>

            <div className="space-y-2 pt-2 border-t border-stone-800 text-xs font-mono text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>{assignedAgent.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span className="truncate">{assignedAgent.email}</span>
              </div>
            </div>

            <button
              onClick={() => onScheduleTour(property)}
              className="w-full py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Schedule Private Viewing
            </button>
          </div>

          {/* Neighborhood & Transit Scorecard */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-500 font-semibold">
                District Scorecard
              </span>
              <span className="text-xs font-mono text-stone-400">
                {property.location.neighborhood}
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-stone-300 mb-1">
                  <span>Pedestrian Walkability</span>
                  <span className="text-amber-400 font-bold">{property.scores.walk}/100</span>
                </div>
                <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                  <div style={{ width: `${property.scores.walk}%` }} className="h-full bg-amber-500" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-300 mb-1">
                  <span>Private Transit & Airport Link</span>
                  <span className="text-amber-400 font-bold">{property.scores.transit}/100</span>
                </div>
                <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                  <div style={{ width: `${property.scores.transit}%` }} className="h-full bg-amber-500" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-300 mb-1">
                  <span>International Academies</span>
                  <span className="text-amber-400 font-bold">{property.scores.schools}/100</span>
                </div>
                <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                  <div style={{ width: `${property.scores.schools}%` }} className="h-full bg-amber-500" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-300 mb-1">
                  <span>Perimeter Security & Privacy</span>
                  <span className="text-amber-400 font-bold">{property.scores.privacy}/100</span>
                </div>
                <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                  <div style={{ width: `${property.scores.privacy}%` }} className="h-full bg-amber-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SIMILAR ARCHITECTURAL RESIDENCES */}
      {similarProperties.length > 0 && (
        <section className="pt-12 border-t border-stone-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-100">
              Comparable Architectural Residences
            </h3>
            <button
              onClick={onBack}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 uppercase tracking-wider"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => {
                  onSelectProperty(prop);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-stone-900 border border-stone-800 rounded-xl overflow-hidden cursor-pointer hover:border-amber-500/50 transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                  <Image
                    src={prop.images[0]?.url || ''}
                    alt={prop.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-stone-950/80 text-[10px] font-mono text-amber-400 border border-amber-500/30">
                    {prop.propertyType}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-xs font-mono text-stone-400">{prop.location.city}</p>
                  <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-400 transition-colors truncate">
                    {prop.title}
                  </h4>
                  <p className="text-sm font-mono font-bold text-amber-400">
                    {prop.priceFormatted}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
