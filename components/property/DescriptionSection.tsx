"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const PREVIEW_LINES = 5; // show roughly 5 lines before collapsing

interface DescriptionSectionProps {
  description: string;
}

export default function DescriptionSection({ description }: DescriptionSectionProps) {
  const [expanded, setExpanded] = useState(false);

  // Split on newlines to count "lines"
  const lines = description.split("\n").filter((l) => l.trim());
  const isLong = lines.length > PREVIEW_LINES;
  const preview = lines.slice(0, PREVIEW_LINES).join("\n");

  return (
    <div className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8">
      <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4">
        About this place
      </h2>

      <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm sm:text-base">
        {isLong && !expanded ? preview + "…" : description}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-secondary transition-colors"
        >
          {expanded ? (
            <><ChevronUp className="h-4 w-4" /> Show less</>
          ) : (
            <><ChevronDown className="h-4 w-4" /> Read more</>
          )}
        </button>
      )}
    </div>
  );
}
