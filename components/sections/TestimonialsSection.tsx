import TestimonialsCarousel from "./TestimonialsCarousel";
import type { Review } from "@/lib/types";

async function getReviews(): Promise<Review[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res  = await fetch(`${baseUrl}/api/reviews`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    const all: Review[] = data.result ?? [];

    return all
      .filter((r) => r.publicReview && r.publicReview.trim().length > 20 && r.rating)
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 9); // max 3 pages × 3 cards
  } catch {
    return [];
  }
}

export default async function TestimonialsSection() {
  const reviews = await getReviews();
  return <TestimonialsCarousel reviews={reviews} />;
}
