import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryGrid from "@/components/property/GalleryGrid";
import type { Listing } from "@/lib/types";
import type { Metadata } from "next";
import { Images, Home } from "lucide-react";
import { hostawayFetch } from "@/lib/hostaway";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse stunning photos of our luxury waterfront properties — interiors, outdoor spaces, and breathtaking waterfront views.",
};

async function getAllListings(): Promise<Listing[]> {
  try {
    const res = await hostawayFetch("/v1/listings?limit=50&includeResources=1", {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.result ?? data.results ?? [];
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const listings = await getAllListings();

  const allImages = listings.flatMap((l) =>
    (l.listingImages ?? []).map((img) => ({
      ...img,
      propertyName: l.name,
      propertyId: l.id,
    }))
  );

  const totalPhotos = allImages.length;

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
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/6 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-3">
                  Visual Tour
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
                  Photo <span className="text-secondary italic">Gallery</span>
                </h1>
                <p className="text-white/60 max-w-xl text-sm sm:text-base leading-relaxed">
                  A look inside our handpicked waterfront properties — every space
                  designed for comfort, beauty, and unforgettable memories.
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 shrink-0">
                <div className="flex items-center gap-2.5 bg-white/8 border border-white/12 rounded-xl px-4 py-2.5">
                  <Images className="h-4 w-4 text-secondary shrink-0" />
                  <div>
                    <p className="font-bold text-white text-sm leading-none">{totalPhotos}</p>
                    <p className="text-white/45 text-xs">Photos</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white/8 border border-white/12 rounded-xl px-4 py-2.5">
                  <Home className="h-4 w-4 text-secondary shrink-0" />
                  <div>
                    <p className="font-bold text-white text-sm leading-none">{listings.length}</p>
                    <p className="text-white/45 text-xs">Properties</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Gallery ───────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <GalleryGrid images={allImages} listings={listings} />
        </div>

      </main>
      <Footer />
    </>
  );
}
