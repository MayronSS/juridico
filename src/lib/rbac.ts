// ============================================
// RBAC — Role-Based Access Control
// ============================================
// Funções centralizadas de autorização.
// Todos os checks são server-side.
// NUNCA confie apenas em checks no frontend.

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import type { UserRole } from "@/generated/prisma";

// ============================================
// Tipos de permissão
// ============================================
export type Permission =
  // Leads
  | "leads:read"
  | "leads:update"
  | "leads:delete"
  | "leads:export"
  // Artigos
  | "articles:read"
  | "articles:create"
  | "articles:update"
  | "articles:delete"
  | "articles:publish"
  // Users
  | "users:read"
  | "users:create"
  | "users:update"
  | "users:delete"
  | "users:change-role"
  // Settings
  | "settings:read"
  | "settings:update"
  // Dashboard
  | "dashboard:read";

// ============================================
// Matriz de permissões por role
// ============================================
const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  ADMIN: [
    "leads:read", "leads:update", "leads:delete", "leads:export",
    "articles:read", "articles:create", "articles:update", "articles:delete", "articles:publish",
    "users:read", "users:create", "users:update", "users:delete", "users:change-role",
    "settings:read", "settings:update",
    "dashboard:read",
  ],
  EDITOR: [
    "leads:read", "leads:update",
    "articles:read", "articles:create", "articles:update", "articles:publish",
    "dashboard:read",
  ],
  USER: [
    // Visitante logado — sem acesso admin
  ],
};

// ============================================
// Helpers de autorização
// ============================================

interface AuthResult {
  id: string;
  name: string;
  email: string;
  role: string;
}

/**
 * Verifica se o usuário está autenticado.
 * Retorna os dados do usuário ou null.
 */
export async function getAuthUser(): Promise<AuthResult | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  return {
    id: session.user.id,
    name: session.user.name || "Usuário",
    email: session.user.email || "",
    role: (session.user as { role?: string }).role || "USER",
  };
}

/**
 * Exige autenticação. Lança erro se não autenticado.
 */
export async function requireAuth(): Promise<AuthResult> {
  const user = await getAuthUser();
  if (!user) {
    logger.warn("Acesso não autenticado tentado");
    throw new AuthError("Não autenticado.", 401);
  }
  return user;
}

/**
 * Exige role específica. Lança erro se role insuficiente.
 */
export async function requireRole(...roles: UserRole[]): Promise<AuthResult> {
  const user = await requireAuth();
  if (!roles.includes(user.role as UserRole)) {
    logger.warn("Permissão insuficiente", {
      userId: user.id,
      userRole: user.role,
      requiredRoles: roles,
    });
    throw new AuthError("Permissão insuficiente.", 403);
  }
  return user;
}

/**
 * Shortcut: exige role ADMIN.
 */
export async function requireAdmin(): Promise<AuthResult> {
  return requireRole("ADMIN" as UserRole);
}

/**
 * Verifica se usuário tem permissão específica.
 */
export function hasPermission(role: string, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

/**
 * Exige permissão específica. Lança erro se não possui.
 */
export async function requirePermission(permission: Permission): Promise<AuthResult> {
  const user = await requireAuth();
  if (!hasPermission(user.role, permission)) {
    logger.warn("Permissão negada", {
      userId: user.id,
      userRole: user.role,
      permission,
    });
    throw new AuthError("Permissão insuficiente.", 403);
  }
  return user;
}

/**
 * Verifica se o usuário pode acessar um recurso por ownership.
 * Útil para prevenir IDOR.
 */
export async function canAccessResource(
  userId: string,
  resourceOwnerId: string,
  adminOverride: boolean = true
): Promise<boolean> {
  if (userId === resourceOwnerId) return true;

  if (adminOverride) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (user?.role === "ADMIN") return true;
  }

  return false;
}

// ============================================
// Classe de erro de autenticação/autorização
// ============================================
export class AuthError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 401) {
    super(message);
    this.name = "AuthError";
    this.statusCode = statusCode;
  }
}

/**
 * Helper para capturar AuthError em API routes e retornar JSON.
 */
export function handleAuthError(error: unknown): Response {
  if (error instanceof AuthError) {
    return Response.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }
  logger.error("Erro inesperado na autorização", error);
  return Response.json(
    { error: "Erro interno." },
    { status: 500 }
  );
}
