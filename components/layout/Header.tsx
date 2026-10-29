"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { LocalTime } from "@/components/ui/LocalTime";
import { showPlaceholders } from "@/data/site";

const nav = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

type Tone = "light" | "dark" | "signal";

const toneClass: Record<Tone, string> = {
  light: "bg-paper text-ink border-line",
  dark: "bg-ink text-on-ink border-line-ink",
  signal: "bg-signal text-ink border-ink/20",
};

type Props = { name: string; resumeHref: string | null; timeZone: string };

export function Header({ name, resumeHref, timeZone }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [tone, setTone] = useState<Tone>("light");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Match the header to the surface just below it, and track which chapter is mid-screen. Probing
  // the DOM on scroll (once per frame) also covers content that streams in after navigation.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const x = window.innerWidth / 2;
      const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 64;
      const surface = document.elementFromPoint(x, headerBottom + 2)?.closest<HTMLElement>("[data-tone]");
      if (surface) setTone((surface.dataset.tone as Tone) ?? "light");
      const section = document.elementFromPoint(x, window.innerHeight * 0.5)?.closest<HTMLElement>("[data-section]");
      const id = section?.dataset.section ?? "";
      setActive(nav.some((item) => item.id === id) ? id : null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    const settle = window.setTimeout(schedule, 400);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  // While the menu is open: lock scroll, make the page inert, close on Escape, and manage focus.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const background = ["main", "site-footer"].map((id) => document.getElementById(id));
    root.style.overflow = "hidden";
    background.forEach((el) => el?.setAttribute("inert", ""));
    firstLinkRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      root.style.overflow = "";
      background.forEach((el) => el?.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const current = isHome ? active : null;
  const surface: Tone = open ? "dark" : tone;
  const close = () => setOpen(false);

  const resume = resumeHref ? (
    <a href={resumeHref} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2">
      <span className="link-grow">Resume</span>
      <span className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        <Arrow dir="up-right" />
      </span>
      <span className="sr-only"> (PDF, opens in a new tab)</span>
    </a>
  ) : showPlaceholders ? (
    <span className="opacity-40 line-through" title="Add public/documents/resume.pdf">
      Resume
    </span>
  ) : null;

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-500 ${toneClass[surface]}`}>
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" onClick={close} className="group flex items-center gap-3 text-[15px] font-semibold tracking-[-0.02em]">
          <span aria-hidden="true" className="h-2.5 w-2.5 bg-current transition-transform duration-300 group-hover:rotate-45" />
          {name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm">
            {nav.map((item, i) => {
              const isActive = current === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`group flex items-baseline gap-1.5 transition-opacity duration-200 ${isActive ? "" : "opacity-60 hover:opacity-100"}`}
                  >
                    <span className="font-mono text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="link-grow">{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={`ml-0.5 h-1.5 w-1.5 self-center transition-transform duration-300 ${
                        surface === "signal" ? "bg-ink" : "bg-signal"
                      } ${isActive ? "scale-100" : "scale-0"}`}
                    />
                  </a>
                </li>
              );
            })}
            {resume && <li className="border-l border-current/20 pl-7">{resume}</li>}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex h-11 items-center gap-3 px-2 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true" className="relative h-2.5 w-5">
            <span className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <span
        aria-hidden="true"
        className={`scroll-progress absolute -bottom-px left-0 h-px w-full origin-left ${surface === "signal" ? "bg-ink" : "bg-signal"}`}
      />

      <div
        id="mobile-menu"
        hidden={!open}
        className={`grid-ink fixed inset-x-0 bottom-0 top-[var(--header-h)] flex flex-col overflow-y-auto bg-ink px-[var(--gutter)] pb-8 pt-6 text-on-ink md:hidden ${open ? "menu-open" : ""}`}
      >
        <nav aria-label="Mobile">
          <ol>
            {nav.map((item, i) => (
              <li key={item.id} className="overflow-hidden border-b border-line-ink">
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${item.id}`}
                  onClick={close}
                  aria-current={current === item.id ? "location" : undefined}
                  className="menu-item flex items-baseline gap-4 py-3 text-[clamp(2.75rem,14vw,5rem)] font-semibold leading-none tracking-[-0.06em] aria-[current]:text-signal"
                  style={{ "--d": `${0.05 + i * 0.06}s` } as CSSProperties}
                >
                  <span className="font-mono text-xs font-normal tracking-normal text-on-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-auto flex items-end justify-between gap-6 pt-10 text-sm">
          {resume ? <div className="text-lg">{resume}</div> : <span />}
          <span className="eyebrow text-on-ink-muted">
            Toronto <LocalTime timeZone={timeZone} />
          </span>
        </div>
      </div>
    </header>
  );
}
