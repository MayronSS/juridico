"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Mail, MapPin, Phone, Scale, type LucideIcon } from "lucide-react";
import { footerNavigation } from "@/data/navigation";
import type { WebsiteSettings } from "@/lib/site-settings-schema";

export function Footer({ settings }: { settings: WebsiteSettings }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { label: "Instagram", href: settings.instagram_url },
    { label: "LinkedIn", href: settings.linkedin_url },
    { label: "Facebook", href: settings.facebook_url },
  ].filter((item) => item.href);

  return (
    <footer className="border-t border-border bg-white py-4 text-foreground sm:py-6">
      <div className="mx-auto w-full max-w-[1540px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-6 lg:grid-cols-[2.5fr_1fr_1fr_2fr]">
          <div>
            <Link href="/" className="group flex min-w-0 items-center gap-2">
              {settings.logo_image_path ? (
                <Image
                  src={settings.logo_image_path}
                  alt={settings.logo_text || settings.office_name}
                  width={140}
                  height={36}
                  className="h-7 w-auto transition-opacity group-hover:opacity-80"
                />
              ) : (
                <>
                  <span className="flex size-7.5 items-center justify-center rounded-xl bg-navy text-white">
                    <Scale className="size-3.5" />
                  </span>
                  <span className="text-sm font-semibold leading-none text-navy">
                    {settings.logo_text || settings.office_name}
                  </span>
                </>
              )}
            </Link>
            <p className="mt-2.5 max-w-md text-xs leading-relaxed text-muted-foreground">
              {settings.footer_description || settings.short_description}
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border px-2 py-0.5 text-[9px] font-semibold text-muted-foreground transition-colors hover:border-navy/20 hover:text-navy"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <FooterColumn title="Institucional" items={footerNavigation.institutional} />

          <div>
            <FooterColumn title="Áreas" items={footerNavigation.areas} />
            <Link
              href="/areas"
              className="mt-2 inline-flex text-xs font-medium text-gold-dark transition-colors hover:text-navy"
            >
              Ver todas as áreas &rarr;
            </Link>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-navy">Contato</h3>
            <ul className="mt-2.5 space-y-1.5">
              <FooterContact icon={Phone}>{settings.phone}</FooterContact>
              <FooterContact icon={Mail}>
                <a href={`mailto:${settings.contact_email}`} className="hover:text-navy">
                  {settings.contact_email}
                </a>
              </FooterContact>
              <FooterContact icon={MapPin}>
                <span>{settings.address}</span>
                <span className="block text-[11px] text-muted-foreground">
                  {settings.city}/{settings.state} - CEP {settings.zip_code}
                </span>
              </FooterContact>
              <FooterContact icon={Clock}>{settings.business_hours}</FooterContact>
            </ul>
          </div>
        </div>

        {/* Perfectly distributed legal/copyright row matching the columns above */}
        <div className="mt-6 grid gap-4 border-t border-border pt-3 lg:grid-cols-[2.5fr_2fr_2fr] items-center text-[11px] text-muted-foreground">
          <div>
            <span>© {currentYear} {settings.office_name}. Todos os direitos reservados.</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 lg:justify-start">
            {footerNavigation.legal.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-navy">
                {item.label}
              </Link>
            ))}
          </div>
          <p className="lg:text-right text-[10px] leading-relaxed">
            Conteúdo informativo, sem promessa de resultado e sem captação ativa de clientela.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-navy">{title}</h3>
      <ul className="mt-2.5 space-y-1.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-xs text-muted-foreground transition-colors hover:text-navy"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterContact({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
      <Icon className="mt-0.5 size-3.5 shrink-0 text-gold-dark" />
      <span>{children}</span>
    </li>
  );
}
