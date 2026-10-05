import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Utensils,
  Award,
  Calendar,
  MapPin,
  Clock,
  Ticket,
} from 'lucide-react';

export const PassesAndPrices: React.FC = () => {
  const { venues, startBooking } = useApp();
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venues[0]?.id || 'venue-01');

  const activeVenue = venues.find((v) => v.id === selectedVenueId) || venues[0];

  return (
    <section id="passes" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-semibold tracking-wider text-amber-700 uppercase">
          Official Authorized Rates 2026
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1">
          5 Iconic Venues · Passes & Prices
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base">
          Direct organizer rates with zero convenience markups. Select your preferred venue and pass category to proceed with instant WhatsApp booking.
        </p>
      </div>

      {/* Venues Showcase Grid — 5 Venues */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {venues.map((venue) => {
          const passOptions = venue.passOptions || [];
          return (
            <div
              key={venue.id}
              className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl ${
                venue.id === 'venue-01'
                  ? 'bg-gradient-to-b from-amber-50/50 via-white to-white border-amber-300 ring-2 ring-amber-400/20'
                  : 'bg-white border-stone-200'
              }`}
            >
              <div>
                {/* Header & Tag */}
                <div className="p-6 pb-4 border-b border-stone-100">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full">
                      {venue.venueNumber}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                      {venue.city}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-stone-900 leading-snug">
                    {venue.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                    {venue.venueName}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-stone-600">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="truncate">{venue.location}</span>
                  </div>
                </div>

                {/* Pass Options List for this Venue */}
                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Available Pass Options
                  </span>

                  {passOptions.map((pass) => (
                    <div
                      key={pass.id}
                      className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/90 flex items-center justify-between gap-3 hover:border-amber-400 transition-colors"
                    >
                      <div>
                        <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                          {pass.name.includes('Food') && <Utensils className="w-3 h-3 text-amber-700" />}
                          {pass.name.includes('Gold') && <Award className="w-3 h-3 text-amber-600" />}
                          {pass.name.includes('Platinum') && <Sparkles className="w-3 h-3 text-purple-600" />}
                          {pass.name}
                        </span>
                        {pass.description && (
                          <span className="text-[10px] text-stone-500 block mt-0.5 line-clamp-1">
                            {pass.description}
                          </span>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono font-extrabold text-base text-amber-950">
                          ₹{pass.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[9px] text-stone-400 block uppercase">Per Pass</span>
                      </div>
                    </div>
                  ))}

                  {/* Highlights */}
                  <ul className="pt-2 space-y-1.5 text-[11px] text-stone-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{venue.garbaType}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Official digital WhatsApp pass with instant QR verification</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => startBooking(venue.id, passOptions[0]?.name)}
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-[0.98]"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Book Pass for {venue.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transparent Pricing Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <h3 className="font-display text-xl font-bold text-stone-900">
              Complete Official Pass Summary Matrix
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Side-by-side view of all 5 authorized venues and pass options.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Genuine Authorized Rates</span>
          </div>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Venue</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Pass Category</th>
                <th className="py-3 px-4">Our Community Rate</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {venues.flatMap((v) =>
                (v.passOptions || []).map((pass, pIdx) => (
                  <tr key={`${v.id}-${pass.id}`} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-stone-900 block">{v.name}</span>
                      <span className="text-[10px] text-stone-500">{v.venueNumber}</span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">
                      {v.location}, {v.city}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-stone-800 inline-flex items-center gap-1.5">
                        {pass.name}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-sm text-amber-900">
                        ₹{pass.price.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => startBooking(v.id, pass.name)}
                        className="px-4 py-1.5 text-[11px] font-bold rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-900 transition-colors cursor-pointer"
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
