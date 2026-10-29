export type Role = {
  company: string;
  note?: string;
  title: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "Cheil Canada",
    note: "Samsung · Contract",
    title: "Senior Full Stack Developer",
    location: "Toronto",
    start: "Sep 2026",
    end: "Present",
    summary: "Building internal tools for campaign email work.",
    stack: ["Python", "Flask", "JavaScript"],
  },
  {
    company: "Arteria AI",
    title: "Senior Full Stack Developer",
    location: "Toronto",
    start: "May 2024",
    end: "Feb 2026",
    summary: "Full-stack work on a contract platform.",
    stack: ["Python", "Django", "React", "TypeScript", "PostgreSQL"],
  },
  {
    company: "Levio",
    title: "Full Stack Developer II",
    location: "Toronto",
    start: "Mar 2021",
    end: "Feb 2024",
    summary: "Consulting work across payments, enterprise applications, and internal products.",
    stack: ["Java", "Spring", "Kafka", "Angular", "PostgreSQL", "AWS"],
  },
  {
    company: "First Derivatives",
    title: "Software Engineer",
    location: "Toronto",
    start: "May 2018",
    end: "Aug 2019",
    summary: "Data collection and analysis tools.",
    stack: ["Python", "Java"],
  },
];
