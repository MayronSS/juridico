import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { leadInternalNotesSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    if (session.user.role !== "ADMIN" && session.user.role !== "EDITOR") {
      return NextResponse.json(
        { error: "Permissão insuficiente." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = leadInternalNotesSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos.", errors: parsed.error.issues },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
    }

    await prisma.lead.update({
      where: { id },
      data: {
        internalNotes: parsed.data.internalNotes || null,
      },
    });

    await prisma.leadHistory.create({
      data: {
        leadId: id,
        action: "NOTE_UPDATED",
        note: "Anotações internas atualizadas.",
        userId: session.user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar anotacoes do lead:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
