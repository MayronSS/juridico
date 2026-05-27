import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { legalAreas } from "@/data/areas";
import { AreaCard } from "@/components/cards/AreaCard";
import { Container } from "@/components/common/Container";
import { Stagger, StaggerItem } from "@/components/common/Motion";
import { SectionHeader } from "@/components/common/SectionHeader";

export function AreasSection() {
  return (
    <section
      id="areas-home"
      className="relative overflow-hidden bg-warm-white py-24 sm:py-32"
    >
      {/* Subtle top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <Container size="wide" className="relative z-10">
        <SectionHeader
          eyebrow="Áreas de atuação"
          title="Soluções jurídicas para cada etapa da sua jornada"
          description="Atuação consultiva e contenciosa com análise técnica, estratégia objetiva e acompanhamento dedicado."
          align="left"
          action={
            <Link
              href="/areas"
              className="group inline-flex h-11 items-center gap-2 rounded-xl border border-navy/10 bg-white px-5 text-sm font-semibold text-navy shadow-sm transition-all hover:-translate-y-0.5 hover:border-champagne/70 hover:shadow-premium"
            >
              Ver todas as áreas
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {legalAreas.slice(0, 10).map((area) => (
            <StaggerItem key={area.slug}>
              <AreaCard area={area} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
