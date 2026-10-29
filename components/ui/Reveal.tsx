"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  as?: "div" | "li" | "section" | "h2" | "p";
  id?: string;
  className?: string;
  style?: CSSProperties;
  /** Only animate masked children (SplitText) instead of fading the whole element. */
  mask?: boolean;
  children: ReactNode;
};

/**
 * Animates its content in when it scrolls into view. Content that is already on screen, or any
 * content when reduced motion is requested, is never hidden, so nothing depends on this running.
 */
export function Reveal({ as: Tag = "div", id, className = "", style, mask = false, children }: Props) {
  const ref = useRef<HTMLDivElement & HTMLLIElement & HTMLHeadingElement & HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.revealState = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.revealState = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} style={style} className={`${mask ? "reveal-mask" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
