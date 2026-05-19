import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { CalendarDays, MessageCircle, ArrowRight, Home, Anchor, Copy } from "lucide-react";
import BookingProgress from "@/components/ui/BookingProgress";
import { formatDate } from "@/lib/utils";

interface ConfirmationPageProps {
  searchParams: Promise<{ code?: string; checkIn?: string; checkOut?: string }>;
}

const NEXT_STEPS = [
  {
    step: "01",
    title: "Check your email",
    description: "A full booking summary has been sent to your email address.",
  },
  {
    step: "02",
    title: "Receive your access code",
    description: "Your smart lock code will arrive 24 hours before check-in.",
  },
  {
    step: "03",
    title: "Pack & enjoy",
    description: "Everything else is ready — just bring yourself and your loved ones.",
  },
];

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const { code, checkIn, checkOut } = await searchParams;

  const nights =
    checkIn && checkOut
      ? Math.round(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
        )
      : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">

        {/* ── Hero confirmation band ──────────────────────────── */}
        <div className="bg-primary pt-24 sm:pt-32 pb-16 sm:pb-20 text-center relative overflow-hidden">
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, #c9963a 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6">
            {/* Progress */}
            <div className="flex justify-center mb-8">
              <BookingProgress currentStep={3} />
            </div>

            {/* Animated checkmark */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/15 border-2 border-secondary/40 mb-6">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-3">
              Booking Confirmed
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              You&apos;re all set!
            </h1>
            <p className="text-white/60 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
              Your reservation is confirmed. A summary has been sent to your email.
            </p>
          </div>
        </div>

        {/* ── Main content ─────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-6">

          {/* Confirmation code card */}
          {code && (
            <div className="bg-white rounded-2xl border border-border/60 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-border/40 flex items-center gap-2">
                <Anchor className="h-4 w-4 text-secondary" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Confirmation Number
                </span>
              </div>
              <div className="px-6 py-5 flex items-center justify-between gap-4">
                <p className="font-mono font-bold text-2xl sm:text-3xl text-foreground tracking-widest">
                  {code}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                  <Copy className="h-3 w-3" />
                  Save this number
                </div>
              </div>
            </div>
          )}

          {/* Stay details card */}
          {(checkIn || checkOut || nights) && (
            <div className="bg-white rounded-2xl border border-border/60 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-border/40 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-secondary" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Your Stay
                </span>
              </div>
              <div className="px-6 py-5 grid grid-cols-3 divide-x divide-border/50 text-center">
                {checkIn && (
                  <div className="pr-4">
                    <p className="text-xs text-muted-foreground mb-1">Check-in</p>
                    <p className="font-bold text-foreground text-sm sm:text-base">{formatDate(checkIn)}</p>
                  </div>
                )}
                {nights && (
                  <div className="px-4">
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <p className="font-serif font-bold text-foreground text-xl sm:text-2xl">{nights}</p>
                    <p className="text-xs text-muted-foreground">night{nights === 1 ? "" : "s"}</p>
                  </div>
                )}
                {checkOut && (
                  <div className="pl-4">
                    <p className="text-xs text-muted-foreground mb-1">Check-out</p>
                    <p className="font-bold text-foreground text-sm sm:text-base">{formatDate(checkOut)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Next steps */}
          <div className="bg-white rounded-2xl border border-border/60 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-border/40">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                What happens next
              </span>
            </div>
            <div className="divide-y divide-border/40">
              {NEXT_STEPS.map(({ step, title, description }) => (
                <div key={step} className="px-6 py-4 flex items-start gap-4">
                  <span className="font-mono text-xs font-bold text-secondary/60 pt-0.5 shrink-0">
                    {step}
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-0.5">{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all duration-200 group"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/properties"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl btn-gold font-semibold text-sm group"
            >
              Browse More Properties
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* WhatsApp strip */}
          <a
            href={`https://wa.me/14439059260?text=Hi%2C%20I%20just%20confirmed%20my%20booking!%20Reference%3A%20${code ?? ""}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-green-500/8 border border-green-500/20 hover:bg-green-500/15 hover:border-green-500/40 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <MessageCircle className="h-4 w-4 text-white fill-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Have a question?</p>
                <p className="text-xs text-muted-foreground">Chat with us on WhatsApp — we respond quickly</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-green-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </a>

        </div>
      </main>
      <Footer />
    </>
  );
}
