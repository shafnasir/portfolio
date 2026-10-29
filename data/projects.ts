export type FigureKind = "documents" | "stream" | "composer" | "arc";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  context: string;
  period?: string;
  tags: string[];
  /** Project colour, used on dark surfaces. */
  accent: string;
  /** Illustrative diagram. Not a screenshot of the product. */
  figure: { kind: FigureKind; caption: string };
};

export const projects: Project[] = [
  {
    slug: "ai-document-platform",
    title: "AI Document Platform",
    summary: "Full-stack work on document workflows for a contract platform.",
    context: "Arteria AI",
    period: "2024 – 2026",
    tags: ["Python", "Django", "React", "TypeScript", "PostgreSQL"],
    accent: "#e3b53c",
    figure: { kind: "documents", caption: "Documents, layered and marked" },
  },
  {
    slug: "real-time-payments",
    title: "Real-Time Payments",
    summary: "Backend work on a real-time payments platform.",
    context: "Levio · Client project",
    period: "2021 – 2024",
    tags: ["Java", "Spring", "Kafka"],
    accent: "#ef5a3a",
    figure: { kind: "stream", caption: "Events moving through a system" },
  },
  {
    slug: "email-design-tools",
    title: "Email Design Tools",
    summary: "Internal tools for assembling campaign emails.",
    context: "Cheil Canada · Contract",
    period: "2026 – Present",
    tags: ["Python", "Flask", "JavaScript"],
    accent: "#9cc5a1",
    figure: { kind: "composer", caption: "Blocks arranged on a canvas" },
  },
  {
    slug: "crossthrow",
    title: "CrossThrow",
    summary: "A multiplayer tomahawk-throwing game I'm building in Godot.",
    context: "Personal project",
    tags: ["Godot"],
    accent: "#8fb3e8",
    figure: { kind: "arc", caption: "A throw in motion" },
  },
];
