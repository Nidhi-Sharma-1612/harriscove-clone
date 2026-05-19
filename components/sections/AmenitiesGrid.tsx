import {
  Wifi, Waves, ChefHat, Car, Tv, Wind, Flame,
  ShowerHead, Bath, Shirt, Dog, Briefcase, Dumbbell, Coffee, CircleCheck,
} from "lucide-react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Link from "next/link";
import type { Listing } from "@/lib/types";
import type { ComponentType } from "react";
import { hostawayFetch } from "@/lib/hostaway";

// ── Editorial map: substring key → icon + marketing label + description ──────
// Keys are lowercase substrings matched against API amenity names.
// Order matters — more specific keys should come before generic ones.
const EDITORIAL: Record<string, {
  icon: ComponentType<{ className?: string }>;
  label: string;
  description: string;
}> = {
  waterfront:        { icon: Waves,    label: "Private Waterfront",    description: "Step off the deck onto your own dock with direct bay access, kayaks, and paddle boards included." },
  "hot tub":         { icon: Bath,     label: "Hot Tub / Jacuzzi",     description: "Unwind in the private hot tub under the stars after a long day on the water." },
  pool:              { icon: Waves,    label: "Private Pool",           description: "Cool off in your own private pool with stunning waterfront views all around." },
  kitchen:           { icon: ChefHat,  label: "Gourmet Kitchen",        description: "Fully stocked with premium appliances, cookware, and everything you need for a home-cooked meal." },
  wifi:              { icon: Wifi,     label: "High-Speed WiFi",        description: "Blazing-fast internet throughout the property — stream, work remotely, or stay connected." },
  internet:          { icon: Wifi,     label: "High-Speed WiFi",        description: "Blazing-fast internet throughout the property — stream, work remotely, or stay connected." },
  bbq:               { icon: Flame,    label: "BBQ & Outdoor Living",   description: "Alfresco dining with a premium gas grill, outdoor seating, and waterfront sunset views." },
  barbecue:          { icon: Flame,    label: "BBQ & Outdoor Living",   description: "Alfresco dining with a premium gas grill, outdoor seating, and waterfront sunset views." },
  fireplace:         { icon: Flame,    label: "Fireplace",              description: "Cozy up by the fireplace on cool evenings for a warm and intimate atmosphere." },
  parking:           { icon: Car,      label: "Free Parking",           description: "Dedicated off-street parking for all guests — no need to worry about where to leave your car." },
  "air conditioning":{ icon: Wind,     label: "Air Conditioning",       description: "Stay cool and comfortable year-round with full climate control throughout the property." },
  washer:            { icon: Shirt,    label: "Washer & Dryer",         description: "In-unit laundry so you can pack light and stay fresh for your entire stay." },
  workspace:         { icon: Briefcase,label: "Dedicated Workspace",    description: "A quiet, comfortable desk with reliable internet — perfect for remote work." },
  "pet friendly":    { icon: Dog,      label: "Pet Friendly",           description: "Bring the whole family — your furry friends are welcome to enjoy the waterfront too." },
  "pets allowed":    { icon: Dog,      label: "Pet Friendly",           description: "Bring the whole family — your furry friends are welcome to enjoy the waterfront too." },
  gym:               { icon: Dumbbell, label: "Fitness Center",         description: "Keep up with your fitness routine with access to on-site gym equipment." },
  tv:                { icon: Tv,       label: "Smart TV",               description: "Large-screen smart TV with streaming apps ready to go for your entertainment." },
  coffee:            { icon: Coffee,   label: "Coffee Station",         description: "Start your mornings right with a dedicated coffee station stocked with premium beans." },
};

// ── Icon-only map for extras row ─────────────────────────────────────────────
const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  wifi: Wifi, internet: Wifi, wireless: Wifi,
  waterfront: Waves, pool: Waves, "swimming pool": Waves,
  "hot tub": Bath, jacuzzi: Bath,
  kitchen: ChefHat,
  parking: Car, "free parking": Car,
  tv: Tv, television: Tv, "cable tv": Tv,
  "air conditioning": Wind, ac: Wind,
  bbq: Flame, barbecue: Flame, fireplace: Flame,
  washer: Shirt, dryer: Shirt,
  gym: Dumbbell, "fitness center": Dumbbell,
  coffee: Coffee, "coffee maker": Coffee,
  workspace: Briefcase,
  "pet friendly": Dog, "pets allowed": Dog,
  shower: ShowerHead,
};

function matchKey<T>(name: string, map: Record<string, T>): string | null {
  const lower = name.toLowerCase();
  for (const key of Object.keys(map)) {
    if (lower.includes(key)) return key;
  }
  return null;
}

