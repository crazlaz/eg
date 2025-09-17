"use client";

import { useMemo, useState } from "react";
import Section from "../components/Section";
import { SERVICES } from "../lib/services";
import { BRAND } from "../lib/brand";
import { formatPhone } from "../lib/phone";

type Lead = { name: string; phone: string; email: string; zip: string; service: string; notes: string; };
type Status = "idle" | "ok" | "err";

function Banner({ tone, children }: { tone: "success" | "error"; children: React.ReactNode }) {
  const styles = tone === "success"
    ? { background: "rgba(34,197,94,.15)", color: "#86efac", border: "1px solid rgba(34,197,94,.35)" }
    : { background: "rgba(239,68,68,.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,.35)" };
  return <div style={{ marginTop: ".75rem", borderRadius: ".75rem", padding: ".5rem .75rem", fontSize: ".9rem", ...styles }}>{children}</div>;
}

function TwoCol({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid" style={{ gap: ".75rem", gridTemplateColumns: "repeat(1, minmax(0,1fr))" }}>
      <style jsx>{`@media (min-width:640px){ .grid{ grid-template-columns: repeat(2, minmax(0,1fr)); } }`}</style>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { id, label, ...rest } = props;
  return (
    <div>
      <label htmlFor={id} style={{ display: "block", fontSize: ".9rem", marginBottom: ".25rem" }}>{label}</label>
      <input id={id} {...rest} className="field" />
    </div>
  );
}

export default function QuoteForm() {
  const [lead, setLead] = useState<Lead>({ name:"", phone:"", email:"", zip:"", service: SERVICES[0], notes:"" });
  const [status, setStatus] = useState<Status>("idle");
  const [loading, setLoading] = useState(false);
  const phonePretty = useMemo(() => formatPhone(BRAND.phone), []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setStatus("idle");
    const { name, value } = e.target;
    setLead(s => ({ ...s, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lead.name || !lead.phone || !lead.zip) { setStatus("err"); return; }
    try {
      setLoading(true);
      // TODO: hook to API/Email here
      await new Promise(r => setTimeout(r, 700));
      setStatus("ok");
      setLead({ name:"", phone:"", email:"", zip:"", service: SERVICES[0], notes:"" });
    } catch {
      setStatus("err");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="quote" className="card" style={{ padding: "1.25rem" }}>
      <div className="flex" style={{ alignItems:"center", justifyContent:"space-between", gap:"1rem" }}>
        <h2 style={{ fontSize:"1.25rem", fontWeight:700 }}>Get a Free Quote</h2>
        <span style={{ fontSize:".75rem", color:"var(--muted)" }}>No obligation</span>
      </div>

      {status === "ok" && <Banner tone="success">Thanks! We’ll reach out shortly.</Banner>}
      {status === "err" && (
        <Banner tone="error">Please check your info and try again, or call {phonePretty}.</Banner>
      )}

      <form onSubmit={onSubmit} className="mt-4 grid" style={{ gap: ".75rem" }}>
        <TwoCol>
          <Input id="name" name="name" label="Full name" value={lead.name} onChange={onChange} required placeholder="Jane Doe" />
          <Input id="phone" name="phone" label="Phone" type="tel" value={lead.phone} onChange={onChange} required placeholder="(980) 555-0143" />
        </TwoCol>
        <TwoCol>
          <Input id="email" name="email" label="Email" type="email" value={lead.email} onChange={onChange} placeholder="you@example.com" />
          <Input id="zip" name="zip" label="ZIP code" value={lead.zip} onChange={onChange} required placeholder="28202" />
        </TwoCol>

        <div>
          <label htmlFor="service" style={{ fontSize: ".9rem", marginBottom: ".25rem", display: "block" }}>Service needed</label>
          <select id="service" name="service" value={lead.service} onChange={onChange} className="field">
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="notes" style={{ fontSize: ".9rem", marginBottom: ".25rem", display: "block" }}>Briefly describe the issue</label>
          <textarea id="notes" name="notes" value={lead.notes} onChange={onChange} placeholder="Lights flickering, breaker tripping, need EV charger, etc." className="field" style={{ minHeight: 110, resize: "vertical" }} />
        </div>

        <button type="submit" className="btn btn-accent" disabled={loading}>
          {loading ? "Sending…" : "Get My Free Quote"}
        </button>
        <p style={{ color: "var(--muted)", fontSize: ".75rem" }}>
          By submitting, you agree to be contacted about your request.
        </p>
      </form>
    </div>
  );
}
