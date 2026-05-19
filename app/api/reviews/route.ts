import { hostawayFetch } from "@/lib/hostaway";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res  = await hostawayFetch("/v1/reviews?limit=100&sortOrder=submittedAt&sortDirection=desc");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ status: "fail", message: String(err) }, { status: 500 });
  }
}
