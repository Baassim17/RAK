"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { who } from "./content";
import { reducedMotion } from "./SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

export function WhoCarousel() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const cur = who.pillars[idx];
  const panel = useRef<HTMLDivElement>(null);

  // Scope the scroll reveal to the photo panel.
  useEffect(() => {
    const photoPanel = panel.current;
    if (!photoPanel || reducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(".who-slide", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: { trigger: photoPanel, start: "top 98%", end: "top 18%", scrub: true },
      });
    }, photoPanel);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const photoPanel = panel.current;
    if (!photoPanel) return;

    let inView = false;
    const syncVisibility = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.intersectionRatio >= 0.4;
      syncVisibility();
    }, { threshold: 0.4 });

    observer.observe(photoPanel);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  return (
    <div
      ref={panel}
      className={`who-panel${visible ? " is-playing" : ""}`}
      data-slide={cur.no}
      role="group"
      aria-roledescription="carousel"
      aria-label="How we protect your site"
    >
      <span className="who-num" aria-hidden>{cur.no} / {String(who.pillars.length).padStart(2, "0")}</span>
      {who.pillars.map((p, i) => (
        <div key={p.no} className={`who-slide${i === idx ? " is-on" : ""}`} data-slide={p.no} aria-hidden={i !== idx}>
          <Image src={p.img} alt={p.alt} fill sizes="(min-width: 1680px) 1552px, 92vw" />
        </div>
      ))}
      <div className="who-shade" aria-hidden />
      <p className="who-head" key={cur.no}>{cur.head}</p>

      <div className="who-tabs" role="group" aria-label="Choose a slide">
        {who.pillars.map((p, i) => (
          <button
            key={p.no}
            type="button"
            aria-label={p.title}
            aria-pressed={i === idx}
            aria-describedby={i === idx ? `who-slide-copy-${p.no}` : undefined}
            className={`who-tab${i === idx ? " is-on" : ""}`}
            onClick={() => setIdx(i)}
          >
            <span className="who-tab-t">{p.title}</span>
            <span className="who-tab-b" id={`who-slide-copy-${p.no}`} aria-hidden={i !== idx}>{p.body}</span>
            <span className="who-tab-bar" aria-hidden>
              {i === idx && <span onAnimationEnd={() => setIdx((idx + 1) % who.pillars.length)} />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
