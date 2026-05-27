"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  LockKeyhole,
  Scale,
} from "lucide-react";
import type { WebsiteSettings } from "@/lib/site-settings-schema";

const ease = [0.22, 1, 0.36, 1] as const;

export function AnimatedHeroVisual({ settings }: { settings: WebsiteSettings }) {
  const reduceMotion = useReducedMotion();

  const floatAnimation = reduceMotion
    ? undefined
    : {
        y: [0, -10, 0],
        rotate: [0, 0.35, 0],
      };

  const softPulse = reduceMotion
    ? undefined
    : {
        scale: [1, 1.035, 1],
        opacity: [0.55, 0.85, 0.55],
      };

  return (
    <div className="relative mx-auto w-full max-w-[780px] lg:mr-0">
      <motion.div
        aria-hidden="true"
        className="absolute -left-12 top-10 size-32 rounded-full bg-champagne/[0.18] blur-3xl"
        animate={softPulse}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-10 bottom-16 size-44 rounded-full bg-navy/[0.10] blur-3xl"
        animate={softPulse}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      <motion.div
        className="relative z-10 rounded-[2.2rem] border border-navy/[0.10] bg-white/[0.70] p-3 shadow-[0_35px_120px_rgba(7,20,33,0.18)] backdrop-blur-2xl"
        animate={floatAnimation}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative overflow-hidden rounded-[1.75rem] border border-navy/[0.10] bg-[#f7f5ef]">
          <div className="flex items-center justify-between border-b border-navy/[0.10] bg-white/[0.86] px-5 py-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-2xl bg-navy text-champagne shadow-sm">
                <Scale className="size-4" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-navy">
                  {settings.logo_text || settings.office_name}
                </p>
                <p className="text-[0.68rem] font-semibold text-muted-foreground">
                  Experiência digital jurídica
                </p>
              </div>
            </div>
            <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 sm:inline-flex">
              Online
            </span>
          </div>

          <div className="grid min-h-[410px] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative overflow-hidden bg-navy p-7 text-white sm:p-8">
              <div className="absolute inset-0 opacity-55 [background:radial-gradient(circle_at_18%_18%,rgba(200,169,106,0.26),transparent_26%),radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.12),transparent_20%)]" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.08] px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/[0.70]">
                    <BadgeCheck className="size-3.5 text-champagne" />
                    Assessoria estratégica
                  </span>
                  <h2 className="mt-8 max-w-sm text-3xl font-black leading-tight tracking-[-0.045em] text-white sm:text-4xl">
                    Decisões jurídicas com clareza e direção.
                  </h2>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/[0.68]">
                    Um atendimento organizado para transformar dúvidas em próximos passos seguros.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/[0.10] pt-5">
                  {[
                    [settings.trust_badge_1_value || "10+", "Áreas"],
                    [settings.trust_badge_2_value || "Ética", "Conduta"],
                    [settings.trust_badge_3_value || "LGPD", "Dados"],
                  ].map(([value, label]) => (
                    <div key={value}>
                      <p className="text-xl font-black tracking-[-0.04em] text-white">{value}</p>
                      <p className="mt-1 text-[0.68rem] font-semibold text-white/[0.48]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex flex-col gap-4 p-5 sm:p-6">
              <motion.div
                className="rounded-3xl border border-navy/[0.10] bg-white p-5 shadow-[0_18px_48px_rgba(7,20,33,0.08)]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.16, ease }}
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      Painel de atendimento
                    </p>
                    <h3 className="mt-1 text-xl font-black tracking-[-0.04em] text-navy">
                      Visão do caso
                    </h3>
                  </div>
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-champagne text-navy">
                    <BarChart3 className="size-5" />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <MiniMetric title="Risco mapeado" value="Clareza" icon={LockKeyhole} />
                  <MiniMetric title="Próximos passos" value="Objetivos" icon={CheckCircle2} />
                </div>
              </motion.div>

              <motion.div
                className="rounded-3xl border border-navy/[0.10] bg-white/[0.86] p-5 shadow-[0_18px_48px_rgba(7,20,33,0.08)] backdrop-blur"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.28, ease }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-navy">Fluxo de análise</p>
                  <p className="text-xs font-semibold text-muted-foreground">4 etapas</p>
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    ["Triagem", "Recebimento seguro das informações"],
                    ["Diagnóstico", "Leitura técnica e comercial"],
                    ["Direção", "Plano de ação e comunicação"],
                  ].map(([title, description], index) => (
                    <div key={title} className="flex gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-black text-white">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-black text-navy">{title}</p>
                        <p className="text-xs font-medium text-muted-foreground">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-8 right-2 z-20 hidden w-[210px] rounded-[2rem] border border-navy/[0.10] bg-white p-3 shadow-[0_26px_80px_rgba(7,20,33,0.22)] lg:block"
        initial={{ opacity: 0, y: 24, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.72, delay: 0.38, ease }}
      >
        <div className="overflow-hidden rounded-[1.45rem] border border-navy/[0.10] bg-navy text-white">
          <div className="flex items-center justify-between border-b border-white/[0.10] px-4 py-3">
            <Scale className="size-4 text-champagne" />
            <span className="size-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/[0.46]">
              Mobile
            </p>
            <h3 className="mt-3 text-xl font-black leading-tight tracking-[-0.04em] text-white">
              Atendimento claro no seu ritmo.
            </h3>
            <button className="mt-5 inline-flex h-9 items-center gap-2 rounded-xl bg-champagne px-3 text-xs font-black text-navy">
              Fale conosco
              <ArrowRight className="size-3.5" />
            </button>
          </div>
          <div className="bg-white p-4 text-navy">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="size-4 text-gold-dark" />
              <span className="text-xs font-black">Áreas de atuação</span>
            </div>
            <div className="space-y-2">
              {['Empresarial', 'Civil', 'Trabalhista'].map((item) => (
                <div key={item} className="rounded-xl border border-navy/[0.10] bg-surface-soft px-3 py-2 text-xs font-bold">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -left-4 bottom-14 z-20 hidden rounded-3xl border border-navy/[0.10] bg-white/[0.88] p-4 shadow-[0_18px_55px_rgba(7,20,33,0.14)] backdrop-blur-xl xl:block"
        initial={{ opacity: 0, y: 20, x: -18 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.72, delay: 0.5, ease }}
      >
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-champagne text-navy">
            <BriefcaseBusiness className="size-5" />
          </span>
          <div>
            <p className="text-sm font-black text-navy">Consultoria empresarial</p>
            <p className="text-xs font-semibold text-muted-foreground">Estratégia antes da decisão.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MiniMetric({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: typeof LockKeyhole;
}) {
  return (
    <div className="rounded-2xl border border-navy/[0.10] bg-surface-soft p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold text-muted-foreground">{title}</p>
        <Icon className="size-4 text-gold-dark" />
      </div>
      <p className="mt-3 text-2xl font-black tracking-[-0.04em] text-navy">
        {value}
      </p>
    </div>
  );
}
