import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { FileText } from "lucide-react";
import { FadeIn } from "@/components/common/Motion";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon = FileText,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <FadeIn
      className={cn(
        "rounded-2xl border border-dashed border-border bg-white/80 p-8 text-center shadow-sm backdrop-blur",
        className
      )}
    >
      <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-mist text-navy">
        <Icon className="size-5" />
      </div>
      <h3 className="text-xl font-semibold leading-tight text-foreground">
        {title}
      </h3>
      {description && (
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </FadeIn>
  );
}
