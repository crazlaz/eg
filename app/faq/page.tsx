"use client";

import { JSX, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";

import TopBar from "../components/TopBar";
import Section from "../components/Section";
import Faq from "../components/Faq";
import Image from "next/image";

import { BRAND } from "../lib/brand";
import { formatPhone } from "../lib/phone";

/* -------------------------------
   FAQ DATA (extend anytime)
--------------------------------*/
type FaqItem = {
  q: string;
  a: JSX.Element | string;
  cats?: string[];
};

const BASE_FAQ: FaqItem[] = [
  {
    q: "Do you offer same-day service?",
    a: <>Yes — call us at {formatPhone(BRAND.phone)}. We do our best to get a tech out same-day or next-day.</>,
    cats: ["Scheduling", "General"],
  },
  {
    q: "How do you price jobs?",
    a: <>After diagnosing, we provide a clear, up-front estimate before work begins.</>,
    cats: ["Pricing", "General"],
  },
  {
    q: "Are you licensed and insured?",
    a: <>Absolutely. {BRAND.license}. All technicians are background-checked.</>,
    cats: ["Credentials", "General"],
  },
  {
    q: "What payment methods do you accept?",
    a: <>Most major cards, debit, and bank. Ask about financing options.</>,
    cats: ["Payments", "Billing"],
  },
  // Extras to feel complete
  {
    q: "Which areas do you service?",
    a: <>We serve {BRAND.city} and surrounding areas across the Carolinas. See the full list on our{" "}
      <Link href="/service-area" className="underline">Service Area</Link> page.</>,
    cats: ["Service Area", "General"],
  },
  {
    q: "Do you provide free estimates?",
    a: <>Yes. Call {formatPhone(BRAND.phone)} or request one on our{" "}
      <Link href="/quote" className="underline">Request Quote</Link> page.</>,
    cats: ["Pricing", "General"],
  },
  {
    q: "What warranties do you offer?",
    a: <>We stand behind our work. Ask your technician for warranty details specific to your parts and scope.</>,
    cats: ["Warranty", "Billing"],
  },
  {
    q: "Can you install EV chargers?",
    a: <>Yes — residential Level 2 chargers are one of our specialties. We’ll verify panel capacity and provide a clean, code-compliant install.</>,
    cats: ["Services", "EV"],
  },
  {
    q: "Do you handle panel upgrades?",
    a: <>Yes. We replace outdated or unsafe panels and bring service up to modern code with clear, up-front pricing.</>,
    cats: ["Services"],
  },
  {
    q: "Are emergency visits available?",
    a: <>Call {formatPhone(BRAND.phone)}. If it’s unsafe (burning smell, sparking, tripping main), shut power at the main breaker and contact us immediately.</>,
    cats: ["Scheduling", "Emergency"],
  },
];

/* -------------------------------
   Utils
--------------------------------*/
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}
const ALL_CATS = Array.from(new Set(BASE_FAQ.flatMap(i => i.cats || []))).sort();

