"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type PointerEvent } from "react";

type SectorItem = { id: string; name: string; description: string };

const pixelsPerSecond = 42;
const dragThreshold = 5;
const photoSizes = "(max-width: 640px) 76vw, (max-width: 1440px) 25vw, 360px";

export function SectorMarquee({ items }: { items: SectorItem[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const duplicate = useRef<HTMLUListElement>(null);
  const detailPrefix = useId();
  const touchTimer = useRef<number | null>(null);
  const mouseDrag = useRef<{ pointerId: number; startX: number; startScroll: number } | null>(null);
  const suppressClick = useRef(false);
  const [touchPaused, setTouchPaused] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const rail = viewport.current;
    const copy = duplicate.current;
    if (!rail || !copy || touchPaused || pointerInside || dragging || focused || selected) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastTime = 0;
    let offset = rail.scrollLeft;
    let loopWidth = 0;
    let visible = false;

    const tick = (time: number) => {
      if (lastTime && loopWidth > 0) {
        offset = (offset + Math.min(time - lastTime, 40) * pixelsPerSecond / 1000) % loopWidth;
        rail.scrollLeft = offset;
      }
      lastTime = time;
      frame = requestAnimationFrame(tick);
    };
    const measure = () => {
      loopWidth = copy.offsetLeft;
      offset = rail.scrollLeft;
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      lastTime = 0;
      if (!visible || document.hidden || motion.matches) return;
      measure();
      frame = requestAnimationFrame(tick);
    };
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const resize = new ResizeObserver(measure);

    intersection.observe(rail);
    resize.observe(copy);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, [touchPaused, pointerInside, dragging, focused, selected]);

  useEffect(() => () => {
    if (touchTimer.current !== null) window.clearTimeout(touchTimer.current);
  }, []);

  function resumeAfterTouch() {
    if (touchTimer.current !== null) window.clearTimeout(touchTimer.current);
    touchTimer.current = window.setTimeout(() => {
      touchTimer.current = null;
      setTouchPaused(false);
    }, 500);
  }

  function toggleDetails(id: string) {
    setSelected((current) => current === id ? null : id);
  }

  function moveMouseDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = mouseDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const rail = event.currentTarget;
    const distance = event.clientX - drag.startX;
    if (!suppressClick.current) {
      if (Math.abs(distance) < dragThreshold) return;
      suppressClick.current = true;
      rail.setPointerCapture(event.pointerId);
      setDragging(true);
    }

    const target = drag.startScroll - distance;
    const loopWidth = duplicate.current?.offsetLeft ?? 0;
    // Wrap into the identical copy when crossing the start of the marquee.
    rail.scrollLeft = loopWidth > rail.clientWidth
      ? ((target % loopWidth) + loopWidth) % loopWidth
      : target;
  }

  function endMouseDrag(event: PointerEvent<HTMLDivElement>) {
    if (mouseDrag.current?.pointerId !== event.pointerId) return;
    mouseDrag.current = null;
    setDragging(false);
  }

  function renderCards(isDuplicate: boolean) {
    return items.map(({ id, name, description }, index) => {
      const open = selected === id;
      const detailId = `${detailPrefix}-${id}`;
      const contents = (
        <>
          <Image src={`/sites/rak/img/sector-marquee/${id}.webp`} alt="" fill sizes={photoSizes} draggable={false} />
          <span className="sector-card-content">
            <span className="label sector-card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")} / {items.length}</span>
            <span className="sector-card-name">{name}</span>
          </span>
          <span className="sector-card-details" id={isDuplicate ? undefined : detailId}>
            {description}
          </span>
        </>
      );

      return (
        <li className="sector-card" key={id}>
          {isDuplicate ? (
            <div className="sector-card-face" data-open={open} onClick={() => toggleDetails(id)}>
              {contents}
            </div>
          ) : (
            <button
              type="button"
              className="sector-card-face"
              data-open={open}
              aria-label={name}
              aria-describedby={detailId}
              aria-expanded={open}
              aria-controls={detailId}
              onClick={() => toggleDetails(id)}
            >
              {contents}
            </button>
          )}
        </li>
      );
    });
  }

  return (
    <div
      className="sector-rail"
      data-dragging={dragging}
      ref={viewport}
      role="group"
      aria-label="Security sectors"
      data-lenis-prevent-horizontal=""
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setPointerInside(true); }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        setPointerInside(false);
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) endMouseDrag(event);
      }}
      onPointerDown={(event) => {
        suppressClick.current = false;
        if (event.pointerType === "mouse") {
          if (event.button !== 0) return;
          mouseDrag.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startScroll: event.currentTarget.scrollLeft,
          };
          return;
        }
        if (touchTimer.current !== null) window.clearTimeout(touchTimer.current);
        touchTimer.current = null;
        setTouchPaused(true);
      }}
      onPointerMove={moveMouseDrag}
      onPointerUp={(event) => {
        if (event.pointerType === "mouse") endMouseDrag(event);
        else resumeAfterTouch();
      }}
      onPointerCancel={(event) => {
        if (event.pointerType === "mouse") endMouseDrag(event);
        else resumeAfterTouch();
      }}
      onLostPointerCapture={endMouseDrag}
      onClickCapture={(event) => {
        if (event.detail === 0 || !suppressClick.current) return;
        suppressClick.current = false;
        event.preventDefault();
        event.stopPropagation();
      }}
      onScroll={() => { if (touchTimer.current !== null) resumeAfterTouch(); }}
      onFocus={(event) => setFocused(event.target.matches(":focus-visible"))}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        setFocused(false);
        setSelected(null);
      }}
    >
      <div className="sector-track">
        <ul className="sector-cards" role="list">{renderCards(false)}</ul>
        <ul className="sector-cards sector-cards-copy" ref={duplicate} aria-hidden="true">{renderCards(true)}</ul>
      </div>
    </div>
  );
}
