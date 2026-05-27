import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SettingsSection({
  title,
  description,
  children,
  className,
  id,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "rounded-2xl border border-border/80 bg-white shadow-premium",
        className
      )}
    >
      <div className="border-b border-border bg-mist/40 p-5">
        <h2 className="text-xl font-semibold leading-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}
