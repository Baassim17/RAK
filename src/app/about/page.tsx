import type { Metadata } from "next";
import { Manifesto } from "@/components/sites/rak/Manifesto";
import { Commitment } from "@/components/sites/rak/Commitment";
import { PageHero } from "@/components/sites/rak/Sections";
import { WhyChooseRak } from "@/components/sites/rak/WhyChooseRak";
import { TrustedBy } from "@/components/sites/rak/TrustedBy";

export const metadata: Metadata = { title: "About" };

const blocks = [
  { k: "Mission", t: "Why we exist", b: "[Insert mission statement]", e: "e.g. To protect people, property and peace of mind through disciplined, reliable service." },
  { k: "Vision", t: "Where we are going", b: "[Insert vision statement]", e: "e.g. To be the most trusted security partner in the northern Emirates." },
  { k: "Story", t: "Local roots", b: "[Insert company history, founding year and experience]", e: "Headquartered in Ras Al Khaimah, UAE." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        index="[ 01 ]"
        title={<>Protection is <em>a promise.</em></>}
        lead="RAK Security Services LLC is a security guarding and patrol company headquartered in Ras Al Khaimah, United Arab Emirates."
      />
      <section className="sec">
        <div className="wrap">
          <div className="cards">
            {blocks.map((x, i) => (
              <div className="card" key={x.k} data-reveal={i * 0.06}>
                <span className="label no">[ 0{i + 1} ] {x.k}</span>
                <div>
                  <h3>{x.t}</h3>
                  <p className="ph">{x.b}</p>
                  <p className="card-sub">{x.e}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="values label" data-reveal>
            {["Integrity", "Vigilance", "Discipline", "Respect", "Reliability"].map((v) => (
              <span key={v}>{v}</span>
            ))}
          </div>
          <p className="label note">{"// Suggested values — confirm or replace with the company's own."}</p>
        </div>
      </section>
      <Manifesto />
      <WhyChooseRak />
      <Commitment />
      <TrustedBy />
    </>
  );
}
