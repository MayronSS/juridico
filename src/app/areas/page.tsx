import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Stagger, StaggerItem } from "@/components/common/Motion";
import { PageHeader } from "@/components/common/PageHeader";
import { PremiumCard } from "@/components/common/PremiumCard";
import { AreaCard } from "@/components/cards/AreaCard";
import { legalAreas } from "@/data/areas";

export const metadata: Metadata = {
  title: "Áreas de Atuação",
  description:
    "Conheça todas as áreas de atuação do nosso escritório: Direito Civil, Trabalhista, Previdenciário, Família, Consumidor, Empresarial e mais.",
};

export default function AreasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Especialidades jurídicas"
        title="Áreas de atuação"
        description="Um portfólio jurídico estruturado para pessoas, famílias e empresas que precisam de orientação técnica e comunicação clara."
      />

      <section className="bg-page py-20">
        <Container size="wide">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {legalAreas.map((area) => (
              <StaggerItem key={area.slug}>
                <AreaCard area={area} variant="full" />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container size="narrow">
          <PremiumCard tone="ivory" className="text-center">
            <p className="text-sm leading-relaxed text-muted-foreground">
              As áreas acima listadas possuem caráter informativo. A consulta
              individualizada é indispensável para a correta análise de cada
              situação concreta.
            </p>
          </PremiumCard>
        </Container>
      </section>
    </>
  );
}
