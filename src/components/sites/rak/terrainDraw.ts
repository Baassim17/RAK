// Pure ridge-line terrain renderer (no DOM access), shared by the Web Worker and the main-thread fallback.

export type TerrainOptions = {
  /** draw the red "CONTACT · CLEAR" markers picked up by the scan beam */
  contacts?: boolean;
  /** where the ridges start, as a fraction of canvas height */
  top?: number;
  /** vertical span of the ridge rows, as a fraction of canvas height */
  span?: number;
  /** beam speed multiplier */
  speed?: number;
};

type Ctx2D = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export function createTerrainRenderer(ctx: Ctx2D, { contacts = true, top = 0.3, span = 0.62, speed = 1 }: TerrainOptions) {
  let W = 0, H = 0;
  const marks = contacts
    ? Array.from({ length: 7 }, (_, i) => ({ fx: 0.12 + i * 0.13 + Math.random() * 0.05, row: 8 + Math.floor(Math.random() * 18), hit: -10 }))
    : [];
  const path: number[] = [];

  const ridge = (x: number, row: number, t: number) => {
    const u = x / W;
    const peak = Math.exp(-(((u - 0.66) / 0.2) ** 2)) + Math.exp(-(((u - 0.38) / 0.12) ** 2)) * 0.55 + Math.exp(-(((u - 0.9) / 0.08) ** 2)) * 0.4;
    const n = Math.sin(u * 22 + row * 0.7 + t * 0.4) * 0.12 + Math.sin(u * 47 - row * 1.3 + t * 0.25) * 0.06 + Math.sin(u * 9 + row * 0.3) * 0.2;
    const depth = 1 - row / 34;
    return (peak + n * (0.6 + peak)) * Math.min(H, W * 0.75) * 0.2 * (0.35 + depth * 0.9);
  };

  return {
    resize(w: number, h: number, dpr: number) {
      W = w; H = h;
      ctx.canvas.width = Math.round(w * dpr);
      ctx.canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    },
    draw(t: number) {
      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);
      const rows = 34, y0top = H * top, gap = (H * span) / rows;
      const sx = (((t * 0.085 * speed) % 1.25) - 0.12) * W;
      const g = ctx.createLinearGradient(sx - 260, 0, sx + 40, 0);
      g.addColorStop(0, "rgba(126,164,255,0.35)");
      g.addColorStop(0.85, "rgba(190,212,255,1)");
      g.addColorStop(1, "rgba(126,164,255,0.35)");
      const STEP = 12;
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        const y0 = y0top + r * gap;
        path.length = 0;
        for (let x = 0; x <= W + STEP; x += STEP) path.push(y0 - ridge(x, r, t));
        ctx.beginPath();
        ctx.moveTo(0, path[0]);
        for (let k = 1; k < path.length; k++) ctx.lineTo(k * STEP, path[k]);
        // occlusion fill only down to this row's baseline — rows behind never dip below it
        ctx.lineTo(W, y0 + 1); ctx.lineTo(0, y0 + 1); ctx.closePath();
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(2,10,31,0.94)";
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, path[0]);
        for (let k = 1; k < path.length; k++) ctx.lineTo(k * STEP, path[k]);
        ctx.globalAlpha = 0.3 + (r / rows) * 0.5;
        ctx.strokeStyle = g;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      const beam = ctx.createLinearGradient(sx - 220, 0, sx, 0);
      beam.addColorStop(0, "rgba(42,93,191,0)");
      beam.addColorStop(1, "rgba(126,164,255,0.16)");
      ctx.fillStyle = beam;
      ctx.fillRect(sx - 220, 0, 220, H);
      ctx.fillStyle = "rgba(170,198,255,0.7)";
      ctx.fillRect(sx, 0, 1, H);
      ctx.font = "10px ui-monospace, monospace";
      marks.forEach((c, i) => {
        const x = c.fx * W, y = y0top + c.row * gap - ridge(x, c.row, t);
        if (Math.abs(x - sx) < 6) c.hit = t;
        const age = t - c.hit;
        if (age >= 0 && age < 3.2) {
          const al = 1 - age / 3.2;
          ctx.strokeStyle = `rgba(232,38,46,${al})`;
          const s = 7 + age * 3;
          ctx.strokeRect(x - s, y - s, s * 2, s * 2);
          ctx.fillStyle = `rgba(243,241,236,${al})`;
          ctx.fillText(`CONTACT 0${i + 1} · CLEAR`, x + s + 6, y + 3);
        }
        ctx.fillStyle = "rgba(232,38,46,0.9)";
        ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
      });
    },
  };
}

/** Messages the main thread sends to the terrain worker. */
export type TerrainMessage =
  | { type: "init"; canvas: OffscreenCanvas; opts: TerrainOptions; w: number; h: number; dpr: number; still: boolean }
  | { type: "resize"; w: number; h: number; dpr: number }
  | { type: "run"; on: boolean };

/**
 * Worker entry. Must stay self-contained (no imports, no outer references): it is serialised with
 * Function.prototype.toString() and started from a Blob URL together with createTerrainRenderer,
 * so it works without any bundler-specific worker support.
 */
export function terrainWorkerMain(create: typeof createTerrainRenderer) {
  let renderer: ReturnType<typeof createTerrainRenderer> | null = null;
  let running = false;
  let still = false;
  let pending = false;
  let last = 0;
  const MIN_GAP = 1000 / 61; // cap at ~60fps — plenty for a slow ambient animation, even on 120/144Hz screens
  // workers get vsync-aligned requestAnimationFrame in modern browsers; fall back to a timer elsewhere
  const schedule = (cb: (t: number) => void) => {
    if (typeof requestAnimationFrame === "function") requestAnimationFrame(cb);
    else setTimeout(() => cb(performance.now()), 16);
  };
  const loop = (now: number) => {
    pending = false;
    if (!running || !renderer) return;
    if (now - last >= MIN_GAP) { last = now; renderer.draw(now / 1000); }
    pending = true;
    schedule(loop);
  };
  addEventListener("message", (e: MessageEvent<TerrainMessage>) => {
    const m = e.data;
    if (m.type === "init") {
      const ctx = m.canvas.getContext("2d");
      if (!ctx) return;
      renderer = create(ctx, m.opts);
      renderer.resize(m.w, m.h, m.dpr);
      still = m.still;
      renderer.draw(still ? 0 : performance.now() / 1000);
    } else if (m.type === "resize") {
      renderer?.resize(m.w, m.h, m.dpr);
      renderer?.draw(still ? 0 : performance.now() / 1000);
    } else if (m.type === "run") {
      running = m.on && !still;
      if (running && !pending) { pending = true; schedule(loop); }
    }
  });
}
