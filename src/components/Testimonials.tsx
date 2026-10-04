import React from 'react';
import { TESTIMONIALS } from '../data/defaultData';
import { Quote, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Testimonials: React.FC = () => {
  const { setIsEditorOpen } = useApp();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-semibold tracking-wider text-amber-700 uppercase">
          Guest Feedback
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1">
          Attendee Experiences
        </h2>
        <p className="mt-2 text-stone-500 text-xs sm:text-sm">
          Placeholder testimonials from attendees across previous Navratri editions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <Quote className="w-8 h-8 text-amber-400/40 mb-3" />
              <p className="text-sm text-stone-700 leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100">
              <div className="font-display text-xs font-bold text-stone-900">
                — {item.author}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                {item.location} · {item.event}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
