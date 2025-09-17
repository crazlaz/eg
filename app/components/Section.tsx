export default function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ padding: "2.5rem 0" }}>
      <div className="container">
        <h2 style={{ fontSize: "clamp(1.5rem, 1.2vw + 1rem, 2rem)", fontWeight: 700, letterSpacing: "-0.01em" }}>
          {title}
        </h2>
        <div style={{ marginTop: "1.25rem" }}>{children}</div>
      </div>
    </section>
  );
}
