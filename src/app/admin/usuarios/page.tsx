import { redirect } from "next/navigation";
import { UserRound } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { PremiumCard } from "@/components/common/PremiumCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { UserRoleForm } from "@/components/admin/UserRoleForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { formatDateShort } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

async function getUsers() {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: { select: { posts: true, leadHistory: true } },
      },
      orderBy: [{ role: "asc" }, { name: "asc" }],
    });
  } catch {
    return [];
  }
}

export default async function UsuariosPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/admin");
  }

  const users = await getUsers();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <AdminPageHeader
        eyebrow="Acessos"
        title="Usuários e permissões"
        description="Ajuste perfis de acesso para administradores, editores e usuários comuns."
      />

      <PremiumCard className="p-0">
        <div className="border-b border-border p-6">
          <h2 className="text-2xl font-semibold leading-tight text-foreground">
            {users.length} usuário{users.length === 1 ? "" : "s"}
          </h2>
        </div>
        <div className="p-5">
          {users.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Perfil atual</TableHead>
                  <TableHead className="hidden md:table-cell">Atividade</TableHead>
                  <TableHead className="hidden lg:table-cell">Criado em</TableHead>
                  <TableHead className="w-[280px]">Permissão</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={user.role} type="role" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {user._count.posts} artigo
                      {user._count.posts === 1 ? "" : "s"} /{" "}
                      {user._count.leadHistory} ação
                      {user._count.leadHistory === 1 ? "" : "ões"} em leads
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                      {formatDateShort(user.createdAt)}
                    </TableCell>
                    <TableCell>
                      <UserRoleForm userId={user.id} currentRole={user.role} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              icon={UserRound}
              title="Nenhum usuário encontrado"
              description="Usuários autenticados pelo Clerk aparecerão aqui após sincronização."
            />
          )}
        </div>
      </PremiumCard>
    </div>
  );
}
