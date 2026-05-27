import type { Metadata } from "next";
import { BookOpen, CheckCircle2, Scale, Shield, Users } from "lucide-react";
import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { PremiumCard } from "@/components/common/PremiumCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getWebsiteSettings } from "@/lib/site-settings";
import { splitLines } from "@/lib/site-settings-schema";

export const metadata: Metadata = {
  title: "Sobre o Escritório",
  description:
    "Conheça a história, valores e compromisso profissional do escritório.",
};

const valueIcons = [Scale, Shield, Users, BookOpen];

export default async function SobrePage() {
  const settings = await getWebsiteSettings();
  const values = splitLines(settings.values);
  const differentials = splitLines(settings.differentials);

  return (
    <>
      <PageHeader
        eyebrow="Institucional"
        title={settings.about_title}
        description={settings.short_description}
      />

      <section className="bg-white py-20">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <span className="h-px w-6 bg-champagne" />
                História e método
              </p>
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Uma operação jurídica preparada para um cliente mais digital.
              </h2>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {settings.about_content.split(/\n{2,}/).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p>{settings.team_profile}</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                ["Missão", settings.mission],
                ["Visão", settings.vision],
              ].map(([title, description]) => (
                <PremiumCard key={title} tone="ivory">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">
                    {title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">
                    {description}
                  </p>
                </PremiumCard>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-page py-20">
        <Container size="wide">
          <SectionHeader
            eyebrow="Cultura"
            title="Valores e diferenciais"
            description="A identidade do escritório combina postura técnica, comunicação clara e responsabilidade ética em todos os pontos de contato."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <PremiumCard key={value} hover className="h-full">
                  <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-mist text-navy">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-xl font-semibold leading-tight text-foreground">
                    {value}
                  </h3>
                  {differentials[index] && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {differentials[index]}
                    </p>
                  )}
                </PremiumCard>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container size="narrow">
          <PremiumCard className="p-8 sm:p-10">
            <h2 className="text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              Compromisso com a ética na publicidade
            </h2>
            <div className="mt-7 space-y-4">
              {[
                "Este site possui caráter exclusivamente informativo e não constitui captação ativa de clientela.",
                "Não prometemos resultados específicos, pois cada caso possui particularidades que influenciam o desfecho.",
                "Todo conteúdo publicado segue as diretrizes éticas aplicáveis à publicidade profissional.",
                "Os dados pessoais coletados por meio deste site são tratados em conformidade com a LGPD.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-navy" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </PremiumCard>
        </Container>
      </section>
    </>
  );
}
