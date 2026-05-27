// ============================================
// Article Editor — Formulário de Artigo
// ============================================
"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn, slugify } from "@/lib/utils";
import { articleFormSchema, type ArticleFormData } from "@/lib/validations";

interface Category {
  id: string;
  name: string;
}

interface ArticleEditorProps {
  article?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    status: string;
    categoryId: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    coverImage: string | null;
  };
  categories: Category[];
  canDelete?: boolean;
}

export function ArticleEditor({
  article,
  categories,
  canDelete = false,
}: ArticleEditorProps) {
  const router = useRouter();
  const isEditing = !!article;
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: article?.title || "",
      slug: article?.slug || "",
      excerpt: article?.excerpt || "",
      content: article?.content || "",
      status: (article?.status as "RASCUNHO" | "PUBLICADO") || "RASCUNHO",
      categoryId: article?.categoryId || "",
      metaTitle: article?.metaTitle || "",
      metaDescription: article?.metaDescription || "",
      coverImage: article?.coverImage || "",
    },
  });

  const metaTitle = useWatch({ control, name: "metaTitle" });
  const metaDescription = useWatch({ control, name: "metaDescription" });

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setValue("title", value);
    // Auto-generate slug se estiver criando
    if (!isEditing) {
      setValue("slug", slugify(value));
    }
  }

  async function onSubmit(data: ArticleFormData) {
    try {
      const url = isEditing
        ? `/api/artigos/${article!.id}`
        : "/api/artigos";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Erro ao salvar.");
        return;
      }

      toast.success(isEditing ? "Artigo atualizado!" : "Artigo criado!");
      router.push("/admin/artigos");
      router.refresh();
    } catch {
      toast.error("Erro de conexão.");
    }
  }

  async function handleDelete() {
    if (!article) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/artigos/${article.id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Erro ao excluir.");
        return;
      }

      toast.success("Artigo excluído.");
      router.push("/admin/artigos");
      router.refresh();
    } catch {
      toast.error("Erro de conexão.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border bg-white/90 shadow-premium backdrop-blur">
            <CardHeader className="border-b border-border bg-mist/50 p-5">
              <CardTitle className="text-2xl font-semibold">Conteúdo</CardTitle>
              <p className="text-sm text-muted-foreground">
                Estruture o artigo com título, resumo e corpo editorial.
              </p>
            </CardHeader>
            <CardContent className="space-y-5 p-5 sm:p-6">
              {/* Título */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Título <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Título do artigo"
                  {...register("title")}
                  onChange={handleTitleChange}
                  className={cn(errors.title && "border-destructive")}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="slug">
                  Slug (URL) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="slug"
                  placeholder="titulo-do-artigo"
                  {...register("slug")}
                  className={cn("font-mono text-sm", errors.slug && "border-destructive")}
                />
                {errors.slug && (
                  <p className="text-sm text-destructive">{errors.slug.message}</p>
                )}
              </div>

              {/* Resumo */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Breve resumo do artigo (exibido na listagem)"
                  rows={3}
                  {...register("excerpt")}
                />
              </div>

              {/* Conteúdo */}
              <div className="space-y-2">
                <Label htmlFor="content">
                  Conteúdo <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="content"
                  placeholder="Conteúdo do artigo. Use ## para títulos e - para listas."
                  rows={20}
                  {...register("content")}
                  className={cn("min-h-[420px] font-mono text-sm", errors.content && "border-destructive")}
                />
                {errors.content && (
                  <p className="text-sm text-destructive">{errors.content.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Use ## para títulos, ### para subtítulos e - para listas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {/* Publicação */}
          <Card className="border-border bg-white/90 shadow-premium backdrop-blur">
            <CardHeader className="border-b border-border bg-mist/50 p-5">
              <CardTitle className="text-2xl font-semibold">Publicação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  defaultValue={article?.status || "RASCUNHO"}
                  onValueChange={(value) =>
                    setValue("status", value as "RASCUNHO" | "PUBLICADO")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RASCUNHO">Rascunho</SelectItem>
                    <SelectItem value="PUBLICADO">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  defaultValue={article?.categoryId || ""}
                  onValueChange={(value) => setValue("categoryId", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isEditing ? "Salvar Alterações" : "Criar Artigo"}
              </Button>

              {isEditing && canDelete && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button" variant="destructive" className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir Artigo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-border bg-white/95 shadow-premium-lg backdrop-blur">
                    <DialogHeader>
                      <DialogTitle>Excluir artigo</DialogTitle>
                      <DialogDescription>
                        Esta ação remove o artigo do painel e do blog público. A exclusão não pode ser desfeita.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">
                          Cancelar
                        </Button>
                      </DialogClose>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Trash2 className="h-4 w-4 mr-2" />
                        )}
                        Excluir
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>

          {/* SEO */}
          <Card className="border-border bg-white/90 shadow-premium backdrop-blur">
            <CardHeader className="border-b border-border bg-mist/50 p-5">
              <CardTitle className="text-2xl font-semibold">SEO</CardTitle>
              <p className="text-sm text-muted-foreground">
                Ajuste o recorte de busca e compartilhamento social.
              </p>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  placeholder="Título para SEO (máx. 70 caracteres)"
                  {...register("metaTitle")}
                />
                <p className="text-xs text-muted-foreground">
                  {metaTitle?.length || 0}/70
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  placeholder="Descrição para SEO (máx. 160 caracteres)"
                  rows={3}
                  {...register("metaDescription")}
                />
                <p className="text-xs text-muted-foreground">
                  {metaDescription?.length || 0}/160
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverImage">URL da Imagem de Capa</Label>
                <Input
                  id="coverImage"
                  placeholder="https://..."
                  {...register("coverImage")}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
