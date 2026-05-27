// ============================================
// Admin Layout — Server-side RBAC Guard
// ============================================

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminClientLayout from "./layout-client";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // RBAC Guard: Se o usuário estiver autenticado mas a role for 'USER' (visitante),
  // ele não tem permissão para acessar nenhuma parte do painel administrativo.
  if (session?.user && session.user.role === "USER") {
    redirect("/");
  }

  return (
    <AdminClientLayout userRole={session?.user?.role}>
      {children}
    </AdminClientLayout>
  );
}
