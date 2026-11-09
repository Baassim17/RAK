"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Arrow } from "./Art";
import { company, services } from "./content";

const fieldLabels: Record<string, string> = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  company: "Company",
  service: "Service",
  role: "Role",
  message: "Details",
};

export function QuoteForm({ mode = "quote", initialService = services[0].title }: {
  mode?: "quote" | "careers";
  initialService?: string;
}) {
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const configured = Boolean(company.email);
  const quote = mode === "quote";

  useEffect(() => {
    if (draft) draftRef.current?.focus();
  }, [draft]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = quote ? `Quotation request — ${data.get("service")}` : `Careers enquiry — ${data.get("role")}`;
    const body = [...data.entries()]
      .map(([name, value]) => [fieldLabels[name], String(value).trim()])
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");

    if (configured) {
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("Continue in your email app to send your enquiry.");
    } else {
      setDraft(`${subject}\n\n${body}`);
      setStatus("Draft ready to copy.");
    }
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus("Draft copied.");
    } catch {
      draftRef.current?.focus();
      draftRef.current?.select();
      setStatus("Copy the selected text using your device’s copy command.");
    }
  }

  return (
    <form className="form" onSubmit={submit} onChange={() => { setDraft(""); setStatus(""); }}>
      <div className="pair">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
      </div>
      <div className="pair">
        <div className="field">
          <label htmlFor="email">Email <span>(optional)</span></label>
          <input id="email" name="email" type="email" autoComplete="email" />
        </div>
        {quote ? (
          <div className="field">
            <label htmlFor="company">Company <span>(optional)</span></label>
            <input id="company" name="company" autoComplete="organization" />
          </div>
        ) : (
          <div className="field">
            <label htmlFor="role">Role of interest</label>
            <select id="role" name="role" defaultValue="Security guard">
              <option>Security guard</option><option>Supervisor</option><option>CCTV operator</option><option>Other</option>
            </select>
          </div>
        )}
      </div>
      {quote && (
        <div className="field">
          <label htmlFor="service">Service required</label>
          <select id="service" name="service" defaultValue={initialService}>
            {services.map((service) => <option key={service.id}>{service.title}</option>)}
            <option>Not sure — advise me</option>
          </select>
        </div>
      )}
      <div className="field">
        <label htmlFor="msg">{quote ? "Tell us about your site or event" : "Experience and message"} <span>(optional)</span></label>
        <textarea id="msg" name="message" rows={4} placeholder={quote ? "Location, dates and the coverage you need" : undefined} />
      </div>
      <div>
        <button type="submit" className="btn red">
          {configured ? "Open email draft" : "Prepare enquiry draft"}
          <span className="dotb" aria-hidden="true"><Arrow size={12} /></span>
        </button>
      </div>
      {draft && (
        <div className="form-draft">
          <div className="field">
            <label htmlFor="enquiry-draft">Your enquiry draft</label>
            <textarea id="enquiry-draft" ref={draftRef} value={draft} rows={7} readOnly />
          </div>
          <button type="button" className="btn" onClick={copyDraft}>Copy draft</button>
        </div>
      )}
      <p className="form-note" role="status">{status}</p>
    </form>
  );
}
