import type { Metadata } from "next";
import Image from "next/image";
import { Arrow } from "@/components/sites/rak/Art";
import { company } from "@/components/sites/rak/content";
import { QuoteForm } from "@/components/sites/rak/QuoteForm";
import styles from "./careers.module.css";

export const metadata: Metadata = {
  title: "Careers in Security",
  description: "Explore security guard, supervisor and CCTV operator roles with RAK Security in Ras Al Khaimah. Learn what the work involves and how to prepare a careers enquiry.",
};

const roles = [
  {
    title: "Security guard",
    focus: "Access control · Patrols",
    summary: "Provide a visible, professional presence at entrances, reception desks and assigned posts.",
    duties: ["Check visitor access and follow site entry procedures.", "Carry out patrols and record anything that needs attention.", "Give the next shift a clear handover."],
    experience: "Mention any work in guarding, reception, customer service or shift-based operations.",
  },
  {
    title: "Security supervisor",
    focus: "Team coordination · Reporting",
    summary: "Keep officers briefed, posts covered and site contacts informed when priorities change.",
    duties: ["Brief officers on post instructions and daily priorities.", "Coordinate coverage and check that handovers are complete.", "Review incident reports and raise issues with the agreed contact."],
    experience: "Describe the teams, shifts or sites you have supervised and how you handled escalations.",
  },
  {
    title: "CCTV operator",
    focus: "Monitoring · Incident logs",
    summary: "Monitor assigned camera feeds and communicate observations to officers or site staff.",
    duties: ["Monitor agreed areas and record relevant activity.", "Escalate observations using the site’s reporting procedures.", "Help authorised staff find footage for incident review."],
    experience: "List any monitoring systems you have used and examples of logging or escalating incidents.",
  },
];

const enquirySteps = [
  { title: "Pick a role", description: "Tell us which role interests you and why it fits your experience." },
  { title: "Summarise your experience", description: "Highlight relevant duties, training and languages. A short overview is enough for an initial enquiry." },
  { title: "Share your availability", description: "Include your current location, earliest start date and the shifts you can work." },
];

export default function CareersPage() {
  const enquiryEmailConfigured = !company.email.startsWith("[");

  return (
    <>
      <section className={`wrap ${styles.hero}`} aria-labelledby="careers-title">
        <div className={styles.heroCopy}>
          <p className={`label ${styles.eyebrow}`}>Careers at RAK Security</p>
          <h1 id="careers-title">Build a career <span>in security.</span></h1>
          <p className={styles.lead}>Security work calls for good judgment, clear communication and attention to detail. Explore roles in guarding, site supervision and CCTV operations in Ras Al Khaimah.</p>
          <div className={styles.actions}>
            <a href="#career-roles" className="btn red">
              Explore roles <span className="dotb" aria-hidden="true"><Arrow size={14} /></span>
            </a>
            <a href="#career-enquiry" className={styles.textLink}>Prepare an enquiry <Arrow size={13} /></a>
          </div>
        </div>
        <figure className={styles.portrait}>
          <Image
            src="/sites/rak/img/who-trained-people.webp"
            alt="Uniformed security officer standing watch at a modern building entrance"
            fill
            preload
            sizes="(max-width: 760px) 92vw, (max-width: 1680px) 44vw, 690px"
          />
          <figcaption><span className="label">Ras Al Khaimah, UAE</span><span>Security guarding &amp; patrol services</span></figcaption>
        </figure>
      </section>

      <section id="career-roles" className={styles.roles} aria-labelledby="career-roles-title">
        <div className="wrap">
          <header className={styles.rolesHead}>
            <div>
              <p className={`label ${styles.eyebrow}`}>Roles at RAK Security</p>
              <h2 id="career-roles-title">Find where you fit.</h2>
            </div>
            <p>Explore the work and experience relevant to each role. Availability and requirements vary by assignment.</p>
          </header>
          <div className={styles.roleList}>
            {roles.map(({ title, focus, summary, duties, experience }, index) => (
              <details key={title} className={styles.role}>
                <summary>
                  <span className={`label ${styles.roleNumber}`} aria-hidden="true">0{index + 1}</span>
                  <span className={styles.roleTitle}>{title}</span>
                  <span className={styles.roleFocus}>{focus}</span>
                  <span className={styles.toggle} aria-hidden="true" />
                </summary>
                <div className={styles.roleContent}>
                  <div>
                    <p>{summary}</p>
                    <ul>{duties.map((duty) => <li key={duty}>{duty}</li>)}</ul>
                  </div>
                  <p className={styles.experience}><strong>What to highlight</strong>{experience}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="career-enquiry" className={`wrap ${styles.enquiry}`} aria-labelledby="career-enquiry-title">
        <div>
          <p className={`label ${styles.eyebrow}`}>Before you get in touch</p>
          <h2 id="career-enquiry-title">Prepare your enquiry.</h2>
          <ol className={styles.steps}>
            {enquirySteps.map(({ title, description }) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.contact}>
          <h3>Careers enquiries</h3>
          {enquiryEmailConfigured ? (
            <>
              <p>Use the form to draft a careers enquiry in your email app.</p>
              <QuoteForm mode="careers" />
            </>
          ) : (
            <>
              <p>For company updates, visit RAK Security on LinkedIn.</p>
              <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
                Company on LinkedIn <span className="dotb" aria-hidden="true"><Arrow size={14} /></span>
              </a>
            </>
          )}
        </div>
      </section>
    </>
  );
}
