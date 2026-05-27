"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function WhatsAppButton({
  number,
  message,
}: {
  number?: string;
  message?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-40 transition-all duration-500 sm:bottom-6 sm:right-6",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <div
        className={cn(
          "absolute bottom-full right-0 mb-3 w-max max-w-[240px] rounded-2xl border border-border bg-white/95 px-4 py-3 text-sm text-foreground shadow-premium-lg backdrop-blur transition-all duration-200",
          isHovered ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        )}
      >
        <p className="font-semibold">Fale com o escritório</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Atendimento dentro do horário comercial.
        </p>
      </div>

      <a
        href={getWhatsAppUrl(number, message)}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex size-14 items-center justify-center rounded-full border border-emerald-300/60 bg-emerald-600 text-white shadow-premium-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-3 focus:ring-emerald-500/30 focus:ring-offset-2"
        aria-label="Entrar em contato pelo WhatsApp"
      >
        <MessageCircle className="size-6" />
      </a>
    </div>
  );
}
