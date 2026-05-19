"use client";

import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Users, Star, ArrowRight, MapPin } from "lucide-react";
import { m } from "framer-motion";
import type { Listing } from "@/lib/types";
import { formatPrice, hqImage } from "@/lib/utils";

interface PropertyCardProps {
  listing: Listing;
  index?: number;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
}

export default function PropertyCard({
  listing,
  index = 0,
  checkIn = "",
  checkOut = "",
  guests = "",
}: PropertyCardProps) {
  // listingImages are full-res S3 URLs — no hqImage() needed.
  // thumbnailUrl is Airbnb CDN — hqImage() upgrades it from x_small to large.
  const image =
    listing.listingImages?.[0]?.url ??
    hqImage(listing.thumbnailUrl) ??
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80";

  // averageReviewRating is on a 0–10 scale; convert to 0–5 for display
  const rating = listing.averageReviewRating
    ? (listing.averageReviewRating / 2).toFixed(1)
    : null;

  const params = new URLSearchParams();
  if (checkIn) params.set("checkIn", checkIn);
  if (checkOut) params.set("checkOut", checkOut);
  if (guests) params.set("guests", guests);
  const query = params.toString();
  const href = `/properties/${listing.id}${query ? `?${query}` : ""}`;

  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
    >
      <Link
        href={href}
        className="group block bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 card-hover"
      >
        {/* Image */}
        <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
          <Image
            src={image}
            alt={listing.name}
            fill
            quality={90}
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {listing.price && (
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-primary text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md">
              From {formatPrice(listing.price)}/night
            </div>
          )}
          {rating && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-secondary text-primary text-xs font-bold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full shadow-md">
              <Star className="h-3 w-3 fill-primary" />
              {rating}
            </div>
          )}

          {/* Hover CTA */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="inline-flex items-center gap-1.5 bg-secondary text-primary text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg">
              View Details <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 pb-5 sm:pb-6">
          <h3 className="font-serif text-base sm:text-lg font-bold text-foreground group-hover:text-secondary transition-colors duration-200 line-clamp-1 mb-0.5">
            {listing.name}
          </h3>
          {listing.city && (
            <p className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground mb-3">
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-secondary/70 shrink-0" />
              {listing.city}
              {listing.state ? `, ${listing.state}` : ""}
            </p>
          )}

          <div className="h-px bg-border mb-3" />

          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            {listing.bedroomsNumber > 0 && (
              <span className="flex items-center gap-1">
                <Bed className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-secondary shrink-0" />
                {listing.bedroomsNumber}{" "}
                {listing.bedroomsNumber === 1 ? "Bed" : "Beds"}
              </span>
            )}
            {listing.bathroomsNumber > 0 && (
              <span className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-secondary shrink-0" />
                {listing.bathroomsNumber}{" "}
                {listing.bathroomsNumber === 1 ? "Bath" : "Baths"}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-secondary shrink-0" />
              {listing.personCapacity} Guests
            </span>
          </div>
        </div>
      </Link>
    </m.div>
  );
}
