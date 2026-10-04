import React from 'react';
import { useApp } from '../context/AppContext';
import { PhoneCall, MessageCircle, Mail, Instagram, ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setIsEditorOpen } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cleanPhone = settings.phone.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 md:pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-wider text-white">
                {settings.brandName || 'PACIFY'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Gujarat’s premier official Navratri passes reservation platform. Connecting Garba enthusiasts with the finest cultural grounds, clubs, and royal amphitheaters.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsEditorOpen(true)}
                className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                Customize Pass Prices & Contact Info
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => scrollTo('hero')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('featured-events')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('venue-explorer')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Venues
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('passes')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Passes & Prices
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('experience')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  About the Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('booking')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Book Pass
                </button>
              </li>
            </ul>
          </div>

          {/* Verified Venues Locations */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Featured Venues
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>The Grand Heritage Palace (Ahmedabad)</li>
              <li>Rajpath Club Mega Arena (SG Highway)</li>
              <li>United Way of Baroda Cultural Ground</li>
              <li>Karnavati Club Navratri Arena</li>
              <li>Hyatt Regency Skyline Terrace</li>
              <li>Madhuban Resort & Spa (Anand)</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact Desk
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white font-mono">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${cleanPhone || '919876543210'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-mono"
                >
                  WhatsApp: {settings.whatsapp || settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${settings.email.replace(/[\[\]]/g, '')}`}
                  className="hover:text-white font-mono"
                >
                  {settings.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="hover:text-white">{settings.instagram}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 [{settings.brandName || 'PACIFY'}]. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <span>Verified Organizer Passes</span>
            <span>·</span>
            <span>Zero Black Market Guarantee</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
