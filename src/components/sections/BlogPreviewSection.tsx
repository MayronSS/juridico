import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/cards/PostCard";
import { Container } from "@/components/common/Container";
import { EmptyState } from "@/components/common/EmptyState";
import { Stagger, StaggerItem } from "@/components/common/Motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { splitLines, type WebsiteSettings } from "@/lib/site-settings-schema";

async function getPreviewPosts(featuredSlugs: string[]) {
  try {
    if (featuredSlugs.length > 0) {
      const featured = await prisma.post.findMany({
        where: {
          status: "PUBLICADO",
          slug: { in: featuredSlugs },
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
      });

      const ordered = featuredSlugs
        .map((slug) => featured.find((post) => post.slug === slug))
        .filter(Boolean);

      if (ordered.length >= 3) return ordered.slice(0, 3);
    }

    return await prisma.post.findMany({
      where: { status: "PUBLICADO" },
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

export async function BlogPreviewSection({
  settings,
}: {
  settings: WebsiteSettings;
}) {
  const featuredSlugs = splitLines(settings.featured_article_slugs);
  const posts = await getPreviewPosts(featuredSlugs);

  return (
    <section
      id="blog-home"
      className="relative overflow-hidden bg-warm-white py-24 sm:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <Container size="wide">
        <SectionHeader
          eyebrow="Publicações"
          title={settings.blog_title}
          description={settings.blog_description}
          align="left"
          action={
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-gold-dark transition-colors hover:text-navy"
            >
              Ver todos os artigos
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />

        {posts.length > 0 ? (
          <Stagger className="mt-14 grid gap-5 lg:grid-cols-3">
            {posts.map((post, index) => (
              <StaggerItem
                key={post!.slug}
                className={index === 0 ? "lg:col-span-2" : undefined}
              >
                <PostCard
                  post={post!}
                  variant={index === 0 ? "featured" : "default"}
                />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <EmptyState
            className="mt-14"
            icon={FileText}
            title="Nenhum artigo publicado ainda"
            description="Quando houver artigos publicados, eles aparecerão aqui automaticamente."
          />
        )}

        <p className="mx-auto mt-12 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          Os artigos possuem finalidade exclusivamente informativa e não substituem
          consulta jurídica individualizada.
        </p>
      </Container>
    </section>
  );
}
