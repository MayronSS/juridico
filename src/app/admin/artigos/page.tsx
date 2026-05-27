import Link from "next/link";
import { Edit, Eye, FileText, Plus, Search } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { PremiumCard } from "@/components/common/PremiumCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateShort } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

interface ArtigosPageProps {
  searchParams: Promise<{ q?: string; status?: string }>;
}

async function getPosts(q?: string, status?: string) {
  try {
    return await prisma.post.findMany({
      where: {
        ...(status === "PUBLICADO" || status === "RASCUNHO" ? { status } : {}),
        ...(q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" as const } },
                { slug: { contains: q, mode: "insensitive" as const } },
                { excerpt: { contains: q, mode: "insensitive" as const } },
              ],
            }
          : {}),
      },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        publishedAt: true,
        createdAt: true,
        category: { select: { name: true } },
        author: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function ArtigosPage({ searchParams }: ArtigosPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() || "";
  const status = params.status || "";
  const posts = await getPosts(query, status);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Conteúdo"
        title="Artigos"
        description={`${posts.length} artigo${posts.length === 1 ? "" : "s"} encontrado${posts.length === 1 ? "" : "s"}. Gerencie publicações, rascunhos e SEO editorial.`}
        action={
          <Button asChild>
            <Link href="/admin/artigos/novo">
              <Plus className="size-4" />
              Novo Artigo
            </Link>
          </Button>
        }
      />

      <PremiumCard tone="ivory">
        <form className="grid gap-3 lg:grid-cols-[1fr_220px_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Buscar por título, slug ou resumo"
              className="pl-10"
            />
          </div>
          <select
            name="status"
            defaultValue={status}
            className="h-11 rounded-xl border border-input bg-white/85 px-3 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/35"
          >
            <option value="">Todos os status</option>
            <option value="PUBLICADO">Publicado</option>
            <option value="RASCUNHO">Rascunho</option>
          </select>
          <Button type="submit">Buscar</Button>
        </form>
      </PremiumCard>

      <PremiumCard className="p-0">
        <div className="p-5">
          {posts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden sm:table-cell">Categoria</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Data</TableHead>
                  <TableHead className="w-[108px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <p className="max-w-[420px] truncate font-medium text-foreground">
                        {post.title}
                      </p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        /blog/{post.slug}
                      </p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {post.category?.name || "Sem categoria"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={post.status} type="post" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                      {formatDateShort(post.publishedAt || post.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button asChild variant="ghost" size="icon-sm" title="Editar">
                          <Link href={`/admin/artigos/${post.id}`}>
                            <Edit className="size-4" />
                          </Link>
                        </Button>
                        {post.status === "PUBLICADO" && (
                          <Button asChild variant="ghost" size="icon-sm" title="Ver no site">
                            <Link href={`/blog/${post.slug}`} target="_blank">
                              <Eye className="size-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              icon={FileText}
              title="Nenhum artigo criado"
              description="Crie o primeiro conteúdo do blog para iniciar a presença editorial do escritório."
              action={
                <Button asChild>
                  <Link href="/admin/artigos/novo">
                    <Plus className="size-4" />
                    Criar artigo
                  </Link>
                </Button>
              }
            />
          )}
        </div>
      </PremiumCard>
    </div>
  );
}
