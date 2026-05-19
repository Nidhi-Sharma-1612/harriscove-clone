"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { DayPicker } from "react-day-picker";
import { format, parseISO, addDays, differenceInCalendarDays } from "date-fns";
import { CalendarDays, Loader2, AlertCircle, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { CalendarDay } from "@/lib/types";

interface AvailabilityCalendarProps {
  listingId: number;
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  onRangeError?: (hasError: boolean) => void;
}

export default function AvailabilityCalendar({
  listingId,
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  onRangeError,
}: AvailabilityCalendarProps) {
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [loading, setLoading]           = useState(false);
  const [open, setOpen]                 = useState(false);
  const [popupPos, setPopupPos]         = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  // Load 12 months of calendar data
  useEffect(() => {
    const today = new Date();
    const start = today.toISOString().split("T")[0];
    const end   = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
      .toISOString().split("T")[0];

    setLoading(true);
    fetch(`/api/calendar/${listingId}?startDate=${start}&endDate=${end}`)
      .then((r) => r.json())
      .then((data) => {
        const days: CalendarDay[] = data.result ?? [];
        setBlockedDates(days.filter((d) => !d.isAvailable).map((d) => parseISO(d.date)));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [listingId]);

  // Calculate popup position from trigger element (fixed, escapes all overflow)
  const openCalendar = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const raw  = Math.max(rect.width, 660);
    const popupWidth = Math.min(raw, window.innerWidth - 24);
    // Flip left if popup would go off-screen right
    const left = rect.left + popupWidth > window.innerWidth
      ? window.innerWidth - popupWidth - 12
      : rect.left;
    setPopupPos({ top: rect.bottom + 8, left, width: popupWidth });
    setOpen(true);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      const target = e.target as Node;
      // Don't close if clicking inside the trigger
      if (triggerRef.current?.contains(target)) return;
      // Don't close if clicking inside the portal popup
      const popup = document.getElementById("availability-calendar-popup");
      if (popup?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Reposition on scroll/resize
  useEffect(() => {
    if (!open) return;
    function reposition() {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const raw  = Math.max(rect.width, 660);
      const popupWidth = Math.min(raw, window.innerWidth - 24);
      const left = rect.left + popupWidth > window.innerWidth
        ? window.innerWidth - popupWidth - 12
        : rect.left;
      setPopupPos({ top: rect.bottom + 8, left, width: popupWidth });
    }
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [open]);

  const today    = new Date();
  const fromDate = checkIn  ? parseISO(checkIn)  : undefined;
  const toDate   = checkOut ? parseISO(checkOut) : undefined;

  // Validate: all nights in range must be available
  const rangeError = useMemo(() => {
    if (!fromDate || !toDate) return null;
    const nights = differenceInCalendarDays(toDate, fromDate);
    for (let i = 0; i < nights; i++) {
      const night    = addDays(fromDate, i);
      const nightStr = format(night, "yyyy-MM-dd");
      if (blockedDates.some((d) => format(d, "yyyy-MM-dd") === nightStr)) {
        return "Some nights in this range are already booked. Please adjust your dates.";
      }
    }
    return null;
  }, [fromDate, toDate, blockedDates]);

  useEffect(() => { onRangeError?.(!!rangeError); }, [rangeError, onRangeError]);

  const nights = fromDate && toDate ? differenceInCalendarDays(toDate, fromDate) : 0;

  function handleSelect(range: { from?: Date; to?: Date } | undefined) {
    if (!range) { onCheckInChange(""); onCheckOutChange(""); return; }
    const { from, to } = range;
    // Reject clicks that land directly on a booked date
    const blockedSet = new Set(blockedDates.map((d) => format(d, "yyyy-MM-dd")));
    const fromStr = from ? format(from, "yyyy-MM-dd") : null;
    const toStr   = to   ? format(to,   "yyyy-MM-dd") : null;
    if (fromStr && blockedSet.has(fromStr)) return;
    if (toStr   && blockedSet.has(toStr))   return;
    // Require at least 1 night — if both dates land on the same day, keep only check-in
    if (from && to && fromStr === toStr) {
      onCheckInChange(fromStr!);
      onCheckOutChange("");
      return;
    }
    onCheckInChange(from ? format(from, "yyyy-MM-dd") : "");
    onCheckOutChange(to   ? format(to,   "yyyy-MM-dd") : "");
    if (from && to) setOpen(false);
  }

  function clearDates(e: React.MouseEvent) {
    e.stopPropagation();
    onCheckInChange("");
    onCheckOutChange("");
  }

  const classNames = {
    root:           "select-none font-sans",
    months:         "flex gap-6",
    month:          "space-y-3",
    month_caption:  "flex items-center justify-between px-1",
    caption_label:  "font-serif font-bold text-sm text-foreground",
    nav:            "flex items-center gap-1",
    button_previous:"w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
    button_next:    "w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
    month_grid:     "w-full border-collapse",
    weekdays:       "flex",
    weekday:        "flex-1 text-center text-xs font-semibold text-muted-foreground py-1.5",
    week:           "flex mt-0.5",
    day:            "flex-1 flex items-center justify-center",
    day_button:     "w-8 h-8 text-xs rounded-full transition-all duration-150 hover:bg-secondary/20 hover:text-foreground",
    today:          "font-bold text-secondary",
    selected:       "bg-secondary! text-primary! font-bold rounded-full!",
    range_start:    "bg-secondary! text-primary! font-bold rounded-full!",
    range_middle:   "bg-secondary/15! text-foreground! rounded-none!",
    range_end:      "bg-secondary! text-primary! font-bold rounded-full!",
    outside:        "text-muted-foreground/20",
    // past dates only — booked future dates are styled via modifiersClassNames
    disabled:       "opacity-25 cursor-not-allowed! hover:bg-transparent!",
    hidden:         "invisible",
  };

  // Booked modifier styles — applied on top of normal day_button styles
  const modifiersClassNames = {
    booked: "!bg-rose-100 !text-rose-500 !line-through !cursor-not-allowed hover:!bg-rose-100 !rounded-full",
  };

  return (
    <div className="relative">
      {/* ── Trigger fields ──────────────────────────────────── */}
      <div
        ref={triggerRef}
        className="grid grid-cols-2 gap-2 cursor-pointer"
        onClick={openCalendar}
      >
        <div className={`flex flex-col gap-1 p-3 rounded-xl border transition-all ${
          open ? "border-secondary shadow-sm bg-white" : "border-border bg-white hover:border-secondary/50"
        }`}>
          <label className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground cursor-pointer">
            <CalendarDays className="h-3 w-3 text-secondary" />
            Check In
          </label>
          <p className={`text-sm font-semibold text-left ${checkIn ? "text-foreground" : "text-muted-foreground/50"}`}>
            {checkIn ? format(parseISO(checkIn), "MMM d, yyyy") : "Select date"}
          </p>
        </div>

        <div className={`flex flex-col gap-1 p-3 rounded-xl border transition-all ${
          open ? "border-secondary shadow-sm bg-white" : "border-border bg-white hover:border-secondary/50"
        }`}>
          <label className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground cursor-pointer">
            <CalendarDays className="h-3 w-3 text-secondary" />
            Check Out
          </label>
          <p className={`text-sm font-semibold ${checkOut ? "text-foreground" : "text-muted-foreground/50"}`}>
            {checkOut ? format(parseISO(checkOut), "MMM d, yyyy") : "Select date"}
          </p>
        </div>
      </div>

      {/* Clear button */}
      {(checkIn || checkOut) && (
        <button
          type="button"
          onClick={clearDates}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors z-10"
          aria-label="Clear dates"
        >
          <X className="h-3 w-3 text-muted-foreground" />
        </button>
      )}

      {/* ── Inline feedback ─────────────────────────────────── */}
      {rangeError && (
        <div className="flex items-start gap-2 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 mt-2">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          {rangeError}
        </div>
      )}
      {nights > 0 && !rangeError && (
        <p className="text-xs text-secondary font-semibold mt-1.5">
          ✓ {nights} night{nights === 1 ? "" : "s"} selected
        </p>
      )}

      {/* ── Calendar popup — rendered via portal at body level ── */}
      {open && typeof document !== "undefined" && createPortal(
        <div
          id="availability-calendar-popup"
          className="fixed z-9999 bg-white rounded-2xl border border-border shadow-2xl p-4"
          style={{ top: popupPos.top, left: popupPos.left, minWidth: 320 }}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-8">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading availability…
            </div>
          ) : (
            <>
              {/* Header — legend (left) + action buttons (right) */}
              <div className="flex items-center justify-between mb-4 px-1">
                {/* Left: legend */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-3.5 h-3.5 rounded-full bg-secondary shrink-0" />
                    Available
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-200 shrink-0" />
                    Booked
                  </div>
                </div>
                {/* Right: Clear + Close */}
                <div className="flex items-center gap-2">
                  {(fromDate || toDate) && (
                    <button
                      type="button"
                      onClick={() => { onCheckInChange(""); onCheckOutChange(""); }}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium px-2.5 py-1.5 rounded-lg hover:bg-muted border border-border/50 transition-colors"
                    >
                      <X className="h-3 w-3" />
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
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
                modifiers={{ booked: blockedDates }}
                modifiersClassNames={modifiersClassNames}
                startMonth={today}
                numberOfMonths={popupPos.width >= 620 ? 2 : 1}
                classNames={classNames}
                components={{
                  Chevron: ({ orientation }) =>
                    orientation === "left"
                      ? <ChevronLeft className="h-4 w-4" />
                      : <ChevronRight className="h-4 w-4" />,
                }}
              />
            </>
          )}

        </div>,
        document.body
      )}
    </div>
  );
}
