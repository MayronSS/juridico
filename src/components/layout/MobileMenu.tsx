"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Clock, Mail, MapPin, Phone, Scale, X, type LucideIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { mainNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";
import type { WebsiteSettings } from "@/lib/site-settings-schema";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
  settings: WebsiteSettings;
}

export function MobileMenu({
  isOpen,
  onClose,
  userRole,
  settings,
}: MobileMenuProps) {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const isAdminOrEditor = userRole === "ADMIN" || userRole === "EDITOR";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="flex w-[21rem] flex-col bg-white p-0 sm:w-96">
        <SheetHeader className="p-5">
          <div className="flex items-center justify-between gap-4">
            <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
            {settings.logo_image_path ? (
              <Image
                src={settings.logo_image_path}
                alt={settings.logo_text || settings.office_name}
                width={160}
                height={44}
                className="h-9 w-auto"
              />
            ) : (
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-navy text-white">
                  <Scale className="size-5" />
                </span>
                <span className="truncate text-xl font-semibold leading-none text-navy">
                  {settings.logo_text || settings.office_name}
                </span>
              </div>
            )}
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-mist hover:text-foreground"
              aria-label="Fechar menu"
            >
              <X className="size-5" />
            </button>
          </div>
        </SheetHeader>

        <Separator />

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                  isActive
                    ? "bg-navy text-warm-white"
                    : "text-foreground hover:bg-mist"
                )}
              >
                {item.label}
                {isActive && <span className="size-1.5 rounded-full bg-champagne" />}
              </Link>
            );
          })}

          <div className="space-y-2 pt-3">
            {!isSignedIn ? (
              <Link
                href="/login"
                onClick={onClose}
                className="flex h-11 items-center justify-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-foreground shadow-sm"
              >
                Área do Cliente
              </Link>
            ) : (
              <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-soft px-4 py-3">
                <Link
                  href={isAdminOrEditor ? "/admin" : "/minha-conta"}
                  onClick={onClose}
                  className="text-sm font-semibold text-foreground"
                >
                  {isAdminOrEditor ? "Painel Admin" : "Minha Conta"}
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                    },
                  }}
                />
              </div>
            )}

            <Link
              href="/contato"
              onClick={onClose}
              className="flex h-11 items-center justify-center rounded-xl bg-navy px-4 text-sm font-semibold text-white shadow-premium"
            >
              Fale com o Escritório
            </Link>
          </div>
        </nav>

        <Separator />

        <div className="space-y-4 bg-surface-soft p-5 text-sm">
          {([
            [Phone, settings.phone],
            [Mail, settings.contact_email],
            [MapPin, `${settings.city}/${settings.state}`],
            [Clock, settings.business_hours],
          ] as [LucideIcon, string][]).map(([MenuIcon, text]) => {
            return (
              <div key={String(text)} className="flex items-start gap-3 text-foreground">
                <MenuIcon className="mt-0.5 size-4 shrink-0 text-gold-dark" />
                <span className="leading-relaxed">{String(text)}</span>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
