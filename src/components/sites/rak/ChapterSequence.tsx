"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_SEQUENCE = "(min-width: 961px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)";

export function ChapterSequence({ children }: { children: ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = stage.current;
    if (!panel) return;

    const media = gsap.matchMedia();
    media.add(DESKTOP_SEQUENCE, () => {
      const chapters = Array.from(panel.querySelectorAll(".chap-item"));
      const frame = panel.querySelector(".chap-frame");
      if (!frame) return;
      const layers = Array.from(frame.querySelectorAll(".chap-layer"));
      const backdrops = Array.from(panel.querySelectorAll(".chap-backdrop"));
      const headlines = Array.from(frame.querySelectorAll(".chap-frame-title"));
      panel.classList.add("is-pinned");
      gsap.set([...chapters.slice(1), ...headlines.slice(1)], { autoAlpha: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: "top top",
          end: () => `+=${window.innerHeight * chapters.length * 0.7}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
        },
      });

      layers.slice(1).forEach((layer, index) => {
        const start = index + 0.7;
        // Keep the preceding photo underneath while the next one wipes into the same frame.
        timeline
          .to(backdrops[index + 1], { opacity: 1, duration: 0.6, ease: "power2.inOut" }, start)
          .set(backdrops[index], { opacity: 0 }, start + 0.6)
          .to(layer, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power2.inOut" }, start)
          .fromTo(layer.querySelector("img"), { yPercent: 6, scale: 1.13 }, { yPercent: 0, scale: 1, duration: 0.6, ease: "power2.out" }, start)
          .to([chapters[index], headlines[index]], { autoAlpha: 0, duration: 0.2 }, start + 0.1)
          .to([chapters[index + 1], headlines[index + 1]], { autoAlpha: 1, duration: 0.24 }, start + 0.3);
      });

      // Give the last service the same reading time before the section releases.
      timeline.to({}, { duration: 0.7 });
      return () => panel.classList.remove("is-pinned");
    }, panel);

    return () => media.revert();
  }, []);

  return (
    <div className="chap-stage" ref={stage}>
      <div className="wrap">{children}</div>
    </div>
  );
}
