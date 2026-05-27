import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { prisma } from "@/lib/prisma";

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

export default async function NovoArtigoPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Novo conteúdo"
        title="Novo artigo"
        description="Crie um artigo editorial com título, categoria, conteúdo e metadados de SEO."
      />
      <ArticleEditor categories={categories} />
    </div>
  );
}
