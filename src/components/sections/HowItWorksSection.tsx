import { FileCheck, Handshake, MessageSquare, Search } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Stagger, StaggerItem } from "@/components/common/Motion";
import { SectionHeader } from "@/components/common/SectionHeader";

const steps = [
  {
    icon: MessageSquare,
    title: "Contato inicial",
    description:
      "O primeiro contato reúne informações objetivas para entender a natureza da demanda.",
  },
  {
    icon: Search,
    title: "Análise preliminar",
    description:
      "A equipe avalia contexto, documentos disponíveis, riscos e pontos que precisam de esclarecimento.",
  },
  {
    icon: FileCheck,
    title: "Orientação técnica",
    description:
      "Você recebe uma leitura clara das alternativas, limites, prazos e próximos passos possíveis.",
  },
  {
    icon: Handshake,
    title: "Acompanhamento",
    description:
      "Havendo contratação, o trabalho segue com comunicação organizada e acompanhamento responsável.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="metodo-home"
      className="relative overflow-hidden bg-navy py-24 text-white sm:py-32"
    >
      {/* Subtle champagne glow */}
      <div
        aria-hidden="true"
        className="absolute -left-32 top-1/4 h-[24rem] w-[24rem] rounded-full bg-champagne/[0.04] blur-[80px]"
      />
      <Container size="wide">
        <SectionHeader
          eyebrow="Método"
          title="Como funciona o atendimento"
          description="Um fluxo objetivo para transformar dúvidas jurídicas em decisões mais informadas, sem promessa de resultado e com comunicação profissional."
          inverted
        />

        <Stagger className="relative mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <StaggerItem key={step.title}>
                <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 transition-all hover:-translate-y-1 hover:border-champagne/30 hover:bg-white/[0.07]">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-champagne text-navy">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-2xl font-semibold leading-none text-white/[0.08]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold leading-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
