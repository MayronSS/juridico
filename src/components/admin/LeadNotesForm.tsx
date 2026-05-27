"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function LeadNotesForm({
  leadId,
  initialNotes,
}: {
  leadId: string;
  initialNotes: string;
}) {
  const router = useRouter();
  const [internalNotes, setInternalNotes] = useState(initialNotes);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/leads/${leadId}/notes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internalNotes }),
      });
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Não foi possível salvar a anotação.");
        return;
      }

      toast.success("Anotações internas atualizadas.");
      router.refresh();
    } catch {
      toast.error("Erro de conexão ao salvar anotações.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-3">
      <Textarea
        value={internalNotes}
        onChange={(event) => setInternalNotes(event.target.value)}
        rows={6}
        placeholder="Registre contexto interno, próximos passos ou observações da equipe."
      />
      <Button
        type="button"
        onClick={handleSave}
        disabled={isSaving}
        className="w-full"
      >
        {isSaving ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        Salvar anotações
      </Button>
    </div>
  );
}
