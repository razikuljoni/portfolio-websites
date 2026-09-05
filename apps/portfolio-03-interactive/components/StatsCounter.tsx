"use client";

import React, { useEffect, useState, useRef } from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { Activity, ShieldCheck, Users, TrendingUp, Award, GitPullRequest } from "lucide-react";

export default function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>(PORTFOLIO_DATA.stats.map(() => 0));

  const statIcons = [Award, Activity, ShieldCheck, Users, TrendingUp, GitPullRequest];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate each stat number
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const updatedCounts = PORTFOLIO_DATA.stats.map((stat) => {
              return stat.value * easeProgress;
            });

            setCounts(updatedCounts);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(PORTFOLIO_DATA.stats.map((s) => s.value));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      id="stats-counter-section"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#141416] dark:bg-[#141416] light:bg-[#eee8de] border-y border-[#f5f0e8]/10 overflow-hidden"
    >
      {/* Background copper grid glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#242426] border border-[#b87333]/30 text-xs font-mono text-[#b87333] mb-3">
            <span>VERIFIED ENGINEERING METRICS & IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f0e8] tracking-tight font-['Space_Grotesk']">
            Proven Impact in Modern Web Applications
          </h2>
          <p className="mt-3 text-[#c8c3bb] text-sm sm:text-base font-light">
            Measurable impact across production web applications, enterprise dashboards, e-commerce
            scale, and clean code delivery.
          </p>
        </div>

        {/* 6-Grid Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PORTFOLIO_DATA.stats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            const displayValue = stat.decimals
              ? counts[idx].toFixed(stat.decimals)
              : Math.floor(counts[idx]).toLocaleString();

            return (
              <div
                key={stat.label}
                id={`stat-card-${idx}`}
                className="group relative p-6 rounded-2xl bg-[#1c1c1e] dark:bg-[#1c1c1e] light:bg-[#ffffff] border border-[#f5f0e8]/10 hover:border-[#b87333]/50 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(184,115,51,0.15)] flex flex-col justify-between"
              >
                {/* Accent top corner tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2c2c2e] dark:bg-[#2c2c2e] light:bg-[#f3ede2] flex items-center justify-center text-[#b87333] group-hover:scale-110 group-hover:bg-[#b87333] group-hover:text-[#f5f0e8] transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-[#8e8a82] bg-[#242426] dark:bg-[#242426] light:bg-[#f3ede2] px-2.5 py-1 rounded-md border border-[#f5f0e8]/5">
                    {stat.change}
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline gap-1 font-['Space_Grotesk'] text-4xl sm:text-5xl font-bold text-[#f5f0e8] tracking-tight group-hover:text-[#e49b58] transition-colors">
                    <span>{displayValue}</span>
                    <span className="text-2xl sm:text-3xl text-[#b87333]">{stat.suffix}</span>
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-[#c8c3bb] leading-snug">
                    {stat.label}
                  </h3>
                </div>

                {/* Bottom subtle progress line */}
                <div className="mt-5 w-full bg-[#2c2c2e] h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#b87333] to-[#e49b58] h-full rounded-full transition-all duration-1000"
                    style={{ width: hasAnimated ? "100%" : "0%" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
