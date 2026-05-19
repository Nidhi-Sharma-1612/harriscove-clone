// Field names match the actual Hostaway API response exactly.

export interface ListingImage {
  id: number;
  url: string;
  caption?: string | null;
  bookingEngineCaption?: string | null;
  sortOrder: number;
}

export interface ListingAmenity {
  id: number;
  amenityId: number;
  amenityName: string;
}

export interface Listing {
  id: number;
  name: string;
  description?: string;
  internalListingName?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  lat?: number;
  lng?: number;
  // Correct API field names (not bedrooms/bathrooms)
  bedroomsNumber: number;
  bathroomsNumber: number;
  personCapacity: number;
  price?: number;
  cleaningFee?: number;
  currencyCode?: string;
  checkInTimeStart?: number | null;   // 24-hour integer: 16 = 4 PM
  checkInTimeEnd?: number | null;
  checkOutTime?: number | null;       // 24-hour integer: 11 = 11 AM
  minNights?: number;
  cancellationPolicy?: string;
  houseRules?: string;
  instantBookable?: 0 | 1;
  // Correct API field names (not images/amenities)
  listingImages?: ListingImage[];
  listingAmenities?: ListingAmenity[];
  thumbnailUrl?: string;
  // averageReviewRating (0-10 scale) not starRating
  averageReviewRating?: number;
}

export interface CalendarDay {
  id?: number;
  date: string;
  isAvailable: 0 | 1;
  status?: string;
  price?: number;
  minimumStay?: number;
}

export interface Reservation {
  id: number;
  listingMapId: number;
  guestName: string;
  guestEmail?: string;
  phone?: string;
  arrivalDate: string;
  departureDate: string;
  numberOfGuests: number;
  totalPrice: number;
  currency?: string;
  status?: string;
  confirmationCode?: string;
}

export interface Review {
  id: number;
  listingMapId?: number;
  guestName?: string;
  reviewerName?: string;
  rating?: number | null;
  publicReview?: string;
  submittedAt?: string;
  departureDate?: string;
}

export interface PriceDetails {
  nights: number;
  nightlyRate: number;
  nightlyTotal: number;
  cleaningFee?: number;
  total: number;
  currency: string;
}
