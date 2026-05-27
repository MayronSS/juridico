import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingState({
  label = "Carregando",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-40 flex-col items-center justify-center rounded-2xl border border-border bg-white/90 p-8 text-sm text-muted-foreground shadow-premium backdrop-blur",
        className
      )}
    >
      <Loader2 className="size-5 animate-spin text-gold-dark" />
      <p className="mt-3 font-medium">{label}</p>
      <div className="mt-5 w-full max-w-sm space-y-2">
        <span className="skeleton-shimmer block h-3 rounded-full" />
        <span className="skeleton-shimmer block h-3 w-10/12 rounded-full" />
        <span className="skeleton-shimmer block h-3 w-7/12 rounded-full" />
      </div>
    </div>
  );
}
