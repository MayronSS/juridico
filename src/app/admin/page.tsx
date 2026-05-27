import Link from "next/link";
import { ArrowRight, Inbox, PieChart, Users } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { EmptyState } from "@/components/common/EmptyState";
import { PremiumCard } from "@/components/common/PremiumCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatRelativeTime, getLeadStatusLabel } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

async function getDashboardData() {
  try {
    const [
      totalLeads,
      newLeads,
      totalPosts,
      publishedPosts,
      recentLeads,
      leadsByStatus,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NOVO" } }),
      prisma.post.count(),
      prisma.post.count({ where: { status: "PUBLICADO" } }),
      prisma.lead.findMany({
        select: {
          id: true,
          name: true,
          legalArea: true,
          status: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      prisma.lead.groupBy({
        by: ["status"],
        _count: { status: true },
      }),
    ]);

    return {
      totalLeads,
      newLeads,
      totalPosts,
      publishedPosts,
      recentLeads,
      leadsByStatus,
    };
  } catch {
    return {
      totalLeads: 0,
      newLeads: 0,
      totalPosts: 0,
      publishedPosts: 0,
      recentLeads: [],
      leadsByStatus: [],
    };
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardData();
  const maxStatusCount = Math.max(
    1,
    ...data.leadsByStatus.map((item) => item._count.status)
  );

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Visão geral"
        title="Dashboard"
        description="Acompanhe volume de contatos, conteúdos publicados e prioridades operacionais do escritório."
        action={
          <Button asChild>
            <Link href="/admin/leads">
              Ver leads
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <DashboardStats
        totalLeads={data.totalLeads}
        newLeads={data.newLeads}
        publishedPosts={data.publishedPosts}
        totalPosts={data.totalPosts}
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <PremiumCard className="p-0">
          <div className="border-b border-border p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-mist text-navy">
                <PieChart className="size-5" />
              </span>
              <div>
                <h2 className="text-2xl font-semibold leading-tight text-foreground">
                  Distribuição de leads
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Status operacionais do funil de atendimento.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 p-6">
            {data.leadsByStatus.length > 0 ? (
              data.leadsByStatus.map((item) => {
                const percent = (item._count.status / maxStatusCount) * 100;
                return (
                  <div key={item.status}>
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-foreground">
                        {getLeadStatusLabel(item.status)}
                      </span>
                      <span className="text-muted-foreground">
                        {item._count.status}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-mist">
                      <div
                        className="h-full rounded-full bg-champagne"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyState
                icon={Users}
                title="Sem dados de leads"
                description="Os gráficos serão preenchidos quando os contatos começarem a chegar."
              />
            )}
          </div>
        </PremiumCard>

        <PremiumCard className="p-0">
          <div className="flex items-center justify-between gap-4 border-b border-border p-6">
            <div>
              <h2 className="text-2xl font-semibold leading-tight text-foreground">
                Leads recentes
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Últimas solicitações recebidas pelo formulário.
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/leads">Todos</Link>
            </Button>
          </div>

          {data.recentLeads.length > 0 ? (
            <div className="divide-y divide-border">
              {data.recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-mist/55"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">
                      {lead.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {lead.legalArea} | {formatRelativeTime(lead.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={lead.status} type="lead" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6">
              <EmptyState
                icon={Inbox}
                title="Nenhum lead recebido"
                description="Os contatos do formulário aparecerão aqui assim que forem enviados."
              />
            </div>
          )}
        </PremiumCard>
      </div>
    </div>
  );
}
