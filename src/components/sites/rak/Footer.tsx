import Link from "next/link";
import { Arrow } from "./Art";
import { company, nav } from "./content";

const policies = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/cookies", label: "Cookie policy" },
  { href: "/accessibility", label: "Accessibility statement" },
];

export function Footer() {
  return (
    <footer id="footer" className="ft">
      <div className="wrap ft-content">
        <div className="ft-top">
          <h2>Let&apos;s talk</h2>
          <Link href="/contact" className="btn ft-quote">
            Request a quote
            <span className="dotb" aria-hidden="true"><Arrow size={14} /></span>
          </Link>
        </div>

        <div className="ft-cols">
          <address className="ft-addr">
            <Link href="/" className="ft-brand">{company.name}</Link>
            <span>{company.address || company.hq}</span>
            {company.email && <a href={`mailto:${company.email}`}>{company.email}</a>}
            {company.phone && <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>{company.phone}</a>}
            {(!company.email || !company.phone) && <Link href="/contact">Contact details</Link>}
          </address>
          <nav id="footer-explore" className="ft-links" aria-label="Explore">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
          </nav>
          <nav className="ft-links" aria-label="Policies">
            {policies.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
          <div className="ft-links">
            <span>Follow us</span>
            <a href={company.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="ft-social">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2zM8.1 18.7H5.3V9.8h2.8zM6.7 8.6a1.63 1.63 0 1 1 0-3.26 1.63 1.63 0 0 1 0 3.26zm12 10.1h-2.8v-4.33c0-1.03-.02-2.36-1.44-2.36s-1.66 1.12-1.66 2.28v4.41H10V9.8h2.68v1.22h.04a2.94 2.94 0 0 1 2.65-1.45c2.83 0 3.35 1.86 3.35 4.28z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="ft-legal">
          <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
          {company.licence ? <span>Licence: {company.licence}</span> : <Link href="/contact">Ask about our licence</Link>}
        </div>
      </div>

      {company.whatsapp && (
        <a className="wa" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.6 14.1c-.2.7-1.3 1.3-1.8 1.3-.5.1-1.1.1-1.8-.1a13.8 13.8 0 0 1-6.2-5.4c-.5-.7-1.3-1.8-1.3-3s.7-1.8 1-2.1c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2 0 .4-.1.6l-.4.5c-.1.2-.3.3-.1.6.6 1 1.4 1.8 2.4 2.4.3.2.5.1.7-.1l.7-.9c.2-.2.4-.2.6-.1l2 1c.3.1.5.2.5.4.1.2.1.8-.1 1.4z" />
          </svg>
        </a>
      )}
    </footer>
  );
}
