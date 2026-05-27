// ============================================
// Lead Status Form — Alterar status do lead
// ============================================
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LEAD_STATUSES } from "@/lib/validations";

interface LeadStatusFormProps {
  leadId: string;
  currentStatus: string;
}

export function LeadStatusForm({ leadId, currentStatus }: LeadStatusFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    if (status === currentStatus && !note) {
      toast.info("Selecione um novo status ou adicione uma observação.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, note }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error || "Erro ao atualizar.");
        return;
      }

      toast.success("Status atualizado com sucesso!");
      setNote("");
      router.refresh();
    } catch {
      toast.error("Erro de conexão.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {LEAD_STATUSES.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        placeholder="Observação (opcional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        className="text-sm"
      />

      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : null}
        Atualizar Status
      </Button>
    </div>
  );
}
