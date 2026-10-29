import type { ReactNode } from "react";

type Props = {
  index: number;
  caption: string;
  className?: string;
  children: ReactNode;
};

/** Drafting-sheet frame around a figure: corner ticks, figure number, and an honest caption. */
export function FigureFrame({ index, caption, className = "", children }: Props) {
  const corners = ["left-0 top-0", "right-0 top-0 rotate-90", "bottom-0 right-0 rotate-180", "bottom-0 left-0 -rotate-90"];

  return (
    <figure className={`relative flex flex-col bg-ink-2 text-on-ink ${className}`}>
      <div className="grid-ink relative min-h-0 flex-1">
        {corners.map((c) => (
          <span key={c} aria-hidden="true" className={`absolute h-3 w-3 border-l border-t border-[var(--p)] ${c}`} />
        ))}
        <div className="absolute inset-[4%]">{children}</div>
      </div>
      <figcaption className="eyebrow flex items-center justify-between gap-4 border-t border-line-ink px-4 py-3 text-on-ink-muted">
        <span>
          <span className="text-[var(--p)]">Fig. {String(index + 1).padStart(2, "0")}</span> — {caption}
        </span>
        <span className="hidden shrink-0 sm:inline">Illustrative diagram</span>
      </figcaption>
    </figure>
  );
}
