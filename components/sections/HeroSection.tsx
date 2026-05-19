"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import BookingWidget from "@/components/booking/BookingWidget";
import { ChevronDown } from "lucide-react";

const VIDEO_SOURCES = ["/videos/hero.mp4", "/videos/hero-fallback.mp4"];

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
  },
  item: {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  },
};

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* ── Video background ───────────────────────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      >
        {VIDEO_SOURCES.map((src) => (
          <source key={src} src={src} type="video/mp4" />
        ))}
      </video>

      {/* ── Overlays ───────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/75 via-primary/45 to-[#0a2540]/60" />
      <div className="absolute inset-0 bg-linear-to-t from-primary/85 via-transparent to-primary/25" />

      {/* Decorative glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none hidden sm:block" />
      <div className="absolute bottom-1/3 left-1/5 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none hidden sm:block" />

      {/* ── Hero content ──────────────────────────────────────── */}
      <m.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center py-24 pt-32 sm:py-32 sm:pt-40"
      >
        <m.div variants={stagger.container} initial="hidden" animate="show">
          {/* Headline */}
          <m.h1
            variants={stagger.item}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-5 sm:mb-6"
          >
            Your Perfect
            <br />
            <span className="italic text-secondary">Waterfront</span> Escape
          </m.h1>

          {/* Sub-headline */}
          <m.p
            variants={stagger.item}
            className="text-white/75 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed"
          >
            Handpicked luxury properties on pristine Chesapeake Bay waterways.
            Book direct for the best rates and a truly personal stay.
          </m.p>

          {/* Booking widget */}
          <m.div variants={stagger.item} className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-1 sm:p-1.5 border border-white/20 shadow-2xl">
              <BookingWidget />
            </div>
          </m.div>

          {/* Trust chips */}
          <m.div
            variants={stagger.item}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8"
          >
            {[
              "Free Cancellation",
              "Best Price Guarantee",
              "Private Docks",
              "Instant Confirmation",
            ].map((chip) => (
              <span
                key={chip}
                className="flex items-center gap-1.5 text-white/70 text-xs font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                {chip}
              </span>
            ))}
          </m.div>
        </m.div>
      </m.div>

      {/* Scroll indicator */}
      <m.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() =>
          window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <span className="text-white/50 text-xs uppercase tracking-[0.2em]">
          Scroll
        </span>
        <ChevronDown className="h-5 w-5 text-secondary" />
      </m.div>
    </section>
  );
}
