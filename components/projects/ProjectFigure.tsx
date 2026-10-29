"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { FigureKind } from "@/data/projects";

type Props = {
  kind: FigureKind;
  /** Animations run only while active. */
  active: boolean;
  className?: string;
};

const t = "font-mono uppercase";
const labelColor = "rgb(242 240 235 / 0.55)";
const rule = "rgb(242 240 235 / 0.16)";

/** Animated, illustrative diagram for a project. Colour comes from the `--p` CSS variable. */
export function ProjectFigure({ kind, active, className = "" }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (active && !reduce) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [active]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 640 480"
      className={`fig h-full w-full ${className}`}
      data-active={active}
      fill="none"
      aria-hidden="true"
    >
      {kind === "documents" && <Documents />}
      {kind === "stream" && <Stream />}
      {kind === "composer" && <Composer />}
      {kind === "arc" && <Arc />}
    </svg>
  );
}

function Label({ x, y, children, anchor, fill = labelColor }: { x: number; y: number; children: string; anchor?: "middle" | "end"; fill?: string }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={`${t} fig-label`} letterSpacing="1.4" fill={fill}>
      {children}
    </text>
  );
}

function Documents() {
  const lines = [150, 166, 182, 198, 214, 230, 246, 262, 278, 294, 310, 326];
  const widths = [150, 120, 146, 96, 138, 150, 110, 144, 128, 84, 140, 100];
  const marks = [
    { y: 182, w: 92, field: "Title", fy: 150, delay: "0s" },
    { y: 246, w: 70, field: "Date", fy: 230, delay: "0.55s" },
    { y: 310, w: 110, field: "Body", fy: 310, delay: "1.1s" },
  ];

  return (
    <g>
      <Label x={64} y={64}>Document</Label>
      <Label x={392} y={64}>Fields</Label>

      <rect x="64" y="96" width="190" height="250" fill="#262624" stroke={rule} />
      <rect x="80" y="108" width="190" height="250" fill="#2e2e2b" stroke={rule} />
      <rect x="96" y="120" width="190" height="250" fill="var(--paper)" />
      {lines.map((y, i) => (
        <rect key={y} x="114" y={y - 2} width={widths[i]} height="4" fill="rgb(18 18 17 / 0.14)" />
      ))}
      {marks.map((m) => (
        <rect key={m.y} className="d-mark" style={{ animationDelay: m.delay }} x="112" y={m.y - 5} width={m.w} height="10" fill="var(--p)" opacity="0.9" />
      ))}
      <rect className="d-scan" x="96" y="120" width="190" height="2" fill="var(--p)" />

      {marks.map((m, i) => (
        <g key={m.field} className="d-appear" style={{ animationDelay: m.delay }}>
          <path d={`M${120 + m.w} ${m.y} C ${330} ${m.y} ${350} ${m.fy + 24} 392 ${m.fy + 24}`} stroke="var(--p)" className="d-dash" />
          <rect x="392" y={m.fy} width="184" height="48" stroke={rule} fill="#1f1f1d" />
          <Label x={406} y={m.fy + 19}>{m.field}</Label>
          <rect x="406" y={m.fy + 28} width={[120, 84, 140][i]} height="6" fill="rgb(242 240 235 / 0.75)" />
        </g>
      ))}

      <g className="d-appear" style={{ animationDelay: "1.6s" }}>
        <rect x="392" y="392" width="16" height="16" fill="var(--p)" />
        <path d="M396 400 l3 3 l6 -7" stroke="var(--ink)" strokeWidth="2" />
        <Label x={420} y={404} fill="rgb(242 240 235 / 0.85)">Marked</Label>
      </g>
    </g>
  );
}

