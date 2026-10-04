import React from 'react';
import { ASSETS } from '../data/defaultData';
import { Sparkles, Music, Flame, UtensilsCrossed, HeartHandshake } from 'lucide-react';

export const NavratriExperience: React.FC = () => {
  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-stone-950 text-white shadow-xl">
        {/* Background Image with warm atmospheric grade */}
        <div className="absolute inset-0">
          <img
            src={ASSETS.experience}
            alt="Garba Celebration Experience"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/30" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Spirit of Gujarat</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Garba · Music · Lights · Food · Celebration
          </h2>

          <p className="mt-5 text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
            For nine sacred nights under autumn starlight, Gujarat transforms into an enchanting dance festival. Synchronized steps to heavy dhol beats, vibrant chaniya cholis shimmering with hand-stitched mirrors, and pure communal bliss.
          </p>

          {/* 4 Feature Highlights */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-xs">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
                <Music className="w-4 h-4" />
                <span>Live Orchestras</span>
              </div>
              <p className="text-stone-400 text-[11px]">
                Soulful traditional folk singers & 50-piece ensembles.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
                <Flame className="w-4 h-4" />
                <span>Royal Decor</span>
              </div>
              <p className="text-stone-400 text-[11px]">
                Illuminated sandstone arches, thousands of brass diyas.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
                <UtensilsCrossed className="w-4 h-4" />
                <span>Gourmet Food</span>
              </div>
              <p className="text-stone-400 text-[11px]">
                Authentic Gujarati snacks, midnight jalebi fafda & chai.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
                <HeartHandshake className="w-4 h-4" />
                <span>Pure Culture</span>
              </div>
              <p className="text-stone-400 text-[11px]">
                Warm Gujarati hospitality with strict family safety.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
