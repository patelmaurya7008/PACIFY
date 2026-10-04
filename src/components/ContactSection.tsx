import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  PhoneCall,
  MessageCircle,
  Mail,
  Clock,
  MapPin,
  SlidersHorizontal,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings, setIsEditorOpen } = useApp();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const cleanPhone = settings.phone.replace(/[^0-9]/g, '');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="text-xs font-semibold tracking-wider text-amber-700 uppercase">
            Direct Concierge Desk
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1">
            Contact for Pass Booking
          </h2>
          <p className="mt-2 text-stone-600 text-xs sm:text-sm">
            Have questions about bulk corporate passes, VIP tables, or season passes? Contact our dedicated pass booking desk directly.
          </p>
        </div>

        {/* 3 Main Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Phone Channel */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-800 flex items-center justify-center mb-4">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                Call Inquiries
              </span>
              <div className="text-base font-bold text-stone-900 mt-1 font-mono break-all">
                {settings.phone}
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Mon - Sun, 09:00 AM - 02:00 AM IST
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={`tel:${cleanPhone}`}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-center text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer"
              >
                Call Now
              </a>
              <button
                onClick={() => copyToClipboard(settings.phone, 'phone')}
                title="Copy phone"
                className="p-2.5 text-stone-500 hover:text-stone-800 bg-white border border-stone-200 rounded-xl cursor-pointer transition-colors"
              >
                {copiedItem === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* WhatsApp Channel */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                Instant WhatsApp
              </span>
              <div className="text-base font-bold text-stone-900 mt-1 font-mono break-all">
                {settings.whatsapp || settings.phone}
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Direct pass confirmation & payment QR codes
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={`https://wa.me/${cleanPhone || '919876543210'}?text=${encodeURIComponent(
                  'Hello! I would like to book Navratri passes with PACIFY.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-center text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                WhatsApp
              </a>
              <button
                onClick={() =>
                  copyToClipboard(settings.whatsapp || settings.phone, 'whatsapp')
                }
                title="Copy WhatsApp"
                className="p-2.5 text-stone-500 hover:text-stone-800 bg-white border border-emerald-200 rounded-xl cursor-pointer transition-colors"
              >
                {copiedItem === 'whatsapp' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Email Channel */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-800 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                Email Inquiries
              </span>
              <div className="text-base font-bold text-stone-900 mt-1 font-mono break-all">
                {settings.email}
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Corporate bulk ticketing & sponsorship desk
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={`mailto:${settings.email.replace(/[\[\]]/g, '')}`}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-center text-stone-800 bg-stone-200 hover:bg-stone-300 rounded-xl transition-colors cursor-pointer"
              >
                Email Us
              </a>
              <button
                onClick={() => copyToClipboard(settings.email, 'email')}
                title="Copy email"
                className="p-2.5 text-stone-500 hover:text-stone-800 bg-white border border-stone-200 rounded-xl cursor-pointer transition-colors"
              >
                {copiedItem === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Admin Tip Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-700">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              All placeholder contact details (Phone:{' '}
              <strong className="font-mono">{settings.phone}</strong>, Email:{' '}
              <strong className="font-mono">{settings.email}</strong>) can be updated anytime.
            </span>
          </div>

          <button
            onClick={() => setIsEditorOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-amber-900 bg-amber-200/80 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Update Contact Info
          </button>
        </div>
      </div>
    </section>
  );
};
