"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format, parseISO } from "date-fns";
import GuestSelector from "./GuestSelector";

interface BookingWidgetProps {
  listingId?: number;
  compact?: boolean;
}

const CAL_CLASSNAMES = {
  root: "select-none font-sans",
  months: "flex gap-6",
  month: "space-y-3",
  month_caption: "flex items-center justify-between px-1",
  caption_label: "font-serif font-bold text-sm text-foreground",
  nav: "flex items-center gap-1",
  button_previous:
    "w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
  button_next:
    "w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
  month_grid: "w-full border-collapse",
  weekdays: "flex",
  weekday:
    "flex-1 text-center text-xs font-semibold text-muted-foreground py-1.5",
  week: "flex mt-0.5",
  day: "flex-1 flex items-center justify-center",
  day_button:
    "w-8 h-8 text-xs rounded-full transition-all duration-150 hover:bg-secondary/20 hover:text-foreground",
  today: "font-bold text-secondary",
  selected: "bg-secondary! text-primary! font-bold rounded-full!",
  range_start: "bg-secondary! text-primary! font-bold rounded-full!",
  range_middle: "bg-secondary/15! text-foreground! rounded-none!",
  range_end: "bg-secondary! text-primary! font-bold rounded-full!",
  outside: "text-muted-foreground/25",
  disabled:
    "text-muted-foreground/30 cursor-not-allowed! hover:bg-transparent!",
  hidden: "invisible",
};

