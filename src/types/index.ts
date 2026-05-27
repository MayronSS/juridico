// ============================================
// Tipos TypeScript — Site Jurídico
// ============================================

import type { LeadStatus, PostStatus, UserRole } from "@/generated/prisma";

// ============================================
// User
// ============================================

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

// ============================================
// Lead
// ============================================

export interface LeadWithHistory {
  id: string;
  name: string;
  email: string;
  phone: string;
  personType: string;
  city: string | null;
  state: string | null;
  legalArea: string;
  message: string;
  status: LeadStatus;
  lgpdAccepted: boolean;
  lgpdAcceptedAt: Date | null;
  ipAddress: string | null;
  userAgent: string | null;
  internalNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
  history: LeadHistoryEntry[];
}

export interface LeadHistoryEntry {
  id: string;
  action: string;
  oldStatus: LeadStatus | null;
  newStatus: LeadStatus | null;
  note: string | null;
  createdAt: Date;
  user: {
    name: string;
  } | null;
}

export interface LeadListItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  legalArea: string;
  status: LeadStatus;
  createdAt: Date;
}

// ============================================
// Post / Blog
// ============================================

export interface PostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  status: PostStatus;
  publishedAt: Date | null;
  createdAt: Date;
  category: {
    name: string;
    slug: string;
  } | null;
  author: {
    name: string;
  };
}

export interface PostDetail {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  status: PostStatus;
  metaTitle: string | null;
  metaDescription: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  author: {
    id: string;
    name: string;
  };
}

// ============================================
// Áreas de Atuação
// ============================================

export interface LegalArea {
  name: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  demands: string[];
  howWeHelp: string;
  faq: {
    question: string;
    answer: string;
  }[];
}

// ============================================
// FAQ
// ============================================

export interface FaqItem {
  question: string;
  answer: string;
}

// ============================================
// Navegação
// ============================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ============================================
// Dashboard Stats
// ============================================

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  inAnalysis: number;
  responded: number;
  archived: number;
  totalPosts: number;
  publishedPosts: number;
  monthlyContacts: {
    month: string;
    count: number;
  }[];
  recentLeads: LeadListItem[];
}

// ============================================
// API Responses
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ============================================
// Site Settings
// ============================================

export interface SiteSettings {
  site_name: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  whatsapp_number: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  office_hours: string;
  instagram_url: string;
  linkedin_url: string;
  facebook_url: string;
  meta_title_default: string;
  meta_description_default: string;
  [key: string]: string;
}


