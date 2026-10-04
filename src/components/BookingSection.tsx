import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BookingFormValues } from '../types';
import {
  Calendar,
  Ticket,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  PhoneCall,
  Printer,
  Copy,
  Check,
} from 'lucide-react';

export const BookingSection: React.FC = () => {
  const {
    venues,
    settings,
    bookingPreselect,
    clearBookingPreselect,
    recentBooking,
    setRecentBooking,
    formatPrice,
  } = useApp();

  const [formData, setFormData] = useState<BookingFormValues>({
    eventId: venues[0]?.id || '',
    passType: 'Single Pass',
    quantity: 2,
    fullName: '',
    mobile: '',
    email: '',
    preferredDate: '2026-10-15',
    notes: '',
  });

  const [copied, setCopied] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sync with booking preselection from event cards
  useEffect(() => {
    if (bookingPreselect) {
      setFormData((prev) => ({
        ...prev,
        eventId: bookingPreselect.venueId || prev.eventId,
        passType: (bookingPreselect.passType as any) || prev.passType,
      }));
      clearBookingPreselect();
    }
  }, [bookingPreselect, clearBookingPreselect]);

  const selectedVenue = venues.find((v) => v.id === formData.eventId) || venues[0];

  const getPassPriceString = () => {
    if (!selectedVenue) return '₹[PRICE]';
    switch (formData.passType) {
      case 'Single Pass':
        return formatPrice(selectedVenue.prices.single);
      case 'Couple Pass':
        return formatPrice(selectedVenue.prices.couple);
      case 'VIP Pass':
        return formatPrice(selectedVenue.prices.vip);
      case 'Group Pass':
        return formatPrice(selectedVenue.prices.group);
      default:
        return '₹[PRICE]';
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Math.max(1, parseInt(value) || 1) : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.mobile.trim()) errors.mobile = 'Please enter your mobile number';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.preferredDate) errors.preferredDate = 'Please select a date';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const randomId = 'PACIFY-' + Math.floor(100000 + Math.random() * 900000);
    const bookingSummary = {
      ...formData,
      venueName: selectedVenue.name,
      passPrice: getPassPriceString(),
      bookingId: randomId,
    };

    setRecentBooking(bookingSummary);
  };

  const cleanPhone = settings.phone.replace(/[^0-9]/g, '');

  const generateWhatsAppMessage = () => {
    if (!recentBooking) return '';
    const text = `Hello PACIFY! I want to confirm my Navratri Pass Booking:
- Booking ID: ${recentBooking.bookingId}
- Venue: ${recentBooking.venueName}
- Pass Type: ${recentBooking.passType}
- Quantity: ${recentBooking.quantity} Pass(es)
- Date: ${recentBooking.preferredDate}
- Name: ${recentBooking.fullName}
- Mobile: ${recentBooking.mobile}
- Notes: ${recentBooking.notes || 'None'}
Please confirm pass availability and payment instructions.`;
    return encodeURIComponent(text);
  };

  const copyBookingId = () => {
    if (recentBooking?.bookingId) {
      navigator.clipboard.writeText(recentBooking.bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="booking" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-wider text-amber-700 uppercase">
            Instant Pass Reservation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1">
            Book Your Navratri Pass
          </h2>
          <p className="mt-2 text-stone-600 text-xs sm:text-sm">
            Reserve passes for any of Gujarat’s 10+ premium venues. Instant booking confirmation sent to your WhatsApp and Email.
          </p>
        </div>

        {recentBooking ? (
          /* Confirmation Receipt Card */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-900">
                    Pass Reservation Received!
                  </h3>
                  <p className="text-xs text-stone-500">
                    Reference ID:{' '}
                    <strong className="text-stone-900 font-mono font-bold">
                      {recentBooking.bookingId}
                    </strong>
                  </p>
                </div>
              </div>

              <button
                onClick={copyBookingId}
                className="text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 rounded-lg cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied ID' : 'Copy ID'}</span>
              </button>
            </div>

            {/* Pass Details Matrix */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-stone-50 rounded-2xl text-xs">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Venue</span>
                <span className="font-bold text-stone-900 mt-0.5 block">{recentBooking.venueName}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Pass Type</span>
                <span className="font-bold text-stone-900 mt-0.5 block">{recentBooking.passType}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Quantity</span>
                <span className="font-bold text-stone-900 mt-0.5 block">{recentBooking.quantity} Pass(es)</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Estimated Rate</span>
                <span className="font-bold text-amber-800 mt-0.5 block font-mono">{recentBooking.passPrice}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Guest Name</span>
                <span className="font-medium text-stone-800 mt-0.5 block">{recentBooking.fullName}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Mobile</span>
                <span className="font-medium text-stone-800 mt-0.5 block">{recentBooking.mobile}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Event Date</span>
                <span className="font-medium text-stone-800 mt-0.5 block">{recentBooking.preferredDate}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Status</span>
                <span className="text-emerald-700 font-bold mt-0.5 block">Pending Confirmation</span>
              </div>
            </div>

            {/* Direct Connect Action Row */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500">
                To guarantee your physical wristbands and express entry, connect directly with our ticketing desk:
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                {/* WhatsApp Action */}
                <a
                  href={`https://wa.me/${cleanPhone || '919876543210'}?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm on WhatsApp</span>
                </a>

                {/* Call Action */}
                <a
                  href={`tel:${cleanPhone}`}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center text-xs">
              <button
                onClick={() => setRecentBooking(null)}
                className="text-stone-600 hover:text-stone-900 underline font-medium cursor-pointer"
              >
                ← Book Another Pass
              </button>
              <button
                onClick={() => window.print()}
                className="text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Pass Slip</span>
              </button>
            </div>
          </div>
        ) : (
          /* Main Booking Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Select Venue/Event */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  Select Venue / Event *
                </label>
                <div className="relative">
                  <select
                    name="eventId"
                    value={formData.eventId}
                    onChange={handleInputChange}
                    className="w-full p-3 text-xs sm:text-sm font-medium rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    {venues.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.venueNumber} — {v.name} ({v.city} · {v.location})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Select Pass Type */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  Select Pass Type *
                </label>
                <select
                  name="passType"
                  value={formData.passType}
                  onChange={handleInputChange}
                  className="w-full p-3 text-xs sm:text-sm font-medium rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Single Pass">Single Pass (1 Person)</option>
                  <option value="Couple Pass">Couple Pass (Male + Female)</option>
                  <option value="VIP Pass">VIP Pass (Lounge + Valet)</option>
                  <option value="Group Pass">Group Pass (5+ Members)</option>
                </select>
              </div>

              {/* Number of Passes */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  Number of Passes *
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="50"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full p-3 text-xs sm:text-sm font-medium rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className={`w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl bg-stone-50 border ${
                      formErrors.fullName ? 'border-rose-400' : 'border-stone-200'
                    } text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500`}
                  />
                </div>
                {formErrors.fullName && (
                  <span className="text-[11px] text-rose-500 mt-1 block">{formErrors.fullName}</span>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  Mobile Number (WhatsApp) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl bg-stone-50 border ${
                      formErrors.mobile ? 'border-rose-400' : 'border-stone-200'
                    } text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500`}
                  />
                </div>
                {formErrors.mobile && (
                  <span className="text-[11px] text-rose-500 mt-1 block">{formErrors.mobile}</span>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className={`w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl bg-stone-50 border ${
                      formErrors.email ? 'border-rose-400' : 'border-stone-200'
                    } text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500`}
                  />
                </div>
                {formErrors.email && (
                  <span className="text-[11px] text-rose-500 mt-1 block">{formErrors.email}</span>
                )}
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  Preferred Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl bg-stone-50 border ${
                      formErrors.preferredDate ? 'border-rose-400' : 'border-stone-200'
                    } text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500`}
                  />
                </div>
              </div>

              {/* Message / Notes */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  Special Instructions / Group Requirements
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Need food coupons, VIP valet, stage front passes, or season passes?"
                  className="w-full p-3 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Rate preview & Submit Button */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-600">
                <span>Selected: </span>
                <strong className="text-stone-900">
                  {formData.quantity}x {formData.passType}
                </strong>
                <span className="text-amber-800 font-bold ml-2 font-mono">
                  @ {getPassPriceString()}
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-3.5 text-xs font-bold uppercase tracking-wider text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-full shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-center active:scale-[0.98]"
              >
                Book Now
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
