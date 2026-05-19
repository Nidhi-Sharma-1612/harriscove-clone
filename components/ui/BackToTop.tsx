"use client";

import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-center gap-1.5 text-xs text-white/30 hover:text-secondary transition-colors group"
      aria-label="Back to top"
    >
      Back to top
      <ArrowUp className="h-3 w-3 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}
