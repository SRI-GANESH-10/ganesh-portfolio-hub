import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import kanbanImage from "@/assets/kanban-project.png";
import uxDesignImage from "@/assets/ux-design-project.png";
import shopeeImage from "@/assets/shopee-project.png";

const projects = [
  {
    title: "Kanban Board",
    subtitle: "Internal Hackathon Project – Track3D.ai",
    description:
      "Interactive Kanban board with drag-and-drop functionality and real-time updates. Built during a 48-hour hackathon and adopted for internal use.",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Drag & Drop"],
    image: kanbanImage,
    link: null,
    highlights: ["48-hour hackathon", "Adopted internally", "Real-time sync"],
  },
  {
    title: "Shopee",
    subtitle: "Full-Stack E-Commerce Application",
    description:
      "Built and deployed a full-stack e-commerce application using Next.js, Express.js, and MongoDB with responsive UI and REST API integration. Includes admin dashboard with full CRUD functionality.",
    tags: ["Next.js", "Express.js", "MongoDB", "Tailwind CSS", "ShadCN UI"],
    image: shopeeImage,
    link: "https://shopee-front-mu.vercel.app/login",
    highlights: ["Full-stack", "Admin dashboard", "Product management"],
  },
  {
    title: "UX Design Case Study",
    subtitle: "Mobile App Design",
    description:
      "Comprehensive UX case study featuring user research, low & high-fidelity prototypes, and accessibility-focused design principles.",
    tags: ["Figma", "User Research", "Prototyping", "Accessibility"],
    image: uxDesignImage,
    link: "https://sites.google.com/view/uxdesignprj/home",
    highlights: ["User research", "Hi-fi prototypes", "Accessibility-first"],
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding relative">
      <div className="floating-shape w-96 h-96 -bottom-48 left-1/4 opacity-10" />
      
      <div className="container-custom relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const CardWrapper = project.link ? motion.a : motion.div;
            const cardProps = project.link 
              ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
              : {};
            
            return (
              <CardWrapper
                key={project.title}
                {...cardProps}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className={`group glass-card overflow-hidden transition-all duration-300 hover:bg-primary/5 hover:border-primary/30 ${project.link ? 'cursor-pointer' : ''}`}
              >
                {/* Project Header with Image */}
                <div className="relative h-48 overflow-hidden transition-all duration-300">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-6 lg:p-8">
                  <h3 className="font-display font-bold text-xl mb-1">{project.title}</h3>
                  <p className="text-primary text-sm mb-4">{project.subtitle}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights as Hashtags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="text-xs text-muted-foreground"
                      >
                        #{highlight.replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>

                  {/* Tags as Chips */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};
