'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import Image from 'next/image';

interface LightboxImage {
  url: string;
  caption: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

/**
 * ImageLightbox Component
 * Full-screen high-resolution architectural image lightbox with keyboard shortcuts,
 * zoom controls, and thumbnail strip.
 */
export default function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  title = 'Architectural Gallery',
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [prevInitialIndex, setPrevInitialIndex] = useState<number>(initialIndex);

  // Sync state if initialIndex changed when modal reopened
  if (initialIndex !== prevInitialIndex) {
    setPrevInitialIndex(initialIndex);
    setCurrentIndex(initialIndex);
    setIsZoomed(false);
  }

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      <div
        id="image-lightbox-overlay"
        className="fixed inset-0 z-[100] flex flex-col bg-stone-950/95 text-stone-100 backdrop-blur-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Image Lightbox"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800/80 bg-stone-950/80 z-20">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
            <h3 className="text-sm font-mono tracking-wider uppercase text-stone-300 truncate max-w-[280px] sm:max-w-md">
              {title}
            </h3>
            <span className="text-xs font-mono text-amber-500 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="lightbox-zoom-toggle"
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 rounded-full text-stone-400 hover:text-amber-500 hover:bg-stone-800 transition-colors"
              aria-label={isZoomed ? 'Zoom Out' : 'Zoom In'}
            >
              {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </button>
            <button
              id="lightbox-close-btn"
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Viewing Canvas */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden select-none">
          {/* Navigation Arrows */}
          <button
            id="lightbox-prev-btn"
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 z-30 p-3 rounded-full bg-stone-900/80 border border-stone-700/80 text-stone-200 hover:text-amber-500 hover:border-amber-500 hover:bg-stone-900 transition-all backdrop-blur-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            id="lightbox-next-btn"
            onClick={handleNext}
            className="absolute right-4 sm:right-8 z-30 p-3 rounded-full bg-stone-900/80 border border-stone-700/80 text-stone-200 hover:text-amber-500 hover:border-amber-500 hover:bg-stone-900 transition-all backdrop-blur-md"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Display */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: isZoomed ? 1.4 : 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`relative max-w-6xl max-h-[75vh] w-full h-full flex items-center justify-center transition-transform ${
              isZoomed ? 'cursor-grab' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <Image
              src={currentImage.url}
              alt={currentImage.caption || 'Architectural View'}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Bottom Caption & Thumbnail Strip */}
        <div className="border-t border-stone-800/80 bg-stone-950/90 px-6 py-4 z-20">
          <p className="text-center text-sm text-stone-300 font-sans mb-3 line-clamp-1">
            {currentImage.caption}
          </p>

          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 max-w-2xl mx-auto scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                id={`lightbox-thumb-${idx}`}
                onClick={() => {
                  setIsZoomed(false);
                  setCurrentIndex(idx);
                }}
                className={`relative w-16 h-12 rounded-sm overflow-hidden flex-shrink-0 border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-amber-500 scale-105 shadow-md shadow-amber-500/20'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.caption || `Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
