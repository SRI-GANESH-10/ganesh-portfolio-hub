export const TypingDots = () => (
  <span role="status" aria-label="Thinking" className="flex gap-1.5 py-2.5">
    {[0, 150, 300].map((delay) => (
      <i
        key={delay}
        className="w-2 h-2 rounded-full bg-primary motion-safe:animate-bounce"
        style={{ animationDelay: `${delay}ms` }}
      />
    ))}
  </span>
);
