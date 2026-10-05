import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Menu, X, PhoneCall } from 'lucide-react';

export const Header: React.FC = () => {
  const { settings, setIsEditorOpen, isOwnerAuthenticated } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBFBFA]/90 backdrop-blur-md shadow-xs border-b border-stone-200/80 py-3.5'
          : 'bg-[#FBFBFA] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
          >
            <span className="font-display text-2xl font-bold tracking-wider text-stone-900 group-hover:text-amber-800 transition-colors">
              {settings.brandName || 'PACIFY'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ring-2 ring-amber-200"></span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-stone-950 transition-colors py-1 cursor-pointer focus:outline-hidden focus-visible:text-amber-700"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('venue-explorer')}
              className="hover:text-stone-950 transition-colors py-1 cursor-pointer focus:outline-hidden focus-visible:text-amber-700"
            >
              Venues
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="hover:text-stone-950 transition-colors py-1 cursor-pointer focus:outline-hidden focus-visible:text-amber-700"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('booking')}
              className="hover:text-stone-950 transition-colors py-1 cursor-pointer focus:outline-hidden focus-visible:text-amber-700"
            >
              Book Pass
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-stone-950 transition-colors py-1 cursor-pointer focus:outline-hidden focus-visible:text-amber-700"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Owner Management Badge (Only visible when Owner is authenticated) */}
            {isOwnerAuthenticated && (
              <button
                onClick={() => setIsEditorOpen(true)}
                title="Owner Control Panel"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-full transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Owner Mode</span>
              </button>
            )}

            {/* Direct Call Quick Link */}
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              <span>{settings.phone}</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={() => scrollToSection('booking')}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-300 rounded-full shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-[0.98] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              Book Pass
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-stone-200 bg-[#FBFBFA]">
            <div className="flex flex-col gap-2.5 text-base font-medium text-stone-700 px-1">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left py-2 px-3 hover:bg-stone-100 rounded-lg"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('venue-explorer')}
                className="text-left py-2 px-3 hover:bg-stone-100 rounded-lg"
              >
                Venues
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="text-left py-2 px-3 hover:bg-stone-100 rounded-lg"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('booking')}
                className="text-left py-2 px-3 hover:bg-stone-100 rounded-lg"
              >
                Book Pass
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left py-2 px-3 hover:bg-stone-100 rounded-lg"
              >
                Contact
              </button>
              {isOwnerAuthenticated && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsEditorOpen(true);
                  }}
                  className="flex items-center gap-2 py-2 px-3 text-amber-900 bg-amber-100 rounded-lg font-medium"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Owner Price & Contact Settings</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
