import type { CSSProperties } from "react";
import type { Segment } from "@/data/site";

type Props = {
  /** Plain text, or segments where `em` renders in the italic serif. */
  text: string | Segment[];
  by?: "word" | "char";
  delay?: number;
  stagger?: number;
};

/**
 * Splits text into masked words or characters for the rise-in animation. Screen readers get the
 * plain text once; the animated pieces are hidden from them.
 */
export function SplitText({ text, by = "word", delay = 0, stagger = by === "char" ? 0.045 : 0.035 }: Props) {
  const segments = typeof text === "string" ? [{ text }] : text;
  const plain = segments.map((s) => s.text).join("");

  let i = 0;
  const pieces = segments.flatMap((segment, s) =>
    segment.text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((token, t) => {
        if (/^\s+$/.test(token)) return " ";
        const units = by === "char" ? Array.from(token) : [token];
        return (
          <span key={`${s}-${t}`} className={`split-w ${segment.em ? "font-serif italic font-normal tracking-normal" : ""}`}>
            {units.map((unit, u) => (
              <span key={u} className="split-i" style={{ "--d": `${(delay + i++ * stagger).toFixed(3)}s` } as CSSProperties}>
                {unit}
              </span>
            ))}
          </span>
        );
      }),
  );

  return (
    <>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">{pieces}</span>
    </>
  );
}
