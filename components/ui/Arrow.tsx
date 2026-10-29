const rotation = { right: 0, down: 90, left: 180, up: -90, "up-right": -45 } as const;

/** Arrow drawn as SVG so it never depends on a font having the glyph. */
export function Arrow({ dir = "right", className = "" }: { dir?: keyof typeof rotation; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`inline-block h-[0.85em] w-[0.85em] shrink-0 ${className}`}
      style={{ rotate: `${rotation[dir]}deg` }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" strokeLinecap="square" />
    </svg>
  );
}
