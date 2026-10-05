import React, { createContext, useContext, useState, useEffect } from 'react';
import { VenueEvent, SiteSettings, CategoryType, BookingFormValues } from '../types';
import { INITIAL_VENUES, DEFAULT_SITE_SETTINGS } from '../data/defaultData';

interface AppContextType {
  venues: VenueEvent[];
  setVenues: React.Dispatch<React.SetStateAction<VenueEvent[]>>;
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (cat: CategoryType) => void;
  activeDetailVenue: VenueEvent | null;
  openVenueDetails: (venue: VenueEvent) => void;
  closeVenueDetails: () => void;
  bookingPreselect: { venueId: string; passType: string } | null;
  startBooking: (venueId: string, passType?: string) => void;
  clearBookingPreselect: () => void;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  isOwnerAuthenticated: boolean;
  loginAsOwner: (pin: string) => boolean;
  logoutOwner: () => void;
  changeAdminPin: (newPin: string) => boolean;
  recentBooking: (BookingFormValues & { venueName: string; passPrice: string; bookingId: string }) | null;
  setRecentBooking: (booking: (BookingFormValues & { venueName: string; passPrice: string; bookingId: string }) | null) => void;
  resetAllToDefault: () => void;
  formatPrice: (priceStr: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const VENUES_STORAGE_KEY = 'pacify_navratri_venues_v10';
const SETTINGS_STORAGE_KEY = 'pacify_navratri_settings_v10';
const ADMIN_PIN_STORAGE_KEY = 'pacify_owner_pin_v1';
const OWNER_AUTH_STORAGE_KEY = 'pacify_owner_authenticated_v1';
const DEFAULT_OWNER_PIN = '7359';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminPin, setAdminPin] = useState<string>(() => {
    return localStorage.getItem(ADMIN_PIN_STORAGE_KEY) || DEFAULT_OWNER_PIN;
  });

  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(OWNER_AUTH_STORAGE_KEY) === 'true';
  });
  const [venues, setVenues] = useState<VenueEvent[]>(() => {
    try {
      const saved = localStorage.getItem(VENUES_STORAGE_KEY);
      if (saved) {
        const parsed: VenueEvent[] = JSON.parse(saved);
        // Ensure image assets always reflect the latest imported files
        return parsed.map((v) => {
          const fresh = INITIAL_VENUES.find((iv) => iv.id === v.id);
          return fresh ? { ...v, image: fresh.image, galleryImages: fresh.galleryImages } : v;
        });
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_VENUES;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback to default
    }
    return DEFAULT_SITE_SETTINGS;
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All Venues');
  const [activeDetailVenue, setActiveDetailVenue] = useState<VenueEvent | null>(null);
  const [bookingPreselect, setBookingPreselect] = useState<{ venueId: string; passType: string } | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [recentBooking, setRecentBooking] = useState<(BookingFormValues & { venueName: string; passPrice: string; bookingId: string }) | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(VENUES_STORAGE_KEY, JSON.stringify(venues));
    } catch (e) {
      console.warn('Could not save venues to localStorage', e);
    }
  }, [venues]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Could not save settings to localStorage', e);
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const openVenueDetails = (venue: VenueEvent) => {
    setActiveDetailVenue(venue);
  };

  const closeVenueDetails = () => {
    setActiveDetailVenue(null);
  };

  const startBooking = (venueId: string, passType: string = 'Single Pass') => {
    setBookingPreselect({ venueId, passType });
    setActiveDetailVenue(null);
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const clearBookingPreselect = () => {
    setBookingPreselect(null);
  };

  const resetAllToDefault = () => {
    setVenues(INITIAL_VENUES);
    setSettings(DEFAULT_SITE_SETTINGS);
    localStorage.removeItem(VENUES_STORAGE_KEY);
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
  };

  const formatPrice = (priceStr: string) => {
    if (settings.usePlaceholderPrices) {
      return '₹[PRICE]';
    }
    return priceStr;
  };

  const loginAsOwner = (enteredPin: string): boolean => {
    if (enteredPin.trim() === adminPin.trim()) {
      setIsOwnerAuthenticated(true);
      sessionStorage.setItem(OWNER_AUTH_STORAGE_KEY, 'true');
      setIsEditorOpen(true);
      return true;
    }
    return false;
  };

  const logoutOwner = () => {
    setIsOwnerAuthenticated(false);
    sessionStorage.removeItem(OWNER_AUTH_STORAGE_KEY);
    setIsEditorOpen(false);
  };

  const changeAdminPin = (newPin: string): boolean => {
    if (!newPin || newPin.trim().length < 4) {
      return false;
    }
    const clean = newPin.trim();
    setAdminPin(clean);
    localStorage.setItem(ADMIN_PIN_STORAGE_KEY, clean);
    return true;
  };

  // Keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A to trigger Owner Portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsEditorOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        venues,
        setVenues,
        settings,
        updateSettings,
        selectedCategory,
        setSelectedCategory,
        activeDetailVenue,
        openVenueDetails,
        closeVenueDetails,
        bookingPreselect,
        startBooking,
        clearBookingPreselect,
        isEditorOpen,
        setIsEditorOpen,
        isOwnerAuthenticated,
        loginAsOwner,
        logoutOwner,
        changeAdminPin,
        recentBooking,
        setRecentBooking,
        resetAllToDefault,
        formatPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
