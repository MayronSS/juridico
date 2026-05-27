"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Stagger, StaggerItem } from "@/components/common/Motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { generalFaq } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq-home"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f5f8fa_0%,#fffdf8_100%)] py-20 sm:py-28"
    >
      <div className="absolute inset-0 surface-grid opacity-50" />
      <Container size="narrow" className="relative">
        <SectionHeader
          eyebrow="Dúvidas comuns"
          title="Perguntas frequentes"
          description="Respostas objetivas sobre o primeiro contato, análise inicial e limites éticos da comunicação jurídica."
        />

        <Stagger className="mt-12 space-y-3">
          {generalFaq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <StaggerItem key={item.question}>
              <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/86 shadow-premium backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-premium-lg">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-mist/55"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold leading-tight text-foreground sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-navy transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="border-t border-border/80 bg-white/74 px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
