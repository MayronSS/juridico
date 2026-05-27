// ============================================
// API — Artigos (CRUD)
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { articleFormSchema } from "@/lib/validations";

// POST — Criar artigo
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const userRole = session.user.role;
    if (userRole !== "ADMIN" && userRole !== "EDITOR") {
      return NextResponse.json({ error: "Permissão insuficiente." }, { status: 403 });
    }

    const body = await request.json();
    const parsed = articleFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos.", errors: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Verifica slug duplicado
    const existing = await prisma.post.findFirst({
      where: { slug: data.slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Já existe um artigo com este slug." },
        { status: 409 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content,
        status: data.status,
        categoryId: data.categoryId || null,
        authorId: session.user.id,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        coverImage: data.coverImage || null,
        publishedAt: data.status === "PUBLICADO" ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, post: { id: post.id, slug: post.slug } }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar artigo:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
