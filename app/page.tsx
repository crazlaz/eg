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
import { SERVICES } from "../app/lib/services";
import "leaflet/dist/leaflet.css";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const serviceImages = [
  { src: "/1.PNG", alt: "Electrical work photo 1" },
  { src: "/3.PNG", alt: "Electrical work photo 3" },
  { src: "/4.PNG", alt: "Electrical work photo 4" },
  { src: "/5.PNG", alt: "Electrical work photo 5" },
  { src: "/6.JPEG", alt: "Electrical work photo 6" },
  { src: "/7.PNG", alt: "Electrical work photo 7" },
  { src: "/8.PNG", alt: "Electrical work photo 8" },
];

function getServiceImages(serviceIndex: number) {
  const imagesPerService = Math.floor(serviceImages.length / SERVICES.length);
  const startIndex = serviceIndex * imagesPerService;
  const endIndex = startIndex + imagesPerService;
  const assignedImages = serviceImages.slice(startIndex, endIndex);

  if (assignedImages.length === 0 && serviceIndex === SERVICES.length - 1) {
    return serviceImages.slice(SERVICES.length - 1);
  }
  return assignedImages.length > 0 ? assignedImages : [serviceImages[0]];
}

function generateServiceDescription(service: string) {
  const s = service.toLowerCase();
  if (s.includes("wiring")) return "From new construction to remodels, our expert wiring ensures safety, efficiency, and long-lasting performance in every connection.";
  if (s.includes("panel") || s.includes("meter")) return "Power today’s appliances with confidence. We upgrade old panels and meters to modern systems that improve safety and reliability.";
  if (s.includes("ev")) return "Charge at the speed of life. We install EV chargers that fit your vehicle and deliver fast, dependable charging at home.";
  if (s.includes("generator")) return "Be ready when the power fails. Our standby generators keep lights, HVAC, and essentials running no matter the storm.";
  if (s.includes("solar")) return "Harness the sun’s power with solar systems tailored to your home. Lower bills, reduce reliance on utilities, and invest in clean energy.";
  if (s.includes("lighting")) return "Brighten your world. From elegant interior fixtures to durable outdoor lighting, we design and install lighting that enhances every space.";
  if (s.includes("troubleshooting") || s.includes("repair")) return "Electrical mystery? Solved. We diagnose and repair issues quickly, restoring safety and peace of mind without the guesswork.";
  if (s.includes("outlet") || s.includes("switch")) return "Upgrade your everyday. Whether it’s modern outlets, smart switches, or added circuits, we make sure power is always where you need it.";
  if (s.includes("ceiling fan")) return "Stay cool in style. Our ceiling fan installs balance comfort and efficiency with safe, expert wiring and mounting.";
  if (s.includes("inspection")) return "Buy or remodel with confidence. Our detailed electrical inspections uncover hidden hazards and keep your property code-compliant.";
  return "Expert electrical services tailored to your needs, from simple fixes to complete system upgrades.";
}

