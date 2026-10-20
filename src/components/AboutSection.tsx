import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { aboutItems, type AboutItem } from "@/data/about";
import { profile } from "@/data/profile";
import { Pill } from "./Pill";

// Draws an item's body according to its kind (see about.ts).
const Body = ({ item }: { item: AboutItem }) => {
  switch (item.kind) {
    case "text":
      return <p>{item.text}</p>;

    case "chips":
      return (
        <>
          <div className="flex flex-wrap">
            {item.chips.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
          <p className="mt-4 text-[14.5px]">{item.note}</p>
        </>
      );

    case "education":
      return (
        <div className="flex items-center gap-3.5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <GraduationCap className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-foreground">{item.degree}</p>
            <p className="text-sm text-muted-foreground">{item.school}</p>
          </div>
        </div>
      );
  }
};

export const AboutSection = () => (
  // container-custom = navbar width, so the list lines up with the logo and theme toggle
  <section id="about" className="container-custom pt-12 pb-24">
    <p className="mb-2 text-[11.5px] uppercase tracking-[0.12em] text-muted-foreground">
      {profile.name}
    </p>

    {/* one open at a time; clicking the open one closes it */}
    <Accordion
      type="single"
      collapsible
      defaultValue={aboutItems[0].id}
      className="border-t border-border"
    >
      {aboutItems.map((item, i) => (
        <AccordionItem key={item.id} value={item.id} className="border-border">
          <AccordionTrigger
            className={cn(
              // big dim headline that lights up on hover / when open; shadcn's chevron and
              // hover underline are swapped for the teal number
              "gap-4 py-6 text-left font-display text-[clamp(28px,5vw,46px)] font-bold leading-[1.1] tracking-[-0.035em]",
              "text-muted-foreground/60 transition-colors hover:text-foreground hover:no-underline",
              "data-[state=open]:text-foreground [&>svg]:hidden",
            )}
          >
            {item.title}
            <span className="ml-auto text-sm font-semibold tracking-normal text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
          </AccordionTrigger>
          <AccordionContent className="max-w-[720px] pb-8 text-base leading-[1.75] text-foreground/80">
            <Body item={item} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);
