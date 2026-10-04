import React from 'react';
import { WHY_BOOK_WITH_US } from '../data/defaultData';
import {
  Building2,
  CalendarCheck2,
  Zap,
  ShieldCheck,
  Layers,
  Headphones,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5 text-amber-700" />,
  CalendarCheck2: <CalendarCheck2 className="w-5 h-5 text-amber-700" />,
  Zap: <Zap className="w-5 h-5 text-amber-700" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-amber-700" />,
  Layers: <Layers className="w-5 h-5 text-amber-700" />,
  Headphones: <Headphones className="w-5 h-5 text-amber-700" />,
};

export const WhyBookWithUs: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-semibold tracking-wider text-amber-700 uppercase">
          Guaranteed Authenticity
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1">
          Why Book With Us
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base">
          We eliminate the hassle of black-market tickets and unverified passes with direct organizer ticketing and guaranteed venue entry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHY_BOOK_WITH_US.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
              {ICON_MAP[item.iconName]}
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-stone-900">
                {item.title}
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
