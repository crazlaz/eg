"use client";

import { useEffect, useState } from "react";
import { BRAND } from "../app/lib/brand";
import { formatPhone } from "../app/lib/phone";
import TopBar from "../app/components/TopBar";
import Hero from "../app/components/Hero";
import Section from "../app/components/Section";
import Card from "../app/components/Card";
import Quote from "../app/components/Quote";
import Faq from "../app/components/Faq";
import { SERVICES } from "../app/lib/services";

// Define the array of 8 images (1.png to 8.png)
const serviceImages = [
  { src: '/1.png`', alt: 'Electrical work photo 1' },
  { src: '/2.png', alt: 'Electrical work photo 2' },
  { src: '/3.png', alt: 'Electrical work photo 3' },
  { src: '/4.png', alt: 'Electrical work photo 4' },
  { src: '/5.png', alt: 'Electrical work photo 5' },
  { src: '/6.png', alt: 'Electrical work photo 6' },
  { src: '/7.png', alt: 'Electrical work photo 7' },
  { src: '/8.png', alt: 'Electrical work photo 8' },
];

export default function Page() {
  // theme toggle lives here and is passed to TopBar
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const saved = (localStorage.getItem("eg-theme") as "dark" | "light" | null) ?? null;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("eg-theme", theme);
  }, [theme]);

  const phonePretty = formatPhone(BRAND.phone);

  return (
    <main>
      <TopBar theme={theme} setTheme={setTheme} />
      <Hero />

      <div className="divider" />

      {/* SERVICES - Now iterating to create a Section for EACH service */}
      {SERVICES.map((service, index) => (
        <Section 
          key={service} 
          id={service.toLowerCase().replace(/\s/g, "-").replace(/&/g, "and")} // Create a clean ID for navigation
          title={service}
        >
          {/* Card can be used here to display details and photos for the specific service */}
          <div className="grid" style={{ gap: "1rem", gridTemplateColumns: "repeat(2, minmax(0,1fr))" }}>
            <Card 
              key={service} 
              title={service}
              // Pass the images to the card in the first service section for demonstration
              images={index === 0 ? serviceImages : []} 
            >
              <p style={{ color: "var(--muted)", fontSize: ".95rem" }}>
                Professional diagnosis and repair for {service.toLowerCase()} with up-front pricing.
                We handle all aspects of {service.toLowerCase()} to ensure your home is safe and compliant.
              </p>
              {/* Optional: Add a second card for a call-to-action */}
              <a href={BRAND.phoneHref} className="btn btn-accent" style={{ marginTop: '1rem', display: 'inline-block' }}>
                Call for {service} Quote
              </a>
            </Card>

            {/* Placeholder for another content block, like an image or map, next to the card */}
            <div className="card" style={{ padding: "1rem" }}>
                <div className="grid place-items-center" style={{ width: "100%", aspectRatio: "16/10", borderRadius: "0.75rem", border: "1px solid var(--card-br)", background: "var(--bgElev)", color: "var(--muted)" }}>
                    {service} Image/Diagram
                </div>
            </div>
          </div>
        </Section>
      ))}
      
      {/* WHY US - Now separated from the service sections */}
      <Section title="Why Homeowners Choose EG ELECTRIC">
        <div className="grid" style={{ gap: "1rem", gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}>
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
      <Section title="What Customers Say">
        <div className="grid" style={{ gap: "1rem", gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}>
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
        <div className="grid" style={{ gap: "1rem", gridTemplateColumns: "repeat(2, minmax(0,1fr))" }}>
          <Card title="Service Areas" icon="📍">
            <ul className="grid" style={{ marginTop: ".25rem", gap: ".25rem", gridTemplateColumns: "repeat(2, minmax(0,1fr))", color: "var(--muted)", fontSize: ".95rem" }}>
              {["Charlotte","Huntersville","Concord","Matthews","Gastonia","Cornelius","Harrisburg","Mint Hill"].map(c => <li key={c}>• {c}</li>)}
            </ul>
          </Card>
          <div className="card" style={{ padding: "1rem" }}>
            <div className="grid place-items-center" style={{ width: "100%", aspectRatio: "16/10", borderRadius: "0.75rem", border: "1px solid var(--card-br)", background: "linear-gradient(135deg, rgba(255,255,255,.04), rgba(255,255,255,.02))", color: "var(--muted)" }}>
              Service Area Map
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="FAQ">
        <div className="grid" style={{ gap: "1rem", gridTemplateColumns: "repeat(2, minmax(0,1fr))" }}>
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
      <footer id="footer" style={{ borderTop: "1px solid var(--card-br)" }}>
        <div className="container" style={{ padding: "2rem 0" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>{BRAND.name}</div>
                <div style={{ fontSize: ".9rem", color: "var(--muted)" }}>{BRAND.city}</div>
                <div style={{ fontSize: ".9rem", color: "var(--muted)" }}>{BRAND.license}</div>
              </div>
              <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
                <a href={BRAND.phoneHref} className="btn btn-accent">Call {phonePretty}</a>
                <a href={BRAND.emailHref} className="btn btn-outline">Email Us</a>
              </div>
            </div>
            <div style={{ fontSize: ".75rem", color: "var(--muted)" }}>
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}