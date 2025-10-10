"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "../lib/brand";
import Image from "next/image";
import Link from "next/link";
import Section from "../components/Section";
import Card from "../components/Card";
import TopBar from "../components/TopBar";

export default function AboutPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [expanded, setExpanded] = useState(false);

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

  const fullAbout = `⚡ About EG ELECTRIC, LLC
EG ELECTRIC, LLC, based in Indian Trail, North Carolina, is a licensed and trusted electrical contractor dedicated to delivering high-quality residential and commercial electrical services. We specialize in a wide range of solutions designed to meet the evolving needs of our clients, with a strong emphasis on safety, reliability, and craftsmanship.
Our Services
We offer expert electrical services including:
• Wiring: Comprehensive wiring solutions for new construction, custom homes, renovations, additions, and repairs.
• Service Upgrades: Professional panel upgrades to enhance capacity and ensure code compliance.
• EV Charger Installations: Safe and efficient installation of electric vehicle charging stations.
• Generators: Backup power solutions to keep your home or business running during outages.
• Solar System Installations: Sustainable energy options tailored to your property and energy goals.
Why Choose Us
At EG ELECTRIC, we prioritize the quality of our work above all else. Our team is committed to delivering precise, code-compliant installations and repairs that stand the test of time. We take pride in our attention to detail, transparent communication, and dedication to customer satisfaction.
Whether you're building a new home, upgrading your electrical system, or investing in renewable energy, EG ELECTRIC is your dependable partner for professional and personalized service.`;

  const preview = fullAbout.slice(0, 250) + "...";

  // Helper to highlight keywords dynamically
  const highlight = (text: string) => {
    const keywords = [
      "licensed",
      "trusted",
      "high-quality",
      "residential",
      "commercial",
      "safety",
      "reliability",
      "craftsmanship",
      "wiring",
      "EV Charger",
      "Generators",
      "Solar",
      "quality",
      "precision",
      "customer",
      "dependable",
      "renewable",
    ];
    let result = text;
    keywords.forEach((word) => {
      const regex = new RegExp(`\\b(${word})\\b`, "gi");
      result = result.replace(
        regex,
        `<span class='highlight'>${word}</span>`
      );
    });
    return result;
  };

  return (
    <main>
      {/* NAVIGATION */}
      <TopBar theme={theme} setTheme={setTheme} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-900 via-orange-700 to-yellow-500">
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(90deg,transparent_95%,rgba(255,255,255,.05)_95%),linear-gradient(0deg,transparent_95%,rgba(255,255,255,.05)_95%)] bg-[length:24px_24px]" />
        </div>

        <div className="relative min-h-[60vh] flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] text-white">
              About{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 bg-clip-text text-transparent">
                {BRAND.name}
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-white/90">
              Powering homes and businesses across{" "}
              <span className="text-yellow-300 font-semibold">
                {BRAND.city}
              </span>{" "}
              with safe, reliable, and high-quality electrical solutions ⚡
            </p>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION (with Read More toggle) */}
      <Section title="About EG ELECTRIC ⚙️">
        <motion.div
          className="text-lg leading-relaxed text-[var(--muted)] max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={expanded ? "expanded" : "preview"}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="whitespace-pre-line prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: expanded
                  ? highlight(fullAbout)
                  : highlight(preview),
              }}
            />
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(!expanded)}
            className="mt-5 px-5 py-2 font-semibold text-[var(--fg)] border-2 border-[var(--accent)] rounded-full hover:bg-[var(--accent)] hover:text-black transition-all shadow-[0_0_15px_rgba(255,200,100,0.5)]"
          >
            {expanded ? "Hide Details ▲" : "Read More ▼"}
          </motion.button>
        </motion.div>
      </Section>

      {/* OUR STORY */}
      <Section title="Our Story 💡">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              Founded with a spark of passion for honest work and reliable
              service, <span className="text-[var(--accent)]">{BRAND.name}</span>{" "}
              keeps {BRAND.city} glowing one project at a time. Our team is
              fully licensed, insured, and built on precision, trust, and pride.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">
              From small fixes to solar setups, we don’t just wire — we
              energize. Every system, every panel, every job: done right, done
              bright.
            </p>
          </motion.div>

          {/* Illustration */}
          <motion.div
            className="relative rounded-xl overflow-hidden shadow-2xl flex items-center justify-center bg-gradient-to-br from-red-950 via-orange-900 to-yellow-700 p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              className="w-full h-72 text-yellow-400 animate-pulse-slow"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            >
              <circle cx="100" cy="60" r="20" fill="currentColor" />
              <rect x="80" y="80" width="40" height="60" rx="8" />
              <line x1="60" y1="150" x2="140" y2="150" strokeWidth="6" />
              <path d="M60 150 L50 190" strokeWidth="6" />
              <path d="M140 150 L150 190" strokeWidth="6" />
              <path
                d="M120 40 L140 10 L130 40 L150 40 L120 80"
                stroke="gold"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </motion.div>
        </div>
      </Section>

      {/* VALUES */}
      <Section title="What We Stand For ⚡">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Safety First",
              icon: "🛡",
              text: "Every installation is completed with safety as the #1 priority.",
            },
            {
              title: "Honest Pricing",
              icon: "💵",
              text: "Up-front, transparent estimates with no hidden fees or surprises.",
            },
            {
              title: "Local Commitment",
              icon: "📍",
              text: `Proudly serving ${BRAND.city} and nearby communities we call home.`,
            },
            {
              title: "Quality Work",
              icon: "⚡",
              text: "From wiring to solar, we deliver workmanship that lasts.",
            },
            {
              title: "Customer Care",
              icon: "🤝",
              text: "Friendly, professional service that treats your home like our own.",
            },
            {
              title: "Innovation",
              icon: "🔋",
              text: "We stay ahead with modern solutions like EV chargers and solar.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotate: Math.sin(i) * 1.5,
              }}
            >
              <Card title={`${item.icon} ${item.title}`}>
                <span className="text-[var(--muted)]">{item.text}</span>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CALL TO ACTION */}
      <motion.section
        className="relative py-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-800 via-orange-600 to-yellow-500 opacity-90 blur-3xl" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
          Ready to Work With{" "}
          <span className="text-yellow-300">{BRAND.name}</span>?
        </h2>
        <p className="mt-3 text-lg text-white/90 max-w-xl mx-auto">
          Whether it’s a small repair or a major installation, our crew is ready
          to bring the power — safely, cleanly, and efficiently ⚙️
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          <Link
            href={BRAND.phoneHref}
            className="btn btn-accent text-lg px-6 py-3 shadow-[0_0_15px_rgba(255,200,100,0.6)] hover:scale-105 transition-all"
          >
            📞 Call {BRAND.phonePretty}
          </Link>
          <Link href="/#quote" className="btn btn-outline text-lg px-6 py-3">
            Request Service
          </Link>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer
        id="footer"
        className="border-t border-[var(--card-br)] bg-[var(--bgElev)] mt-12"
      >
        <div className="container py-12 text-sm text-[var(--muted)] text-center">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved ⚡
        </div>
      </footer>

      <style jsx>{`
        .highlight {
          background: linear-gradient(90deg, #ffcc33, #ff8844, #ffcc33);
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 600;
          text-shadow: 0 0 10px rgba(255, 200, 100, 0.3);
          animation: glow 3s ease-in-out infinite alternate;
        }
        @keyframes glow {
          from {
            opacity: 0.8;
          }
          to {
            opacity: 1;
            text-shadow: 0 0 15px rgba(255, 200, 100, 0.6);
          }
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
      `}</style>
    </main>
  );
}
