import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export type Question = { id: string; label: string };

export const AskAboutMe = ({
  questions,
  onAsk,
  disabled = false,
  action,
}: {
  questions: Question[];
  onAsk: (id: string) => void;
  disabled?: boolean;
  action?: React.ReactNode;
}) => {
  const row = useRef<HTMLDivElement>(null);

  // mouse wheels only scroll vertically — translate that to sideways here
  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="rounded-[20px] border border-border bg-secondary/90 backdrop-blur px-3.5 py-2.5">
      <div className="flex items-center justify-between gap-3 mx-1 mb-2">
        <span className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
          <i className="w-[7px] h-[7px] rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
          Ask me about…
        </span>
        {action}
      </div>

      <div
        ref={row}
        className="flex flex-nowrap gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(90deg,#000_94%,transparent)]"
      >
        {questions.map((q) => (
          <Button
            key={q.id}
            size="sm"
            variant="outline"
            disabled={disabled}
            onClick={() => onAsk(q.id)}
            className="shrink-0 h-auto rounded-full px-3 py-1.5 text-[12.5px] font-medium text-primary bg-primary/10 border-primary/30 transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_hsl(var(--primary)/0.4)]"
          >
            {q.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
