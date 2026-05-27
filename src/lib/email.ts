// ============================================
// E-mail — Envio via Resend
// ============================================

import { Resend } from "resend";
import { sanitizeString } from "@/lib/utils";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  personType: string;
  city?: string;
  state?: string;
  legalArea: string;
  message: string;
}

/**
 * Envia e-mail de notificação para o escritório
 * quando um novo contato é recebido via formulário
 */
export async function sendContactNotification(
  data: ContactEmailData
): Promise<{ success: boolean; error?: string }> {
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!contactEmail) {
    console.warn("⚠️ CONTACT_EMAIL não configurado. E-mail não enviado.");
    return { success: false, error: "E-mail de contato não configurado." };
  }

  if (!resend) {
    console.warn("⚠️ RESEND_API_KEY não configurado. E-mail não enviado.");
    return { success: false, error: "API de e-mail não configurada." };
  }

  const personTypeLabel =
    data.personType === "FISICA" ? "Pessoa Física" : "Pessoa Jurídica";
  const locationParts = [data.city, data.state].filter(Boolean);
  const location = locationParts.length > 0 ? locationParts.join("/") : "Não informado";

  // Sanitiza dados do usuário antes de interpolar no HTML
  const safe = {
    name: sanitizeString(data.name),
    email: sanitizeString(data.email),
    phone: sanitizeString(data.phone),
    legalArea: sanitizeString(data.legalArea),
    message: sanitizeString(data.message),
    personType: sanitizeString(personTypeLabel),
    location: sanitizeString(location),
  };

  try {
    await resend.emails.send({
      from: "Site Jurídico <noreply@seudominio.com.br>",
      to: [contactEmail],
      subject: `Novo contato via site — ${safe.legalArea}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8f9fa; border-radius: 8px;">
          <div style="background: #1a2332; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 600;">Novo Contato Recebido</h1>
          </div>
          
          <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 140px; vertical-align: top;">Nome:</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 500;">${safe.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; vertical-align: top;">E-mail:</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">
                  <a href="mailto:${safe.email}" style="color: #2563eb;">${safe.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; vertical-align: top;">Telefone:</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${safe.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; vertical-align: top;">Tipo:</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${safe.personType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; vertical-align: top;">Localidade:</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${safe.location}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; vertical-align: top;">Área jurídica:</td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${safe.legalArea}</td>
              </tr>
            </table>
            
            <hr style="margin: 16px 0; border: none; border-top: 1px solid #e2e8f0;">
            
            <div>
              <p style="color: #64748b; font-size: 14px; margin: 0 0 8px;">Mensagem:</p>
              <div style="background: #f8fafc; padding: 16px; border-radius: 6px; border-left: 3px solid #2563eb;">
                <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safe.message}</p>
              </div>
            </div>
            
            <div style="margin-top: 24px; padding: 12px; background: #fffbeb; border-radius: 6px; border-left: 3px solid #f59e0b;">
              <p style="color: #92400e; font-size: 12px; margin: 0;">
                Este contato foi recebido pelo formulário do site. Analise as informações e entre em contato pelos canais informados.
              </p>
            </div>
          </div>
          
          <p style="text-align: center; color: #94a3b8; font-size: 11px; margin-top: 16px;">
            Enviado automaticamente pelo sistema do site.
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    return {
      success: false,
      error: "Falha ao enviar notificação por e-mail.",
    };
  }
}

/**
 * Envia e-mail de confirmação para o visitante (opcional)
 */
export async function sendContactConfirmation(
  toEmail: string,
  toName: string
): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    return { success: false, error: "API de e-mail não configurada." };
  }

  const siteName =
    process.env.NEXT_PUBLIC_SITE_NAME || "Advocacia & Consultoria Jurídica";

  try {
    await resend.emails.send({
      from: `${siteName} <noreply@seudominio.com.br>`,
      to: [toEmail],
      subject: `Recebemos sua mensagem — ${siteName}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="background: #1a2332; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 600;">${siteName}</h1>
          </div>
          
          <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
            <p style="color: #334155; font-size: 15px; line-height: 1.6;">
              Olá, <strong>${toName}</strong>.
            </p>
            <p style="color: #334155; font-size: 15px; line-height: 1.6;">
              Recebemos sua mensagem e agradecemos o contato. Nossa equipe analisará as informações enviadas e poderá entrar em contato pelos canais informados.
            </p>
            <p style="color: #334155; font-size: 15px; line-height: 1.6;">
              Ressaltamos que o envio da mensagem não cria automaticamente uma relação advogado-cliente.
            </p>
            <p style="color: #334155; font-size: 15px; line-height: 1.6;">
              Atenciosamente,<br>
              <strong>Equipe ${siteName}</strong>
            </p>
          </div>
          
          <p style="text-align: center; color: #94a3b8; font-size: 11px; margin-top: 16px;">
            Este é um e-mail automático. Não é necessário respondê-lo.
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao enviar confirmação:", error);
    return {
      success: false,
      error: "Falha ao enviar confirmação.",
    };
  }
}
