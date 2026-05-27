// ============================================
// Login — Área do Cliente (Pública)
// ============================================

import { SignIn } from "@clerk/nextjs";
import { ShieldCheck } from "lucide-react";

export default function ClientLoginPage() {
  return (
    <div className="bg-page surface-grid flex min-h-[80vh] items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mb-4 inline-flex rounded-2xl border border-border bg-white/80 p-3 shadow-premium backdrop-blur">
            <ShieldCheck className="size-8 text-navy" />
          </div>
          <h2 className="text-3xl font-semibold text-navy">
            Área do Cliente
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Faça login para acompanhar seu perfil e contatos enviados
          </p>
        </div>

        <div className="flex justify-center rounded-3xl border border-border bg-white/75 p-2 shadow-premium backdrop-blur">
          <SignIn
            routing="hash"
            signUpUrl="/cadastro"
            forceRedirectUrl="/minha-conta"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-white rounded-3xl shadow-none border border-border w-full",
                headerTitle: "font-heading text-foreground",
                headerSubtitle: "text-muted-foreground",
                formFieldInput:
                  "bg-white border-border text-foreground rounded-xl focus:ring-gold/40",
                formButtonPrimary:
                  "bg-navy hover:bg-navy-secondary text-white rounded-xl py-5 shadow-premium",
                footerActionLink: "text-gold-dark hover:text-navy",
                identityPreviewEditButton: "text-gold-dark",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
