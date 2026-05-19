"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";

interface GuestSelectorProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export default function GuestSelector({ value, onChange, max = 20 }: GuestSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-foreground bg-transparent outline-none"
      >
        <span>{value} {value === 1 ? "Guest" : "Guests"}</span>
        <ChevronDown className={`h-4 w-4 text-secondary transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-xl z-30 p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-foreground">Guests</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onChange(Math.max(1, value - 1))}
                disabled={value <= 1}
                className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center disabled:opacity-35 hover:border-secondary hover:bg-secondary/10 transition-all duration-200"
              >
                <Minus className="h-3.5 w-3.5 text-foreground" />
              </button>
              <span className="w-5 text-center font-bold text-foreground tabular-nums">{value}</span>
              <button
                type="button"
                onClick={() => onChange(Math.min(max, value + 1))}
                disabled={value >= max}
                className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center disabled:opacity-35 hover:border-secondary hover:bg-secondary/10 transition-all duration-200"
              >
                <Plus className="h-3.5 w-3.5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
