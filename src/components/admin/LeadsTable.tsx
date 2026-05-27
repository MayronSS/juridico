import Link from "next/link";
import { Eye, Inbox } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDateShort } from "@/lib/utils";

interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  legalArea: string;
  status: string;
  createdAt: Date;
}

export function LeadsTable({
  leads,
  page,
  totalPages,
  statusFilter,
  query,
}: {
  leads: LeadRow[];
  page: number;
  totalPages: number;
  statusFilter?: string;
  query: string;
}) {
  function pageHref(nextPage: number) {
    const params = new URLSearchParams();
    params.set("pagina", String(nextPage));
    if (statusFilter) params.set("status", statusFilter);
    if (query) params.set("q", query);
    return `/admin/leads?${params.toString()}`;
  }

  if (leads.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="Nenhum lead encontrado"
        description="Ajuste os filtros ou aguarde novas solicitações do formulário de contato."
      />
    );
  }

  return (
    <div className="space-y-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className="hidden sm:table-cell">E-mail</TableHead>
            <TableHead className="hidden md:table-cell">Área</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Data</TableHead>
            <TableHead className="w-[72px]">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>
                <p className="font-medium text-foreground">{lead.name}</p>
                <p className="mt-1 text-xs text-muted-foreground sm:hidden">
                  {lead.email}
                </p>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-muted-foreground">
                {lead.email}
              </TableCell>
              <TableCell className="hidden md:table-cell text-sm">
                {lead.legalArea}
              </TableCell>
              <TableCell>
                <StatusBadge status={lead.status} type="lead" />
              </TableCell>
              <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                {formatDateShort(lead.createdAt)}
              </TableCell>
              <TableCell>
                <Button asChild variant="ghost" size="icon-sm" title="Ver detalhes">
                  <Link href={`/admin/leads/${lead.id}`}>
                    <Eye className="size-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Página {page} de {totalPages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Button asChild variant="outline" size="sm">
                <Link href={pageHref(page - 1)}>Anterior</Link>
              </Button>
            )}
            {page < totalPages && (
              <Button asChild variant="outline" size="sm">
                <Link href={pageHref(page + 1)}>Próxima</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
