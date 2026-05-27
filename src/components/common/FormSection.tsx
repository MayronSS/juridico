import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FormSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-white/90 p-5 shadow-premium backdrop-blur sm:p-6",
        className
      )}
    >
      <div className="mb-5 border-b border-border pb-4">
        <h2 className="text-2xl font-semibold leading-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
