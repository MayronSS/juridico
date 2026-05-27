"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ArrowRight, Menu, Scale } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";
import type { WebsiteSettings } from "@/lib/site-settings-schema";
import { MobileMenu } from "./MobileMenu";

export function Header({
  userRole,
  settings,
}: {
  userRole?: string;
  settings: WebsiteSettings;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const isAdminOrEditor = userRole === "ADMIN" || userRole === "EDITOR";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const isHome = pathname === "/";
  const showTransparent = isHome && !isScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          showTransparent
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border/60 bg-white/95 shadow-[0_1px_12px_rgba(7,20,33,0.06)] backdrop-blur-xl"
        )}
      >
        <div className="mx-auto flex h-[76px] w-full max-w-[1540px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12 xl:px-16">
          {/* Logo */}
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            {settings.logo_image_path ? (
              <Image
                src={settings.logo_image_path}
                alt={settings.logo_text || settings.office_name}
                width={188}
                height={48}
                className={cn(
                  "h-10 w-auto transition-opacity group-hover:opacity-80",
                  showTransparent && "brightness-0 invert"
                )}
                priority
              />
            ) : (
              <>
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-lg shadow-sm transition-colors",
                    !showTransparent
                      ? "bg-navy text-white"
                      : "bg-white/15 text-white backdrop-blur-sm"
                  )}
                >
                  <Scale className="size-5" />
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block truncate text-base font-semibold leading-none transition-colors sm:text-lg",
                      !showTransparent ? "text-navy" : "text-white"
                    )}
                  >
                    {settings.logo_text || settings.office_name}
                  </span>
                  <span
                    className={cn(
                      "mt-1 hidden text-[10px] font-medium uppercase tracking-[0.2em] sm:block",
                      !showTransparent ? "text-gold-dark" : "text-champagne/80"
                    )}
                  >
                    Advocacia &amp; Consultoria
                  </span>
                </span>
              </>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-2 text-sm font-medium transition-colors",
                    !showTransparent
                      ? isActive
                        ? "text-navy"
                        : "text-muted-foreground hover:text-navy"
                      : isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="public-nav-active"
                      className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-champagne"
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {!isSignedIn ? (
              <Link
                href="/login"
                className={cn(
                  "inline-flex h-10 items-center rounded-lg border px-4 text-sm font-medium transition-all hover:-translate-y-0.5",
                  !showTransparent
                    ? "border-border bg-white text-navy shadow-sm hover:border-champagne/70 hover:shadow-premium"
                    : "border-white/20 bg-white/[0.08] text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/[0.14]"
                )}
              >
                Área do Cliente
              </Link>
            ) : (
              <>
                <Link
                  href={isAdminOrEditor ? "/admin" : "/minha-conta"}
                  className={cn(
                    "inline-flex h-10 items-center rounded-lg border px-4 text-sm font-medium transition-all hover:-translate-y-0.5",
                    !showTransparent
                      ? "border-border bg-white text-navy shadow-sm hover:border-champagne/70 hover:shadow-premium"
                      : "border-white/20 bg-white/[0.08] text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/[0.14]"
                  )}
                >
                  {isAdminOrEditor ? "Painel Admin" : "Minha Conta"}
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: cn(
                        "h-8 w-8 rounded-full border shadow-sm",
                        !showTransparent ? "border-border" : "border-white/20"
                      ),
                    },
                  }}
                />
              </>
            )}

            <Link
              href="/contato"
              className="group inline-flex h-10 items-center gap-2 rounded-lg bg-champagne px-5 text-sm font-semibold text-navy shadow-[0_4px_16px_rgba(200,169,106,0.3)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-premium-lg"
            >
              Fale com o Escritório
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className={cn(
              "rounded-lg border p-2.5 transition-colors lg:hidden",
              !showTransparent
                ? "border-border bg-white text-navy shadow-sm hover:bg-surface-soft"
                : "border-white/20 bg-white/[0.08] text-white hover:bg-white/[0.14]"
            )}
            aria-label="Abrir menu de navegação"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* Conditionally render header spacer for non-homepage views */}
      {!isHome && <div className="h-[76px]" />}

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        userRole={userRole}
        settings={settings}
      />
    </>
  );
}
