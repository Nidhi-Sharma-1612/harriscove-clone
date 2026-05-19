"use client";

import { useState } from "react";
import {
  Wifi, Waves, ChefHat, Car, Tv, Wind, Flame, ShowerHead,
  Dumbbell, Coffee, UtensilsCrossed, Snowflake, Bath,
  Shirt, Baby, Dog, Briefcase, Music, Gamepad2, CircleCheck,
} from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";

const AMENITY_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  internet: Wifi,
  wireless: Wifi,
  pool: Waves,
  "swimming pool": Waves,
  "hot tub": Bath,
  jacuzzi: Bath,
  kitchen: ChefHat,
  "full kitchen": ChefHat,
  "fully equipped kitchen": ChefHat,
  parking: Car,
  "free parking": Car,
  tv: Tv,
  television: Tv,
  "cable tv": Tv,
  "air conditioning": Wind,
  ac: Wind,
  "bbq grill": Flame,
  "barbecue grill": Flame,
  fireplace: Flame,
  washer: Shirt,
  dryer: Shirt,
  gym: Dumbbell,
  "fitness center": Dumbbell,
  "coffee maker": Coffee,
  "coffee machine": Coffee,
  "dining area": UtensilsCrossed,
  "outdoor dining": UtensilsCrossed,
  heating: Snowflake,
  "crib available": Baby,
  "pet friendly": Dog,
  "pets allowed": Dog,
  workspace: Briefcase,
  stereo: Music,
  "game console": Gamepad2,
};

function getIcon(amenity: string): React.ComponentType<{ className?: string }> {
  const key = amenity.toLowerCase();
  for (const [k, Icon] of Object.entries(AMENITY_ICON_MAP)) {
    if (key.includes(k)) return Icon;
  }
  return CircleCheck;
}

const PREVIEW_COUNT = 12;

interface AmenitiesListProps {
  amenities: string[];
}

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
  const [expanded, setExpanded] = useState(false);
  if (amenities.length === 0) return null;

  const visible = expanded ? amenities : amenities.slice(0, PREVIEW_COUNT);
  const hasMore = amenities.length > PREVIEW_COUNT;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
          What this place offers
        </h2>
        <span className="text-xs text-muted-foreground">{amenities.length} amenities</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
        {visible.map((amenity) => {
          const Icon = getIcon(amenity);
          return (
            <div key={amenity} className="flex items-center gap-3 text-sm py-1 border-b border-border/40 last:border-0">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-secondary" />
              </div>
              <span className="text-foreground/80">{amenity}</span>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-secondary transition-colors"
        >
          {expanded ? (
            <><ChevronUp className="h-4 w-4" /> Show fewer amenities</>
          ) : (
            <><ChevronDown className="h-4 w-4" /> Show all {amenities.length} amenities</>
          )}
        </button>
      )}
    </div>
  );
}
