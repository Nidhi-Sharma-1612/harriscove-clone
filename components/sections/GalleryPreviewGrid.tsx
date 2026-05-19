"use client";

import Image from "next/image";
import { m } from "framer-motion";

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
}

function GalleryTile({
  src,
  alt,
  caption,
  delay = 0,
  sizes = "25vw",
}: {
  src: string;
  alt: string;
  caption: string;
  delay?: number;
  sizes?: string;
}) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className="relative overflow-hidden rounded-2xl group h-full w-full cursor-pointer"
    >
      <Image
        src={src}
        alt={alt}
        fill
        quality={90}
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-linear-to-t from-primary/75 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <p className="absolute bottom-4 left-4 right-4 text-white font-serif italic text-sm sm:text-base font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        {caption}
      </p>
    </m.div>
  );
}

interface GalleryPreviewGridProps {
  photos: GalleryPhoto[];
}

export default function GalleryPreviewGrid({
  photos,
}: GalleryPreviewGridProps) {
  if (photos.length === 0) return null;

  return (
    <>
      {/* Desktop: editorial 4-col × 2-row split */}
      <div className="hidden sm:grid grid-cols-4 grid-rows-2 gap-3 h-96 md:h-112 lg:h-128">
        {/* Hero — large left, spans 2 cols × 2 rows */}
        <div className="col-span-2 row-span-2">
          <GalleryTile
            src={photos[0].src}
            alt={photos[0].alt}
            caption={photos[0].caption}
            delay={0}
            sizes="(max-width: 1024px) 50vw, 40vw"
          />
        </div>

        {/* 4 supporting tiles */}
        {photos.slice(1, 5).map((photo, i) => (
          <div key={i}>
            <GalleryTile
              src={photo.src}
              alt={photo.alt}
              caption={photo.caption}
              delay={0.08 + i * 0.07}
              sizes="25vw"
            />
          </div>
        ))}
      </div>

      {/* Mobile: 2-column clean grid */}
      <div className="grid grid-cols-2 gap-2 sm:hidden">
        {photos.map((photo, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 aspect-video" : "aspect-square"}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              quality={85}
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <p className="text-white font-serif italic text-xs">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
