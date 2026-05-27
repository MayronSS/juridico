import type { ReactNode } from "react";
import { FadeIn } from "@/components/common/Motion";
import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  description,
  eyebrow,
  action,
  className,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <FadeIn
      className={cn(
        "flex flex-col gap-4 rounded-3xl border border-border/80 bg-white/78 p-6 shadow-premium backdrop-blur sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-2 inline-flex rounded-full bg-mist px-3 py-1 text-xs font-semibold text-navy">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </FadeIn>
  );
}
