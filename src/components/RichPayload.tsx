import { Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";
import { Pill } from "./Pill";
import { projects } from "@/data/projects";
import { stack } from "@/data/stack";
import { profile } from "@/data/profile";
import type { Rich } from "@/data/questions";

const btn = "rounded-xl text-[13.5px] font-semibold";

export const RichPayload = ({ payload }: { payload?: Rich }) => {
  if (!payload) return null;

  switch (payload.kind) {
    case "projects":
      return (
        <div className="flex flex-col gap-2.5">
          {payload.ids.map((id) => {
            const i = projects.findIndex((p) => p.id === id);
            if (i < 0) return null;
            return <ProjectCard key={id} project={projects[i]} index={i} />;
          })}
        </div>
      );

    case "stack":
      return (
        <div className="grid gap-3 sm:grid-cols-3">
          {stack.map((g) => (
            <div key={g.group} className="rounded-2xl border border-border bg-card p-4">
              <h4 className="flex items-center gap-2.5 text-[15px] font-semibold mb-3">
                <i className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                {g.group}
              </h4>
              <div className="flex flex-wrap">
                {g.items.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "resume":
      return (
        <Button asChild size="sm" className={btn}>
          <a href={profile.resumeUrl} download>
            Download Resume <Download />
          </a>
        </Button>
      );

    case "contact":
      return (
        <div className="flex flex-wrap gap-2.5">
          <Button asChild size="sm" className={btn}>
            <a href={`mailto:${profile.email}`}>
              <Mail /> Email me
            </a>
          </Button>
          <Button asChild size="sm" variant="secondary" className={`${btn} border border-border`}>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin /> LinkedIn
            </a>
          </Button>
          <Button asChild size="sm" variant="secondary" className={`${btn} border border-border`}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github /> GitHub
            </a>
          </Button>
        </div>
      );
  }
};
