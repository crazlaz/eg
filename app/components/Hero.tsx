"use client";

import QuoteForm from "../components/QuoteForm";
import { BRAND } from "../lib/brand";

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

/* Full-bleed background image with overlays */
function HeroBG() {
  return (
    <div aria-hidden={true} className="hero-bg">
      <img
        src="/ctl.jpg" /* ensure this file exists in /public */
        alt=""
        className="hero-bg-img"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="hero-section" aria-label="Hero">
      <HeroBG />

      {/* top trust strip */}
      <div className="container">
        <div className="top-strip">
          <span className="chip">Call Now for Fast Service</span>
          <a href={BRAND.phoneHref} className="btn btn-accent btn-sm">☎ {BRAND.phonePretty}</a>
          <a href="#quote" className="btn btn-outline btn-sm">Request Service</a>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "1.25rem", paddingBottom: "2rem" }}>
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

            <p className="mt-3" style={{ color: "var(--muted)", fontSize: "1.1rem" }}>
              Up-front pricing. Clean, professional work. From panel upgrades to EV chargers —
              we"ll get it done right the first time.
            </p>

            <div className="mt-5" style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
              <a href={BRAND.phoneHref} className="btn btn-accent">☎ Call {BRAND.phonePretty}</a>
              <a href="#quote" className="btn btn-outline">Get Free Quote</a>
            </div>

            {/* bullets: responsive grid */}
            <ul className="mt-6 hero-bullets">
              {[
                "Same-Day or Next-Day",
                "Up-Front Pricing",
                "5-Star Local Pros",
                "EV Charger Installs",
                "Panel Upgrades",
                "Emergency Service",
              ].map((t) => (
                <li key={t} className="pill">{t}</li>
              ))}
            </ul>

            {/* lightweight badges */}
            <div className="mt-6" style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
              <span className="chip">⭐ Google — Leave a review!</span>
              <span className="chip">BBB A+</span>
              <span className="chip">⚡ EV Certified</span>
              <span className="chip">🔌 Generator Pro</span>
            </div>
          </div>

          {/* Right: request form card */}
          <div className="card shadow-accent" style={{ padding: "1rem" }}>
            <div
              className="card"
              style={{
                display: "grid",
                gap: ".75rem",
                padding: "1rem",
                background: "linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.03))",
                border: "1px solid var(--card-br)",
                borderRadius: ".75rem",
                backdropFilter: "saturate(120%) blur(4px)",
              }}
            >
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Request Service</h2>
              <p style={{ color: "var(--muted)", fontSize: ".95rem", marginTop: "-.25rem" }}>
                Tell us what you need — we"ll respond quickly.
              </p>

              <QuoteForm />

              <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", alignItems: "center" }}>
                <a href={BRAND.phoneHref} className="btn btn-accent" style={{ flex: "1 1 auto", textAlign: "center" }}>
                  ☎ Call Now
                </a>
                <a href="#faq" className="btn btn-outline" style={{ flex: "1 1 auto", textAlign: "center" }}>
                  FAQs
                </a>
              </div>

              <div style={{ display: "flex", gap: ".5rem", color: "var(--muted)", fontSize: ".9rem", flexWrap: "wrap" }}>
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
          /* fallback + modern: avoid horizontal scroll on mobile */
          overflow: hidden;
          isolation: isolate;
          min-height: min(90vh, 820px);
          display: block;
        }
        @supports (overflow: clip) {
          .hero-section { overflow: clip; }
        }

        /* BACKGROUND LAYER */
        .hero-bg { position: absolute; inset: 0; z-index: -1; }
        .hero-bg-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; 
          object-position: center center;
          transform: scale(1.02);
          will-change: transform;
          z-index: 1;
        }
        .hero-bg-gradients {
          position: absolute; inset: 0;
          background:
            radial-gradient(60% 40% at 25% 10%,
              rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.45), transparent 60%),
            linear-gradient(180deg,
              rgba(0,0,0,0.25) 0%,
              rgba(0,0,0,0.55) 60%,
              rgba(0,0,0,0.72) 100%);
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 2;
        }
        .hero-bg-vignette {
          position: absolute; inset: -10%;
          background: radial-gradient(120% 70% at 50% 10%, transparent 0%, transparent 50%, rgba(0,0,0,.65) 100%);
          pointer-events: none;
          z-index: 3;
        }

        /* OVERLAY TEXT */
        .hero-overlay-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);
          font-weight: 800;
          text-align: center;
          letter-spacing: -0.02em;
          text-shadow: 
            2px 2px 4px rgba(0,0,0,0.8),
            0px 0px 20px rgba(0,0,0,0.6);
          pointer-events: none;
          z-index: 10;
          white-space: nowrap;
          opacity: 1;
        }

        /* top trust strip */
        .top-strip {
          margin-top: 0.75rem;
          display: flex; align-items: center; gap: .75rem; flex-wrap: wrap;
          padding: .5rem .75rem;
          border: 1px solid var(--border);
          background: color-mix(in oklab, var(--bgElev), black 5%);
          backdrop-filter: saturate(120%) blur(4px);
          border-radius: .75rem;
        }
        .btn-sm { padding: .35rem .7rem; }

        /* hero bullets: 2-up on phones, 3-up on md+ */
        .hero-bullets {
          display: grid;
          gap: .75rem;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          color: var(--muted);
          font-size: .95rem;
        }
        @media (min-width: 768px) {
          .hero-bullets { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        @media (max-width: 767px) {
          .hero-section { min-height: auto; }
          .hero-bg-img { object-position: center center; }
          .hero-overlay-text {
            font-size: clamp(1.8rem, 8vw, 3rem);
            white-space: normal;
            line-height: 1.1;
            padding: 0 1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-overlay-text {
            font-size: clamp(1.5rem, 7vw, 2.5rem);
          }
        }
      `}</style>
    </section>
  );
}