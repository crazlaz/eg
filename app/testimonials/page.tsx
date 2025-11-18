"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";

import TopBar from "../components/TopBar";
import Section from "../components/Section";
import Quote from "../components/Quote";

import { BRAND } from "../lib/brand";
import { formatPhone } from "../lib/phone";

// --- NEW: Swiper imports for the small top slideshow ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Review = {
  name: string;
  city: string;
  quote: string;
  rating?: number; // 1-5 (optional)
  date?: string;   // ISO (optional)
  photo?: string;  // optional reviewer/avatar photo
};

const REVIEWS: Review[] = [
  {
    name: "T. Ramirez",
    city: "Charlotte",
    quote:
      "Called in the morning, panel issue fixed by afternoon. Clean and professional.",
    rating: 5,
    date: "2024-11-15",
  },
  {
    name: "K. Patel",
    city: "Huntersville",
    quote:
      "They installed our EV charger fast and walked us through everything.",
    rating: 5,
    date: "2025-02-08",
  },
  {
    name: "D. Moore",
    city: "Concord",
    quote:
      "Fair price, neat work, and they even cleaned up afterwards. Recommended.",
    rating: 5,
    date: "2025-05-19",
  },
];

// quick avatar initials
function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}

// small image gallery (reuse your existing public images)
const HIGHLIGHT_IMGS = [
  { src: "/real1.png", alt: "Wiring project" },
  { src: "/real2.png", alt: "Panel upgrade" },
  { src: "/real3.png", alt: "EV charger install" },
  { src: "/real4.png", alt: "Backup generator" },
  { src: "/real5.png", alt: "Solar array install" },
  { src: "/real6.png", alt: "Lighting & fans" },
  { src: "/real7.png", alt: "Troubleshooting" },

  { src: "/real8.png", alt: "Wiring project" },
  { src: "/real9.png", alt: "Panel upgrade" },
  { src: "/real10.png", alt: "EV charger install" },
  { src: "/real11.png", alt: "Backup generator" },
  { src: "/real12.png", alt: "Solar array install" },
  { src: "/real13.png", alt: "Lighting & fans" },
  { src: "/real14.png", alt: "Troubleshooting" },

  { src: "/real15.png", alt: "Wiring project" },
  { src: "/real16.png", alt: "Panel upgrade" },
  { src: "/real17.png", alt: "EV charger install" },
  { src: "/real18.png", alt: "Backup generator" },
  { src: "/real19.png", alt: "Solar array install" },
  { src: "/real20.png", alt: "Lighting & fans" },

  { src: "/real21.png", alt: "Troubleshooting" },
  { src: "/real22.png", alt: "Wiring project" },
];

export default function TestimonialsPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null
  );

  // theme (match other pages)
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

  const phonePretty = formatPhone(BRAND.phone);

  // SEO: AggregateRating + individual reviews
  const reviewsJsonLd = useMemo(() => {
    const avg =
      REVIEWS.length > 0
        ? REVIEWS.reduce((s, r) => s + (r.rating || 5), 0) / REVIEWS.length
        : 5;

    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: BRAND.name,
      address: { "@type": "PostalAddress", addressLocality: BRAND.city },
      telephone: BRAND.phone,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avg.toFixed(1),
        reviewCount: REVIEWS.length,
      },
      review: REVIEWS.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        reviewBody: r.quote,
        reviewRating: { "@type": "Rating", ratingValue: r.rating || 5, bestRating: "5" },
        datePublished: r.date || undefined,
      })),
    };
  }, []);

  const avgRating =
    REVIEWS.length > 0
      ? (REVIEWS.reduce((s, r) => s + (r.rating || 5), 0) / REVIEWS.length).toFixed(1)
      : "5.0";

  return (
    <>
      <Script
        id="testimonials-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />

      <TopBar theme={theme} setTheme={setTheme} />



      <div className="container py-10">
        {/* Fancy header with rating pill */}
        <header className="relative text-center mb-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.04)] to-transparent"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            What Customers Say
          </h1>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--card-br)] bg-[var(--bgElev)]">
            <span aria-label={`${avgRating} out of 5 stars`}>
              {"★★★★★".slice(0, 5)}
            </span>
            <span className="text-sm text-[var(--muted)]">
              {avgRating} / 5.0 • {REVIEWS.length}+ reviews
            </span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[color-mix(in_oklab,var(--accent),black_85%)] text-white/90">
              Google • Local Pros
            </span>
          </div>
          <p className="text-[var(--muted)] mt-3 max-w-2xl mx-auto">
            Real feedback from homeowners across the Carolinas. Have a project in mind?{" "}
            <Link href="/quote" className="underline">Request a free estimate</Link> or call {phonePretty}.
          </p>
        </header>

              {/* --- NEW: Small slideshow at the very top --- */}
      <section aria-label="Project Gallery" className="relative">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 1800, disableOnInteraction: false }}
          loop
          className="relative"
        >
          {HIGHLIGHT_IMGS.map((img, i) => (
            <SwiperSlide key={`${img.src}-${i}`}>
              <div className="relative w-full h-56 md:h-72">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-white text-sm drop-shadow">
                  {img.alt}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

        {/* Testimonials Grid — with mini avatar + quote mark accent */}
        <Section title="" id="testimonials">
          <div className="grid gap-4 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <div key={r.name} className="relative">
                <div className="absolute -top-2 -left-2 text-4xl text-white/10 select-none" aria-hidden>“</div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-br)] bg-[var(--bgElev)] font-bold"
                    aria-hidden
                  >
                    {initials(r.name)}
                  </div>
                  <div className="leading-tight">
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs text-[var(--muted)]">{r.city}</div>
                  </div>
                </div>
                <Quote name={r.name} city={r.city}>
                  {r.quote}
                </Quote>
              </div>
            ))}
          </div>
        </Section>



        {/* CTA */}
        <div className="mt-8 card p-6 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <h2 className="text-lg font-semibold">Ready to get started?</h2>
            <p className="text-sm text-[var(--muted)]">
              We’ll assess your needs and give you clear, up-front pricing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/quote" className="btn btn-accent text-center">Get a Free Estimate</Link>
            <Link href={BRAND.phoneHref} className="btn btn-outline text-center">Call {phonePretty}</Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 md:top-3 md:right-3 z-10 icon-btn"
              aria-label="Close"
              title="Close"
            >
              ✕
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-auto rounded-xl border border-[var(--card-br)]"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="footer" className="border-t border-[var(--card-br)] bg-[var(--bgElev)]">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold">{BRAND.name}</h3>
              <p className="text-sm text-[var(--muted)] mt-1">{BRAND.city}</p>
              <p className="text-sm text-[var(--muted)]">{BRAND.license}</p>
              <div className="flex gap-3 mt-4">
                <Link
                  href={BRAND.phoneHref}
                  className="text-sm font-medium text-[var(--fg)] hover:text-[var(--accent)] transition"
                >
                  📞 {BRAND.phonePretty}
                </Link>
                {BRAND.emailHref && (
                  <Link
                    href={BRAND.emailHref}
                    className="text-sm font-medium text-[var(--fg)] hover:text-[var(--accent)] transition"
                  >
                    ✉ Email Us
                  </Link>
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

      {/* local styles for tweaks */}
      <style jsx>{`
        .icon-btn {
          display: inline-grid;
          place-items: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--bgElev);
          color: var(--fg);
        }
      `}</style>
    </>
  );
}
