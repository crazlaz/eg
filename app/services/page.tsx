"use client";

import { useEffect, useMemo, useState, useMemo as memo } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import TopBar from "../components/TopBar";
import { BRAND } from "../lib/brand";

/* ---------- SAME SERVICE DATA (keep pics/content) ---------- */
const SERVICE_DATA: Record<
  string,
  {
    description: string;
    images: { src: string; alt: string }[];
    tags?: string[]; // optional “spice” tags per service
    featured?: boolean; // show a small badge
    category?: "Home" | "Power" | "Green" | "Repair";
  }
> = {
  "Wiring & Rewiring": {
    description:
      "From new construction to remodels, our expert wiring ensures safety, efficiency, and long-lasting performance in every connection.",
    images: [{ src: "/7.PNG", alt: "Wiring project" }],
    tags: ["Remodel", "New Build", "Custom Homes", "Code Safe"],
    featured: false,
    category: "Home",
  },
  "Panels & Meters": {
    description:
      "Power today’s appliances with confidence. We upgrade old panels and meters to modern systems that improve safety and reliability.",
    images: [{ src: "/real1.png", alt: "Panel upgrade" }],
    tags: ["Upgrades", "Breaker Issues"],
    featured: true,
    category: "Power",
  },
  "EV Chargers": {
    description:
      "Charge at the speed of life. We install EV chargers that fit your vehicle and deliver fast, dependable charging at home.",
    images: [{ src: "/ev.jpg", alt: "EV charger installation" }],
    tags: ["Tesla", "NACS/J1772", "Permits"],
    featured: true,
    category: "Green",
  },
  Generators: {
    description:
      "Be ready when the power fails. Our standby generators keep lights, HVAC, and essentials running no matter the storm.",
    images: [{ src: "/real111.jpg", alt: "Backup generator" }],
    tags: ["Standby", "Transfer Switch"],
    featured: false,
    category: "Power",
  },
  "Solar System Installations": {
    description:
      "Harness the sun’s power with solar systems tailored to your home. Lower bills, reduce reliance on utilities, and invest in clean energy.",
    images: [{ src: "/real14.png", alt: "Solar installation" }],
    tags: ["Net Metering", "Battery-Ready"],
    featured: false,
    category: "Green",
  },
  "Lighting & Ceiling Fans": {
    description:
      "Brighten your world. From elegant interior fixtures to durable outdoor lighting, plus ceiling fans for comfort and efficiency.",
    images: [{ src: "/2.PNG", alt: "Lighting and ceiling fans" }],
    tags: ["Indoor", "Outdoor", "Accent"],
    featured: false,
    category: "Home",
  },
  Troubleshooting: {
    description:
      "Electrical mystery? Solved. We diagnose and repair issues quickly, restoring safety and peace of mind without the guesswork.",
    images: [{ src: "/real18.png", alt: "Troubleshooting electrical issues" }],
    tags: ["Diagnostics", "No Power", "Sparks/Smell"],
    featured: true,
    category: "Repair",
  },
};

/* ---------- LITTLE UTILITIES ---------- */
const CATEGORIES: Array<NonNullable<(typeof SERVICE_DATA)[keyof typeof SERVICE_DATA]["category"]>> = [
  "Home",
  "Power",
  "Green",
  "Repair",
];

