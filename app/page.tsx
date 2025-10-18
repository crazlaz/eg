"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { BRAND } from "../app/lib/brand";
import { formatPhone } from "../app/lib/phone";
import TopBar from "../app/components/TopBar";
import Hero from "../app/components/Hero";
import Section from "../app/components/Section";
import Card from "../app/components/Card";
import Quote from "../app/components/Quote";
import Faq from "../app/components/Faq";
import "leaflet/dist/leaflet.css";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import QuoteForm from "./components/QuoteForm";

/* ---------- SERVICE DATA ---------- */
const SERVICE_DATA: Record<
  string,
  { description: string; images: { src: string; alt: string }[] }
> = {
  "Wiring & Rewiring": {
    description:
      "From new construction to remodels, our expert wiring ensures safety, efficiency, and long-lasting performance in every connection.",
    images: [{ src: "/1.PNG", alt: "Wiring project" }],
  },
  "Panels & Meters": {
    description:
      "Power today’s appliances with confidence. We upgrade old panels and meters to modern systems that improve safety and reliability.",
    images: [{ src: "/3.PNG", alt: "Panel upgrade" }],
  },
  "EV Chargers": {
    description:
      "Charge at the speed of life. We install EV chargers that fit your vehicle and deliver fast, dependable charging at home.",
    images: [{ src: "/4.PNG", alt: "EV charger installation" }],
  },
  Generators: {
    description:
      "Be ready when the power fails. Our standby generators keep lights, HVAC, and essentials running no matter the storm.",
    images: [{ src: "/5.PNG", alt: "Backup generator" }],
  },
  "Solar System Installations": {
    description:
      "Harness the sun’s power with solar systems tailored to your home. Lower bills, reduce reliance on utilities, and invest in clean energy.",
    images: [{ src: "/6.JPEG", alt: "Solar installation" }],
  },
  "Lighting & Ceiling Fans": {
    description:
      "Brighten your world. From elegant interior fixtures to durable outdoor lighting, plus ceiling fans for comfort and efficiency.",
    images: [{ src: "/7.PNG", alt: "Lighting and ceiling fans" }],
  },
  Troubleshooting: {
    description:
      "Electrical mystery? Solved. We diagnose and repair issues quickly, restoring safety and peace of mind without the guesswork.",
    images: [{ src: "/8.PNG", alt: "Troubleshooting electrical issues" }],
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

      {/* GLOBAL SERVICES CAROUSEL */}
      <Section title="">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--fg)] tracking-tight">
            See the Difference With Our Work
          </h2>
          <p className="text-[var(--muted)] mt-2 max-w-2xl mx-auto">
            Real results from projects we’ve proudly completed across Charlotte
            & surrounding areas.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 1300, disableOnInteraction: false }}
          loop
          className="relative rounded-xl overflow-hidden shadow-2xl"
        >
          {Object.values(SERVICE_DATA)
            .flatMap((s) => s.images)
            .map((img, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-64 md:h-[32rem]">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </Section>

      {/* SERVICE ICON GRID */}
      <div id="services" className="mt-8">
        <h3 className="text-center text-lg md:text-xl font-semibold text-[var(--fg)] mb-4">
          Our Core Services
        </h3>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Object.keys(SERVICE_DATA).map((label) => (
            <li
              key={label}
              onClick={() => setSelected(label)}
              className="group relative overflow-hidden rounded-xl border border-[var(--card-br)] bg-[var(--bgElev)] p-3 flex items-center gap-3 hover:shadow-xl transition-shadow cursor-pointer"
            >
              ⚡
              <span className="font-bold text-sm md:text-[0.95rem] text-[var(--fg)]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

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

      {/* TESTIMONIALS */}
      <Section title="What Customers Say" id="testimonials">
        <div className="grid gap-4 md:grid-cols-3">
          <Quote name="T. Ramirez" city="Charlotte">
            Called in the morning, panel issue fixed by afternoon. Clean and
            professional.
          </Quote>
          <Quote name="K. Patel" city="Huntersville">
            They installed our EV charger fast and walked us through everything.
          </Quote>
          <Quote name="D. Moore" city="Concord">
            Fair price, neat work, and they even cleaned up afterwards.
            Recommended.
          </Quote>
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

      {/* FAQ */}
      <Section id="faq" title="FAQ">
        <div className="grid gap-4 md:grid-cols-2">
          <Faq q="Do you offer same-day service?">
            Yes — call us at {phonePretty}. We do our best to get a tech out
            same-day or next-day.
          </Faq>
          <Faq q="How do you price jobs?">
            After diagnosing, we provide a clear, up-front estimate before work
            begins.
          </Faq>
          <Faq q="Are you licensed and insured?">
            Absolutely. {BRAND.license}. All technicians are background-checked.
          </Faq>
          <Faq q="What payment methods do you accept?">
            Most major cards, debit, and bank. Ask about financing options.
          </Faq>
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
