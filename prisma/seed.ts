// ============================================
// Site Jurídico — Prisma Seed
// ============================================
// Executa: npx prisma db seed
// Cria: usuário admin, categorias padrão, artigos de exemplo

import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { PrismaClient, UserRole, PostStatus } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { settingsDefinitions } from "../src/lib/site-settings-schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...\n");

  // ============================================
  // 1. Usuário Admin
  // ============================================
  const adminEmail = "admin@escritorio.com.br";
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  let adminUser;

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("Admin@123", 12);
    adminUser = await prisma.user.create({
      data: {
        name: "Administrador",
        email: adminEmail,
        passwordHash,
        role: UserRole.ADMIN,
      },
    });
    console.log("✅ Usuário admin criado:", adminUser.email);
    console.log("   Senha inicial: Admin@123 (altere após o primeiro acesso)\n");
  } else {
    adminUser = existingAdmin;
    console.log("ℹ️  Usuário admin já existe:", adminEmail, "\n");
  }

  // ============================================
  // 2. Categorias do Blog
  // ============================================
  const categoriesData = [
    {
      name: "Direito Civil",
      slug: "direito-civil",
      description:
        "Artigos sobre contratos, responsabilidade civil, obrigações e direitos reais.",
    },
    {
      name: "Direito Trabalhista",
      slug: "direito-trabalhista",
      description:
        "Conteúdos informativos sobre relações de trabalho, direitos do trabalhador e do empregador.",
    },
    {
      name: "Direito Previdenciário",
      slug: "direito-previdenciario",
      description:
        "Informações sobre aposentadoria, benefícios do INSS e planejamento previdenciário.",
    },
    {
      name: "Direito de Família",
      slug: "direito-de-familia",
      description:
        "Conteúdos sobre divórcio, guarda, pensão alimentícia e questões familiares.",
    },
    {
      name: "Direito do Consumidor",
      slug: "direito-do-consumidor",
      description:
        "Orientações sobre relações de consumo, direitos do consumidor e práticas comerciais.",
    },
    {
      name: "Direito Empresarial",
      slug: "direito-empresarial",
      description:
        "Artigos sobre constituição de empresas, contratos empresariais e compliance.",
    },
    {
      name: "Direito Imobiliário",
      slug: "direito-imobiliario",
      description:
        "Conteúdos sobre compra e venda de imóveis, locação e questões registrais.",
    },
    {
      name: "Direito Tributário",
      slug: "direito-tributario",
      description:
        "Informações sobre tributos, planejamento tributário e obrigações fiscais.",
    },
    {
      name: "Direito Digital",
      slug: "direito-digital",
      description:
        "Artigos sobre LGPD, crimes digitais, contratos eletrônicos e proteção de dados.",
    },
    {
      name: "Direito Contratual",
      slug: "direito-contratual",
      description:
        "Conteúdos sobre elaboração, revisão e cumprimento de contratos.",
    },
  ];

  const categories: Record<string, string> = {};

  for (const cat of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: cat,
    });
    categories[cat.slug] = category.id;
  }

  console.log(`✅ ${categoriesData.length} categorias criadas/atualizadas\n`);

  // ============================================
  // 3. Artigos de Exemplo
  // ============================================
  const postsData = [
    {
      title: "Entenda seus direitos nas relações de consumo",
      slug: "entenda-seus-direitos-nas-relacoes-de-consumo",
      excerpt:
        "Uma visão geral sobre os principais direitos previstos no Código de Defesa do Consumidor e como eles se aplicam no dia a dia.",
      content: `## O que é o Código de Defesa do Consumidor?

O Código de Defesa do Consumidor (Lei nº 8.078/1990) é a principal legislação brasileira voltada à proteção dos direitos do consumidor. Ele estabelece normas de proteção e defesa do consumidor, de ordem pública e interesse social.

## Direitos fundamentais do consumidor

Entre os direitos básicos previstos na legislação, destacam-se:

- **Proteção da vida, saúde e segurança** contra riscos provocados por práticas no fornecimento de produtos e serviços;
- **Educação e divulgação** sobre o consumo adequado de produtos e serviços;
- **Informação adequada e clara** sobre diferentes produtos e serviços, com especificação correta de quantidade, características, composição, qualidade e preço;
- **Proteção contra publicidade enganosa e abusiva**, práticas e cláusulas abusivas;
- **Prevenção e reparação** de danos patrimoniais e morais;
- **Acesso aos órgãos judiciários e administrativos** para prevenção ou reparação de danos.

## Prazo para reclamação

O consumidor possui prazos específicos para registrar reclamações:

- **30 dias** para produtos e serviços não duráveis;
- **90 dias** para produtos e serviços duráveis.

Esses prazos contam a partir da entrega do produto ou do término da execução do serviço.

## Quando procurar orientação jurídica?

Diante de situações como cobranças indevidas, produtos com defeito, descumprimento de oferta ou práticas abusivas, é recomendável buscar orientação jurídica especializada para compreender as opções disponíveis e os caminhos adequados para cada caso.

---

*Este conteúdo possui finalidade exclusivamente informativa e não substitui uma consulta jurídica individualizada. Cada situação deve ser analisada de acordo com suas particularidades.*`,
      categorySlug: "direito-do-consumidor",
      metaTitle:
        "Direitos do Consumidor: entenda o que a lei garante | Escritório Jurídico Modelo",
      metaDescription:
        "Conheça os principais direitos previstos no Código de Defesa do Consumidor e saiba quando buscar orientação jurídica especializada.",
    },
    {
      title: "Planejamento sucessório: por que é importante organizar o patrimônio",
      slug: "planejamento-sucessorio-importancia-organizar-patrimonio",
      excerpt:
        "Entenda o que é planejamento sucessório, suas principais modalidades e por que ele pode trazer mais segurança para famílias e empresas.",
      content: `## O que é planejamento sucessório?

O planejamento sucessório consiste em um conjunto de estratégias jurídicas voltadas à organização antecipada da transmissão de bens e direitos, buscando atender à vontade do titular do patrimônio e proporcionar maior segurança jurídica aos envolvidos.

## Por que considerar o planejamento sucessório?

A ausência de planejamento pode resultar em:

- **Processos de inventário longos e custosos**, que podem levar anos para serem concluídos;
- **Conflitos familiares** decorrentes de divergências sobre a partilha de bens;
- **Impactos tributários** que poderiam ser mitigados com organização prévia;
- **Dificuldades na continuidade de negócios familiares**.

## Principais instrumentos

Existem diversos instrumentos jurídicos que podem ser utilizados no planejamento sucessório, entre eles:

### Testamento
Documento pelo qual uma pessoa dispõe, para depois de sua morte, de parte ou totalidade de seus bens, respeitadas as regras de legítima previstas em lei.

### Doação com reserva de usufruto
Permite a transferência de bens em vida, mantendo o direito de uso e fruição pelo doador enquanto viver.

### Holding familiar
Constituição de pessoa jurídica para organização e gestão do patrimônio familiar, podendo facilitar a administração e a sucessão.

## Cada caso é único

O planejamento sucessório deve ser elaborado de forma personalizada, considerando a composição familiar, o patrimônio existente, a atividade profissional e os objetivos de cada família.

---

*Este conteúdo possui finalidade exclusivamente informativa e não substitui uma consulta jurídica individualizada. Cada situação deve ser analisada de acordo com suas particularidades.*`,
      categorySlug: "direito-civil",
      metaTitle:
        "Planejamento Sucessório: importância e instrumentos | Escritório Jurídico Modelo",
      metaDescription:
        "Entenda o que é planejamento sucessório, os principais instrumentos jurídicos e por que organizar o patrimônio com antecedência.",
    },
    {
      title: "LGPD: o que empresas precisam saber sobre proteção de dados",
      slug: "lgpd-o-que-empresas-precisam-saber-sobre-protecao-de-dados",
      excerpt:
        "A Lei Geral de Proteção de Dados trouxe novas obrigações para empresas que coletam e tratam dados pessoais. Conheça os pontos essenciais.",
      content: `## O que é a LGPD?

A Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018) regulamenta o tratamento de dados pessoais no Brasil, estabelecendo regras claras sobre coleta, armazenamento, uso e compartilhamento dessas informações.

## Quem deve se adequar?

A LGPD se aplica a qualquer pessoa física ou jurídica que realize tratamento de dados pessoais, seja em ambiente digital ou físico. Isso inclui:

- Empresas de todos os portes e segmentos;
- Profissionais liberais;
- Órgãos públicos;
- Organizações sem fins lucrativos.

## Princípios fundamentais

O tratamento de dados pessoais deve observar princípios como:

- **Finalidade**: realização do tratamento para propósitos legítimos, específicos e informados ao titular;
- **Adequação**: compatibilidade do tratamento com as finalidades informadas;
- **Necessidade**: limitação do tratamento ao mínimo necessário;
- **Transparência**: garantia de informações claras sobre o tratamento;
- **Segurança**: utilização de medidas técnicas e administrativas para proteção dos dados.

## Bases legais para tratamento

A LGPD prevê diversas bases legais que autorizam o tratamento de dados pessoais, entre elas:

- Consentimento do titular;
- Cumprimento de obrigação legal ou regulatória;
- Execução de contrato;
- Exercício regular de direitos em processo;
- Legítimo interesse do controlador.

## Direitos do titular

Os titulares dos dados possuem direitos como:

- Confirmação da existência de tratamento;
- Acesso aos dados;
- Correção de dados incompletos ou desatualizados;
- Eliminação de dados desnecessários;
- Portabilidade dos dados;
- Revogação do consentimento.

## Consequências da inadequação

O descumprimento da LGPD pode resultar em sanções administrativas, incluindo advertências, multas e até proibição do tratamento de dados.

---

*Este conteúdo possui finalidade exclusivamente informativa e não substitui uma consulta jurídica individualizada. Cada situação deve ser analisada de acordo com suas particularidades.*`,
      categorySlug: "direito-digital",
      metaTitle:
        "LGPD para Empresas: guia essencial sobre proteção de dados | Escritório Jurídico Modelo",
      metaDescription:
        "Conheça os pontos essenciais da LGPD: princípios, bases legais, direitos do titular e obrigações das empresas no tratamento de dados pessoais.",
    },
  ];

  for (const post of postsData) {
    const categoryId = categories[post.categorySlug] || null;

    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        categoryId,
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        categoryId,
        authorId: adminUser.id,
        status: PostStatus.PUBLICADO,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        publishedAt: new Date(),
      },
    });
  }

  console.log(`✅ ${postsData.length} artigos de exemplo criados/atualizados\n`);

  // ============================================
  // 4. Configurações Iniciais do Site
  // ============================================
  for (const setting of settingsDefinitions) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {
        type: setting.type,
        group: setting.group,
        label: setting.label,
        description: setting.description || null,
      },
      create: {
        key: setting.key,
        value: setting.defaultValue,
        type: setting.type,
        group: setting.group,
        label: setting.label,
        description: setting.description || null,
      },
    });
  }

  console.log(`✅ ${settingsDefinitions.length} configurações do site criadas/atualizadas\n`);

  // ============================================
  // Resumo
  // ============================================
  console.log("🎉 Seed finalizado com sucesso!");
  console.log("──────────────────────────────────────");
  console.log("📧 Admin: admin@escritorio.com.br");
  console.log("🔑 Senha: Admin@123");
  console.log("──────────────────────────────────────");
  console.log("⚠️  Altere a senha do admin após o primeiro acesso!\n");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erro no seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
