import type { LucideIcon } from "lucide-react";
import { AnimatedNumber, MotionCard } from "@/components/common/Motion";
import { cn } from "@/lib/utils";

export function AdminMetricCard({
  label,
  value,
  icon: Icon,
  helper,
  tone = "navy",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  helper?: string;
  tone?: "navy" | "gold" | "green" | "slate";
}) {
  const toneClass = {
    navy: "bg-navy text-white",
    gold: "bg-champagne text-navy",
    green: "bg-emerald-600 text-white",
    slate: "bg-mist text-navy",
  }[tone];

  return (
    <MotionCard className="group relative overflow-hidden rounded-2xl border border-border/80 bg-white p-5 shadow-premium transition-shadow duration-300 hover:shadow-premium-lg">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-mist/80 blur-2xl transition-transform group-hover:scale-125" />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-3 text-4xl font-semibold leading-none text-foreground">
            {typeof value === "number" ? <AnimatedNumber value={value} /> : value}
          </p>
          {helper && (
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {helper}
            </p>
          )}
        </div>
        <div className={cn("flex size-12 items-center justify-center rounded-2xl shadow-sm", toneClass)}>
          <Icon className="size-5" />
        </div>
      </div>
    </MotionCard>
  );
}
