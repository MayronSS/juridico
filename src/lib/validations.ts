// ============================================
// Validações — Schemas Zod v4
// ============================================
// Schemas compartilhados entre client e server

import { z } from "zod";

// ============================================
// Formulário de Contato
// ============================================

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(100, "O nome deve ter no máximo 100 caracteres.")
    .trim(),
  email: z
    .email("Informe um e-mail válido.")
    .max(100, "O e-mail deve ter no máximo 100 caracteres.")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(10, "Informe um telefone válido com DDD.")
    .max(20, "Telefone inválido.")
    .trim(),
  personType: z.enum(["FISICA", "JURIDICA"], {
    error: "Selecione o tipo de pessoa.",
  }),
  city: z
    .string()
    .max(100, "A cidade deve ter no máximo 100 caracteres.")
    .trim()
    .optional()
    .or(z.literal("")),
  state: z
    .string()
    .max(2, "Informe a sigla do estado (UF).")
    .trim()
    .toUpperCase()
    .optional()
    .or(z.literal("")),
  legalArea: z
    .string()
    .min(1, "Selecione a área jurídica de interesse."),
  message: z
    .string()
    .min(20, "A mensagem deve ter pelo menos 20 caracteres.")
    .max(2000, "A mensagem deve ter no máximo 2000 caracteres.")
    .trim(),
  lgpdAccepted: z.boolean().refine((val) => val === true, {
    message:
      "É necessário aceitar a Política de Privacidade para enviar o formulário.",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================
// Login
// ============================================

export const loginFormSchema = z.object({
  email: z
    .email("Informe um e-mail válido.")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .max(100, "Senha muito longa."),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

// ============================================
// Artigo do Blog
// ============================================

export const articleFormSchema = z.object({
  title: z
    .string()
    .min(5, "O título deve ter pelo menos 5 caracteres.")
    .max(200, "O título deve ter no máximo 200 caracteres.")
    .trim(),
  slug: z
    .string()
    .min(3, "O slug deve ter pelo menos 3 caracteres.")
    .max(200, "O slug deve ter no máximo 200 caracteres.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "O slug deve conter apenas letras minúsculas, números e hífens."
    )
    .trim(),
  excerpt: z
    .string()
    .max(500, "O resumo deve ter no máximo 500 caracteres.")
    .trim()
    .optional()
    .or(z.literal("")),
  content: z
    .string()
    .min(50, "O conteúdo deve ter pelo menos 50 caracteres.")
    .trim(),
  categoryId: z
    .string()
    .optional()
    .or(z.literal("")),
  status: z.enum(["RASCUNHO", "PUBLICADO"], {
    error: "Selecione o status do artigo.",
  }),
  metaTitle: z
    .string()
    .max(70, "O meta title deve ter no máximo 70 caracteres.")
    .trim()
    .optional()
    .or(z.literal("")),
  metaDescription: z
    .string()
    .max(160, "A meta description deve ter no máximo 160 caracteres.")
    .trim()
    .optional()
    .or(z.literal("")),
  coverImage: z
    .string()
    .url("URL de imagem inválida.")
    .optional()
    .or(z.literal("")),
});

export type ArticleFormData = z.infer<typeof articleFormSchema>;

// ============================================
// Atualização de Status do Lead
// ============================================

export const leadStatusSchema = z.object({
  status: z.enum(["NOVO", "EM_ANALISE", "RESPONDIDO", "ARQUIVADO"], {
    error: "Status inválido.",
  }),
  note: z
    .string()
    .max(1000, "A observação deve ter no máximo 1000 caracteres.")
    .trim()
    .optional()
    .or(z.literal("")),
});

export type LeadStatusData = z.infer<typeof leadStatusSchema>;

// ============================================
// Observação interna do Lead
// ============================================

export const leadNoteSchema = z.object({
  note: z
    .string()
    .min(1, "A observação não pode estar vazia.")
    .max(1000, "A observação deve ter no máximo 1000 caracteres.")
    .trim(),
});

export type LeadNoteData = z.infer<typeof leadNoteSchema>;

// ============================================
// Configurações do Site
// ============================================

export const siteSettingSchema = z.object({
  key: z.string().min(1),
  value: z.string().max(2000, "O valor deve ter no máximo 2000 caracteres."),
});

export type SiteSettingData = z.infer<typeof siteSettingSchema>;

export const websiteSettingsUpdateSchema = z.object({
  settings: z.record(
    z.string(),
    z.string().max(5000, "O valor deve ter no maximo 5000 caracteres.")
  ),
});

export type WebsiteSettingsUpdateData = z.infer<typeof websiteSettingsUpdateSchema>;

// ============================================
// Categorias do Blog
// ============================================

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(80, "O nome deve ter no maximo 80 caracteres.")
    .trim(),
  slug: z
    .string()
    .min(2, "O slug deve ter pelo menos 2 caracteres.")
    .max(100, "O slug deve ter no maximo 100 caracteres.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use apenas letras minusculas, numeros e hifens."
    )
    .trim(),
  description: z
    .string()
    .max(300, "A descricao deve ter no maximo 300 caracteres.")
    .trim()
    .optional()
    .or(z.literal("")),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

// ============================================
// Usuarios
// ============================================

export const userRoleUpdateSchema = z.object({
  role: z.enum(["ADMIN", "EDITOR", "USER"], {
    error: "Selecione uma permissao valida.",
  }),
});

export type UserRoleUpdateData = z.infer<typeof userRoleUpdateSchema>;

// ============================================
// Anotacoes internas do Lead
// ============================================

export const leadInternalNotesSchema = z.object({
  internalNotes: z
    .string()
    .max(2000, "As anotacoes devem ter no maximo 2000 caracteres.")
    .trim()
    .optional()
    .or(z.literal("")),
});

export type LeadInternalNotesData = z.infer<typeof leadInternalNotesSchema>;

// ============================================
// Constantes para selects
// ============================================

export const LEGAL_AREAS = [
  "Direito Civil",
  "Direito Trabalhista",
  "Direito Previdenciário",
  "Direito de Família",
  "Direito do Consumidor",
  "Direito Empresarial",
  "Direito Imobiliário",
  "Direito Tributário",
  "Direito Digital",
  "Direito Contratual",
] as const;

export const PERSON_TYPES = [
  { value: "FISICA", label: "Pessoa Física" },
  { value: "JURIDICA", label: "Pessoa Jurídica" },
] as const;

export const LEAD_STATUSES = [
  { value: "NOVO", label: "Novo", color: "blue" },
  { value: "EM_ANALISE", label: "Em Análise", color: "yellow" },
  { value: "RESPONDIDO", label: "Respondido", color: "green" },
  { value: "ARQUIVADO", label: "Arquivado", color: "gray" },
] as const;

export const BRAZILIAN_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;
