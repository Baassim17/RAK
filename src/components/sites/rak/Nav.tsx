"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  const [pressedLink, setPressedLink] = useState<string | null>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);

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
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuToggle.current?.focus({ preventScroll: true });
    };
    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const close = () => {
    setPressedLink(null);
    setOpen(false);
  };

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
            <button ref={menuToggle} className={`burger ${open ? "open" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`menu ${open ? "open" : ""}`} aria-hidden={!open} data-lenis-prevent>
        <nav className="menu-list" aria-label="Mobile">
          {nav.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={close}
              onPointerDown={(event) => {
                if (event.pointerType !== "mouse") setPressedLink(n.href);
              }}
              onPointerUp={() => setPressedLink(null)}
              onPointerCancel={() => setPressedLink(null)}
              data-pressed={pressedLink === n.href ? "" : undefined}
              tabIndex={open ? 0 : -1}
              aria-current={path === n.href ? "page" : undefined}
              style={{ "--menu-enter-delay": `${150 + i * 50}ms` } as CSSProperties}
            >
              <span className="label">0{i + 1}</span>
              <span className="menu-link-text">{n.label}</span>
              <span className="label">{n.sub}</span>
            </Link>
          ))}
        </nav>
        <div className="menu-side label">
          <div>Headquarters<b>{company.hq}</b></div>
          {company.phone && <div>Telephone<b>{company.phone}</b></div>}
          {company.email && <div>Email<b>{company.email}</b></div>}
          <a href={company.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>LinkedIn ↗</a>
        </div>
      </div>
    </>
  );
}
