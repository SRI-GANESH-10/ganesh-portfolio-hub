import kanbanImage from "@/assets/kanban-project.png";
import shopeeImage from "@/assets/shopee-project.png";
import uxDesignImage from "@/assets/ux-design-project.png";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  github?: string | null;
  live?: string | null;
};

export const projects: Project[] = [
  {
    id: "kanban",
    title: "Kanban Board",
    subtitle: "Internal Hackathon Project – Track3D.ai",
    description:
      "Interactive Kanban board with drag-and-drop functionality and real-time updates. Built during a 48-hour hackathon and adopted for internal use.",
    image: kanbanImage,
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Drag & Drop"],
    github: null,
    live: null,
  },
  {
    id: "shopee",
    title: "Shopee",
    subtitle: "Full-Stack E-Commerce Application",
    description:
      "Built and deployed a full-stack e-commerce application using Next.js, Express.js, and MongoDB with responsive UI and REST API integration. Includes admin dashboard with full CRUD functionality.",
    image: shopeeImage,
    tags: ["Next.js", "Express.js", "MongoDB", "Tailwind CSS", "ShadCN UI"],
    github: null,
    live: "https://shopee-front-mu.vercel.app/login",
  },
  {
    id: "ux",
    title: "UX Design Case Study",
    subtitle: "Mobile App Design",
    description:
      "Comprehensive UX case study featuring user research, low & high-fidelity prototypes, and accessibility-focused design principles.",
    image: uxDesignImage,
    tags: ["Figma", "User Research", "Prototyping", "Accessibility"],
    github: null,
    live: "https://sites.google.com/view/uxdesignprj/home",
  },
];
