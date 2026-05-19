"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface CountUpStatProps {
  target: number;
  suffix?: string;
  label: string;
  decimals?: number;
  duration?: number;
}

export default function CountUpStat({
  target,
  suffix = "",
  label,
  decimals = 0,
  duration = 2,
}: CountUpStatProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef    = useRef<HTMLSpanElement>(null);
  const isInView     = useInView(containerRef, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView || !numberRef.current) return;
    const el = numberRef.current;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        el.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [isInView, target, decimals, duration]);

  return (
    <div ref={containerRef} className="flex items-baseline gap-2">
      <span className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
        <span ref={numberRef}>0</span>{suffix}
      </span>
      <span className="text-muted-foreground text-xs sm:text-sm">{label}</span>
    </div>
  );
}
