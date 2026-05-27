import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

async function getArticle(id: string) {
  try {
    return await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        status: true,
        categoryId: true,
        metaTitle: true,
        metaDescription: true,
        coverImage: true,
      },
    });
  } catch {
    return null;
  }
}

async function getCategories() {
  try {
    return await prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const [article, categories, session] = await Promise.all([
    getArticle(id),
    getCategories(),
    auth(),
  ]);

  if (!article) notFound();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Edição"
        title="Editar artigo"
        description={article.title}
      />
      <ArticleEditor
        article={article}
        categories={categories}
        canDelete={session?.user?.role === "ADMIN"}
      />
    </div>
  );
}