function classNames(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

/* ---------- MODAL ---------- */
function ServiceModal({
  open,
  onClose,
  name,
}: {
  open: boolean;
  onClose: () => void;
  name: string | null;
}) {
  if (!open || !name) return null;
  const s = SERVICE_DATA[name];
  if (!s) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[var(--bgElev)] rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-[var(--card-br)]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl z-10"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="relative rounded-xl overflow-hidden border border-[var(--card-br)]">
            {/* FIX: Use Next.js Image component for optimization and sharper resolution */}
            <Image
              src={s.images[0].src}
              alt={s.images[0].alt}
              width={600} // Base width for generating optimized image
              height={400} // Base height for generating optimized image
              sizes="(max-width: 768px) 100vw, 50vw" // Helps Next.js select the right size
              className="w-full h-56 md:h-72 object-cover"
              priority={true} // Load this image with high priority since it's in a modal
            />
            <div className="absolute bottom-2 left-2 text-xs px-2 py-1 rounded bg-black/60 border border-white/10 text-white">
              {s.images[0].alt}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-extrabold">{name}</h3>
            <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{s.description}</p>

            {s.tags && s.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="chip text-xs">{t}</span>
                ))}
              </div>
            )}

            <div className="mt-5 flex gap-2">
              <Link href={`tel:${BRAND.phone}`} className="btn btn-accent">☎ Call {BRAND.phonePretty}</Link>
              <Link href="/quote" className="btn btn-outline">Get Free Estimate</Link>
            </div>

            <ul className="mt-5 text-sm grid gap-1.5">
              <li>✓ Licensed • Insured • Local</li>
              <li>✓ Up-front pricing, no surprises</li>
              <li>✓ Clean work, code-compliant installs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- SERVICE CARD ---------- */
