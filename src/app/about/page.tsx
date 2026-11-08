import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/sites/rak/Art";
import { company } from "@/components/sites/rak/content";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About RAK Security",
  description: "Learn about RAK Security Services LLC, a guarding and patrol company based in Ras Al Khaimah, and the principles that guide its work.",
};

const purpose = [
  { title: "Our mission", copy: "Protect people, property and daily operations through attentive guarding and clear procedures suited to each site." },
  { title: "Our vision", copy: "Earn long-term trust as a UAE security provider through professional conduct, consistent service and accountability." },
];

const values = [
  { title: "Vigilance", copy: "Pay attention to routine activity so changes are easier to spot and report." },
  { title: "Integrity and respect", copy: "Act honestly and treat residents, staff, visitors and the public with dignity." },
  { title: "Professionalism", copy: "Communicate clearly, follow agreed procedures and stay composed on duty." },
  { title: "Accountability", copy: "Know who owns each responsibility and carry it through from one shift to the next." },
];

const approach = [
  { title: "Understand the site", copy: "Review how people use the property, where they enter and what changes throughout the day." },
  { title: "Define the responsibilities", copy: "Agree which posts, routes and activities need coverage, and who handles concerns as they arise." },
  { title: "Communicate and review", copy: "Use handovers, incident reporting and feedback to keep procedures aligned with the site as it changes." },
];

export default function AboutPage() {
  return (
    <>
      <section className={`wrap ${styles.masthead}`} aria-labelledby="about-title">
        <header className={styles.intro}>
          <div>
            <p className={`label ${styles.eyebrow}`}>About RAK Security</p>
            <h1 id="about-title">Built on vigilance. <span>Driven by responsibility.</span></h1>
          </div>
          <div className={styles.introAside}>
            <p>Based in Ras Al Khaimah, we provide professional guarding and patrol services. Our work begins with understanding the people and places we’re trusted to protect.</p>
            <Link href="/services" className="btn red">
              Explore our services <span className="dotb" aria-hidden="true"><Arrow size={14} /></span>
            </Link>
          </div>
        </header>
        <figure className={styles.scene}>
          <div className={styles.photo}>
            <Image
              src="/sites/rak/img/commitment-bg.webp"
              alt="Uniformed security officers standing watch outside a commercial property at night"
              fill
              preload
              sizes="(max-width: 1680px) 92vw, 1552px"
            />
          </div>
          <figcaption>
            <span>{company.name}</span>
            <span>{company.hq}</span>
          </figcaption>
        </figure>
      </section>

      <section className={`wrap ${styles.purpose}`} aria-labelledby="about-purpose">
        <header>
          <p className={`label ${styles.eyebrow}`}>Mission &amp; vision</p>
          <h2 id="about-purpose">Why we do this work.</h2>
        </header>
        <dl className={styles.purposeList}>
          {purpose.map(({ title, copy }) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{copy}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.values} aria-labelledby="about-values">
        <div className="wrap">
          <p className={`label ${styles.eyebrow}`}>What we stand for</p>
          <h2 id="about-values">Standards for every assignment.</h2>
          <ul className={styles.valueGrid} role="list">
            {values.map(({ title, copy }, index) => (
              <li key={title}>
                <span className="label" aria-hidden="true">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`wrap ${styles.approach}`} aria-labelledby="about-approach">
        <header>
          <p className={`label ${styles.eyebrow}`}>How we work</p>
          <h2 id="about-approach">Start with the site.</h2>
        </header>
        <ol className={styles.steps} role="list">
          {approach.map(({ title, copy }, index) => (
            <li key={title}>
              <span className="label" aria-hidden="true">0{index + 1}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </li>
          ))}
        </ol>
        <nav className={styles.next} aria-label="Explore RAK Security">
          <Link href="/industries">
            <span><strong>Explore the industries we serve</strong><span>See how security priorities differ from one site to another.</span></span>
            <Arrow size={17} />
          </Link>
          <Link href="/contact#quote">
            <span><strong>Discuss your security needs</strong><span>Tell us about your site and the coverage you need.</span></span>
            <Arrow size={17} />
          </Link>
        </nav>
      </section>
    </>
  );
}
