import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Music2,
  Users,
  ShieldAlert,
  Sparkles,
  Ticket,
  ChevronRight,
  PhoneCall,
  CheckCircle,
} from 'lucide-react';

export const EventDetailsModal: React.FC = () => {
  const { activeDetailVenue, closeVenueDetails, startBooking, formatPrice, settings } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!activeDetailVenue) return null;

  const images = activeDetailVenue.galleryImages?.length
    ? activeDetailVenue.galleryImages
    : [activeDetailVenue.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 my-8 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#FBFBFA]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
              {activeDetailVenue.venueNumber}
            </span>
            <span className="text-xs font-medium text-stone-500">
              {activeDetailVenue.city} · {activeDetailVenue.location}
            </span>
          </div>

          <button
            onClick={closeVenueDetails}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Main Visual & Gallery Strip */}
          <div className="space-y-3">
            <div className="relative aspect-16/10 sm:aspect-16/9 rounded-2xl overflow-hidden bg-stone-100">
              <img
                src={images[activeImageIndex] || activeDetailVenue.image}
                alt={activeDetailVenue.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-stone-950/70 text-white text-[11px] px-2.5 py-1 rounded-full backdrop-blur-xs font-medium">
                Photo {activeImageIndex + 1} of {images.length}
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-amber-500 scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Event Title & Summary */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
              {activeDetailVenue.name}
            </h2>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-amber-800 mt-1">
              <span>{activeDetailVenue.venueName}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
              {activeDetailVenue.description}
            </p>
          </div>

          {/* Key Facts Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100 text-xs">
            <div>
              <div className="flex items-center gap-1.5 text-stone-400 font-medium uppercase tracking-wider text-[10px]">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>Date</span>
              </div>
              <span className="font-bold text-stone-900 mt-1 block">{activeDetailVenue.date}</span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-stone-400 font-medium uppercase tracking-wider text-[10px]">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Timings</span>
              </div>
              <span className="font-bold text-stone-900 mt-1 block">
                {activeDetailVenue.startTime} - {activeDetailVenue.endTime}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-stone-400 font-medium uppercase tracking-wider text-[10px]">
                <Music2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Garba Style</span>
              </div>
              <span className="font-bold text-stone-900 mt-1 block">{activeDetailVenue.garbaType}</span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-stone-400 font-medium uppercase tracking-wider text-[10px]">
                <Users className="w-3.5 h-3.5 text-amber-700" />
                <span>Capacity</span>
              </div>
              <span className="font-bold text-stone-900 mt-1 block">{activeDetailVenue.capacity}</span>
            </div>
          </div>

          {/* Full Address */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 text-xs">
            <span className="text-[10px] uppercase font-semibold text-stone-400 block mb-1">
              Complete Venue Address
            </span>
            <div className="flex items-start gap-2 text-stone-800 font-medium leading-relaxed">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>{activeDetailVenue.fullAddress}</span>
            </div>
          </div>

          {/* Available Pass Types & Current Prices */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-lg font-bold text-stone-900">
                Official Pass Options & Pricing
              </h3>
              <span className="text-[11px] text-stone-500 font-medium">Digital QR Wristband</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(activeDetailVenue.passOptions && activeDetailVenue.passOptions.length > 0
                ? activeDetailVenue.passOptions
                : [{ id: 'p1', name: 'Entry Pass', price: 900, description: 'Standard arena pass' }]
              ).map((pass) => (
                <div
                  key={pass.id}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">{pass.name}</span>
                    {pass.description && (
                      <span className="text-[11px] text-stone-500 block mt-0.5">{pass.description}</span>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-extrabold text-amber-950 font-mono block">
                      ₹{pass.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-stone-400 uppercase">Per Pass</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities & Important Instructions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-100 text-xs">
            <div>
              <h4 className="font-semibold text-stone-900 mb-2.5 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Venue Amenities & Setup</span>
              </h4>
              <ul className="space-y-1.5 text-stone-600">
                {activeDetailVenue.amenities?.map((amenity, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-stone-900 mb-2.5 flex items-center gap-1.5 text-stone-800">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Important Entry Instructions</span>
              </h4>
              <ul className="space-y-1.5 text-stone-600">
                {activeDetailVenue.rules?.map((rule, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-stone-400"></span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            Official Organiser: <strong className="text-stone-800">{activeDetailVenue.organizer}</strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
              className="px-4 py-2.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Helpline</span>
            </a>

            <button
              onClick={() => startBooking(activeDetailVenue.id, activeDetailVenue.passOptions?.[0]?.name || 'Entry Pass')}
              className="flex-1 sm:flex-initial px-6 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Pass for this Venue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
