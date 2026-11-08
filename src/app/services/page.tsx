import type { Metadata } from "next";
import { Chapters } from "@/components/sites/rak/Chapters";
import { Sectors } from "@/components/sites/rak/Sectors";
import { Faq, PageHero } from "@/components/sites/rak/Sections";
import Image from "next/image";
import { services } from "@/components/sites/rak/content";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        index="[ 02 ]"
        title={<>Layers of <em>protection.</em></>}
        lead="Six core disciplines, combined into one security plan built around your site, your people and your risks."
      />
      <section className="sec">
        <div className="wrap">
          <span className="label paren">Index</span>
          <div className="cards">
            {services.map((s, i) => (
              <a href="#services" className="card media" key={s.id} data-reveal={(i % 3) * 0.06}>
                <div className="phero-row">
                  <span className="label no">{s.no}</span>
                  <span className="label">{s.short}</span>
                </div>
                <div className="card-img"><Image src={s.img} alt={s.alt} fill sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw" /></div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="label note">{"// Service descriptions drafted from the company profile — confirm scope and approvals."}</p>
        </div>
      </section>
      <Chapters />
      <Sectors />
      <Faq />
    </>
  );
}
