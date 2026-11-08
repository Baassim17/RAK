import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/sites/rak/Art";
import { sectors, services } from "@/components/sites/rak/content";
import { IndustryExplorer } from "./IndustryExplorer";
import { industryGroups, sectorProfiles } from "./profiles";
import styles from "./industries.module.css";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description: "Explore how RAK Security plans guarding, patrols and CCTV for ten sectors in Ras Al Khaimah, with coverage priorities and practical planning guidance.",
};

const heroScenes = [
  { id: "commercial", caption: "Workplaces" },
  { id: "government", caption: "Public spaces" },
  { id: "logistics", caption: "Site operations" },
];

export default function IndustriesPage() {
  return (
    <>
      <section className={`wrap ${styles.hero}`} aria-labelledby="industries-title">
        <div className={styles.heroCopy}>
          <p className={`label ${styles.eyebrow}`}>Industries · Ras Al Khaimah</p>
          <h1 id="industries-title">Security shaped by <span>how you operate.</span></h1>
          <p className={styles.lead}>A public entrance, a residential gate and a loading yard each need a different plan. Start with your sector to see what to cover and what to share with us.</p>
          <a href="#industry-directory" className="btn red">
            Explore industries <span className="dotb" aria-hidden="true"><Arrow size={14} /></span>
          </a>
        </div>
        <div className={styles.gallery} aria-hidden="true">
          {heroScenes.map(({ id, caption }, index) => (
            <div key={id} className={styles.scene}>
              <Image
                src={`/sites/rak/img/sector-marquee/${id}.webp`}
                alt=""
                fill
                preload={index === 0}
                sizes={index === 0 ? "(max-width: 760px) 92vw, 34vw" : "(max-width: 760px) 46vw, 18vw"}
              />
              <span className="label">{caption}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="industry-directory" className={styles.directory} aria-labelledby="industry-directory-title">
        <div className="wrap">
          <header className={styles.directoryHead}>
            <div>
              <p className={`label ${styles.eyebrow}`}>Industry directory</p>
              <h2 id="industry-directory-title">Explore your sector.</h2>
            </div>
            <p>See the day-to-day priorities for each site type, then open the planning notes for a closer look.</p>
          </header>
          <IndustryExplorer items={sectors.map((sector, index) => {
            const profile = sectorProfiles[sector.id];
            const group = industryGroups.find(({ id }) => id === profile.group);
            const related = profile.services.map((id) => services.find((service) => service.id === id));
            return {
              id: sector.id,
              group: profile.group,
              content: (
                <article className={styles.card} aria-labelledby={`industry-${sector.id}`}>
                  <div className={styles.cardPhoto}>
                    <Image src={`/sites/rak/img/sector-marquee/${sector.id}.webp`} alt="" fill sizes="(max-width: 760px) 92vw, (max-width: 1680px) 46vw, 760px" />
                    <span className="label" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className={styles.cardContent}>
                    <p className={`label ${styles.category}`}>{group?.label}</p>
                    <h3 id={`industry-${sector.id}`}>{sector.name}</h3>
                    <p className={styles.description}>{sector.description}</p>
                    <ul className={styles.priorities} aria-label="Coverage priorities" role="list">
                      {profile.priorities.map((priority) => <li key={priority}>{priority}</li>)}
                    </ul>
                    <details className={styles.notes}>
                      <summary>Planning notes <span aria-hidden="true" /></summary>
                      <div className={styles.notesContent}>
                        <p>{profile.planning}</p>
                        <p><strong>What to share</strong>{profile.brief}</p>
                        <p className="label">Related services</p>
                        <ul role="list">
                          {related.map((service) => service && (
                            <li key={service.id}>
                              <Link href={`/services#service-${service.id}`}>{service.title} <Arrow size={12} /></Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>
                  </div>
                </article>
              ),
            };
          })} />
        </div>
      </section>

    </>
  );
}
