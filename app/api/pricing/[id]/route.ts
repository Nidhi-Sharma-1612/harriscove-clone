import { hostawayFetch } from "@/lib/hostaway";
import { NextRequest, NextResponse } from "next/server";
import type { CalendarDay } from "@/lib/types";

// Hostaway's priceDetails endpoint is not available on all plans.
// We calculate price from the calendar's per-day prices + listing cleaning fee.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { status: "fail", message: "startDate and endDate are required" },
        { status: 400 }
      );
    }

    // Fetch calendar for the requested date range
    const [calRes, listingRes] = await Promise.all([
      hostawayFetch(`/v1/listings/${id}/calendar?from=${startDate}&to=${endDate}`),
      hostawayFetch(`/v1/listings/${id}`),
    ]);

    const calData = await calRes.json();
    const listingData = await listingRes.json();

    const allDays: CalendarDay[] = calData.result ?? [];
    const listing = listingData.result ?? listingData;

    // The Hostaway calendar endpoint returns all days regardless of from/to params.
    // Filter to only the nights within the requested checkout-exclusive range.
    const days = allDays.filter(
      (d) => d.date >= startDate && d.date < endDate
    );

    if (days.length === 0) {
      return NextResponse.json(
        { status: "fail", message: "No availability data for these dates" },
        { status: 400 }
      );
    }

    // Check if all dates in the range are available
    const hasUnavailable = days.some((d) => !d.isAvailable);
    if (hasUnavailable) {
      return NextResponse.json(
        { status: "fail", message: "Some dates in this range are unavailable" },
        { status: 400 }
      );
    }

    const nights = days.length;
    const nightlyTotal = days.reduce((sum, d) => sum + (d.price ?? 0), 0);
    const nightlyRate = nights > 0 ? Math.round(nightlyTotal / nights) : 0;
    const cleaningFee = listing.cleaningFee ?? 0;
    const total = nightlyTotal + cleaningFee;
    const currency = listing.currencyCode ?? "USD";

    return NextResponse.json({
      status: "success",
      result: { nights, nightlyRate, nightlyTotal, cleaningFee, total, currency },
    });
  } catch (err) {
    return NextResponse.json({ status: "fail", message: String(err) }, { status: 500 });
  }
}
