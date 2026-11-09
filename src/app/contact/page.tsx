import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/sites/rak/Art";
import { company, services } from "@/components/sites/rak/content";
import { QuoteForm } from "@/components/sites/rak/QuoteForm";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact & Quotations",
  description: "Contact RAK Security in Ras Al Khaimah. Prepare a quote enquiry for guarding, patrols, event security, cash-in-transit, executive protection or CCTV.",
};

const briefItems = [
  { title: "Your site or event", description: "The location, type of property and the people or areas you need to protect." },
  { title: "Timing", description: "Your start date, operating hours and when you need coverage." },
  { title: "Existing arrangements", description: "Any guarding, access controls or cameras already in place, and where you need more support." },
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { service } = await searchParams;
  const initialService = services.find(({ id }) => id === service)?.title;
  const { email, phone } = company;
  const location = company.address || company.hq;

  return (
    <div className="wrap">
      <header className={styles.intro}>
        <div>
          <p className={`label ${styles.eyebrow}`}>Contact RAK Security</p>
          <h1>Let&apos;s discuss <span>your security.</span></h1>
        </div>
        <p>Tell us what needs protecting, where it is and when you need coverage. We can use those details to discuss the right scope for your site or event.</p>
      </header>

      <div className={styles.workspace}>
        <section id="quote" className={styles.formPanel} aria-labelledby="quote-title">
          <header>
            <h2 id="quote-title">Request a quotation</h2>
            <p>{email ? "Complete the form to open a draft in your email app." : "Prepare a draft you can copy. Online delivery is currently unavailable."}</p>
          </header>
          <QuoteForm key={initialService} initialService={initialService} />
        </section>

        <aside className={styles.sidebar} aria-labelledby="contact-details-title">
          <div className={styles.details}>
            <p className={`label ${styles.eyebrow}`}>Contact details</p>
            <h2 id="contact-details-title">{company.name}</h2>
            <address>
              <p>{location}</p>
              {email && <a href={`mailto:${email}`}>{email}</a>}
              {phone && <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>}
            </address>
            <a className={styles.linkedin} href={company.linkedin} target="_blank" rel="noopener noreferrer">
              Company on LinkedIn <Arrow size={13} />
            </a>
          </div>
          <div className={styles.brief}>
            <h3>What to include</h3>
            <dl>
              {briefItems.map(({ title, description }) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      <nav className={styles.quickLinks} aria-label="Other ways to get started">
        <Link href="/services">
          <span><strong>Compare our services</strong><span>See what each type of coverage can include.</span></span>
          <Arrow size={17} />
        </Link>
        <Link href="/careers">
          <span><strong>Careers enquiries</strong><span>Explore roles and find out what to include in a careers enquiry.</span></span>
          <Arrow size={17} />
        </Link>
      </nav>
    </div>
  );
}
