"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Edit, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { EmptyState } from "@/components/common/EmptyState";
import { slugify } from "@/lib/utils";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count: {
    posts: number;
  };
}

export function CategoryManager({
  categories,
}: {
  categories: CategoryItem[];
}) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [drafts, setDrafts] = useState(
    Object.fromEntries(
      categories.map((category) => [
        category.id,
        {
          name: category.name,
          slug: category.slug,
          description: category.description || "",
        },
      ])
    )
  );

  async function submitCategory(
    method: "POST" | "PUT",
    url: string,
    payload: { name: string; slug: string; description: string }
  ) {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Não foi possível salvar a categoria.");
    }

    return result;
  }

  async function handleCreate() {
    setSavingId("new");
    try {
      await submitCategory("POST", "/api/categorias", newCategory);
      toast.success("Categoria criada.");
      setNewCategory({ name: "", slug: "", description: "" });
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao criar.");
    } finally {
      setSavingId(null);
    }
  }

  async function handleUpdate(id: string) {
    setSavingId(id);
    try {
      await submitCategory("PUT", `/api/categorias/${id}`, drafts[id]);
      toast.success("Categoria atualizada.");
      setEditingId(null);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao atualizar.");
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(id: string) {
    setSavingId(id);
    try {
      const response = await fetch(`/api/categorias/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Não foi possível excluir.");
      }

      toast.success("Categoria excluida.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao excluir.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-white/90 p-5 shadow-premium backdrop-blur">
        <h2 className="text-2xl font-semibold leading-tight text-foreground">
          Nova categoria
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Crie uma taxonomia editorial para organizar artigos e filtros públicos.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_1.5fr_auto]">
          <Input
            placeholder="Nome"
            value={newCategory.name}
            onChange={(event) => {
              const name = event.target.value;
              setNewCategory((current) => ({
                ...current,
                name,
                slug: slugify(name),
              }));
            }}
          />
          <Input
            placeholder="slug-da-categoria"
            value={newCategory.slug}
            onChange={(event) =>
              setNewCategory((current) => ({
                ...current,
                slug: slugify(event.target.value),
              }))
            }
          />
          <Input
            placeholder="Descricao curta"
            value={newCategory.description}
            onChange={(event) =>
              setNewCategory((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
          />
          <Button
            type="button"
            onClick={handleCreate}
            disabled={savingId === "new"}
            className="lg:self-start"
          >
            {savingId === "new" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Criar
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-white/90 shadow-premium backdrop-blur">
        {categories.length > 0 ? (
          <div className="divide-y divide-border">
            {categories.map((category) => {
              const isEditing = editingId === category.id;
              const draft = drafts[category.id];

              return (
                <div key={category.id} className="p-5 transition-colors hover:bg-mist/55">
                  {isEditing ? (
                    <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1.5fr_auto]">
                      <Input
                        value={draft.name}
                        onChange={(event) =>
                          setDrafts((current) => ({
                            ...current,
                            [category.id]: {
                              ...current[category.id],
                              name: event.target.value,
                            },
                          }))
                        }
                      />
                      <Input
                        value={draft.slug}
                        onChange={(event) =>
                          setDrafts((current) => ({
                            ...current,
                            [category.id]: {
                              ...current[category.id],
                              slug: slugify(event.target.value),
                            },
                          }))
                        }
                      />
                      <Textarea
                        value={draft.description}
                        rows={2}
                        onChange={(event) =>
                          setDrafts((current) => ({
                            ...current,
                            [category.id]: {
                              ...current[category.id],
                              description: event.target.value,
                            },
                          }))
                        }
                      />
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          onClick={() => handleUpdate(category.id)}
                          disabled={savingId === category.id}
                            className="shrink-0"
                        >
                          {savingId === category.id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="mr-2 h-4 w-4" />
                          )}
                          Salvar
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium text-foreground">
                            {category.name}
                          </h3>
                          <Badge variant="secondary">
                            {category._count.posts} artigo
                            {category._count.posts === 1 ? "" : "s"}
                          </Badge>
                        </div>
                        <p className="mt-1 font-mono text-xs text-muted-foreground">
                          /blog?categoria={category.slug}
                        </p>
                        {category.description && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {category.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setEditingId(category.id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <ConfirmDialog
                          title="Excluir categoria"
                          description="Esta ação remove a categoria. Categorias com artigos vinculados não serão excluídas."
                          destructive
                          disabled={savingId === category.id}
                          confirmLabel={savingId === category.id ? "Excluindo" : "Excluir"}
                          onConfirm={() => handleDelete(category.id)}
                          trigger={
                            <Button type="button" variant="destructive">
                              {savingId === category.id ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="mr-2 h-4 w-4" />
                              )}
                              Excluir
                            </Button>
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6">
            <EmptyState
              title="Nenhuma categoria criada"
              description="Crie categorias para organizar os artigos do blog."
            />
          </div>
        )}
      </div>
    </div>
  );
}
