import { Badge } from "@/components/ui/badge";
import { cn, getLeadStatusLabel, getPostStatusLabel } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  NOVO: "border-blue-200 bg-blue-50 text-blue-700",
  EM_ANALISE: "border-champagne/30 bg-champagne/15 text-gold-dark",
  RESPONDIDO: "border-emerald-200 bg-emerald-50 text-emerald-700",
  ARQUIVADO: "border-slate-200 bg-slate-100 text-slate-600",
  PUBLICADO: "border-emerald-200 bg-emerald-50 text-emerald-700",
  RASCUNHO: "border-champagne/30 bg-champagne/15 text-gold-dark",
  ADMIN: "border-navy/15 bg-navy text-warm-white",
  EDITOR: "border-champagne/30 bg-champagne/15 text-gold-dark",
  USER: "border-slate-200 bg-slate-100 text-slate-600",
};

export function StatusBadge({
  status,
  type = "generic",
  className,
}: {
  status: string;
  type?: "lead" | "post" | "role" | "generic";
  className?: string;
}) {
  const label =
    type === "lead"
      ? getLeadStatusLabel(status)
      : type === "post"
        ? getPostStatusLabel(status)
        : status;

  return (
    <Badge
      variant="outline"
      className={cn("border px-2.5", statusStyles[status], className)}
    >
      {label}
    </Badge>
  );
}
