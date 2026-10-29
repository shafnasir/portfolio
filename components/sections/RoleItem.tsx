import type { Role } from "@/data/experience";

type Props = { role: Role; current: boolean };

export function RoleItem({ role, current }: Props) {
  return (
    <li className="relative pb-14 pl-10 last:pb-0 md:pl-14">
      <span
        aria-hidden="true"
        className={`absolute left-0 top-2 h-[11px] w-[11px] border ${current ? "border-signal bg-signal" : "border-on-ink-muted bg-ink"}`}
      />
      {current && <span aria-hidden="true" className="d-pulse absolute left-[-5px] top-[3px] h-[21px] w-[21px] border border-signal" />}

      <p className="font-mono text-xs text-on-ink-muted">
        <time>{role.start}</time> — <time className={current ? "text-signal" : ""}>{role.end}</time>
        {role.note && <span className="ml-3 hidden sm:inline">· {role.note}</span>}
      </p>
      <h3 className="mt-3 text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.045em]">{role.company}</h3>
      <p className="mt-2 text-lg text-on-ink-muted">{role.title}</p>
      {role.note && <p className="eyebrow mt-2 text-on-ink-muted sm:hidden">{role.note}</p>}
      <p className="mt-5 max-w-[52ch] leading-relaxed">{role.summary}</p>
      <p className="mt-4 font-mono text-xs leading-5 text-on-ink-muted">
        <span className="sr-only">Technologies: </span>
        {role.stack.join(" / ")}
      </p>
    </li>
  );
}