async function getTopAmenities() {
  try {
    const res = await hostawayFetch("/v1/listings?limit=50&includeResources=1", { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    const listings: Listing[] = data.result ?? data.results ?? [];

    // Count how many listings each amenity name appears in
    const freq = new Map<string, number>();
    for (const listing of listings) {
      for (const a of listing.listingAmenities ?? []) {
        freq.set(a.amenityName, (freq.get(a.amenityName) ?? 0) + 1);
      }
    }

    // Sort amenities by frequency (most common first)
    const sorted = [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);

    // Build FEATURED: top 4 amenities that have an editorial entry
    const featured: { icon: ComponentType<{ className?: string }>; label: string; description: string }[] = [];
    const usedKeys = new Set<string>();
    for (const name of sorted) {
      if (featured.length >= 4) break;
      const key = matchKey(name, EDITORIAL);
      if (key && !usedKeys.has(key)) {
        usedKeys.add(key);
        featured.push(EDITORIAL[key]);
      }
    }

    // Build EXTRAS: next 4 most common amenities not already in featured
    const extras: { icon: ComponentType<{ className?: string }>; label: string }[] = [];
    for (const name of sorted) {
      if (extras.length >= 4) break;
      const key = matchKey(name, ICON_MAP);
      if (key && !usedKeys.has(key)) {
        usedKeys.add(key);
        extras.push({ icon: ICON_MAP[key], label: name });
      }
    }

    return { featured, extras };
  } catch {
    return null;
  }
}

// Fallback used only if the API is unreachable
const FALLBACK_FEATURED = [
  { icon: Waves,   label: "Private Waterfront",  description: "Step off the deck onto your own dock with direct bay access, kayaks, and paddle boards included." },
  { icon: ChefHat, label: "Gourmet Kitchen",      description: "Fully stocked with premium appliances, cookware, and everything you need for a home-cooked meal." },
  { icon: Wifi,    label: "High-Speed WiFi",      description: "Blazing-fast internet throughout the property — stream, work remotely, or stay connected." },
  { icon: Flame,   label: "BBQ & Outdoor Living", description: "Alfresco dining with a premium gas grill, outdoor seating, and waterfront sunset views." },
];

const FALLBACK_EXTRAS = [
  { icon: Car,       label: "Free Parking" },
  { icon: Tv,        label: "Smart TV" },
  { icon: Wind,      label: "Air Conditioning" },
  { icon: ShowerHead, label: "Premium Linens" },
];

export default async function AmenitiesGrid() {
  const result = await getTopAmenities();
  const featured = result?.featured?.length ? result.featured : FALLBACK_FEATURED;
  const extras   = result?.extras?.length   ? result.extras   : FALLBACK_EXTRAS;

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden" style={{ background: "var(--navy-gradient)" }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/10 to-transparent" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/6 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <AnimateOnScroll>
            <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-3 sm:mb-4">
              Premium Inclusions
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Everything for the
              <span className="text-secondary italic"> Perfect Stay</span>
            </h2>
          </AnimateOnScroll>
        </div>

        {/* Main content: featured amenity cards + CTA column */}
        <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">

          {/* Top 4 most common amenities with descriptions — span 2 cols */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {featured.map(({ icon: Icon, label, description }, i) => (
              <AnimateOnScroll key={label} delay={i * 0.08} direction="up">
                <div className="group flex gap-4 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-secondary/35 transition-all duration-300 h-full">
                  <div className="shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-secondary/15 border border-secondary/25 flex items-center justify-center group-hover:bg-secondary/25 group-hover:scale-110 transition-all duration-300 mt-0.5">
                    <Icon className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base mb-1.5 group-hover:text-secondary transition-colors duration-200">
                      {label}
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Right column: description + next 4 extras + CTA */}
          <AnimateOnScroll delay={0.2} direction="right" className="flex flex-col gap-5 sm:gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7 flex-1">
              <p className="text-white/65 leading-relaxed text-sm sm:text-base mb-6">
                From the moment you arrive, every detail has been thoughtfully prepared. Our properties are fully equipped so all you need to bring is yourself.
              </p>

              <div className="space-y-3 mb-7">
                {extras.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-white/60 text-sm">
                    <div className="w-6 h-6 rounded-md bg-secondary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-3.5 w-3.5 text-secondary/80" />
                    </div>
                    {label}
                  </div>
                ))}
              </div>

              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-6 py-3 btn-gold rounded-full text-sm font-bold w-full justify-center"
              >
                Browse Properties
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
