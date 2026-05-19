"use client";

import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Listing } from "@/lib/types";
import {
  Loader2, ArrowRight, CalendarDays, Users, MapPin,
  Shield, Lock, User, Mail, Phone, CheckCircle,
} from "lucide-react";
import BookingProgress from "@/components/ui/BookingProgress";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

const STEPS = ["Select Dates", "Your Details", "Confirmation"];

export default function BookPage({ params }: BookPageProps) {
  const { id }    = use(params);
  const searchParams = useSearchParams();
  const router    = useRouter();

  const checkIn  = searchParams.get("checkIn")  ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests   = Number(searchParams.get("guests") ?? 2);

  const nights = checkIn && checkOut
    ? Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
    : null;

  const [listing, setListing]       = useState<Listing | null>(null);
  const [form, setForm]             = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");

  useEffect(() => {
    fetch(`/api/listings/${id}`)
      .then((r) => r.json())
      .then((d) => setListing(d.result ?? d))
      .catch(() => {});
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!listing) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingMapId: listing.id,
          channelId: 2000,
          source: "website",
          arrivalDate: checkIn,
          departureDate: checkOut,
          numberOfGuests: guests,
          guestName: form.name,
          guestEmail: form.email,
          phone: form.phone,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.status === "fail") {
        setError(data.message ?? "Booking failed. Please try again.");
      } else {
        const code =
          data.result?.hostawayReservationId ??
          data.result?.id ??
          data.result?.reservationId ??
          id;
        router.push(`/book/${id}/confirmation?code=${code}&checkIn=${checkIn}&checkOut=${checkOut}`);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const thumbUrl = listing?.listingImages?.[0]?.url ?? listing?.thumbnailUrl ?? null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">

        {/* ── Hero band ───────────────────────────────────────── */}
        <div className="bg-primary pt-20 sm:pt-24 pb-10 sm:pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Progress steps */}
            <div className="mb-8">
              <BookingProgress currentStep={2} />
            </div>

            {/* Title */}
            <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-2">
              Almost there
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Complete Your Booking
            </h1>
          </div>
        </div>

        {/* ── Content ─────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

            {/* ── Left: form ───────────────────────────────────── */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">

              {/* Guest info card */}
              <div className="bg-white rounded-2xl border border-border/60 overflow-hidden">
                <div className="px-6 py-4 border-b border-border/40 flex items-center gap-2">
                  <User className="h-4 w-4 text-secondary" />
                  <h2 className="font-semibold text-sm text-foreground">Guest Information</h2>
                </div>

                <div className="p-6 space-y-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-background"
                        placeholder="Jane Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-background"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Phone Number <span className="normal-case font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-background"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancellation note */}
              <div className="flex items-start gap-3 p-4 bg-secondary/8 border border-secondary/20 rounded-xl">
                <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <p className="text-xs text-foreground/70 leading-relaxed">
                  <span className="font-semibold text-foreground">Free cancellation</span> — cancel up to 7 days before check-in for a full refund. No charge until your stay.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-start gap-2">
                  <span className="shrink-0 mt-0.5">⚠</span>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2.5 py-4 btn-gold rounded-xl font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Processing your booking…</>
                ) : (
                  <><Lock className="h-4 w-4" /> Confirm & Reserve<ArrowRight className="h-4 w-4" /></>
                )}
              </button>

              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5 text-secondary shrink-0" />
                By confirming you agree to our Terms &amp; Conditions and Cancellation Policy
              </p>
            </form>

            {/* ── Right: booking summary ────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-border/60 overflow-hidden sticky top-24">

                {/* Property thumbnail */}
                {thumbUrl && (
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <Image
                      src={thumbUrl}
                      alt={listing?.name ?? "Property"}
                      fill
                      quality={85}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="text-white font-serif font-bold text-sm sm:text-base leading-snug line-clamp-2">
                        {listing?.name}
                      </p>
                      {listing?.city && (
                        <p className="text-white/60 text-xs mt-0.5 flex items-center gap-1">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {listing.city}{listing.state ? `, ${listing.state}` : ""}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* No thumbnail fallback */}
                {!thumbUrl && (
                  <div className="bg-primary px-5 py-4">
                    <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">Your Booking</p>
                    <p className="text-white font-serif font-bold text-base leading-snug line-clamp-2">
                      {listing?.name ?? "Loading…"}
                    </p>
                    {listing?.city && (
                      <p className="text-white/50 text-xs mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {listing.city}{listing.state ? `, ${listing.state}` : ""}
                      </p>
                    )}
                  </div>
                )}

                {/* Stay details */}
                <div className="p-5 space-y-4">

                  {/* 3-column stay snapshot */}
                  {checkIn && checkOut && nights && (
                    <div className="grid grid-cols-3 divide-x divide-border/50 text-center bg-muted/30 rounded-xl py-3">
                      <div className="px-2">
                        <p className="text-xs text-muted-foreground mb-0.5">Check-in</p>
                        <p className="font-bold text-xs sm:text-sm text-foreground">{formatDate(checkIn)}</p>
                      </div>
                      <div className="px-2">
                        <p className="text-xs text-muted-foreground mb-0.5">Nights</p>
                        <p className="font-serif font-bold text-lg text-foreground">{nights}</p>
                      </div>
                      <div className="px-2">
                        <p className="text-xs text-muted-foreground mb-0.5">Check-out</p>
                        <p className="font-bold text-xs sm:text-sm text-foreground">{formatDate(checkOut)}</p>
                      </div>
                    </div>
                  )}

                  {/* Guests + price row */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4 text-secondary" />
                        Guests
                      </span>
                      <span className="font-semibold text-foreground">{guests}</span>
                    </div>

                    {listing?.price && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <CalendarDays className="h-4 w-4 text-secondary" />
                          Nightly rate
                        </span>
                        <span className="font-semibold text-foreground">{formatPrice(listing.price)}</span>
                      </div>
                    )}
                  </div>

                  <div className="h-px bg-border/50" />

                  <div className="bg-muted/40 rounded-xl p-3 text-xs text-muted-foreground leading-relaxed">
                    Total including all fees confirmed at checkout. You won&apos;t be charged yet.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
