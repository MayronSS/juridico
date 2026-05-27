import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { categoryFormSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Permissao insuficiente." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = categoryFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados invalidos.", errors: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const conflict = await prisma.category.findFirst({
      where: {
        id: { not: id },
        OR: [{ name: data.name }, { slug: data.slug }],
      },
    });

    if (conflict) {
      return NextResponse.json(
        { error: "Ja existe outra categoria com este nome ou slug." },
        { status: 409 }
      );
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
      },
    });

    revalidatePath("/blog");
    revalidatePath("/admin/categorias");

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Permissao insuficiente." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const postCount = await prisma.post.count({ where: { categoryId: id } });

    if (postCount > 0) {
      return NextResponse.json(
        {
          error:
            "Esta categoria possui artigos vinculados. Remova ou altere os artigos antes de excluir.",
        },
        { status: 409 }
      );
    }

    await prisma.category.delete({ where: { id } });

    revalidatePath("/blog");
    revalidatePath("/admin/categorias");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
