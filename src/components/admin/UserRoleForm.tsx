"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roles = [
  { value: "ADMIN", label: "Admin" },
  { value: "EDITOR", label: "Editor" },
  { value: "USER", label: "Usuário" },
] as const;

export function UserRoleForm({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: string;
}) {
  const router = useRouter();
  const [role, setRole] = useState(currentRole);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    if (role === currentRole) {
      toast.info("Selecione uma permissão diferente para salvar.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`/api/usuarios/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Não foi possível atualizar.");
        return;
      }

      toast.success("Permissão atualizada.");
      router.refresh();
    } catch {
      toast.error("Erro de conexão ao atualizar usuário.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex min-w-[230px] gap-2">
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {roles.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        type="button"
        onClick={handleSave}
        disabled={isSaving}
        size="sm"
      >
        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar"}
      </Button>
    </div>
  );
}
