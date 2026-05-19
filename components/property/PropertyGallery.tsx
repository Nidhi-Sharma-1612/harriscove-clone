"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand, Images } from "lucide-react";
import type { ListingImage } from "@/lib/types";

interface PropertyGalleryProps {
  images: ListingImage[];
  name: string;
}

export default function PropertyGallery({ images, name }: PropertyGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const fallback = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=90";
  // listingImages are already full-res S3 URLs — no transformation needed
  const safeImages = images.length > 0 ? images : [{ id: 0, url: fallback, sortOrder: 0 }];

  function prev() {
    setLightboxIndex((i) => (i === null || i === 0 ? safeImages.length - 1 : i - 1));
  }
  function next() {
    setLightboxIndex((i) => (i === null || i === safeImages.length - 1 ? 0 : i + 1));
  }

  return (
    <>
      {/* Grid */}
      <div className="relative">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-72 sm:h-96 lg:h-125 rounded-xl overflow-hidden">
        {/* Main large image */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer group"
          onClick={() => setLightboxIndex(0)}
        >
          <Image
            src={safeImages[0].url}
            alt={safeImages[0].caption ?? name}
            fill
            quality={95}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Side thumbnails */}
        {safeImages.slice(1, 5).map((img, idx) => (
          <div
            key={img.id}
            className="relative cursor-pointer group overflow-hidden"
            onClick={() => setLightboxIndex(idx + 1)}
          >
            <Image
              src={img.url}
              alt={img.caption ?? `${name} photo ${idx + 2}`}
              fill
              quality={85}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
            {idx === 3 && safeImages.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2">
                <Expand className="h-5 w-5 text-white" />
                <span className="text-white font-semibold text-sm">+{safeImages.length - 5} more</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show all photos button */}
      {safeImages.length > 5 && (
        <button
          onClick={() => setLightboxIndex(0)}
          className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white text-primary text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-full shadow-lg transition-all duration-200 border border-white/80"
        >
          <Images className="h-4 w-4" />
          Show all {safeImages.length} photos
        </button>
      )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 text-white/70 hover:text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <div
            className="relative w-full max-w-5xl aspect-video mx-14 sm:mx-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={safeImages[lightboxIndex].url}
              alt={safeImages[lightboxIndex].caption ?? name}
              fill
              quality={95}
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 text-white/70 hover:text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          <span className="absolute bottom-4 text-white/50 text-sm">
            {lightboxIndex + 1} / {safeImages.length}
          </span>
        </div>
      )}
    </>
  );
}
