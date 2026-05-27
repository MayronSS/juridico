import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  CalendarClock,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
  type LucideIcon,
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PremiumCard } from "@/components/common/PremiumCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LeadNotesForm } from "@/components/admin/LeadNotesForm";
import { LeadStatusForm } from "@/components/admin/LeadStatusForm";
import { formatDateTime, formatPhone, formatRelativeTime } from "@/lib/utils";
import { getWhatsAppUrlForLead } from "@/lib/whatsapp";
import { prisma } from "@/lib/prisma";

interface LeadDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getLead(id: string) {
  try {
    return await prisma.lead.findUnique({
      where: { id },
      include: {
        history: {
          orderBy: { createdAt: "desc" },
          include: {
            user: { select: { name: true } },
          },
        },
      },
    });
  } catch {
    return null;
  }
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;
  const lead = await getLead(id);

  if (!lead) notFound();

  const whatsappUrl = getWhatsAppUrlForLead(lead.phone, lead.name);
  const personTypeLabel =
    lead.personType === "FISICA" ? "Pessoa Física" : "Pessoa Jurídica";

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link href="/admin/leads">
          <ArrowLeft className="size-4" />
          Voltar para leads
        </Link>
      </Button>

      <AdminPageHeader
        eyebrow="Detalhe do lead"
        title={lead.name}
        description={`Recebido ${formatRelativeTime(lead.createdAt)}. Dados, mensagem e histórico operacional do contato.`}
        action={<StatusBadge status={lead.status} type="lead" />}
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <PremiumCard className="p-0">
            <div className="border-b border-border p-6">
              <h2 className="text-2xl font-semibold leading-tight text-foreground">
                Dados principais
              </h2>
            </div>
            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <LeadInfo icon={Mail} label="E-mail">
                <a href={`mailto:${lead.email}`} className="hover:text-gold-dark">
                  {lead.email}
                </a>
              </LeadInfo>
              <LeadInfo icon={Phone} label="Telefone">
                {formatPhone(lead.phone)}
              </LeadInfo>
              <LeadInfo icon={User} label="Tipo de pessoa">
                {personTypeLabel}
              </LeadInfo>
              {(lead.city || lead.state) && (
                <LeadInfo icon={MapPin} label="Localidade">
                  {[lead.city, lead.state].filter(Boolean).join("/")}
                </LeadInfo>
              )}
              <LeadInfo icon={FileText} label="Área jurídica">
                {lead.legalArea}
              </LeadInfo>
              <LeadInfo icon={CalendarClock} label="Recebido em">
                {formatDateTime(lead.createdAt)}
              </LeadInfo>
            </div>
          </PremiumCard>

          <PremiumCard>
            <h2 className="text-2xl font-semibold leading-tight text-foreground">
              Mensagem
            </h2>
            <div className="mt-5 rounded-2xl border border-border bg-surface-soft p-5">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {lead.message}
              </p>
            </div>
          </PremiumCard>

          <PremiumCard className="p-0">
            <div className="border-b border-border p-6">
              <h2 className="text-2xl font-semibold leading-tight text-foreground">
                Histórico
              </h2>
            </div>
            <div className="p-6">
              {lead.history.length > 0 ? (
                <div className="space-y-5">
                  {lead.history.map((entry) => (
                    <div key={entry.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="mt-2 size-2 rounded-full bg-champagne" />
                        <div className="w-px flex-1 bg-border" />
                      </div>
                      <div className="flex-1 pb-5">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <p className="font-medium text-foreground">
                            {entry.action === "CREATED"
                              ? "Lead criado"
                              : "Status alterado"}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {formatDateTime(entry.createdAt)}
                          </span>
                        </div>
                        {entry.note && (
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {entry.note}
                          </p>
                        )}
                        {entry.user?.name && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            por {entry.user.name}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  Nenhum histórico registrado.
                </p>
              )}
            </div>
          </PremiumCard>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-28">
          <PremiumCard>
            <h2 className="text-xl font-semibold leading-tight text-foreground">
              Alterar status
            </h2>
            <div className="mt-5">
              <LeadStatusForm leadId={lead.id} currentStatus={lead.status} />
            </div>
          </PremiumCard>

          <PremiumCard>
            <h2 className="text-xl font-semibold leading-tight text-foreground">
              Anotações internas
            </h2>
            <div className="mt-5">
              <LeadNotesForm
                leadId={lead.id}
                initialNotes={lead.internalNotes || ""}
              />
            </div>
          </PremiumCard>

          <PremiumCard>
            <h2 className="text-xl font-semibold leading-tight text-foreground">
              Ações rápidas
            </h2>
            <div className="mt-5 space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <a href={`mailto:${lead.email}`}>
                  <Mail className="size-4" />
                  Enviar e-mail
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Phone className="size-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </PremiumCard>

          <PremiumCard tone="ivory">
            <h2 className="text-xl font-semibold leading-tight text-foreground">
              Metadados
            </h2>
            <Separator className="my-4" />
            <div className="space-y-3 text-xs text-muted-foreground">
              <MetaLine label="Criado em" value={formatDateTime(lead.createdAt)} />
              <MetaLine label="LGPD aceito" value={lead.lgpdAccepted ? "Sim" : "Não"} />
              {lead.lgpdAcceptedAt && (
                <MetaLine
                  label="LGPD aceito em"
                  value={formatDateTime(lead.lgpdAcceptedAt)}
                />
              )}
              {lead.ipAddress && <MetaLine label="IP" value={lead.ipAddress} />}
            </div>
          </PremiumCard>
        </aside>
      </div>
    </div>
  );
}

function LeadInfo({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-mist">
        <Icon className="size-4 text-navy" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase text-muted-foreground">
          {label}
        </p>
        <div className="mt-1 break-words text-sm font-medium text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}

function MetaLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span>{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}
