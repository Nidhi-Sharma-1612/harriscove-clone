"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, ArrowUpDown, X, Home } from "lucide-react";
import PropertyCard from "./PropertyCard";
import type { Listing } from "@/lib/types";

interface PropertyGridProps {
  listings: Listing[];
  checkIn?: string;
  checkOut?: string;
  guests?: string;
}

const BEDROOM_OPTIONS = [
  { label: "Any",  value: null },
  { label: "1+",   value: 1 },
  { label: "2+",   value: 2 },
  { label: "3+",   value: 3 },
  { label: "4+",   value: 4 },
  { label: "5+",   value: 5 },
];

const GUEST_OPTIONS = [
  { label: "Any",  value: null },
  { label: "2+",   value: 2 },
  { label: "4+",   value: 4 },
  { label: "6+",   value: 6 },
  { label: "8+",   value: 8 },
  { label: "10+",  value: 10 },
];

const SORT_OPTIONS = [
  { label: "Default",    value: "default" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
];

function PillGroup<T extends number | null>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground shrink-0 hidden sm:block">
        {label}
      </span>
      <div className="flex items-center gap-1.5 flex-wrap">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              aria-label={`${label}: ${opt.label}`}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                active
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PropertyGrid({
  listings,
  checkIn = "",
  checkOut = "",
  guests = "",
}: PropertyGridProps) {
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [maxGuests, setMaxGuests] = useState<number | null>(null);
  const [sortBy, setSortBy]       = useState<"default" | "price-asc" | "price-desc">("default");

  const hasActiveFilters = bedrooms !== null || maxGuests !== null || sortBy !== "default";

  function clearAll() {
    setBedrooms(null);
    setMaxGuests(null);
    setSortBy("default");
  }

  const filtered = useMemo(() => {
    let result = [...listings];
    if (bedrooms  !== null) result = result.filter((l) => l.bedroomsNumber  >= bedrooms);
    if (maxGuests !== null) result = result.filter((l) => l.personCapacity  >= maxGuests);
    if (sortBy === "price-asc")  result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sortBy === "price-desc") result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    return result;
  }, [listings, bedrooms, maxGuests, sortBy]);

  return (
    <div>

      {/* ── Filter bar ──────────────────────────────────────────── */}
      <div className="bg-white border-b border-border sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main filter row */}
          <div className="flex items-center gap-3 sm:gap-5 py-3 sm:py-4 overflow-x-auto scrollbar-none">

            {/* Label */}
            <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Filters</span>
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-border shrink-0 hidden sm:block" />

            {/* Bedrooms pills */}
            <div className="shrink-0">
              <PillGroup
                label="Beds"
                options={BEDROOM_OPTIONS}
                value={bedrooms}
                onChange={setBedrooms}
              />
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-border shrink-0 hidden sm:block" />

            {/* Guests pills */}
            <div className="shrink-0">
              <PillGroup
                label="Guests"
                options={GUEST_OPTIONS}
                value={maxGuests}
                onChange={setMaxGuests}
              />
            </div>

            {/* Sort + results — pushed right */}
            <div className="ml-auto flex items-center gap-3 shrink-0">

              {/* Clear all */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </button>
              )}

              {/* Sort */}
              <div className="relative flex items-center gap-1.5">
                <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  aria-label="Sort properties"
                  className="text-xs font-semibold text-foreground bg-transparent border-none outline-none cursor-pointer pr-1 appearance-none"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Divider */}
              <div className="h-5 w-px bg-border" />

              {/* Count */}
              <span
                aria-live="polite"
                aria-atomic="true"
                className="text-xs font-semibold text-muted-foreground whitespace-nowrap"
              >
                {filtered.length} {filtered.length === 1 ? "property" : "properties"}
              </span>
            </div>
          </div>

          {/* Active filter chips row */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 pb-3 flex-wrap">
              {bedrooms !== null && (
                <span className="inline-flex items-center gap-1.5 bg-primary/8 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-semibold">
                  {bedrooms}+ Bedrooms
                  <button onClick={() => setBedrooms(null)} className="hover:text-primary/60 transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {maxGuests !== null && (
                <span className="inline-flex items-center gap-1.5 bg-primary/8 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-semibold">
                  {maxGuests}+ Guests
                  <button onClick={() => setMaxGuests(null)} className="hover:text-primary/60 transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {sortBy !== "default" && (
                <span className="inline-flex items-center gap-1.5 bg-primary/8 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-semibold">
                  {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                  <button onClick={() => setSortBy("default")} className="hover:text-primary/60 transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Grid ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 sm:py-28">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5">
              <Home className="h-7 w-7 text-muted-foreground/50" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
              No properties match your filters
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
              Try adjusting your bedroom or guest count — we have{" "}
              {listings.length} properties available in total.
            </p>
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200"
            >
              <X className="h-3.5 w-3.5" />
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filtered.map((listing, i) => (
              <PropertyCard
                key={listing.id}
                listing={listing}
                index={i}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
