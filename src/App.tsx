/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedEvents } from './components/FeaturedEvents';
import { VenueExplorer } from './components/VenueExplorer';
import { PassesAndPrices } from './components/PassesAndPrices';
import { NavratriExperience } from './components/NavratriExperience';
import { WhyBookWithUs } from './components/WhyBookWithUs';
import { VenueGallery } from './components/VenueGallery';
import { Testimonials } from './components/Testimonials';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EventDetailsModal } from './components/EventDetailsModal';
import { ContentEditorModal } from './components/ContentEditorModal';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#FBFBFA] text-stone-900 font-sans flex flex-col selection:bg-amber-100 selection:text-amber-900">
        {/* Navigation Bar */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section with category pills & architectural spec card */}
          <Hero />

          {/* 2. Featured Events Section with 10+ venue carousel cards */}
          <FeaturedEvents />

          {/* 3. Venue Explorer with multi-category filters & search */}
          <VenueExplorer />

          {/* 4. Passes & Prices with transparent tier comparison & calculator */}
          <PassesAndPrices />

          {/* 5. Navratri Experience ("Garba • Music • Lights • Food • Celebration") */}
          <NavratriExperience />

          {/* 6. Why Book With Us (6 feature cards) */}
          <WhyBookWithUs />

          {/* 7. Navratri Venues Photo Gallery */}
          <VenueGallery />

          {/* 8. Testimonials (Editable customer reviews) */}
          <Testimonials />

          {/* 9. Booking Form with instant reservation confirmation & WhatsApp */}
          <BookingSection />

          {/* 10. Direct Contact Booking Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals & Drawers */}
        <EventDetailsModal />
        <ContentEditorModal />

        {/* Mobile Sticky Quick Contact Bar */}
        <MobileStickyBar />
      </div>
    </AppProvider>
  );
}
