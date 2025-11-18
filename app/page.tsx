"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { BRAND } from "../app/lib/brand";
import { formatPhone } from "../app/lib/phone";
import TopBar from "../app/components/TopBar";
import Hero from "../app/components/Hero";
import Section from "../app/components/Section";
import Card from "../app/components/Card";
import "leaflet/dist/leaflet.css";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import QuoteForm from "./components/QuoteForm";

/* ---------- SERVICE DATA (UPDATED WITH real1–real22.png) ---------- */
const SERVICE_DATA: Record<
  string,
  { description: string; images: { src: string; alt: string }[] }
> = {
  "Wiring & Rewiring": {
    description:
      "From clean commercial conduit runs to full home rough-ins and remodels, we handle wiring that’s safe, code-compliant, and built to last.",
    images: [
      {
        src: "/real1.png",
        alt: "Commercial conduit and disconnects on a brick building",
      },
      {
        src: "/real13.png",
        alt: "Multiple exterior electrical panels neatly piped",
      },
      {
        src: "/real2.png",
        alt: "Open meter base and panel showing organized wiring",
      },
    ],
  },
  "Panels & Meters": {
    description:
      "Service upgrades, meter changes, and panel replacements done right — clean terminations, labeled circuits, and modern protection.",
    images: [
      {
        src: "/real2.png",
        alt: "Meter base and panel interior with breaker layout",
      },
      {
        src: "/real15.png",
        alt: "Service disconnects and meter for a modern home",
      },
      {
        src: "/real6.png",
        alt: "EG Electric service van parked at a panel upgrade job",
      },
    ],
  },
  "EV Chargers": {
    description:
      "Ready for your next vehicle. We install dedicated EV charging circuits and equipment, including integration with home backup and storage.",
    images: [
      {
        src: "/real19.png",
        alt: "Tesla Powerwall and electrical equipment on an exterior wall",
      },
      {
        src: "/real2.png",
        alt: "Panel and disconnect layout prepared for EV charging loads",
      },
    ],
  },
  Generators: {
    description:
      "Automatic standby generators that keep your lights, HVAC, and essentials running when the grid goes down — installed, wired, and tested by pros.",
    images: [
      {
        src: "/real3.png",
        alt: "Generac standby generator installed outside a home",
      },
      {
        src: "/real18.png",
        alt: "EG Electric crew wiring a standby generator system",
      },
      {
        src: "/real15.png",
        alt: "Generator service disconnects and meter assembly",
      },
    ],
  },
  "Solar System Installations": {
    description:
      "Complete solar installs from roof arrays to inverters and interconnection. Clean layouts that look as good as they perform.",
    images: [
      {
        src: "/real11.png",
        alt: "Rooftop solar array with technician on the roof",
      },
      {
        src: "/real14.png",
        alt: "Flat-roof solar array installed on racking",
      },
      {
        src: "/real13.png",
        alt: "Exterior solar disconnects and equipment on a stone wall",
      },
    ],
  },
  "Lighting & Ceiling Fans": {
    description:
      "Luxury lighting, accent strips, recessed cans, and ceiling fans — from modern great rooms to custom closets, we make spaces feel finished.",
    images: [
      {
        src: "/real4.png",
        alt: "Long interior space with rows of recessed ceiling lights",
      },
      {
        src: "/real5.png",
        alt: "Large open kitchen and living area with coffered lit ceiling",
      },
      {
        src: "/real16.png",
        alt: "Staircase with step lighting and ceiling accent lights",
      },
      {
        src: "/real17.png",
        alt: "Two-story living room with feature lighting and tall fireplace",
      },
      {
        src: "/real9.png",
        alt: "Luxury bathroom with cove lighting around a freestanding tub",
      },
      {
        src: "/real10.png",
        alt: "Large vanity area with mirror and perimeter lighting",
      },
      {
        src: "/real12.png",
        alt: "Built-in cabinets with integrated shelf and under-cabinet lighting",
      },
      {
        src: "/real20.png",
        alt: "High-end kitchen with integrated task and accent lighting",
      },
      {
        src: "/real21.png",
        alt: "Floating staircase with vertical wall and floor lighting",
      },
      {
        src: "/real22.png",
        alt: "Custom closet with lit shelving and island display",
      },
    ],
  },
  Troubleshooting: {
    description:
      "Breakers tripping, lights flickering, outlets dead, or equipment acting up? We track down the fault and fix it safely and efficiently.",
    images: [
      {
        src: "/real1.png",
        alt: "Exterior electrical equipment ready for inspection and testing",
      },
      {
        src: "/real2.png",
        alt: "Open electrical gear during diagnostic work",
      },
      {
        src: "/real18.png",
        alt: "Technicians working on generator and panel wiring",
      },
      {
        src: "/real6.png",
        alt: "EG Electric van on site for a troubleshooting call",
      },
    ],
  },
};

