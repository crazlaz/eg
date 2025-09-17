"use client";

import { useState } from "react";

export default function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card">
      <button
        onClick={() => setOpen(v => !v)}
        style={{ width: "100%", textAlign: "left", padding: ".75rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: ".75rem" }}
      >
        <span style={{ fontWeight: 600 }}>{q}</span>
        <span style={{ color: "var(--muted)" }}>{open ? "–" : "+"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 1rem 1rem 1rem", color: "var(--muted)", fontSize: ".95rem" }}>
          {children}
        </div>
      )}
    </div>
  );
}
