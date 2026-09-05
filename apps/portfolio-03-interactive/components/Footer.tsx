"use client";

import React, { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUp,
  Terminal,
  Globe,
  Code2,
  Sparkles,
  BookOpen,
  Layers,
  Cpu,
  FileText,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export default function Footer({ onOpenTerminal, onOpenResume }: FooterProps) {
  const [timeStr, setTimeStr] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeStr(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "About & Philosophy", href: "#about" },
    { name: "Technical Stack", href: "#skills" },
    { name: "Career Experience", href: "#experience" },
    { name: "Featured Projects", href: "#projects" },
    { name: "Interactive CLI Lab", href: "#lab" },
    { name: "Articles & Tutorials", href: "#publications" },
    { name: "Peer Endorsements", href: "#testimonials" },
    { name: "Contact & Inquiries", href: "#contact" },
  ];

  const externalResources = [
    { name: "React Documentation", url: "https://react.dev" },
    { name: "Next.js App Router", url: "https://nextjs.org" },
    { name: "Redux Toolkit & RTK Query", url: "https://redux-toolkit.js.org" },
    { name: "Tailwind CSS v4", url: "https://tailwindcss.com" },
    { name: "TypeScript Handbook", url: "https://www.typescriptlang.org" },
  ];

  return (
    <footer
      id="main-footer"
      className="relative bg-[#141416] dark:bg-[#141416] light:bg-[#f0ebe1] text-[#c8c3bb] border-t border-[#f5f0e8]/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background copper glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#b87333]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#f5f0e8]/10">
          {/* Col 1: Brand & Persona (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#242426] border border-[#b87333]/40 flex items-center justify-center font-mono font-bold text-[#b87333]">
                RJ
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#f5f0e8] font-['Space_Grotesk']">
                  {PORTFOLIO_DATA.profile.name}
                </h3>
                <p className="text-xs font-mono text-[#8e8a82]">{PORTFOLIO_DATA.profile.title}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#c8c3bb] leading-relaxed font-light">
              Full Stack (MERN) Developer specializing in React.js, Next.js, Node.js, enterprise
              admin dashboards, and scalable web architectures with predictable state flow.
            </p>

            {/* Real-time Timezone Clock */}
            <div className="p-3 rounded-xl bg-[#1c1c1e] border border-[#f5f0e8]/10 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-[#8e8a82]">
                <Globe className="w-3.5 h-3.5 text-[#b87333]" />
                <span>Dhaka, Bangladesh (GMT+6)</span>
              </div>
              <span className="text-[#e49b58] font-bold">{timeStr || "12:00:00 PM"}</span>
            </div>

            {/* Quick Action Pills */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                id="footer-cli-btn"
                onClick={onOpenTerminal}
                className="px-3 py-1.5 rounded-lg bg-[#242426] hover:bg-[#2c2c2e] text-xs font-mono text-[#c8c3bb] hover:text-[#f5f0e8] border border-[#f5f0e8]/10 transition-colors flex items-center gap-1.5"
              >
                <Terminal className="w-3 h-3 text-[#b87333]" />
                <span>CLI Console</span>
              </button>
              <button
                type="button"
                id="footer-cv-btn"
                onClick={onOpenResume}
                className="px-3 py-1.5 rounded-lg bg-[#242426] hover:bg-[#2c2c2e] text-xs font-mono text-[#c8c3bb] hover:text-[#f5f0e8] border border-[#f5f0e8]/10 transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3 h-3 text-[#8e8a82]" />
                <span>Curriculum Vitae</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#f5f0e8] uppercase tracking-wider">
              Portfolio Index
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#c8c3bb] hover:text-[#b87333] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#8e8a82] text-[10px]">›</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: External Standards & Ecosystem (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#f5f0e8] uppercase tracking-wider">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {externalResources.map((res) => (
                <li key={res.name}>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c8c3bb] hover:text-[#b87333] transition-colors"
                  >
                    {res.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Social & Direct Network (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#f5f0e8] uppercase tracking-wider">
              Network & Connect
            </h4>
            <p className="text-xs text-[#8e8a82] leading-relaxed">
              Available for full-time software engineering roles, enterprise React / Next.js
              dashboards, and technical consultations.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noreferrer"
                id="footer-github-link"
                className="w-9 h-9 rounded-xl bg-[#242426] hover:bg-[#b87333] border border-[#f5f0e8]/10 text-[#f5f0e8] flex items-center justify-center transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                id="footer-linkedin-link"
                className="w-9 h-9 rounded-xl bg-[#242426] hover:bg-[#b87333] border border-[#f5f0e8]/10 text-[#f5f0e8] flex items-center justify-center transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={PORTFOLIO_DATA.profile.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                id="footer-portfolio-link"
                className="w-9 h-9 rounded-xl bg-[#242426] hover:bg-[#b87333] border border-[#f5f0e8]/10 text-[#f5f0e8] flex items-center justify-center transition-all"
                aria-label="Live Portfolio"
              >
                <Globe className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                id="footer-mail-link"
                className="w-9 h-9 rounded-xl bg-[#242426] hover:bg-[#b87333] border border-[#f5f0e8]/10 text-[#f5f0e8] flex items-center justify-center transition-all"
                aria-label="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="text-[11px] font-mono text-[#8e8a82] pt-2">
              Status: <span className="text-[#34d399]">{PORTFOLIO_DATA.profile.status}</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar with Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8e8a82]">
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}. Crafted in Graphite &
            Copper. All systems operational.
          </div>

          {/* Back to top circular button */}
          <button
            type="button"
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-2 group text-[#c8c3bb] hover:text-[#f5f0e8] transition-colors focus:outline-none"
            aria-label="Scroll back to top of portfolio"
          >
            <span>Back to Top</span>
            <div className="relative w-8 h-8 rounded-full bg-[#242426] border border-[#f5f0e8]/10 flex items-center justify-center group-hover:border-[#b87333] transition-colors">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-transparent"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#b87333] transition-all duration-100"
                  strokeDasharray={`${scrollProgress}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <ArrowUp className="w-3.5 h-3.5 text-[#b87333] group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
