// ============================================
// Auth — Clerk Authentication Wrapper
// ============================================
// Wrapper centralizado de autenticação usando Clerk.
// Todas as API routes e server components usam
// estas funções para verificar sessão e obter dados.

import { auth as clerkAuth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import type { UserRole } from "@/generated/prisma";

/**
 * Retorna sessão do Clerk com dados do usuário do banco.
 * Compatível com o formato anterior (NextAuth).
 */
export async function auth() {
  const { userId } = await clerkAuth();

  if (!userId) {
    return null;
  }

  // Busca dados completos do usuário no nosso banco
  const dbUser = await prisma.user.findFirst({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!dbUser) {
    // Usuário existe no Clerk mas não no banco — sincronizar
    const clerkUser = await currentUser();
    if (!clerkUser) return null;

    const email = clerkUser.emailAddresses[0]?.emailAddress || "";

    // Verifica se já existe um usuário com o mesmo e-mail (ex: pré-cadastrado no seed)
    const existingUserByEmail = email
      ? await prisma.user.findUnique({
          where: { email },
        })
      : null;

    let finalUser;

    if (existingUserByEmail) {
      // Atualiza o usuário existente definindo o clerkId dele
      finalUser = await prisma.user.update({
        where: { id: existingUserByEmail.id },
        data: {
          clerkId: userId,
          name: existingUserByEmail.name || `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "Usuário",
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
    } else {
      // Verifica se já existe algum usuário no banco
      const userCount = await prisma.user.count();
      const role: UserRole = userCount === 0 ? ("ADMIN" as UserRole) : ("USER" as UserRole);

      finalUser = await prisma.user.create({
        data: {
          clerkId: userId,
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "Usuário",
          email,
          passwordHash: "clerk-managed", // Clerk gerencia senhas
          role, // Atribui ADMIN se for o primeiro, senão USER
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
    }

    return {
      user: {
        id: finalUser.id,
        name: finalUser.name,
        email: finalUser.email,
        role: finalUser.role,
      },
    };
  }

  return {
    user: {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
    },
  };
}
