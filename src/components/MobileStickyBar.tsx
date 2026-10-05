import React from 'react';
import { useApp } from '../context/AppContext';
import { PhoneCall, MessageCircle, Ticket } from 'lucide-react';

export const MobileStickyBar: React.FC = () => {
  const { settings } = useApp();
  const rawDigits = settings.phone.replace(/[^0-9]/g, '');
  const cleanPhone = rawDigits.length === 10 ? `91${rawDigits}` : rawDigits || '917359467008';

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-t border-stone-200/90 px-3 py-2 shadow-lg">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={`tel:+${cleanPhone}`}
          className="flex-1 py-2 px-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.98]"
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
            'Hello! I want to inquire about Navratri passes for Mandalam, Safed Parindey, E-Fessto, Sachi Navratri & Swarnim Nagari.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-2.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.98]"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        {/* Book Pass Button */}
        <button
          onClick={scrollToBooking}
          className="flex-1.2 py-2 px-3 bg-amber-400 text-stone-950 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-2xs active:scale-[0.98] cursor-pointer"
        >
          <Ticket className="w-3.5 h-3.5" />
          <span>Book Pass</span>
        </button>
      </div>
    </div>
  );
};
