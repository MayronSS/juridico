// ============================================
// Rate Limiter — Proteção contra spam
// ============================================
// Suporta Upstash Redis em produção com fallback
// automático para Map em memória em desenvolvimento.

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { logger } from "@/lib/logger";

const rateLimitMap = new Map<
  string,
  { count: number; lastReset: number }
>();

// Limpa entradas antigas a cada 5 minutos
if (typeof window === "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now - value.lastReset > 60 * 1000) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

// Configuração Upstash Redis
const hasRedis =
  typeof process !== "undefined" &&
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

let redisClient: Redis | null = null;

if (hasRedis) {
  try {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
    logger.info("Upstash Redis configurado com sucesso para rate limiting.");
  } catch (error) {
    logger.error("Falha ao inicializar cliente Redis. Fallback para memória ativado.", error);
  }
}

interface RateLimitOptions {
  /** Número máximo de requisições na janela */
  maxRequests?: number;
  /** Janela de tempo em segundos */
  windowSeconds?: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetIn: number; // segundos até reset
}

/**
 * Verifica rate limit por identificador (IP, e-mail, etc.)
 */
export async function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): Promise<RateLimitResult> {
  const { maxRequests = 5, windowSeconds = 60 } = options;

  // 1. Tentar usar Upstash Redis se configurado
  if (redisClient) {
    try {
      const ratelimit = new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(maxRequests, `${windowSeconds} s`),
        analytics: true,
        prefix: "@upstash/ratelimit",
      });

      const { success, remaining, reset } = await ratelimit.limit(identifier);
      const now = Date.now();
      const resetIn = Math.max(0, Math.ceil((reset - now) / 1000));

      return {
        success,
        remaining,
        resetIn,
      };
    } catch (error) {
      logger.error("Erro no Upstash Redis rate limit. Usando fallback em memória.", error);
    }
  }

  // 2. Fallback em memória (Map local)
  const windowMs = windowSeconds * 1000;
  const now = Date.now();

  const existing = rateLimitMap.get(identifier);

  if (!existing || now - existing.lastReset > windowMs) {
    // Nova janela
    rateLimitMap.set(identifier, { count: 1, lastReset: now });
    return {
      success: true,
      remaining: maxRequests - 1,
      resetIn: windowSeconds,
    };
  }

  if (existing.count >= maxRequests) {
    // Limite atingido
    const resetIn = Math.ceil(
      (windowMs - (now - existing.lastReset)) / 1000
    );
    return {
      success: false,
      remaining: 0,
      resetIn,
    };
  }

  // Incrementa contador
  existing.count++;
  const resetIn = Math.ceil(
    (windowMs - (now - existing.lastReset)) / 1000
  );
  return {
    success: true,
    remaining: maxRequests - existing.count,
    resetIn,
  };
}

/**
 * Rate limit específico para formulário de contato
 * 5 envios por minuto por IP
 */
export async function checkContactRateLimit(ip: string): Promise<RateLimitResult> {
  return checkRateLimit(`contact:${ip}`, {
    maxRequests: 5,
    windowSeconds: 60,
  });
}

/**
 * Rate limit para tentativas de login (legado)
 */
export async function checkLoginRateLimit(ip: string): Promise<RateLimitResult> {
  return checkRateLimit(`login:${ip}`, {
    maxRequests: 5,
    windowSeconds: 300,
  });
}
