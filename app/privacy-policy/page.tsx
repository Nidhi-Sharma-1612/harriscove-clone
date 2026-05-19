import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Shield, Mail, ArrowRight, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Harris Cove Cottages — how we collect, use, and protect your personal information.",
};

const SECTIONS = [
  {
    id: "consent",
    title: "Consent",
    content: [
      "By using our website, you hereby consent to our Privacy Policy and agree to its terms.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: [
      "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.",
      "If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    intro: "We use the information we collect in various ways, including to:",
    bullets: [
      "Provide, operate, and maintain our website",
      "Improve, personalize, and expand our website",
      "Understand and analyze how you use our website",
      "Develop new products, services, features, and functionality",
      "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes",
      "Send you emails",
      "Find and prevent fraud",
    ],
  },
  {
    id: "log-files",
    title: "Log Files",
    content: [
      "Harris Cove Cottages follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.",
      "These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Web Beacons",
    content: [
      "Like any other website, Harris Cove Cottages uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.",
      "The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.",
    ],
  },
  {
    id: "ccpa",
    title: "CCPA Privacy Policy (Do Not Sell My Personal Information)",
    intro: "Under the CCPA, among other rights, California consumers have the right to:",
    bullets: [
      "Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.",
      "Request that a business delete any personal data about the consumer that a business has collected.",
      "Request that a business that sells a consumer's personal data, not sell the consumer's personal data.",
    ],
    footer: "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.",
  },
  {
    id: "gdpr",
    title: "GDPR Privacy Policy (Data Protection Rights)",
    intro: "We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:",
    rights: [
      { label: "The right to access", description: "You have the right to request copies of your personal data. We may charge you a small fee for this service." },
      { label: "The right to rectification", description: "You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete." },
      { label: "The right to erasure", description: "You have the right to request that we erase your personal data, under certain conditions." },
      { label: "The right to restrict processing", description: "You have the right to request that we restrict the processing of your personal data, under certain conditions." },
      { label: "The right to object to processing", description: "You have the right to object to our processing of your personal data, under certain conditions." },
      { label: "The right to data portability", description: "You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions." },
    ],
    footer: "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.",
  },
  {
    id: "children",
    title: "Children's Information",
    content: [
      "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.",
      "Harris Cove Cottages does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.",
    ],
  },
];

const TOC = [
  { id: "consent",             label: "Consent" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use",         label: "How We Use Your Information" },
  { id: "log-files",          label: "Log Files" },
  { id: "cookies",            label: "Cookies & Web Beacons" },
  { id: "ccpa",               label: "CCPA Privacy Policy" },
  { id: "gdpr",               label: "GDPR Privacy Policy" },
  { id: "children",           label: "Children's Information" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="bg-primary text-white pt-24 sm:pt-32 pb-14 sm:pb-20 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: "radial-gradient(circle, #c9963a 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/40 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-secondary/20 border border-secondary/30 flex items-center justify-center shrink-0">
                <Shield className="h-4 w-4 text-secondary" />
              </div>
              <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em]">
                Legal
              </p>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
              Privacy <span className="text-secondary italic">Policy</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-base max-w-xl leading-relaxed mb-6">
              This policy explains what information we collect, why we collect it,
              and how we use it — in plain language.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/40">
              <span>Effective date: January 1, 2024</span>
              <span className="w-1 h-1 rounded-full bg-white/25" />
              <span>Harris Cove Cottages</span>
              <span className="w-1 h-1 rounded-full bg-white/25" />
              <a href="mailto:bookings@harriscove.com" className="text-secondary hover:text-secondary/80 transition-colors">
                bookings@harriscove.com
              </a>
            </div>
          </div>
        </section>

        {/* ── Body ──────────────────────────────────────────────── */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-16">

              {/* ── Sidebar TOC ───────────────────────────────── */}
              <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-28">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    Contents
                  </p>
                  <nav className="space-y-1">
                    {TOC.map(({ id, label }) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors py-1 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-border group-hover:bg-secondary transition-colors shrink-0" />
                        {label}
                      </a>
                    ))}
                  </nav>

                  {/* Contact card */}
                  <div className="mt-8 p-4 rounded-2xl bg-white border border-border/60">
                    <p className="text-xs font-bold text-foreground mb-1">Questions?</p>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      Contact us about your privacy rights.
                    </p>
                    <a
                      href="mailto:bookings@harriscove.com"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary/80 transition-colors"
                    >
                      <Mail className="h-3 w-3" />
                      Email us
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </aside>

              {/* ── Main content ──────────────────────────────── */}
              <div className="lg:col-span-3 space-y-2">

                {/* Intro card */}
                <div className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8 mb-8">
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    At <span className="font-semibold text-foreground">Harris Cove Cottages</span>,
                    accessible at harriscove.com, one of our main priorities is the privacy of our
                    visitors. This Privacy Policy document contains types of information that is
                    collected and recorded by Harris Cove Cottages and how we use it.
                  </p>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mt-4">
                    This privacy policy applies only to our online activities and is valid for
                    visitors to our website with regards to the information that they shared and/or
                    collected. This policy is not applicable to any information collected offline
                    or via channels other than this website.
                  </p>
                  <div className="mt-5 pt-5 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3.5 w-3.5 text-secondary shrink-0" />
                    If you have additional questions, contact us at{" "}
                    <a href="mailto:bookings@harriscove.com" className="text-secondary hover:underline font-medium">
                      bookings@harriscove.com
                    </a>
                  </div>
                </div>

                {/* Section blocks */}
                {SECTIONS.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8 scroll-mt-28"
                  >
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4">
                      {section.title}
                    </h2>

                    {/* Intro paragraph */}
                    {"intro" in section && section.intro && (
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                        {section.intro}
                      </p>
                    )}

                    {/* Plain paragraphs */}
                    {"content" in section && section.content && (
                      <div className="space-y-3">
                        {section.content.map((para, i) => (
                          <p key={i} className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Bullet list */}
                    {"bullets" in section && section.bullets && (
                      <ul className="space-y-2.5 mb-4">
                        {section.bullets.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* GDPR rights list */}
                    {"rights" in section && section.rights && (
                      <div className="space-y-3 mb-4">
                        {section.rights.map(({ label, description }) => (
                          <div key={label} className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/40">
                            <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                            <div>
                              <span className="text-sm font-semibold text-foreground">{label} — </span>
                              <span className="text-sm text-muted-foreground">{description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer note */}
                    {"footer" in section && section.footer && (
                      <p className="text-muted-foreground text-sm leading-relaxed mt-4 pt-4 border-t border-border/40">
                        {section.footer}{" "}
                        <Link href="/contact" className="text-secondary hover:underline font-medium">
                          Contact us here.
                        </Link>
                      </p>
                    )}
                  </div>
                ))}

                {/* Bottom contact strip */}
                <div className="mt-4 p-6 sm:p-8 rounded-2xl bg-primary text-white text-center">
                  <Shield className="h-8 w-8 text-secondary mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2">
                    Questions about your privacy?
                  </h3>
                  <p className="text-white/60 text-sm mb-5">
                    We&apos;re happy to clarify anything in this policy or help you exercise your data rights.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 btn-gold rounded-full text-sm font-bold group"
                  >
                    Get in Touch
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
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
