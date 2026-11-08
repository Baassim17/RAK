"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { reducedMotion } from "./SmoothScroll";
import { useTerrain } from "./Terrain";

/*
 * Real 3D terrain of Ras Al Khaimah and the Hajar mountains (Jebel Jais), built from satellite
 * elevation data (AWS Terrain Tiles / SRTM, z12, ~34 m; downsampled to a 512² grid ≈ 85 m per cell,
 * covering ~44 × 44 km from the Gulf coast to Musandam). See public/sites/rak/terrain/rak-dem.json.
 *
 * Rendered with WebGL: moonlit relief shading, faint 50 m / 250 m contour lines, a surveillance scan
 * beam that lights the topography as it sweeps east, the Gulf as a dark sea with moon glints, and
 * warm city lights on the Ras Al Khaimah coastal plain. Markers are pinned to real coordinates.
 */

type Marker = { grid: [number, number]; lat: number; lon: number };
type Meta = { size: number; maxElevation: number; markers: { jebelJais: Marker; rakCity: Marker } };
type Dem = { h: Uint16Array; meta: Meta };

let demPromise: Promise<Dem> | null = null;
const loadDem = () =>
  (demPromise ??= Promise.all([
    fetch("/sites/rak/terrain/rak-dem-512.bin").then((r) => r.arrayBuffer()),
    fetch("/sites/rak/terrain/rak-dem.json").then((r) => r.json() as Promise<Meta>),
  ]).then(([b, meta]) => ({ h: new Uint16Array(b), meta })));

const EXAG = 2.4; // vertical exaggeration — true scale reads flat over a 44 km span
const KM = 44; // world width in km (1 world unit)
const heightScale = EXAG / (KM * 1000);

const vert = /* glsl */ `
  attribute float aH;
  varying float vH;
  varying vec3 vN;
  varying vec3 vW;
  void main() {
    vH = aH;
    vN = normalize(mat3(modelMatrix) * normal);
    vec4 w = modelMatrix * vec4(position, 1.0);
    vW = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const frag = /* glsl */ `
  uniform float uTime;
  uniform float uBeamX;
  uniform float uCity;
  uniform vec2 uCityPos;
  uniform vec3 uFog;
  uniform float uFogNear;
  uniform float uFogFar;
  varying float vH;
  varying vec3 vN;
  varying vec3 vW;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec3 n = normalize(vN);
    vec3 L = normalize(vec3(-0.55, 0.72, -0.4));          // moonlight from the west / north-west
    float diff = max(dot(n, L), 0.0);
    float h = vH;
    bool sea = h < 0.5;
    vec3 sky = vec3(0.49, 0.64, 1.0);
    vec3 col;

    // scan beam: bright edge + fading trail behind it (beam travels west → east)
    float d = vW.x - uBeamX;
    float trail = d < 0.0 ? exp(d * 7.0) : 0.0;
    float edge = exp(-abs(d) * 260.0);

    if (sea) {
      vec3 V = normalize(cameraPosition - vW);
      vec3 R = reflect(-L, vec3(0.0, 1.0, 0.0));
      float glint = pow(max(dot(R, V), 0.0), 40.0);
      float ripple = 0.5 + 0.5 * sin(vW.x * 820.0 + uTime * 0.7) * sin(vW.z * 640.0 - uTime * 0.5);
      col = uFog * 0.9 + vec3(0.22, 0.32, 0.58) * glint * (0.35 + 0.65 * ripple);
      vec2 g = abs(fract(vW.xz * 36.0) - 0.5);
      float gw = fwidth(vW.x * 36.0) * 1.2;
      col += sky * (1.0 - smoothstep(0.0, gw, min(g.x, g.y))) * (0.035 + 0.25 * trail);
      col += sky * edge * 0.35;
    } else {
      // relief colour by elevation: coastal plain → rock → high peaks
      vec3 low = vec3(0.045, 0.06, 0.11);
      vec3 rock = vec3(0.1, 0.135, 0.24);
      vec3 peak = vec3(0.3, 0.36, 0.52);
      vec3 base = mix(low, rock, smoothstep(30.0, 600.0, h));
      base = mix(base, peak, smoothstep(1000.0, 1950.0, h));
      col = base * (0.3 + 1.75 * diff);
      col *= mix(0.62, 1.0, n.y);                          // steep faces read darker

      // contour lines every 50 m, stronger every 250 m — they light up as the beam passes
      float c1 = h / 50.0, c2 = h / 250.0;
      float l1 = 1.0 - smoothstep(0.0, fwidth(c1) * 1.3, abs(fract(c1 - 0.5) - 0.5));
      float l2 = 1.0 - smoothstep(0.0, fwidth(c2) * 1.5, abs(fract(c2 - 0.5) - 0.5));
      col += sky * ((0.05 + 0.75 * trail) * l1 + (0.12 + 0.85 * trail) * l2) * 0.6;
      col += vec3(0.12, 0.2, 0.45) * trail * 0.16;
      col += sky * edge;

      // Ras Al Khaimah city lights on the low coastal plain
      if (uCity > 0.0 && h < 80.0) {
        float near = exp(-dot(vW.xz - uCityPos, vW.xz - uCityPos) / 0.009);
        vec2 q = vW.xz * 950.0;
        float r = hash(floor(q));
        float blob = smoothstep(0.42, 0.0, length(fract(q) - 0.5));
        float lit = step(1.0 - 0.3 * near, r);
        float flicker = 0.75 + 0.25 * sin(uTime * 1.7 + r * 60.0);
        col += vec3(1.0, 0.66, 0.32) * blob * lit * flicker * uCity * 2.2;
        col += vec3(0.55, 0.32, 0.12) * near * 0.12 * uCity * smoothstep(80.0, 0.0, h);
      }
    }

    float dist = length(cameraPosition - vW);
    col = mix(col, uFog, smoothstep(uFogNear, uFogFar, dist));
    // dissolve the edges of the data tile into haze so the land reads as endless
    float edgeD = max(abs(vW.x), abs(vW.z));
    col = mix(col, uFog, smoothstep(sea ? 0.2 : 0.34, 0.5, edgeD));
    gl_FragColor = vec4(col, 1.0);
  }
