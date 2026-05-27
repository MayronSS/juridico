import type { ReactNode } from "react";
import { FadeIn } from "@/components/common/Motion";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  inverted = false,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <FadeIn
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        action && "sm:flex-row sm:items-end sm:justify-between sm:text-left",
        className
      )}
    >
      <div
        className={cn(
          "max-w-3xl",
          align === "center" && !action && "mx-auto"
        )}
      >
        {eyebrow && (
          <p
            className={cn(
              "mb-3 inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.16em]",
              inverted ? "text-white/55" : "text-muted-foreground"
            )}
          >
            <span
              className="h-px w-6 bg-champagne"
            />
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl",
            inverted && "text-warm-white"
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg",
              inverted && "text-warm-white/65"
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </FadeIn>
  );
}
