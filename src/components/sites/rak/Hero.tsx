"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { heroStory } from "./content";
import { reducedMotion } from "./SmoothScroll";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const body = useRef<HTMLParagraphElement>(null);
  const busy = useRef(false);
  const played = useRef(false);
  const introRef = useRef<number | null>(null);
  // seconds before the intro plays: wait for the preloader on a first visit
  const introDelay = () => (introRef.current ??= sessionStorage.getItem("rak-pre") ? 0.2 : 2.6);

  const [idx, setIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const [hold, setHold] = useState(false); // pointer / focus on the copy
  const [inView, setInView] = useState(true);
  const playing = ready && !hold && inView;

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
      onComplete: () => void (busy.current = false),
    });
    tl.from(split.chars, { yPercent: 105, duration: first ? 1.5 : 1.1, ease: "expo.out", stagger: first ? 0.04 : 0.03 });
    if (!first) tl.from(body.current, { y: 16, autoAlpha: 0, duration: 0.9, ease: "expo.out" }, 0.1);
    return () => {
      tl.kill();
      split.revert();
    };
  }, [idx]);

  /* pause while the hero is off screen */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = useCallback(
    (next: number) => {
      if (busy.current || next === idx) return;
      if (reducedMotion() || !word.current) {
        setIdx(next);
        return;
      }
      busy.current = true;
      const chars = word.current.querySelectorAll(".hero-word-c");
      gsap
        .timeline({ onComplete: () => setIdx(next) })
        .to(chars.length ? chars : word.current, { yPercent: 105, duration: 0.5, ease: "power3.in", stagger: 0.02 }, 0)
        .to(body.current, { y: -12, autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 0);
    },
    [idx],
  );

  /* auto-advance the chapters while playing */
  useEffect(() => {
    if (!playing || reducedMotion()) return;
    const t = window.setTimeout(() => go((idx + 1) % heroStory.length), 7000);
    return () => window.clearTimeout(t);
  }, [playing, idx, go]);

  const ch = heroStory[idx];

  return (
    <>
      <section className={`hero${playing ? " is-playing" : ""}`} ref={root} aria-roledescription="carousel" aria-label="A shift with RAK Security">
        <div className="hero-frame" ref={frame}>
          {/* time-lapse plates */}
          <div className="hero-plates">
            {heroStory.map((c, i) => (
              <div key={c.img} className={`hero-plate${i === idx ? " is-on" : ""}`} aria-hidden={i !== idx}>
                <Image src={c.img} alt={c.alt} fill priority={i === 0} sizes="100vw" />
              </div>
            ))}
          </div>
          <div className="hero-shade" aria-hidden />

          <div className="hero-copy">
            <div
              className="hero-intro"
              onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)}
              onPointerLeave={() => setHold(false)}
              onFocus={() => setHold(true)}
              onBlur={() => setHold(false)}
            >
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
