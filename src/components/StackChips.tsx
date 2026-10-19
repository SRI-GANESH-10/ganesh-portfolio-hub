import { cn } from "@/lib/utils";

const TILTS = [-2, 2, -1, 3];

// Dashed, slightly tilted tech chips. Shared by the journey's company cards and the overview board.
export const StackChips = ({
  stack,
  className,
}: {
  stack: string[];
  className?: string;
}) => (
  <div className={cn("flex flex-wrap gap-2", className)}>
    {stack.map((s, i) => (
      <span
        key={s}
        className="rounded-full border-[1.5px] border-dashed border-muted-foreground/40 px-3 py-1 text-[12.5px] text-foreground/80"
        style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}
      >
        {s}
      </span>
    ))}
  </div>
);
