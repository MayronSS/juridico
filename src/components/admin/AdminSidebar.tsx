"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  ChevronRight,
  FileText,
  FolderTree,
  LayoutDashboard,
  LogOut,
  Scale,
  Settings,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const adminNavItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["ADMIN", "EDITOR"],
    group: "Operação",
  },
  {
    label: "Leads",
    href: "/admin/leads",
    icon: Users,
    roles: ["ADMIN", "EDITOR"],
    group: "Operação",
  },
  {
    label: "Artigos",
    href: "/admin/artigos",
    icon: FileText,
    roles: ["ADMIN", "EDITOR"],
    group: "Conteúdo",
  },
  {
    label: "Categorias",
    href: "/admin/categorias",
    icon: FolderTree,
    roles: ["ADMIN"],
    group: "Conteúdo",
  },
  {
    label: "Configurações",
    href: "/admin/configuracoes",
    icon: Settings,
    roles: ["ADMIN"],
    group: "Gestão",
  },
  {
    label: "Usuários",
    href: "/admin/usuarios",
    icon: UserCog,
    roles: ["ADMIN"],
    group: "Gestão",
  },
];

export function getVisibleAdminItems(userRole = "USER") {
  return adminNavItems.filter((item) => item.roles.includes(userRole));
}

export function AdminSidebar({
  userRole = "USER",
  open,
  onClose,
}: {
  userRole?: string;
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const visibleItems = getVisibleAdminItems(userRole);
  const groups = Array.from(new Set(visibleItems.map((item) => item.group)));

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-5">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-navy shadow-sm">
              <Scale className="size-5" />
            </span>
            <span>
              <span className="block text-lg font-semibold leading-none text-sidebar-foreground">
                LegalOS
              </span>
              <span className="mt-1 block text-xs text-sidebar-foreground/50">
                SaaS administrativo
              </span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground lg:hidden"
            aria-label="Fechar menu administrativo"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      <Separator className="bg-sidebar-border" />

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {groups.map((group) => (
          <div key={group}>
            <p className="px-3 pb-2 text-[0.68rem] font-semibold uppercase text-sidebar-foreground/40">
              {group}
            </p>
            <div className="space-y-1">
              {visibleItems
                .filter((item) => item.group === group)
                .map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname?.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "relative overflow-hidden flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200",
                        isActive
                          ? "text-navy"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="admin-sidebar-active"
                          className="absolute inset-0 rounded-xl bg-white shadow-sm"
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                      <Icon className="relative z-10 size-4 shrink-0" />
                      <span className="relative z-10">{item.label}</span>
                      {isActive && (
                        <ChevronRight className="relative z-10 ml-auto size-4" />
                      )}
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>

      <Separator className="bg-sidebar-border" />

      <div className="space-y-1 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <Scale className="size-4" />
          <span>Ver site público</span>
        </Link>
        <button
          onClick={() => signOut({ redirectUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground/60 transition-colors hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut className="size-4" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
