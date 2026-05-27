export type SettingInputType = "text" | "textarea" | "email" | "tel" | "url";

export type SettingGroup =
  | "general"
  | "seo"
  | "home"
  | "about"
  | "contact"
  | "layout"
  | "blog";

export interface SettingDefinition {
  key: string;
  label: string;
  group: SettingGroup;
  type: SettingInputType;
  defaultValue: string;
  description?: string;
}

export const settingGroups: { id: SettingGroup; label: string; description: string }[] = [
  {
    id: "general",
    label: "Geral",
    description: "Dados institucionais, contato principal e localização.",
  },
  {
    id: "seo",
    label: "SEO",
    description: "Metadados padrao, imagem social e termos de busca locais.",
  },
  {
    id: "home",
    label: "Home",
    description: "Hero, chamadas, estatisticas e textos de apoio da home.",
  },
  {
    id: "about",
    label: "Sobre",
    description: "Texto institucional, missao, visao, valores e diferenciais.",
  },
  {
    id: "contact",
    label: "Contato",
    description: "Texto introdutório, instruções, aviso do formulário e WhatsApp.",
  },
  {
    id: "layout",
    label: "Header/Footer",
    description: "Logo, descrição do rodapé e links sociais.",
  },
  {
    id: "blog",
    label: "Blog",
    description: "Titulo, descricao, autor padrao e artigos em destaque.",
  },
];

