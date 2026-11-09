import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClipboardCheck, Handshake, MapPin, ScanEye, ShieldCheck } from "lucide-react";
import { Arrow } from "@/components/sites/rak/Art";
import { company } from "@/components/sites/rak/content";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About RAK Security",
  description: "Meet RAK Security Services LLC in Ras Al Khaimah and learn how we plan guarding, brief officers and review coverage for each site.",
};

const purpose = [
  { title: "Our mission", copy: "Protect people, property and daily operations through attentive guarding and clear procedures suited to each site." },
  { title: "Our vision", copy: "Earn long-term trust as a UAE security provider through professional conduct, consistent service and accountability." },
];

const values = [
  { icon: ScanEye, title: "Vigilance", copy: "Know what a normal shift looks like so unusual activity is easier to spot, record and report." },
  { icon: Handshake, title: "Integrity and respect", copy: "Apply site rules fairly and treat residents, staff and visitors with courtesy and discretion." },
  { icon: ShieldCheck, title: "Professionalism", copy: "Arrive briefed, communicate clearly and stay composed when a situation needs attention." },
  { icon: ClipboardCheck, title: "Accountability", copy: "Give each post clear responsibilities and carry outstanding issues through to the next shift." },
];

const approach = [
  { title: "Understand the site", copy: "Review entrances, visitor and delivery routes, operating hours and the times when the site is busiest." },
  { title: "Agree the coverage", copy: "Define where officers are posted, what they check on patrol and whom they contact when an issue needs attention." },
  { title: "Brief and supervise officers", copy: "Walk through site rules, reporting procedures and shift handovers. Assign a supervisor so officers and site teams know who to contact." },
  { title: "Review and adjust", copy: "Use incident reports and feedback from your team to revisit the plan as access points, working hours or priorities change." },
];

export default function AboutPage() {
  return (
    <>
      <section className={`wrap ${styles.masthead}`} aria-labelledby="about-title">
        <div className={styles.scene}>
          <Image
            src="/sites/rak/img/commitment-bg.webp"
            alt=""
            fill
            preload
            sizes="(max-width: 1680px) 92vw, 1552px"
          />
          <header className={styles.intro}>
            <p className={`label ${styles.eyebrow}`}>About RAK Security</p>
            <h1 id="about-title">Built on vigilance. <span>Driven by responsibility.</span></h1>
            <p className={styles.lead}>We provide guarding and patrol services in Ras Al Khaimah, with coverage planned around the people who use each site and the way it operates.</p>
            <Link href="/services" className="btn red">
              Explore our services <span className="dotb" aria-hidden="true"><Arrow size={14} /></span>
            </Link>
          </header>
        </div>
        <div className={styles.identity}>
          <strong>{company.name}</strong>
          <span><MapPin size={16} aria-hidden="true" /> {company.hq}</span>
        </div>
      </section>

      <section className={`wrap ${styles.purpose}`} aria-labelledby="about-purpose">
        <header>
          <p className={`label ${styles.eyebrow}`}>Who we are</p>
          <h2 id="about-purpose">Security built around everyday operations.</h2>
          <p className={styles.sectionCopy}>A busy reception, a residential entrance and an industrial gate have different routines. We help site teams decide where to place officers, when to schedule patrols and how CCTV can support coverage.</p>
        </header>
        <dl className={styles.purposeList}>
          {purpose.map(({ title, copy }) => (
            <div key={title} data-reveal>
              <dt>{title}</dt>
              <dd>{copy}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.values} aria-labelledby="about-values">
        <div className="wrap">
          <header className={styles.valuesIntro}>
            <p className={`label ${styles.eyebrow}`}>What we stand for</p>
            <h2 id="about-values">Standards for every assignment.</h2>
            <p className={styles.sectionCopy}>Our standards guide how officers greet visitors, respond to concerns and hand over responsibility at the end of a shift.</p>
          </header>
          <ul className={styles.valueGrid} role="list">
            {values.map(({ icon: Icon, title, copy }, index) => (
              <li key={title} data-reveal={index * 0.06}>
                <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`wrap ${styles.approach}`} aria-labelledby="about-approach">
        <div>
          <header>
            <p className={`label ${styles.eyebrow}`}>How we work</p>
            <h2 id="about-approach">From site brief to daily coverage.</h2>
          </header>
          <div className={styles.planningPhoto}>
            <Image
              src="/sites/rak/img/why-rak/planning.webp"
              alt="Security personnel reviewing a site plan"
              fill
              sizes="(max-width: 760px) 92vw, 40vw"
            />
          </div>
        </div>
        <ol className={styles.steps} role="list">
          {approach.map(({ title, copy }, index) => (
            <li key={title} data-reveal={index * 0.045}>
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
