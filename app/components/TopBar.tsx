"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BRAND } from "../lib/brand";
import { formatPhone } from "../lib/phone";
import Image from "next/image";
import Link from "next/link";

export default function TopBar({
  theme,
  setTheme,
}: {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerH, setHeaderH] = useState(52);
  const headerRef = useRef<HTMLElement | null>(null);

  // sticky shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // measure header height
  useLayoutEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderH(headerRef.current.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // close mobile nav on hash change
  useEffect(() => {
    const onHashChange = () => setMobileOpen(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // lock scroll when mobile menu open
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      document.body.style.overflow = mobileOpen ? "hidden" : "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        className={`sticky top-0 z-50 transition-shadow ${
          scrolled
            ? "bg-[color-mix(in_oklab,var(--bg),transparent_4%)] shadow-lg"
            : "bg-[color-mix(in_oklab,var(--bg),transparent_12%)]"
        } backdrop-blur-md`}
      >
        <div className="container flex h-14 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" aria-label={BRAND.name} className="flex items-center">
            <Image
              src={theme === "dark" ? "/company2.png" : "/company.png"}
              alt={BRAND.name}
              width={120}
              height={48}
              className="object-contain h-10 w-auto transition-opacity duration-300"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Main"
            className="hidden md:flex items-center gap-6 text-sm text-[var(--muted)]"
          >
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/#quote">Quote</Link>
            <Link href="/testimonials">Testimonials</Link>
            <Link href="/faq">FAQ</Link>

          </nav>

          <div className="flex items-center gap-2">
            {/* Desktop phone button */}
            <Link
              href={BRAND.phoneHref}
              className="hidden md:inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--bgElev)] px-3 py-1.5 text-sm font-medium text-[var(--fg)] hover:bg-[var(--bgHover)] transition"
            >
              Call {formatPhone(BRAND.phone)}
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="icon-btn"
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
              title={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path
                    d="M12 4V2m0 20v-2M4 12H2m20 0h-2M5.64 5.64 4.22 4.22m15.56 15.56-1.42-1.42M18.36 5.64l1.42-1.42M4.22 19.78l1.42-1.42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="icon-btn md:hidden"
              aria-label="Toggle navigation"
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6l-12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                  <path
                    d="M3 6h18M3 12h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-[max-height] duration-200 border-t border-[var(--border)] bg-[var(--bg)] ${
            mobileOpen ? "max-h-96" : "max-h-0"
          }`}
          style={
            mobileOpen
              ? {
                  position: "fixed",
                  top: headerH,
                  left: 0,
                  right: 0,
                  zIndex: 55,
                }
              : undefined
          }
        >
          <Link href="/services" className="block px-4 py-3">Services</Link>
          <Link href="/about" className="block px-4 py-3">About</Link>
          <Link href="/#quote" className="block px-4 py-3">Quote</Link>
          <Link href="/testimonials" className="block px-4 py-3">Testimonials</Link>
          <Link href="/faq" className="block px-4 py-3">FAQ</Link>
         

          <div className="p-4">
            <Link
              href={BRAND.phoneHref}
              className="w-full inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--bgElev)] px-4 py-2 text-base font-medium text-[var(--fg)] hover:bg-[var(--bgHover)] transition"
            >
              Call {formatPhone(BRAND.phone)}
            </Link>
          </div>
        </div>
      </header>

      {/* Back-to-top */}
      <button
        className={`back-to-top ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M12 19V5m0 0l-7 7m7-7l7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <style jsx>{`
        .icon-btn {
          display: inline-grid;
          place-items: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--bgElev);
          color: var(--fg);
        }
        .icon-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .back-to-top {
          position: fixed;
          left: 1rem;
          bottom: 1rem;
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--bgElev);
          color: var(--fg);
          display: grid;
          place-items: center;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
          transition: opacity 180ms ease, transform 180ms ease;
          z-index: 70;
        }
      `}</style>
    </>
  );
}
