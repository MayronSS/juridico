import type { ReactNode } from "react";
import { Container } from "@/components/common/Container";
import { FadeIn } from "@/components/common/Motion";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  align = "center",
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  align?: "left" | "center";
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border bg-page surface-grid",
        compact ? "py-12 sm:py-14" : "py-14 sm:py-20"
      )}
    >
      <div className="absolute left-1/2 top-0 h-44 w-[680px] -translate-x-1/2 rounded-full bg-mist/70 blur-3xl" />
      <Container
        size={align === "left" ? "wide" : "narrow"}
        className={cn("relative z-10", align === "center" && "text-center")}
      >
        <FadeIn trigger="load" y={18}>
          {eyebrow && (
            <p
              className={cn(
                "mb-3 inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground",
                align === "center" && "mx-auto"
              )}
            >
              <span className="h-px w-6 bg-champagne" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-semibold leading-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </FadeIn>
        {description && (
          <FadeIn trigger="load" delay={0.1} y={14}>
            <p
              className={cn(
                "mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg",
                align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
              )}
            >
              {description}
            </p>
          </FadeIn>
        )}
        {children && (
          <FadeIn trigger="load" delay={0.16} y={12} className="mt-7">
            {children}
          </FadeIn>
        )}
      </Container>
    </section>
  );
}
