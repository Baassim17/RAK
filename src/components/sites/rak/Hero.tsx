"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { heroStory } from "./content";
import { reducedMotion } from "./SmoothScroll";

const FIRST_SLIDE_DELAY_MS = 1250;
const SLIDE_DELAY_MS = 4000;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const body = useRef<HTMLParagraphElement>(null);
  const played = useRef(false);
  const introRef = useRef<number | null>(null);
  // seconds before the intro plays: wait for the preloader on a first visit
  const introDelay = () => (introRef.current ??= sessionStorage.getItem("rak-pre") ? 0.2 : 2.6);

  const [slide, setSlide] = useState(0);
  const [ready, setReady] = useState(false);
  const [canAdvance, setCanAdvance] = useState(false);
  const playing = ready && canAdvance;
  const idx = slide % heroStory.length;
  const nextIdx = (idx + 1) % heroStory.length;

  /* intro: frame opens, chrome fades up */
  useEffect(() => {
    if (reducedMotion()) {
      setReady(true);
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: introDelay(), onComplete: () => setReady(true) });
      tl.from(frame.current, { clipPath: "inset(6% 4% 6% 4% round 26px)", duration: 1.6, ease: "expo.out" }, 0)
        .from("[data-in]", { y: 24, autoAlpha: 0, duration: 1, ease: "expo.out", stagger: 0.07 }, 0.4);
    }, root);
    return () => ctx.revert();
  }, []);

  /* each chapter's giant word rises in */
  useEffect(() => {
    if (!word.current || reducedMotion()) return;
    const first = !played.current;
    const split = SplitText.create(word.current, { type: "chars", charsClass: "hero-word-c" });
    const tl = gsap.timeline({
      delay: first ? introDelay() + 0.2 : 0,
      onStart: () => void (played.current = true),
    });
    tl.from(split.chars, { yPercent: 105, duration: first ? 1.5 : 1.1, ease: "expo.out", stagger: first ? 0.04 : 0.03 });
    if (!first) tl.from(body.current, { y: 16, autoAlpha: 0, duration: 0.9, ease: "expo.out" }, 0.1);
    return () => {
      tl.kill();
      split.revert();
    };
  }, [idx]);

  /* Only advance while the hero and browser tab are visible. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let inView = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setCanAdvance(inView && !document.hidden && !motion.matches);
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.intersectionRatio >= 0.35;
      sync();
    }, { threshold: 0.35 });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    let exit: gsap.core.Timeline | undefined;
    const advance = () => setSlide(slide + 1);
    const timer = window.setTimeout(() => {
      const heading = word.current;
      if (!heading) {
        advance();
        return;
      }
      const chars = heading.querySelectorAll(".hero-word-c");
      exit = gsap
        .timeline({ onComplete: advance })
        .to(chars.length ? chars : heading, { yPercent: 105, duration: 0.5, ease: "power3.in", stagger: 0.02 }, 0)
        .to(body.current, { y: -12, autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 0);
    }, slide === 0 ? FIRST_SLIDE_DELAY_MS : SLIDE_DELAY_MS);
    return () => {
      window.clearTimeout(timer);
      exit?.revert();
    };
  }, [playing, slide]);

  const ch = heroStory[idx];

  return (
    <>
      <section className={`hero${playing ? " is-playing" : ""}`} ref={root} aria-roledescription="carousel" aria-label="A shift with RAK Security">
        <div className="hero-frame" ref={frame}>
          {/* time-lapse plates */}
          <div className="hero-plates">
            {heroStory.map((c, i) => (
              <div key={c.img} className={`hero-plate${i === idx ? " is-on" : ""}`} aria-hidden={i !== idx}>
                <Image
                  src={c.img}
                  alt={c.alt}
                  fill
                  preload={i === 0}
                  loading={i !== 0 && i === nextIdx ? "eager" : undefined}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          <div className="hero-shade" aria-hidden />

          <div className="hero-copy">
            <div className="hero-intro">
              <p ref={body} key={`b-${idx}`} aria-live={playing ? "off" : "polite"}>
                {ch.body}
              </p>
            </div>

            <h1 className="hero-word" key={`w-${idx}`}>
              <span className="sr-only">RAK Security Services, Ras Al Khaimah: </span>
              <span ref={word} className="hero-word-text">{ch.word}</span>
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
