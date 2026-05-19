"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/static-data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function FaqsPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Page hero */}
        <div className="bg-primary text-white pt-24 sm:pt-32 pb-12 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-3">
              FAQ
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Frequently Asked
              <span className="text-secondary italic block sm:inline sm:ml-3">
                Questions
              </span>
            </h1>
            <p className="text-white/55 max-w-xl text-sm sm:text-base leading-relaxed">
              Everything you need to know about booking, check-in, amenities,
              and your stay with us.
            </p>
          </div>
        </div>

        {/* FAQ content */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
              {/* Sticky left panel */}
              <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-28 lg:self-start">
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Can&apos;t find what you&apos;re looking for? Reach out and
                  we&apos;ll get back to you within a few hours.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ask us anything
                </Link>
              </div>

              {/* All FAQ items */}
              <div className="lg:col-span-3">
                <div className="divide-y divide-border">
                  {FAQ_ITEMS.map((item, i) => {
                    const isOpen = open === i;
                    return (
                      <div key={i} className="group">
                        <button
                          onClick={() => setOpen(isOpen ? null : i)}
                          className="w-full flex items-start justify-between gap-4 py-5 sm:py-6 text-left"
                        >
                          <div className="flex items-start gap-4">
                            <span
                              className={`shrink-0 font-mono text-xs font-bold pt-0.5 transition-colors duration-200 ${
                                isOpen
                                  ? "text-secondary"
                                  : "text-muted-foreground/50 group-hover:text-secondary/60"
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
                    );
                  })}
                </div>

                {/* Mobile contact CTA */}
                <div className="mt-10 pt-8 border-t border-border lg:hidden">
                  <p className="text-muted-foreground text-sm mb-4">
                    Still have questions? We&apos;re happy to help.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Ask us anything
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
