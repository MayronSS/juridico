// ============================================
// Logger — Logging Estruturado
// ============================================
// Funciona localmente com console.
// Envia para Logtail/Better Stack quando LOGTAIL_SOURCE_TOKEN está configurado.
// NUNCA loga: senhas, tokens, API keys, dados pessoais sensíveis.

import { Logtail } from "@logtail/node";

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  requestId?: string;
  userId?: string;
  userRole?: string;
  route?: string;
  method?: string;
  statusCode?: number;
  ipHash?: string;
  userAgent?: string;
  duration?: number;
  error?: string;
  metadata?: Record<string, unknown>;
}

// Inicializa Logtail se o token estiver configurado
const logtailToken = typeof process !== "undefined" ? process.env.LOGTAIL_SOURCE_TOKEN : undefined;
const logtail = logtailToken ? new Logtail(logtailToken) : null;

if (logtail) {
  // Configuração silenciosa do Logtail
  console.log("ℹ️ Logtail/Better Stack logger inicializado.");
}

// Campos que NUNCA devem aparecer em logs
const REDACT_FIELDS = [
  "password",
  "passwordHash",
  "secret",
  "token",
  "apiKey",
  "api_key",
  "authorization",
  "cookie",
  "creditCard",
  "cardNumber",
  "cvv",
  "ssn",
  "cpf",
];

/**
 * Remove campos sensíveis de objetos antes de logar
 */
function redactSensitiveData(data: Record<string, unknown>): Record<string, unknown> {
  const redacted = { ...data };
  for (const key of Object.keys(redacted)) {
    const lowerKey = key.toLowerCase();
    if (REDACT_FIELDS.some((field) => lowerKey.includes(field.toLowerCase()))) {
      redacted[key] = "[REDACTED]";
    }
    // Redact nested objects
    if (typeof redacted[key] === "object" && redacted[key] !== null && !Array.isArray(redacted[key])) {
      redacted[key] = redactSensitiveData(redacted[key] as Record<string, unknown>);
    }
  }
  return redacted;
}

/**
 * Formata e envia log
 */
function writeLog(entry: LogEntry): void {
  const safeEntry = entry.metadata
    ? { ...entry, metadata: redactSensitiveData(entry.metadata) }
    : entry;

  // Enviar para Logtail se configurado
  if (logtail) {
    try {
      const { message, level, ...context } = safeEntry;
      if (level === "error") {
        logtail.error(message, context as Record<string, unknown>);
      } else if (level === "warn") {
        logtail.warn(message, context as Record<string, unknown>);
      } else if (level === "debug") {
        logtail.debug(message, context as Record<string, unknown>);
      } else {
        logtail.info(message, context as Record<string, unknown>);
      }
    } catch (err) {
      console.error("❌ Erro ao enviar log para Logtail:", err);
    }
  }

  const output = JSON.stringify(safeEntry);

  switch (entry.level) {
    case "error":
      console.error(output);
      break;
    case "warn":
      console.warn(output);
      break;
    case "debug":
      if (process.env.NODE_ENV !== "production") {
        console.debug(output);
      }
      break;
    default:
      console.log(output);
  }
}

// ============================================
// API pública do Logger
// ============================================

export const logger = {
  info(message: string, metadata?: Record<string, unknown>) {
    writeLog({
      level: "info",
      message,
      timestamp: new Date().toISOString(),
      metadata,
    });
  },

  warn(message: string, metadata?: Record<string, unknown>) {
    writeLog({
      level: "warn",
      message,
      timestamp: new Date().toISOString(),
      metadata,
    });
  },

  error(message: string, error?: unknown, metadata?: Record<string, unknown>) {
    writeLog({
      level: "error",
      message,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error),
      metadata,
    });
  },

  debug(message: string, metadata?: Record<string, unknown>) {
    writeLog({
      level: "debug",
      message,
      timestamp: new Date().toISOString(),
      metadata,
    });
  },

  /**
   * Log de acesso a rota API (access log)
   */
  access(data: {
    route: string;
    method: string;
    statusCode: number;
    userId?: string;
    userRole?: string;
    ipHash?: string;
    userAgent?: string;
    duration?: number;
    requestId?: string;
  }) {
    writeLog({
      level: "info",
      message: `${data.method} ${data.route} → ${data.statusCode}`,
      timestamp: new Date().toISOString(),
      ...data,
    });
  },
};

/**
 * Gera um request ID único para correlação de logs
 */
export function generateRequestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
