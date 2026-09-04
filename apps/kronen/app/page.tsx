'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import SavedPropertiesDrawer from '@/components/SavedPropertiesDrawer';
import ScheduleTourModal from '@/components/ScheduleTourModal';
import ImageLightbox from '@/components/ImageLightbox';

import HomePage from '@/components/pages/HomePage';
import PropertiesPage from '@/components/pages/PropertiesPage';
import PropertyDetailPage from '@/components/pages/PropertyDetailPage';
import NeighborhoodsPage from '@/components/pages/NeighborhoodsPage';
import HeritagePage from '@/components/pages/HeritagePage';
import CalculatorPage from '@/components/pages/CalculatorPage';
import JournalPage from '@/components/pages/JournalPage';
import ContactPage from '@/components/pages/ContactPage';

import { Property } from '@/types';
import { PROPERTIES } from '@/data/properties';

/**
 * Main Application Root Page
 * Manages full multi-page navigation state, modal overlays, watchlist persistence,
 * and seamless Swiss design transitions.
 */
export default function Page() {
  // Navigation Routing State
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Watchlist State (Persisted in localStorage)
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('kronen_saved_properties');
        if (stored) return JSON.parse(stored);
      } catch {
        // ignore
      }
    }
    return ['prop-1', 'prop-3'];
  });
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);

  // Tour Booking Modal State
  const [tourModalProperty, setTourModalProperty] = useState<Property | null>(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState<boolean>(false);

  // Lightbox State
  const [lightboxImages, setLightboxImages] = useState<{ url: string; caption: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Save to localStorage when updated
  const toggleSaveProperty = (property: Property) => {
    setSavedPropertyIds((prev) => {
      const next = prev.includes(property.id)
        ? prev.filter((id) => id !== property.id)
        : [...prev, property.id];
      try {
        localStorage.setItem('kronen_saved_properties', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const removeSavedProperty = (propertyId: string) => {
    setSavedPropertyIds((prev) => {
      const next = prev.filter((id) => id !== propertyId);
      try {
        localStorage.setItem('kronen_saved_properties', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const clearSavedProperties = () => {
    setSavedPropertyIds([]);
    try {
      localStorage.removeItem('kronen_saved_properties');
    } catch {
      // ignore
    }
  };

  const savedPropertiesList = PROPERTIES.filter((p) =>
    savedPropertyIds.includes(p.id)
  );

  // Theme Toggle Handler
  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof document !== 'undefined') {
      if (next === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    }
  };

  // Navigation Handler
  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Property & Open Detail View
  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setCurrentPage('property-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open VIP Tour Modal
  const handleOpenTourModal = (property?: Property) => {
    setTourModalProperty(property || PROPERTIES[0]);
    setIsTourModalOpen(true);
  };

  // Open Lightbox
  const handleOpenLightbox = (
    images: { url: string; caption: string }[],
    startIndex: number = 0
  ) => {
    setLightboxImages(images);
    setLightboxIndex(startIndex);
    setIsLightboxOpen(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-stone-950">
      {/* High-Precision Custom Swiss Cursor */}
      <CustomCursor />

      {/* Fixed Navigation Header */}
      <Navbar
        activePage={currentPage}
        setActivePage={handleNavigate}
        savedCount={savedPropertyIds.length}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenConsultation={() => handleNavigate('contact')}
        isDarkMode={theme === 'dark'}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Multi-Page Container */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProperty={handleSelectProperty}
            onScheduleTour={handleOpenTourModal}
            onToggleSave={toggleSaveProperty}
            savedPropertyIds={savedPropertyIds}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {currentPage === 'properties' && (
          <PropertiesPage
            onSelectProperty={handleSelectProperty}
            onScheduleTour={handleOpenTourModal}
            onToggleSave={toggleSaveProperty}
            savedPropertyIds={savedPropertyIds}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {currentPage === 'property-detail' && selectedProperty && (
          <PropertyDetailPage
            property={selectedProperty}
            onBack={() => handleNavigate('properties')}
            onSelectProperty={handleSelectProperty}
            onScheduleTour={handleOpenTourModal}
            onToggleSave={toggleSaveProperty}
            isSaved={savedPropertyIds.includes(selectedProperty.id)}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {currentPage === 'neighborhoods' && (
          <NeighborhoodsPage
            onNavigateToProperties={(city) => {
              handleNavigate('properties');
            }}
            onScheduleConsultation={() => handleNavigate('contact')}
          />
        )}

        {currentPage === 'heritage' && (
          <HeritagePage
            onScheduleConsultation={() => handleNavigate('contact')}
            onNavigateToProperties={() => handleNavigate('properties')}
          />
        )}

        {currentPage === 'calculator' && (
          <CalculatorPage
            onScheduleConsultation={() => handleNavigate('contact')}
          />
        )}

        {currentPage === 'journal' && (
          <JournalPage
            onScheduleConsultation={() => handleNavigate('contact')}
          />
        )}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Global Fat Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Scroll-to-Top Indicator */}
      <BackToTop />

      {/* Saved Properties Watchlist Drawer */}
      <SavedPropertiesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedProperties={savedPropertiesList}
        onRemove={removeSavedProperty}
        onClearAll={clearSavedProperties}
        onSelectProperty={(property) => {
          setIsSavedDrawerOpen(false);
          handleSelectProperty(property);
        }}
        onScheduleTour={(property) => {
          setIsSavedDrawerOpen(false);
          handleOpenTourModal(property);
        }}
      />

      {/* VIP Tour Booking Modal */}
      <ScheduleTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        property={tourModalProperty}
      />

      {/* Full-Screen Architectural Image Lightbox */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        initialIndex={lightboxIndex}
      />
    </div>
  );
}
