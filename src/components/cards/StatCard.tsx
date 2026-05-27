import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  value,
  label,
  icon: Icon,
  inverted = false,
}: {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  inverted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-premium",
        inverted
          ? "border-border/80 bg-white/85 backdrop-blur"
          : "border-border/80 bg-white/90 backdrop-blur"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={cn(
              "font-heading text-3xl font-semibold leading-none",
              "text-navy"
            )}
          >
            {value}
          </p>
          <p
            className={cn(
              "mt-2 text-sm leading-snug",
              "text-muted-foreground"
            )}
          >
            {label}
          </p>
        </div>
        {Icon && (
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-xl bg-mist text-navy"
            )}
          >
            <Icon className="size-4" />
          </div>
        )}
      </div>
    </div>
  );
}
