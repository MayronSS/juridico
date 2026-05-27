// ============================================
// Dados Estáticos — Navegação
// ============================================

import type { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Áreas de Atuação", href: "/areas" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export const footerNavigation = {
  institutional: [
    { label: "Sobre o Escritório", href: "/sobre" },
    { label: "Áreas de Atuação", href: "/areas" },
    { label: "Blog Jurídico", href: "/blog" },
    { label: "Contato", href: "/contato" },
  ],
  legal: [
    { label: "Política de Privacidade", href: "/politica-de-privacidade" },
    { label: "Termos de Uso", href: "/termos-de-uso" },
  ],
  areas: [
    { label: "Direito Civil", href: "/areas/direito-civil" },
    { label: "Direito Trabalhista", href: "/areas/direito-trabalhista" },
    { label: "Direito Previdenciário", href: "/areas/direito-previdenciario" },
    { label: "Direito de Família", href: "/areas/direito-de-familia" },
    { label: "Direito do Consumidor", href: "/areas/direito-do-consumidor" },
  ],
};

export const adminNavigation: NavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Leads", href: "/admin/leads" },
  { label: "Artigos", href: "/admin/artigos" },
  { label: "Categorias", href: "/admin/categorias" },
  { label: "Configurações", href: "/admin/configuracoes" },
  { label: "Usuários", href: "/admin/usuarios" },
];
