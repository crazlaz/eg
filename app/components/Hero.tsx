"use client";

import Image from "next/image";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";

import { BRAND } from "../lib/brand";

// Swiper imports for the mini slideshow
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

// Mini slideshow images – now using your real project photos
const HERO_SLIDES = [
  // Wiring & Rewiring, Panels & Meters, Troubleshooting
  { src: "/real1.png", alt: "Commercial conduit and disconnects on a brick building" },
  { src: "/real2.png", alt: "Open meter base and panel showing organized wiring" },
  { src: "/real3.png", alt: "Generac standby generator installed outside a home" },

  // Lighting & Ceiling Fans (Existing list)
  { src: "/real4.png", alt: "Long interior space with recessed lighting" },
  { src: "/real5.png", alt: "Open kitchen and living area with coffered lighting" },

  // Panels & Meters, Troubleshooting
  { src: "/real6.png", alt: "EG Electric service van parked at a panel upgrade job" },

  // Missing images in your original data, included for completeness (assuming they exist)
  { src: "/real7.png", alt: "Residential service mast and meter" },
  { src: "/real8.png", alt: "Technician performing diagnostic check" },

  // Lighting & Ceiling Fans (Existing list)
  { src: "/real9.png", alt: "Luxury bathroom with cove lighting" },
  { src: "/real10.png", alt: "Vanity area with perimeter lighting" },

  // Solar System Installations
  { src: "/real11.png", alt: "Rooftop solar array with technician on the roof" },

  // Lighting & Ceiling Fans, Solar System Installations
  { src: "/real12.png", alt: "Built-ins with integrated lighting" },
  { src: "/real13.png", alt: "Multiple exterior electrical panels neatly piped (Solar disconnects)" },
  { src: "/real14.png", alt: "Flat-roof solar array installed on racking" },

  // Panels & Meters, Generators
  { src: "/real15.png", alt: "Service disconnects and meter for a modern home (Generator assembly)" },

  // Lighting & Ceiling Fans (Existing list)
  { src: "/real16.png", alt: "Staircase with step and accent lights" },
  { src: "/real17.png", alt: "Two-story living room with feature lighting" },

  // Generators, Troubleshooting
  { src: "/real18.png", alt: "EG Electric crew wiring a standby generator system" },

  // EV Chargers
  { src: "/real19.png", alt: "Tesla Powerwall and electrical equipment on an exterior wall" },

  // Lighting & Ceiling Fans (Existing list)
  { src: "/real20.png", alt: "High-end kitchen with task and accent lights" },
  { src: "/real21.png", alt: "Floating staircase with wall lighting" },
  { src: "/real22.png", alt: "Custom closet with lit shelving" },
];

export default function Hero({
  theme,
  setTheme,
}: {
  theme: "dark" | "light";
  setTheme: Dispatch<SetStateAction<"dark" | "light">>;
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
      <div className="container relative z-10">
        {/* Mini slideshow (project highlights) */}
        <div className="mt-6">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop
            className="relative rounded-xl overflow-hidden border border-[var(--card-br)]"
          >
            {HERO_SLIDES.map((img, i) => (
              <SwiperSlide key={`${img.src}-${i}`}>
                {/* Adjusted height for mobile: h-40 is smaller than h-48 */}
                <div className="relative w-full h-40 sm:h-56 md:h-64">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 text-white text-xs sm:text-sm drop-shadow">
                    {img.alt}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Light bulb above the words */}
        <div className="flex justify-center pt-8 mb-3">
          <LightBulbIcon
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-yellow-400 animate-pulse"
            style={{ filter: "drop-shadow(0 0 12px rgba(252, 202, 4, 0.99))" }}
            aria-hidden="true"
          />
        </div>

        {/* Second Headline is now centered */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase bg-gradient-to-l from-red-700 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight text-center">
          Quality is Our Priority
        </h2>

        {/* top trust strip (adjusted for better mobile stacking and centering) */}
        <div className="top-strip mt-3 mx-auto w-full max-w-xl">
          <span className="chip">
            <Dot /> Licensed • Insured • Local
          </span>
          {/* Added flex-1 to buttons to make them fill space on small screens */}
          <a href={BRAND.phoneHref} className="btn btn-accent btn-sm flex-1 sm:flex-none text-center">
            ☎ {BRAND.phonePretty}
          </a>
          <a href="#quote" className="btn btn-outline btn-sm flex-1 sm:flex-none text-center">
            Request Service
          </a>
        </div>
      </div>

      {/* main hero content */}
      <div className="container pt-5 pb-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-start mt-4">
          {/* Left: headline + bullets + badges (Now centered on mobile) */}
          <div className="text-center lg:text-left">
            {/* Chip is now centered on mobile */}
            <span className="chip mx-auto lg:mx-0">
              <Dot /> Licensed • Insured • Local
            </span>

            <h1
              className="mt-3 mx-auto lg:mx-0 max-w-xl" // Added max-w-xl and mx-auto for mobile centering
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

            {/* Paragraph is now centered on mobile */}
            <p className="mt-3 text-[1.1rem] mx-auto lg:mx-0 max-w-xl" style={{ color: "var(--muted)" }}>
              No surprises. Just safe, reliable power — installed the right way,
              the first time. From panel upgrades to EV chargers, we’ve got you.
            </p>

            {/* Buttons are centered on mobile */}
            <div className="mt-5 flex flex-wrap gap-3 justify-center lg:justify-start">
              <a href={BRAND.phoneHref} className="btn btn-accent">
                ☎ Call {BRAND.phonePretty}
              </a>
              <a href="#quote" className="btn btn-outline">
                Get Free Quote
              </a>
            </div>

            {/* bullets (Now centered on mobile) */}
            <ul className="mt-6 hero-bullets mx-auto lg:mx-0 max-w-md">
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

            {/* badges (Now centered on mobile) */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
              <span className="chip">⭐ Google — Leave a review!</span>
              <span className="chip">BBB A+</span>
              <span className="chip">⚡ EV Certified</span>
              <span className="chip">🔌 Generator Pro</span>
            </div>
          </div>

          {/* Right column intentionally left free for future form / promo card */}
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
          /* Adjusted flex-wrap to allow wrapping on smaller screens */
          flex-wrap: wrap; 
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border);
          background: color-mix(in oklab, var(--bgElev), black 5%);
          backdrop-filter: saturate(120%) blur(4px);
          border-radius: 0.75rem;
        }
        /* Centering the top strip content on mobile */
        @media (max-width: 639px) {
            .top-strip {
                justify-content: center;
            }
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
        /* Ensure bullets look good on smaller screens */
        @media (max-width: 400px) {
            .hero-bullets {
                grid-template-columns: repeat(1, minmax(0, 1fr));
            }
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