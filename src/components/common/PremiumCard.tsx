import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PremiumCard({
  children,
  className,
  tone = "light",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "ivory" | "dark";
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 shadow-premium",
        tone === "light" && "border-border/80 bg-white/90 backdrop-blur",
        tone === "ivory" && "border-border/80 bg-surface-soft/90 backdrop-blur",
        tone === "dark" && "border-white/10 bg-navy text-white shadow-premium-lg",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-navy/15 hover:bg-white hover:shadow-premium-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

export const ModernCard = PremiumCard;
