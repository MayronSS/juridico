import Link from "next/link";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { Container } from "@/components/common/Container";
import { FadeIn } from "@/components/common/Motion";
import type { WebsiteSettings } from "@/lib/site-settings-schema";

export function FinalCtaSection({ settings }: { settings: WebsiteSettings }) {
  return (
    <section
      id="cta-home"
      className="relative overflow-hidden bg-navy py-8 sm:py-10 text-white"
    >
      {/* Subtle champagne glow */}
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-champagne/[0.05] blur-[100px]"
      />
      <Container size="wide" className="relative">
        <FadeIn className="border-y border-white/[0.08] py-4 lg:py-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-champagne text-navy">
                <MessageSquareText className="size-5" />
              </div>
              <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                {settings.final_cta_title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
                {settings.final_cta_description}
              </p>
              <p className="mt-5 text-xs leading-relaxed text-white/40">
                O contato não cria automaticamente uma relação advogado-cliente.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href={settings.hero_primary_cta_url || "/contato"}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-champagne px-7 text-sm font-semibold text-navy shadow-[0_4px_20px_rgba(200,169,106,0.3)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-premium-lg"
              >
                {settings.hero_primary_cta_text}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={settings.hero_secondary_cta_url || "/areas"}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-7 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-navy hover:shadow-premium"
              >
                {settings.hero_secondary_cta_text}
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
