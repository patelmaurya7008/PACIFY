import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VenueEvent } from '../types';
import { Maximize2, X, ArrowRight, MapPin } from 'lucide-react';

export const VenueGallery: React.FC = () => {
  const { venues, openVenueDetails, startBooking } = useApp();
  const [selectedPhotoVenue, setSelectedPhotoVenue] = useState<VenueEvent | null>(null);

  // Take the first 8-10 venues for visual gallery diversity
  const galleryVenues = venues.slice(0, 8);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-700 uppercase">
            Visual Tour
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1">
            Navratri Venues
          </h2>
          <p className="mt-2 text-stone-600 text-xs sm:text-sm">
            Experience the grandeur of each arena, from illuminated heritage palace courtyards to high-tech concert grounds.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryVenues.map((venue, idx) => {
          // Asymmetric visual spans for architectural rhythm
          const isLarge = idx === 0 || idx === 5;
          return (
            <div
              key={venue.id}
              onClick={() => setSelectedPhotoVenue(venue)}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer bg-stone-100 border border-stone-200 shadow-2xs hover:shadow-lg transition-all duration-300 ${
                isLarge ? 'md:col-span-2 md:row-span-2 aspect-4/3 md:aspect-auto' : 'aspect-4/3'
              }`}
            >
              <img
                src={venue.image}
                alt={venue.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                  {venue.venueNumber}
                </span>
                <h4 className="font-display text-sm font-bold truncate">
                  {venue.venueName}
                </h4>
                <p className="text-[11px] text-stone-300 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span className="truncate">{venue.city}</span>
                </p>
              </div>

              {/* Top hover indicator */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-stone-800 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoVenue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-800">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhotoVenue(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/10 w-full bg-stone-950">
              <img
                src={selectedPhotoVenue.image}
                alt={selectedPhotoVenue.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-stone-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {selectedPhotoVenue.venueNumber}
                </span>
                <h3 className="font-display text-xl font-bold mt-0.5">
                  {selectedPhotoVenue.name}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  {selectedPhotoVenue.fullAddress}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const venue = selectedPhotoVenue;
                    setSelectedPhotoVenue(null);
                    openVenueDetails(venue);
                  }}
                  className="flex-1 sm:flex-initial py-2.5 px-4 text-xs font-semibold text-white bg-stone-800 hover:bg-stone-700 rounded-xl transition-colors cursor-pointer"
                >
                  View Details
                </button>
                <button
                  onClick={() => {
                    const venue = selectedPhotoVenue;
                    setSelectedPhotoVenue(null);
                    startBooking(venue.id, 'Single Pass');
                  }}
                  className="flex-1 sm:flex-initial py-2.5 px-4 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
                >
                  Book Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
