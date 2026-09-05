"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Mail,
  Send,
  Copy,
  Check,
  Key,
  Calendar,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "Full-Time Full Stack Role",
    scope: "Full-Time Employment",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showPgpModal, setShowPgpModal] = useState(false);

  const pgpPublicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.10
Comment: https://github.com/razikul-joni

mQGNBF+vX/kBDAC6eG9hK4L7J5X2zZ6k3x1v9q... (MD Razikul Islam Joni)
[FINGERPRINT: 7B2F C491 82DA 9E45 6B12 3F09 D842 11BC 49A1 8E30]
-----END PGP PUBLIC KEY BLOCK-----`;

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errs.name = "Please provide your full name or company.";
    }
    if (!formData.email.trim()) {
      errs.email = "Please provide a work email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please provide a valid email format.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message =
        "Please provide at least 15 characters describing your project or opportunity.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#b87333", "#e49b58", "#d97736", "#f5f0e8"],
      });
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      inquiryType: "Full-Time Full Stack Role",
      scope: "Full-Time Employment",
      message: "",
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#141416] dark:bg-[#141416] light:bg-[#eee8de] border-t border-[#f5f0e8]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#242426] border border-[#b87333]/30 text-xs font-mono text-[#b87333] mb-4">
            <Mail className="w-3.5 h-3.5 text-[#e49b58]" />
            <span>DIRECT COMMUNICATION & INQUIRIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#f5f0e8] tracking-tight font-['Space_Grotesk'] max-w-2xl">
            Let&apos;s Build Impactful Web Products Together
          </h2>
          <p className="mt-4 text-[#c8c3bb] text-base max-w-2xl font-light">
            Open to Full-time Full Stack / MERN Developer roles, contract engineering, and
            enterprise dashboard consulting.
          </p>
          <div className="w-16 h-1 bg-[#b87333] mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1c1c1e] border border-[#b87333]/30 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#f5f0e8]/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-[#34d399]">Direct Ingestion Channel</span>
                </div>
                <span className="text-[11px] font-mono text-[#8e8a82]">SLA: &lt; 12 Hours</span>
              </div>

              <div>
                <div className="text-xs font-mono text-[#8e8a82] uppercase mb-1">
                  Primary Email:
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#242426] border border-[#f5f0e8]/10">
                  <span className="text-xs sm:text-sm font-mono text-[#f5f0e8] truncate mr-2">
                    {PORTFOLIO_DATA.profile.email}
                  </span>
                  <button
                    type="button"
                    id="copy-email-btn"
                    onClick={copyEmail}
                    className="p-2 rounded-lg bg-[#1c1c1e] hover:bg-[#b87333] text-[#c8c3bb] hover:text-[#f5f0e8] transition-colors shrink-0"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {copiedEmail && (
                  <p className="text-[11px] font-mono text-emerald-400 mt-1 pl-1">
                    ✓ Email copied to clipboard!
                  </p>
                )}
              </div>

              {/* Phone & Location Info */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-2 border-b border-[#f5f0e8]/5">
                  <span className="text-[#8e8a82]">Direct Phone:</span>
                  <span className="text-[#f5f0e8]">{PORTFOLIO_DATA.profile.phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#f5f0e8]/5">
                  <span className="text-[#8e8a82]">Current Location:</span>
                  <span className="text-[#b87333]">{PORTFOLIO_DATA.profile.location}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#8e8a82]">Availability:</span>
                  <span className="text-[#34d399]">{PORTFOLIO_DATA.profile.status}</span>
                </div>
              </div>

              {/* Focus Areas for Advisory */}
              <div className="space-y-2 text-xs font-mono text-[#c8c3bb]">
                <div className="text-[#8e8a82] uppercase text-[10px]">
                  Technical Specializations:
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b87333]" />
                  <span>Enterprise Admin & Workflow Dashboards (React / Next.js)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b87333]" />
                  <span>Scalable RESTful API Architectures (Node.js / Express / MongoDB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b87333]" />
                  <span>Real-Time Tracking, Maps & E-commerce Applications</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#1c1c1e] border border-[#f5f0e8]/10 shadow-2xl">
              {isSuccess ? (
                <div
                  id="contact-success-box"
                  className="text-center py-10 space-y-6 animate-fade-in"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 mx-auto flex items-center justify-center text-emerald-400">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#f5f0e8] font-['Space_Grotesk']">
                      Transmission Dispatched
                    </h3>
                    <p className="mt-2 text-sm text-[#c8c3bb] max-w-md mx-auto font-light">
                      Thank you for reaching out,{" "}
                      <strong className="text-[#f5f0e8]">{formData.name}</strong>. Your inquiry has
                      been routed directly to {PORTFOLIO_DATA.profile.name}&apos;s priority queue.
                      Expect a prompt response.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-[#242426] hover:bg-[#2c2c2e] text-[#b87333] border border-[#b87333]/30 text-xs font-mono transition-all"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form
                  id="contact-advisory-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono text-[#c8c3bb] mb-2"
                      >
                        Full Name / Company <span className="text-[#e49b58]">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Hiring Manager / Technical Lead"
                        className={`w-full bg-[#242426] border ${
                          errors.name ? "border-rose-500" : "border-[#f5f0e8]/10"
                        } rounded-xl px-4 py-3 text-xs sm:text-sm text-[#f5f0e8] placeholder-[#8e8a82] focus:outline-none focus:border-[#b87333] transition-colors`}
                      />
                      {errors.name && (
                        <p className="text-[11px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono text-[#c8c3bb] mb-2"
                      >
                        Work Email Address <span className="text-[#e49b58]">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@company.com"
                        className={`w-full bg-[#242426] border ${
                          errors.email ? "border-rose-500" : "border-[#f5f0e8]/10"
                        } rounded-xl px-4 py-3 text-xs sm:text-sm text-[#f5f0e8] placeholder-[#8e8a82] focus:outline-none focus:border-[#b87333] transition-colors`}
                      />
                      {errors.email && (
                        <p className="text-[11px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type & Scope Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-inquiry-type"
                        className="block text-xs font-mono text-[#c8c3bb] mb-2"
                      >
                        Inquiry Nature
                      </label>
                      <select
                        id="contact-inquiry-type"
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-[#242426] border border-[#f5f0e8]/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#f5f0e8] focus:outline-none focus:border-[#b87333]"
                      >
                        <option value="Full-Time Full Stack Role">
                          Full-Time Full Stack / MERN Role
                        </option>
                        <option value="Frontend / React Development">
                          Frontend / React & Next.js Development
                        </option>
                        <option value="Enterprise Dashboard Project">
                          Enterprise Dashboard / Workflow System
                        </option>
                        <option value="Contract / Freelance">
                          Contract / Project-Based Sprint
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-scope"
                        className="block text-xs font-mono text-[#c8c3bb] mb-2"
                      >
                        Engagement Scope / Timeline
                      </label>
                      <select
                        id="contact-scope"
                        value={formData.scope}
                        onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                        className="w-full bg-[#242426] border border-[#f5f0e8]/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#f5f0e8] focus:outline-none focus:border-[#b87333]"
                      >
                        <option value="Full-Time Employment">
                          Full-Time Employment (Immediate/Notice)
                        </option>
                        <option value="Contract / Project-Based">Contract / Project-Based</option>
                        <option value="Part-Time / Hourly">Part-Time / Hourly Advisory</option>
                        <option value="Open Source Collaboration">Open Source Collaboration</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono text-[#c8c3bb] mb-2"
                    >
                      Project or Role Description <span className="text-[#e49b58]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline the role requirements, project goals, tech stack, or roadmap..."
                      className={`w-full bg-[#242426] border ${
                        errors.message ? "border-rose-500" : "border-[#f5f0e8]/10"
                      } rounded-xl px-4 py-3 text-xs sm:text-sm text-[#f5f0e8] placeholder-[#8e8a82] focus:outline-none focus:border-[#b87333] transition-colors leading-relaxed`}
                    />
                    {errors.message && (
                      <p className="text-[11px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#b87333] to-[#d97736] hover:opacity-95 text-[#f5f0e8] font-semibold text-sm shadow-[0_0_20px_rgba(184,115,51,0.35)] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#f5f0e8] border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Message...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PGP Public Key Modal */}
      {showPgpModal && (
        <div
          id="pgp-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowPgpModal(false)}
        >
          <div
            className="w-full max-w-lg bg-[#1c1c1e] border border-[#b87333]/40 rounded-3xl p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#f5f0e8]/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#b87333]">
                <Key className="w-4 h-4 text-[#e49b58]" />
                <span>{PORTFOLIO_DATA.profile.name} Public Security Key</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPgpModal(false)}
                className="text-[#8e8a82] hover:text-[#f5f0e8]"
              >
                ✕
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#141416] text-[11px] font-mono text-[#c8c3bb] overflow-x-auto">
              <code>{pgpPublicKey}</code>
            </pre>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(pgpPublicKey);
                setShowPgpModal(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#b87333] text-[#f5f0e8] text-xs font-mono font-semibold"
            >
              Copy Public Key & Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
