'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  TrendingUp,
  Utensils,
  Trees,
  Compass,
  ArrowRight,
  Shield,
  Building,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { Neighborhood } from '@/types';
import { NEIGHBORHOODS } from '@/data/neighborhoods';

interface NeighborhoodsPageProps {
  onNavigateToProperties: (city: string) => void;
  onScheduleConsultation: () => void;
}

/**
 * NeighborhoodsPage Component
 * Swiss architectural district monographs detailing capital growth, zoning,
 * lifestyle indices, Michelin density, and prime neighborhood intelligence.
 */
export default function NeighborhoodsPage({
  onNavigateToProperties,
  onScheduleConsultation,
}: NeighborhoodsPageProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const regions = ['all', 'Switzerland', 'Europe', 'Americas', 'Asia-Pacific'];

  const filteredNeighborhoods = NEIGHBORHOODS.filter((n) =>
    selectedRegion === 'all' ? true : n.region === selectedRegion
  );

  return (
    <div id="neighborhoods-view" className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Banner */}
      <div className="border-b border-stone-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
              District Intelligence
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-sans font-bold text-stone-100 tracking-tight">
            Prime Global Enclaves
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-2xl font-light leading-relaxed">
            In-depth architectural monographs analyzing safe-haven stability, cantonal zoning regulations, cultural infrastructure, and capital appreciation across the world’s most prestigious residential districts.
          </p>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none bg-stone-900 border border-stone-800 p-1.5 rounded-lg self-start md:self-auto">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                selectedRegion === region
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              {region === 'all' ? 'All Regions' : region}
            </button>
          ))}
        </div>
      </div>

      {/* Neighborhood Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredNeighborhoods.map((district) => (
          <div
            key={district.id}
            className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Banner */}
            <div className="relative aspect-[16/9] overflow-hidden bg-stone-950 group">
              <Image
                src={district.image}
                alt={district.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                sizes="(max-width: 768px) 100vw, 50vw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-stone-950/80 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-amber-400 border border-amber-500/30 font-semibold">
                  {district.region}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-stone-100">
                <p className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {district.city}, {district.country}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-100 mt-0.5">
                  {district.name}
                </h3>
              </div>
            </div>

            {/* Monograph Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed font-light">
                  {district.description}
                </p>

                <div className="bg-stone-950/60 border border-stone-800 rounded-lg p-3.5 text-xs font-mono text-amber-400 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{district.highlightText}</span>
                </div>

                {/* Key Metrics 4-Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-stone-800 text-center font-mono text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] text-stone-400 block uppercase">Median / m²</span>
                    <span className="font-bold text-stone-200">{district.medianPricePerSqM}</span>
                  </div>
                  <div className="space-y-1 border-l border-stone-800">
                    <span className="text-[10px] text-stone-400 block uppercase">5-Yr Growth</span>
                    <span className="font-bold text-emerald-400">{district.fiveYearGrowth}</span>
                  </div>
                  <div className="space-y-1 border-l border-stone-800">
                    <span className="text-[10px] text-stone-400 block uppercase">Michelin Stars</span>
                    <span className="font-bold text-stone-200">{district.michelinRestaurants} Venues</span>
                  </div>
                  <div className="space-y-1 border-l border-stone-800">
                    <span className="text-[10px] text-stone-400 block uppercase">Green Reserve</span>
                    <span className="font-bold text-stone-200">{district.greenSpacePercent}% Area</span>
                  </div>
                </div>

                {/* Lifestyle Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {district.lifestyleTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-stone-950 text-[11px] font-mono text-stone-400 border border-stone-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onNavigateToProperties(district.city)}
                  className="w-full py-3 rounded-lg bg-stone-950 border border-stone-800 hover:border-amber-500 text-stone-200 hover:text-amber-400 font-mono text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <span>View Curated Listings in {district.city}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bespoke District Search CTA */}
      <div className="bg-stone-900 border-2 border-stone-800 rounded-2xl p-8 sm:p-10 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-100">
          Require Confidential Cantonal Zoning & Off-Market Research?
        </h3>
        <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto font-light leading-relaxed">
          Our in-house ETH architectural historians and urban planners provide proprietary zoning feasibility audits and micro-climate studies.
        </p>
        <button
          onClick={onScheduleConsultation}
          className="px-8 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-all"
        >
          Commission Custom District Research
        </button>
      </div>
    </div>
  );
}
