import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Smartphone } from "lucide-react";

const projects = [
  {
    title: "Kanban Board",
    subtitle: "Internal Hackathon Project – Track3D.ai",
    description:
      "Interactive Kanban board with drag-and-drop functionality and real-time updates. Built during a 48-hour hackathon and adopted for internal use.",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Drag & Drop"],
    icon: Layers,
    link: null,
    highlights: ["48-hour hackathon", "Adopted internally", "Real-time sync"],
  },
  {
    title: "UX Design Case Study",
    subtitle: "Mobile App Design",
    description:
      "Comprehensive UX case study featuring user research, low & high-fidelity prototypes, and accessibility-focused design principles.",
    tags: ["Figma", "User Research", "Prototyping", "Accessibility"],
    icon: Smartphone,
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
                {/* Project Header */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center transition-all duration-300 group-hover:from-primary/30 group-hover:via-primary/20 group-hover:to-accent/30">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-6 rounded-2xl bg-background/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-background/70"
                  >
                    <project.icon className="w-12 h-12 text-primary" />
                  </motion.div>
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
