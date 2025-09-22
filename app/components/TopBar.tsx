"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BRAND } from "../lib/brand";
import { formatPhone } from "../lib/phone";
import Image from "next/image"; // Import the Image component from Next.js

export default function TopBar({
  theme,
  setTheme,
}: {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerH, setHeaderH] = useState(52); // fallback
  const headerRef = useRef<HTMLElement | null>(null);

  // sticky shadow + back-to-top visibility
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // measure header height (for mobile fixed sheet top)
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

  // close mobile nav on hash change and lock body scroll
  useEffect(() => {
    const onHashChange = () => setMobileOpen(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  useEffect(() => {
    // lock body scroll when mobile menu open (only under 768px)
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky-header ${scrolled ? "scrolled" : ""}`}
        role="banner"
      >
        <div
          className="container"
          style={{
            height: "3.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <a href="#top" className="brand">
            {/* Replace BRAND.name with the Image component */}
            <Image
              src="/company.png" // Path to your logo in the public folder
              alt={BRAND.name} // Alt text for accessibility
              width={100} // Adjust width as needed
              height={32} // Adjust height as needed
              style={{ objectFit: "contain" }} // Ensures the image fits within the given dimensions
            />
          </a>

          <nav
            className="hide-on-mobile"
            aria-label="Main"
            style={{ display: "none", gap: "1rem", color: "var(--muted)", fontSize: ".95rem", alignItems: "center" }}
          >
            <a href="#services">Services</a>
            <a href="#quote">Quote</a>
            <a href="#faq">FAQ</a>
            <a href="#footer">Contact</a>
          </nav>

          <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
            <a href={BRAND.phoneHref} className="btn btn-accent hide-on-mobile" style={{ display: "none" }}>
              Call {formatPhone(BRAND.phone)}
            </a>

            <button
              onClick={toggleTheme}
              className="icon-btn"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path d="M12 4V2m0 20v-2M4 12H2m20 0h-2M5.64 5.64 4.22 4.22m15.56 15.56-1.42-1.42M18.36 5.64l1.42-1.42M4.22 19.78l1.42-1.42" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="4.5" fill="currentColor"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" fill="currentColor"/>
                </svg>
              )}
            </button>

            <button
              className="icon-btn show-on-mobile"
              aria-label="Toggle navigation"
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? (
                <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                  <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu — fixed sheet under header on mobile */}
        <div
          id="mobile-menu"
          className={`mobile-menu show-on-mobile ${mobileOpen ? "open" : ""} `}
          style={
            mobileOpen
              ? { position: "fixed", top: headerH, left: 0, right: 0, zIndex: 55 }
              : undefined
          }
        >
          <a href="#services">Services</a>
          <a href="#quote">Quote</a>
          <a href="#faq">FAQ</a>
          <a href="#footer">Contact</a>

        </div>

        <style jsx>{`
          .brand { text-decoration: none; color: inherit; display: flex; align-items: center; } /* Added display flex to align logo vertically */
          .sticky-header {
            position: sticky; top: 0; z-index: 60;
            backdrop-filter: saturate(120%) blur(8px);
            background: color-mix(in oklab, var(--bg), transparent 12%);
            transition: box-shadow 180ms ease, background 180ms ease;
          }
          .sticky-header.scrolled {
            box-shadow: 0 6px 20px rgba(0,0,0,.12);
            background: color-mix(in oklab, var(--bg), transparent 4%);
          }

          .icon-btn {
            display: inline-grid; place-items: center;
            width: 2.25rem; height: 2.25rem; border-radius: 999px;
            border: 1px solid var(--border); background: var(--bgElev); color: var(--fg);
          }
          .icon-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

          .mobile-menu {
            display: none;
            overflow: hidden;
            max-height: 0;
            transition: max-height 200ms ease;
            border-top: 1px solid var(--border);
            background: var(--bg);
          }
          .mobile-menu a { display: block; padding: 0.875rem 1rem; }
          .mobile-menu.open { max-height: 16rem; } /* used for desktop SSR fallback */

          .block { display: block !important; text-align: center; margin: 0.5rem 1rem 1rem; }
          .show-on-mobile { display: inline-flex; }

          @media (min-width: 768px) {
            .hide-on-mobile { display: inline-flex !important; }
            .show-on-mobile { display: none !important; }
            .mobile-menu { display: none !important; }
          }

          .btn { padding: 0.5rem 0.85rem; border-radius: 0.5rem; font-weight: 600; }
          .btn-accent { background: var(--accent); color: var(--onAccent); }

          :global(.back-to-top) {
            position: fixed; left: 1rem; bottom: 1rem; width: 2.4rem; height: 2.4rem;
            border-radius: 999px; border: 1px solid var(--border); background: var(--bgElev); color: var(--fg);
            display: grid; place-items: center; box-shadow: 0 6px 18px rgba(0,0,0,.15);
            opacity: 0; transform: translateY(10px); pointer-events: none;
            transition: opacity 180ms ease, transform 180ms ease; z-index: 70;
          }
          :global(.back-to-top.show) { opacity: 1; transform: translateY(0); pointer-events: auto; }
        `}</style>
      </header>

      {/* Back-to-top */}
      <button
        className={`back-to-top ${scrolled ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M12 19V5m0 0l-7 7m7-7l7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </>
  );
}