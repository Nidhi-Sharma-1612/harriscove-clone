"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Mail, Phone, MessageCircle, MapPin,
  Send, Loader2, ArrowRight, Clock, CheckCircle,
  User, ChevronDown,
} from "lucide-react";

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: "Email Us",
    value: "bookings@harriscove.com",
    subtitle: "We reply within 2 hours",
    href: "mailto:bookings@harriscove.com",
    color: "bg-primary",
    hover: "hover:border-secondary/50 hover:bg-secondary/5",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "443-905-9260",
    subtitle: "Mon–Sun, 8am – 9pm EST",
    href: "tel:+14439059260",
    color: "bg-primary",
    hover: "hover:border-secondary/50 hover:bg-secondary/5",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat Directly",
    subtitle: "Fastest response guaranteed",
    href: "https://wa.me/14439059260?text=Hi%2C%20I'm%20interested%20in%20booking%20a%20stay!",
    color: "bg-green-500",
    hover: "hover:border-green-400/50 hover:bg-green-500/5",
    target: "_blank",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Chesapeake Bay, MD",
    subtitle: "Multiple waterfront properties",
    href: undefined,
    color: "bg-primary",
    hover: "hover:border-secondary/50 hover:bg-secondary/5",
  },
];

const SUBJECTS = [
  "Booking Enquiry",
  "Property Question",
  "Events & Weddings",
  "Special Requests",
  "General Question",
];

const inputClass =
  "w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-background text-foreground placeholder:text-muted-foreground/50 transition-colors";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-primary text-white pt-24 sm:pt-32 pb-14 sm:pb-20 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: "radial-gradient(circle, #c9963a 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-secondary/8 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em] mb-4">
                Get in Touch
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5">
                We&apos;d Love to
                <span className="text-secondary italic block">Hear From You.</span>
              </h1>
              <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-8">
                Have a question about a property, need help planning your stay, or just want
                to say hello? Our team responds quickly — usually within 2 hours.
              </p>

              {/* Response promise chips */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Clock,        text: "Replies within 2 hours" },
                  { icon: CheckCircle,  text: "No booking fees" },
                  { icon: MessageCircle, text: "WhatsApp available" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-3.5 py-1.5 text-xs text-white/70">
                    <Icon className="h-3 w-3 text-secondary shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Main content ─────────────────────────────────────── */}
        <section className="bg-background py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">

              {/* ── Left: contact methods ──────────────────────── */}
              <div className="md:col-span-2 space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-6">
                  Ways to Reach Us
                </h2>

                {CONTACT_METHODS.map(({ icon: Icon, label, value, subtitle, href, color, hover, target }) => {
                  const Wrapper = href ? "a" : "div";
                  return (
                    <Wrapper
                      key={label}
                      {...(href ? { href, target: target ?? "_self", rel: target ? "noopener noreferrer" : undefined } : {})}
                      className={`flex items-center gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-border ${hover} transition-all duration-200 group ${href ? "cursor-pointer" : ""}`}
                    >
                      <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                        <Icon className="h-5 w-5 text-secondary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">{label}</p>
                        <p className="text-sm font-semibold text-foreground truncate">{value}</p>
                        <p className="text-xs text-muted-foreground">{subtitle}</p>
                      </div>
                      {href && <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-secondary group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />}
                    </Wrapper>
                  );
                })}

                {/* WhatsApp CTA card */}
                <a
                  href="https://wa.me/14439059260?text=Hi%2C%20I'm%20interested%20in%20booking%20a%20stay!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-6 p-5 rounded-2xl bg-green-500 text-white group hover:bg-green-600 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <MessageCircle className="h-5 w-5 fill-white shrink-0" />
                    <span className="font-bold text-sm">Message us on WhatsApp</span>
                  </div>
                  <p className="text-green-100 text-xs leading-relaxed">
                    The fastest way to get a response. We typically reply in minutes.
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-white">
                    Start a conversation
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>

                {/* Map embed */}
                <div className="rounded-2xl overflow-hidden border border-border mt-4 aspect-video w-full shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d196281.17!2d-76.07!3d38.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c6de5af6e45b%3A0xc2524522d4885d2a!2sChesapeake%20Bay!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Chesapeake Bay location"
                  />
                </div>
              </div>

              {/* ── Right: contact form ────────────────────────── */}
              <div className="md:col-span-3">
                <div className="bg-white rounded-2xl border border-border/60 overflow-hidden shadow-sm">

                  {/* Form header */}
                  <div className="bg-primary px-6 py-5">
                    <p className="gold-shimmer text-xs font-bold uppercase tracking-widest mb-1">
                      Send a Message
                    </p>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      We&apos;ll Get Back to You Shortly
                    </h2>
                  </div>

                  {status === "success" ? (
                    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
                      <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center mb-5">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                        Message Received!
                      </h3>
                      <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
                        Thank you for reaching out. We&apos;ll get back to you within 2 hours.
                        For urgent enquiries, please WhatsApp us directly.
                      </p>
                      <a
                        href="https://wa.me/14439059260"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4 fill-white" />
                        WhatsApp for faster reply
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">

                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 pointer-events-none" />
                            <input
                              type="text"
                              required
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              className={`${inputClass} pl-10`}
                              placeholder="Jane Doe"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 pointer-events-none" />
                            <input
                              type="email"
                              required
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className={`${inputClass} pl-10`}
                              placeholder="jane@example.com"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Phone + Subject */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Phone <span className="normal-case font-normal">(optional)</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 pointer-events-none" />
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              className={`${inputClass} pl-10`}
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Subject *
                          </label>
                          <div className="relative">
                            <select
                              required
                              value={form.subject}
                              onChange={(e) => setForm({ ...form, subject: e.target.value })}
                              className={`${inputClass} appearance-none pr-10`}
                            >
                              <option value="">Select a topic</option>
                              {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          Message *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className={`${inputClass} resize-none`}
                          placeholder="Tell us about your stay, preferred dates, number of guests, and any special requests…"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full flex items-center justify-center gap-2.5 py-4 btn-gold rounded-xl font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {status === "loading" ? (
                          <><Loader2 className="h-4 w-4 animate-spin" /> Sending your message…</>
                        ) : (
                          <><Send className="h-4 w-4" /> Send Message</>
                        )}
                      </button>

                      <p className="text-xs text-muted-foreground text-center">
                        We respond to all messages within 2 hours during operating hours.
                      </p>
                    </form>
                  )}
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
