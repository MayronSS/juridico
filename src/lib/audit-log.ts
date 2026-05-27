// ============================================
// Audit Log — Registro de Ações Sensíveis
// ============================================
// Registra ações como login, mudança de role,
// criação/exclusão de recursos, acesso a dados sensíveis.
// NUNCA registra senhas, tokens ou dados pessoais sensíveis.

import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

// ============================================
// Tipos de ação auditável
// ============================================
export type AuditAction =
  // Auth
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "LOGOUT"
  // Leads
  | "LEAD_VIEWED"
  | "LEAD_STATUS_CHANGED"
  | "LEAD_EXPORTED"
  | "LEAD_DELETED"
  // Artigos
  | "ARTICLE_CREATED"
  | "ARTICLE_UPDATED"
  | "ARTICLE_PUBLISHED"
  | "ARTICLE_UNPUBLISHED"
  | "ARTICLE_DELETED"
  // Users
  | "USER_CREATED"
  | "USER_UPDATED"
  | "USER_ROLE_CHANGED"
  | "USER_DELETED"
  // Settings
  | "SETTINGS_VIEWED"
  | "SETTINGS_UPDATED"
  // Security
  | "PERMISSION_DENIED"
  | "RATE_LIMIT_HIT"
  | "SUSPICIOUS_ACTIVITY";

export type ResourceType =
  | "lead"
  | "article"
  | "user"
  | "settings"
  | "auth"
  | "system";

interface AuditLogInput {
  action: AuditAction;
  resourceType: ResourceType;
  resourceId?: string;
  actorUserId?: string;
  ipHash?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Registra ação no audit log.
 * Grava no banco de dados E no logger estruturado.
 * Fail-safe: não crashar se o log falhar.
 */
export async function auditLog(input: AuditLogInput): Promise<void> {
  try {
    // Tenta gravar no banco
    await prisma.auditLog.create({
      data: {
        action: input.action,
        resourceType: input.resourceType,
        resourceId: input.resourceId || null,
        actorUserId: input.actorUserId || null,
        ipHash: input.ipHash || null,
        userAgent: input.userAgent ? input.userAgent.slice(0, 200) : null,
        metadata: input.metadata ? JSON.parse(JSON.stringify(input.metadata)) : undefined,
      },
    });
  } catch (dbError) {
    // Se o banco falhar (ex: tabela não existe ainda), apenas loga
    logger.warn("Audit log DB write failed, falling back to console", {
      error: dbError instanceof Error ? dbError.message : "unknown",
    });
  }

  // Sempre loga no logger estruturado (backup)
  logger.info(`AUDIT: ${input.action}`, {
    action: input.action,
    resourceType: input.resourceType,
    resourceId: input.resourceId,
    actorUserId: input.actorUserId,
    ...(input.metadata || {}),
  });
}

/**
 * Registra acesso a API no log de acesso.
 * Fail-safe: não crashar se o log falhar.
 */
export async function accessLog(input: {
  userId?: string;
  method: string;
  path: string;
  statusCode: number;
  ipHash?: string;
  userAgent?: string;
  requestId?: string;
}): Promise<void> {
  try {
    await prisma.apiAccessLog.create({
      data: {
        userId: input.userId || null,
        method: input.method,
        path: input.path.slice(0, 500),
        statusCode: input.statusCode,
        ipHash: input.ipHash || null,
        userAgent: input.userAgent ? input.userAgent.slice(0, 200) : null,
        requestId: input.requestId || null,
      },
    });
  } catch {
    // Silently fail — access logs são não-críticos
  }

  // Log no console/Logtail
  logger.access({
    route: input.path,
    method: input.method,
    statusCode: input.statusCode,
    userId: input.userId,
    ipHash: input.ipHash,
    userAgent: input.userAgent,
    requestId: input.requestId,
  });
}
