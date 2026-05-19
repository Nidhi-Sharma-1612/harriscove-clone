import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyGallery from "@/components/property/PropertyGallery";
import AmenitiesList from "@/components/property/AmenitiesList";
import BookingSidebar from "@/components/property/BookingSidebar";
import DescriptionSection from "@/components/property/DescriptionSection";
import ReviewsSection from "@/components/property/ReviewsSection";
import { Bed, Bath, Users, MapPin, Star, ArrowLeft, CheckCircle, Clock, Moon, Zap } from "lucide-react";
import BookingProgress from "@/components/ui/BookingProgress";
import type { Listing } from "@/lib/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

async function getListing(id: string): Promise<Listing | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/listings/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.result ?? data;
  } catch {
    return null;
  }
}

function formatHour(hour: number | null | undefined): string {
  if (!hour) return "";
  const h = hour % 12 || 12;
  const period = hour >= 12 ? "PM" : "AM";
  return `${h}:00 ${period}`;
}

function formatCancellation(policy: string | undefined): string {
  if (!policy) return "Flexible cancellation";
  return policy.charAt(0).toUpperCase() + policy.slice(1) + " cancellation policy";
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) return { title: "Property Not Found" };
  return {
    title: listing.name,
    description: listing.description?.slice(0, 160) ?? `Book ${listing.name} — a luxury retreat.`,
    openGraph: {
      title: listing.name,
      description: listing.description?.slice(0, 160),
      images: listing.listingImages?.[0]?.url ? [listing.listingImages[0].url] : [],
    },
  };
}

export default async function PropertyDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ checkIn?: string; checkOut?: string; guests?: string }>;
}) {
  const [{ id }, { checkIn = "", checkOut = "", guests = "" }] = await Promise.all([params, searchParams]);
  const listing = await getListing(id);
  if (!listing) notFound();

  const rating = listing.averageReviewRating
    ? (listing.averageReviewRating / 2).toFixed(1)
    : null;

  const amenityNames = (listing.listingAmenities ?? []).map((a) => a.amenityName);

  // Build real stay info from API fields
  const stayInfo = [
    listing.checkInTimeStart && {
      icon: Clock,
      label: `Check-in from ${formatHour(listing.checkInTimeStart)}`,
    },
    listing.checkOutTime && {
      icon: Clock,
      label: `Check-out by ${formatHour(listing.checkOutTime)}`,
    },
    listing.minNights && {
      icon: Moon,
      label: `${listing.minNights}-night minimum stay`,
    },
    listing.instantBookable && {
      icon: Zap,
      label: "Instant booking available",
    },
    {
      icon: CheckCircle,
      label: formatCancellation(listing.cancellationPolicy),
    },
  ].filter(Boolean) as { icon: React.ComponentType<{ className?: string }>; label: string }[];

  // Parse house rules into individual items
  const houseRules = (listing.houseRules ?? "")
    .split("\n")
    .map((r) => r.trim())
    .filter((r) => r.length > 2);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">

        {/* ── Hero band ───────────────────────────────────────── */}
        <div className="bg-primary pt-20 sm:pt-24 pb-8 sm:pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <Link
                href="/properties"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs sm:text-sm transition-colors group"
              >
                <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                All Properties
              </Link>
              <BookingProgress currentStep={1} />
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
              {listing.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-sm">
              {listing.city && (
                <span className="flex items-center gap-1.5 text-white/60">
                  <MapPin className="h-4 w-4 text-secondary shrink-0" />
                  {listing.city}{listing.state ? `, ${listing.state}` : ""}
                </span>
              )}
              {rating && (
                <span className="flex items-center gap-1.5 text-white/60">
                  <Star className="h-4 w-4 fill-secondary text-secondary shrink-0" />
                  <span className="text-white font-semibold">{rating}</span>
                  <span>/ 5</span>
                </span>
              )}
              {listing.price && (
                <span className="flex items-center gap-1 ml-auto">
                  <span className="font-serif text-xl font-bold text-white">{formatPrice(listing.price, listing.currencyCode)}</span>
                  <span className="text-white/50 text-sm">/ night</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Gallery ─────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
          <PropertyGallery images={listing.listingImages ?? []} name={listing.name} />
        </div>

        {/* ── Content + Sidebar ───────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

            {/* ── Left column ──────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Stat chips */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Bed,   label: `${listing.bedroomsNumber} ${listing.bedroomsNumber === 1 ? "Bedroom" : "Bedrooms"}` },
                  { icon: Bath,  label: `${listing.bathroomsNumber} ${listing.bathroomsNumber === 1 ? "Bathroom" : "Bathrooms"}` },
                  { icon: Users, label: `Up to ${listing.personCapacity} guests` },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                    <Icon className="h-4 w-4 text-secondary shrink-0" />
                    {label}
                  </div>
                ))}
              </div>

              {/* Description with read-more */}
              {listing.description && (
                <DescriptionSection description={listing.description} />
              )}

              {/* Stay info — real API data */}
              {stayInfo.length > 0 && (
                <div className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-5">
                    Stay details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {stayInfo.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-secondary" />
                        </div>
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* House rules */}
                  {houseRules.length > 0 && (
                    <div className="mt-5 pt-5 border-t border-border/50">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        House Rules
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {houseRules.map((rule) => (
                          <span key={rule} className="text-xs bg-muted/60 text-foreground/70 px-3 py-1 rounded-full">
                            {rule}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Amenities */}
              {amenityNames.length > 0 && (
                <div className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8">
                  <AmenitiesList amenities={amenityNames} />
                </div>
              )}

              {/* Reviews — real data from API */}
              <ReviewsSection
                listingId={listing.id}
                averageRating={listing.averageReviewRating}
              />

            </div>

            {/* ── Right: sticky booking sidebar ─────────────── */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <BookingSidebar
                  listingId={listing.id}
                  price={listing.price}
                  currency={listing.currencyCode}
                  maxGuests={listing.personCapacity}
                  initialCheckIn={checkIn}
                  initialCheckOut={checkOut}
                  initialGuests={guests ? Number(guests) : undefined}
                />
              </div>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
