'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Calendar, ArrowRight, Bookmark, Building, Bed, Bath, Move } from 'lucide-react';
import Image from 'next/image';
import { Property } from '@/types';

interface SavedPropertiesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProperties: Property[];
  onRemove: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
  onClearAll: () => void;
}

/**
 * SavedPropertiesDrawer Component
 * Displays client's saved watchlist of architectural residences with comparison metrics
 * and direct viewing booking shortcuts.
 */
export default function SavedPropertiesDrawer({
  isOpen,
  onClose,
  savedProperties,
  onRemove,
  onSelectProperty,
  onScheduleTour,
  onClearAll,
}: SavedPropertiesDrawerProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="saved-properties-drawer-overlay"
        className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-full max-w-lg bg-stone-900 text-stone-100 border-l border-stone-800 shadow-2xl flex flex-col z-50 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800 bg-stone-950/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-mono text-sm uppercase tracking-wider text-stone-200">
                  Saved Portfolio
                </h3>
                <p className="text-xs text-stone-400">
                  {savedProperties.length} {savedProperties.length === 1 ? 'Residence' : 'Residences'} in Watchlist
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {savedProperties.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-stone-400 hover:text-red-400 px-2 py-1 transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                id="close-saved-drawer-btn"
                onClick={onClose}
                className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                aria-label="Close saved properties drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center text-stone-400">
                <Building className="w-12 h-12 text-stone-600 mb-4 stroke-1" />
                <h4 className="text-base font-medium text-stone-300 mb-1">
                  Your Watchlist is Empty
                </h4>
                <p className="text-xs text-stone-400 max-w-xs mb-6">
                  Click the bookmark icon on any curated residence to compare specifications and schedule private viewings.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-mono font-semibold uppercase tracking-wider transition-colors"
                >
                  Explore Residences
                </button>
              </div>
            ) : (
              savedProperties.map((property) => (
                <div
                  key={property.id}
                  className="group relative bg-stone-950/60 border border-stone-800 rounded-lg p-4 transition-all hover:border-amber-500/50 hover:bg-stone-950"
                >
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div
                      className="relative w-24 h-24 rounded overflow-hidden flex-shrink-0 cursor-pointer"
                      onClick={() => {
                        onSelectProperty(property);
                        onClose();
                      }}
                    >
                      <Image
                        src={property.images[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="96px"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-1 left-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-950/80 text-amber-400 border border-amber-500/20">
                        {property.propertyType}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            onSelectProperty(property);
                            onClose();
                          }}
                          className="text-sm font-semibold text-stone-100 hover:text-amber-400 cursor-pointer truncate"
                        >
                          {property.title}
                        </h4>
                        <button
                          onClick={() => onRemove(property.id)}
                          className="text-stone-500 hover:text-red-400 transition-colors p-1"
                          aria-label={`Remove ${property.title} from saved`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-stone-400 mb-2 truncate">
                        {property.location.neighborhood}, {property.location.city}
                      </p>

                      <p className="text-sm font-mono font-semibold text-amber-400 mb-3">
                        {property.priceFormatted}
                      </p>

                      {/* Specs */}
                      <div className="flex items-center gap-3 text-[11px] font-mono text-stone-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-stone-500" />
                          {property.specs.bedrooms} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-stone-500" />
                          {property.specs.bathrooms} Baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Move className="w-3.5 h-3.5 text-stone-500" />
                          {property.specs.livingAreaSqM} m²
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pt-2 border-t border-stone-800/80">
                        <button
                          onClick={() => {
                            onScheduleTour(property);
                            onClose();
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-stone-950 border border-amber-500/30 text-xs font-mono font-medium transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          Book Tour
                        </button>
                        <button
                          onClick={() => {
                            onSelectProperty(property);
                            onClose();
                          }}
                          className="flex items-center justify-center p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                          aria-label="View Details"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {savedProperties.length > 0 && (
            <div className="p-6 border-t border-stone-800 bg-stone-950/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                <span>Total Portfolio Value</span>
                <span className="text-amber-400 font-bold text-sm">
                  CHF{' '}
                  {savedProperties
                    .reduce((acc, curr) => acc + curr.price, 0)
                    .toLocaleString()}{' '}
                  est.
                </span>
              </div>
              <button
                onClick={() => {
                  onScheduleTour(savedProperties[0]);
                  onClose();
                }}
                className="w-full py-3 rounded bg-amber-500 hover:bg-amber-600 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Schedule VIP Consultation for Portfolio
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
