// ============================================
// IP Extraction — Extrai IP real do cliente
// ============================================
// Suporta Cloudflare, Vercel, proxies reversos.
// Nunca confia cegamente — valida formato.

import { headers } from "next/headers";

/**
 * Extrai o IP real do cliente considerando proxies.
 * Ordem de prioridade:
 * 1. cf-connecting-ip (Cloudflare)
 * 2. x-real-ip (Nginx/Vercel)
 * 3. x-forwarded-for (primeiro IP da cadeia)
 * 4. Fallback: "unknown"
 */
export async function getClientIP(): Promise<string> {
  const headersList = await headers();

  // Cloudflare — mais confiável
  const cfIP = headersList.get("cf-connecting-ip");
  if (cfIP && isValidIP(cfIP)) return cfIP;

  // Vercel / Nginx
  const realIP = headersList.get("x-real-ip");
  if (realIP && isValidIP(realIP)) return realIP;

  // Proxy chain — pega o primeiro (client original)
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIP = forwardedFor.split(",")[0]?.trim();
    if (firstIP && isValidIP(firstIP)) return firstIP;
  }

  return "unknown";
}

/**
 * Gera hash do IP para armazenamento seguro (LGPD).
 * Não armazena IP real — apenas hash para rastreamento.
 */
export async function getClientIPHash(): Promise<string> {
  const ip = await getClientIP();
  if (ip === "unknown") return "unknown";

  // Hash simples para logs — não precisa ser crypto-grade
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + ":salt:site-juridico");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 16);
}

/**
 * Validação básica de formato IPv4/IPv6
 */
function isValidIP(ip: string): boolean {
  // IPv4
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) return true;
  // IPv6 (simplificado)
  if (/^[0-9a-fA-F:]+$/.test(ip) && ip.includes(":")) return true;
  return false;
}
