import React from 'react';
import { useApp } from '../context/AppContext';
import { ASSETS } from '../data/defaultData';
import { ArrowRight, Sparkles, MapPin, Music, ShieldCheck, ChevronRight, Check } from 'lucide-react';
import { CategoryType } from '../types';

export const Hero: React.FC = () => {
  const { setSelectedCategory, venues, openVenueDetails } = useApp();

  const heroFilterCategories: CategoryType[] = [
    'All Venues',
    'Premium Garba',
    'Traditional Garba',
    'DJ Garba',
    'Unlimited Pass',
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const primaryVenue = venues[0];

  return (
    <section id="hero" className="pt-2 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header Text Zone */}
      <div className="text-center max-w-3xl mx-auto mb-8 pt-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-700 uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          <span>Official Pass Reservation 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15] text-balance">
          Experience Navratri Like Never Before
        </h1>
        <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed text-balance">
          Discover the best Navratri events, premium venues, and exciting Garba nights — all in one place.
        </p>

        {/* Action CTAs & Badges */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('featured-events')}
            className="px-6 py-3.5 text-sm font-semibold tracking-wide text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-full shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2 group active:scale-[0.98]"
          >
            <span>Explore Events</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollTo('booking')}
            className="button"
          >
            <svg
              className="cartIcon"
              viewBox="0 0 576 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                fill="currentColor"
              />
            </svg>
            <span>Book Your Pass</span>
          </button>
        </div>

        {/* Information Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-stone-500">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-amber-600" />
            <span className="text-stone-700 font-semibold">5 Iconic Venues</span>
          </div>
          <span className="text-stone-300">·</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-amber-600" />
            <span className="text-stone-700 font-semibold">Multiple Events</span>
          </div>
          <span className="text-stone-300">·</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-amber-600" />
            <span className="text-stone-700 font-semibold">Easy Booking</span>
          </div>
        </div>
      </div>

      {/* Hero Visual Container — Inspired by reference rounded yacht showcase */}
      <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl shadow-stone-300/40 bg-stone-950 border border-stone-200">
        <div className="relative aspect-16/10 sm:aspect-16/9 lg:aspect-21/9 w-full overflow-hidden">
          <img
            src={ASSETS.hero}
            alt="Navratri Grand Garba Celebration Arena"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
          />

          {/* Luxury contrast scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-black/20" />

          {/* Top subtle corner badge */}
          <div className="absolute top-6 left-6 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/60 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Grand Festive Season 2026</span>
          </div>

          {/* Bottom Floating Category Filter Bar — Exactly as seen in reference image */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-auto max-w-[92%]">
            <div className="flex items-center gap-1 p-1.5 bg-stone-900/80 backdrop-blur-md rounded-full border border-white/15 shadow-xl overflow-x-auto scrollbar-none">
              {heroFilterCategories.map((cat, idx) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    scrollTo('venue-explorer');
                  }}
                  className={`px-4 py-2 text-xs font-medium rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    idx === 0
                      ? 'bg-white text-stone-900 font-semibold shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping Venue Architectural Overview Card — Modeled directly on the reference Manhattan card! */}
      <div className="relative -mt-10 sm:-mt-14 z-20 max-w-5xl mx-auto px-2">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/60 border border-stone-200/80">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-stone-100">
            {/* Left: Architectural Sketch Motif & Venue Title */}
            <div className="flex items-start gap-4">
              {/* Traditional Dandiya / Mandala geometric line art icon */}
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0 text-amber-800">
                <svg viewBox="0 0 48 48" className="w-8 h-8 fill-none stroke-current stroke-1.5">
                  {/* Mandala & crossed dandiya motif */}
                  <circle cx="24" cy="24" r="20" strokeDasharray="3 3" opacity="0.4" />
                  <circle cx="24" cy="24" r="14" opacity="0.7" />
                  <line x1="12" y1="12" x2="36" y2="36" strokeWidth="2" strokeLinecap="round" />
                  <line x1="36" y1="12" x2="12" y2="36" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="24" cy="24" r="4" fill="currentColor" fillOpacity="0.2" />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl font-bold text-stone-900">
                    {primaryVenue.name}
                  </h3>
                  <span className="text-xs font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full">
                    {primaryVenue.venueNumber}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1 max-w-md">
                  Fast and seamless pass booking with verified entry passes, VIP lounges, and live orchestrations.
                </p>
              </div>
            </div>

            {/* Right: Quick Action Button */}
            <button
              onClick={() => scrollTo('venue-explorer')}
              className="px-5 py-2.5 text-xs font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-full transition-colors cursor-pointer self-start lg:self-center flex items-center gap-1.5"
            >
              <span>Explore 5 Iconic Venues</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Model / Venue Grid Matrix — Modeled directly on the reference grid */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="text-stone-400 block font-medium uppercase tracking-wider text-[11px] mb-1">
                Venue Type
              </span>
              <span className="text-stone-800 font-semibold text-sm">Royal Courtyard Deck</span>
              <span className="text-stone-500 block mt-0.5">Sandstone Amphitheatre</span>
            </div>

            <div>
              <span className="text-stone-400 block font-medium uppercase tracking-wider text-[11px] mb-1">
                Audience Capacity
              </span>
              <span className="text-stone-800 font-semibold text-sm">8,000+ Persons</span>
              <span className="text-stone-500 block mt-0.5">Strict Capacity Capping</span>
            </div>

            <div>
              <span className="text-stone-400 block font-medium uppercase tracking-wider text-[11px] mb-1">
                Sound Architecture
              </span>
              <span className="text-stone-800 font-semibold text-sm">JBL VTX Line-Array</span>
              <span className="text-stone-500 block mt-0.5">360° Acoustic Tuning</span>
            </div>

            <div>
              <span className="text-stone-400 block font-medium uppercase tracking-wider text-[11px] mb-1">
                Pass Pricing
              </span>
              <span className="text-amber-700 font-bold text-sm">
                From {primaryVenue.prices.single}
              </span>
              <button
                onClick={() => openVenueDetails(primaryVenue)}
                className="text-stone-600 hover:text-stone-900 underline block mt-0.5 cursor-pointer"
              >
                View Full Specifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
