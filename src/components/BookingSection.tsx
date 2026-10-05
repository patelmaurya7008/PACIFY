import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BookingFormValues, PassOptionItem } from '../types';
import {
  Calendar,
  Ticket,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  PhoneCall,
  Printer,
  Copy,
  Check,
  Utensils,
  Award,
} from 'lucide-react';

export const BookingSection: React.FC = () => {
  const {
    venues,
    settings,
    bookingPreselect,
    clearBookingPreselect,
    recentBooking,
    setRecentBooking,
  } = useApp();

  const [selectedVenueId, setSelectedVenueId] = useState<string>(venues[0]?.id || 'venue-01');
  const selectedVenue = venues.find((v) => v.id === selectedVenueId) || venues[0];

  // Dynamic pass options for selected venue
  const currentPassOptions: PassOptionItem[] = selectedVenue?.passOptions && selectedVenue.passOptions.length > 0
    ? selectedVenue.passOptions
    : [
        { id: 'standard', name: 'Entry Pass', price: 900, description: 'Standard arena pass' },
      ];

  const [formData, setFormData] = useState<BookingFormValues>({
    eventId: selectedVenueId,
    passType: currentPassOptions[0]?.name || 'With Unlimited Food',
    passPriceNumber: currentPassOptions[0]?.price || 850,
    quantity: 2,
    fullName: '',
    mobile: '',
    email: '',
    preferredDate: '2026-10-15',
    notes: '',
  });

  const [copied, setCopied] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sync with venue change
  const handleVenueChange = (venueId: string) => {
    setSelectedVenueId(venueId);
    const targetVenue = venues.find((v) => v.id === venueId);
    const passes = targetVenue?.passOptions || [];
    const defaultPass = passes[0] || { name: 'Entry Pass', price: 900 };

    setFormData((prev) => ({
      ...prev,
      eventId: venueId,
      passType: defaultPass.name,
      passPriceNumber: defaultPass.price,
    }));
  };

  // Sync with booking preselection from event cards
  useEffect(() => {
    if (bookingPreselect) {
      const targetVenue = venues.find((v) => v.id === bookingPreselect.venueId) || venues[0];
      if (targetVenue) {
        setSelectedVenueId(targetVenue.id);
        const matchedPass = targetVenue.passOptions?.find(
          (p) => p.name.toLowerCase() === bookingPreselect.passType.toLowerCase()
        ) || targetVenue.passOptions?.[0];

        setFormData((prev) => ({
          ...prev,
          eventId: targetVenue.id,
          passType: matchedPass ? matchedPass.name : bookingPreselect.passType,
          passPriceNumber: matchedPass ? matchedPass.price : 900,
        }));
      }
      clearBookingPreselect();
    }
  }, [bookingPreselect, venues, clearBookingPreselect]);

  const handlePassTypeSelect = (pass: PassOptionItem) => {
    setFormData((prev) => ({
      ...prev,
      passType: pass.name,
      passPriceNumber: pass.price,
    }));
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

  const currentPricePerPass = formData.passPriceNumber || currentPassOptions[0]?.price || 850;
  const calculatedTotal = currentPricePerPass * (formData.quantity || 1);

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

  const cleanPhone = '917359467008';

  const generateWhatsAppMessageContent = (bookingId: string) => {
    return `*Navratri Pass Booking Request*
━━━━━━━━━━━━━━━━━━━━
*Booking ID:* ${bookingId}
*Venue:* ${selectedVenue?.name || 'Navratri Venue'}
*Pass Type:* ${formData.passType}
*Price per Pass:* ₹${currentPricePerPass.toLocaleString('en-IN')}
*Quantity:* ${formData.quantity} Pass(es)
*Total Amount:* ₹${calculatedTotal.toLocaleString('en-IN')}
*Event Date:* ${formData.preferredDate}

*Guest Information:*
*Name:* ${formData.fullName}
*Mobile:* ${formData.mobile}
*Email:* ${formData.email}
*Special Notes:* ${formData.notes || 'None'}
━━━━━━━━━━━━━━━━━━━━
Please confirm pass availability and send payment QR code.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const randomId = 'PACIFY-' + Math.floor(100000 + Math.random() * 900000);
    const bookingSummary = {
      ...formData,
      venueName: selectedVenue?.name || 'Selected Venue',
      passPrice: `₹${currentPricePerPass.toLocaleString('en-IN')}`,
      totalPrice: calculatedTotal,
      bookingId: randomId,
    };

    setRecentBooking(bookingSummary);

    // Redirect to WhatsApp immediately with full booking details
    const textMsg = generateWhatsAppMessageContent(randomId);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textMsg)}`;

    try {
      const win = window.open(waUrl, '_blank');
      if (!win) {
        window.location.href = waUrl;
      }
    } catch {
      window.location.href = waUrl;
    }
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
            Official Pass Reservation 2026
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1">
            Book Your Navratri Pass
          </h2>
          <p className="mt-2 text-stone-600 text-xs sm:text-sm">
            Reserve passes for Gujarat’s 5 iconic venues. Fill the form below to connect instantly with our official ticketing desk on WhatsApp.
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
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Pass Category</span>
                <span className="font-bold text-stone-900 mt-0.5 block">{recentBooking.passType}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Quantity</span>
                <span className="font-bold text-stone-900 mt-0.5 block">{recentBooking.quantity} Pass(es)</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Total Amount</span>
                <span className="font-bold text-amber-800 mt-0.5 block font-mono text-sm">
                  {recentBooking.totalPrice
                    ? `₹${recentBooking.totalPrice.toLocaleString('en-IN')}`
                    : recentBooking.passPrice}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Guest Name</span>
                <span className="font-medium text-stone-800 mt-0.5 block">{recentBooking.fullName}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">WhatsApp Number</span>
                <span className="font-medium text-stone-800 mt-0.5 block">{recentBooking.mobile}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Event Date</span>
                <span className="font-medium text-stone-800 mt-0.5 block">{recentBooking.preferredDate}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">Status</span>
                <span className="text-emerald-700 font-bold mt-0.5 block">Redirecting to WhatsApp</span>
              </div>
            </div>

            {/* Direct WhatsApp Callout Banner */}
            <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">
                    Confirm Directly on WhatsApp: +91 7359467008
                  </h4>
                  <p className="text-[11px] text-emerald-800">
                    Send the pre-filled message to receive verified QR wristbands and payment details instantly.
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  generateWhatsAppMessageContent(recentBooking.bookingId)
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </a>
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
                  Select Navratri Venue (5 Iconic Venues) *
                </label>
                <div className="relative">
                  <select
                    name="eventId"
                    value={selectedVenueId}
                    onChange={(e) => handleVenueChange(e.target.value)}
                    className="w-full p-3.5 text-xs sm:text-sm font-semibold rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    {venues.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.venueNumber} — {v.name} ({v.city} · {v.location})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Venue-Specific Pass Options Selector */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  Choose Pass Option for {selectedVenue?.name} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentPassOptions.map((pass) => {
                    const isSelected = formData.passType === pass.name;
                    return (
                      <button
                        type="button"
                        key={pass.id}
                        onClick={() => handlePassTypeSelect(pass)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-400/40 shadow-xs'
                            : 'bg-stone-50 hover:bg-stone-100/70 border-stone-200 text-stone-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                            {pass.name.includes('Food') && <Utensils className="w-3.5 h-3.5 text-amber-700" />}
                            {pass.name.includes('Gold') && <Award className="w-3.5 h-3.5 text-amber-600" />}
                            {pass.name.includes('Platinum') && <Sparkles className="w-3.5 h-3.5 text-purple-600" />}
                            {pass.name}
                          </span>
                          <span className="font-mono font-extrabold text-base text-amber-900">
                            ₹{pass.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        {pass.description && (
                          <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
                            {pass.description}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
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
                  className="w-full p-3 text-xs sm:text-sm font-semibold rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  Preferred Event Date *
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
                  WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="e.g. 7359467008"
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
              <div className="sm:col-span-2">
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
                    placeholder="e.g. patelmaurya73@gmail.com"
                    className={`w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl bg-stone-50 border ${
                      formErrors.email ? 'border-rose-400' : 'border-stone-200'
                    } text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500`}
                  />
                </div>
                {formErrors.email && (
                  <span className="text-[11px] text-rose-500 mt-1 block">{formErrors.email}</span>
                )}
              </div>

              {/* Message / Notes */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  Special Instructions or Seating Request (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any dietary restrictions, stage front preferences, or family group details..."
                  className="w-full p-3 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Total calculation & Submit Button with WhatsApp Redirection */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-600">
                <span className="text-stone-400 uppercase tracking-wider text-[11px] block font-semibold">
                  Calculation Summary
                </span>
                <span className="font-medium text-stone-900 text-sm">
                  {formData.quantity}x {formData.passType}
                </span>
                <div className="text-xl font-extrabold text-amber-950 font-mono mt-0.5">
                  Total: ₹{calculatedTotal.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-emerald-700 font-medium">
                  Redirects to WhatsApp (+91 7359467008) on clicking Book Now
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 text-xs font-extrabold uppercase tracking-wider text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-stone-950" />
                <span>Book Now & Confirm on WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
