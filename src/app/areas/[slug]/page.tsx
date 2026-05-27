import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, MessageSquare } from "lucide-react";
import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { PremiumCard } from "@/components/common/PremiumCard";
import { legalAreas } from "@/data/areas";

interface AreaPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return legalAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = legalAreas.find((a) => a.slug === slug);
  if (!area) return {};
  return {
    title: area.name,
    description: area.shortDescription,
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = legalAreas.find((a) => a.slug === slug);

  if (!area) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Área de atuação"
        title={area.name}
        description={area.shortDescription}
        align="left"
      >
        <Link
          href="/areas"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/75 px-4 py-2 text-sm font-semibold text-navy shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          <ArrowLeft className="size-4" />
          Todas as áreas
        </Link>
      </PageHeader>

      <section className="bg-page py-16 sm:py-20">
        <Container size="wide">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="space-y-8">
              <PremiumCard>
                <p className="text-lg leading-relaxed text-foreground">
                  {area.fullDescription}
                </p>
              </PremiumCard>

              <div>
                <h2 className="text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  Situações atendidas
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {area.demands.map((demand) => (
                    <div
                      key={demand}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-white/85 p-4 shadow-sm backdrop-blur"
                    >
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-dark" />
                      <span className="text-sm leading-relaxed text-foreground">
                        {demand}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {area.faq.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                    Dúvidas frequentes
                  </h2>
                  <div className="mt-6 space-y-3">
                    {area.faq.map((item) => (
                      <PremiumCard key={item.question} tone="ivory">
                        <h3 className="text-xl font-semibold leading-tight text-foreground">
                          {item.question}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {item.answer}
                        </p>
                      </PremiumCard>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-5 lg:sticky lg:top-28">
              <PremiumCard tone="dark">
                <FileText className="size-6 text-champagne" />
                <h2 className="mt-5 text-2xl font-semibold leading-tight text-white">
                  Nossa abordagem
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-warm-white/70">
                  {area.howWeHelp}
                </p>
              </PremiumCard>

              <PremiumCard tone="ivory">
                <MessageSquare className="size-5 text-gold-dark" />
                <h3 className="mt-4 text-xl font-semibold leading-tight text-foreground">
                  Precisa de orientação em {area.name}?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Entre em contato para que a equipe avalie sua situação de forma
                  individualizada.
                </p>
                <Link
                  href="/contato"
                  className="group mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-navy px-5 text-sm font-semibold text-white shadow-premium transition-all hover:-translate-y-0.5 hover:bg-navy-secondary hover:shadow-premium-lg"
                >
                  Fale com o Escritório
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </PremiumCard>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-white py-8">
        <Container size="narrow">
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            As informações acima têm caráter informativo e não substituem a
            consulta jurídica individualizada. Cada caso possui particularidades.
          </p>
        </Container>
      </section>
    </>
  );
}
