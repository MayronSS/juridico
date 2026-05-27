// ============================================
// API — Formulário de Contato (POST)
// ============================================
// Rate limit, validação Zod, criação de Lead, envio de e-mail

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendContactNotification, sendContactConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting por IP (3 envios por 15 minutos)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimitResult = await checkRateLimit(`contact:${ip}`, {
      maxRequests: 3,
      windowSeconds: 900,
    });
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Você atingiu o limite de envios. Aguarde alguns minutos antes de tentar novamente.",
        },
        { status: 429 }
      );
    }

    // 2. Parse e validação do body
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return NextResponse.json(
        { success: false, error: "Dados inválidos.", errors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const userAgent = request.headers.get("user-agent") || undefined;

    // 3. Criar Lead no banco
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        personType: data.personType,
        city: data.city || null,
        state: data.state || null,
        legalArea: data.legalArea,
        message: data.message,
        lgpdAccepted: data.lgpdAccepted,
        lgpdAcceptedAt: new Date(),
        ipAddress: ip,
        userAgent: userAgent || null,
        status: "NOVO",
      },
    });

    // 4. Criar histórico do lead
    await prisma.leadHistory.create({
      data: {
        leadId: lead.id,
        action: "CREATED",
        newStatus: "NOVO",
        note: `Lead criado via formulário do site. Área: ${data.legalArea}`,
      },
    });

    // 5. Enviar e-mails (espera a conclusão para evitar congelamento no serverless da Vercel)
    try {
      await Promise.allSettled([
        sendContactNotification({
          name: data.name,
          email: data.email,
          phone: data.phone,
          personType: data.personType,
          city: data.city || undefined,
          state: data.state || undefined,
          legalArea: data.legalArea,
          message: data.message,
        }),
        sendContactConfirmation(data.email, data.name),
      ]).then((results) => {
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(
              `❌ Erro no e-mail ${index === 0 ? "notificação" : "confirmação"}:`,
              result.reason
            );
          } else if (result.value && !result.value.success) {
            console.error(
              `❌ Falha no envio do e-mail ${index === 0 ? "notificação" : "confirmação"}:`,
              result.value.error
            );
          } else {
            console.log(`✅ E-mail ${index === 0 ? "notificação" : "confirmação"} disparado com sucesso.`);
          }
        });
      });
    } catch (e) {
      console.error("❌ Erro ao enviar e-mails:", e);
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Erro no endpoint de contato:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Ocorreu um erro interno. Tente novamente ou entre em contato por telefone.",
      },
      { status: 500 }
    );
  }
}
