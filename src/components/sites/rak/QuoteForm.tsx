"use client";

import { useState } from "react";
import { Arrow } from "./Art";
import { company, services } from "./content";
import { Roll } from "./Nav";

/**
 * Front-end form. There is no backend yet: when a real company email is set in content.ts
 * the form opens the visitor's mail client pre-filled; otherwise it shows a "not connected" notice.
 * Replace `submit` with a real endpoint (API route, Formspree, etc.) before launch.
 */
export function QuoteForm({ mode = "quote" }: { mode?: "quote" | "careers" }) {
  const [state, setState] = useState<"idle" | "sent" | "unconfigured">("idle");
  const configured = !company.email.startsWith("[");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!configured) { setState("unconfigured"); return; }
    const subject = mode === "quote" ? `Quotation request — ${data.get("service")}` : `Job enquiry — ${data.get("role")}`;
    const body = Array.from(data.entries()).map(([k, v]) => `${k}: ${v}`).join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setState("sent");
  };

  if (state === "sent") return <div className="sent">Thank you — your email app has opened with your request ready to send.</div>;

  return (
    <form className="form" onSubmit={submit}>
      <div className="pair">
        <div className="field"><input id="name" name="name" required placeholder=" " autoComplete="name" /><label htmlFor="name">Full name</label></div>
        <div className="field"><input id="phone" name="phone" required placeholder=" " autoComplete="tel" /><label htmlFor="phone">Phone</label></div>
      </div>
      <div className="pair">
        <div className="field"><input id="email" name="email" type="email" placeholder=" " autoComplete="email" /><label htmlFor="email">Email</label></div>
        {mode === "quote" ? (
          <div className="field"><input id="company" name="company" placeholder=" " autoComplete="organization" /><label htmlFor="company">Company</label></div>
        ) : (
          <div className="field">
            <select id="role" name="role" defaultValue="Security guard">
              <option>Security guard</option><option>Supervisor</option><option>CCTV operator</option><option>Other</option>
            </select>
            <label htmlFor="role">Role of interest</label>
          </div>
        )}
      </div>
      {mode === "quote" && (
        <div className="field">
          <select id="service" name="service" defaultValue={services[0].title}>
            {services.map((s) => <option key={s.id}>{s.title}</option>)}
            <option>Not sure — advise me</option>
          </select>
          <label htmlFor="service">Service required</label>
        </div>
      )}
      <div className="field">
        <textarea id="msg" name="message" rows={4} placeholder=" " />
        <label htmlFor="msg">{mode === "quote" ? "Tell us about your site or event" : "Experience & message"}</label>
      </div>
      {state === "unconfigured" && (
        <p className="ph">Form delivery is not connected yet — set the company email in content.ts or connect a form backend.</p>
      )}
      <div>
        <button type="submit" className="btn red">
          <Roll>{mode === "quote" ? "Send request" : "Send enquiry"}</Roll>
          <span className="dotb"><Arrow size={12} /></span>
        </button>
      </div>
    </form>
  );
}
