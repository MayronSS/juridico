// ============================================
// Login — Página de Autenticação Admin (Clerk)
// ============================================

import { SignIn } from "@clerk/nextjs";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="bg-page surface-grid flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mb-4 inline-flex rounded-2xl border border-border bg-white/80 p-3 shadow-premium backdrop-blur">
            <ShieldCheck className="size-8 text-navy" />
          </div>
          <h1 className="text-2xl font-semibold text-navy">
            Painel Administrativo
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Acesso restrito ao escritório
          </p>
        </div>

        {/* Clerk SignIn Component */}
        <div className="flex justify-center rounded-3xl border border-border bg-white/75 p-2 shadow-premium backdrop-blur">
          <SignIn
            routing="hash"
            forceRedirectUrl="/admin"
            signUpUrl="" // Desativa redirecionamento de cadastro
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
                footerAction: "hidden", // Esconde o link "Não tem conta? Cadastre-se"
              },
            }}
          />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Acesso exclusivo para administradores do escritório.
        </p>
      </div>
    </div>
  );
}