/* ---------- SERVICE MODAL ---------- */
function ServiceModal({
  open,
  onClose,
  service,
  index,
}: {
  open: boolean;
  onClose: () => void;
  service: string;
  index: number;
}) {
  if (!service) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden />
      <div className="relative bg-[var(--bgElev)] rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-[var(--card-br)]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div>
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              loop
              className="rounded-xl overflow-hidden shadow-lg"
            >
              {getServiceImages(index).map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-56 md:h-72 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-[0.95rem] text-white leading-relaxed">
              {generateServiceDescription(service)}
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

export default function Page() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [modal, setModal] = useState<"privacy" | "terms" | null>(null);
  const [selected, setSelected] = useState<{ service: string; index: number } | null>(null);

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
            Real results from projects we’ve proudly completed across Charlotte & surrounding areas.
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
          {serviceImages.map((img, i) => (
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
          {SERVICES.map((label, i) => (
            <li
              key={label}
              onClick={() => setSelected({ service: label, index: i })}
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
            Licensed, insured, background-checked electricians. Clean, safe work.
          </Card>
        </div>
      </Section>



      {/* TESTIMONIALS */}
      <Section title="What Customers Say" id="testimonials">
        <div className="grid gap-4 md:grid-cols-3">
          <Quote name="T. Ramirez" city="Charlotte">
            Called in the morning, panel issue fixed by afternoon. Clean and professional.
          </Quote>
          <Quote name="K. Patel" city="Huntersville">
            They installed our EV charger fast and walked us through everything.
          </Quote>
          <Quote name="D. Moore" city="Concord">
            Fair price, neat work, and they even cleaned up afterwards. Recommended.
          </Quote>
        </div>
      </Section>

      {/* SERVICE AREA */}
      <Section title="Proudly Serving Greater Charlotte">
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
            Yes — call us at {phonePretty}. We do our best to get a tech out same-day or next-day.
          </Faq>
          <Faq q="How do you price jobs?">
            After diagnosing, we provide a clear, up-front estimate before work begins.
          </Faq>
          <Faq q="Are you licensed and insured?">
            Absolutely. {BRAND.license}. All technicians are background-checked.
          </Faq>
          <Faq q="What payment methods do you accept?">
            Most major cards, debit, and bank. Ask about financing options.
          </Faq>
        </div>
      </Section>

      {/* FOOTER */}
      <footer id="footer" className="border-t border-[var(--card-br)] bg-[var(--bgElev)]">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold">{BRAND.name}</h3>
              <p className="text-sm text-[var(--muted)] mt-1">{BRAND.city}</p>
              <p className="text-sm text-[var(--muted)]">{BRAND.license}</p>
              <div className="flex gap-3 mt-4">
                <a href={BRAND.phoneHref} className="text-sm font-medium text-[var(--fg)] hover:text-[var(--accent)] transition">
                  📞 {BRAND.phonePretty}
                </a>
                <a href={BRAND.emailHref} className="text-sm font-medium text-[var(--fg)] hover:text-[var(--accent)] transition">
                  ✉ Email Us
                </a>
              </div>
            </div>

            <div className="flex-shrink-0">
              {theme === "dark" ? (
                <Image src="/company2.png" alt={`${BRAND.name} logo dark`} width={220} height={80} className="h-16 w-auto object-contain" />
              ) : (
                <Image src="/company.png" alt={`${BRAND.name} logo light`} width={220} height={80} className="h-16 w-auto object-contain" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mt-8">
            <div>
              <h4 className="font-semibold mb-2 text-[var(--fg)]">Navigation</h4>
              <ul className="space-y-1 text-[var(--muted)]">
                <li><a href="#services" className="hover:text-[var(--accent)]">Services</a></li>
                <li><a href="#quote" className="hover:text-[var(--accent)]">Request Quote</a></li>
                <li><a href="#faq" className="hover:text-[var(--accent)]">FAQ</a></li>
                <li><a href="#top" className="hover:text-[var(--accent)]">Back to Top</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-[var(--fg)]">Legal</h4>
              <ul className="space-y-1 text-[var(--muted)]">
                <li><button onClick={() => setModal("privacy")} className="hover:text-[var(--accent)] transition">Privacy Policy</button></li>
                <li><button onClick={() => setModal("terms")} className="hover:text-[var(--accent)] transition">Terms of Service</button></li>
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setModal(null)}>
          <div className="bg-[var(--bg)] text-[var(--fg)] rounded-xl shadow-lg max-w-lg w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModal(null)} className="absolute top-3 right-3 text-[var(--muted)] hover:text-[var(--accent)]">✕</button>
            <h3 className="text-lg font-bold mb-3">{modal === "privacy" ? "Privacy Policy" : "Terms of Service"}</h3>
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
          service={selected.service}
          index={selected.index}
        />
      )}
    </main>
  );
}
