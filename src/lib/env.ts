// ============================================
// Validação de Variáveis de Ambiente — Zod
// ============================================
// Fail-fast: se variáveis obrigatórias faltarem,
// o servidor NÃO inicia e mostra erro claro.

import { z } from "zod";

// ============================================
// Schema: variáveis server-only
// ============================================
const serverEnvSchema = z.object({
  // --- Banco de Dados ---
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL é obrigatória"),

  // --- Auth ---
  AUTH_SECRET: z.string().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z
    .string()
    .url("NEXTAUTH_URL deve ser uma URL válida")
    .optional(),

  // --- E-mail ---
  RESEND_API_KEY: z
    .string()
    .optional()
    .default(""),
  CONTACT_EMAIL: z
    .string()
    .email("CONTACT_EMAIL deve ser um e-mail válido")
    .optional()
    .default("contato@seudominio.com.br"),

  // --- Criptografia ---
  ENCRYPTION_KEY: z
    .string()
    .min(32, "ENCRYPTION_KEY deve ter pelo menos 32 caracteres")
    .optional(),

  // --- Clerk ---
  CLERK_SECRET_KEY: z.string().min(1).optional(),

  // --- Upstash Redis ---
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

  // --- Logtail ---
  LOGTAIL_SOURCE_TOKEN: z.string().min(1).optional(),

  // --- Node ---
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

// ============================================
// Schema: variáveis públicas (expostas ao browser)
// ============================================
const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),
  NEXT_PUBLIC_SITE_NAME: z
    .string()
    .default("Advocacia & Consultoria Jurídica"),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z
    .string()
    .default("5500000000000"),

  // --- Clerk ---
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1).optional(),
});

// ============================================
// Validação e exportação
// ============================================

function validateEnv() {
  // Variáveis públicas — acessíveis no browser
  const publicResult = publicEnvSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  });

  if (!publicResult.success) {
    console.error(
      "❌ Variáveis de ambiente públicas inválidas:",
      publicResult.error.flatten().fieldErrors
    );
    throw new Error("Variáveis de ambiente públicas inválidas.");
  }

  // Variáveis server-only — nunca no browser
  // Só valida no server (não durante build do client)
  if (typeof window !== "undefined") {
    return { server: {} as z.infer<typeof serverEnvSchema>, public: publicResult.data };
  }

  const serverResult = serverEnvSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    NODE_ENV: process.env.NODE_ENV,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN,
  });

  if (!serverResult.success) {
    console.error(
      "❌ Variáveis de ambiente do servidor inválidas:",
      serverResult.error.flatten().fieldErrors
    );
    // Em desenvolvimento, não crashar — apenas avisar
    if (process.env.NODE_ENV === "production") {
      throw new Error("Variáveis de ambiente do servidor inválidas. Deploy abortado.");
    }
  }

  return {
    server: serverResult.success ? serverResult.data : ({} as z.infer<typeof serverEnvSchema>),
    public: publicResult.data,
  };
}

export const env = validateEnv();

/**
 * Helper para verificar se estamos em produção
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * Helper para verificar se Resend está configurado
 */
export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.length > 0;
}
