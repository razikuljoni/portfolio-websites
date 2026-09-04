'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { Quote, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = PORTFOLIO_DATA.testimonials;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#1c1c1e] dark:bg-[#1c1c1e] light:bg-[#f8f5ef] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c2c2e] border border-[#b87333]/30 text-xs font-mono text-[#b87333] mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#e49b58]" />
            <span>PEER ENDORSEMENTS & LEADERSHIP FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#f5f0e8] tracking-tight font-['Space_Grotesk'] max-w-2xl">
            Trusted by CTOs & Principal Engineers
          </h2>
          <div className="w-16 h-1 bg-[#b87333] mt-6 rounded-full" />
        </div>

        {/* Testimonial Spotlight Card */}
        <div
          id="testimonial-spotlight-card"
          className="relative p-8 sm:p-12 rounded-3xl bg-[#242426] border border-[#b87333]/30 shadow-2xl space-y-8"
        >
          {/* Large Quote Icon Watermark */}
          <div className="absolute top-6 right-8 text-[#b87333]/15 pointer-events-none">
            <Quote className="w-24 h-24" />
          </div>

          <div className="relative z-10 space-y-6">
            <p className="text-lg sm:text-2xl text-[#f5f0e8] font-light leading-relaxed italic font-['Space_Grotesk']">
              &quot;{current.quote}&quot;
            </p>

            {/* Author Profile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#f5f0e8]/10">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#b87333]/40 bg-[#1c1c1e]">
                  <Image
                    src={current.avatar}
                    alt={current.author}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    sizes="56px"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#f5f0e8]">
                    {current.author}
                  </h4>
                  <p className="text-xs text-[#b87333] font-mono">
                    {current.title} • {current.company}
                  </p>
                  <p className="text-[11px] text-[#8e8a82]">
                    {current.relationship}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="testimonial-prev-btn"
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-[#1c1c1e] hover:bg-[#b87333] text-[#f5f0e8] border border-[#f5f0e8]/10 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="text-xs font-mono text-[#8e8a82] px-2">
                  {currentIndex + 1} / {testimonials.length}
                </div>

                <button
                  type="button"
                  id="testimonial-next-btn"
                  onClick={handleNext}
                  className="p-3 rounded-full bg-[#1c1c1e] hover:bg-[#b87333] text-[#f5f0e8] border border-[#f5f0e8]/10 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              id={`testimonial-dot-${idx}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-8 bg-[#b87333]' : 'w-2 bg-[#2c2c2e] hover:bg-[#8e8a82]'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
