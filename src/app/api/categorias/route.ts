import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { categoryFormSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Permissao insuficiente." },
        { status: 403 }
      );
    }

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
        OR: [{ name: data.name }, { slug: data.slug }],
      },
    });

    if (conflict) {
      return NextResponse.json(
        { error: "Ja existe uma categoria com este nome ou slug." },
        { status: 409 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
      },
    });

    revalidatePath("/blog");
    revalidatePath("/admin/categorias");

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
