import { Clock, Eye, FileText, Users } from "lucide-react";
import { AdminMetricCard } from "@/components/admin/AdminMetricCard";

export function DashboardStats({
  totalLeads,
  newLeads,
  publishedPosts,
  totalPosts,
}: {
  totalLeads: number;
  newLeads: number;
  publishedPosts: number;
  totalPosts: number;
}) {
  const stats = [
    {
      label: "Total de leads",
      value: totalLeads,
      icon: Users,
      helper: "Solicitações recebidas pelo site",
      tone: "navy" as const,
    },
    {
      label: "Leads novos",
      value: newLeads,
      icon: Clock,
      helper: "Aguardando primeira análise",
      tone: "gold" as const,
    },
    {
      label: "Artigos publicados",
      value: publishedPosts,
      icon: Eye,
      helper: "Conteúdos ativos no blog",
      tone: "green" as const,
    },
    {
      label: "Total de artigos",
      value: totalPosts,
      icon: FileText,
      helper: "Inclui rascunhos e publicados",
      tone: "slate" as const,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <AdminMetricCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
