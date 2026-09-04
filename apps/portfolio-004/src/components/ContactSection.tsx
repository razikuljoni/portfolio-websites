import React, { useState } from 'react';
import { Mail, Copy, Check, Send, CheckCircle2, ArrowRight, MessageSquare, MapPin, Globe, Phone, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: 'Full-Stack Development (React/Next.js)',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Contact Pitch & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono text-amber-400">
              <Mail className="w-3.5 h-3.5" />
              <span>GET IN TOUCH</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-100">
              Let's Build Great Products Together
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Whether you have an opening for a Full Stack Developer, need a responsive dashboard built with modern React/Next.js, or want to discuss architectural collaboration, I'm always open to talking.
            </p>

            {/* Direct Email & Phone Cards */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#0E1117] border border-neutral-800 space-y-2">
                <div className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email Address</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="font-mono text-xs sm:text-sm font-semibold text-neutral-200 hover:text-amber-400 transition-colors truncate">
                    {PERSONAL_INFO.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    id="contact-copy-email-btn"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0E1117] border border-neutral-800 space-y-2">
                <div className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct Phone & WhatsApp</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="font-mono text-xs sm:text-sm font-semibold text-neutral-200 hover:text-emerald-400 transition-colors">
                    {PERSONAL_INFO.phone}
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    id="contact-copy-phone-btn"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Location & Social Profiles */}
            <div className="space-y-3 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Location: {PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={PERSONAL_INFO.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PERSONAL_INFO.links.livePortfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live Portfolio</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Request Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1117] border border-neutral-800 shadow-2xl">
              
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-100">
                    Message Dispatched Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-neutral-200">{formData.name}</strong>. Your message regarding <span className="text-amber-400 font-mono">[{formData.domain}]</span> has been received. I will reply to <strong className="text-neutral-200">{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', domain: 'Full-Stack Development (React/Next.js)', message: '' });
                    }}
                    className="mt-4 px-4 py-2 rounded-lg text-xs font-mono bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-neutral-800/80 pb-3">
                    <h3 className="text-base font-bold text-neutral-100">
                      Send a Direct Inquiry
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Direct inquiries for full-stack opportunities, contracts, or engineering projects.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neutral-300">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        id="contact-form-name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 focus:border-amber-400/80 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neutral-300">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        id="contact-form-email"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 focus:border-amber-400/80 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300">
                      Topic / Role Type
                    </label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      id="contact-form-domain"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 focus:border-amber-400/80 text-xs font-mono text-neutral-100 focus:outline-none cursor-pointer"
                    >
                      <option value="Full-Stack Development (React/Next.js)">Full-Stack Development (React / Next.js / Node)</option>
                      <option value="Frontend Engineering & Dashboard Systems">Frontend Engineering & Enterprise Dashboards</option>
                      <option value="RESTful APIs & Database Design">RESTful APIs & Database Design (MongoDB / Express)</option>
                      <option value="Performance & Core Web Vitals Optimization">Performance & Core Web Vitals Optimization</option>
                      <option value="Contract / Freelance Web Project">Contract / Freelance Web Project</option>
                      <option value="General Conversation">General Conversation</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300">
                      Project Details or Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share project goals, requirements, or role specifics..."
                      id="contact-form-message"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 focus:border-amber-400/80 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-neutral-950 bg-neutral-100 hover:bg-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
