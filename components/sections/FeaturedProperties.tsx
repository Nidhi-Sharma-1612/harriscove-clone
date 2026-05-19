import Link from "next/link";
import PropertyCard from "@/components/property/PropertyCard";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import CountUpStat from "@/components/ui/CountUpStat";
import type { Listing } from "@/lib/types";
import { hostawayFetch } from "@/lib/hostaway";

interface ListingsData {
  featured: Listing[];
  total: number;
  avgRating: number;
  totalCapacity: number;
  totalBedrooms: number;
}

async function getListingsData(): Promise<ListingsData> {
  try {
    const res = await hostawayFetch("/v1/listings?limit=50&includeResources=1", {
      next: { revalidate: 300 },
    });
    if (!res.ok) return { featured: [], total: 0, avgRating: 5, totalCapacity: 0, totalBedrooms: 0 };
    const data = await res.json();
    const listings: Listing[] = data.result ?? data.results ?? [];

    // averageReviewRating is 0–10 scale; convert to 0–5 for display
    const withRating = listings.filter((l) => l.averageReviewRating);
    const avgRating =
      withRating.length > 0
        ? withRating.reduce((sum, l) => sum + l.averageReviewRating! / 2, 0) /
          withRating.length
        : 5;

    const totalCapacity = listings.reduce((sum, l) => sum + (l.personCapacity ?? 0), 0);
    const totalBedrooms = listings.reduce((sum, l) => sum + (l.bedroomsNumber ?? 0), 0);

    return { featured: listings.slice(0, 3), total: listings.length, avgRating, totalCapacity, totalBedrooms };
  } catch {
    return { featured: [], total: 0, avgRating: 5, totalCapacity: 0, totalBedrooms: 0 };
  }
}

export default async function FeaturedProperties() {
  const { featured, total, avgRating, totalCapacity, totalBedrooms } = await getListingsData();
  if (featured.length === 0) return null;

  const stats = [
    { target: total,         suffix: "",  label: "Waterfront Properties",    decimals: 0 },
    { target: avgRating,     suffix: "★", label: "Average Guest Rating",     decimals: 1 },
    { target: totalCapacity, suffix: "",  label: "Guests We Can Host",       decimals: 0 },
    { target: totalBedrooms, suffix: "",  label: "Bedrooms Across Portfolio", decimals: 0 },
  ];

  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-muted/60 to-transparent pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Stat strip — animated count-up */}
        <AnimateOnScroll className="mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pb-8 border-b border-border/60">
            {stats.map((stat) => (
              <CountUpStat
                key={stat.label}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                decimals={stat.decimals}
                duration={2}
              />
            ))}
          </div>
        </AnimateOnScroll>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div>
            <AnimateOnScroll>
              <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-3">
                Our Properties
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Featured
                <span className="text-secondary italic"> Retreats</span>
              </h2>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((listing, i) => (
            <PropertyCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>

        {/* CTA */}
        <AnimateOnScroll delay={0.2} className="text-center mt-10 sm:mt-14">
          <Link
            href="/properties"
            className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 btn-outline-gold rounded-full text-sm relative overflow-hidden"
          >
            <span className="relative z-10">Explore All Properties</span>
            <span className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-secondary/20 flex items-center justify-center text-xs">
              →
            </span>
          </Link>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