function Stream() {
  const lanes = [196, 240, 284];
  const services = [
    { y: 150, path: "M420 196 H452 V175 H488" },
    { y: 215, path: "M420 240 H488" },
    { y: 280, path: "M420 284 H452 V305 H488" },
  ];

  return (
    <g>
      <Label x={64} y={64}>Flow</Label>

      <rect x="40" y="212" width="116" height="56" stroke="var(--p)" />
      <Label x={98} y={244} anchor="middle" fill="rgb(242 240 235 / 0.85)">Payment</Label>
      <path id="s-in" d="M156 240 H232" stroke={rule} />

      <rect x="232" y="160" width="188" height="160" stroke={rule} fill="#1f1f1d" />
      <Label x={248} y={180}>Stream</Label>
      {lanes.map((y, i) => (
        <g key={y}>
          <path id={`s-lane-${i}`} d={`M244 ${y} H408`} stroke={rule} />
          <Label x={412} y={y - 6} anchor="end" fill="rgb(242 240 235 / 0.3)">{`p${i}`}</Label>
        </g>
      ))}

      {services.map((s, i) => (
        <g key={s.y}>
          <path id={`s-out-${i}`} d={s.path} stroke={rule} />
          <rect x="488" y={s.y} width="112" height="50" stroke={rule} fill="#1f1f1d" />
          <Label x={544} y={s.y + 29} anchor="middle">{`Service ${String(i + 1).padStart(2, "0")}`}</Label>
        </g>
      ))}

      <rect x="232" y="60" width="188" height="44" stroke={rule} />
      <Label x={326} y={86} anchor="middle" fill="rgb(242 240 235 / 0.85)">Shared</Label>
      <path d="M420 82 H620 V150 M544 82 V150" stroke="var(--p)" strokeOpacity="0.55" className="d-dash" />

      <Packet path="s-in" dur={1.6} begin={0} />
      {lanes.map((_, i) => (
        <g key={i}>
          <Packet path={`s-lane-${i}`} dur={2.2 + i * 0.4} begin={0.4 * i} size={10} />
          <Packet path={`s-lane-${i}`} dur={2.2 + i * 0.4} begin={1.1 + 0.4 * i} size={10} />
          <Packet path={`s-out-${i}`} dur={1.4} begin={0.8 + i * 0.5} />
        </g>
      ))}

    </g>
  );
}

function Packet({ path, dur, begin, size = 7 }: { path: string; dur: number; begin: number; size?: number }) {
  return (
    <rect x={-size / 2} y={-size / 2} width={size} height={size * 0.7} fill="var(--p)">
      <animateMotion dur={`${dur}s`} begin={`-${begin}s`} repeatCount="indefinite">
        <mpath href={`#${path}`} />
      </animateMotion>
    </rect>
  );
}

