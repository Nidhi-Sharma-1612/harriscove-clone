import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { FileText, Mail, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for Harris Cove Cottages — the rules and regulations for the use of our website and services.",
};

const TOC = [
  { id: "introduction",   label: "Introduction" },
  { id: "license",        label: "License" },
  { id: "hyperlinking",   label: "Hyperlinking to Our Content" },
  { id: "iframes",        label: "iFrames" },
  { id: "reservation",    label: "Reservation of Rights" },
  { id: "removal",        label: "Removal of Links" },
  { id: "disclaimer",     label: "Disclaimer" },
];

export default function TermsPage() {
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
                <FileText className="h-4 w-4 text-secondary" />
              </div>
              <p className="gold-shimmer text-xs font-bold uppercase tracking-[0.35em]">
                Legal
              </p>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
              Terms &amp; <span className="text-secondary italic">Conditions</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-base max-w-xl leading-relaxed mb-6">
              Please read these terms carefully before using our website or services.
              By accessing Harris Cove Cottages, you agree to be bound by these terms.
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

                  {/* Privacy policy link */}
                  <div className="mt-8 p-4 rounded-2xl bg-white border border-border/60">
                    <p className="text-xs font-bold text-foreground mb-1">Also see</p>
                    <Link
                      href="/privacy-policy"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary/80 transition-colors mt-1"
                    >
                      <FileText className="h-3 w-3" />
                      Privacy Policy
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                    <div className="mt-3 pt-3 border-t border-border/40">
                      <p className="text-xs text-muted-foreground mb-2 leading-relaxed">Questions?</p>
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
                </div>
              </aside>

              {/* ── Main content ──────────────────────────────── */}
              <div className="lg:col-span-3 space-y-4">

                {/* ── Introduction ── */}
                <div id="introduction" className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8 scroll-mt-28">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4">
                    Welcome to Harris Cove Cottages
                  </h2>
                  <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <p>
                      These terms and conditions outline the rules and regulations for the use of
                      Harris Cove Cottages&apos; website. By accessing this website we assume you accept
                      these terms and conditions. Do not continue to use Harris Cove Cottages if you
                      do not agree to take all of the terms and conditions stated on this page.
                    </p>
                    <p>
                      The following terminology applies to these Terms and Conditions, Privacy
                      Statement and Disclaimer Notice and all Agreements: <strong className="text-foreground">&quot;Client&quot;, &quot;You&quot;</strong> and
                      {" "}<strong className="text-foreground">&quot;Your&quot;</strong> refers to you, the person logged on to this website and compliant to
                      the Company&apos;s terms and conditions. <strong className="text-foreground">&quot;The Company&quot;, &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot;</strong> and
                      {" "}<strong className="text-foreground">&quot;Us&quot;</strong> refers to our Company. <strong className="text-foreground">&quot;Party&quot;, &quot;Parties&quot;</strong> or <strong className="text-foreground">&quot;Us&quot;</strong> refers to
                      both the Client and ourselves.
                    </p>
                    <p>
                      All terms refer to the offer, acceptance and consideration of payment necessary
                      to undertake the process of our assistance to the Client in the most appropriate
                      manner for the express purpose of meeting the Client&apos;s needs in respect of
                      provision of the Company&apos;s stated services, in accordance with and subject to,
                      the prevailing law.
                    </p>
                  </div>
                </div>

                {/* ── License ── */}
                <div id="license" className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8 scroll-mt-28">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4">
                    License
                  </h2>
                  <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <p>
                      Unless otherwise stated, Harris Cove Cottages and/or its licensors own the
                      intellectual property rights for all material on Harris Cove Cottages. All
                      intellectual property rights are reserved. You may access this from Harris Cove
                      Cottages for your own personal use subjected to restrictions set in these terms
                      and conditions.
                    </p>

                    <div className="rounded-xl border border-red-100 bg-red-50/60 p-4 sm:p-5">
                      <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3">
                        You must not:
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Republish material from Harris Cove Cottages",
                          "Sell, rent or sub-license material from Harris Cove Cottages",
                          "Reproduce, duplicate or copy material from Harris Cove Cottages",
                          "Redistribute content from Harris Cove Cottages",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-red-700">
                            <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p>This Agreement shall begin on the date hereof.</p>

                    <p>
                      Parts of this website offer an opportunity for users to post and exchange
                      opinions and information. Harris Cove Cottages does not filter, edit, publish or
                      review Comments prior to their presence on the website. Comments do not reflect
                      the views and opinions of Harris Cove Cottages, its agents and/or affiliates.
                    </p>
                    <p>
                      Harris Cove Cottages reserves the right to monitor all Comments and to remove
                      any Comments which can be considered inappropriate, offensive or causes breach
                      of these Terms and Conditions.
                    </p>

                    <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-4 sm:p-5">
                      <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                        You warrant and represent that:
                      </p>
                      <ul className="space-y-2">
                        {[
                          "You are entitled to post the Comments on our website and have all necessary licenses and consents to do so.",
                          "The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party.",
                          "The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy.",
                          "The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/70">
                            <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p>
                      You hereby grant Harris Cove Cottages a non-exclusive license to use, reproduce,
                      edit and authorize others to use, reproduce and edit any of your Comments in any
                      and all forms, formats or media.
                    </p>
                  </div>
                </div>

                {/* ── Hyperlinking ── */}
                <div id="hyperlinking" className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8 scroll-mt-28">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4">
                    Hyperlinking to Our Content
                  </h2>
                  <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <p>The following organizations may link to our Website without prior written approval:</p>
                    <ul className="space-y-2">
                      {[
                        "Government agencies",
                        "Search engines",
                        "News organizations",
                        "Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses",
                        "System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>
                      These organizations may link to our home page, to publications or to other
                      Website information so long as the link: (a) is not in any way deceptive;
                      (b) does not falsely imply sponsorship, endorsement or approval of the linking
                      party and its products and/or services; and (c) fits within the context of the
                      linking party&apos;s site.
                    </p>
                    <p>
                      We may consider and approve other link requests from the following types of
                      organizations: commonly-known consumer and/or business information sources;
                      dot.com community sites; associations or other groups representing charities;
                      online directory distributors; internet portals; accounting, law and consulting
                      firms; and educational institutions and trade associations.
                    </p>
                    <p>
                      If you are interested in linking to our website, you must inform us by sending
                      an e-mail to{" "}
                      <a href="mailto:bookings@harriscove.com" className="text-secondary hover:underline font-medium">
                        bookings@harriscove.com
                      </a>
                      . Please include your name, your organization name, contact information as well
                      as the URL of your site. Wait 2–3 weeks for a response.
                    </p>
                    <p>Approved organizations may hyperlink to our Website as follows:</p>
                    <ul className="space-y-2">
                      {[
                        "By use of our corporate name",
                        "By use of the uniform resource locator being linked to",
                        "By use of any other description of our Website that makes sense within the context and format of content on the linking party's site",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm font-medium text-foreground/70 bg-muted/40 rounded-xl px-4 py-3 border border-border/40">
                      No use of Harris Cove Cottages logo or other artwork will be allowed for
                      linking absent a trademark license agreement.
                    </p>
                  </div>
                </div>

                {/* ── iFrames ── */}
                <div id="iframes" className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8 scroll-mt-28">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4">
                    iFrames
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Without prior approval and written permission, you may not create frames around
                    our Web Pages that alter in any way the visual presentation or appearance of
                    our Website.
                  </p>
                </div>

                {/* ── Reservation of Rights ── */}
                <div id="reservation" className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8 scroll-mt-28">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4">
                    Reservation of Rights
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    We reserve the right to request that you remove all links or any particular link
                    to our Website. You approve to immediately remove all links to our Website upon
                    request. We also reserve the right to amend these terms and conditions and its
                    linking policy at any time. By continuously linking to our Website, you agree to
                    be bound to and follow these linking terms and conditions.
                  </p>
                </div>

                {/* ── Removal of Links ── */}
                <div id="removal" className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8 scroll-mt-28">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4">
                    Removal of Links from Our Website
                  </h2>
                  <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <p>
                      If you find any link on our Website that is offensive for any reason, you are
                      free to contact and inform us at any moment. We will consider requests to remove
                      links but we are not obligated to do so or to respond to you directly.
                    </p>
                    <p>
                      We do not ensure that the information on this website is correct, we do not
                      warrant its completeness or accuracy; nor do we promise to ensure that the
                      website remains available or that the material on the website is kept up to date.
                    </p>
                  </div>
                </div>

                {/* ── Disclaimer ── */}
                <div id="disclaimer" className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8 scroll-mt-28">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4">
                    Disclaimer
                  </h2>
                  <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <p>
                      To the maximum extent permitted by applicable law, we exclude all
                      representations, warranties and conditions relating to our website and the use
                      of this website. Nothing in this disclaimer will:
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Limit or exclude our or your liability for death or personal injury",
                        "Limit or exclude our or your liability for fraud or fraudulent misrepresentation",
                        "Limit any of our or your liabilities in any way that is not permitted under applicable law",
                        "Exclude any of our or your liabilities that may not be excluded under applicable law",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>
                      The limitations and prohibitions of liability set in this section and elsewhere
                      in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern
                      all liabilities arising under the disclaimer, including liabilities arising in
                      contract, in tort and for breach of statutory duty.
                    </p>
                    <p className="text-sm font-medium text-foreground/70 bg-muted/40 rounded-xl px-4 py-3 border border-border/40">
                      As long as the website and the information and services on the website are
                      provided free of charge, we will not be liable for any loss or damage of
                      any nature.
                    </p>
                  </div>
                </div>

                {/* ── Bottom CTA ── */}
                <div className="mt-4 p-6 sm:p-8 rounded-2xl bg-primary text-white text-center">
                  <FileText className="h-8 w-8 text-secondary mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold mb-2">
                    Questions about these terms?
                  </h3>
                  <p className="text-white/60 text-sm mb-5 max-w-sm mx-auto">
                    We&apos;re happy to clarify anything. Reach out and we&apos;ll respond within 2 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 btn-gold rounded-full text-sm font-bold group"
                    >
                      Get in Touch
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <Link
                      href="/privacy-policy"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/20 text-white/70 hover:border-secondary hover:text-secondary text-sm font-semibold transition-all duration-200"
                    >
                      View Privacy Policy
                    </Link>
                  </div>
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
