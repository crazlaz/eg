function Star() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 15.98l-5.2 2.72.99-5.78-4.21-4.1 5.82-.85L10 1.5z" />
    </svg>
  );
}

export default function Quote({
  name,
  city,
  children,
}: {
  name: string;
  city: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card" style={{ padding: "1.1rem" }}>
      <div style={{ display: "flex", color: "#fbbf24", gap: ".25rem" }} aria-hidden>
        <Star /><Star /><Star /><Star /><Star />
      </div>
      <p style={{ marginTop: ".5rem", color: "var(--fg)" }}>“{children}”</p>
      <div style={{ marginTop: ".25rem", fontSize: ".9rem", color: "var(--muted)" }}>
        — {name}, {city}
      </div>
    </div>
  );
}
