"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { hasSeenPreloader, markPreloaderSeen } from "./preloaderSession";

// 5×7 pixel glyphs (CTA-style pixel-grid preloader)
const GLYPHS: Record<string, string[]> = {
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
};

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const seen = hasSeenPreloader();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce || window.matchMedia("(max-width: 760px)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time skip for returning visitors
      setGone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const cells = gsap.utils.shuffle(Array.from(el.querySelectorAll<HTMLElement>("i.on")));
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        markPreloaderSeen();
        document.documentElement.style.overflow = "";
        setGone(true);
      },
    });
    tl.to(cells, { opacity: 1, duration: 0.05, stagger: 0.022, ease: "none" }, 0)
      .to(counter, { v: 100, duration: 1.6, ease: "power2.inOut", onUpdate: () => { if (pct.current) pct.current.textContent = String(Math.round(counter.v)).padStart(3, "0"); } }, 0)
      .to(el.querySelectorAll("i"), { backgroundColor: "#e8262e", duration: 0.2, stagger: { each: 0.004, from: "random" } }, 1.7)
      .to(el, { yPercent: -100, duration: 1, ease: "expo.inOut" }, 2.1);
    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;
  return (
    <div className="pre" ref={root} aria-hidden>
      <div className="pre-grid">
        {"RAK".split("").map((ch) => (
          <div className="pre-ch" key={ch}>
            {GLYPHS[ch].join("").split("").map((b, i) => (
              <i key={i} className={b === "1" ? "on" : ""} />
            ))}
          </div>
        ))}
      </div>
      <div className="pre-meta label">
        <span>RAK Security Services</span>
        <span>Securing site <b ref={pct}>000</b>%</span>
      </div>
    </div>
  );
}
