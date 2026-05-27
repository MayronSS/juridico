// ============================================
// API — Atualizar Status do Lead
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { leadStatusSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const userRole = session.user.role;
    if (userRole !== "ADMIN" && userRole !== "EDITOR") {
      return NextResponse.json({ error: "Permissão insuficiente." }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = leadStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos.", errors: parsed.error.issues },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
    }

    const oldStatus = lead.status;
    const { status, note } = parsed.data;

    // Atualiza status
    await prisma.lead.update({
      where: { id },
      data: { status },
    });

    // Cria histórico
    await prisma.leadHistory.create({
      data: {
        leadId: id,
        action: "STATUS_CHANGED",
        oldStatus: oldStatus,
        newStatus: status,
        note: note || `Status alterado de ${oldStatus} para ${status}`,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error("Erro ao atualizar lead:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
