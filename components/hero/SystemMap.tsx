"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Node = { id: string; x: number; y: number; anchor?: "start" | "end" };

const nodes: Node[] = [
  { id: "Django", x: 300, y: 30 },
  { id: "React", x: 80, y: 50 },
  { id: "PostgreSQL", x: 300, y: 272 },
  { id: "Kafka", x: 560, y: 140, anchor: "end" },
  { id: "Spring", x: 520, y: 250, anchor: "end" },
  { id: "Python", x: 50, y: 180 },
  { id: "Flask", x: 90, y: 262 },
  { id: "Godot", x: 170, y: 104 },
];

// Orthogonal traces between nodes; "core" is the centre of the map.
const edges: { from: string; to: string; d: string; packet?: number }[] = [
  { from: "core", to: "Django", d: "M300 150 V30", packet: 2.6 },
  { from: "core", to: "Kafka", d: "M300 150 H420 V140 H560", packet: 2.2 },
  { from: "Kafka", to: "Spring", d: "M560 140 V250 H520", packet: 1.8 },
  { from: "core", to: "PostgreSQL", d: "M300 150 V272", packet: 2.4 },
  { from: "Spring", to: "PostgreSQL", d: "M520 250 V272 H300" },
  { from: "core", to: "React", d: "M300 150 H200 V50 H80" },
  { from: "core", to: "Python", d: "M300 150 H200 V180 H50", packet: 3 },
  { from: "Python", to: "Flask", d: "M50 180 V262 H90" },
  { from: "core", to: "Godot", d: "M300 150 V104 H170" },
];

/**
 * The hero's map of the stack. Pointing at a node lights its traces. Packets only move while visible.
 */
export function SystemMap({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      svg.pauseAnimations();
      return;
    }

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });
    visibility.observe(svg);

    if (!window.matchMedia("(pointer: fine)").matches) return () => visibility.disconnect();

    // Pointer parallax: write CSS variables directly, at most once per frame.
    const host = svg.closest("section") ?? document.body;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        svg.style.setProperty("--mx", x.toFixed(3));
        svg.style.setProperty("--my", y.toFixed(3));
      });
    };
    host.addEventListener("pointermove", onMove);
    return () => {
      visibility.disconnect();
      host.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const lit = (edge: (typeof edges)[number]) => hovered !== null && (edge.from === hovered || edge.to === hovered);
  const layer = (depth: number): CSSProperties => ({
    transform: `translate(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px))`,
    transition: "transform 900ms var(--ease)",
  });
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 300"
      className={`overflow-visible ${className}`}
      aria-hidden="true"
      onMouseLeave={() => setHovered(null)}
    >
      <g style={layer(-14)}>
        {edges.map((edge, i) => (
          <path
            key={edge.d}
            id={`edge-${i}`}
            d={edge.d}
            pathLength={1}
            fill="none"
            className="map-edge"
            stroke={lit(edge) ? "var(--signal)" : "rgb(18 18 17 / 0.3)"}
            strokeWidth={lit(edge) ? 2 : 1}
            style={{ "--d": `${0.25 + i * 0.07}s`, transition: "stroke 200ms" } as CSSProperties}
          />
        ))}
        {edges.map((edge, i) =>
          edge.packet ? (
            <rect key={`p-${edge.d}`} x={-3} y={-3} width={6} height={6} fill="var(--signal)" visibility="hidden">
              <set attributeName="visibility" to="visible" begin={`${1.2 + i * 0.3}s`} />
              <animateMotion dur={`${edge.packet}s`} repeatCount="indefinite" begin={`${1.2 + i * 0.3}s`}>
                <mpath href={`#edge-${i}`} />
              </animateMotion>
            </rect>
          ) : null,
        )}
      </g>

      <g style={layer(-24)}>
        <g className="map-node" style={{ "--d": "0.2s" } as CSSProperties}>
          <rect x={288} y={138} width={24} height={24} fill="var(--ink)" />
          <rect x={296} y={146} width={8} height={8} fill="var(--signal)" />
        </g>
        {nodes.map((node, i) => {
          const on = hovered === node.id;
          const end = node.anchor === "end";
          return (
            <g
              key={node.id}
              className="map-node"
              style={{ "--d": `${0.6 + i * 0.06}s` } as CSSProperties}
              onMouseEnter={() => setHovered(node.id)}
            >
              <rect x={node.x - 18} y={node.y - 18} width={36} height={36} fill="transparent" />
              <rect
                x={node.x - 5}
                y={node.y - 5}
                width={10}
                height={10}
                fill={on ? "var(--signal)" : "var(--paper)"}
                stroke="var(--ink)"
                strokeWidth={1.25}
                style={{ transition: "fill 200ms" }}
              />
              <text
                x={end ? node.x - 14 : node.x + 14}
                y={node.y + 4}
                textAnchor={end ? "end" : "start"}
                className="map-label font-mono uppercase"
                letterSpacing="0.08em"
                fill={on ? "var(--ink)" : "var(--muted)"}
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </g>

    </svg>
  );
}
