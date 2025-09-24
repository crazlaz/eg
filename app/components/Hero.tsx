"use client";

import QuoteForm from "../components/QuoteForm";
import { BRAND } from "../lib/brand";
import Image from "next/image";
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

/* Full-bleed background image */
function HeroBG() {
  return (
    <div aria-hidden={true} className="hero-bg">
      <img
        src="/ctl3.jpeg" /* ensure this file exists in /public */
        alt=""
        className="hero-bg-img"
        loading="eager"
        decoding="async"
      />
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
    <section id="top" className="hero-section" aria-label="Hero">
      {/* Background image */}
      <HeroBG />

  {/* Gradient tagline BELOW image */}
<div className="w-full text-center mt-6 animate-pulse">
  <h2 className="text-4xl md:text-6xl font-extrabold uppercase bg-gradient-to-l from-red-700 via-red-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
    Illuminating the Carolinas
  </h2>
  {/* Logo centered below tagline */}
  <div className="mt-4 flex justify-center">
    {theme === "dark" ? (
      <Image
        src="/company2.png"
        alt={`${BRAND.name} logo dark`}
        width={350}
        height={120}
        className="h-24 md:h-28 w-auto object-contain"
      />
    ) : (
      <Image
        src="/company.png"
        alt={`${BRAND.name} logo light`}
        width={350}
        height={120}
        className="h-24 md:h-28 w-auto object-contain"
      />
    )}
  </div>
  

</div>


      {/* top trust strip */}
      <div className="container">
        <div className="top-strip">
          <span className="chip">Call Now for Fast Service</span>
          <a href={BRAND.phoneHref} className="btn btn-accent btn-sm">
            ☎ {BRAND.phonePretty}
          </a>
          <a href="#quote" className="btn btn-outline btn-sm">
            Request Service
          </a>
        </div>
      </div>

      <div className="container pt-5 pb-8">
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
              Up-front pricing. Clean, professional work. From panel upgrades to
              EV chargers — we always get it done right the first time.
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
          <div className="card shadow-accent p-4 sm:p-6 lg:p-8">
            <div className="bg-white/10 border border-[var(--card-br)] rounded-xl backdrop-blur-md p-5 sm:p-6 lg:p-8 space-y-5">
              <div>
                <h2 className="text-lg font-semibold">Request Service</h2>
                <p className="text-sm text-[var(--muted)] mt-1">
                  Tell us what you need — we’ll respond quickly.
                </p>
              </div>

              <QuoteForm />

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={BRAND.phoneHref}
                  className="btn btn-accent flex-1 text-center"
                >
                  ☎ Call Now
                </a>
                <a href="#faq" className="btn btn-outline flex-1 text-center">
                  FAQs
                </a>
              </div>

              <div className="flex flex-wrap gap-2 text-[var(--muted)] text-sm">
                <span className="chip">✓ Background-Checked</span>
                <span className="chip">🛡 Warranty</span>
                <span className="chip">⚡ EV Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* divider to next section */}
      <div className="divider" />

      {/* single styled-jsx block */}
      <style jsx>{`
        .hero-section {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          min-height: min(90vh, 820px);
          display: block;
        }
        @supports (overflow: clip) {
          .hero-section {
            overflow: clip;
          }
        }

        /* BACKGROUND LAYER */
        .hero-bg {
          position: relative;
          width: 100%;
          height: auto;
        }
        .hero-bg-img {
          width: 100%;
          height: auto;
          object-fit: cover;
          object-position: center center;
          display: block;
        }

        /* top trust strip */
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

        /* hero bullets */
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