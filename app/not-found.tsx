import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Anchor, ArrowRight, Home, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-primary flex flex-col items-center justify-center px-4 relative overflow-hidden">

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #c9963a 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-lg mx-auto">

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary/15 border border-secondary/25 mb-6">
            <Anchor className="h-9 w-9 text-secondary" />
          </div>

          {/* 404 */}
          <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-3">
            Error 404
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            Lost at<br />
            <span className="text-secondary italic">Sea.</span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-10">
            The page you&apos;re looking for has drifted off. Let&apos;s get
            you back to shore.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 btn-gold rounded-full text-sm font-bold group"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/20 text-white/80 hover:border-secondary hover:text-secondary text-sm font-semibold transition-all duration-200 group"
            >
              <Search className="h-4 w-4" />
              Browse Properties
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
