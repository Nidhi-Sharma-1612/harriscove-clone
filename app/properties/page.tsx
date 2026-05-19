import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyGrid from "@/components/property/PropertyGrid";
import type { Listing } from "@/lib/types";
import type { Metadata } from "next";
import { Home, Star, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Properties",
  description: "Browse our collection of luxury waterfront rental properties. Filter by bedrooms, guests, and price to find your perfect retreat.",
};

async function getAllListings(): Promise<Listing[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/listings`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.result ?? data.results ?? [];
  } catch {
    return [];
  }
}

interface PropertiesPageProps {
  searchParams: Promise<{ checkIn?: string; checkOut?: string; guests?: string }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const [listings, { checkIn = "", checkOut = "", guests = "" }] = await Promise.all([
    getAllListings(),
    searchParams,
  ]);

  const withRating  = listings.filter((l) => l.averageReviewRating);
  const avgRating   = withRating.length
    ? (withRating.reduce((s, l) => s + l.averageReviewRating! / 2, 0) / withRating.length).toFixed(1)
    : null;
  const maxCapacity = listings.reduce((s, l) => s + (l.personCapacity ?? 0), 0);

  const nights =
    checkIn && checkOut
      ? Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
      : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="bg-primary text-white pt-24 sm:pt-32 pb-12 sm:pb-16 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: "radial-gradient(circle, #c9963a 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/40 to-transparent" />
          <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-3">
                  Browse &amp; Book
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
                  Our <span className="text-secondary italic">Properties</span>
                </h1>
                <p className="text-white/60 max-w-xl text-sm sm:text-base leading-relaxed">
                  Every property is handpicked for its waterfront location, comfort, and
                  character. Filter below to find your perfect retreat.
                </p>
              </div>

              {/* Stats strip */}
              <div className="flex flex-wrap gap-3 shrink-0">
                <div className="flex items-center gap-2.5 bg-white/8 border border-white/12 rounded-xl px-4 py-2.5">
                  <Home className="h-4 w-4 text-secondary shrink-0" />
                  <div>
                    <p className="font-bold text-white text-sm leading-none">{listings.length}</p>
                    <p className="text-white/45 text-xs">Properties</p>
                  </div>
                </div>
                {avgRating && (
                  <div className="flex items-center gap-2.5 bg-white/8 border border-white/12 rounded-xl px-4 py-2.5">
                    <Star className="h-4 w-4 text-secondary fill-secondary shrink-0" />
                    <div>
                      <p className="font-bold text-white text-sm leading-none">{avgRating}★</p>
                      <p className="text-white/45 text-xs">Avg Rating</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2.5 bg-white/8 border border-white/12 rounded-xl px-4 py-2.5">
                  <Users className="h-4 w-4 text-secondary shrink-0" />
                  <div>
                    <p className="font-bold text-white text-sm leading-none">{maxCapacity}</p>
                    <p className="text-white/45 text-xs">Total Guests</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Active search chip — shown when dates were passed from BookingWidget */}
            {checkIn && checkOut && nights && (
              <div className="mt-5 inline-flex items-center gap-2.5 bg-secondary/15 border border-secondary/30 rounded-full px-4 py-2 text-sm text-white/80">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0" />
                Showing availability for{" "}
                <span className="font-semibold text-white">
                  {formatDate(checkIn)} → {formatDate(checkOut)}
                </span>
                <span className="text-white/50">·</span>
                <span className="font-semibold text-white">{nights} night{nights === 1 ? "" : "s"}</span>
                {guests && (
                  <>
                    <span className="text-white/50">·</span>
                    <span className="font-semibold text-white">{guests} guest{Number(guests) === 1 ? "" : "s"}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Grid with filters ─────────────────────────────────── */}
        <PropertyGrid listings={listings} checkIn={checkIn} checkOut={checkOut} guests={guests} />

      </main>
      <Footer />
    </>
  );
}
