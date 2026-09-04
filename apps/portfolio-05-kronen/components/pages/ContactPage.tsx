'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Shield,
  Clock,
  Building,
  Lock,
  Calendar,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { AGENTS } from '@/data/agents';

/**
 * ContactPage Component
 * Swiss Private Client Inquiry Desk with client-side form validation,
 * global office hub selector with interactive Google Map frame, and NDA assurance.
 */
export default function ContactPage() {
  const [selectedOffice, setSelectedOffice] = useState<string>('zurich');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'Acquisition Consultation',
    targetBudget: 'CHF 15M - 25M',
    preferredHub: 'Zurich (Headquarters)',
    message: '',
    requireNda: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string>('');

  const offices = [
    {
      id: 'zurich',
      city: 'Zurich',
      name: 'Lake Zurich Headquarters',
      address: 'Gotthardstrasse 26, 8002 Zürich, Switzerland',
      phone: '+41 44 288 90 00',
      email: 'zurich@kronen-realestate.ch',
      hours: 'Mon - Fri: 08:30 - 18:30 CET (24/7 VIP Concierge)',
      mapQuery: 'Gotthardstrasse 26, 8002 Zürich, Switzerland',
    },
    {
      id: 'geneva',
      city: 'Geneva',
      name: 'Rue du Rhône Advisory Salon',
      address: 'Rue du Rhône 42, 1204 Genève, Switzerland',
      phone: '+41 22 819 30 00',
      email: 'geneva@kronen-realestate.ch',
      hours: 'Mon - Fri: 09:00 - 18:00 CET',
      mapQuery: 'Rue du Rhône 42, 1204 Genève, Switzerland',
    },
    {
      id: 'london',
      city: 'London',
      name: 'Mayfair Private Client Desk',
      address: '14 Berkeley Square, Mayfair, London W1J 6BD, UK',
      phone: '+44 20 7946 0920',
      email: 'london@kronen-realestate.ch',
      hours: 'Mon - Fri: 09:00 - 18:00 GMT',
      mapQuery: '14 Berkeley Square, Mayfair, London W1J 6BD',
    },
    {
      id: 'stmoritz',
      city: 'St. Moritz',
      name: 'Engadin Alpine Lodge',
      address: 'Via Serlas 23, 7500 St. Moritz, Switzerland',
      phone: '+41 81 833 40 00',
      email: 'stmoritz@kronen-realestate.ch',
      hours: 'Seasonal 7 Days a week: 09:00 - 19:00 CET',
      mapQuery: 'Via Serlas 23, 7500 St. Moritz, Switzerland',
    },
  ];

  const currentOffice = offices.find((o) => o.id === selectedOffice) || offices[0];

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full legal name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email address is required.';
    if (!formData.phone.trim()) errors.phone = 'Contact telephone is required.';
    if (!formData.message.trim()) errors.message = 'Please provide details of your mandate.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const ref = `KRN-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionId(ref);
    setIsSubmitted(true);
  };

  return (
    <div id="contact-view" className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header Banner */}
      <div className="border-b border-stone-800 pb-8 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
            Confidential Client Advisory Desk
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-sans font-extrabold text-stone-100 tracking-tight">
          Initiate Private Consultation
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-2xl font-light leading-relaxed">
          All client inquiries, mandate evaluations, and off-market requests are processed strictly under Swiss banking confidentiality standards.
        </p>
      </div>

      {/* Main Grid: Form (7 cols) + Office & Direct Broker details (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Container (7 cols) */}
        <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center mx-auto text-amber-400">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  Mandate Docket Registered
                </span>
                <h2 className="text-2xl font-bold text-stone-100">
                  Inquiry Received Under Swiss NDA
                </h2>
                <p className="text-xs font-mono text-stone-400">
                  Docket Reference: <strong className="text-stone-100 font-bold">{submissionId}</strong>
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto font-sans leading-relaxed font-light">
                A managing partner from the {formData.preferredHub} desk will review your mandate and initiate contact via your preferred channel within 4 business hours.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      inquiryType: 'Acquisition Consultation',
                      targetBudget: 'CHF 15M - 25M',
                      preferredHub: 'Zurich (Headquarters)',
                      message: '',
                      requireNda: true,
                    });
                  }}
                  className="px-6 py-2.5 rounded-lg bg-stone-950 border border-stone-800 hover:border-amber-500 text-stone-200 font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  Submit Additional Inquiry
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold">
                  Mandate Specification
                </span>
                <span className="text-[11px] font-mono text-stone-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-500" />
                  256-Bit Encrypted
                </span>
              </div>

              {/* Full Name & Email 2-Cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-300 mb-1">
                    Legal Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Alexander von Berg"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-xs font-mono text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                  {formErrors.fullName && (
                    <p className="text-[11px] font-mono text-red-400 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@institution.ch"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-xs font-mono text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                  {formErrors.email && (
                    <p className="text-[11px] font-mono text-red-400 mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone & Inquiry Type 2-Cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-300 mb-1">
                    Telephone (Direct / Mobile) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+41 79 000 00 00"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-xs font-mono text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] font-mono text-red-400 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-300 mb-1">
                    Inquiry Typology
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Acquisition Consultation">Acquisition Consultation</option>
                    <option value="Off-Market Representation">Off-Market Representation (Selling)</option>
                    <option value="Architectural Restoration Advisory">Architectural Restoration Advisory</option>
                    <option value="Private Portfolio Valuation">Private Portfolio Valuation</option>
                    <option value="Press & Monograph Inquiries">Press & Monograph Inquiries</option>
                  </select>
                </div>
              </div>

              {/* Budget Range & Advisory Hub 2-Cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-300 mb-1">
                    Estimated Capital Allocation
                  </label>
                  <select
                    value={formData.targetBudget}
                    onChange={(e) => setFormData({ ...formData, targetBudget: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="CHF 5M - 15M">CHF 5M - 15M</option>
                    <option value="CHF 15M - 25M">CHF 15M - 25M</option>
                    <option value="CHF 25M - 50M">CHF 25M - 50M</option>
                    <option value="CHF 50M+">CHF 50M+ (Bespoke Family Office)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-stone-300 mb-1">
                    Preferred Advisory Hub
                  </label>
                  <select
                    value={formData.preferredHub}
                    onChange={(e) => setFormData({ ...formData, preferredHub: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Zurich (Headquarters)">Zurich (Headquarters)</option>
                    <option value="Geneva (Rue du Rhône)">Geneva (Rue du Rhône)</option>
                    <option value="London (Mayfair)">London (Mayfair)</option>
                    <option value="St. Moritz (Engadin)">St. Moritz (Engadin)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono uppercase text-stone-300 mb-1">
                  Mandate Specification & Notes *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your architectural criteria, preferred cantons, timeline, and privacy requirements..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-xs font-mono text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 resize-none"
                />
                {formErrors.message && (
                  <p className="text-[11px] font-mono text-red-400 mt-1">{formErrors.message}</p>
                )}
              </div>

              {/* NDA Checkbox */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs font-mono text-stone-300">
                <input
                  type="checkbox"
                  id="nda-check"
                  checked={formData.requireNda}
                  onChange={(e) => setFormData({ ...formData, requireNda: e.target.checked })}
                  className="mt-0.5 rounded border-stone-700 accent-amber-500 cursor-pointer"
                />
                <label htmlFor="nda-check" className="cursor-pointer select-none">
                  <strong className="text-amber-400">Swiss Banking NDA Protocol:</strong> I request that all communications and shared identity data remain strictly sealed under Swiss confidentiality statutes.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 active:scale-98 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Confidential Mandate</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Global Office Directory & Map (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Office Hub Switcher */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-500 font-semibold">
                Global Salons & Ateliers
              </span>
              <span className="text-xs font-mono text-stone-400">
                {offices.length} Locations
              </span>
            </div>

            {/* Office Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {offices.map((office) => (
                <button
                  key={office.id}
                  onClick={() => setSelectedOffice(office.id)}
                  className={`p-2.5 rounded-lg border text-left font-mono text-xs transition-colors ${
                    selectedOffice === office.id
                      ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                      : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <p className="font-bold">{office.city}</p>
                  <p className={`text-[10px] truncate ${selectedOffice === office.id ? 'text-stone-900' : 'text-stone-500'}`}>
                    {office.name}
                  </p>
                </button>
              ))}
            </div>

            {/* Current Office Details */}
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3 font-mono text-xs text-stone-300">
              <p className="text-stone-100 font-bold text-sm">{currentOffice.name}</p>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{currentOffice.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>{currentOffice.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="text-amber-400">{currentOffice.email}</span>
              </div>
              <div className="flex items-start gap-2 text-stone-400 pt-1 border-t border-stone-800/80">
                <Clock className="w-4 h-4 text-stone-500 flex-shrink-0 mt-0.5" />
                <span>{currentOffice.hours}</span>
              </div>
            </div>

            {/* Google Maps Embed iframe for Selected Office */}
            <div className="aspect-[16/10] rounded-xl overflow-hidden border border-stone-800 bg-stone-950">
              <iframe
                title={`Map of ${currentOffice.city} office`}
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(currentOffice.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
