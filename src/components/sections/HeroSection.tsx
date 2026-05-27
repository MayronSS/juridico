import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/common/Motion";
import type { WebsiteSettings } from "@/lib/site-settings-schema";
import { HeroVideoBackground } from "./HeroVideoBackground";

export function HeroSection({ settings }: { settings: WebsiteSettings }) {
  const trustBadges = [
    {
      value: settings.trust_badge_1_value,
      label: settings.trust_badge_1_label,
      icon: Scale,
    },
    {
      value: settings.trust_badge_2_value,
      label: settings.trust_badge_2_label,
      icon: BadgeCheck,
    },
    {
      value: settings.trust_badge_3_value,
      label: settings.trust_badge_3_label,
      icon: BriefcaseBusiness,
    },
  ].filter((badge) => badge.value && badge.label);

  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {/* === Video background === */}
      <HeroVideoBackground />

      {/* === Overlays for legibility === */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-navy/40"
      />
      {/* Subtle champagne accent glow */}
      <div
        aria-hidden="true"
        className="absolute -right-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-champagne/[0.06] blur-[100px]"
      />

      {/* === Content === */}
      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1540px] flex-col justify-center px-5 pt-32 pb-20 sm:px-8 sm:pt-36 sm:pb-24 lg:px-12 xl:px-16">
        <div className="max-w-3xl">
          {/* Elegant eyebrow */}
          <FadeIn trigger="load" delay={0.05} y={12}>
            <p className="mb-6 inline-flex items-center gap-2.5 text-sm font-medium tracking-wide text-white/60">
              <span className="h-px w-8 bg-champagne/70" />
              Advocacia &amp; Consultoria Jurídica
            </p>
          </FadeIn>

          {/* Headline */}
          <FadeIn trigger="load" delay={0.12} y={16}>
            <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
              {settings.hero_title}
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn trigger="load" delay={0.2} y={14}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {settings.hero_subtitle}
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn trigger="load" delay={0.28} y={12}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href={settings.hero_primary_cta_url || "/contato"}
                className="group inline-flex h-13 items-center justify-center gap-2.5 rounded-xl bg-champagne px-7 text-sm font-semibold text-navy shadow-[0_8px_32px_rgba(200,169,106,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_40px_rgba(200,169,106,0.35)]"
              >
                {settings.hero_primary_cta_text}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href={settings.hero_secondary_cta_url || "/areas"}
                className="inline-flex h-13 items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.12]"
              >
                {settings.hero_secondary_cta_text}
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Trust stats strip — bottom of hero */}
        {trustBadges.length > 0 && (
          <Stagger
            className="mt-auto mt-12 sm:mt-16 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] sm:grid-cols-3"
            trigger="load"
            delay={0.38}
          >
            {trustBadges.map((stat) => (
              <StaggerItem key={`${stat.value}-${stat.label}`}>
                <TrustStat
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}

function TrustStat({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 border-r border-white/[0.06] px-6 py-5 last:border-r-0">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-champagne/[0.12] text-champagne">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-xl font-bold leading-none tracking-tight text-white">
          {value}
        </span>
        <span className="mt-1.5 block text-xs font-medium leading-snug text-white/50">
          {label}
        </span>
      </span>
    </div>
  );
}
