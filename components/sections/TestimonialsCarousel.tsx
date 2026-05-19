"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { Review } from "@/lib/types";

interface CarouselReview {
  id: number;
  name: string;
  subtitle: string;
  rating: number; // 1–5
  text: string;
}

function normalise(r: Review): CarouselReview {
  const name = r.guestName ?? r.reviewerName ?? "Guest";
  const subtitle = r.departureDate
    ? `Stayed ${new Date(r.departureDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}`
    : "Verified Guest";
  // Hostaway rating is 0–10; convert to 1–5 stars
  const rating = Math.min(5, Math.max(1, Math.round((r.rating ?? 10) / 2)));
  return { id: r.id, name, subtitle, rating, text: r.publicReview ?? "" };
}

interface TestimonialsCarouselProps {
  reviews: Review[];
}

const PER_PAGE = 3;

export default function TestimonialsCarousel({
  reviews,
}: TestimonialsCarouselProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const items = reviews.map(normalise);
  const perPage = isMobile ? 1 : PER_PAGE;
  const totalPages = Math.ceil(items.length / perPage);

  function navigate(dir: number) {
    setDirection(dir);
    setPage((p) => (p + dir + totalPages) % totalPages);
  }

  const visible = items.slice(page * perPage, page * perPage + perPage);

  if (items.length === 0) return null;

  return (
    <section
      className="py-12 sm:py-16 relative overflow-hidden"
      style={{ background: "var(--navy-gradient)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <AnimateOnScroll>
            <div>
              <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-1.5">
                Guest Reviews
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                What Our Guests Have to Say
              </h2>
            </div>
          </AnimateOnScroll>

          {totalPages > 1 && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 hover:border-secondary hover:bg-secondary/10 flex items-center justify-center transition-all duration-200"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4 text-white/60" />
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 hover:border-secondary hover:bg-secondary/10 flex items-center justify-center transition-all duration-200"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4 text-white/60" />
              </button>
            </div>
          )}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait" custom={direction}>
          <m.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {visible.map((review) => (
              <div
                key={review.id}
                className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6 flex flex-col gap-4 hover:bg-white/10 hover:border-secondary/30 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-secondary text-secondary"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/70 text-sm leading-relaxed flex-1 line-clamp-4">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center font-serif font-bold text-sm text-secondary shrink-0">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-white truncate">
                      {review.name}
                    </p>
                    <p className="text-xs text-white/45 truncate">
                      {review.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </m.div>
        </AnimatePresence>

        {/* Dot indicators */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > page ? 1 : -1);
                  setPage(i);
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === page
                    ? "w-6 h-2 bg-secondary"
                    : "w-2 h-2 bg-white/25 hover:bg-secondary/50"
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
