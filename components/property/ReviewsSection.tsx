import { Star } from "lucide-react";
import type { Review } from "@/lib/types";

async function getReviews(listingId: number): Promise<Review[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/reviews/${listingId}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const reviews: Review[] = data.result ?? [];
    // Only show reviews that have actual text content
    return reviews
      .filter((r) => r.publicReview && r.publicReview.trim().length > 10)
      .slice(0, 4);
  } catch {
    return [];
  }
}

function StarRating({ score }: { score: number }) {
  // Hostaway ratings are 0–10; convert to 0–5 stars
  const stars = Math.round((score / 10) * 5);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < stars ? "fill-secondary text-secondary" : "text-border"}`}
        />
      ))}
    </div>
  );
}

interface ReviewsSectionProps {
  listingId: number;
  averageRating?: number;
}

export default async function ReviewsSection({ listingId, averageRating }: ReviewsSectionProps) {
  const reviews = await getReviews(listingId);
  if (reviews.length === 0) return null;

  const displayRating = averageRating ? (averageRating / 2).toFixed(1) : null;

  return (
    <div className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
          Guest Reviews
        </h2>
        {displayRating && (
          <div className="flex items-center gap-1.5 bg-secondary/10 px-3 py-1 rounded-full">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span className="font-bold text-sm text-foreground">{displayRating}</span>
            <span className="text-muted-foreground text-xs">/ 5</span>
          </div>
        )}
      </div>

      {/* Review cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 rounded-xl border border-border/60 bg-background flex flex-col gap-3"
          >
            {/* Stars */}
            {review.rating && <StarRating score={review.rating} />}

            {/* Text */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
              &ldquo;{review.publicReview}&rdquo;
            </p>

            {/* Author + date */}
            <div className="flex items-center gap-2.5 mt-auto pt-3 border-t border-border/40">
              <div className="w-8 h-8 rounded-full bg-secondary/15 border border-secondary/25 flex items-center justify-center font-serif font-bold text-xs text-secondary shrink-0">
                {(review.guestName ?? review.reviewerName ?? "G").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  {review.guestName ?? review.reviewerName}
                </p>
                {review.departureDate && (
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.departureDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
