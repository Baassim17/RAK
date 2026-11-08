"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Arrow, Mark } from "./Art";
import { company, nav } from "./content";
import { getLenis } from "./SmoothScroll";

export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span data-t={children}>{children}</span>
    </span>
  );
}

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let state = false;
    const on = () => {
      const y = window.scrollY;
      const next = y > last && y > 300;
      if (next !== state) { state = next; setHidden(next); }
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const l = getLenis();
    if (open) l?.stop();
    else l?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(width > 1020px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`nav ${hidden && !open ? "hide" : ""}`}>
        <div className="nav-pill">
          <Link href="/" className="brand" onClick={close} aria-label="RAK Security Services — home">
            <Mark size={40} />
            <span>
              RAK SECURITY
              <small>SERVICES LLC</small>
            </span>
          </Link>
          <nav className="nav-links label" aria-label="Primary">
            {nav.slice(1).map((n) => (
              <Link key={n.href} href={n.href} className={path === n.href ? "on" : ""}>
                <Roll>{n.label}</Roll>
              </Link>
            ))}
          </nav>
          <div className="nav-r">
            <Link href="/contact" className="btn" onClick={close}>
              <Roll>Request a quote</Roll>
              <span className="dotb"><Arrow size={12} /></span>
            </Link>
            <button className={`burger ${open ? "open" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>

      <div className={`menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="menu-list">
          {nav.map((n, i) => (
            <Link key={n.href} href={n.href} onClick={close} tabIndex={open ? 0 : -1} style={{ transitionDelay: open ? `${0.15 + i * 0.05}s` : "0s" }}>
              <span className="label">0{i + 1}</span>
              <span>{n.label}</span>
              <span className="label">{n.sub}</span>
            </Link>
          ))}
        </div>
        <div className="menu-side label">
          <div>Headquarters<b>{company.hq}</b></div>
          <div>Telephone<b>{company.phone}</b></div>
          <div>Email<b>{company.email}</b></div>
          <a href={company.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>LinkedIn ↗</a>
        </div>
      </div>
    </>
  );
}
