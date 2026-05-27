import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight, FileText, Search } from "lucide-react";
import { Container } from "@/components/common/Container";
import { EmptyState } from "@/components/common/EmptyState";
import { FadeIn, Stagger, StaggerItem } from "@/components/common/Motion";
import { PageHeader } from "@/components/common/PageHeader";
import { PostCard } from "@/components/cards/PostCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getWebsiteSettings } from "@/lib/site-settings";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog Jurídico",
  description:
    "Artigos informativos sobre Direito, legislação e temas jurídicos relevantes. Conteúdo produzido pela equipe jurídica do escritório.",
};

const POSTS_PER_PAGE = 9;

interface BlogPageProps {
  searchParams: Promise<{ pagina?: string; categoria?: string; q?: string }>;
}

async function getPosts(page: number, categorySlug?: string, query?: string) {
  try {
    const where = {
      status: "PUBLICADO" as const,
      ...(categorySlug && {
        category: { slug: categorySlug },
      }),
      ...(query && {
        OR: [
          { title: { contains: query, mode: "insensitive" as const } },
          { excerpt: { contains: query, mode: "insensitive" as const } },
          { content: { contains: query, mode: "insensitive" as const } },
        ],
      }),
    };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        select: {
          title: true,
          slug: true,
          excerpt: true,
          content: true,
          coverImage: true,
          publishedAt: true,
          createdAt: true,
          category: {
            select: { name: true, slug: true },
          },
          author: {
            select: { name: true },
          },
        },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * POSTS_PER_PAGE,
        take: POSTS_PER_PAGE,
      }),
      prisma.post.count({ where }),
    ]);

    return { posts, total, totalPages: Math.ceil(total / POSTS_PER_PAGE) };
  } catch {
    return { posts: [], total: 0, totalPages: 0 };
  }
}

async function getCategories() {
  try {
    return await prisma.category.findMany({
      select: {
        name: true,
        slug: true,
        _count: { select: { posts: { where: { status: "PUBLICADO" } } } },
      },
      orderBy: { name: "asc" },
    });
  } catch {
    return [];
  }
}

function blogHref(page: number, categorySlug?: string, query?: string) {
  const params = new URLSearchParams();
  if (page > 1) params.set("pagina", String(page));
  if (categorySlug) params.set("categoria", categorySlug);
  if (query) params.set("q", query);
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.pagina) || 1);
  const categorySlug = params.categoria;
  const query = params.q?.trim() || "";

  const [{ posts, total, totalPages }, categories, settings] = await Promise.all([
    getPosts(page, categorySlug, query),
    getCategories(),
    getWebsiteSettings(),
  ]);

  const activeCategory = categorySlug
    ? categories.find((category) => category.slug === categorySlug)
    : null;

  return (
    <>
      <PageHeader
        eyebrow="Revista jurídica"
        title={settings.blog_title}
        description={settings.blog_description}
      />

      <section className="bg-page py-16 sm:py-20">
        <Container size="wide">
          <FadeIn className="mb-8 rounded-3xl border border-border bg-white/85 p-5 shadow-premium backdrop-blur">
            <form className="grid gap-3 lg:grid-cols-[1fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="q"
                  defaultValue={query}
                  placeholder="Buscar por tema, direito ou palavra-chave"
                  className="pl-10"
                />
              </div>
              {categorySlug && (
                <input type="hidden" name="categoria" value={categorySlug} />
              )}
              <Button type="submit">Buscar artigos</Button>
            </form>

            {categories.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={query ? `/blog?q=${encodeURIComponent(query)}` : "/blog"}>
                  <Badge
                    variant={!categorySlug ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1.5"
                  >
                    Todos
                  </Badge>
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={blogHref(1, category.slug, query)}
                  >
                    <Badge
                      variant={categorySlug === category.slug ? "default" : "outline"}
                      className="cursor-pointer px-3 py-1.5"
                    >
                      {category.name} ({category._count.posts})
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </FadeIn>

          {(activeCategory || query) && (
            <FadeIn className="mb-8 rounded-2xl border border-border bg-white/85 p-4 text-sm text-muted-foreground shadow-sm backdrop-blur">
              Mostrando {total} resultado{total === 1 ? "" : "s"}
              {activeCategory ? ` em ${activeCategory.name}` : ""}
              {query ? ` para "${query}"` : ""}.
            </FadeIn>
          )}

          {posts.length > 0 ? (
            <>
              <Stagger className="grid gap-6 lg:grid-cols-3">
                {posts.map((post, index) => (
                  <StaggerItem
                    key={post.slug}
                    className={index === 0 && page === 1 ? "lg:col-span-2" : undefined}
                  >
                    <PostCard
                      post={post}
                      variant={index === 0 && page === 1 ? "featured" : "default"}
                    />
                  </StaggerItem>
                ))}
              </Stagger>

              {totalPages > 1 && (
                <nav
                  className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-white/85 p-4 shadow-premium backdrop-blur sm:flex-row"
                  aria-label="Paginação do blog"
                >
                  <p className="text-sm text-muted-foreground">
                    Página {page} de {totalPages}
                  </p>
                  <div className="flex gap-2">
                    {page > 1 && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={blogHref(page - 1, categorySlug, query)}>
                          <ChevronLeft className="size-4" />
                          Anterior
                        </Link>
                      </Button>
                    )}
                    {page < totalPages && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={blogHref(page + 1, categorySlug, query)}>
                          Próxima
                          <ChevronRight className="size-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </nav>
              )}
            </>
          ) : (
            <EmptyState
              icon={FileText}
              title="Nenhum artigo encontrado"
              description="Ajuste a busca ou os filtros. Novos conteúdos aparecerão aqui quando forem publicados."
              action={
                <Button asChild variant="outline">
                  <Link href="/blog">Limpar filtros</Link>
                </Button>
              }
            />
          )}

          <p className="mx-auto mt-12 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
            Os artigos publicados neste blog possuem finalidade exclusivamente
            informativa e não substituem consulta jurídica individualizada.
          </p>
        </Container>
      </section>
    </>
  );
}
