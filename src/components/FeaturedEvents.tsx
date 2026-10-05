import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { VenueEvent } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Heart,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export const FeaturedEvents: React.FC = () => {
  const { venues, openVenueDetails, startBooking, formatPrice } = useApp();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const carouselRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="featured-events" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with Carousel Navigation (modeled on the reference 'Featured Yachts for Charter' + See all + arrows) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-700 uppercase mb-1.5">
            <span>Official Passes 2026</span>
            <span className="w-1 h-1 rounded-full bg-amber-500"></span>
            <span>5 Iconic Venues</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Featured Navratri Events
          </h2>
        </div>

        <div className="flex items-center gap-4 self-start sm:self-auto">
          <a
            href="#venue-explorer"
            className="text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
          >
            See all venues
          </a>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollCarousel('left')}
              className="w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              aria-label="Previous events"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              aria-label="Next events"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Events Carousel / Row — Matching Reference Card Layout */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto pb-6 pt-1 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {venues.map((venue) => {
          const isFav = !!favorites[venue.id];
          return (
            <div
              key={venue.id}
              className="w-[300px] sm:w-[320px] md:w-[340px] shrink-0 snap-start bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group overflow-hidden"
            >
              {/* Card Image Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={venue.image}
                  alt={venue.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                {/* Status Badge (Top-Left) */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-950/80 text-white backdrop-blur-xs">
                    {venue.badge || venue.venueNumber}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-amber-400/90 text-amber-950 backdrop-blur-xs">
                    {venue.venueNumber}
                  </span>
                </div>

                {/* Heart / Save Button (Top-Right) */}
                <button
                  onClick={(e) => toggleFavorite(venue.id, e)}
                  aria-label="Save venue to favorites"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-rose-500 backdrop-blur-xs flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isFav ? 'fill-rose-500 text-rose-500' : 'text-stone-600'
                    }`}
                  />
                </button>

                {/* Bottom gradient overlay for image protection */}
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Event & Venue Name */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                      {venue.name}
                    </h3>
                  </div>

                  <p className="text-xs font-medium text-stone-500 mt-0.5 line-clamp-1">
                    {venue.venueName}
                  </p>

                  {/* Metadata: Date, Time, Location */}
                  <div className="mt-3.5 space-y-1.5 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate">{venue.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{venue.startTime} - {venue.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate">{venue.location}, {venue.city}</span>
                    </div>
                  </div>

                  {/* Subtle Dandiya / Mandala Motif Line Art (Mirroring the boat wireframe in reference image!) */}
                  <div className="my-4 pt-3 border-t border-stone-100 flex items-center justify-between text-stone-400">
                    <div className="flex items-center gap-2 text-[11px] text-stone-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>{venue.garbaType.split('&')[0]}</span>
                    </div>

                    {/* Decorative vector wireframe */}
                    <svg viewBox="0 0 70 14" className="h-3.5 text-amber-700/30 stroke-current fill-none">
                      <path d="M2,7 Q18,2 35,7 T68,7" strokeWidth="1.2" />
                      <circle cx="35" cy="7" r="2.5" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="pt-2 border-t border-stone-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">
                        Passes From
                      </span>
                      <span className="text-base font-bold text-stone-900 font-mono">
                        {venue.passOptions && venue.passOptions.length > 0
                          ? `₹${venue.passOptions[0].price.toLocaleString('en-IN')}`
                          : formatPrice(venue.prices.single)}
                      </span>
                    </div>
                    <button
                      onClick={() => openVenueDetails(venue)}
                      className="text-xs font-medium text-stone-700 hover:text-stone-950 flex items-center gap-1 group/btn cursor-pointer py-1"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => startBooking(venue.id, venue.passOptions?.[0]?.name || 'Entry Pass')}
                    className="w-full py-2.5 px-4 text-xs font-semibold tracking-wide text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all duration-200 cursor-pointer text-center active:scale-[0.99] shadow-2xs"
                  >
                    Book Pass
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
