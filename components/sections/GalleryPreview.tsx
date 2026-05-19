import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import GalleryPreviewGrid, { type GalleryPhoto } from "./GalleryPreviewGrid";
import type { Listing } from "@/lib/types";

// Fallback photos shown when API returns no images
const FALLBACKS: GalleryPhoto[] = [
  { src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=90", alt: "Waterfront cottage", caption: "Golden Hour on the Bay" },
  { src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=90",  alt: "Private dock",       caption: "Private Dock Access" },
  { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=90",  alt: "Master bedroom",     caption: "Master Suite" },
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=90",  alt: "Gourmet kitchen",    caption: "Gourmet Kitchen" },
  { src: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=90",  alt: "Water activities",   caption: "Water Adventures" },
];

async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/listings`, { next: { revalidate: 300 } });
    if (!res.ok) return FALLBACKS;

    const data = await res.json();
    const listings: Listing[] = data.result ?? data.results ?? [];

    // Take the first photo from each of the first 5 listings with images.
    // This shows real variety across different properties.
    const photos: GalleryPhoto[] = listings
      .filter((l) => (l.listingImages ?? []).length > 0)
      .slice(0, 5)
      .map((l) => {
        const img = l.listingImages![0];
        return {
          src: img.url,
          alt: img.caption ?? l.name,
          caption: l.name,
        };
      });

    return photos.length >= 3 ? photos : FALLBACKS;
  } catch {
    return FALLBACKS;
  }
}

export default async function GalleryPreview() {
  const photos = await getGalleryPhotos();

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Thin gold rule — visual handshake with the dark Amenities section above */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <AnimateOnScroll>
            <div>
              <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-3">Gallery</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Our Properties,
                <span className="text-secondary italic"> Up Close</span>
              </h2>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.15} direction="left">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-secondary/80 transition-colors group"
            >
              View Full Gallery
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimateOnScroll>
        </div>

        {/* Grid — renders real API photos */}
        <GalleryPreviewGrid photos={photos} />

      </div>
    </section>
  );
}
