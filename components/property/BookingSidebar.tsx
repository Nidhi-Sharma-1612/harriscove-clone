"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, CalendarDays, ArrowRight, Shield } from "lucide-react";
import AvailabilityCalendar from "./AvailabilityCalendar";
import PriceBreakdown from "./PriceBreakdown";
import GuestSelector from "@/components/booking/GuestSelector";
import { formatPrice } from "@/lib/utils";

interface BookingSidebarProps {
  listingId: number;
  price?: number;
  currency?: string;
  maxGuests: number;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export default function BookingSidebar({ listingId, price, currency = "USD", maxGuests, initialCheckIn = "", initialCheckOut = "", initialGuests }: BookingSidebarProps) {
  const router = useRouter();
  const [checkIn, setCheckIn]       = useState(initialCheckIn);
  const [checkOut, setCheckOut]     = useState(initialCheckOut);
  const [guests, setGuests]         = useState(initialGuests ?? 2);
  const [rangeError, setRangeError] = useState(false);

  function handleBook() {
    const params = new URLSearchParams({ checkIn, checkOut, guests: String(guests) });
    router.push(`/book/${listingId}?${params}`);
  }

  const datesSelected = checkIn && checkOut;
  const canBook = datesSelected && !rangeError;

  return (
    <div className="bg-white rounded-2xl border border-border shadow-xl overflow-hidden">

      {/* Price header */}
      <div className="bg-primary px-6 py-5">
        {price ? (
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-3xl font-bold text-white">
              {formatPrice(price, currency)}
            </span>
            <span className="text-white/55 text-sm">/ night</span>
          </div>
        ) : (
          <span className="text-white/60 text-sm">Select dates to see pricing</span>
        )}
        <p className="text-white/40 text-xs mt-1">Taxes & fees calculated at checkout</p>
      </div>

      <div className="p-5 sm:p-6 space-y-5">

        {/* Dates */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 text-secondary" />
            Select Dates
          </label>
          <AvailabilityCalendar
            listingId={listingId}
            checkIn={checkIn}
            checkOut={checkOut}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
            onRangeError={setRangeError}
          />
        </div>

        {/* Guests */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-secondary" />
            Guests
          </label>
          <GuestSelector value={guests} onChange={setGuests} max={maxGuests} />
        </div>

        {/* Price breakdown (only when dates selected) */}
        {datesSelected && (
          <div className="rounded-xl bg-muted/40 p-4">
            <PriceBreakdown
              listingId={listingId}
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
            />
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleBook}
          disabled={!canBook}
          className="w-full flex items-center justify-center gap-2 py-3.5 btn-gold rounded-xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {canBook ? (
            <><span>Reserve Now</span><ArrowRight className="h-4 w-4" /></>
          ) : rangeError ? (
            "Adjust Dates to Continue"
          ) : (
            "Select Dates to Continue"
          )}
        </button>

        {/* Trust signals */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5 text-secondary shrink-0" />
          You won&apos;t be charged yet · Free cancellation available
        </div>
      </div>
    </div>
  );
}