function ServiceCard({
  name,
  onOpen,
}: {
  name: string;
  onOpen: (n: string) => void;
}) {
  const s = SERVICE_DATA[name];
  const img = s.images[0];

  return (
    <button
      onClick={() => onOpen(name)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(name)}
      className="group relative overflow-hidden rounded-xl border border-[var(--card-br)] bg-[var(--bgElev)] text-left transition-all hover:shadow-2xl focus:shadow-2xl focus:outline-none"
      title={`Learn more about ${name}`}
    >
      {/* Badge */}
      {s.featured && (
        <span className="absolute top-3 left-3 z-10 text-[10px] font-bold tracking-wider px-2 py-1 rounded-full bg-[color-mix(in_oklab,var(--accent),black_75%)] text-white">
          POPULAR
        </span>
      )}

      {/* Thumbnail - Using Next.js Image for optimization, but kept small */}
      <div className="relative h-28 md:h-32">
        <Image
          src={img.src}
          alt={img.alt}
          width={400} // Optimized thumbnail size
          height={150}
          sizes="(max-width: 640px) 50vw, 33vw"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-1 left-2 right-2 text-white/95 text-[11px] line-clamp-1 drop-shadow">
          {img.alt}
        </div>
      </div>

      {/* Body */}
      <div className="p-3">
        <div className="flex items-center gap-2">
          <span aria-hidden className="text-lg">⚡</span>
          <h3 className="font-bold text-sm md:text-[0.95rem]">{name}</h3>
        </div>
        <p className="mt-1 text-[12.5px] text-[var(--muted)] line-clamp-2">{s.description}</p>

        {s.tags && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {s.tags.slice(0, 3).map((t) => (
              <span key={t} className="chip text-[10px]">{t}</span>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center gap-2">
          <span className="btn btn-outline btn-sm">Learn more</span>
          <span className="text-[11px] text-[var(--muted)]">Tap to view details</span>
        </div>
      </div>
    </button>
  );
}

/* ---------- COMPARISON / TRUST STRIP ---------- */
function QuickCompare() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { k: "Same-Day Availability", v: "Often", i: "⏱" },
        { k: "Warranty", v: "Yes", i: "🛡" },
        { k: "EV Certified", v: "Yes", i: "⚡" },
        { k: "Financing", v: "Ask", i: "💳" },
      ].map((r) => (
        <div key={r.k} className="card p-3 text-center">
          <div className="text-xl" aria-hidden>{r.i}</div>
          <div className="text-xs text-[var(--muted)] mt-1">{r.k}</div>
          <div className="text-sm font-semibold">{r.v}</div>
        </div>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [selected, setSelected] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<null | (typeof CATEGORIES)[number]>(null);

  // theme sync
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

  // computed list
  const items = useMemo(() => {
    const terms = q.trim().toLowerCase();
    return Object.keys(SERVICE_DATA).filter((name) => {
      const s = SERVICE_DATA[name];
      const inCat = cat ? s.category === cat : true;
      if (!inCat) return false;
      if (!terms) return true;
      return (
        name.toLowerCase().includes(terms) ||
        s.description.toLowerCase().includes(terms) ||
        (s.tags || []).some((t) => t.toLowerCase().includes(terms))
      );
    });
  }, [q, cat]);

  // SEO
  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: BRAND.name,
      address: { "@type": "PostalAddress", addressLocality: BRAND.city },
      telephone: BRAND.phone,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Electrical Services",
        itemListElement: Object.keys(SERVICE_DATA).map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            description: SERVICE_DATA[name].description,
          },
        })),
      },
    };
  }, []);

  return (
    <>
      <Script id="services-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <TopBar theme={theme} setTheme={setTheme} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--card-br)]">
        <div className="container py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Our Core Services</h1>
              <p className="text-[var(--muted)] mt-2 max-w-2xl">
                Click any service to learn more or request a quote. We proudly serve the Carolinas — same-day in many areas.
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`tel:${BRAND.phone}`} className="btn btn-accent">☎ {BRAND.phonePretty}</Link>
              <Link href="/quote" className="btn btn-outline">Get Free Estimate</Link>
            </div>
          </div>

          <div className="mt-6">
            <QuickCompare />
          </div>

          {/* Search + category filters */}
          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
            <label className="relative block">
              <span className="sr-only">Search services</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search services (e.g., EV, panel, lights)"
                className="w-full rounded-md border border-[var(--border)] bg-[var(--bgElev)] px-3 py-2 text-sm"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">⌘K</span>
            </label>
            <div className="flex flex-wrap pb-12 gap-2 md:justify-end">
              <button
                className={classNames("chip", !cat && "ring-1  ring-[var(--accent)]")}
                onClick={() => setCat(null)}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={classNames("chip", cat === c && "ring-1 ring-[var(--accent)]")}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="container py-8">
        {items.length === 0 ? (
          <div className="text-center text-[var(--muted)]">
            No matches. Try a different term or category.
          </div>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {items.map((name) => (
              <li key={name} className="contents">
                <ServiceCard name={name} onOpen={(n) => setSelected(n)} />
              </li>
            ))}
          </ul>
        )}

        {/* CTA card */}
        <div className="mt-8 card p-6 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <h2 className="text-lg font-semibold">Not sure where to start?</h2>
            <p className="text-sm text-[var(--muted)]">
              Tell us what you’re planning—we’ll recommend the safest, most cost-effective option.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/quote" className="btn btn-accent text-center">Request Quote</Link>
            <Link href={`tel:${BRAND.phone}`} className="btn btn-outline text-center">Call {BRAND.phonePretty}</Link>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-2 left-2 right-2 z-40 md:hidden">
        <div className="flex gap-2">
          <Link href={`tel:${BRAND.phone}`} className="btn btn-accent flex-1 text-center">Call {BRAND.phonePretty}</Link>
          <Link href="/quote" className="btn btn-outline flex-1 text-center">Get Quote</Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer id="footer" className="border-t border-[var(--card-br)] bg-[var(--bgElev)] mt-10">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold">{BRAND.name}</h3>
              <p className="text-sm text-[var(--muted)] mt-1">{BRAND.city}</p>
              <p className="text-sm text-[var(--muted)]">{BRAND.license}</p>
              <div className="flex gap-3 mt-4">
                <Link href={`tel:${BRAND.phone}`} className="text-sm font-medium text-[var(--fg)] hover:text-[var(--accent)] transition">📞 {BRAND.phonePretty}</Link>
                {BRAND.emailHref && (
                  <Link href={BRAND.emailHref} className="text-sm font-medium text-[var(--fg)] hover:text-[var(--accent)] transition">✉ Email Us</Link>
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
                loading="lazy"
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
                <li><Link href="/#top" className="hover:text-[var(--accent)]">Back to Top</Link></li>
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

      {/* MODAL */}
      <ServiceModal open={!!selected} onClose={() => setSelected(null)} name={selected} />
    </>
  );
}