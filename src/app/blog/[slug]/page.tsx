import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/common/Container";
import { PostCard } from "@/components/cards/PostCard";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import { createPageMetadata, getArticleSchema } from "@/lib/seo";
import { prisma } from "@/lib/prisma";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  try {
    return await prisma.post.findFirst({
      where: { slug, status: "PUBLICADO" },
      include: {
        category: { select: { name: true, slug: true } },
        author: { select: { name: true } },
      },
    });
  } catch {
    return null;
  }
}

async function getRelatedPosts(categorySlug: string | null, currentSlug: string) {
  try {
    return await prisma.post.findMany({
      where: {
        status: "PUBLICADO",
        slug: { not: currentSlug },
        ...(categorySlug && { category: { slug: categorySlug } }),
      },
      select: {
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        coverImage: true,
        publishedAt: true,
        createdAt: true,
        category: { select: { name: true, slug: true } },
        author: { select: { name: true } },
      },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return createPageMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || post.title,
    path: `/blog/${post.slug}`,
    image: post.coverImage || undefined,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const readingTime = calculateReadingTime(post.content);
  const date = post.publishedAt || post.createdAt;
  const relatedPosts = await getRelatedPosts(post.category?.slug || null, post.slug);

  const articleSchema = getArticleSchema({
    title: post.title,
    description: post.excerpt || post.title,
    slug: post.slug,
    authorName: post.author.name,
    publishedAt: date.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    image: post.coverImage || undefined,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="border-b border-border bg-page surface-grid py-14 sm:py-20">
        <Container size="narrow">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-3 py-1.5 text-sm font-semibold text-navy shadow-sm backdrop-blur transition-colors hover:bg-white"
          >
            <ArrowLeft className="size-4" />
            Voltar ao blog
          </Link>

          {post.category && (
            <Link href={`/blog?categoria=${post.category.slug}`}>
              <Badge variant="secondary" className="mb-6">
                {post.category.name}
              </Badge>
            </Link>
          )}

          <h1 className="text-4xl font-semibold leading-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <User className="size-4" />
              {post.author.name}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4" />
              {formatDate(date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4" />
              {readingTime} min de leitura
            </span>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <Container size="narrow">
          <article className="mx-auto max-w-3xl">
            {post.excerpt && (
              <div className="mb-10 rounded-2xl border border-border bg-surface-soft p-6 shadow-premium">
                <p className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                  {post.excerpt}
                </p>
              </div>
            )}

            <div className="space-y-6 text-lg leading-relaxed text-graphite">
              {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="pt-6 text-3xl font-semibold leading-tight text-foreground"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3
                      key={index}
                      className="pt-4 text-2xl font-semibold leading-tight text-foreground"
                    >
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  const items = paragraph
                    .split("\n")
                    .filter((line) => line.startsWith("- "));
                  return (
                    <ul key={index} className="space-y-3 pl-0">
                      {items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-3 size-1.5 shrink-0 rounded-full bg-navy" />
                          <span>{item.replace("- ", "")}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return <p key={index}>{paragraph}</p>;
              })}
            </div>

            <div className="mt-12 rounded-2xl border border-border bg-surface-soft p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Nota jurídica:</strong> Este
                artigo possui finalidade exclusivamente informativa e não constitui
                aconselhamento jurídico para situações específicas. Cada caso deve
                ser analisado individualmente por profissional habilitado.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
              <div className="flex items-center gap-2">
                <Tag className="size-4 text-muted-foreground" />
                {post.category && (
                  <Link href={`/blog?categoria=${post.category.slug}`}>
                    <Badge variant="outline">{post.category.name}</Badge>
                  </Link>
                )}
              </div>
              <Link
                href="/contato"
                className="text-sm font-semibold text-navy transition-colors hover:underline"
              >
                Dúvidas? Fale com o escritório
              </Link>
            </div>
          </article>
        </Container>
      </section>

      {relatedPosts.length > 0 && (
        <section className="bg-page py-16">
          <Container size="wide">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-semibold leading-tight text-foreground">
                Artigos relacionados
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <PostCard key={related.slug} post={related} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-white py-12 text-center">
        <Container size="narrow">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-premium">
            <h3 className="text-2xl font-semibold leading-tight text-foreground">
              Precisa de orientação jurídica?
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Se o tema deste artigo se relaciona com sua situação, entre em
              contato para uma análise individualizada.
            </p>
            <Link
              href="/contato"
              className="mt-7 inline-flex h-11 items-center rounded-xl bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-navy-secondary"
            >
              Fale com o Escritório
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
