"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-page py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-white/90 p-8 shadow-premium backdrop-blur">
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-5" />
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Não foi possível carregar esta página
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Ocorreu uma instabilidade ao carregar a experiência. Tente novamente
            em alguns instantes.
          </p>
          <Button type="button" onClick={reset} className="mt-6">
            Tentar novamente
          </Button>
        </div>
      </div>
    </div>
  );
}
