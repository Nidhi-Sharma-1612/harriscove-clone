"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Anchor, MessageCircle, Mail, Phone, ArrowRight } from "lucide-react";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const POLICY_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms",          label: "Terms & Conditions" },
];

const BG_IMAGE = "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=80";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "done">("idle");

  async function handleSubscribe(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setSubStatus("done");
    setEmail("");
  }

  return (
    <footer className="relative overflow-hidden text-white">

      {/* ── Full-bleed background image ─────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BG_IMAGE}
          alt="Waterfront background"
          fill
          quality={80}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/90 via-primary/93 to-primary/98" />
      </div>

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary to-transparent z-10" />

      {/* ── Newsletter + CTA band ─────────────────────────────── */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0 justify-between">

            {/* Left: CTA */}
            <div className="text-center lg:text-left">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-0.5">
                Ready to book your <span className="text-secondary italic">retreat?</span>
              </h3>
              <p className="text-white/45 text-xs sm:text-sm">Direct booking saves up to 15% vs third-party sites.</p>
            </div>

            {/* Divider (desktop only) */}
            <div className="hidden lg:block w-px h-12 bg-white/10 mx-8 shrink-0" />

            {/* Right: Newsletter */}
            <div className="w-full lg:w-auto">
              {subStatus === "done" ? (
                <p className="text-secondary font-semibold text-sm text-center lg:text-left">
                  ✓ You&apos;re on the list — talk soon!
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                  <div className="relative flex-1 lg:w-64">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/35 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email for exclusive offers"
                      required
                      className="w-full pl-10 pr-3 py-2.5 rounded-full bg-white/8 border border-white/15 text-white placeholder-white/35 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={subStatus === "loading"}
                    className="shrink-0 flex items-center justify-center gap-1.5 px-5 py-2.5 btn-gold rounded-full text-sm font-bold disabled:opacity-60"
                  >
                    {subStatus === "loading"
                      ? <span className="w-4 h-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                      : <><span>Subscribe</span><ArrowRight className="h-3.5 w-3.5" /></>
                    }
                  </button>
                </form>
              )}
              <p className="text-white/30 text-xs mt-1.5 text-center sm:text-left">No spam. Unsubscribe anytime.</p>
            </div>

          </div>
        </div>
      </div>

      {/* ── Main footer grid ─────────────────────────────────── */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Anchor className="h-5 w-5 text-secondary" />
              <span className="font-serif text-lg font-bold">
                Harris<span className="text-secondary">Cove</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Luxury waterfront retreats on the Chesapeake Bay.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: FacebookIcon, label: "Facebook" },
                { Icon: InstagramIcon, label: "Instagram" },
                { Icon: YoutubeIcon, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-7 h-7 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary/40 hover:bg-secondary/10 transition-all duration-200">
                  <Icon className="h-3 w-3" />
                </a>
              ))}
              <a href="https://wa.me/14439059260" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-7 h-7 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center text-white/40 hover:text-green-400 hover:border-green-400/40 hover:bg-green-500/10 transition-all duration-200">
                <MessageCircle className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-secondary mb-4">
              Navigate
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.filter((l) => l.href !== "/contact").map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-secondary mb-4">
              Info
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/contact", label: "Contact" },
                ...POLICY_LINKS,
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-secondary mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:bookings@harriscove.com"
                  className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors group">
                  <Mail className="h-3.5 w-3.5 text-secondary shrink-0" />
                  bookings@harriscove.com
                </a>
              </li>
              <li>
                <a href="tel:+14439059260"
                  className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors group">
                  <Phone className="h-3.5 w-3.5 text-secondary shrink-0" />
                  443-905-9260
                </a>
              </li>
              <li>
                <a href="https://wa.me/14439059260" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/50 hover:text-green-400 text-sm transition-colors group">
                  <MessageCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-white/25">
            © {new Date().getFullYear()} HarrisCove Rentals. All rights reserved.
          </span>
          <span className="text-xs text-white/25 flex items-center gap-1">
            Built with <span className="text-secondary text-xs">♥</span> for waterfront living
          </span>
        </div>
      </div>

    </footer>
  );
}
