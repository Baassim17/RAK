"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow } from "./Art";
import { company, faqs } from "./content";
import { Roll } from "./Nav";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="before-you-ask" className="faq-sec" aria-labelledby="faq-title">
      <div className="wrap faq-inner">
        <header className="faq-header">
          <h2 id="faq-title">Your questions <span>answered.</span></h2>
        </header>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const expanded = open === index;
            const answerId = `faq-answer-${index + 1}`;

            return (
              <div className={`faq-item${expanded ? " open" : ""}`} key={faq.q}>
                <h3>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={expanded}
                    aria-controls={answerId}
                    onClick={() => setOpen((current) => current === index ? null : index)}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-toggle" aria-hidden="true" />
                  </button>
                </h3>
                <div id={answerId} className="faq-a" aria-hidden={!expanded}>
                  <div><p className={faq.placeholder ? "ph" : undefined}>{faq.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Inner-page hero: inset frame, mono meta row, split headline. */
export function PageHero({ eyebrow, title, lead, index, cta = true }: { eyebrow: string; title: React.ReactNode; lead: string; index: string; cta?: boolean }) {
  return (
    <section className="phero">
      <div className="phero-in">
        <div className="phero-grid" />
        <div className="phero-row label" style={{ color: "var(--mute)" }}>
          <span className="paren">{eyebrow}</span>
          <span>{index} · {company.coords}</span>
        </div>
        <h1 className="display h-xl" data-split>{title}</h1>
        <div className="phero-row">
          <p className="lead" data-reveal>{lead}</p>
          {cta && (
            <Link href="/contact" className="btn red" data-reveal="0.1">
              <Roll>Request a quote</Roll>
              <span className="dotb"><Arrow size={12} /></span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