`;

const VIEWS = {
  hero: { pos: new THREE.Vector3(-0.92, 0.3, 0.86), target: new THREE.Vector3(-0.02, 0.0, 0.02), fog: [0.8, 2.1], speed: 0.045, labels: true },
  footer: { pos: new THREE.Vector3(-0.55, 0.62, 1.15), target: new THREE.Vector3(0.02, 0.02, -0.06), fog: [1.0, 2.4], speed: 0.03, labels: false },
} as const;

function Fallback2D({ className }: { className: string }) {
  const host = useTerrain({ contacts: false });
  return <div className={className} ref={host} aria-hidden />;
}

export function Terrain3D({ variant, className }: { variant: "hero" | "footer"; className: string }) {
  const host = useRef<HTMLDivElement>(null);
  const jais = useRef<HTMLDivElement>(null);
  const city = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const box = host.current;
    if (!box) return;
    let disposed = false;
    let cleanup = () => {};

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      // no WebGL (old device / disabled GPU): fall back to the 2D ridge lines
      queueMicrotask(() => setFailed(true));
      return;
    }
    const view = VIEWS[variant];
    const mobile = window.innerWidth < 760;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5));
    renderer.setClearColor("#020a1f");
    renderer.domElement.style.display = "block";
    box.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.001, 10);

    loadDem().then(({ h, meta }) => {
      if (disposed) return;
      const N = meta.size, seg = mobile ? 255 : 511;
      const geo = new THREE.PlaneGeometry(1, 1, seg, seg);
      geo.rotateX(-Math.PI / 2);
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const aH = new Float32Array(pos.count);
      const sample = (gx: number, gy: number) => {
        const x0 = Math.floor(gx), y0 = Math.floor(gy), x1 = Math.min(x0 + 1, N - 1), y1 = Math.min(y0 + 1, N - 1);
        const fx = gx - x0, fy = gy - y0;
        const a = h[y0 * N + x0], b = h[y0 * N + x1], c = h[y1 * N + x0], d = h[y1 * N + x1];
        return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
      };
      for (let i = 0; i < pos.count; i++) {
        const col = i % (seg + 1), row = Math.floor(i / (seg + 1));
        const m = sample((col / seg) * (N - 1), (row / seg) * (N - 1));
        aH[i] = m;
        pos.setY(i, m * heightScale);
      }
      geo.setAttribute("aH", new THREE.BufferAttribute(aH, 1));
      geo.computeVertexNormals();

      const toWorld = (mk: Marker) => {
        const [gx, gy] = mk.grid;
        return new THREE.Vector3(gx / (N - 1) - 0.5, sample(gx, gy) * heightScale, gy / (N - 1) - 0.5);
      };
      const jaisW = toWorld(meta.markers.jebelJais);
      const cityW = toWorld(meta.markers.rakCity);

      const mat = new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms: {
          uTime: { value: 0 },
          uBeamX: { value: -0.6 },
          uCity: { value: 1 },
          uCityPos: { value: new THREE.Vector2(cityW.x, cityW.z) },
          // raw sRGB values of #020a1f: the custom shader writes colours unconverted, so passing a THREE.Color
          // (converted to linear) would render the haze darker than the page and expose the map edges
          uFog: { value: new THREE.Vector3(2 / 255, 10 / 255, 31 / 255) },
          uFogNear: { value: view.fog[0] },
          uFogFar: { value: view.fog[1] },
        },
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      const size = () => {
        const w = box.clientWidth, hh = box.clientHeight;
        renderer.setSize(w, hh, false);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        camera.aspect = w / Math.max(1, hh);
        // keep the mountains framed on tall/narrow screens
        camera.fov = camera.aspect < 1 ? 52 : 34;
        camera.updateProjectionMatrix();
      };
      size();
      const ro = new ResizeObserver(size);
      ro.observe(box);

      let mx = 0, my = 0, sx = 0, sy = 0;
      const onMove = (e: PointerEvent) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
      if (variant === "hero") window.addEventListener("pointermove", onMove, { passive: true });

      const still = reducedMotion();
      const v = new THREE.Vector3();
      const place = (el: HTMLDivElement | null, p: THREE.Vector3, hitAt: number, t: number) => {
        if (!el) return;
        v.copy(p).project(camera);
        const on = v.z < 1 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1;
        el.style.opacity = on ? "1" : "0";
        el.style.transform = `translate3d(${(v.x * 0.5 + 0.5) * box.clientWidth}px, ${(-v.y * 0.5 + 0.5) * box.clientHeight}px, 0)`;
        el.classList.toggle("hit", t - hitAt < 2.6);
      };
      let jaisHit = -10, cityHit = -10;

      let raf = 0, last = 0, running = false;
      const t0 = performance.now();
      const frame = (now: number) => {
        if (!running) return;
        raf = requestAnimationFrame(frame);
        if (now - last < 1000 / 61) return; // 60fps cap
        last = now;
        const t = still ? 8 : (now - t0) / 1000;
        const beam = -0.62 + ((t * view.speed) % 1) * 1.3;
        const prevBeam = mat.uniforms.uBeamX.value as number;
        if (prevBeam < jaisW.x && beam >= jaisW.x) jaisHit = t;
        if (prevBeam < cityW.x && beam >= cityW.x) cityHit = t;
        mat.uniforms.uTime.value = t;
        mat.uniforms.uBeamX.value = beam;

        // camera: slow drift + pointer parallax + scroll push-in (hero)
        sx += (mx - sx) * 0.05; sy += (my - sy) * 0.05;
        const scroll = variant === "hero" ? Math.min(1, window.scrollY / Math.max(1, window.innerHeight)) : 0;
        const drift = Math.sin(t * 0.08) * 0.06;
        camera.position.set(
          view.pos.x + drift + sx * 0.08 + scroll * 0.18,
          view.pos.y + sy * -0.04 - scroll * 0.05,
          view.pos.z + Math.cos(t * 0.06) * 0.04 - scroll * 0.14,
        );
        camera.lookAt(view.target);
        renderer.render(scene, camera);
        if (view.labels) { place(jais.current, jaisW, jaisHit, t); place(city.current, cityW, cityHit, t); }
      };
      const setRun = (on: boolean) => {
        if (on === running) return;
        running = on;
        cancelAnimationFrame(raf);
        if (on) raf = requestAnimationFrame(frame);
      };
      let inView = true;
      const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; setRun(inView && !document.hidden); });
      io.observe(box);
      const vis = () => setRun(inView && !document.hidden);
      document.addEventListener("visibilitychange", vis);
      // draw at least one frame immediately
      running = true; raf = requestAnimationFrame(frame);
      box.classList.add("ready");

      cleanup = () => {
        running = false;
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", vis);
        window.removeEventListener("pointermove", onMove);
        geo.dispose();
        mat.dispose();
      };
    }).catch(() => { if (!disposed) setFailed(true); });

    return () => {
      disposed = true;
      cleanup();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [variant]);

  if (failed) return <Fallback2D className={className} />;

  return (
    <div className={`${className} t3d`} ref={host} aria-hidden>
      {variant === "hero" && (
        <>
          <div className="t3d-mark" ref={jais}>
            <i />
            <span className="label">Jebel Jais<em>25.948°N 56.163°E</em></span>
          </div>
          <div className="t3d-mark city" ref={city}>
            <i />
            <span className="label">Ras Al Khaimah<em>25.790°N 55.940°E</em></span>
          </div>
        </>
      )}
    </div>
  );
}
