import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { userRoleUpdateSchema } from "@/lib/validations";

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
    const parsed = userRoleUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados invalidos.", errors: parsed.error.issues },
        { status: 400 }
      );
    }

    const target = await prisma.user.findUnique({
      where: { id },
      select: { id: true, role: true },
    });

    if (!target) {
      return NextResponse.json(
        { error: "Usuario nao encontrado." },
        { status: 404 }
      );
    }

    if (target.role === "ADMIN" && parsed.data.role !== "ADMIN") {
      const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: "Mantenha ao menos um administrador ativo." },
          { status: 409 }
        );
      }
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role: parsed.data.role },
      select: { id: true, role: true },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Erro ao atualizar usuario:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
