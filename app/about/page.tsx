import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Award,
  Users,
  Anchor,
  ArrowRight,
  Star,
  MapPin,
  CheckCircle,
} from "lucide-react";
import type { Listing } from "@/lib/types";
import type { Metadata } from "next";

async function getListingStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/listings`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const listings: Listing[] = data.result ?? data.results ?? [];
    const withRating = listings.filter((l) => l.averageReviewRating);
    const avgRating = withRating.length
      ? (
          withRating.reduce((s, l) => s + l.averageReviewRating! / 2, 0) /
          withRating.length
        ).toFixed(1)
      : "5.0";
    const totalCap = listings.reduce((s, l) => s + (l.personCapacity ?? 0), 0);
    const totalBeds = listings.reduce((s, l) => s + (l.bedroomsNumber ?? 0), 0);
    return { total: listings.length, avgRating, totalCap, totalBeds };
  } catch {
    return null;
  }
}

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about our story, our values, and our commitment to providing exceptional waterfront retreat experiences on the Chesapeake Bay.",
};

const VALUES = [
  {
    num: "01",
    icon: Heart,
    title: "Personal Hospitality",
    description:
      "Every stay is treated with the same care and attention as hosting family. We believe in the power of a genuine personal touch.",
  },
  {
    num: "02",
    icon: Award,
    title: "Uncompromising Quality",
    description:
      "From premium linens to gourmet kitchens, every detail is curated to exceed your expectations — every single time.",
  },
  {
    num: "03",
    icon: Users,
    title: "Family Heritage",
    description:
      "Our properties have been lovingly maintained across generations, carrying decades of waterfront hosting experience.",
  },
  {
    num: "04",
    icon: Anchor,
    title: "Waterfront Expertise",
    description:
      "We know the water. From kayaks to crabbing, we help you make the most of every moment on the Chesapeake Bay.",
  },
];

const PROMISES = [
  "Direct response within 2 hours — always",
  "Properties inspected before every stay",
  "Honest, transparent pricing — no hidden fees",
  "Local recommendations tailored to your group",
  "Flexible check-in coordination",
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=85";
const STORY_IMAGE =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=85";
const STORY_IMAGE2 =
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=85";

export default async function AboutPage() {
  const stats = await getListingStats();

  const STATS = [
    { value: String(stats?.total ?? "—"), label: "Waterfront Properties" },
    { value: `${stats?.avgRating ?? "5.0"}★`, label: "Average Guest Rating" },
    { value: String(stats?.totalCap ?? "—"), label: "Guests We Can Host" },
    { value: String(stats?.totalBeds ?? "—"), label: "Bedrooms Available" },
  ];
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative bg-primary text-white pt-24 sm:pt-32 pb-0 overflow-hidden">
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #c9963a 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Glow */}
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <AnimateOnScroll>
                <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-4">
                  Our Story
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.1}>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] mb-6">
                  Waterfront Hosting
                  <span className="block text-secondary italic">
                    With Heart.
                  </span>
                </h1>
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.2}>
                <p className="text-white/65 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                  For over four decades, our family has welcomed guests to some
                  of the most breathtaking waterfront locations on the
                  Chesapeake Bay. We don&apos;t just rent properties — we share
                  our home.
                </p>
              </AnimateOnScroll>

              {/* Stat chips */}
              <AnimateOnScroll delay={0.3}>
                <div className="flex flex-wrap gap-3 mt-8 mb-12 sm:mb-16">
                  {STATS.map(({ value, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2.5 bg-white/8 border border-white/12 rounded-full px-4 py-2"
                    >
                      <span className="font-serif font-bold text-secondary text-lg leading-none">
                        {value}
                      </span>
                      <span className="text-white/55 text-xs">{label}</span>
                    </div>
                  ))}
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Hero image strip — bleeds to edge */}
          <div className="relative h-56 sm:h-72 lg:h-96 mt-4 overflow-hidden">
            <Image
              src={HERO_IMAGE}
              alt="Chesapeake Bay waterfront"
              fill
              quality={85}
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/20 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-primary/40 via-transparent to-transparent" />

            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 sm:left-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3.5 flex items-center gap-3">
              <MapPin className="h-4 w-4 text-secondary shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">
                  Chesapeake Bay, Maryland
                </p>
                <p className="text-white/50 text-xs">Est. 1984</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pull quote ─────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimateOnScroll>
              <div className="w-12 h-0.5 bg-secondary mx-auto mb-8" />
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-snug italic">
                &ldquo;The best vacations are the ones where you feel completely
                at home — where the kayaks are ready, the kitchen is stocked,
                and the dock is yours at sunrise.&rdquo;
              </blockquote>
              <div className="w-12 h-0.5 bg-secondary mx-auto mt-8 mb-5" />
              <p className="text-muted-foreground text-sm font-medium">
                — The Harris Family
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── Story ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-background overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: text */}
              <div>
                <AnimateOnScroll>
                  <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-4">
                    A Legacy Built on the Water
                  </p>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.1}>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-8">
                    From One Cottage
                    <span className="text-secondary italic block">
                      to a Collection.
                    </span>
                  </h2>
                </AnimateOnScroll>

                <div className="space-y-5 text-muted-foreground text-sm sm:text-base leading-relaxed">
                  <AnimateOnScroll delay={0.15}>
                    <p>
                      What started as a single waterfront cottage in 1984 has
                      grown into a handpicked collection of properties — each
                      chosen for its exceptional location, stunning views, and
                      ability to create truly memorable experiences.
                    </p>
                  </AnimateOnScroll>
                  <AnimateOnScroll delay={0.2}>
                    <p>
                      Three generations later, the same spirit of warm
                      hospitality guides everything we do. We take care of every
                      detail — from fresh linens and stocked kitchens to kayaks
                      at the dock — so you can focus entirely on making
                      memories.
                    </p>
                  </AnimateOnScroll>
                  <AnimateOnScroll delay={0.25}>
                    <p>
                      Our guests return year after year, and many have become
                      dear friends. That relationship — built on trust,
                      transparency, and genuine care — is what drives everything
                      we do.
                    </p>
                  </AnimateOnScroll>
                </div>

                {/* Promise list */}
                <AnimateOnScroll delay={0.3}>
                  <div className="mt-8 space-y-2.5">
                    {PROMISES.map((p) => (
                      <div
                        key={p}
                        className="flex items-start gap-2.5 text-sm text-foreground/70"
                      >
                        <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        {p}
                      </div>
                    ))}
                  </div>
                </AnimateOnScroll>
              </div>

              {/* Right: stacked images */}
              <AnimateOnScroll delay={0.2} direction="right">
                <div className="relative">
                  {/* Main image */}
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3 shadow-2xl">
                    <Image
                      src={STORY_IMAGE}
                      alt="Waterfront property"
                      fill
                      quality={85}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {/* Inset second image */}
                  <div className="absolute -bottom-6 -left-6 w-44 sm:w-56 rounded-xl overflow-hidden aspect-square shadow-xl border-4 border-white">
                    <Image
                      src={STORY_IMAGE2}
                      alt="Waterfront dock"
                      fill
                      quality={80}
                      className="object-cover"
                      sizes="224px"
                    />
                  </div>
                  {/* Floating stat card */}
                  <div className="absolute -top-4 -right-4 bg-secondary text-primary rounded-2xl p-4 shadow-xl text-center min-w-24">
                    <p className="font-serif text-3xl font-bold leading-none">
                      40+
                    </p>
                    <p className="text-xs font-semibold mt-1 leading-tight">
                      Years of
                      <br />
                      Hosting
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* ── Values ─────────────────────────────────────────────── */}
        <section
          className="py-16 sm:py-24 relative overflow-hidden"
          style={{ background: "var(--navy-gradient)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/10 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/4 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12 sm:mb-16">
              <AnimateOnScroll>
                <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-3">
                  What We Stand For
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.1}>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Our <span className="text-secondary italic">Values</span>
                </h2>
              </AnimateOnScroll>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {VALUES.map(({ num, icon: Icon, title, description }, i) => (
                <AnimateOnScroll key={title} delay={i * 0.08} direction="up">
                  <div className="group h-full flex flex-col gap-5 p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-secondary/35 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl bg-secondary/15 border border-secondary/25 flex items-center justify-center group-hover:bg-secondary/25 group-hover:scale-110 transition-all duration-300">
                        <Icon className="h-5 w-5 text-secondary" />
                      </div>
                      <span className="font-mono text-3xl font-bold text-white/8 group-hover:text-white/12 transition-colors duration-300 leading-none">
                        {num}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm sm:text-base mb-2 group-hover:text-secondary transition-colors duration-200">
                        {title}
                      </h3>
                      <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Host message ───────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="bg-muted/30 rounded-3xl p-8 sm:p-12 border border-border/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Star className="h-5 w-5 text-secondary fill-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      A personal note
                    </p>
                    <p className="text-muted-foreground text-xs">
                      from the Harris family
                    </p>
                  </div>
                </div>
                <blockquote className="font-serif text-lg sm:text-xl lg:text-2xl text-foreground leading-relaxed italic mb-8">
                  &ldquo;When you stay with us, you become part of our story. We
                  have poured our hearts into these properties so that every
                  sunrise on the water, every crab feast on the dock, every
                  quiet evening with the family — feels like it was made just
                  for you. Thank you for choosing us.&rdquo;
                </blockquote>
                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 border-2 border-secondary/30 flex items-center justify-center font-serif font-bold text-secondary text-sm shrink-0">
                    H
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">
                      The Harris Family
                    </p>
                    <p className="text-muted-foreground text-xs flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Chesapeake Bay, Maryland
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
