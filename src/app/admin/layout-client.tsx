"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  AdminSidebar,
  getVisibleAdminItems,
} from "@/components/admin/AdminSidebar";

export default function AdminClientLayout({
  children,
  userRole = "USER",
}: {
  children: React.ReactNode;
  userRole?: string;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const visibleNavItems = getVisibleAdminItems(userRole);
  const activeLabel =
    visibleNavItems.find((item) =>
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname?.startsWith(item.href)
    )?.label || "Admin";

  return (
    <div className="flex min-h-screen bg-page">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-navy/55 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Fechar menu administrativo"
        />
      )}

      <AdminSidebar
        userRole={userRole}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader
          title={activeLabel}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