export default function FAQPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<string | "All">("All");

  // theme (match your other pages)
  useEffect(() => {
    const saved = (localStorage.getItem("eg-theme") as "dark" | "light" | null) ?? null;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const t = saved || (prefersDark ? "dark" : "light");
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("eg-theme", theme);
  }, [theme]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return BASE_FAQ.filter((item) => {
      const inCat = activeCat === "All" || (item.cats || []).includes(activeCat);
      const inText =
        !term ||
        item.q.toLowerCase().includes(term) ||
        (typeof item.a === "string" ? item.a.toLowerCase().includes(term) : false);
      return inCat && inText;
    });
  }, [q, activeCat]);

  // JSON-LD for rich results
  const faqStructuredData = useMemo(() => {
    const items = BASE_FAQ.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          typeof i.a === "string"
            ? i.a
            : String((i.a as any)?.props?.children || "See site for details."),
      },
    }));
    return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items };
  }, []);

  const phonePretty = formatPhone(BRAND.phone);

  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

      <TopBar theme={theme} setTheme={setTheme} />

      <div className="container py-10">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-[var(--muted)] mt-2 max-w-2xl mx-auto">
            Quick answers about scheduling, pricing, licensing, and service options. Still unsure?{" "}
            <Link href="/quote" className="underline">Request a free estimate</Link> or call us at {phonePretty}.
          </p>
        </header>

        {/* Search + Category chips */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search FAQs…"
            className="w-full md:w-1/2 rounded-md border border-[var(--card-br)] bg-[var(--bgElev)] px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <div className="flex flex-wrap gap-2">
            <button
              className={`chip ${activeCat === "All" ? "bg-[var(--accent)] text-black" : ""}`}
              onClick={() => setActiveCat("All")}
            >
              All
            </button>
            {ALL_CATS.map((c) => (
              <button
                key={c}
                className={`chip ${activeCat === c ? "bg-[var(--accent)] text-black" : ""}`}
                onClick={() => setActiveCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-4 text-sm text-[var(--muted)]">
          Popular:{" "}
          <span className="space-x-3">
            {[
              "Do you offer same-day service?",
              "How do you price jobs?",
              "Are you licensed and insured?",
            ].map((qq) => (
              <a key={qq} href={`#${slugify(qq)}`} className="underline">
                {qq}
              </a>
            ))}
          </span>
        </div>

        {/* FAQ list */}
        <Section id="faq" title="FAQ">
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((item) => (
              <div key={item.q} id={slugify(item.q)}>
                <Faq q={item.q}>{item.a}</Faq>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="md:col-span-2 text-center text-[var(--muted)] py-10">
                No results. Try a different term or{" "}
                <Link href="/quote" className="underline">request a quote</Link>.
              </div>
            )}
          </div>
        </Section>

        {/* CTA */}
        <div className="mt-8 card p-6 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <h2 className="text-lg font-semibold">Still need help?</h2>
            <p className="text-sm text-[var(--muted)]">We’re happy to answer questions specific to your home.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/#quote" className="btn btn-accent text-center">Get a Free Estimate</Link>
            <a href={BRAND.phoneHref} className="btn btn-outline text-center">
              Call {phonePretty}
            </a>
          </div>
        </div>
      </div>

      {/* Footer (same pattern as Home) */}
      <footer id="footer" className="border-t border-[var(--card-br)] bg-[var(--bgElev)]">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold">{BRAND.name}</h3>
              <p className="text-sm text-[var(--muted)] mt-1">{BRAND.city}</p>
              <p className="text-sm text-[var(--muted)]">{BRAND.license}</p>
              <div className="flex gap-3 mt-4">
                <a
                  href={BRAND.phoneHref}
                  className="text-sm font-medium text-[var(--fg)] hover:text-[var(--accent)] transition"
                >
                  📞 {BRAND.phonePretty}
                </a>
                {BRAND.emailHref && (
                  <a
                    href={BRAND.emailHref}
                    className="text-sm font-medium text-[var(--fg)] hover:text-[var(--accent)] transition"
                  >
                    ✉ Email Us
                  </a>
                )}
              </div>
            </div>

            <div className="flex-shrink-0">
              <Image
                src={theme === "dark" ? "/company2.png" : "/company.png"}
                alt={`${BRAND.name} logo`}
                width={220}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mt-8">
            <div>
              <h4 className="font-semibold mb-2 text-[var(--fg)]">Navigation</h4>
              <ul className="space-y-1 text-[var(--muted)]">
                <li><Link href="/services" className="hover:text-[var(--accent)]">Services</Link></li>
                <li><Link href="/quote" className="hover:text-[var(--accent)]">Request Quote</Link></li>
                <li><Link href="/faq" className="hover:text-[var(--accent)]">FAQ</Link></li>
                <li><Link href="/service-area" className="hover:text-[var(--accent)]">Service Area</Link></li>
                <li><a href="/#top" className="hover:text-[var(--accent)]">Back to Top</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-[var(--fg)]">Legal</h4>
              <ul className="space-y-1 text-[var(--muted)]">
                <li><Link href="/privacy" className="hover:text-[var(--accent)]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[var(--accent)]">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--card-br)] mt-8 pt-4 text-xs text-[var(--muted)] text-center">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
