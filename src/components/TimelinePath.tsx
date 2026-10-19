// A weaving path through every child marked `data-dot`, with a glow that travels it as you scroll
// (the moving-gradient idea is from Aceternity UI's Tracing Beam). It tells its children how many
// dots the glow has reached, so they can light up / animate in: dot i is reached when i < active.
import { useId, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

// One smooth curve through every dot's centre. Each segment bulges sideways, alternating
// left/right, so the line weaves instead of running straight down the dots.
const BULGE = 60;
function weave(dots: { x: number; y: number }[]) {
  if (!dots.length) return "";
  // never bulge further left than the space beside the dots (phones put them near the edge)
  const bulge = Math.max(
    0,
    Math.min(BULGE, Math.min(...dots.map((d) => d.x)) - 6),
  );
  let x0 = dots[0].x;
  let y0 = -30; // start just above the first dot
  let d = `M${x0} ${y0}`;
  dots.forEach((p, i) => {
    const dy = p.y - y0;
    const b = (i % 2 ? 1 : -1) * bulge;
    d += ` C${x0 + b} ${y0 + dy * 0.45} ${p.x + b} ${p.y - dy * 0.45} ${p.x} ${p.y}`;
    x0 = p.x;
    y0 = p.y;
  });
  return d;
}

const GLOW = 260; // length of the glowing tail, in px

export const TimelinePath = ({
  children,
  startAt = 1,
  className,
}: {
  children: (active: number) => React.ReactNode;
  /** dots already reached before any scrolling, e.g. 2 = the first header + its first card */
  startAt?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const gradientId = useId();
  const [path, setPath] = useState("");
  const [active, setActive] = useState(0);
  const dotYs = useRef<number[]>([]);
  const height = useMotionValue(0);
  const floor = useMotionValue(0); // y of the startAt-th dot: the glow never sits above it

  // The glow sits where the timeline crosses a reading line at the middle of the screen:
  // progress is 0 when the timeline's top is on that line and 1 when its bottom is, so
  // progress * height is exactly the timeline y under the line. That moves 1:1 with scroll.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 50%", "end 50%"],
  });
  const head = useSpring(
    useTransform([scrollYProgress, height, floor], ([p, h, f]: number[]) =>
      Math.max(f, p * h),
    ),
    { stiffness: 500, damping: 90 },
  );
  const tail = useTransform(head, (y) => y - GLOW);

  // dots are top-to-bottom, so "reached" is always the first N; setActive skips re-renders
  // when N hasn't changed, so this only re-renders when the glow crosses a dot
  const countReached = (y: number) =>
    setActive(dotYs.current.filter((d) => d <= y).length);
  useMotionValueEvent(head, "change", countReached);

  // Dot positions depend on card heights, so measure after render and again on any resize.
  useLayoutEffect(() => {
    const el = ref.current!;
    const measure = () => {
      const box = el.getBoundingClientRect();
      const dots = [...el.querySelectorAll("[data-dot]")].map((d) => {
        const r = d.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - box.left,
          y: r.top + r.height / 2 - box.top,
        };
      });
      dotYs.current = dots.map((d) => d.y);
      setPath(weave(dots));
      height.set(el.offsetHeight);
      floor.set(
        dotYs.current[Math.min(startAt, dotYs.current.length) - 1] ?? 0,
      );
      countReached(head.get());
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- measure once, then on resize
  }, []);

  return (
    <div ref={ref} className={cn("relative mx-auto w-full", className)}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        {/* resting line */}
        <path
          d={path}
          fill="none"
          stroke="hsl(var(--muted-foreground) / 0.35)"
          strokeWidth={2}
          strokeDasharray="2 7"
          strokeLinecap="round"
        />
        {/* the glow: same path, painted only where the moving gradient is opaque */}
        <path
          d={path}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={2.5}
          strokeLinecap="round"
          className="motion-reduce:hidden"
        />
        <defs>
          {/* a vertical gradient from the head (y1) fading out up to the tail (y2) */}
          <motion.linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="0"
            x2="0"
            y1={head}
            y2={tail}
          >
            {/* stop colours via style: SVG attributes can't read CSS variables, inline styles can */}
            <stop
              style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0 }}
            />
            <stop offset="0.02" style={{ stopColor: "hsl(var(--primary))" }} />
            <stop
              offset="1"
              style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0 }}
            />
          </motion.linearGradient>
        </defs>
      </svg>
      {children(active)}
    </div>
  );
};
