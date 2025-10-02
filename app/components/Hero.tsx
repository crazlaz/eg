"use client";

import QuoteForm from "../components/QuoteForm";
import { BRAND } from "../lib/brand";
import Image from "next/image";
import { LightBulbIcon } from "@heroicons/react/24/solid";


/* tiny helper */
function Dot() {
  return (
    <span
      aria-hidden={true}
      style={{
        display: "inline-block",
        width: 6,
        height: 6,
        borderRadius: 9999,
        background: "rgb(var(--accent-r), var(--accent-g), var(--accent-b))",
      }}
    />
  );
}

/* Background image (fills hero) */
function HeroBG() {
  return (
    <div aria-hidden={true} className="absolute inset-0 -z-10">
      <img
        src="/ctl3.jpeg"
        alt=""
        className="w-full h-full object-cover"
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/40" />
    </div>
  );
}

export default function Hero({
  theme,
  setTheme,
}: {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}) {
  return (
    <section id="top" className="relative isolate" aria-label="Hero">
      {/* ===== HERO IMAGE + OVERLAYED TAGLINE/LOGO ===== */}
      <div className="relative min-h-[70vh] md:min-h-[85vh]">
        <HeroBG />

        {/* Overlay anchored at top-center */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center px-4 text-center">
          {/* Always use dark logo */}
          <Image
            src="/company2.png"
            alt={`${BRAND.name} logo dark`}
            width={420}
            height={140}
            className="h-20 md:h-28 w-auto object-contain"
            priority
          />

          {/* Tagline */}
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold uppercase bg-gradient-to-l from-red-900 via-orange-900 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight animate-pulse">
            Illuminating the Carolinas
          </h2>
        </div>
      </div>

      {/* ===== CONTENT BELOW THE HERO IMAGE ===== */}

{/* Headline row (separate from the top-strip) */}
<div className="container relative z-10">
{/* Light bulb above the words */}
<div className="flex justify-center pt-12 mb-3">
  <LightBulbIcon
    className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-yellow-400 animate-pulse"
    style={{ filter: "drop-shadow(0 0 12px rgba(252, 202, 4, 0.99))" }}
    aria-hidden="true"
  />
</div>

<h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase bg-gradient-to-l from-red-700 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight text-center">
  Quality is Our Priority
</h2>


  {/* top trust strip (keep this small, no big headings inside) */}
  <div className="top-strip mt-3">
    <span className="chip">Call Now for Fast Service</span>
    <a href={BRAND.phoneHref} className="btn btn-accent btn-sm">
      ☎ {BRAND.phonePretty}
    </a>
    <a href="#quote" className="btn btn-outline btn-sm">
      Request Service
    </a>
  </div>

      </div>

      {/* main hero content */}
      <div className="container pt-5 pb-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-start mt-4">
          {/* Left: headline + bullets + badges */}
          <div>
            <span className="chip">
              <Dot /> Licensed • Insured • Local
            </span>

            <h1
              className="mt-3"
              style={{
                fontSize: "clamp(1.9rem, 2vw + 1.6rem, 3rem)",
                lineHeight: 1.15,
                fontWeight: 700,
                letterSpacing: "-.02em",
              }}
            >
              Trusted, Same-Day Electricians in{" "}
              <span className="accent-text">{BRAND.city}</span>
            </h1>

            <p className="mt-3 text-[1.1rem]" style={{ color: "var(--muted)" }}>
              No surprises. Just safe, reliable power — installed the right way,
              the first time. From panel upgrades to EV chargers, we’ve got you.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a href={BRAND.phoneHref} className="btn btn-accent">
                ☎ Call {BRAND.phonePretty}
              </a>
              <a href="#quote" className="btn btn-outline">
                Get Free Quote
              </a>
            </div>

            {/* bullets */}
            <ul className="mt-6 hero-bullets">
              {[
                "Same-Day or Next-Day",
                "Up-Front Pricing",
                "5-Star Local Pros",
                "EV Charger Installs",
                "Panel Upgrades",
                "Emergency Service",
              ].map((t) => (
                <li key={t} className="pill">
                  {t}
                </li>
              ))}
            </ul>

            {/* badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip">⭐ Google — Leave a review!</span>
              <span className="chip">BBB A+</span>
              <span className="chip">⚡ EV Certified</span>
              <span className="chip">🔌 Generator Pro</span>
            </div>
          </div>

          {/* Right: request form card */}
      
        </div>
      </div>

      {/* divider to next section */}
      <div className="divider relative z-10" />

      {/* styles */}
      <style jsx>{`
        .top-strip {
          margin-top: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border);
          background: color-mix(in oklab, var(--bgElev), black 5%);
          backdrop-filter: saturate(120%) blur(4px);
          border-radius: 0.75rem;
        }
        .btn-sm {
          padding: 0.35rem 0.7rem;
        }
        .hero-bullets {
          display: grid;
          gap: 0.75rem;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          color: var(--muted);
          font-size: 0.95rem;
        }
        @media (min-width: 768px) {
          .hero-bullets {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
