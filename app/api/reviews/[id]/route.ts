import { hostawayFetch } from "@/lib/hostaway";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Correct Hostaway endpoint: /v1/reviews?listingId={id}
    const res = await hostawayFetch(`/v1/reviews?listingId=${id}&limit=20`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ status: "fail", message: String(err) }, { status: 500 });
  }
}
