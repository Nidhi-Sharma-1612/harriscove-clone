# HarrisCove — Luxury Waterfront Rental Website

A guest-facing vacation rental website for HarrisCove, showcasing luxury waterfront properties on the Chesapeake Bay. Built with Next.js 16, Tailwind CSS v4, and the Hostaway API for real-time property data, availability, and bookings.

🌐 **Live site:** [https://harriscove-clone.vercel.app](https://harriscove-clone.vercel.app)

---

## Tech Stack

| Layer          | Technology                                  |
| -------------- | ------------------------------------------- |
| Framework      | Next.js 16 (App Router, ISR)                |
| Styling        | Tailwind CSS v4                             |
| Animations     | Framer Motion 12                            |
| Date picker    | react-day-picker v10                        |
| Date utilities | date-fns                                    |
| Icons          | lucide-react                                |
| Fonts          | Playfair Display + Inter (next/font/google) |
| API            | Hostaway REST API (OAuth2)                  |

---

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd harriscove-clone
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:

```env
# Hostaway API credentials (OAuth2 client credentials)
HOSTAWAY_CLIENT_ID=your_hostaway_client_id
HOSTAWAY_CLIENT_SECRET=your_hostaway_client_secret

# Full URL of your deployment (no trailing slash)
# Used for server-side fetch calls and the sitemap
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

> **Local development:** Set `NEXT_PUBLIC_BASE_URL=http://localhost:3000`

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

---

## Project Structure

```
app/
  page.tsx                  # Home page
  layout.tsx                # Root layout + fonts + LazyMotion provider
  not-found.tsx             # Custom 404 page
  providers.tsx             # Client-side providers (LazyMotion)
  globals.css               # Global styles + Tailwind theme tokens
  about/                    # About Us page
  contact/                  # Contact page
  gallery/                  # Photo gallery with pagination
  faqs/                     # Full FAQ page
  privacy-policy/           # Privacy Policy
  terms/                    # Terms & Conditions
  properties/
    page.tsx                # Property listing with filters
    [id]/page.tsx           # Property detail page
  book/
    [id]/page.tsx           # Booking form (guest details)
    [id]/confirmation/      # Booking confirmation page
  api/
    listings/               # GET all listings / GET single listing
    calendar/[id]/          # GET availability calendar
    pricing/[id]/           # GET price breakdown for date range
    reservations/           # POST create reservation
    reviews/                # GET all reviews
    reviews/[id]/           # GET reviews for a specific listing

components/
  layout/
    Navbar.tsx              # Sticky navbar with mobile menu
    Footer.tsx              # Footer with newsletter signup
  sections/                 # Home page sections (Server Components)
    HeroSection.tsx
    FeaturedProperties.tsx
    AmenitiesGrid.tsx
    GalleryPreview.tsx
    TestimonialsSection.tsx / TestimonialsCarousel.tsx
    AreaAttractions.tsx
    FaqAccordion.tsx
  property/
    PropertyCard.tsx        # Listing card used in grids
    PropertyGrid.tsx        # Filterable + sortable grid
    BookingSidebar.tsx      # Sticky booking sidebar
    AvailabilityCalendar.tsx # Date range picker with blocked dates
    PriceBreakdown.tsx      # Live price calculation
    GalleryGrid.tsx         # Full gallery with pagination + lightbox
    PropertyGallery.tsx     # Property detail photo gallery
    AmenitiesList.tsx       # Amenity icon grid
    ReviewsSection.tsx      # Guest reviews from API
  booking/
    BookingWidget.tsx       # Hero date picker + guest selector
    GuestSelector.tsx       # Guest count stepper
  ui/
    AnimateOnScroll.tsx     # Scroll-triggered animation wrapper
    CountUpStat.tsx         # Animated counter for statistics
    BookingProgress.tsx     # 3-step booking progress indicator

lib/
  hostaway.ts               # Hostaway OAuth2 client + fetch wrapper
  types.ts                  # TypeScript interfaces for API data
  utils.ts                  # cn(), formatPrice(), formatDate(), hqImage()
  static-data.ts            # FAQs, area attractions (editorial content)

public/
  videos/
    hero.mp4                # Hero section background video
    hero-fallback.mp4       # Fallback video
```

---

## Key Features

### Booking Flow

1. User selects dates in the hero `BookingWidget` → navigated to `/properties`
2. Dates + guests carry through to the property detail page via URL params
3. `BookingSidebar` pre-fills the calendar and auto-calculates the price
4. Guest fills in details on `/book/[id]` → POST to Hostaway API
5. Confirmation page shows booking code

### Calendar

- Portal-rendered (escapes `overflow-hidden` containers)
- Blocked dates shown in rose-red with strikethrough
- Range validation: all nights must be available
- Minimum 1-night stay enforced
- `maxHeight` calculated dynamically so popup never overflows the viewport

### API Integration

All Hostaway data is fetched server-side via Next.js API routes — credentials are never exposed to the browser.

| Endpoint             | Caching              |
| -------------------- | -------------------- |
| `/api/listings`      | ISR 5 minutes        |
| `/api/listings/[id]` | ISR 5 minutes        |
| `/api/calendar/[id]` | No cache (real-time) |
| `/api/pricing/[id]`  | No cache (real-time) |
| `/api/reviews`       | ISR 1 hour           |

### Performance

- **LazyMotion** — framer-motion bundle reduced from ~30KB → ~8KB gzip
- **`preload="metadata"`** on hero video — reduces LCP
- **`next/dynamic`** for below-fold heavy components (FAQ, Testimonials)
- **`next/image`** with `sizes` and `priority` props throughout
- **ISR** on all listing pages (5-minute revalidation)
