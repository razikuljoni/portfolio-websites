'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Video, UserCheck, ShieldCheck, CheckCircle2, Phone, Mail, User, Sparkles } from 'lucide-react';
import { Property, Agent } from '@/types';
import { AGENTS } from '@/data/agents';

interface ScheduleTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

/**
 * ScheduleTourModal Component
 * Facilitates scheduling private VIP estate viewings and live 360 virtual architectural walk-throughs.
 */
export default function ScheduleTourModal({
  isOpen,
  onClose,
  property,
}: ScheduleTourModalProps) {
  const [tourType, setTourType] = useState<'in-person' | 'virtual-360'>('in-person');
  const [selectedDate, setSelectedDate] = useState<string>('2026-03-02');
  const [selectedTime, setSelectedTime] = useState<string>('14:00');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen || !property) return null;

  const assignedAgent: Agent =
    AGENTS.find((a) => a.id === property.agentId) || AGENTS[0];

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '02:00 PM',
    '04:30 PM',
    '06:00 PM (Sunset Viewing)',
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email address required';
    if (!phone.trim()) newErrors.phone = 'Contact telephone required for confirmation';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setSpecialRequests('');
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        id="schedule-tour-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto"
        onClick={handleResetAndClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-xl shadow-2xl text-stone-100 overflow-hidden my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold">
                Private Viewing Request
              </h3>
            </div>
            <button
              onClick={handleResetAndClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSubmitted ? (
            /* Success State */
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center mx-auto text-amber-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl sm:text-2xl font-semibold text-stone-100 mb-2">
                  Viewing Confirmed for {property.title}
                </h4>
                <p className="text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-amber-400 font-medium">{fullName}</span>. Principal broker{' '}
                  <span className="text-stone-200 font-medium">{assignedAgent.name}</span> will contact you at{' '}
                  <span className="text-stone-200 font-medium">{phone}</span> within 2 hours to confirm security credentials and access protocols.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-stone-950/80 border border-stone-800 rounded-lg p-5 max-w-md mx-auto text-left space-y-2.5 text-xs font-mono">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-500">Format:</span>
                  <span className="text-stone-200 uppercase font-semibold">
                    {tourType === 'in-person' ? 'Private In-Person Tour' : 'Live 360 Virtual Walkthrough'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-500">Date:</span>
                  <span className="text-stone-200">{selectedDate}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-500">Time Window:</span>
                  <span className="text-amber-400 font-semibold">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Estate Desk:</span>
                  <span className="text-stone-200">{assignedAgent.office}</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="px-8 py-3 rounded bg-amber-500 hover:bg-amber-600 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Close & Return to Portfolio
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              {/* Property Header Preview */}
              <div className="flex items-center gap-4 p-3 bg-stone-950/50 rounded-lg border border-stone-800">
                <div className="w-12 h-12 rounded bg-stone-800 overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={property.images[0]?.url || ''}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-stone-100 truncate">
                    {property.title}
                  </h4>
                  <p className="text-xs text-stone-400">
                    {property.location.address} • <span className="text-amber-400">{property.priceFormatted}</span>
                  </p>
                </div>
              </div>

              {/* Tour Format Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                  1. Select Viewing Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTourType('in-person')}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      tourType === 'in-person'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-sm'
                        : 'border-stone-800 bg-stone-950/40 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <UserCheck className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-stone-200">Private In-Person Tour</p>
                      <p className="text-[11px] text-stone-400">Accompanied by Principal Broker</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTourType('virtual-360')}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      tourType === 'virtual-360'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-sm'
                        : 'border-stone-800 bg-stone-950/40 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <Video className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-stone-200">360° Live Video Walkthrough</p>
                      <p className="text-[11px] text-stone-400">Ultra-HD secure stream & floor plan review</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                    2. Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                    3. Preferred Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Client Contact Credentials */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-400">
                  4. Discretionary Contact Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      className={`w-full bg-stone-950 border rounded-lg px-3.5 py-2.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none transition-colors ${
                        errors.fullName ? 'border-red-500' : 'border-stone-800 focus:border-amber-500'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full bg-stone-950 border rounded-lg px-3.5 py-2.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-stone-800 focus:border-amber-500'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="tel"
                      placeholder="Mobile / WhatsApp Number *"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`w-full bg-stone-950 border rounded-lg px-3.5 py-2.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-stone-800 focus:border-amber-500'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Special Requirements (e.g. Helipad / NDA)"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="flex items-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-4 h-4 text-amber-500/80 flex-shrink-0" />
                <span>All appointments are governed by Swiss banking-grade confidentiality protocols.</span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded bg-amber-500 hover:bg-amber-600 text-stone-950 font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Confirm Private Appointment
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
