import type { Metadata } from "next";
import Image from "next/image";
import { sectors } from "@/components/sites/rak/content";
import { PageHero } from "@/components/sites/rak/Sections";
import { Sectors } from "@/components/sites/rak/Sectors";

export const metadata: Metadata = { title: "Industries" };

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries we serve"
        index="[ 03 ]"
        title={<>Every site has <em>its own risks.</em></>}
        lead="Security that adapts to the environment — not the other way round."
      />
      <section className="sec">
        <div className="wrap">
          <div className="cards cards-4">
            {sectors.map((s, i) => (
              <div className={`card media ${i % 2 ? "light" : ""}`} key={s.name} data-reveal={(i % 4) * 0.06}>
                {s.photo && <div className="card-img"><Image src={s.photo.src} alt={s.photo.alt} fill sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 25vw" /></div>}
                <span className="label no">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Sectors withLink={false} />
    </>
  );
}
