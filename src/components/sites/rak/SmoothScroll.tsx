"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Lenis smooth scrolling driven by the GSAP ticker (same wiring as the reference sites),
 * plus page-wide reveal behaviours:
 *   [data-split]  → SplitText line mask reveal
 *   [data-reveal] → fade/rise on enter
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion()) return;
    lenis = new Lenis({ lerp: 0.08, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.4 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis?.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true });
    if (reducedMotion()) return;
    let ctx: gsap.Context | undefined;
    // wait one frame so page components have created their pinned triggers first
    const id = window.setTimeout(() => {
      ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 50,
            autoAlpha: 0,
            duration: 1.2,
            ease: "expo.out",
            delay: Number(el.dataset.reveal) || 0,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 60);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      window.clearTimeout(id);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
