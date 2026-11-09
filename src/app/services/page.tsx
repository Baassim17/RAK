import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Arrow } from "@/components/sites/rak/Art";
import { DirectoryHero } from "@/components/sites/rak/DirectoryHero";
import { services } from "@/components/sites/rak/content";
import { serviceDetails } from "./details";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Security Services",
  description: "Explore RAK Security’s six services in Ras Al Khaimah, from commercial guarding and event security to cash-in-transit, executive protection and CCTV.",
};

const planningSteps = [
  { title: "Understand the site", description: "Start with your layout, operating hours and the people, areas or activities you need to protect." },
  { title: "Define coverage", description: "Agree where officers or cameras are needed, when coverage is required and how it fits with your existing team." },
  { title: "Agree the handover", description: "Confirm who to contact, how incidents are reported and when to review the plan." },
];

export default function ServicesPage() {
  return (
    <>
      <DirectoryHero
        titleId="services-title"
        eyebrow="Security services · Ras Al Khaimah"
        title={["Security built for", "your operation."]}
        description="From the front desk to the control room, we plan guarding, patrols and surveillance around how your site works."
      >
        <div className={styles.heroActions}>
          <a href="#service-directory" className="btn red">
            Explore services <span className="dotb" aria-hidden="true"><ArrowDown size={15} /></span>
          </a>
          <Link href="/contact#quote" className={styles.heroLink}>Request a quote <Arrow size={13} /></Link>
        </div>
      </DirectoryHero>

      <section id="service-directory" className={styles.directory} aria-labelledby="service-directory-title">
        <div className={`wrap ${styles.directoryInner}`}>
          <div className={styles.rail}>
            <p className={`label ${styles.eyebrow}`}>Service directory</p>
            <h2 id="service-directory-title">Find the right coverage.</h2>
            <p className={styles.railCopy}>Choose a service to see what coverage can include and what to share when you request a quote.</p>
            <nav aria-labelledby="service-directory-title" className={styles.index}>
              {services.map(({ id, no, short }) => (
                <a key={id} href={`#service-${id}`}>
                  <span className="label" aria-hidden="true">{no}</span>
                  <span>{short === "CIT" ? "Cash-in-transit" : short}</span>
                  <Arrow size={13} />
                </a>
              ))}
            </nav>
          </div>

          <div className={styles.entries}>
            {services.map((service) => {
              const { overview, coverage, fit, brief } = serviceDetails[service.id];
              return (
                <article key={service.id} id={`service-${service.id}`} className={styles.entry} aria-labelledby={`title-${service.id}`}>
                  <div className={styles.entryTop}>
                    <header className={styles.entryHead}>
                      <span className={`label ${styles.entryNumber}`}>{service.no} · {service.short === "CIT" ? "Secure transfers" : service.short}</span>
                      <h3 id={`title-${service.id}`}>{service.title}</h3>
                      <p>{overview}</p>
                    </header>
                    <div className={styles.photo}>
                      <Image src={service.img} alt={service.alt} fill sizes="(max-width: 760px) 90vw, 38vw" />
                    </div>
                  </div>
                  <div className={styles.entryBody}>
                    <div className={styles.coverage}>
                      <h4>What coverage can include</h4>
                      <dl>
                        {coverage.map(({ title, description }) => (
                          <div key={title}>
                            <dt>{title}</dt>
                            <dd>{description}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <div className={styles.brief}>
                      <p><strong>Suited to</strong>{fit}</p>
                      <p><strong>What to share</strong>{brief}</p>
                      <Link href={`/contact?service=${service.id}#quote`} aria-label={`Request a quote for ${service.title}`}>
                        Get a quote <Arrow size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.planning} aria-labelledby="planning-title">
        <div className="wrap">
          <p className={`label ${styles.eyebrow}`}>From brief to coverage</p>
          <h2 id="planning-title">How we plan your security.</h2>
          <ol className={styles.steps}>
            {planningSteps.map(({ title, description }, index) => (
              <li key={title} data-reveal={index * 0.06}>
                <span className="label" aria-hidden="true">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
          <Link href="/industries" className={styles.heroLink}>Explore the sectors we serve <Arrow size={13} /></Link>
        </div>
      </section>
    </>
  );
}
