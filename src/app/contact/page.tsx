import type { Metadata } from "next";
import { company } from "@/components/sites/rak/content";
import { PageHero } from "@/components/sites/rak/Sections";
import { QuoteForm } from "@/components/sites/rak/QuoteForm";

export const metadata: Metadata = { title: "Contact & Quotation" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        index="[ 05 ]"
        cta={false}
        title={<>Let&apos;s secure <em>your site.</em></>}
        lead="Request a quotation or ask us anything about guarding, events, cash-in-transit, close protection or CCTV."
      />
      <section className="sec">
        <div className="wrap two">
          <div data-reveal>
            <span className="label paren">Direct line</span>
            <div className="rows sub-h">
              <div><span className="label">Location</span><span className="ph">{company.address}</span></div>
              <div><span className="label">Telephone</span><span className="ph">{company.phone}</span></div>
              <div><span className="label">Email</span><span className="ph">{company.email}</span></div>
              <div><span className="label">LinkedIn</span><a href={company.linkedin} target="_blank" rel="noopener noreferrer">raksecurityservices ↗</a></div>
            </div>
          </div>
          <div data-reveal="0.1">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