/* ---------- SERVICE MODAL ---------- */
function ServiceModal({
  open,
  onClose,
  service,
}: {
  open: boolean;
  onClose: () => void;
  service: string;
}) {
  if (!service) return null;

  const data = SERVICE_DATA[service];
  if (!data) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden />

      <div className="relative bg-[var(--bgElev)] rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-[var(--card-br)]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image(s) */}
          <div>
            {data.images.length > 1 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop
                className="rounded-xl overflow-hidden shadow-lg"
              >
                {data.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-56 md:h-72 object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img
                src={data.images[0].src}
                alt={data.images[0].alt}
                className="rounded-xl w-full h-56 md:h-72 object-cover shadow-lg"
              />
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <p className="text-[0.95rem] text-white leading-relaxed">
              {data.description}
            </p>
            <a
              href={BRAND.phoneHref}
              className="btn btn-accent mt-4 self-start"
            >
              Call for {service} Quote
            </a>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

/* ---------- MAIN PAGE ---------- */
export default function Page() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [modal, setModal] = useState<"privacy" | "terms" | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("eg-theme") as "dark" | "light" | null) ?? null;
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("eg-theme", theme);
  }, [theme]);

  const phonePretty = formatPhone(BRAND.phone);

  return (
    <main>
      <TopBar theme={theme} setTheme={setTheme} />
      <Hero theme={theme} setTheme={setTheme} />
      <div className="divider" />

      {/* WHY US */}
      <Section title="Why Homeowners Choose EG ELECTRIC">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="Fast Scheduling" icon="⏱">
            Same-day or next-day appointments. We arrive on time, ready to work.
          </Card>
          <Card title="Up-Front Pricing" icon="💵">
            Clear estimates before work begins. No surprises at checkout.
          </Card>
          <Card title="Quality You Can Trust" icon="🏅">
            Licensed, insured, background-checked electricians. Clean, safe
            work.
          </Card>
        </div>
      </Section>

      {/* SERVICE AREA */}
      <Section title="Proudly Serving The Carolinas!">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Service Areas" icon="📍">
            <ul className="grid gap-1 mt-1 text-[0.95rem] text-[var(--muted)] grid-cols-1 sm:grid-cols-2">
              {[
                "Charlotte",
                "Huntersville",
                "Concord",
                "Matthews",
                "Gastonia",
                "Cornelius",
                "Harrisburg",
                "Mint Hill",
              ].map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </Card>

          <div className="card p-4">
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[var(--card-br)]">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-81.05,35.05,-80.65,35.35&layer=mapnik&marker=35.2271,-80.8431"
                style={{ border: 0 }}
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* REQUEST SERVICE */}
      <section id="quote" className="container py-12">
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
      </section>

      {/* FOOTER */}
      <footer
        id="footer"
        className="border-t border-[var(--card-br)] bg-[var(--bgElev)]"
      >
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
                <a
                  href={BRAND.emailHref}
                  className="text-sm font-medium text-[var(--fg)] hover:text-[var(--accent)] transition"
                >
                  ✉ Email Us
                </a>
              </div>
            </div>

            <div className="flex-shrink-0">
              {theme === "dark" ? (
                <Image
                  src="/company2.png"
                  alt={`${BRAND.name} logo dark`}
                  width={220}
                  height={80}
                  className="h-16 w-auto object-contain"
                />
              ) : (
                <Image
                  src="/company.png"
                  alt={`${BRAND.name} logo light`}
                  width={220}
                  height={80}
                  className="h-16 w-auto object-contain"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mt-8">
            <div>
              <h4 className="font-semibold mb-2 text-[var(--fg)]">Navigation</h4>
              <ul className="space-y-1 text-[var(--muted)]">
                <li>
                  <a href="#services" className="hover:text-[var(--accent)]">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#quote" className="hover:text-[var(--accent)]">
                    Request Quote
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[var(--accent)]">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#top" className="hover:text-[var(--accent)]">
                    Back to Top
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-[var(--fg)]">Legal</h4>
              <ul className="space-y-1 text-[var(--muted)]">
                <li>
                  <button
                    onClick={() => setModal("privacy")}
                    className="hover:text-[var(--accent)] transition"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModal("terms")}
                    className="hover:text-[var(--accent)] transition"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--card-br)] mt-8 pt-4 text-xs text-[var(--muted)] text-center">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* PRIVACY/TERMS MODAL */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-[var(--bg)] text-[var(--fg)] rounded-xl shadow-lg max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(null)}
              className="absolute top-3 right-3 text-[var(--muted)] hover:text-[var(--accent)]"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-3">
              {modal === "privacy" ? "Privacy Policy" : "Terms of Service"}
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {modal === "privacy"
                ? "We respect your privacy. Any personal information you provide will only be used to deliver our services."
                : "By using our services, you agree to our terms and conditions. We strive to deliver safe, reliable work."}
            </p>
          </div>
        </div>
      )}

      {/* SERVICE DETAIL MODAL */}
      {selected && (
        <ServiceModal
          open={!!selected}
          onClose={() => setSelected(null)}
          service={selected}
        />
      )}
    </main>
  );
}
