import Image from "next/image";
import {
  Waves,
  UtensilsCrossed,
  TreePine,
  Landmark,
  Anchor,
  Flag,
} from "lucide-react";
import { AREA_ATTRACTIONS } from "@/lib/static-data";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves,
  UtensilsCrossed,
  TreePine,
  Landmark,
  Anchor,
  Flag,
};

// Unsplash images matched to each attraction
const ATTRACTION_IMAGES: Record<string, string> = {
  "Water Activities":
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=85",
  "Local Dining":
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",
  "Nature Trails":
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=85",
  "Historic Downtown":
    "https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?w=800&q=85",
  "Maritime Museum":
    "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=85",
  "Golf Courses":
    "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=85",
};

export default function AreaAttractions() {
  return (
    <section className="py-16 sm:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <AnimateOnScroll>
              <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-3">
                Explore
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                What&apos;s{" "}
                <span className="text-secondary italic">Nearby</span>
              </h2>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Image card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {AREA_ATTRACTIONS.map((attraction, i) => {
            const Icon = ICON_MAP[attraction.icon];
            const imgSrc = ATTRACTION_IMAGES[attraction.name];

            return (
              <AnimateOnScroll
                key={attraction.name}
                delay={i * 0.08}
                direction="up"
              >
                <div className="group relative overflow-hidden rounded-2xl aspect-4/3 cursor-default">
                  {/* Background image */}
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={attraction.name}
                      fill
                      quality={85}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-primary" />
                  )}

                  {/* Gradient overlay — stronger at bottom */}
                  <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/40 to-primary/10 group-hover:from-primary/95 transition-all duration-500" />

                  {/* Distance badge — top right */}
                  {attraction.distance && (
                    <div className="absolute top-4 right-4 bg-secondary text-primary text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                      {attraction.distance}
                    </div>
                  )}

                  {/* Content — pinned to bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 border border-secondary/40 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-secondary/30 transition-colors duration-300">
                      {Icon && <Icon className="h-5 w-5 text-secondary" />}
                    </div>

                    <h3 className="font-serif font-bold text-white text-lg sm:text-xl mb-1.5">
                      {attraction.name}
                    </h3>

                    {/* Description — hidden until hover */}
                    <p className="text-white/70 text-sm leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                      {attraction.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
