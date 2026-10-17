import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { Project } from "@/data/projects";
import { Pill } from "./Pill";

export const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [open, setOpen] = useState(false);
  const shown = project.tags.slice(0, 3);
  const rest = project.tags.slice(3);

  return (
    <Card
      onClick={() => setOpen(!open)}
      className={`group grid grid-cols-[96px_1fr] md:grid-cols-[168px_1fr_auto] items-stretch rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/45 hover:shadow-[0_0_40px_hsl(var(--primary)/0.14)] ${
        open ? "border-primary/45 shadow-[0_0_40px_hsl(var(--primary)/0.14)]" : ""
      }`}
    >
      <div className="relative min-h-[118px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card" />
      </div>

      <div className="flex flex-col justify-center min-w-0 py-3.5 pl-4 pr-3 md:pl-[18px] md:pr-2">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[11px] font-semibold tracking-[0.18em] text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display font-bold text-base md:text-lg leading-tight truncate">
            {project.title}
          </h3>
        </div>
        <p className="text-primary text-[12.5px] font-medium mt-px mb-1">
          {project.subtitle}
        </p>
        <p
          className={`text-muted-foreground text-[13px] leading-relaxed ${
            open ? "" : "line-clamp-3 md:line-clamp-2"
          }`}
        >
          {project.description}
        </p>

        <div className="mt-2 flex flex-wrap">
          {shown.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
          {!open && rest.length > 0 && (
<Pill muted>+{rest.length}</Pill>
          )}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {rest.length > 0 && (
                <div className="flex flex-wrap pt-0.5">
                  {rest.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              )}
              <div
                className="flex flex-wrap gap-2.5 pt-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                {project.live && (
                  <Button
                    asChild
                    size="sm"
                    className="rounded-xl text-[13.5px] font-semibold transition-all hover:-translate-y-px hover:shadow-[0_0_28px_hsl(var(--primary)/0.45)]"
                  >
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      View Project <ExternalLink />
                    </a>
                  </Button>
                )}
                {project.github && (
                  <Button
                    asChild
                    size="sm"
                    variant="secondary"
                    className="rounded-xl text-[13.5px] font-semibold border border-border hover:border-primary/40"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github /> GitHub
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden md:grid self-center mx-4 w-9 h-9 rounded-full place-items-center border border-border bg-secondary text-primary transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_18px_hsl(var(--primary)/0.4)]">
        <ArrowRight
          className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-90" : ""}`}
        />
      </div>
    </Card>
  );
};
