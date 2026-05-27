import Link from "next/link";
import { Search } from "lucide-react";
import { LeadStatus } from "@/generated/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { PremiumCard } from "@/components/common/PremiumCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getLeadStatusLabel } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

interface LeadsPageProps {
  searchParams: Promise<{ status?: string; pagina?: string; q?: string }>;
}

const LEADS_PER_PAGE = 20;

async function getLeads(page: number, status?: string, q?: string) {
  try {
    const where = {
      ...(status ? { status: status as LeadStatus } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" as const } },
              { email: { contains: q, mode: "insensitive" as const } },
              { phone: { contains: q } },
              { legalArea: { contains: q, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          legalArea: true,
          status: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * LEADS_PER_PAGE,
        take: LEADS_PER_PAGE,
      }),
      prisma.lead.count({ where }),
    ]);

    return { leads, total, totalPages: Math.ceil(total / LEADS_PER_PAGE) };
  } catch {
    return { leads: [], total: 0, totalPages: 0 };
  }
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.pagina) || 1);
  const statusFilter = params.status;
  const query = params.q?.trim() || "";

  const { leads, total, totalPages } = await getLeads(page, statusFilter, query);
  const statuses = ["NOVO", "EM_ANALISE", "RESPONDIDO", "ARQUIVADO"];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Atendimento"
        title="Leads"
        description="Consulte solicitações recebidas, filtre por status e acompanhe o retorno da equipe."
      />

      <PremiumCard tone="ivory">
        <form className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Buscar por nome, e-mail, telefone ou área"
              className="pl-10"
            />
          </div>
          {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
          <Button type="submit">Buscar</Button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/admin/leads">
            <Badge
              variant={!statusFilter ? "default" : "outline"}
              className="cursor-pointer px-3 py-1.5"
            >
              Todos ({total})
            </Badge>
          </Link>
          {statuses.map((status) => (
            <Link
              key={status}
              href={`/admin/leads?status=${status}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
            >
              <Badge
                variant={statusFilter === status ? "default" : "outline"}
                className="cursor-pointer px-3 py-1.5"
              >
                {getLeadStatusLabel(status)}
              </Badge>
            </Link>
          ))}
        </div>
      </PremiumCard>

      <PremiumCard className="p-0">
        <div className="border-b border-border p-6">
          <h2 className="text-2xl font-semibold leading-tight text-foreground">
            Leads {statusFilter ? `- ${getLeadStatusLabel(statusFilter)}` : ""}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {total} registro{total === 1 ? "" : "s"} encontrado
            {total === 1 ? "" : "s"}.
          </p>
        </div>
        <div className="p-5">
          <LeadsTable
            leads={leads}
            page={page}
            totalPages={totalPages}
            statusFilter={statusFilter}
            query={query}
          />
        </div>
      </PremiumCard>
    </div>
  );
}
