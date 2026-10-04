import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, Sparkles, SlidersHorizontal, Calculator, ArrowRight, ShieldCheck } from 'lucide-react';

export const PassesAndPrices: React.FC = () => {
  const { venues, startBooking, setIsEditorOpen, formatPrice } = useApp();
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venues[0]?.id || '');
  const [selectedPassType, setSelectedPassType] = useState<'single' | 'couple' | 'vip' | 'group'>('single');
  const [passCount, setPassCount] = useState<number>(2);

  const activeVenue = venues.find((v) => v.id === selectedVenueId) || venues[0];

  const passTypeLabels: Record<'single' | 'couple' | 'vip' | 'group', string> = {
    single: 'Single Pass',
    couple: 'Couple Pass',
    vip: 'VIP Pass',
    group: 'Group Pass (5+)',
  };

  const getActivePrice = (type: 'single' | 'couple' | 'vip' | 'group') => {
    if (!activeVenue) return '₹[PRICE]';
    return formatPrice(activeVenue.prices[type]);
  };

  return (
    <section id="passes" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-semibold tracking-wider text-amber-700 uppercase">
          Transparent Official Pricing
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1">
          Passes & Prices
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base">
          All passes include verified digital QR admission, parking access, and valid entry for the selected date. Choose your venue and pass category below.
        </p>

        {/* Quick Edit notice banner for the owner */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-medium">
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
          <span>Need to update pass prices or switch placeholder format?</span>
          <button
            onClick={() => setIsEditorOpen(true)}
            className="font-bold underline hover:text-amber-950 cursor-pointer"
          >
            Edit Prices Now
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid — Showcasing the 4 Pass Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Tier 1: Single Pass */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-stone-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Tier 01</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                1 Person
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-stone-900 mt-2">Single Pass</h3>
            <p className="text-xs text-stone-500 mt-1">
              Standard individual entry for traditional folk arena grounds.
            </p>

            <div className="mt-6 mb-6">
              <span className="text-xs text-stone-400 block font-medium">Pricing Range</span>
              <div className="text-2xl font-bold text-stone-900 font-mono">
                {formatPrice('₹[PRICE]')}
              </div>
              <span className="text-[11px] text-stone-500 block mt-0.5">Varies per venue</span>
            </div>

            <ul className="space-y-2 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Entry to main general dancing arena</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Complimentary water hydration points</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Access to authentic food courts</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => startBooking(activeVenue.id, 'Single Pass')}
            className="mt-6 w-full py-2.5 px-4 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
          >
            Select Single Pass
          </button>
        </div>

        {/* Tier 2: Couple Pass */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-stone-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Tier 02</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800">
                1 Pair (M+F)
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-stone-900 mt-2">Couple Pass</h3>
            <p className="text-xs text-stone-500 mt-1">
              Priority admission for couples with dedicated seating pockets.
            </p>

            <div className="mt-6 mb-6">
              <span className="text-xs text-stone-400 block font-medium">Pricing Range</span>
              <div className="text-2xl font-bold text-stone-900 font-mono">
                {formatPrice('₹[PRICE]')}
              </div>
              <span className="text-[11px] text-stone-500 block mt-0.5">Discounted pair rate</span>
            </div>

            <ul className="space-y-2 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Admit 1 Male + 1 Female</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Fast-track couple entrance queue</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Access to couple resting lawns</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => startBooking(activeVenue.id, 'Couple Pass')}
            className="mt-6 w-full py-2.5 px-4 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
          >
            Select Couple Pass
          </button>
        </div>

        {/* Tier 3: VIP Pass (Featured) */}
        <div className="bg-stone-900 text-white rounded-2xl sm:rounded-3xl p-6 border border-stone-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-amber-950 px-3 py-1 rounded-bl-xl shadow-xs">
              Most Popular
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Tier 03</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white">
                VIP Access
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mt-2">VIP Pass</h3>
            <p className="text-xs text-stone-400 mt-1">
              Elevated vantage, air-conditioned hospitality lounge & valet.
            </p>

            <div className="mt-6 mb-6">
              <span className="text-xs text-stone-400 block font-medium">Pricing Range</span>
              <div className="text-2xl font-bold text-amber-300 font-mono">
                {formatPrice('₹[PRICE]')}
              </div>
              <span className="text-[11px] text-stone-400 block mt-0.5">All-inclusive hospitality</span>
            </div>

            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Reserved VIP Deck overlooking dance floor</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Complimentary valet parking & express entry</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Air-conditioned lounge & buffet dining</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => startBooking(activeVenue.id, 'VIP Pass')}
            className="mt-6 w-full py-2.5 px-4 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
          >
            Select VIP Pass
          </button>
        </div>

        {/* Tier 4: Group Pass */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-stone-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Tier 04</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                5+ Members
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-stone-900 mt-2">Group Pass</h3>
            <p className="text-xs text-stone-500 mt-1">
              Perfect for college squads, corporate teams, and large families.
            </p>

            <div className="mt-6 mb-6">
              <span className="text-xs text-stone-400 block font-medium">Pricing Range</span>
              <div className="text-2xl font-bold text-stone-900 font-mono">
                {formatPrice('₹[PRICE]')}
              </div>
              <span className="text-[11px] text-stone-500 block mt-0.5">Bulk squad package</span>
            </div>

            <ul className="space-y-2 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Bundle of 5 verified RFID wristbands</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Group photo stage reservation slot</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Dedicated event concierge assistance</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => startBooking(activeVenue.id, 'Group Pass')}
            className="mt-6 w-full py-2.5 px-4 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
          >
            Select Group Pass
          </button>
        </div>
      </div>

      {/* Interactive Pass Price Calculator & Venue Selector Box */}
      <div className="bg-stone-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-stone-200">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Interactive Pass Estimator</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-stone-900 mt-1">
              Select Venue & Calculate Instant Quote
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Choose from any of our 10+ venues to check specific pass rates and proceed directly to booking.
            </p>
          </div>

          {/* Venue Selector Dropdown */}
          <div className="w-full lg:w-80">
            <label className="block text-xs font-medium text-stone-700 mb-1.5">
              Select Navratri Venue
            </label>
            <select
              value={selectedVenueId}
              onChange={(e) => setSelectedVenueId(e.target.value)}
              className="w-full p-2.5 text-xs font-semibold rounded-xl bg-white border border-stone-300 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.venueNumber} — {venue.name} ({venue.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Venue Pricing Detail Card */}
        {activeVenue && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              onClick={() => setSelectedPassType('single')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedPassType === 'single'
                  ? 'bg-white border-amber-500 ring-2 ring-amber-200 shadow-sm'
                  : 'bg-white/60 border-stone-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-600">Single Pass</span>
                {selectedPassType === 'single' && <Check className="w-3.5 h-3.5 text-amber-600" />}
              </div>
              <div className="mt-2 text-lg font-bold text-stone-900 font-mono">
                {getActivePrice('single')}
              </div>
              <span className="text-[10px] text-stone-500 mt-1 block">1 Individual entry</span>
            </div>

            <div
              onClick={() => setSelectedPassType('couple')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedPassType === 'couple'
                  ? 'bg-white border-amber-500 ring-2 ring-amber-200 shadow-sm'
                  : 'bg-white/60 border-stone-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-600">Couple Pass</span>
                {selectedPassType === 'couple' && <Check className="w-3.5 h-3.5 text-amber-600" />}
              </div>
              <div className="mt-2 text-lg font-bold text-stone-900 font-mono">
                {getActivePrice('couple')}
              </div>
              <span className="text-[10px] text-stone-500 mt-1 block">1 Couple (Male + Female)</span>
            </div>

            <div
              onClick={() => setSelectedPassType('vip')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedPassType === 'vip'
                  ? 'bg-white border-amber-500 ring-2 ring-amber-200 shadow-sm'
                  : 'bg-white/60 border-stone-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-600">VIP Pass</span>
                {selectedPassType === 'vip' && <Check className="w-3.5 h-3.5 text-amber-600" />}
              </div>
              <div className="mt-2 text-lg font-bold text-amber-800 font-mono">
                {getActivePrice('vip')}
              </div>
              <span className="text-[10px] text-stone-500 mt-1 block">VIP lounge + Valet</span>
            </div>

            <div
              onClick={() => setSelectedPassType('group')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedPassType === 'group'
                  ? 'bg-white border-amber-500 ring-2 ring-amber-200 shadow-sm'
                  : 'bg-white/60 border-stone-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-600">Group Pass</span>
                {selectedPassType === 'group' && <Check className="w-3.5 h-3.5 text-amber-600" />}
              </div>
              <div className="mt-2 text-lg font-bold text-stone-900 font-mono">
                {getActivePrice('group')}
              </div>
              <span className="text-[10px] text-stone-500 mt-1 block">5+ Group package</span>
            </div>
          </div>
        )}

        {/* Action Row */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200">
          <div className="text-xs text-stone-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              Selected:{' '}
              <strong className="text-stone-900">
                {activeVenue.name} · {passTypeLabels[selectedPassType]}
              </strong>
            </span>
          </div>

          <button
            onClick={() => startBooking(activeVenue.id, passTypeLabels[selectedPassType])}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
          >
            <span>Proceed to Book This Pass</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
