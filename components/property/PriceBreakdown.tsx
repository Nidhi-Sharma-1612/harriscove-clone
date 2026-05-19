"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface PriceBreakdownProps {
  listingId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface PriceData {
  nights?: number;
  nightlyRate?: number;
  nightlyTotal?: number;
  cleaningFee?: number;
  total?: number;
  currency?: string;
}

export default function PriceBreakdown({ listingId, checkIn, checkOut, guests }: PriceBreakdownProps) {
  const [price, setPrice] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!checkIn || !checkOut) {
      setPrice(null);
      return;
    }
    setLoading(true);
    setError("");
    fetch(
      `/api/pricing/${listingId}?startDate=${checkIn}&endDate=${checkOut}&numberOfGuests=${guests}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "fail") {
          setError(
            data.message?.includes("unavailable")
              ? "Some nights in this range are already booked. Please choose different dates."
              : "Unable to calculate price for these dates."
          );
          setPrice(null);
        } else {
          setPrice(data.result ?? data);
        }
      })
      .catch(() => setError("Unable to calculate price."))
      .finally(() => setLoading(false));
  }, [listingId, checkIn, checkOut, guests]);

  if (!checkIn || !checkOut) return null;

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-3">
        <Loader2 className="h-4 w-4 animate-spin" />
        Calculating price…
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-500 py-2">{error}</p>;
  }

  if (!price) return null;

  const currency = price.currency ?? "USD";
  const nights = price.nights ?? 0;

  return (
    <div className="border-t border-border pt-4 space-y-2 text-sm">
      {nights > 0 && price.nightlyRate && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            {formatPrice(price.nightlyRate, currency)} × {nights} night{nights > 1 ? "s" : ""}
          </span>
          <span>{formatPrice(price.nightlyRate * nights, currency)}</span>
        </div>
      )}
      {price.cleaningFee ? (
        <div className="flex justify-between">
          <span className="text-muted-foreground">Cleaning fee</span>
          <span>{formatPrice(price.cleaningFee, currency)}</span>
        </div>
      ) : null}

      {price.total ? (
        <div className="flex justify-between font-semibold text-base border-t border-border pt-2 mt-2">
          <span>Total</span>
          <span>{formatPrice(price.total, currency)}</span>
        </div>
      ) : null}
    </div>
  );
}
