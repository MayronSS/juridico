// ============================================
// WhatsApp — Gerador de URL
// ============================================

/**
 * Gera URL de WhatsApp com mensagem pré-definida
 *
 * @param number - Número com código do país (ex: "5511999999999")
 * @param message - Mensagem pré-definida (opcional)
 * @returns URL do WhatsApp (wa.me)
 */
export function getWhatsAppUrl(
  number?: string,
  message?: string
): string {
  const phone =
    number ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "5500000000000";

  const defaultMessage =
    "Olá, gostaria de apresentar uma situação jurídica para análise inicial do escritório.";

  const encodedMessage = encodeURIComponent(message || defaultMessage);

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

/**
 * Gera URL de WhatsApp para um lead específico (uso admin)
 *
 * @param phone - Telefone do lead
 * @param leadName - Nome do lead
 */
export function getWhatsAppUrlForLead(
  phone: string,
  leadName: string
): string {
  // Limpa o número, removendo caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, "");

  // Adiciona código do país se não tiver
  const fullPhone = cleanPhone.startsWith("55")
    ? cleanPhone
    : `55${cleanPhone}`;

  const message = `Olá, ${leadName}. Entramos em contato referente à sua mensagem enviada ao escritório.`;

  return `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;
}
