"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BRAND } from "../lib/brand";
import Image from "next/image";
import Link from "next/link";
import Section from "../components/Section";
import Card from "../components/Card";
import TopBar from "../components/TopBar";

export default function AboutPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

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

  return (
    <main>
      {/* NAVIGATION */}
      <TopBar theme={theme} setTheme={setTheme} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-900 via-orange-800 to-yellow-500">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_95%,rgba(255,255,255,.05)_95%),linear-gradient(0deg,transparent_95%,rgba(255,255,255,.05)_95%)] bg-[length:24px_24px]" />
        </div>

        <div className="relative min-h-[60vh] flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-xl text-white">
              About {BRAND.name}
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-white/90">
              Powering homes and businesses across {BRAND.city} with safe,
              reliable, and high-quality electrical solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY */}
      <Section title="Our Story">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              Founded with a passion for honest work and reliable service,{" "}
              {BRAND.name} has been helping families and businesses keep the
              lights on in {BRAND.city} and the surrounding areas. Our team is
              fully licensed, insured, and dedicated to handling every project
              — big or small — with precision and care.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">
              From troubleshooting everyday electrical issues to installing
              advanced EV chargers, generators, and solar systems, we pride
              ourselves on providing solutions that last.
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
      <Section title="What We Stand For">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Safety First", icon: "🛡", text: "Every installation is completed with safety as the #1 priority." },
            { title: "Honest Pricing", icon: "💵", text: "Up-front, transparent estimates with no hidden fees or surprises." },
            { title: "Local Commitment", icon: "📍", text: `Proudly serving ${BRAND.city} and nearby communities we call home.` },
            { title: "Quality Work", icon: "⚡", text: "From wiring to solar, we deliver workmanship that lasts." },
            { title: "Customer Care", icon: "🤝", text: "Friendly, professional service that treats your home like our own." },
            { title: "Innovation", icon: "🔋", text: "We stay ahead with modern solutions like EV chargers and solar." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card title={item.title} icon={item.icon}>
                {item.text}
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
          Ready to Work With {BRAND.name}?
        </h2>
        <p className="mt-3 text-lg text-white/90 max-w-xl mx-auto">
          Whether it’s a small repair or a major installation, our team is here
          to help. Let’s make your home or business safer, smarter, and more
          efficient.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          <Link href={BRAND.phoneHref} className="btn btn-accent text-lg px-6 py-3">
            📞 Call {BRAND.phonePretty}
          </Link>
          <Link href="/#quote" className="btn btn-outline text-lg px-6 py-3">
            Request Service
          </Link>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer id="footer" className="border-t border-[var(--card-br)] bg-[var(--bgElev)] mt-12">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold">{BRAND.name}</h3>
              <p className="text-sm text-[var(--muted)] mt-1">{BRAND.city}</p>
              <p className="text-sm text-[var(--muted)]">{BRAND.license}</p>
              <div className="flex gap-3 mt-4">
                <Link href={BRAND.phoneHref} className="text-sm font-medium text-[var(--fg)] hover:text-[var(--accent)] transition">
                  📞 {BRAND.phonePretty}
                </Link>
                <Link href={BRAND.emailHref} className="text-sm font-medium text-[var(--fg)] hover:text-[var(--accent)] transition">
                  ✉ Email Us
                </Link>
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

          <div className="grid grid-cols-2 gap-4 text-sm mt-10">
            <div>
              <h4 className="font-semibold mb-2 text-[var(--fg)]">Navigation</h4>
              <ul className="space-y-1 text-[var(--muted)]">
                <li><Link href="/#services" className="hover:text-[var(--accent)]">Services</Link></li>
                <li><Link href="/about" className="hover:text-[var(--accent)]">About</Link></li>
                <li><Link href="/#quote" className="hover:text-[var(--accent)]">Request Quote</Link></li>
                <li><Link href="/#faq" className="hover:text-[var(--accent)]">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-[var(--fg)]">Legal</h4>
              <ul className="space-y-1 text-[var(--muted)]">
                <li><Link href="#">Privacy Policy</Link></li>
                <li><Link href="#">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--card-br)] mt-10 pt-4 text-xs text-[var(--muted)] text-center">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
        </div>
      </footer>

      <style jsx>{`
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </main>
  );
}
