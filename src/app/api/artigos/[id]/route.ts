// ============================================
// API — Artigo Individual (PUT)
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { articleFormSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const userRole = session.user.role;
    if (userRole !== "ADMIN" && userRole !== "EDITOR") {
      return NextResponse.json({ error: "Permissão insuficiente." }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = articleFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos.", errors: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Artigo não encontrado." }, { status: 404 });
    }

    // Verifica slug duplicado (excluindo o próprio)
    const slugConflict = await prisma.post.findFirst({
      where: { slug: data.slug, id: { not: id } },
    });
    if (slugConflict) {
      return NextResponse.json(
        { error: "Já existe outro artigo com este slug." },
        { status: 409 }
      );
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content,
        status: data.status,
        categoryId: data.categoryId || null,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        coverImage: data.coverImage || null,
        publishedAt:
          data.status === "PUBLICADO" && !existing.publishedAt
            ? new Date()
            : existing.publishedAt,
      },
    });

    return NextResponse.json({ success: true, post: { id: post.id, slug: post.slug } });
  } catch (error) {
    console.error("Erro ao atualizar artigo:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Permissão insuficiente." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const existing = await prisma.post.findUnique({
      where: { id },
      select: { slug: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Artigo não encontrado." }, { status: 404 });
    }

    await prisma.post.delete({ where: { id } });

    revalidatePath("/blog");
    revalidatePath(`/blog/${existing.slug}`);
    revalidatePath("/admin/artigos");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir artigo:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
