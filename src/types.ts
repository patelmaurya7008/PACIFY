export type CategoryType =
  | 'All Venues'
  | 'Premium Garba'
  | 'Traditional Garba'
  | 'DJ Garba'
  | 'Couple Night'
  | 'Family Events'
  | 'Celebrity Night'
  | 'College Events'
  | 'Unlimited Pass';

export interface PassPricing {
  single: string;
  couple: string;
  vip: string;
  group: string;
}

export interface VenueEvent {
  id: string;
  venueNumber: string; // e.g. "[Venue 01]"
  name: string;
  venueName: string;
  tagline: string;
  category: CategoryType[];
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  city: string;
  fullAddress: string;
  image: string;
  galleryImages: string[];
  prices: PassPricing;
  garbaType: string;
  description: string;
  capacity: string;
  groundType: string;
  amenities: string[];
  rules: string[];
  organizer: string;
  isFeatured?: boolean;
  badge?: string; // e.g., "Trending", "Selling Fast", "VIP Exclusive"
}

export interface BookingFormValues {
  eventId: string;
  passType: 'Single Pass' | 'Couple Pass' | 'VIP Pass' | 'Group Pass';
  quantity: number;
  fullName: string;
  mobile: string;
  email: string;
  preferredDate: string;
  notes: string;
}

export interface SiteSettings {
  brandName: string;
  phone: string;
  email: string;
  whatsapp: string;
  instagram: string;
  usePlaceholderPrices: boolean; // toggle between generic ₹[PRICE] and custom numbers
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  event: string;
}
