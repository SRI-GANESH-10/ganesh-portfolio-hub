import { Badge } from "@/components/ui/badge";

export const Pill = ({
  children,
  muted,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) => (
  <Badge
    variant="outline"
    className={`mr-1.5 mb-1 px-2.5 py-0.5 text-[11.5px] font-medium text-primary bg-primary/10 border-primary/25 ${
      muted ? "opacity-60" : ""
    }`}
  >
    {children}
  </Badge>
);
