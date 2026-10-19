import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// A tilted pill label "slapped" onto a card. Position it with className (e.g. "-top-4 left-6").
// Inside a `group/reach` row whose data-reached is false it stays hidden, and pops in when reached.
export const Sticker = ({
  children,
  tone = "teal",
  tilt = 0,
  big,
  className,
}: {
  children: React.ReactNode;
  tone?: "teal" | "white";
  tilt?: number;
  big?: boolean;
  className?: string;
}) => (
  <Badge
    className={cn(
      "absolute z-10 whitespace-nowrap border-0 font-bold",
      "transition-[opacity,transform] duration-500 delay-[120ms] ease-[cubic-bezier(.3,1.6,.5,1)] motion-reduce:transition-none",
      "group-data-[reached=false]/reach:scale-[1.4] group-data-[reached=false]/reach:opacity-0",
      big ? "px-4 py-2 text-[15px]" : "px-3 py-1.5 text-[12.5px]",
      tone === "white"
        ? "bg-foreground text-background hover:bg-foreground"
        : "bg-primary text-primary-foreground hover:bg-primary",
      className,
    )}
    style={{ rotate: `${tilt}deg` }} // separate from transform, so the pop-in scale doesn't override it
  >
    {children}
  </Badge>
);
