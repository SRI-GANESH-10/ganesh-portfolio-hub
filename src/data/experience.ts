export type Highlight = {
  text: string;
  sticker?: string; // optional teal label slapped on the card, e.g. "30% less dev time"
};

export type Role = {
  id: string;
  company: string;
  role: string;
  start: string; // "YYYY-MM", first month in the job
  end?: string; // "YYYY-MM", last month; no end = still there (the current job)
  stack: string[];
  highlights: Highlight[];
};

// Oldest first: the journey scrolls forward in time and ends at "Now".
export const roles: Role[] = [
  {
    id: "track3d",
    company: "Track3D.ai",
    role: "Software Engineer",
    start: "2023-12",
    end: "2025-11",
    stack: ["React.js", "Next.js", "Tailwind CSS", "ShadCN UI"],
    highlights: [
      {
        text: "Built reusable UI components reducing development time by 30%",
        sticker: "30% less dev time",
      },
      {
        text: "Designed Notes & Progress features improving tracking efficiency by 35%",
        sticker: "35% better tracking",
      },
      {
        text: "Integrated Procore API for bidirectional project synchronization",
        sticker: "2-way sync",
      },
      {
        text: "Built Project Configuration & Tagging System for enhanced organization",
      },
      {
        text: "Improved page load performance by 20% through optimization techniques",
        sticker: "20% faster loads",
      },
      {
        text: "Conducted code reviews and mentored junior developers",
        sticker: "Mentor",
      },
      {
        text: "Implemented Figma-based UIs and maintained Storybook documentation",
      },
    ],
  },
  {
    id: "privasapien",
    company: "Privasapien",
    role: "Frontend Developer",
    start: "2026-02",
    stack: ["React.js", "ShadCN UI"],
    highlights: [
      {
        text: "Working as a Frontend Developer at Privasapien, an AI-driven data privacy company",
      },
      {
        text: "Building intuitive and scalable web interfaces that make complex privacy workflows simple for users",
      },
    ],
  },
];

const toDate = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1);
};
const monthLabel = (ym: string) =>
  toDate(ym).toLocaleDateString("en", { month: "short", year: "numeric" });

/** The job you're in now: the one without an end date. */
export const isCurrent = (role: Role) => !role.end;

/** "Dec 2023 – Nov 2025" or "Feb 2026 – Present". */
export const period = (role: Role) =>
  `${monthLabel(role.start)} – ${role.end ? monthLabel(role.end) : "Present"}`;

// Months in a job, counting its first and last month; a current job runs to today.
const monthsIn = (role: Role) => {
  const from = toDate(role.start);
  const to = role.end ? toDate(role.end) : new Date();
  return (
    (to.getFullYear() - from.getFullYear()) * 12 +
    to.getMonth() -
    from.getMonth() +
    1
  );
};

/** Total months worked across all jobs; gaps between jobs don't count. */
export const monthsWorked = roles.reduce(
  (sum, role) => sum + monthsIn(role),
  0,
);
