import { useEffect, useRef, useState } from "react";

export const Typewriter = ({
  text,
  speed = 13,
  onDone,
  className,
}: {
  text: string;
  speed?: number;
  onDone?: () => void;
  className?: string;
}) => {
  const [n, setN] = useState(0);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const instant =
      !text || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (instant) {
      setN(text.length);
      done.current?.();
      return;
    }

    setN(0);
    let i = 0;
    const iv = setInterval(() => {
      setN(++i);
      if (i >= text.length) {
        clearInterval(iv);
        done.current?.();
      }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);

  return (
    <span className={className}>
      {text.slice(0, n)}
      {n < text.length && (
        <span className="inline-block w-2 h-[1.1em] ml-0.5 align-[-3px] bg-primary animate-pulse" />
      )}
    </span>
  );
};
