'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  X,
  Share2,
  Bookmark,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { JournalArticle } from '@/types';
import { JOURNAL_ARTICLES } from '@/data/journal';

interface JournalPageProps {
  onScheduleConsultation: () => void;
}

/**
 * JournalPage Component
 * Swiss architectural and market intelligence publication featuring
 * long-form monographs, deep reading mode modal, and category filtering.
 */
export default function JournalPage({ onScheduleConsultation }: JournalPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  const categories = [
    'all',
    'Architectural Monograph',
    'Market Intelligence',
    'Heritage Preservation',
  ];

  const filteredArticles = JOURNAL_ARTICLES.filter((article) =>
    selectedCategory === 'all' ? true : article.category === selectedCategory
  );

  return (
    <div id="journal-view" className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Banner */}
      <div className="border-b border-stone-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
              The Spatial Journal • Vol. 51
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-sans font-bold text-stone-100 tracking-tight">
            Architectural Critical Papers
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-xl font-light leading-relaxed">
            Essays on spatial geometry, alpine passive insulation, cantonal zoning evolutions, and global private real estate safe-havens.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none bg-stone-900 border border-stone-800 p-1.5 rounded-lg self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              {cat === 'all' ? 'All Publications' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Lead Monograph */}
      {filteredArticles.length > 0 && (
        <div
          onClick={() => setActiveArticle(filteredArticles[0])}
          className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer hover:border-amber-500/50 transition-all grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[320px] bg-stone-950">
            <Image
              src={filteredArticles[0].coverImage}
              alt={filteredArticles[0].title}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              sizes="(max-width: 1024px) 100vw, 58vw"
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-4 left-4 px-3 py-1 rounded bg-stone-950/80 backdrop-blur-md text-xs font-mono uppercase tracking-wider text-amber-400 border border-amber-500/30">
              Lead Monograph
            </span>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono text-stone-400">
                <span className="text-amber-500">{filteredArticles[0].category}</span>
                <span>•</span>
                <span>{filteredArticles[0].readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-stone-100 group-hover:text-amber-400 transition-colors leading-tight">
                {filteredArticles[0].title}
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed font-light">
                {filteredArticles[0].excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={filteredArticles[0].author.avatar}
                    alt={filteredArticles[0].author.name}
                    fill
                    className="object-cover"
                    sizes="32px"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-xs font-mono">
                  <p className="text-stone-200">{filteredArticles[0].author.name}</p>
                  <p className="text-stone-500">{filteredArticles[0].publishedDate}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold">
                <span>Read Full Essay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Articles 3-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredArticles.slice(1).map((article) => (
          <article
            key={article.id}
            onClick={() => setActiveArticle(article)}
            className="group bg-stone-900 border border-stone-800 rounded-xl overflow-hidden cursor-pointer hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-stone-950/80 backdrop-blur-md text-[10px] font-mono uppercase text-amber-400 border border-amber-500/30">
                  {article.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>{article.publishedDate}</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-stone-100 group-hover:text-amber-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-stone-400 line-clamp-3 font-light font-sans">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-stone-800/80 mt-4 flex items-center justify-between">
              <span className="text-xs font-mono text-stone-400 truncate">
                By {article.author.name}
              </span>
              <span className="text-xs font-mono text-amber-400">
                Read Monograph →
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* FULL ARTICLE READER MODAL */}
      <AnimatePresence>
        {activeArticle && (
          <div
            id="article-reader-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/90 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-stone-900 border border-stone-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              {/* Sticky Top Bar */}
              <div className="sticky top-0 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 px-6 py-4 flex items-center justify-between z-10">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-500">
                  {activeArticle.category} • {activeArticle.readTime}
                </span>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-400 hover:text-white"
                  aria-label="Close Article"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Article Content */}
              <div className="p-6 sm:p-10 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-stone-100 leading-tight">
                    {activeArticle.title}
                  </h1>

                  <div className="flex items-center gap-3 pt-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/50">
                      <Image
                        src={activeArticle.author.avatar}
                        alt={activeArticle.author.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-xs font-mono">
                      <p className="text-stone-200 font-bold">{activeArticle.author.name}</p>
                      <p className="text-stone-400">{activeArticle.author.role} • {activeArticle.publishedDate}</p>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-950">
                  <Image
                    src={activeArticle.coverImage}
                    alt={activeArticle.title}
                    fill
                    className="object-cover"
                    sizes="800px"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Article Typography Body */}
                <div className="prose prose-invert max-w-none text-stone-300 font-sans text-sm sm:text-base leading-relaxed space-y-4 font-light">
                  <p className="text-base sm:text-lg font-normal text-stone-200 italic border-l-2 border-amber-500 pl-4">
                    {activeArticle.excerpt}
                  </p>

                  <div className="whitespace-pre-line pt-2 text-stone-300 space-y-4">
                    {activeArticle.content}
                  </div>
                </div>

                {/* Tags & Action */}
                <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {activeArticle.tags.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded bg-stone-950 text-xs font-mono text-stone-400 border border-stone-800">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-6 py-2.5 rounded bg-amber-500 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider"
                  >
                    Close Monograph
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
