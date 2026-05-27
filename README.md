# 🏛️ Site Jurídico — Escritório Jurídico Modelo

Site profissional completo para escritório de advocacia, construído com Next.js 16, TypeScript, TailwindCSS 4 e PostgreSQL.

## ✨ Funcionalidades

### Público
- **Home** — Hero animado, áreas de atuação, diferenciais, FAQ, blog preview
- **Sobre** — História, valores, compromisso ético OAB
- **Áreas de Atuação** — 10 áreas jurídicas com páginas individuais (SSG)
- **Blog Jurídico** — Listagem com paginação, filtro por categorias, artigos com Schema.org
- **Contato** — Formulário completo com validação, LGPD, rate limiting
- **WhatsApp** — Botão flutuante discreto
- **SEO** — Sitemap dinâmico, robots.txt, JSON-LD, Open Graph, meta tags
- **LGPD** — Política de Privacidade completa, checkbox obrigatório, rastreamento de consentimento
- **OAB** — Disclaimers éticos, sem tom urgente/apelativo

### Painel Administrativo (`/admin`)
- **Dashboard** — Estatísticas, leads recentes
- **Gestão de Leads** — Listagem, filtros, detalhe, alteração de status, histórico
- **Gestão de Artigos** — CRUD completo, editor com SEO, categorias
- **Configurações** — Informações do escritório

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Next.js | 16.x | Framework React (App Router) |
| React | 19.x | Interface |
| TypeScript | 5.x | Tipagem |
| TailwindCSS | 4.x | Estilos |
| shadcn/ui | Latest | Componentes UI |
| Prisma | 7.x | ORM + Database |
| PostgreSQL | 16 | Banco de dados |
| NextAuth.js | 5.x (beta) | Autenticação |
| Zod | 4.x | Validação |
| React Hook Form | 7.x | Formulários |
| Framer Motion | 12.x | Animações |
| Resend | - | E-mails transacionais |
| Lucide React | - | Ícones |

## 📁 Estrutura do Projeto

```
site-juridico/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── seed.ts                # Dados iniciais
├── src/
│   ├── app/
│   │   ├── admin/             # Painel administrativo
│   │   │   ├── login/         # Login
│   │   │   ├── leads/         # Gestão de leads
│   │   │   ├── artigos/       # Gestão de artigos
│   │   │   └── configuracoes/ # Configurações
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth
│   │   │   ├── contato/       # Formulário de contato
│   │   │   ├── leads/         # API de leads
│   │   │   └── artigos/       # API de artigos
│   │   ├── areas/             # Áreas de atuação
│   │   ├── blog/              # Blog jurídico
│   │   ├── contato/           # Página de contato
│   │   ├── sobre/             # Sobre o escritório
│   │   ├── politica-de-privacidade/
│   │   ├── termos-de-uso/
│   │   ├── layout.tsx         # Layout raiz
│   │   ├── page.tsx           # Home
│   │   ├── sitemap.ts         # Sitemap dinâmico
│   │   └── robots.ts          # Robots.txt
│   ├── components/
│   │   ├── admin/             # Componentes admin
│   │   ├── cards/             # Cards reutilizáveis
│   │   ├── forms/             # Formulários
│   │   ├── layout/            # Header, Footer, WhatsApp
│   │   ├── sections/          # Seções da home
│   │   └── ui/                # shadcn/ui
│   ├── data/                  # Dados estáticos
│   ├── lib/                   # Utilitários, auth, email, SEO
│   └── types/                 # Tipos TypeScript
├── docker-compose.yml         # PostgreSQL local
├── .env.example               # Variáveis de ambiente
└── next.config.ts             # Config + headers de segurança
```

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- Docker Desktop (para PostgreSQL local) ou conta Neon/Supabase

### 1. Instalar dependências

```bash
cd site-juridico
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais.

### 3. Subir banco de dados (Docker)

```bash
docker compose up -d
```

### 4. Rodar migrações e seed

```bash
npx prisma migrate dev --name init
npm run db:seed
```

### 5. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

### 6. Acessar painel admin

- URL: http://localhost:3000/admin/login
- E-mail: `admin@seudominio.com.br`
- Senha: `admin123` (altere imediatamente)

## 🔧 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|:-----------:|
| `DATABASE_URL` | URL do PostgreSQL | ✅ |
| `NEXTAUTH_SECRET` | Secret do NextAuth (gerar com `openssl rand -base64 32`) | ✅ |
| `NEXTAUTH_URL` | URL do site | ✅ |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site | ✅ |
| `NEXT_PUBLIC_SITE_NAME` | Nome do escritório | ✅ |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número WhatsApp com DDI | ✅ |
| `RESEND_API_KEY` | API key do Resend (e-mails) | ⚠️ |
| `CONTACT_EMAIL` | E-mail que recebe notificações | ⚠️ |

## 📦 Scripts Disponíveis

| Script | Comando |
|--------|---------|
| Desenvolvimento | `npm run dev` |
| Build produção | `npm run build` |
| Iniciar produção | `npm start` |
| Type check | `npx tsc --noEmit` |
| Lint | `npm run lint` |
| Gerar Prisma Client | `npx prisma generate` |
| Rodar migrações | `npx prisma migrate dev` |
| Seed do banco | `npm run db:seed` |
| Prisma Studio | `npx prisma studio` |

## 🔒 Segurança

- **Headers HTTP**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS
- **Rate Limiting**: 3 envios por IP a cada 15 minutos no formulário de contato
- **Autenticação**: NextAuth v5 com JWT + Credentials
- **Middleware**: Proteção automática de rotas `/admin`
- **Validação**: Zod v4 em client e server
- **LGPD**: Checkbox obrigatório, rastreamento de consentimento, política completa
- **X-Powered-By**: Desativado

## 🌐 Deploy

### Vercel (Recomendado)

1. Conecte o repositório no Vercel
2. Configure as variáveis de ambiente
3. Use Neon ou Supabase para PostgreSQL em produção
4. Altere `DATABASE_URL` para o banco de produção

### Docker (Self-hosted)

```bash
docker compose -f docker-compose.yml up -d
npm run build
npm start
```

## 📋 Personalização

### Dados do escritório
Edite `src/data/site.ts` para alterar nome, contato, endereço e redes sociais.

### Áreas de atuação
Edite `src/data/areas.ts` para adicionar/remover/editar áreas jurídicas.

### Design
Edite `src/app/globals.css` para alterar cores (navy, gold, graphite, cream), tipografia e estilos globais.

### FAQ
Edite `src/data/faq.ts` para alterar perguntas frequentes da home.

## 📝 Licença

Este projeto é uma solução profissional para escritórios jurídicos. Licença comercial — consulte os termos de uso.
