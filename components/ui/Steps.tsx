type Surface = "paper" | "ink" | "signal";

const fill: Record<Surface, string> = {
  paper: "var(--paper)",
  ink: "var(--ink)",
  signal: "var(--signal)",
};

/**
 * Stepped edge between two surfaces, drawn like a routed circuit trace. The upper surface
 * fills the block and the lower surface climbs into it in right-angled steps.
 */
export function Steps({ from, to, flip = false }: { from: Surface; to: Surface; flip?: boolean }) {
  const d = flip
    ? "M0 0 H240 V20 H520 V40 H840 V60 H1200 V80 H0 Z"
    : "M0 60 H360 V40 H680 V20 H960 V0 H1200 V80 H0 Z";

  return (
    <div aria-hidden="true" className="relative -mt-px h-[clamp(2rem,5vw,4.5rem)]" style={{ background: fill[from] }}>
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d={d} fill={fill[to]} />
      </svg>
    </div>
  );
}
