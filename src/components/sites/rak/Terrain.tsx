"use client";

import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "./SmoothScroll";
import { createTerrainRenderer, terrainWorkerMain, type TerrainMessage, type TerrainOptions } from "./terrainDraw";

// worker source built once from the self-contained renderer + entry functions
let workerUrl: string | null = null;
const getWorkerUrl = () => {
  if (!workerUrl) {
    const src = `(${terrainWorkerMain.toString()})(${createTerrainRenderer.toString()});`;
    workerUrl = URL.createObjectURL(new Blob([src], { type: "text/javascript" }));
  }
  return workerUrl;
};

/**
 * Ridge-line terrain (the Hajar mountains behind Ras Al Khaimah) swept by a surveillance scan beam.
 * Rendered in a Web Worker on an OffscreenCanvas so it never blocks scrolling; falls back to the
 * main thread where OffscreenCanvas is unavailable. Pauses when off screen or when the tab is hidden.
 *
 * Returns a ref for a container element; the canvas is created inside it (a canvas can only be
 * transferred to a worker once, so each mount gets a fresh one).
 */
export function useTerrain({ contacts = true, top = 0.3, span = 0.62, speed = 1 }: TerrainOptions = {}) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = host.current;
    if (!box) return;
    const cv = document.createElement("canvas");
    box.appendChild(cv);
    const still = reducedMotion();
    const dpr = () => Math.min(window.devicePixelRatio || 1, 1.25);
    const opts = { contacts, top, span, speed };
    let inView = true;

    let send: (m: TerrainMessage, transfer?: Transferable[]) => void;
    let stop: () => void;

    if ("transferControlToOffscreen" in cv && typeof Worker !== "undefined") {
      // ── worker path ──
      const worker = new Worker(getWorkerUrl());
      const off = cv.transferControlToOffscreen();
      send = (m, transfer) => worker.postMessage(m, transfer ?? []);
      send({ type: "init", canvas: off, opts, w: box.clientWidth, h: box.clientHeight, dpr: dpr(), still }, [off]);
      stop = () => worker.terminate();
    } else {
      // ── main-thread fallback ──
      const ctx = cv.getContext("2d");
      if (!ctx) { cv.remove(); return; }
      const r = createTerrainRenderer(ctx, opts);
      r.resize(box.clientWidth, box.clientHeight, dpr());
      r.draw(0);
      let raf = 0, running = false, last = 0;
      const loop = (now: number) => {
        if (!running) return;
        if (now - last >= 1000 / 61) { last = now; r.draw(now / 1000); }
        raf = requestAnimationFrame(loop);
      };
      send = (m) => {
        if (m.type === "resize") { r.resize(m.w, m.h, m.dpr); r.draw(still ? 0 : performance.now() / 1000); }
        if (m.type === "run") { running = m.on && !still; cancelAnimationFrame(raf); if (running) raf = requestAnimationFrame(loop); }
      };
      stop = () => { running = false; cancelAnimationFrame(raf); };
    }

    const run = () => send({ type: "run", on: inView && !document.hidden });
    const ro = new ResizeObserver(() => send({ type: "resize", w: box.clientWidth, h: box.clientHeight, dpr: dpr() }));
    ro.observe(box);
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; run(); });
    io.observe(box);
    document.addEventListener("visibilitychange", run);

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", run);
      stop();
      cv.remove();
    };
  }, [contacts, top, span, speed]);

  return host;
}

/** Live Gulf Standard Time clock (Asia/Dubai), client-only to avoid hydration mismatch. */
export function useGstClock() {
  const [clock, setClock] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dubai", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const tick = () => setClock(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return clock;
}

/** Isolated clock so only this text node re-renders each second (not the whole hero/footer). */
export function GstClock() {
  return <>{useGstClock()}</>;
}
