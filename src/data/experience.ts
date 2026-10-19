export type Highlight = {
  text: string;
  sticker?: string; // optional teal label slapped on the card, e.g. "30% less dev time"
};

export type Role = {
  id: string;
  company: string;
  role: string;
  period: string;
  current?: boolean; // "● NOW" sticker + teal border instead of "N highlights"
  stack: string[];
  highlights: Highlight[];
};

// Oldest first: the journey scrolls forward in time and ends at "Now".
export const roles: Role[] = [
  {
    id: "track3d",
    company: "Track3D.ai",
    role: "Software Engineer",
    period: "Dec 2023 – Nov 2025",
    stack: ["React.js", "Next.js", "Tailwind CSS", "ShadCN UI"],
    highlights: [
      { text: "Built reusable UI components reducing development time by 30%", sticker: "30% less dev time" },
      { text: "Designed Notes & Progress features improving tracking efficiency by 35%", sticker: "35% better tracking" },
      { text: "Integrated Procore API for bidirectional project synchronization", sticker: "2-way sync" },
      { text: "Built Project Configuration & Tagging System for enhanced organization" },
      { text: "Improved page load performance by 20% through optimization techniques", sticker: "20% faster loads" },
      { text: "Conducted code reviews and mentored junior developers", sticker: "Mentor" },
      { text: "Implemented Figma-based UIs and maintained Storybook documentation" },
    ],
  },
  {
    id: "privasapien",
    company: "Privasapien",
    role: "Frontend Developer",
    period: "Feb 2026 – Present",
    current: true,
    stack: ["React.js", "ShadCN UI"],
    highlights: [
      { text: "Working as a Frontend Developer at Privasapien, an AI-driven data privacy company" },
      { text: "Building intuitive and scalable web interfaces that make complex privacy workflows simple for users" },
    ],
  },
];
