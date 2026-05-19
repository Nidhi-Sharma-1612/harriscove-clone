"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle, ArrowRight } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/static-data";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Link from "next/link";

const PREVIEW_COUNT = 5;

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      {/* Decorative glow */}
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* ── Left: sticky heading panel ──────────────────────── */}
          <div className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start">
            <AnimateOnScroll>
              <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-3">
                FAQ
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5">
                Common
                <span className="text-secondary italic block">Questions</span>
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
                Everything you need to know about booking, check-in, and your
                stay. Can&apos;t find an answer?
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.25}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200 group"
              >
                <MessageCircle className="h-4 w-4" />
                Ask us anything
              </Link>
            </AnimateOnScroll>
          </div>

          {/* ── Right: accordion ────────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="divide-y divide-border">
              {FAQ_ITEMS.slice(0, PREVIEW_COUNT).map((item, i) => {
                const isOpen = open === i;
                return (
                  <AnimateOnScroll key={i} delay={i * 0.04}>
                    <div className="group">
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="w-full flex items-start justify-between gap-4 py-5 sm:py-6 text-left"
                      >
                        {/* Number + question */}
                        <div className="flex items-start gap-4">
                          <span
                            className={`shrink-0 font-mono text-xs font-bold pt-0.5 transition-colors duration-200 ${
                              isOpen
                                ? "text-secondary"
                                : "text-muted-foreground/40 group-hover:text-secondary/60"
                            }`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${
                              isOpen
                                ? "text-secondary"
                                : "text-foreground group-hover:text-foreground/80"
                            }`}
                          >
                            {item.question}
                          </span>
                        </div>

                        {/* Toggle icon */}
                        <div
                          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5 ${
                            isOpen
                              ? "bg-secondary text-primary"
                              : "bg-muted text-muted-foreground group-hover:bg-secondary/15 group-hover:text-secondary"
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="h-3.5 w-3.5" />
                          ) : (
                            <Plus className="h-3.5 w-3.5" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1] as [
                                number,
                                number,
                                number,
                                number,
                              ],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="pl-9 pb-5 sm:pb-6">
                              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>

            {/* View all button */}
            <div className="pt-8 mt-2">
              <Link
                href="/faqs"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border-2 border-border text-muted-foreground text-sm font-semibold hover:border-secondary hover:text-secondary transition-all duration-200 group"
              >
                View all {FAQ_ITEMS.length} questions
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
