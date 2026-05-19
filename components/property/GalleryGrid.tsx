"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Expand, MapPin, Images } from "lucide-react";
import type { Listing, ListingImage } from "@/lib/types";

const ITEMS_PER_PAGE = 24;

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
  { id: 2, url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", sortOrder: 1, propertyName: "Bay Cottage",        propertyId: 0 },
  { id: 3, url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", sortOrder: 2, propertyName: "Cove House",          propertyId: 0 },
  { id: 4, url: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80", sortOrder: 3, propertyName: "Dock Villa",          propertyId: 0 },
  { id: 5, url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", sortOrder: 4, propertyName: "Tidal House",         propertyId: 0 },
  { id: 6, url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80", sortOrder: 5, propertyName: "Harbor View",         propertyId: 0 },
];

// Returns page numbers with "..." for large page counts
// e.g. current=6, total=12 → [1, "...", 4, 5, 6, 7, 8, "...", 12]
function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const delta = 2;
  const pages: (number | "...")[] = [1];
  const start = Math.max(2, current - delta);
  const end   = Math.min(total - 1, current + delta);

  if (start > 2)       pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");
  pages.push(total);

  return pages;
}

export default function GalleryGrid({ images, listings }: GalleryGridProps) {
  const [filter, setFilter]       = useState<number | null>(null);
  const [currentPage, setPage]    = useState(1);
  const [lightbox, setLightbox]   = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const allImages = images.length > 0 ? images : FALLBACK;
  const filtered  = filter !== null
    ? allImages.filter((img) => img.propertyId === filter)
    : allImages;

  const totalPages  = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage    = Math.min(currentPage, totalPages);
  const startIdx    = (safePage - 1) * ITEMS_PER_PAGE;
  const visible     = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const showingFrom = startIdx + 1;
  const showingTo   = Math.min(startIdx + ITEMS_PER_PAGE, filtered.length);

  // Reset to page 1 when filter changes
  useEffect(() => { setPage(1); }, [filter]);

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    setPage(page);
    // Smooth scroll to top of gallery grid
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  // Photo count per property for filter tabs
  const countMap = allImages.reduce<Record<number, number>>((acc, img) => {
    acc[img.propertyId] = (acc[img.propertyId] ?? 0) + 1;
    return acc;
  }, {});

  // Lightbox navigates within full filtered array (not just current page)
  const prev = useCallback(() => {
    setLightbox((i) => (i === null || i === 0 ? filtered.length - 1 : i - 1));
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightbox((i) => (i === null || i === filtered.length - 1 ? 0 : i + 1));
  }, [filtered.length]);

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
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Filter by property
            </p>
            <span className="text-xs text-muted-foreground">
              {filtered.length} photo{filtered.length === 1 ? "" : "s"}
            </span>
          </div>

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

      {/* ── Grid ─────────────────────────────────────────────────── */}
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
          {/* Count bar — scroll anchor */}
          <div ref={gridRef} className="flex items-center justify-between mb-4 scroll-mt-24">
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">{showingFrom}–{showingTo}</span>
              {" "}of{" "}
              <span className="font-semibold text-foreground">{filtered.length}</span> photos
            </p>
            {totalPages > 1 && (
              <p className="text-xs text-muted-foreground">
                Page <span className="font-semibold text-foreground">{safePage}</span> of{" "}
                <span className="font-semibold text-foreground">{totalPages}</span>
              </p>
            )}
          </div>

          {/* Masonry grid */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            {visible.map((img, idx) => (
              <div
                key={`${img.id}-${idx}`}
                className="break-inside-avoid cursor-pointer group relative rounded-xl overflow-hidden bg-muted"
                onClick={() => {
                  // Open lightbox at the correct index within the full filtered array
                  setLightbox(startIdx + idx);
                }}
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
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <Expand className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <p className="text-white text-xs font-semibold truncate leading-tight">{img.propertyName}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Pagination ───────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 mt-10 sm:mt-12">

              {/* Controls row */}
              <div className="flex items-center gap-1.5">

                {/* Prev arrow */}
                <button
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Page numbers */}
                {getPageNumbers(safePage, totalPages).map((pg, i) =>
                  pg === "..." ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="w-9 h-9 flex items-center justify-center text-muted-foreground text-sm select-none"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={pg}
                      onClick={() => goToPage(pg)}
                      aria-label={`Page ${pg}`}
                      aria-current={pg === safePage ? "page" : undefined}
                      className={`w-9 h-9 rounded-xl text-sm font-semibold border transition-all duration-150 ${
                        pg === safePage
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-white text-foreground border-border hover:border-primary hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {pg}
                    </button>
                  )
                )}

                {/* Next arrow */}
                <button
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Page summary */}
              <p className="text-xs text-muted-foreground">
                {showingFrom}–{showingTo} of {filtered.length} photos
              </p>
            </div>
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
                <p className="text-white text-sm font-semibold leading-tight">{current.propertyName}</p>
                {current.caption && <p className="text-white/45 text-xs">{current.caption}</p>}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-white/40 text-xs font-mono">
                {lightbox + 1} / {filtered.length}
              </span>
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

          {/* Image */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-16 pb-4 min-h-0 relative">
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/8 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all group"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
            </button>

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

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/8 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all group"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Dot strip — only for small galleries */}
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
                    i === lightbox ? "w-5 h-1.5 bg-secondary" : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          )}

          <p className="text-center text-white/20 text-xs pb-4 shrink-0">
            ← → to navigate · Esc to close
          </p>
        </div>
      )}
    </>
  );
}
