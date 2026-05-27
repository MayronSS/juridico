import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export default function NotFound() {
  return (
    <section className="bg-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="rounded-3xl border border-border bg-white/90 p-8 shadow-premium backdrop-blur">
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full border border-champagne/25 bg-champagne/10">
            <Scale className="size-6 text-gold-dark" />
          </div>
          <h1 className="text-7xl font-semibold leading-none text-navy sm:text-8xl">
            404
          </h1>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-foreground">
            Página não encontrada
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            A página que você procura não existe ou pode ter sido movida.
          </p>
          <Link
            href="/"
            className="group mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-navy px-5 text-sm font-semibold text-white shadow-premium transition-all hover:-translate-y-0.5 hover:bg-navy-secondary"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </section>
  );
}
