"use client";

import { useState } from "react";
import { m } from "framer-motion";
import {
  Mail,
  ArrowRight,
  CheckCircle,
  Tag,
  Compass,
  Bell,
} from "lucide-react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const PERKS = [
  { icon: Tag, text: "Early access to seasonal deals & flash discounts" },
  { icon: Compass, text: "Curated local guides and hidden gems nearby" },
  { icon: Bell, text: "First to know when new properties go live" },
];

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setEmail("");
  }

  return (
    <section
      className="py-14 sm:py-20 relative overflow-hidden"
      style={{ background: "var(--navy-gradient)" }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/40 to-transparent" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #c9963a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute -top-20 right-0 w-80 h-80 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-accent/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left: heading + perks ─────────────────────────── */}
          <div>
            <AnimateOnScroll>
              <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/25 text-secondary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                Newsletter
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                Stay in the
                <span className="text-secondary italic block">Loop</span>
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.15}>
              <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-8">
                Join our community of travelers and get insider access to deals,
                new listings, and local recommendations — straight to your
                inbox.
              </p>
            </AnimateOnScroll>

            {/* Perks */}
            <div className="space-y-4">
              {PERKS.map(({ icon: Icon, text }, i) => (
                <AnimateOnScroll
                  key={i}
                  delay={0.2 + i * 0.07}
                  direction="left"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-secondary/15 border border-secondary/25 flex items-center justify-center mt-0.5">
                      <Icon className="h-3.5 w-3.5 text-secondary" />
                    </div>
                    <p className="text-white/65 text-sm leading-relaxed">
                      {text}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* ── Right: form card ──────────────────────────────── */}
          <AnimateOnScroll delay={0.2} direction="right">
            <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm">
              {status === "success" ? (
                <m.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center text-center gap-4 py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg mb-1">
                      You&apos;re on the list!
                    </p>
                    <p className="text-white/50 text-sm">
                      We&apos;ll be in touch with something special soon.
                    </p>
                  </div>
                </m.div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                      Get exclusive offers
                    </h3>
                    <p className="text-white/50 text-sm">
                      No spam. Unsubscribe anytime.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Name field */}
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/12 text-white placeholder-white/35 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />

                    {/* Email field */}
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/35 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/8 border border-white/12 text-white placeholder-white/35 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 py-3.5 btn-gold rounded-xl text-sm font-bold disabled:opacity-60 mt-1"
                    >
                      {status === "loading" ? (
                        <span className="w-4 h-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                      ) : (
                        <>
                          {" "}
                          Subscribe Now <ArrowRight className="h-4 w-4" />{" "}
                        </>
                      )}
                    </button>
                  </form>

                  {/* Social proof */}
                  <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/8">
                    <div className="flex -space-x-2">
                      {["S", "M", "J", "A"].map((l) => (
                        <div
                          key={l}
                          className="w-7 h-7 rounded-full bg-secondary/30 border-2 border-primary flex items-center justify-center font-bold text-xs text-secondary"
                        >
                          {l}
                        </div>
                      ))}
                    </div>
                    <p className="text-white/45 text-xs">
                      Join{" "}
                      <span className="text-white/70 font-semibold">200+</span>{" "}
                      subscribers already getting the best deals
                    </p>
                  </div>
                </>
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
