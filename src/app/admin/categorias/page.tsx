import { redirect } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { posts: true } },
      },
    });
  } catch {
    return [];
  }
}

export default async function CategoriasPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/admin");
  }

  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <AdminPageHeader
        eyebrow="Taxonomia"
        title="Categorias"
        description="Organize o blog por temas, mantenha URLs claras e facilite a leitura editorial."
      />
      <CategoryManager categories={categories} />
    </div>
  );
}
