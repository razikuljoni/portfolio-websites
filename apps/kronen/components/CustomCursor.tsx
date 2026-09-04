'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

/**
 * Custom Cursor Component
 * Provides a refined, high-precision Swiss dot and ring cursor effect on desktop pointer devices.
 * Automatically disables itself on mobile/touch screens.
 */
export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    // Check if device supports fine hover pointer
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) {
      return;
    }

    const handleInitialMove = (e: MouseEvent) => {
      setIsEnabled(true);
      setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
      document.body.classList.add('custom-cursor-enabled');
      window.removeEventListener('mousemove', handleInitialMove);
    };

    window.addEventListener('mousemove', handleInitialMove, { once: true });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Track interactive element hover state
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleElementHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', handleInitialMove);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isEnabled || !isVisible) return null;

  return (
    <div id="kronen-custom-cursor" className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-amber-500/80 pointer-events-none"
        animate={{
          x: mousePosition.x - (isHovered ? 28 : 16),
          y: mousePosition.y - (isHovered ? 28 : 16),
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
          backgroundColor: isHovered ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.03)',
          scale: isClicked ? 0.85 : 1,
          borderColor: isHovered ? '#F59E0B' : 'rgba(245, 158, 11, 0.6)',
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-amber-500 pointer-events-none"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          width: isHovered ? 6 : 6,
          height: isHovered ? 6 : 6,
          scale: isClicked ? 1.5 : 1,
          opacity: isHovered ? 0.9 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 35,
        }}
      />
    </div>
  );
}