export const settingsDefinitions: readonly SettingDefinition[] = [
  {
    key: "office_name",
    label: "Nome do escritorio",
    group: "general",
    type: "text",
    defaultValue: "Advocacia & Consultoria Jurídica",
  },
  {
    key: "short_description",
    label: "Descricao curta",
    group: "general",
    type: "textarea",
    defaultValue:
      "Assessoria jurídica com atendimento e orientação técnica especializada.",
  },
  {
    key: "full_description",
    label: "Descricao institucional completa",
    group: "general",
    type: "textarea",
    defaultValue:
      "Nosso escritório atua com orientação técnica, comunicação clara e acompanhamento cuidadoso para pessoas físicas e jurídicas em diferentes áreas do Direito.",
  },
  {
    key: "main_email",
    label: "E-mail principal",
    group: "general",
    type: "email",
    defaultValue: "contato@seudominio.com.br",
  },
  {
    key: "contact_email",
    label: "E-mail de contato",
    group: "general",
    type: "email",
    defaultValue: "contato@seudominio.com.br",
  },
  {
    key: "phone",
    label: "Telefone",
    group: "general",
    type: "tel",
    defaultValue: "(00) 0000-0000",
  },
  {
    key: "whatsapp_number",
    label: "Numero do WhatsApp",
    group: "general",
    type: "tel",
    defaultValue: "5500000000000",
    description: "Use apenas numeros, incluindo codigo do pais e DDD.",
  },
  {
    key: "address",
    label: "Endereco",
    group: "general",
    type: "text",
    defaultValue: "Rua Exemplo, 123 - Sala 456",
  },
  {
    key: "city",
    label: "Cidade",
    group: "general",
    type: "text",
    defaultValue: "Sua Cidade",
  },
  {
    key: "state",
    label: "Estado",
    group: "general",
    type: "text",
    defaultValue: "UF",
  },
  {
    key: "zip_code",
    label: "CEP",
    group: "general",
    type: "text",
    defaultValue: "00000-000",
  },
  {
    key: "business_hours",
    label: "Horario de atendimento",
    group: "general",
    type: "text",
    defaultValue: "Segunda a sexta, das 9h às 18h",
  },
  {
    key: "google_maps_url",
    label: "Link do Google Maps",
    group: "general",
    type: "url",
    defaultValue: "",
  },
  {
    key: "site_url",
    label: "URL do site",
    group: "seo",
    type: "url",
    defaultValue: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
  {
    key: "default_meta_title",
    label: "Meta title padrao",
    group: "seo",
    type: "text",
    defaultValue: "Advocacia & Consultoria Jurídica | Assessoria Jurídica Profissional",
  },
  {
    key: "default_meta_description",
    label: "Meta description padrao",
    group: "seo",
    type: "textarea",
    defaultValue:
      "Assessoria jurídica com atendimento e orientação técnica especializada. Conheça nossas áreas de atuação e entre em contato.",
  },
  {
    key: "default_og_image",
    label: "Imagem Open Graph padrao",
    group: "seo",
    type: "text",
    defaultValue: "/images/og-default.svg",
  },
  {
    key: "keywords",
    label: "Palavras-chave",
    group: "seo",
    type: "textarea",
    defaultValue:
      "advocacia, assessoria jurídica, advogado, direito, escritório de advocacia, consultoria jurídica",
    description: "Separe termos por virgula.",
  },
  {
    key: "local_seo_region",
    label: "Cidade/regiao para SEO local",
    group: "seo",
    type: "text",
    defaultValue: "Sua Cidade/UF",
  },
  {
    key: "hero_title",
    label: "Titulo do hero",
    group: "home",
    type: "text",
    defaultValue: "Advocacia estratégica para decisões seguras",
  },
  {
    key: "hero_subtitle",
    label: "Subtitulo do hero",
    group: "home",
    type: "textarea",
    defaultValue:
      "Atendimento jurídico técnico e humanizado para pessoas e empresas, com orientação clara em cada etapa.",
  },
  {
    key: "hero_primary_cta_text",
    label: "Texto do CTA principal",
    group: "home",
    type: "text",
    defaultValue: "Fale com o escritório",
  },
  {
    key: "hero_primary_cta_url",
    label: "URL do CTA principal",
    group: "home",
    type: "text",
    defaultValue: "/contato",
  },
  {
    key: "hero_secondary_cta_text",
    label: "Texto do CTA secundario",
    group: "home",
    type: "text",
    defaultValue: "Conheça as áreas de atuação",
  },
  {
    key: "hero_secondary_cta_url",
    label: "URL do CTA secundario",
    group: "home",
    type: "text",
    defaultValue: "/areas",
  },
  {
    key: "trust_badge_1_value",
    label: "Estatistica 1 - valor",
    group: "home",
    type: "text",
    defaultValue: "10+",
  },
  {
    key: "trust_badge_1_label",
    label: "Estatistica 1 - rotulo",
    group: "home",
    type: "text",
    defaultValue: "Áreas de atuação",
  },
  {
    key: "trust_badge_2_value",
    label: "Estatistica 2 - valor",
    group: "home",
    type: "text",
    defaultValue: "Ética",
  },
  {
    key: "trust_badge_2_label",
    label: "Estatistica 2 - rotulo",
    group: "home",
    type: "text",
    defaultValue: "Publicidade responsavel",
  },
  {
    key: "trust_badge_3_value",
    label: "Estatistica 3 - valor",
    group: "home",
    type: "text",
    defaultValue: "LGPD",
  },
  {
    key: "trust_badge_3_label",
    label: "Estatistica 3 - rotulo",
    group: "home",
    type: "text",
    defaultValue: "Proteção de dados",
  },
  {
    key: "about_preview_text",
    label: "Texto de preview do sobre",
    group: "home",
    type: "textarea",
    defaultValue:
      "Acreditamos que cada cliente merece atenção individualizada, linguagem clara e uma análise jurídica responsável.",
  },
  {
    key: "final_cta_title",
    label: "Titulo da chamada final",
    group: "home",
    type: "text",
    defaultValue: "Apresente sua situação ao escritório",
  },
  {
    key: "final_cta_description",
    label: "Descricao da chamada final",
    group: "home",
    type: "textarea",
    defaultValue:
      "Se você possui uma questão jurídica e deseja orientação profissional, entre em contato com nossa equipe. Analisaremos sua situação com atenção e transparência.",
  },
  {
    key: "about_title",
    label: "Titulo da pagina Sobre",
    group: "about",
    type: "text",
    defaultValue: "Sobre o Escritório",
  },
  {
    key: "about_content",
    label: "Texto institucional",
    group: "about",
    type: "textarea",
    defaultValue:
      "O escritório nasceu com a missão de oferecer serviços jurídicos com excelência, priorizando atendimento humanizado, ética profissional e comunicação clara em cada etapa.",
  },
  {
    key: "mission",
    label: "Missao",
    group: "about",
    type: "textarea",
    defaultValue:
      "Prestar orientação jurídica técnica, clara e responsável, respeitando as particularidades de cada cliente.",
  },
  {
    key: "vision",
    label: "Visao",
    group: "about",
    type: "textarea",
    defaultValue:
      "Ser reconhecido pela confiança, sobriedade e qualidade no atendimento jurídico.",
  },
  {
    key: "values",
    label: "Valores",
    group: "about",
    type: "textarea",
    defaultValue: "Ética profissional\nTransparência\nAtendimento humanizado\nAtualização constante",
    description: "Use uma linha para cada valor.",
  },
  {
    key: "team_profile",
    label: "Perfil profissional/equipe",
    group: "about",
    type: "textarea",
    defaultValue:
      "Equipe formada por profissionais comprometidos com análise cuidadosa, atualização técnica e atendimento individualizado.",
  },
  {
    key: "differentials",
    label: "Diferenciais",
    group: "about",
    type: "textarea",
    defaultValue:
      "Atendimento individualizado\nComunicação clara\nAnálise técnica de cada caso\nCompromisso com a ética profissional",
    description: "Use uma linha para cada diferencial.",
  },
  {
    key: "contact_intro_text",
    label: "Texto introdutorio da pagina de contato",
    group: "contact",
    type: "textarea",
    defaultValue:
      "Apresente sua situação e nossa equipe analisará as informações para orientar o próximo contato da forma mais adequada.",
  },
  {
    key: "contact_disclaimer_text",
    label: "Aviso do formulario",
    group: "contact",
    type: "textarea",
    defaultValue:
      "O envio deste formulário não cria automaticamente uma relação advogado-cliente. As informações serão analisadas pelo escritório para eventual contato posterior.",
  },
  {
    key: "contact_instructions",
    label: "Instrucoes de contato",
    group: "contact",
    type: "textarea",
    defaultValue:
      "Preencha os campos com informações objetivas. Evite enviar documentos completos, senhas ou dados sensíveis nesta etapa inicial.",
  },
  {
    key: "whatsapp_message",
    label: "Mensagem padrao do WhatsApp",
    group: "contact",
    type: "textarea",
    defaultValue:
      "Olá, gostaria de apresentar uma situação jurídica para análise inicial do escritório.",
  },
  {
    key: "logo_text",
    label: "Texto alternativo da logo",
    group: "layout",
    type: "text",
    defaultValue: "Advocacia & Consultoria Jurídica",
  },
  {
    key: "logo_image_path",
    label: "Caminho da logo",
    group: "layout",
    type: "text",
    defaultValue: "/images/logo.svg",
  },
  {
    key: "footer_description",
    label: "Descricao do rodape",
    group: "layout",
    type: "textarea",
    defaultValue:
      "Assessoria jurídica com atendimento e orientação técnica especializada.",
  },
  {
    key: "instagram_url",
    label: "Instagram",
    group: "layout",
    type: "url",
    defaultValue: "",
  },
  {
    key: "linkedin_url",
    label: "LinkedIn",
    group: "layout",
    type: "url",
    defaultValue: "",
  },
  {
    key: "facebook_url",
    label: "Facebook",
    group: "layout",
    type: "url",
    defaultValue: "",
  },
  {
    key: "blog_title",
    label: "Titulo do blog",
    group: "blog",
    type: "text",
    defaultValue: "Blog Jurídico",
  },
  {
    key: "blog_description",
    label: "Descricao do blog",
    group: "blog",
    type: "textarea",
    defaultValue:
      "Conteúdo informativo sobre temas jurídicos relevantes para o seu dia a dia.",
  },
  {
    key: "blog_author_name",
    label: "Autor padrao",
    group: "blog",
    type: "text",
    defaultValue: "Equipe jurídica",
  },
  {
    key: "featured_article_slugs",
    label: "Artigos em destaque",
    group: "blog",
    type: "textarea",
    defaultValue: "",
    description: "Informe slugs separados por quebra de linha para priorizar na home.",
  },
  {
    key: "privacy_last_updated",
    label: "Atualizacao da politica de privacidade",
    group: "layout",
    type: "text",
    defaultValue: "Janeiro de 2025",
  },
  {
    key: "terms_last_updated",
    label: "Atualizacao dos termos de uso",
    group: "layout",
    type: "text",
    defaultValue: "Janeiro de 2025",
  },
] as const;

export type SettingKey = string;
export type WebsiteSettings = Record<SettingKey, string>;

export const defaultWebsiteSettings = settingsDefinitions.reduce(
  (acc, setting) => {
    acc[setting.key as SettingKey] = setting.defaultValue;
    return acc;
  },
  {} as WebsiteSettings
);

export function getSettingDefinition(key: string) {
  return settingsDefinitions.find((setting) => setting.key === key);
}

export function getSettingsByGroup(group: SettingGroup) {
  return settingsDefinitions.filter((setting) => setting.group === group);
}

export function splitLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}
