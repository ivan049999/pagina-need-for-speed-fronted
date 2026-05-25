import { cn } from "@/lib/utils/cn";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "heat";
  className?: string;
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded px-2 py-0.5 text-xs font-medium",
        variant === "default" && "bg-nfs-neon/20 text-nfs-neon",
        variant === "heat" && "bg-nfs-heat/20 text-nfs-heat",
        className
      )}
    >
      {children}
    </span>
  );
}