export default function BookingWidget({
  listingId,
  compact = false,
}: BookingWidgetProps) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [calOpen, setCalOpen] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0, width: 0, maxHeight: 600 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const today = new Date();

  const calcPos = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const raw = Math.max(rect.width, 660);
    const w = Math.min(raw, window.innerWidth - 24);
    const left =
      rect.left + w > window.innerWidth
        ? window.innerWidth - w - 12
        : rect.left;
    const maxHeight = window.innerHeight - rect.bottom - 8 - 20;
    setPopupPos({ top: rect.bottom + 8, left, width: w, maxHeight });
  }, []);

  const openCalendar = useCallback(() => {
    calcPos();
    setCalOpen(true);
  }, [calcPos]);

  // Close on outside click
  useEffect(() => {
    if (!calOpen) return;
    function handler(e: MouseEvent) {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t)) return;
      if (document.getElementById("widget-cal-popup")?.contains(t)) return;
      setCalOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [calOpen]);

  // Reposition on scroll/resize
  useEffect(() => {
    if (!calOpen) return;
    window.addEventListener("scroll", calcPos, true);
    window.addEventListener("resize", calcPos);
    return () => {
      window.removeEventListener("scroll", calcPos, true);
      window.removeEventListener("resize", calcPos);
    };
  }, [calOpen, calcPos]);

  const fromDate = checkIn ? parseISO(checkIn) : undefined;
  const toDate = checkOut ? parseISO(checkOut) : undefined;
  const nights =
    fromDate && toDate
      ? Math.round((toDate.getTime() - fromDate.getTime()) / 86400000)
      : 0;
  const numMonths = popupPos.width >= 620 ? 2 : 1;

  function handleSelect(range: { from?: Date; to?: Date } | undefined) {
    if (!range) { setCheckIn(""); setCheckOut(""); return; }
    const { from, to } = range;
    // Require at least 1 night — if both dates land on the same day, keep only check-in
    if (from && to && format(from, "yyyy-MM-dd") === format(to, "yyyy-MM-dd")) {
      setCheckIn(format(from, "yyyy-MM-dd"));
      setCheckOut("");
      return;
    }
    setCheckIn(from ? format(from, "yyyy-MM-dd") : "");
    setCheckOut(to   ? format(to,   "yyyy-MM-dd") : "");
    if (from && to) setCalOpen(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: String(guests),
    });
    router.push(
      listingId ? `/book/${listingId}?${params}` : `/properties?${params}`,
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-visible"
    >
      {/* ── Fields row ───────────────────────────────────── */}
      <div
        className={`grid grid-cols-1 ${compact ? "" : "sm:grid-cols-[2fr_1fr]"}`}
      >
        {/* Date range trigger */}
        <div
          ref={triggerRef}
          className={`grid grid-cols-2 cursor-pointer border-b ${compact ? "" : "sm:border-b-0 sm:border-r"} border-border`}
          onClick={openCalendar}
        >
          {/* Check-in */}
          <div
            className={`px-4 sm:px-5 py-3.5 sm:py-4 border-r border-border transition-colors ${calOpen ? "bg-secondary/5" : "hover:bg-muted/5"}`}
          >
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 cursor-pointer">
              <CalendarDays className="h-3.5 w-3.5 text-secondary shrink-0" />
              Check In
            </label>
            <p
              className={`text-sm font-semibold text-left truncate ${checkIn ? "text-foreground" : "text-muted-foreground/50"}`}
            >
              {checkIn
                ? format(parseISO(checkIn), "MMM d, yyyy")
                : "Select date"}
            </p>
          </div>

          {/* Check-out */}
          <div
            className={`px-4 sm:px-5 py-3.5 sm:py-4 transition-colors ${calOpen ? "bg-secondary/5" : "hover:bg-muted/5"}`}
          >
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 cursor-pointer">
              <CalendarDays className="h-3.5 w-3.5 text-secondary shrink-0" />
              Check Out
            </label>
            <p
              className={`text-sm font-semibold text-left truncate ${checkOut ? "text-foreground" : "text-muted-foreground/50"}`}
            >
              {checkOut
                ? format(parseISO(checkOut), "MMM d, yyyy")
                : "Select date"}
            </p>
          </div>
        </div>

        {/* Guests */}
        <div className="px-4 sm:px-5 py-3.5 sm:py-4">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
            <Users className="h-3.5 w-3.5 text-secondary shrink-0" />
            Guests
          </label>
          <GuestSelector value={guests} onChange={setGuests} />
        </div>
      </div>

      {/* ── Submit ───────────────────────────────────────── */}
      <div className="px-3 py-2.5 sm:py-3 bg-muted/30 border-t border-border/50">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 btn-gold rounded-lg sm:rounded-xl text-sm font-bold"
        >
          <Search className="h-4 w-4" />
          Check Availability
        </button>
      </div>

      {/* ── Calendar popup ───────────────────────────────── */}
      {calOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id="widget-cal-popup"
            className="fixed z-9999 bg-white rounded-2xl border border-border shadow-2xl p-5"
            style={{
              top: popupPos.top,
              left: popupPos.left,
              width: popupPos.width,
              maxHeight: popupPos.maxHeight,
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4 px-1">
              {/* Left: step guide */}
              <div>
                <p className="font-serif font-bold text-foreground text-sm">
                  {!checkIn
                    ? "Select check-in"
                    : !checkOut
                    ? "Select check-out"
                    : `${nights} night${nights === 1 ? "" : "s"} selected`}
                </p>
                {nights > 0 && (
                  <p className="text-xs text-secondary font-semibold mt-0.5">
                    {format(parseISO(checkIn), "MMM d")} →{" "}
                    {format(parseISO(checkOut), "MMM d, yyyy")}
                  </p>
                )}
              </div>
              {/* Right: action buttons */}
              <div className="flex items-center gap-2">
                {(checkIn || checkOut) && (
                  <button
                    type="button"
                    onClick={() => { setCheckIn(""); setCheckOut(""); }}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium px-2.5 py-1.5 rounded-lg hover:bg-muted border border-border/50 transition-colors"
                  >
                    <X className="h-3 w-3" />
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setCalOpen(false)}
                  className="text-xs text-muted-foreground hover:text-foreground font-medium px-2.5 py-1.5 rounded-lg hover:bg-muted border border-border/50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={{ from: fromDate, to: toDate }}
              onSelect={handleSelect}
              disabled={[{ before: today }]}
              startMonth={today}
              numberOfMonths={numMonths}
              classNames={CAL_CLASSNAMES}
              components={{
                Chevron: ({ orientation }) =>
                  orientation === "left" ? (
                    <ChevronLeft className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  ),
              }}
            />

          </div>,
          document.body,
        )}
    </form>
  );
}
