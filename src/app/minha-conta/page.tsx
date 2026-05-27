export const dynamic = "force-dynamic";

import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock,
  Mail,
  MessageSquare,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { EmptyState } from "@/components/common/EmptyState";
import { FadeIn, Stagger, StaggerItem } from "@/components/common/Motion";
import { PremiumCard } from "@/components/common/PremiumCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  formatDateShort,
  formatRelativeTime,
  getLeadStatusLabel,
} from "@/lib/utils";

async function getUserLeads(email: string) {
  try {
    return await prisma.lead.findMany({
      where: { email },
      select: {
        id: true,
        legalArea: true,
        status: true,
        message: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  } catch {
    return [];
  }
}

export default async function MinhaContaPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const leads = await getUserLeads(session.user.email);
  const openLeads = leads.filter((lead) => lead.status !== "ARQUIVADO").length;

  return (
    <section className="bg-page py-12 sm:py-16">
      <Container size="wide">
        <FadeIn className="relative overflow-hidden rounded-3xl border border-border bg-white/90 p-8 shadow-premium-lg backdrop-blur sm:p-10">
          <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-mist blur-3xl" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <span className="h-px w-6 bg-champagne" />
                Área do cliente
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                Minha conta
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Acompanhe seus contatos enviados pelo site, revise seus dados de
                perfil e acesse ações rápidas de atendimento.
              </p>
            </div>
            {(session.user.role === "ADMIN" || session.user.role === "EDITOR") && (
              <Button asChild size="lg">
                <Link href="/admin">
                  Acessar painel administrativo
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            )}
          </div>
        </FadeIn>

        <Stagger className="mt-6 grid gap-5 md:grid-cols-3">
          <StaggerItem>
          <AccountMetric
            icon={UserRound}
            label="Perfil"
            value={session.user.name}
            helper={session.user.email}
          />
          </StaggerItem>
          <StaggerItem>
          <AccountMetric
            icon={MessageSquare}
            label="Contatos enviados"
            value={leads.length}
            helper="Registrados com este e-mail"
          />
          </StaggerItem>
          <StaggerItem>
          <AccountMetric
            icon={Clock}
            label="Em acompanhamento"
            value={openLeads}
            helper="Solicitações não arquivadas"
          />
          </StaggerItem>
        </Stagger>

        <FadeIn className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]" delay={0.06}>
          <div className="space-y-5">
            <PremiumCard tone="ivory">
              <h2 className="text-2xl font-semibold leading-tight text-foreground">
                Dados de acesso
              </h2>
              <div className="mt-6 space-y-4">
                <ProfileLine label="Nome" value={session.user.name} />
                <ProfileLine label="E-mail" value={session.user.email} icon={Mail} />
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">
                    Perfil
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {session.user.role}
                  </Badge>
                </div>
              </div>
            </PremiumCard>

            <PremiumCard>
              <h2 className="text-2xl font-semibold leading-tight text-foreground">
                Ações rápidas
              </h2>
              <div className="mt-5 space-y-3">
                <Button asChild className="w-full justify-between">
                  <Link href="/contato">
                    Enviar nova mensagem
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between">
                  <Link href="/areas">
                    Ver áreas de atuação
                    <BriefcaseBusiness className="size-4" />
                  </Link>
                </Button>
              </div>
            </PremiumCard>
          </div>

          <PremiumCard className="p-0">
            <div className="border-b border-border p-6">
              <h2 className="text-2xl font-semibold leading-tight text-foreground">
                Histórico de contatos
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                São exibidas apenas mensagens enviadas com o e-mail da sua conta.
              </p>
            </div>

            {leads.length > 0 ? (
              <div className="divide-y divide-border">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold leading-tight text-foreground">
                          {lead.legalArea}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Enviado {formatRelativeTime(lead.createdAt)} -{" "}
                          {formatDateShort(lead.createdAt)}
                        </p>
                      </div>
                      <StatusBadge status={lead.status} type="lead" />
                    </div>
                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {lead.message}
                    </p>
                    <p className="mt-3 text-xs font-medium text-muted-foreground">
                      Status: {getLeadStatusLabel(lead.status)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6">
                <EmptyState
                  icon={MessageSquare}
                  title="Nenhum contato registrado"
                  description="Quando você enviar uma mensagem pelo formulário usando este e-mail, o histórico aparecerá aqui."
                  action={
                    <Button asChild>
                      <Link href="/contato">Enviar mensagem</Link>
                    </Button>
                  }
                />
              </div>
            )}
          </PremiumCard>
        </FadeIn>
      </Container>
    </section>
  );
}

function AccountMetric({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  helper: string;
}) {
  return (
    <PremiumCard>
      <Icon className="size-5 text-navy" />
      <p className="mt-4 text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 line-clamp-2 text-2xl font-semibold leading-tight text-foreground">
        {value}
      </p>
      <p className="mt-3 break-all text-sm text-muted-foreground">{helper}</p>
    </PremiumCard>
  );
}

function ProfileLine({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 flex items-center gap-2 break-all text-sm font-medium text-foreground">
        {Icon && <Icon className="size-4 text-navy" />}
        {value}
      </p>
    </div>
  );
}
