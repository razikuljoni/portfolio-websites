'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  Map as MapIcon,
  Bookmark,
  Calendar,
  Eye,
  ArrowUpRight,
  Bed,
  Bath,
  Move,
  Check,
  X,
  MapPin,
  Building,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import Image from 'next/image';
import { Property, FilterState } from '@/types';
import { PROPERTIES } from '@/data/properties';

interface PropertiesPageProps {
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
  onToggleSave: (property: Property) => void;
  savedPropertyIds: string[];
  onOpenLightbox: (images: { url: string; caption: string }[], index: number) => void;
}

/**
 * PropertiesPage Component
 * Full-scale Swiss real estate catalogue with faceted search filters,
 * Grid / List / Interactive Map view toggles, instant state matching, and watchlist toggles.
 */
export default function PropertiesPage({
  onSelectProperty,
  onScheduleTour,
  onToggleSave,
  savedPropertyIds,
  onOpenLightbox,
}: PropertiesPageProps) {
  // View mode: grid | list | map
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);
  const [selectedMapPinProperty, setSelectedMapPinProperty] = useState<Property | null>(PROPERTIES[0]);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    listingType: 'all',
    propertyType: 'all',
    minPrice: 0,
    maxPrice: 50000000,
    minBedrooms: 0,
    minBathrooms: 0,
    city: 'all',
    sortBy: 'featured',
    selectedAmenities: [],
  });

  const availableAmenities = [
    'Lakefront Private Mooring',
    'Heated Infinity Pool',
    'Vals Quartzite Turkish Hamam & Ice Plunge',
    'Private Keyed Biometric Elevator',
    'Direct Ski-In / Ski-Out Access to Corviglia',
    'Custom Boffi Kitchen with Gaggenau 400',
    'Integrated Bang & Olufsen Acoustic System',
    'Sunken Japanese Courtyard with Bonsai Tree',
  ];

  const propertyTypes = [
    'all',
    'Modernist Villa',
    'Penthouse',
    'Alpine Chalet',
    'Minimalist Haven',
    'Historic Residence',
  ];

  const cities = ['all', 'Zurich', 'Geneva', 'St. Moritz', 'London', 'Tokyo', 'Aspen'];

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesCity = property.location.city.toLowerCase().includes(query);
        const matchesNeighborhood = property.location.neighborhood.toLowerCase().includes(query);
        const matchesArchitect = property.specs.architect.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCity && !matchesNeighborhood && !matchesArchitect) {
          return false;
        }
      }

      // Listing Type (sale/rent)
      if (filters.listingType !== 'all' && property.listingType !== filters.listingType) {
        return false;
      }

      // Property Type
      if (filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) {
        return false;
      }

      // City
      if (filters.city !== 'all' && property.location.city !== filters.city) {
        return false;
      }

      // Price
      if (property.price > filters.maxPrice) {
        return false;
      }

      // Bedrooms
      if (filters.minBedrooms > 0 && property.specs.bedrooms < filters.minBedrooms) {
        return false;
      }

      // Bathrooms
      if (filters.minBathrooms > 0 && property.specs.bathrooms < filters.minBathrooms) {
        return false;
      }

      // Selected Amenities
      if (filters.selectedAmenities.length > 0) {
        const hasAllAmenities = filters.selectedAmenities.every((amenity) =>
          property.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'area-desc') return b.specs.livingAreaSqM - a.specs.livingAreaSqM;
      if (filters.sortBy === 'year-desc') return b.specs.yearBuilt - a.specs.yearBuilt;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      listingType: 'all',
      propertyType: 'all',
      minPrice: 0,
      maxPrice: 50000000,
      minBedrooms: 0,
      minBathrooms: 0,
      city: 'all',
      sortBy: 'featured',
      selectedAmenities: [],
    });
  };

  const toggleAmenity = (amenity: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter((a) => a !== amenity)
        : [...prev.selectedAmenities, amenity],
    }));
  };

  return (
    <div id="kronen-properties-view" className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Heading Banner */}
      <div className="border-b border-stone-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
              Curated Portfolio
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-sans font-bold text-stone-100 tracking-tight">
            Architectural Residences
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl font-light">
            Each estate is verified for structural integrity, energy balance (A+++), and rare architectural provenance.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-stone-900 border border-stone-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
              viewMode === 'grid'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-white'
            }`}
            aria-label="Grid View"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
              viewMode === 'list'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-white'
            }`}
            aria-label="List View"
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">List</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
              viewMode === 'map'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-white'
            }`}
            aria-label="Interactive Map View"
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Map</span>
          </button>
        </div>
      </div>

      {/* Main Search & Filter Control Strip */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 sm:p-5 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Keyword Search (4 cols) */}
          <div className="lg:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="text"
              placeholder="Search by city, architect, style..."
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters({ ...filters, searchQuery: e.target.value })
              }
              className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 font-mono transition-colors"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Buy / Rent Switch (2 cols) */}
          <div className="lg:col-span-2">
            <select
              value={filters.listingType}
              onChange={(e) =>
                setFilters({ ...filters, listingType: e.target.value as any })
              }
              className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
            >
              <option value="all">Sale & Lease</option>
              <option value="sale">For Acquisition</option>
              <option value="rent">Prime Lease</option>
            </select>
          </div>

          {/* City Selector (2 cols) */}
          <div className="lg:col-span-2">
            <select
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
            >
              <option value="all">All Locations</option>
              {cities
                .filter((c) => c !== 'all')
                .map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>

          {/* Sort By (2 cols) */}
          <div className="lg:col-span-2">
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value as any })
              }
              className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="area-desc">Living Area: Largest</option>
              <option value="year-desc">Year: Newest</option>
            </select>
          </div>

          {/* Advanced Filter Toggle Button (2 cols) */}
          <div className="lg:col-span-2 flex gap-2">
            <button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-mono uppercase tracking-wider transition-colors ${
                isFilterPanelOpen
                  ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                  : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Typology Filter Quick Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
          {propertyTypes.map((type) => {
            const isActive = filters.propertyType === type;
            return (
              <button
                key={type}
                onClick={() => setFilters({ ...filters, propertyType: type })}
                className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                {type === 'all' ? 'All Typologies' : type}
              </button>
            );
          })}
        </div>

        {/* Collapsible Advanced Filter Drawer */}
        <AnimatePresence>
          {isFilterPanelOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-4 border-t border-stone-800 space-y-5 overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Max Price Range */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-stone-300 mb-1">
                    <span>Max Valuation</span>
                    <span className="text-amber-400 font-bold">
                      CHF {filters.maxPrice.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5000000}
                    max={50000000}
                    step={1000000}
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, maxPrice: Number(e.target.value) })
                    }
                    className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-1">
                    <span>CHF 5M</span>
                    <span>CHF 25M</span>
                    <span>CHF 50M+</span>
                  </div>
                </div>

                {/* Min Bedrooms */}
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-300 mb-2">
                    Minimum Bedrooms
                  </label>
                  <div className="flex items-center gap-2">
                    {[0, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() =>
                          setFilters({ ...filters, minBedrooms: num })
                        }
                        className={`flex-1 py-1.5 rounded text-xs font-mono border transition-colors ${
                          filters.minBedrooms === num
                            ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        {num === 0 ? 'Any' : `${num}+`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Min Bathrooms */}
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-300 mb-2">
                    Minimum Bathrooms
                  </label>
                  <div className="flex items-center gap-2">
                    {[0, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() =>
                          setFilters({ ...filters, minBathrooms: num })
                        }
                        className={`flex-1 py-1.5 rounded text-xs font-mono border transition-colors ${
                          filters.minBathrooms === num
                            ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        {num === 0 ? 'Any' : `${num}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Amenities Checklist */}
              <div>
                <label className="block text-xs font-mono uppercase text-stone-300 mb-2">
                  Architectural & Luxury Features
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {availableAmenities.map((amenity) => {
                    const isSelected = filters.selectedAmenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs font-mono transition-colors ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                            isSelected
                              ? 'bg-amber-500 border-amber-500 text-stone-950'
                              : 'border-stone-700'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span className="truncate">{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reset Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                <span className="text-xs font-mono text-stone-400">
                  {filteredProperties.length} Matches Found
                </span>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-xs font-mono text-stone-400 hover:text-amber-400 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs font-mono text-stone-400">
        <span>
          Showing <strong className="text-stone-200">{filteredProperties.length}</strong> of{' '}
          {PROPERTIES.length} Curated Residences
        </span>
        {filters.searchQuery && (
          <span className="text-amber-500">
            Filtered by: &ldquo;{filters.searchQuery}&rdquo;
          </span>
        )}
      </div>

      {/* 1. GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => {
            const isSaved = savedPropertyIds.includes(property.id);
            return (
              <div
                key={property.id}
                className="group bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-xl hover:border-amber-500/60 transition-all duration-300 flex flex-col"
              >
                {/* Image & Lightbox Trigger */}
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

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-1">
                      <span>{property.location.neighborhood}, {property.location.city}</span>
                      <span className="text-amber-500/90 font-semibold">{property.specs.energyRating}</span>
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

                  {/* Specs */}
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
                      <span className="text-[10px] text-stone-400">YEAR</span>
                      <span className="font-semibold">{property.specs.yearBuilt}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
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
      )}

      {/* 2. LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredProperties.map((property) => {
            const isSaved = savedPropertyIds.includes(property.id);
            return (
              <div
                key={property.id}
                className="group bg-stone-900 border border-stone-800 rounded-xl p-4 sm:p-6 shadow-xl hover:border-amber-500/60 transition-all flex flex-col md:flex-row gap-6 items-center"
              >
                {/* Thumbnail */}
                <div
                  className="relative w-full md:w-64 aspect-[16/10] md:aspect-square rounded-lg overflow-hidden flex-shrink-0 bg-stone-950 cursor-pointer"
                  onClick={() => onSelectProperty(property)}
                >
                  <Image
                    src={property.images[0]?.url || ''}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 256px"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-stone-950/80 text-[10px] font-mono text-amber-400 border border-amber-500/30 uppercase">
                    {property.propertyType}
                  </span>
                </div>

                {/* Body Details */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-mono text-stone-400">
                        {property.location.neighborhood}, {property.location.city} • Architect: {property.specs.architect}
                      </p>
                      <h3
                        onClick={() => onSelectProperty(property)}
                        className="text-xl font-bold text-stone-100 hover:text-amber-400 cursor-pointer transition-colors"
                      >
                        {property.title}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-mono font-bold text-amber-400 block">
                        {property.priceFormatted}
                      </span>
                      <span className="text-[10px] font-mono text-stone-500">
                        CHF {Math.round(property.price / property.specs.livingAreaSqM).toLocaleString()}/m²
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-400 font-sans line-clamp-2">
                    {property.description}
                  </p>

                  {/* Specs & Actions Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-800">
                    <div className="flex items-center gap-4 text-xs font-mono text-stone-300">
                      <span className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-stone-500" />
                        {property.specs.bedrooms} Beds
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-stone-500" />
                        {property.specs.bathrooms} Baths
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Move className="w-4 h-4 text-stone-500" />
                        {property.specs.livingAreaSqM} m² ({property.specs.livingAreaSqFt} sq ft)
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onToggleSave(property)}
                        className={`p-2 rounded border transition-colors ${
                          isSaved
                            ? 'bg-amber-500 text-stone-950 border-amber-500'
                            : 'bg-stone-950 border-stone-800 text-stone-300 hover:text-amber-400'
                        }`}
                        aria-label="Save"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onScheduleTour(property)}
                        className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Schedule Tour
                      </button>
                      <button
                        onClick={() => onSelectProperty(property)}
                        className="px-4 py-2 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono text-xs uppercase tracking-wider transition-colors"
                      >
                        View Dossier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. INTERACTIVE MAP VIEW */}
      {viewMode === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Map Interactive Canvas */}
          <div className="lg:col-span-8 bg-stone-900 border border-stone-800 rounded-xl overflow-hidden relative h-[580px] shadow-2xl flex flex-col">
            {/* Top map controls bar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="bg-stone-950/90 border border-stone-800 px-3 py-1.5 rounded-lg text-xs font-mono text-stone-200 pointer-events-auto backdrop-blur-md">
                Swiss & Global Spatial Coordinates (Click pins to preview)
              </div>
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2.5 py-1 rounded text-xs font-mono pointer-events-auto">
                {filteredProperties.length} Active Pins
              </span>
            </div>

            {/* Custom Interactive Dark Map Canvas Simulator */}
            <div className="relative w-full h-full bg-[#11100f] overflow-hidden flex items-center justify-center">
              {/* World/Regional Contour Grid Lines */}
              <div className="absolute inset-0 swiss-grid-pattern opacity-60" />

              {/* Map Pins */}
              {filteredProperties.map((prop, idx) => {
                const isSelected = selectedMapPinProperty?.id === prop.id;
                // Distribute pins across interactive canvas based on relative coordinates
                const leftPercent = 20 + ((idx * 27) % 65);
                const topPercent = 25 + ((idx * 33) % 55);

                return (
                  <motion.div
                    key={prop.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.08 }}
                    style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    onClick={() => setSelectedMapPinProperty(prop)}
                  >
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all shadow-xl ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 scale-110 ring-4 ring-amber-500/30'
                          : 'bg-stone-900/90 border border-stone-700 text-stone-200 hover:border-amber-500 hover:text-amber-400'
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-stone-950' : 'text-amber-500'}`} />
                      <span>{prop.location.city}</span>
                      <span className="text-[10px] opacity-80">
                        {prop.priceFormatted.split(' ')[1] || prop.priceFormatted}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Center Swiss Geographic Base Label */}
              <div className="text-center select-none pointer-events-none opacity-20">
                <span className="font-mono text-8xl font-black tracking-widest text-stone-700 block">
                  KRONEN
                </span>
                <span className="font-mono text-sm tracking-[0.5em] text-amber-500 uppercase">
                  Spatial Real Estate Index
                </span>
              </div>
            </div>
          </div>

          {/* Selected Pin Estate Preview Card (4 cols) */}
          <div className="lg:col-span-4">
            {selectedMapPinProperty ? (
              <div className="bg-stone-900 border-2 border-amber-500/60 rounded-xl overflow-hidden shadow-2xl p-5 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-amber-500">
                  <span>Selected Pin Dossier</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                    {selectedMapPinProperty.status}
                  </span>
                </div>

                <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-stone-950">
                  <Image
                    src={selectedMapPinProperty.images[0]?.url || ''}
                    alt={selectedMapPinProperty.title}
                    fill
                    className="object-cover"
                    sizes="400px"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-stone-950/80 text-[10px] font-mono text-amber-400">
                    {selectedMapPinProperty.propertyType}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-stone-100">
                    {selectedMapPinProperty.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {selectedMapPinProperty.location.address}
                  </p>
                  <p className="text-xl font-mono font-bold text-amber-400 mt-2">
                    {selectedMapPinProperty.priceFormatted}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-y border-stone-800 text-center font-mono text-xs text-stone-300">
                  <div>
                    <span className="text-[10px] text-stone-400 block">BEDS</span>
                    <span className="font-semibold">{selectedMapPinProperty.specs.bedrooms}</span>
                  </div>
                  <div className="border-x border-stone-800">
                    <span className="text-[10px] text-stone-400 block">AREA</span>
                    <span className="font-semibold">{selectedMapPinProperty.specs.livingAreaSqM} m²</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">ARCHITECT</span>
                    <span className="font-semibold truncate block px-1">
                      {selectedMapPinProperty.specs.architect.split(' ')[0]}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => onSelectProperty(selectedMapPinProperty)}
                    className="w-full py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Open Architectural Dossier
                  </button>
                  <button
                    onClick={() => onScheduleTour(selectedMapPinProperty)}
                    className="w-full py-2 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono text-xs uppercase tracking-wider transition-colors"
                  >
                    Schedule Private Viewing
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8 text-center text-stone-500 border border-stone-800 rounded-xl">
                Click any pin on the map to inspect estate specs.
              </div>
            )}
          </div>
        </div>
      )}

      {/* No results fallback */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-20 bg-stone-900 border border-stone-800 rounded-2xl space-y-4">
          <Building className="w-12 h-12 text-stone-600 mx-auto stroke-1" />
          <h3 className="text-lg font-bold text-stone-200">
            No Residences Match Current Filters
          </h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Try adjusting your search keyword, price boundary, or typology criteria to see available portfolio assets.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded bg-amber-500 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
