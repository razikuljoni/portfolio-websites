"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Terminal as TerminalIcon,
  Sparkles,
  Send,
  CornerDownLeft,
  RotateCcw,
  X,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
}

export default function TerminalPlayground() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "sys.init --profile=razikul_joni",
      output: (
        <div className="space-y-1 text-xs font-mono">
          <p className="text-[#34d399]">
            ✓ Initialized MD Razikul Islam Joni Developer Environment v2.4
          </p>
          <p className="text-[#8e8a82]">
            Type <span className="text-[#e49b58] font-bold">help</span> to view available system
            commands or click quick action chips below.
          </p>
        </div>
      ),
      timestamp: "12:00:00",
    },
  ]);

  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const quickCommands = [
    "help",
    "skills",
    "projects",
    "experience",
    "stats",
    "philosophy",
    "ping joni",
    "contact",
    "clear",
  ];

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const now = new Date().toLocaleTimeString();
    const lowerCmd = cmd.toLowerCase();

    let resultNode: React.ReactNode;

    if (lowerCmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (lowerCmd === "help") {
      resultNode = (
        <div className="space-y-1.5 text-xs font-mono text-[#c8c3bb]">
          <p className="text-[#e49b58] font-bold">AVAILABLE DEVELOPER CLI COMMANDS:</p>
          <p>
            • <span className="text-[#b87333]">about</span>: Overview of engineering background &
            experience
          </p>
          <p>
            • <span className="text-[#b87333]">skills</span>: Display technical proficiency stack
          </p>
          <p>
            • <span className="text-[#b87333]">projects</span>: View production projects & web
            applications
          </p>
          <p>
            • <span className="text-[#b87333]">experience</span>: Display career history & roles
          </p>
          <p>
            • <span className="text-[#b87333]">stats</span>: Output telemetry benchmarks & verified
            metrics
          </p>
          <p>
            • <span className="text-[#b87333]">philosophy</span>: Print core web engineering
            principles
          </p>
          <p>
            • <span className="text-[#b87333]">ping joni</span>: Test response latency & developer
            status
          </p>
          <p>
            • <span className="text-[#b87333]">cat resume.md</span>: View formatted resume summary
          </p>
          <p>
            • <span className="text-[#b87333]">contact</span>: Display direct communication channels
          </p>
          <p>
            • <span className="text-[#b87333]">theme light|dark</span>: Switch portfolio theme mode
          </p>
          <p>
            • <span className="text-[#b87333]">clear</span>: Clear terminal viewport
          </p>
        </div>
      );
    } else if (lowerCmd === "about") {
      resultNode = (
        <div className="space-y-2 text-xs font-mono text-[#c8c3bb]">
          <p className="text-[#f5f0e8] font-bold">
            {PORTFOLIO_DATA.profile.name.toUpperCase()} {"//"}{" "}
            {PORTFOLIO_DATA.profile.title.toUpperCase()}
          </p>
          <p>
            Location: {PORTFOLIO_DATA.profile.location} | Experience: 2+ Years Production Experience
          </p>
          <p className="text-[#8e8a82]">{PORTFOLIO_DATA.profile.tagline}</p>
        </div>
      );
    } else if (lowerCmd === "skills") {
      resultNode = (
        <div className="space-y-2 text-xs font-mono text-[#c8c3bb]">
          <p className="text-[#e49b58] font-bold">CORE TECHNICAL ARSENAL:</p>
          {PORTFOLIO_DATA.skillCategories.map((c) => (
            <div key={c.title} className="pl-2 border-l border-[#b87333]/40">
              <span className="text-[#f5f0e8] font-bold">{c.title}:</span>{" "}
              <span className="text-[#8e8a82]">{c.skills.map((s) => s.name).join(", ")}</span>
            </div>
          ))}
        </div>
      );
    } else if (lowerCmd === "projects") {
      resultNode = (
        <div className="space-y-2 text-xs font-mono text-[#c8c3bb]">
          <p className="text-[#e49b58] font-bold">PRODUCTION PROJECTS & CODEBASES:</p>
          {PORTFOLIO_DATA.projects.map((p, idx) => (
            <div key={p.id} className="pl-2 border-l border-[#b87333]/40">
              <span className="text-[#b87333]">[{idx + 1}]</span>{" "}
              <span className="text-[#f5f0e8] font-bold">{p.title}</span> — {p.subtitle}
              <div className="text-[11px] text-[#8e8a82]">Stack: {p.technologies.join(", ")}</div>
            </div>
          ))}
        </div>
      );
    } else if (lowerCmd === "experience") {
      resultNode = (
        <div className="space-y-3 text-xs font-mono text-[#c8c3bb]">
          <p className="text-[#e49b58] font-bold">CAREER HISTORY:</p>
          {PORTFOLIO_DATA.experience.map((exp) => (
            <div key={exp.id} className="pl-2 border-l border-[#b87333]/40 space-y-1">
              <div className="text-[#f5f0e8] font-bold">
                {exp.role} — <span className="text-[#b87333]">{exp.company}</span>
              </div>
              <div className="text-[#8e8a82]">
                {exp.period} | {exp.location}
              </div>
              <p className="text-[#c8c3bb]">{exp.summary}</p>
            </div>
          ))}
        </div>
      );
    } else if (lowerCmd === "stats") {
      resultNode = (
        <div className="space-y-1 text-xs font-mono text-[#c8c3bb]">
          <p className="text-[#34d399] font-bold">LIVE TELEMETRY BENCHMARKS:</p>
          {PORTFOLIO_DATA.stats.map((s) => (
            <p key={s.label}>
              •{" "}
              <span className="text-[#e49b58] font-bold">
                {s.value}
                {s.suffix}
              </span>
              : {s.label} ({s.change})
            </p>
          ))}
        </div>
      );
    } else if (lowerCmd === "philosophy") {
      resultNode = (
        <div className="space-y-2 text-xs font-mono text-[#c8c3bb]">
          <p className="text-[#e49b58] font-bold">ENGINEERING FIRST PRINCIPLES:</p>
          {PORTFOLIO_DATA.profile.corePrinciples.map((cp, i) => (
            <div key={cp.title}>
              <span className="text-[#b87333]">
                0{i + 1}. {cp.title}
              </span>
              : {cp.desc}
            </div>
          ))}
        </div>
      );
    } else if (lowerCmd.startsWith("ping")) {
      resultNode = (
        <div className="space-y-1 text-xs font-mono text-[#34d399]">
          <p>PING razikul.joni.dev (103.145.118.2) 56(84) bytes of data.</p>
          <p>64 bytes from razikul.joni: icmp_seq=1 ttl=64 time=18.4 ms</p>
          <p>64 bytes from razikul.joni: icmp_seq=2 ttl=64 time=16.8 ms</p>
          <p className="text-[#f5f0e8]">--- razikul joni ping statistics ---</p>
          <p className="text-[#c8c3bb]">
            2 packets transmitted, 2 received, 0% packet loss, time 1001ms, rtt avg = 17.6 ms
          </p>
          <p className="text-[#e49b58]">Status: OPEN_FOR_OPPORTUNITIES (Dhaka, GMT+6)</p>
        </div>
      );
    } else if (lowerCmd === "contact") {
      resultNode = (
        <div className="space-y-1 text-xs font-mono text-[#c8c3bb]">
          <p className="text-[#e49b58] font-bold">DIRECT CHANNELS:</p>
          <p>
            • Email: <span className="text-[#f5f0e8]">{PORTFOLIO_DATA.profile.email}</span>
          </p>
          <p>
            • Phone: <span className="text-[#f5f0e8]">{PORTFOLIO_DATA.profile.phone}</span>
          </p>
          <p>
            • Location: <span className="text-[#8e8a82]">{PORTFOLIO_DATA.profile.location}</span>
          </p>
          <p>
            • GitHub: <span className="text-[#b87333]">{PORTFOLIO_DATA.profile.github}</span>
          </p>
          <p>
            • LinkedIn: <span className="text-[#b87333]">{PORTFOLIO_DATA.profile.linkedin}</span>
          </p>
        </div>
      );
    } else if (lowerCmd === "cat resume.md") {
      resultNode = (
        <div className="space-y-2 text-xs font-mono text-[#c8c3bb]">
          <p className="text-[#f5f0e8] font-bold">
            # CURRICULUM VITAE: {PORTFOLIO_DATA.profile.name.toUpperCase()}
          </p>
          <p>Role: {PORTFOLIO_DATA.profile.title} | 2+ Years Production Experience</p>
          <p>
            Current: HawkEyes Digital Monitoring Ltd. (Jun 2024 - Present) — Full Stack (MERN)
            Developer
          </p>
          <p>Prior: Intern Full Stack Web Developer (Dec 2023 - May 2024)</p>
          <p>Education: BSc in CSE coursework (Green University of Bangladesh)</p>
          <p className="text-[#8e8a82]">
            Type &apos;contact&apos; to get in touch or click Curriculum Vitae for PDF view.
          </p>
        </div>
      );
    } else if (lowerCmd === "theme light") {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("portfolio_theme", "light");
      resultNode = (
        <span className="text-xs font-mono text-[#34d399]">Theme switched to LIGHT mode.</span>
      );
    } else if (lowerCmd === "theme dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("portfolio_theme", "dark");
      resultNode = (
        <span className="text-xs font-mono text-[#34d399]">Theme switched to DARK mode.</span>
      );
    } else if (lowerCmd.includes("sudo rm -rf") || lowerCmd.includes("rm -rf /")) {
      resultNode = (
        <div className="text-xs font-mono text-rose-400">
          [SECURITY PERMISSION DENIED]: Nice try! Root filesystem protected by kernel-level
          immutable sandbox.
        </div>
      );
    } else {
      resultNode = (
        <div className="text-xs font-mono text-rose-400">
          Command not recognized: &quot;{cmd}&quot;. Type{" "}
          <span
            className="text-[#e49b58] underline cursor-pointer"
            onClick={() => handleCommand("help")}
          >
            help
          </span>{" "}
          for available commands.
        </div>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cmd,
        output: resultNode,
        timestamp: now,
      },
    ]);

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <section
      id="lab"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#1c1c1e] dark:bg-[#1c1c1e] light:bg-[#f8f5ef] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c2c2e] border border-[#b87333]/30 text-xs font-mono text-[#b87333] mb-4">
            <TerminalIcon className="w-3.5 h-3.5 text-[#e49b58]" />
            <span>INTERACTIVE ARCHITECTURE CLI LAB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#f5f0e8] tracking-tight font-['Space_Grotesk'] max-w-2xl">
            Live Systems Console & Diagnostics
          </h2>
          <p className="mt-4 text-[#c8c3bb] text-base max-w-2xl font-light">
            Query the architect&apos;s background, inspect distributed systems principles, verify
            telemetry metrics, and test network latency directly.
          </p>
          <div className="w-16 h-1 bg-[#b87333] mt-6 rounded-full" />
        </div>

        {/* Terminal Container */}
        <div
          id="terminal-window"
          className="rounded-3xl bg-[#141416] border border-[#b87333]/40 shadow-2xl overflow-hidden"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#242426] border-b border-[#f5f0e8]/10 text-xs font-mono text-[#8e8a82]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-[#c8c3bb] font-semibold ml-2">
                alexander@distributed-node-01: ~
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setHistory([])}
                className="hover:text-[#f5f0e8] transition-colors"
                title="Clear screen"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-[#34d399] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-ping" />
                <span>ONLINE</span>
              </span>
            </div>
          </div>

          {/* Quick Action Chips for Fast Tapping */}
          <div className="px-5 py-2.5 bg-[#1c1c1e] border-b border-[#f5f0e8]/5 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[10px] text-[#8e8a82] uppercase">Quick CLI:</span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                type="button"
                id={`terminal-quick-chip-${cmd.replace(/[^a-z0-9]/g, "-")}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand(cmd);
                }}
                className="px-2.5 py-1 rounded bg-[#242426] text-[#b87333] hover:text-[#f5f0e8] hover:bg-[#b87333] border border-[#b87333]/20 text-[11px] transition-all"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Output Log Viewport */}
          <div className="p-5 sm:p-6 min-h-[300px] max-h-[440px] overflow-y-auto space-y-4 font-mono text-xs sm:text-sm">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-[#b87333]">
                  <span className="text-[#8e8a82]">[{item.timestamp}]</span>
                  <span className="text-[#34d399]">alexander@infra:~$</span>
                  <span className="text-[#f5f0e8] font-bold">{item.command}</span>
                </div>
                <div className="pl-4 sm:pl-6 text-[#c8c3bb] leading-relaxed">{item.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Interactive Command Input Line */}
          <div className="px-5 py-4 bg-[#1c1c1e] border-t border-[#f5f0e8]/10 flex items-center gap-3">
            <span className="text-[#34d399] font-mono text-sm font-bold shrink-0">
              alexander@infra:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              id="terminal-cli-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type 'help' or command..."
              className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-[#f5f0e8] placeholder-[#605c56] focus:outline-none"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="button"
              id="terminal-cli-send-btn"
              onClick={() => handleCommand(input)}
              className="p-2 rounded-lg bg-[#2c2c2e] hover:bg-[#b87333] text-[#f5f0e8] transition-colors"
              title="Run command"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
