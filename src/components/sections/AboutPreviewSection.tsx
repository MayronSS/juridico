import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers3 } from "lucide-react";
import { Container } from "@/components/common/Container";
import { FadeIn, Stagger, StaggerItem } from "@/components/common/Motion";
import { PremiumCard } from "@/components/common/PremiumCard";
import { splitLines, type WebsiteSettings } from "@/lib/site-settings-schema";

export function AboutPreviewSection({ settings }: { settings: WebsiteSettings }) {
  const differentials = splitLines(settings.differentials).slice(0, 5);

  return (
    <section
      id="sobre-home"
      className="relative overflow-hidden bg-surface-soft py-24 sm:py-32"
    >
      <Container size="wide">
        <div className="relative grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <FadeIn>
          <PremiumCard tone="dark" className="relative overflow-hidden p-8 sm:p-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-champagne via-white/20 to-transparent" />
            <div className="absolute right-6 top-6 flex size-14 items-center justify-center rounded-2xl bg-white/10 text-champagne">
              <Layers3 className="size-6" />
            </div>
            <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-white/60">
              <span className="h-px w-6 bg-champagne/60" />
              Sobre o escritório
            </p>
            <h2 className="mt-5 max-w-lg text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Advocacia com método, clareza e experiência digital
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/65">
              {settings.about_preview_text}
            </p>
          </PremiumCard>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h2 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {settings.about_title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {settings.full_description}
            </p>

            <Stagger className="mt-8 grid gap-3 sm:grid-cols-2" delay={0.05}>
              {differentials.map((item) => (
                <StaggerItem key={item} className="h-full">
                <div className="flex h-full items-start gap-3 rounded-xl border border-border/80 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-premium">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-dark" />
                  <span className="text-sm font-medium leading-relaxed text-foreground">
                    {item}
                  </span>
                </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Link
              href="/sobre"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark transition-colors hover:text-navy"
            >
              Conheça a estrutura institucional
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
