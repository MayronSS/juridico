import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/common/Container";
import { FadeIn, Stagger, StaggerItem } from "@/components/common/Motion";
import { PageHeader } from "@/components/common/PageHeader";
import { PremiumCard } from "@/components/common/PremiumCard";
import { getWebsiteSettings } from "@/lib/site-settings";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com o escritório. Preencha o formulário ou fale conosco por telefone e WhatsApp.",
};

export default async function ContatoPage() {
  const settings = await getWebsiteSettings();
  const whatsappUrl = getWhatsAppUrl(
    settings.whatsapp_number,
    settings.whatsapp_message
  );

  return (
    <>
      <PageHeader
        eyebrow="Atendimento"
        title="Entre em contato"
        description={settings.contact_intro_text}
      />

      <section className="bg-page py-16 sm:py-20">
        <Container size="wide">
          <div className="grid gap-8 lg:grid-cols-[1fr_390px] lg:items-start">
            <FadeIn className="rounded-3xl border border-border/80 bg-white/90 p-5 shadow-premium backdrop-blur sm:p-8">
              <div className="mb-8 border-b border-border pb-6">
                <p className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="h-px w-6 bg-champagne" />
                  Formulário
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                  Solicite uma análise inicial
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {settings.contact_instructions}
                </p>
              </div>
              <ContactForm disclaimerText={settings.contact_disclaimer_text} />
            </FadeIn>

            <Stagger className="space-y-5 lg:sticky lg:top-28">
              <StaggerItem>
              <PremiumCard>
                <h3 className="text-2xl font-semibold leading-tight text-foreground">
                  Informações do escritório
                </h3>
                <div className="mt-7 space-y-5">
                  <ContactItem icon={Phone} label="Telefone">
                    {settings.phone}
                  </ContactItem>
                  <ContactItem icon={Mail} label="E-mail">
                    <a href={`mailto:${settings.contact_email}`} className="hover:text-navy">
                      {settings.contact_email}
                    </a>
                  </ContactItem>
                  <ContactItem icon={MapPin} label="Endereço">
                    <span>{settings.address}</span>
                    <span className="block text-muted-foreground">
                      {settings.city}/{settings.state} - CEP {settings.zip_code}
                    </span>
                    {settings.google_maps_url && (
                      <a
                        href={settings.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex text-navy hover:underline"
                      >
                        Ver no mapa
                      </a>
                    )}
                  </ContactItem>
                  <ContactItem icon={Clock} label="Horário">
                    {settings.business_hours}
                  </ContactItem>
                </div>
              </PremiumCard>
              </StaggerItem>

              <StaggerItem>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                    <MessageCircle className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold leading-tight text-foreground">
                      WhatsApp
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Canal direto de contato
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Prefere uma conversa direta? Envie uma mensagem e responderemos
                  durante o horário de atendimento.
                </p>
                <span className="mt-4 inline-flex text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">
                  Abrir conversa
                </span>
              </a>
              </StaggerItem>

              <StaggerItem>
              <PremiumCard tone="ivory">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-navy" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">Nota:</strong>{" "}
                    {settings.contact_disclaimer_text}
                  </p>
                </div>
              </PremiumCard>
              </StaggerItem>
            </Stagger>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-mist text-navy">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground">
          {label}
        </p>
        <div className="mt-1 text-sm leading-relaxed text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
