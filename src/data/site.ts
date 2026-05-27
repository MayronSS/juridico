// ============================================
// Dados Estáticos — Configuração do Site
// ============================================

export const siteConfig = {
  name: "Advocacia & Consultoria Jurídica",
  description:
    "Assessoria jurídica com atendimento e orientação técnica especializada.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5500000000000",

  contact: {
    email: "contato@seudominio.com.br",
    phone: "(00) 0000-0000",
    address: {
      street: "Rua Exemplo, 123 — Sala 456",
      city: "Sua Cidade",
      state: "UF",
      zip: "00000-000",
    },
    officeHours: "Segunda a sexta, das 9h às 18h",
  },

  social: {
    instagram: "",
    linkedin: "",
    facebook: "",
  },

  // Textos institucionais reutilizáveis
  texts: {
    heroHeadline:
      "Advocacia estratégica para decisões seguras",
    heroSubheadline:
      "Atendimento jurídico técnico para pessoas e empresas, com orientação clara em cada etapa.",
    formDisclaimer:
      "O envio deste formulário não cria automaticamente uma relação advogado-cliente. As informações serão analisadas pelo escritório para eventual contato posterior, conforme nossa Política de Privacidade.",
    formSuccess:
      "Recebemos sua mensagem. Nossa equipe analisará as informações enviadas e poderá entrar em contato pelos canais informados.",
    formError:
      "Não foi possível enviar sua mensagem no momento. Verifique os dados informados ou tente novamente mais tarde.",
    contentDisclaimer:
      "Este conteúdo possui finalidade exclusivamente informativa e não substitui uma consulta jurídica individualizada. Cada situação deve ser analisada de acordo com suas particularidades.",
  },
} as const;
