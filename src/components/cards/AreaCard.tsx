import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  FileText,
  Heart,
  Home,
  Monitor,
  Receipt,
  Scale,
  Shield,
  ShoppingBag,
} from "lucide-react";
import type { LegalArea } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scale,
  Briefcase,
  Shield,
  Heart,
  ShoppingBag,
  Building2,
  Home,
  Receipt,
  Monitor,
  FileText,
};

interface AreaCardProps {
  area: LegalArea;
  variant?: "compact" | "full";
}

export function AreaCard({ area, variant = "compact" }: AreaCardProps) {
  const Icon = iconMap[area.icon] || Scale;
  const isFull = variant === "full";

  return (
    <Link
      href={`/areas/${area.slug}`}
      className={
        isFull
          ? "modern-card-hover group relative flex h-full min-h-72 flex-col overflow-hidden rounded-2xl border border-border/80 bg-white p-6 shadow-sm hover:border-champagne/50 hover:shadow-premium"
          : "modern-card-hover group relative flex min-h-48 flex-col overflow-hidden rounded-2xl border border-border/80 bg-white p-5 shadow-sm hover:border-champagne/50 hover:shadow-premium"
      }
    >
      {/* Top accent line on hover */}
      <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-champagne/0 via-champagne to-champagne/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex size-11 items-center justify-center rounded-xl bg-navy text-champagne shadow-sm transition-all duration-300 group-hover:bg-champagne group-hover:text-navy">
          <Icon className="size-5" />
        </div>
        <span className="flex size-8 items-center justify-center rounded-full border border-border bg-surface-soft text-muted-foreground transition-all duration-300 group-hover:border-champagne/60 group-hover:text-navy">
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>

      <h3
        className={
          isFull
            ? "text-lg font-semibold tracking-tight text-navy"
            : "text-base font-semibold tracking-tight text-navy"
        }
      >
        {area.name}
      </h3>

      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {area.shortDescription}
      </p>

      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-navy opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Saiba mais
        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
