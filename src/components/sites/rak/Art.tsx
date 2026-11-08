import Image from "next/image";
// Hand-built line illustrations. Every stroked path carries class "draw" so GSAP DrawSVG can animate it.
import type { ReactNode } from "react";

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** Company logo — file supplied by the client (public/sites/rak/logo.jpg), used unaltered. */
export function Mark({ size = 34 }: { size?: number }) {
  return (
    <span className="logo-badge" style={{ width: size, height: size }}>
      <Image src="/sites/rak/logo.jpg" alt="RAK Security Services logo" fill sizes={`${size * 2}px`} priority />
    </span>
  );
}

function Frame({ children, vb = "0 0 400 300" }: { children: ReactNode; vb?: string }) {
  return (
    <svg viewBox={vb} {...S} aria-hidden>
      {children}
    </svg>
  );
}

function Windows() {
  const out: ReactNode[] = [];
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 4; c++) out.push(<rect className="draw" key={`${r}-${c}`} x={132 + c * 24} y={76 + r * 20} width={14} height={10} />);
  for (let r = 0; r < 6; r++)
    for (let c = 0; c < 3; c++) out.push(<rect className="draw" key={`b${r}-${c}`} x={244 + c * 22} y={136 + r * 20} width={12} height={10} />);
  return <>{out}</>;
}

export function ServiceArt({ id }: { id: string }) {
  switch (id) {
    case "commercial":
      return (
        <Frame>
          <path className="draw" d="M30 270H370" />
          <path className="draw" d="M120 270V60h110v210M230 270V120h80v150" />
          <Windows />
          <path className="draw" d="M160 270v-40h30v40M175 230v40" />
          <path className="draw" d="M50 270v-34h44v34M50 248h44M72 236v-14" />
          <path className="draw" d="M175 60V28M165 36a14 14 0 0 1 20 0M158 28a24 24 0 0 1 34 0" />
          <circle className="draw acc" cx="175" cy="28" r="3" stroke="#e8262e" />
        </Frame>
      );
    case "guarding":
      return (
        <Frame>
          <path className="draw" d="M200 24 292 58v80c0 66-40 108-92 132-52-24-92-66-92-132V58z" />
          <path className="draw" d="M200 44 274 72v66c0 54-32 90-74 110-42-20-74-56-74-110V72z" strokeDasharray="3 6" />
          <circle className="draw" cx="200" cy="126" r="22" />
          <path className="draw" d="M174 112h52l-8-14h-36zM186 98h28" />
          <path className="draw" d="M146 226c6-40 30-58 54-58s48 18 54 58" />
          <path className="draw acc" d="m200 186 5 10 11 1-8 8 2 11-10-5-10 5 2-11-8-8 11-1z" stroke="#e8262e" />
        </Frame>
      );
    case "events":
      return (
        <Frame>
          <path className="draw" d="M80 196V64h240v132M80 84h240M80 64l20 20M320 64l-20 20" />
          <path className="draw" d="M66 196h268v28H66z" />
          <path className="draw" d="m130 84-30 112M130 84l34 112M270 84l-34 112M270 84l30 112" strokeDasharray="2 6" />
          <path className="draw acc" d="M124 84h12l-6 10zM264 84h12l-6 10z" stroke="#e8262e" />
          <path className="draw" d="M40 262h320M52 262v-24M92 262v-24M132 262v-24M172 262v-24M212 262v-24M252 262v-24M292 262v-24M332 262v-24M40 244h320" />
          {[70, 110, 150, 190, 230, 270, 310].map((x) => (
            <circle className="draw" key={x} cx={x} cy={284} r={7} />
          ))}
        </Frame>
      );
    case "cit":
      return (
        <Frame>
          <path className="draw" d="M48 228V132h204v96M252 228v-64l36-28h44l20 42v50z" />
          <path className="draw" d="M264 168l26-20h30l14 28h-70z" />
          <path className="draw" d="M150 140v84M160 176h18v18h-18z" />
          <path className="draw" d="M48 228h30M122 228h156M322 228h30" />
          <circle className="draw" cx="100" cy="232" r="22" />
          <circle className="draw" cx="100" cy="232" r="8" />
          <circle className="draw" cx="300" cy="232" r="22" />
          <circle className="draw" cx="300" cy="232" r="8" />
          <path className="draw" d="M70 160h60M70 176h40" />
          <path className="draw acc" d="M10 282c110-26 250 18 380-12" strokeDasharray="4 7" stroke="#e8262e" />
        </Frame>
      );
    case "protection":
      return (
        <Frame>
          <circle className="draw" cx="200" cy="92" r="32" />
          <path className="draw" d="M178 86h16v8h-16zM206 86h16v8h-16zM194 90h12" />
          <path className="draw acc" d="M230 96c12 6 12 26 0 34-6 4-8 12-6 20" stroke="#e8262e" />
          <path className="draw" d="M120 276c0-74 34-122 80-122s80 48 80 122" />
          <path className="draw" d="M184 156l16 40 16-40M200 196l-8-24 8-14 8 14z" />
          <path className="draw" d="M200 200v70" />
          <circle className="draw" cx="92" cy="150" r="16" strokeDasharray="3 5" />
          <path className="draw" d="M60 276c0-44 14-74 32-82 18 8 32 38 32 82" strokeDasharray="3 5" />
        </Frame>
      );
    default:
      return (
        <Frame>
          <path className="draw" d="M340 50v100M340 100h-42l-22 20" />
          <path className="draw" d="M118 82 284 60l10 52-164 22z" />
          <path className="draw" d="M118 82 92 92l10 44 28-2" />
          <circle className="draw" cx="106" cy="112" r="12" />
          <circle className="draw acc" cx="262" cy="80" r="4" stroke="#e8262e" />
          <path className="draw" d="M98 122 26 280M110 126l68 154" strokeDasharray="3 6" />
          <path className="draw" d="M40 250c40 18 100 22 130 10" strokeDasharray="3 6" />
        </Frame>
      );
  }
}

export function SectorGlyph({ i }: { i: number }) {
  const d = [
    "M15 90V35h30v55M45 90V12h40v78M22 48h16M22 62h16M52 28h26M52 44h26M52 60h26M8 90h84",
    "M10 90V50l30-24 30 24v40M62 90V60l22-18 14 12v36M28 90V68h18v22M4 90h94",
    "M8 90V55l25-16v16l25-16v16l25-16v51M70 90V25h18v65M74 18c0-8 10-8 10-16M4 90h94",
    "M10 40 50 18l40 22M18 40v42M38 40v42M62 40v42M82 40v42M8 82h84M14 40h72",
  ][i];
  return (
    <svg viewBox="0 0 100 100" {...S} strokeWidth={1.6} aria-hidden>
      <path d={d} />
    </svg>
  );
}

export const ChipIcon = {
  eye: (
    <svg viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M1 7c3-4.5 7-6 11-6s8 1.5 11 6c-3 4.5-7 6-11 6S4 11.5 1 7z" />
      <circle cx="12" cy="7" r="2.6" fill="currentColor" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 20 22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M10 1 19 4.5v6.5c0 5-4 8.5-9 10-5-1.5-9-5-9-10V4.5z" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 26 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 4 19 1l1.6 7L4.5 11zM20 3.5 25 6v3l-4.6-1.2M8 11l-1.5 4" />
    </svg>
  ),
};

export const Arrow = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="M2 12 12 2M4 2h8v8" />
  </svg>
);
