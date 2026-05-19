"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Expand, MapPin, Images, Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 24;
import type { Listing, ListingImage } from "@/lib/types";

interface GalleryImage extends ListingImage {
  propertyName: string;
  propertyId: number;
}

interface GalleryGridProps {
  images: GalleryImage[];
  listings: Listing[];
}

const FALLBACK: GalleryImage[] = [
  { id: 1, url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80", sortOrder: 0, propertyName: "Waterfront Retreat", propertyId: 0 },
  { id: 2, url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", sortOrder: 1, propertyName: "Bay Cottage", propertyId: 0 },
  { id: 3, url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", sortOrder: 2, propertyName: "Cove House", propertyId: 0 },
  { id: 4, url: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80", sortOrder: 3, propertyName: "Dock Villa", propertyId: 0 },
  { id: 5, url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", sortOrder: 4, propertyName: "Tidal House", propertyId: 0 },
  { id: 6, url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80", sortOrder: 5, propertyName: "Harbor View", propertyId: 0 },
];

export default function GalleryGrid({ images, listings }: GalleryGridProps) {
  const [filter, setFilter]         = useState<number | null>(null);
  const [lightbox, setLightbox]     = useState<number | null>(null);
  const [visibleCount, setVisible]  = useState(ITEMS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);

  const allImages = images.length > 0 ? images : FALLBACK;
  const filtered  = filter !== null
    ? allImages.filter((img) => img.propertyId === filter)
    : allImages;

  // Reset pagination when filter changes
  useEffect(() => { setVisible(ITEMS_PER_PAGE); }, [filter]);

  const visible    = filtered.slice(0, visibleCount);
  const hasMore    = visibleCount < filtered.length;
  const remaining  = filtered.length - visibleCount;

  function loadMore() {
    setLoadingMore(true);
    // Small delay so the spinner is visible — feels intentional, not instant
    setTimeout(() => {
      setVisible((v) => v + ITEMS_PER_PAGE);
      setLoadingMore(false);
    }, 400);
  }

  // Photo count per property for filter tabs
  const countMap = allImages.reduce<Record<number, number>>((acc, img) => {
    acc[img.propertyId] = (acc[img.propertyId] ?? 0) + 1;
    return acc;
  }, {});

  const prev = useCallback(() => {
    setLightbox((i) => (i === null || i === 0 ? filtered.length - 1 : i - 1));
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightbox((i) => (i === null || i === filtered.length - 1 ? 0 : i + 1));
  }, [filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     setLightbox(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const current = lightbox !== null ? filtered[lightbox] : null;

  return (
    <>
      {/* ── Filter tabs ─────────────────────────────────────────── */}
      {listings.length > 0 && (
        <div className="mb-8 sm:mb-10">
          {/* Section label */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Filter by property
            </p>
            <span className="text-xs text-muted-foreground">
              {filtered.length} photo{filtered.length === 1 ? "" : "s"}
            </span>
          </div>

          {/* Scrollable pill row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setFilter(null)}
              aria-pressed={filter === null}
              aria-label={`Show all photos (${allImages.length})`}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-150 ${
                filter === null
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <Images className="h-3.5 w-3.5" />
              All Photos
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-0.5 ${
                filter === null ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
              }`}>
                {allImages.length}
              </span>
            </button>

            {listings.map((l) => {
              const count = countMap[l.id] ?? 0;
              if (!count) return null;
              const active = filter === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setFilter(active ? null : l.id)}
                  aria-pressed={active}
                  aria-label={`Filter by ${l.name} (${count} photos)`}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-150 ${
                    active
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <MapPin className="h-3 w-3" />
                  <span className="truncate max-w-32">{l.name}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-0.5 ${
                    active ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Masonry grid ─────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <Images className="h-6 w-6 text-muted-foreground/50" />
          </div>
          <p className="font-semibold text-foreground mb-1">No photos yet</p>
          <p className="text-sm text-muted-foreground">No images available for this property.</p>
        </div>
      ) : (
        <>
          {/* Count bar */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{visible.length}</span> of{" "}
              <span className="font-semibold text-foreground">{filtered.length}</span> photos
            </p>
          </div>

          {/* Masonry grid */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            {visible.map((img, idx) => (
              <div
                key={`${img.id}-${idx}`}
                className="break-inside-avoid cursor-pointer group relative rounded-xl overflow-hidden bg-muted"
                onClick={() => setLightbox(idx)}
              >
                <Image
                  src={img.url}
                  alt={img.caption ?? img.propertyName}
                  width={800}
                  height={600}
                  quality={85}
                  priority={idx < 8}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Expand icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <Expand className="h-3.5 w-3.5 text-white" />
                </div>

                {/* Property label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <p className="text-white text-xs font-semibold truncate leading-tight">{img.propertyName}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex flex-col items-center gap-3 mt-10 sm:mt-12">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {loadingMore ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Loading…</>
                ) : (
                  <><Images className="h-4 w-4" /> Load {Math.min(remaining, ITEMS_PER_PAGE)} more photos</>
                )}
              </button>
              <p className="text-xs text-muted-foreground">
                {remaining} photo{remaining === 1 ? "" : "s"} remaining
              </p>
            </div>
          )}

          {/* All loaded state */}
          {!hasMore && filtered.length > ITEMS_PER_PAGE && (
            <p className="text-center text-xs text-muted-foreground mt-10">
              All {filtered.length} photos loaded
            </p>
          )}
        </>
      )}

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      {lightbox !== null && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${lightbox + 1} of ${filtered.length} — ${current.propertyName}`}
          className="fixed inset-0 z-50 bg-black/96 flex flex-col"
          onClick={() => setLightbox(null)}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-4 sm:px-6 py-4 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center">
                <MapPin className="h-3.5 w-3.5 text-secondary" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">
                  {current.propertyName}
                </p>
                {current.caption && (
                  <p className="text-white/45 text-xs">{current.caption}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-white/40 text-xs font-mono">
                {lightbox + 1} / {filtered.length}
              </span>
              {/* View property link */}
              {current.propertyId !== 0 && (
                <Link
                  href={`/properties/${current.propertyId}`}
                  onClick={(e) => e.stopPropagation()}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary/80 border border-secondary/30 hover:border-secondary/60 rounded-full px-3 py-1.5 transition-all"
                >
                  View Property
                  <ChevronRight className="h-3 w-3" />
                </Link>
              )}
              <button
                onClick={() => setLightbox(null)}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 border border-white/15 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* Image area */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-16 pb-4 min-h-0 relative">
            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/8 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all group"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
            </button>

            {/* Image */}
            <div
              className="relative w-full h-full max-h-[75vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.url}
                alt={current.caption ?? current.propertyName}
                fill
                quality={95}
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/8 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all group"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Dot strip */}
          {filtered.length <= 30 && (
            <div
              className="flex items-center justify-center gap-1.5 py-4 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === lightbox
                      ? "w-5 h-1.5 bg-secondary"
                      : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Keyboard hint */}
          <p className="text-center text-white/20 text-xs pb-4 shrink-0">
            ← → to navigate · Esc to close
          </p>
        </div>
      )}
    </>
  );
}
