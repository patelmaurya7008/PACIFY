import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryType } from '../types';
import {
  MapPin,
  Calendar,
  Users,
  Music2,
  Sparkles,
  ArrowRight,
  Search,
  Filter,
} from 'lucide-react';

const CATEGORIES: CategoryType[] = [
  'All Venues',
  'Premium Garba',
  'Traditional Garba',
  'DJ Garba',
  'Couple Night',
  'Family Events',
  'Celebrity Night',
  'College Events',
  'Unlimited Pass',
];

export const VenueExplorer: React.FC = () => {
  const { venues, selectedCategory, setSelectedCategory, openVenueDetails, startBooking, formatPrice } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');

  const cities = useMemo(() => {
    const list = Array.from(new Set(venues.map((v) => v.city)));
    return ['All Cities', ...list];
  }, [venues]);

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      const matchesCategory =
        selectedCategory === 'All Venues' || venue.category.includes(selectedCategory);

      const matchesCity =
        selectedCity === 'All Cities' || venue.city.toLowerCase() === selectedCity.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        venue.name.toLowerCase().includes(q) ||
        venue.venueName.toLowerCase().includes(q) ||
        venue.location.toLowerCase().includes(q) ||
        venue.city.toLowerCase().includes(q) ||
        venue.venueNumber.toLowerCase().includes(q);

      return matchesCategory && matchesCity && matchesSearch;
    });
  }, [venues, selectedCategory, selectedCity, searchQuery]);

  return (
    <section id="venue-explorer" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-semibold tracking-wider text-amber-700 uppercase">
          Curated Gujarat Arenas
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1">
          Explore Navratri Venues
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base">
          Browse Gujarat’s premier Garba grounds, royal palace courtyards, and vibrant celebrity nights. Filter by event style or city.
        </p>
      </div>

      {/* Category Filter Tabs — Segmented luxury control */}
      <div className="mb-6 flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs font-medium rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200/90 hover:bg-stone-50'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Search & City Filter Bar */}
      <div className="mb-8 p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search venue, location, or artist..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500 text-stone-800 placeholder-stone-400"
          />
        </div>

        {/* City Filter & Count */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-lg border border-stone-200 bg-stone-50 text-stone-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <span className="text-xs text-stone-500 font-medium">
            Showing <strong className="text-stone-900">{filteredVenues.length}</strong> venues
          </span>
        </div>
      </div>

      {/* Venues Grid */}
      {filteredVenues.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
          <p className="text-stone-500 text-sm">No venues found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All Venues');
              setSelectedCity('All Cities');
              setSearchQuery('');
            }}
            className="mt-4 text-xs font-semibold text-amber-700 hover:text-amber-800 underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Venue Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={venue.image}
                  alt={venue.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-stone-950/80 text-white backdrop-blur-xs">
                    {venue.venueNumber}
                  </span>
                  {venue.city && (
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/90 text-stone-800 backdrop-blur-xs">
                      {venue.city}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="px-2 py-1 rounded-md bg-stone-950/60 backdrop-blur-xs text-[11px]">
                    {venue.capacity}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-amber-400 text-amber-950 font-bold text-[11px]">
                    From {formatPrice(venue.prices.single)}
                  </span>
                </div>
              </div>

              {/* Venue Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {venue.name}
                  </h3>
                  <p className="text-xs font-semibold text-stone-500 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{venue.venueName}, {venue.location}</span>
                  </p>

                  <p className="text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed">
                    {venue.description}
                  </p>

                  {/* Quick specs grid */}
                  <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-2 gap-2 text-[11px] text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <Music2 className="w-3 h-3 text-amber-700 shrink-0" />
                      <span className="truncate">{venue.garbaType.split('&')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-amber-700 shrink-0" />
                      <span className="truncate">{venue.date}</span>
                    </div>
                  </div>

                  {/* Pass Pricing Preview Matrix */}
                  <div className="mt-3.5 p-2.5 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-medium">Single</span>
                      <span className="font-bold text-stone-800">{formatPrice(venue.prices.single)}</span>
                    </div>
                    <div className="h-6 w-px bg-stone-200"></div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-medium">Couple</span>
                      <span className="font-bold text-stone-800">{formatPrice(venue.prices.couple)}</span>
                    </div>
                    <div className="h-6 w-px bg-stone-200"></div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-medium">VIP Pass</span>
                      <span className="font-bold text-amber-800">{formatPrice(venue.prices.vip)}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-3">
                  <button
                    onClick={() => openVenueDetails(venue)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer text-center"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => startBooking(venue.id, 'Single Pass')}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer text-center shadow-2xs"
                  >
                    Book Pass
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