function Composer() {
  const blocks = [
    { label: "Header", y: 110, slot: { x: 236, y: 84, w: 188, h: 26 } },
    { label: "Image", y: 162, slot: { x: 236, y: 120, w: 188, h: 104 } },
    { label: "Text", y: 214, slot: { x: 236, y: 236, w: 188, h: 58 } },
    { label: "Button", y: 266, slot: { x: 236, y: 306, w: 84, h: 26 } },
  ];

  return (
    <g>
      <Label x={40} y={64}>Blocks</Label>
      <Label x={330} y={64} anchor="middle">Live preview</Label>
      <Label x={470} y={64}>Prompt</Label>

      {blocks.map((b) => (
        <g key={b.label}>
          <rect x="40" y={b.y} width="132" height="40" stroke={rule} fill="#1f1f1d" />
          <Label x={56} y={b.y + 24}>{b.label}</Label>
        </g>
      ))}

      <rect x="220" y="72" width="220" height="356" fill="var(--paper)" />
      {blocks.map((b, i) => (
        <g
          key={b.label}
          className="d-block"
          style={{ "--fx": `${40 - b.slot.x}px`, "--fy": `${b.y - b.slot.y}px`, animationDelay: `${i * 0.45}s` } as CSSProperties}
        >
          {b.label === "Image" ? (
            <g>
              <rect x={b.slot.x} y={b.slot.y} width={b.slot.w} height={b.slot.h} fill="var(--p)" opacity="0.85" />
              <path d={`M${b.slot.x} ${b.slot.y + b.slot.h} L${b.slot.x + 70} ${b.slot.y + 48} L${b.slot.x + 110} ${b.slot.y + 78} L${b.slot.x + 140} ${b.slot.y + 58} L${b.slot.x + b.slot.w} ${b.slot.y + b.slot.h}`} fill="rgb(18 18 17 / 0.2)" />
            </g>
          ) : b.label === "Text" ? (
            <g>
              {[0, 14, 28, 42].map((dy, j) => (
                <rect key={dy} x={b.slot.x} y={b.slot.y + dy} width={[188, 170, 182, 110][j]} height="6" fill="rgb(18 18 17 / 0.22)" />
              ))}
            </g>
          ) : b.label === "Button" ? (
            <rect x={b.slot.x} y={b.slot.y} width={b.slot.w} height={b.slot.h} fill="var(--ink)" />
          ) : (
            <rect x={b.slot.x} y={b.slot.y} width={b.slot.w} height={b.slot.h} fill="rgb(18 18 17 / 0.12)" />
          )}
        </g>
      ))}

      <rect x="470" y="84" width="140" height="128" stroke={rule} fill="#1f1f1d" />
      {[106, 122, 138].map((y, i) => (
        <rect key={y} className="d-type" style={{ animationDelay: `${i * 0.6}s` }} x="484" y={y} width={[104, 88, 60][i]} height="5" fill="rgb(242 240 235 / 0.7)" />
      ))}
      <rect className="d-blink" x="484" y="152" width="7" height="12" fill="var(--p)" />
      <Label x={484} y={196}>Notes</Label>

      <path d="M540 212 V272" stroke={rule} />
      <rect x="470" y="272" width="140" height="40" stroke="var(--p)" />
      <Label x={540} y={297} anchor="middle" fill="rgb(242 240 235 / 0.9)">Draft</Label>
      <path d="M470 292 H452 V265 H440" stroke="var(--p)" className="d-dash" />

    </g>
  );
}

function Arc() {
  const trail = [0, 0.05, 0.1, 0.15];
  return (
    <g>
      <text x="28" y="180" className="font-sans" fontSize="132" fontWeight="700" letterSpacing="-7" stroke={rule} fill="none">
        CROSS
      </text>
      <text x="120" y="318" className="font-sans" fontSize="132" fontWeight="700" letterSpacing="-7" stroke={rule} fill="none">
        THROW
      </text>

      <path d="M32 400 H608" stroke="rgb(242 240 235 / 0.4)" />
      {Array.from({ length: 15 }, (_, i) => (
        <path key={i} d={`M${48 + i * 40} 400 v8`} stroke={rule} />
      ))}

      <rect x="92" y="352" width="22" height="48" fill="var(--paper)" />
      <rect x="532" y="352" width="22" height="48" fill="rgb(242 240 235 / 0.35)" />
      <Label x={103} y={430} anchor="middle">P1</Label>
      <Label x={543} y={430} anchor="middle">P2</Label>

      <g>
        <circle cx="543" cy="300" r="30" stroke={rule} />
        <circle cx="543" cy="300" r="18" stroke="rgb(242 240 235 / 0.4)" />
        <circle cx="543" cy="300" r="6" fill="var(--p)" className="d-pulse" />
      </g>

      <path id="a-arc" d="M114 352 Q 320 20 530 296" stroke="var(--p)" strokeOpacity="0.4" strokeDasharray="2 7" />

      {trail.map((lag, i) => (
        <g key={lag} opacity={1 - i * 0.28}>
          <animateMotion dur="2.2s" begin={`-${lag}s`} repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear">
            <mpath href="#a-arc" />
          </animateMotion>
          <g>
            <animateTransform attributeName="transform" type="rotate" values="0;1080;1080" keyTimes="0;0.7;1" dur="2.2s" begin={`-${lag}s`} repeatCount="indefinite" />
            <path d="M-16 0 H14" stroke={i === 0 ? "var(--paper)" : "var(--p)"} strokeWidth="3" />
            <path d="M8 -4 L20 -12 L22 4 Z" fill="var(--p)" />
          </g>
        </g>
      ))}

      <Label x={32} y={64}>Arena · multiplayer</Label>
      <Label x={608} y={64} anchor="end">Godot</Label>
    </g>
  );
}
