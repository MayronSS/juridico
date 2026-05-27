"use client";

import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Menu, Search } from "lucide-react";

export function AdminHeader({
  title,
  onMenuClick,
}: {
  title: string;
  onMenuClick: () => void;
}) {
  return (
    <motion.header
      className="sticky top-0 z-30 border-b border-border bg-white/78 px-4 py-3 backdrop-blur-xl lg:px-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-foreground transition-colors hover:bg-mist lg:hidden"
          aria-label="Abrir menu administrativo"
        >
          <Menu className="size-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-muted-foreground">
            Admin workspace
          </p>
          <h2 className="text-xl font-semibold leading-tight text-foreground sm:text-2xl">
            {title}
          </h2>
        </div>
        <div className="hidden h-10 min-w-64 items-center gap-2 rounded-xl border border-border bg-white px-3 text-sm text-muted-foreground shadow-sm xl:flex">
          <Search className="size-4" />
          Busca operacional
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-white px-3 py-2 shadow-sm">
          <span className="hidden text-right sm:block">
            <span className="block text-xs font-semibold text-foreground">
              Sessão ativa
            </span>
            <span className="block text-[0.68rem] text-muted-foreground">
              Painel do escritório
            </span>
          </span>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
        </div>
      </div>
    </motion.header>
  );
}
