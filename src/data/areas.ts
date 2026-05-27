// ============================================
// Dados Estáticos — Áreas de Atuação
// ============================================

import type { LegalArea } from "@/types";

export const legalAreas: LegalArea[] = [
  {
    name: "Direito Civil",
    slug: "direito-civil",
    icon: "Scale",
    shortDescription:
      "Orientação em questões contratuais, responsabilidade civil, obrigações e direitos patrimoniais.",
    fullDescription:
      "O Direito Civil abrange diversas questões do cotidiano, desde relações contratuais até responsabilidade por danos. Nosso escritório oferece orientação técnica para análise de situações envolvendo contratos, obrigações, direitos reais, sucessões e responsabilidade civil, sempre com atendimento individualizado.",
    demands: [
      "Elaboração e revisão de contratos",
      "Ações de indenização por danos morais e materiais",
      "Questões de responsabilidade civil",
      "Planejamento sucessório e inventário",
      "Cobrança e execução de dívidas",
      "Direitos de vizinhança e questões condominiais",
    ],
    howWeHelp:
      "Realizamos análise detalhada de cada situação para identificar as melhores estratégias jurídicas, sempre com transparência e clareza na comunicação com o cliente.",
    faq: [
      {
        question: "O que é responsabilidade civil?",
        answer:
          "É a obrigação de reparar um dano causado a outra pessoa, seja ele material ou moral. A responsabilidade pode ser contratual (decorrente de um contrato) ou extracontratual (independente de contrato).",
      },
      {
        question: "Quando devo procurar um advogado para questões cíveis?",
        answer:
          "Recomenda-se buscar orientação jurídica sempre que houver uma situação envolvendo contratos, danos, cobranças, heranças ou qualquer questão patrimonial que demande análise técnica especializada.",
      },
      {
        question: "Quanto tempo leva um processo civil?",
        answer:
          "O tempo varia conforme a complexidade do caso, a comarca e o tipo de procedimento. É importante que cada caso seja analisado individualmente para uma estimativa mais precisa.",
      },
    ],
  },
  {
    name: "Direito Trabalhista",
    slug: "direito-trabalhista",
    icon: "Briefcase",
    shortDescription:
      "Atuação em relações de trabalho, direitos do trabalhador e do empregador.",
    fullDescription:
      "O Direito do Trabalho regula as relações entre empregadores e empregados. Nosso escritório oferece orientação tanto para trabalhadores quanto para empresas em questões trabalhistas, buscando soluções equilibradas e fundamentadas na legislação vigente.",
    demands: [
      "Análise de verbas rescisórias",
      "Questões sobre jornada de trabalho e horas extras",
      "Assédio moral e sexual no ambiente de trabalho",
      "Acidentes de trabalho e doenças ocupacionais",
      "Orientação para empregadores sobre compliance trabalhista",
      "Negociações e acordos trabalhistas",
    ],
    howWeHelp:
      "Analisamos cada situação com base na CLT e na jurisprudência atualizada, orientando sobre direitos e obrigações de ambas as partes da relação de trabalho.",
    faq: [
      {
        question: "Quais são meus direitos ao ser demitido sem justa causa?",
        answer:
          "Na demissão sem justa causa, o trabalhador tem direito a diversas verbas rescisórias previstas em lei, como aviso prévio, saldo de salário, férias proporcionais, 13º proporcional, multa do FGTS, entre outros. Cada caso deve ser analisado individualmente.",
      },
      {
        question: "Qual o prazo para entrar com ação trabalhista?",
        answer:
          "De modo geral, o trabalhador tem até 2 anos após o fim do contrato de trabalho para ajuizar a ação, podendo pleitear direitos dos últimos 5 anos da relação de trabalho.",
      },
      {
        question: "A empresa pode alterar meu contrato de trabalho?",
        answer:
          "Alterações contratuais devem observar limites legais. De forma geral, alterações prejudiciais ao trabalhador não são permitidas, exceto em situações específicas previstas em lei ou norma coletiva.",
      },
    ],
  },
  {
    name: "Direito Previdenciário",
    slug: "direito-previdenciario",
    icon: "Shield",
    shortDescription:
      "Orientação sobre aposentadoria, benefícios do INSS e planejamento previdenciário.",
    fullDescription:
      "O Direito Previdenciário trata dos benefícios oferecidos pela Previdência Social. Nosso escritório auxilia segurados na análise de elegibilidade para aposentadorias e demais benefícios, bem como em processos administrativos e judiciais junto ao INSS.",
    demands: [
      "Aposentadoria por idade, tempo de contribuição e especial",
      "Auxílio-doença e aposentadoria por invalidez",
      "Pensão por morte e auxílio-reclusão",
      "Benefício de Prestação Continuada (BPC/LOAS)",
      "Revisão de benefícios",
      "Planejamento previdenciário",
    ],
    howWeHelp:
      "Realizamos análise completa do histórico previdenciário do segurado, identificando possibilidades e orientando sobre os caminhos mais adequados para cada situação.",
    faq: [
      {
        question: "Quando posso me aposentar?",
        answer:
          "Os requisitos para aposentadoria variam conforme a modalidade e as regras de transição aplicáveis. É necessário analisar o tempo de contribuição, idade e demais critérios individualmente.",
      },
      {
        question: "Tive meu benefício negado pelo INSS. O que fazer?",
        answer:
          "É possível apresentar recurso administrativo ou buscar a via judicial. Cada caso deve ser avaliado para identificar a melhor estratégia conforme os fundamentos da negativa.",
      },
      {
        question: "O que é planejamento previdenciário?",
        answer:
          "É a análise antecipada das contribuições e da situação previdenciária do segurado, permitindo identificar o melhor momento e modalidade de aposentadoria.",
      },
    ],
  },
  {
    name: "Direito de Família",
    slug: "direito-de-familia",
    icon: "Heart",
    shortDescription:
      "Atuação em divórcio, guarda, pensão alimentícia e questões familiares.",
    fullDescription:
      "O Direito de Família envolve questões sensíveis que demandam acolhimento e técnica jurídica. Nosso escritório atua com discrição e profissionalismo em questões familiares, buscando soluções que preservem o bem-estar de todos os envolvidos.",
    demands: [
      "Divórcio consensual e litigioso",
      "Guarda compartilhada e unilateral",
      "Pensão alimentícia",
      "Reconhecimento e dissolução de união estável",
      "Investigação de paternidade",
      "Adoção e destituição do poder familiar",
    ],
    howWeHelp:
      "Priorizamos a resolução consensual sempre que possível, com atendimento acolhedor e orientação clara sobre direitos e deveres de cada parte.",
    faq: [
      {
        question: "Qual a diferença entre divórcio consensual e litigioso?",
        answer:
          "No divórcio consensual, ambas as partes concordam com os termos da separação. No litigioso, existem divergências que precisam ser resolvidas judicialmente.",
      },
      {
        question: "Como funciona a pensão alimentícia?",
        answer:
          "A pensão é fixada com base na necessidade de quem recebe e na possibilidade de quem paga. O valor é definido caso a caso, considerando as circunstâncias específicas.",
      },
      {
        question: "O que é guarda compartilhada?",
        answer:
          "É a modalidade em que ambos os genitores exercem conjuntamente as responsabilidades e decisões sobre a vida dos filhos, independentemente de com quem a criança resida.",
      },
    ],
  },
  {
    name: "Direito do Consumidor",
    slug: "direito-do-consumidor",
    icon: "ShoppingBag",
    shortDescription:
      "Defesa dos direitos do consumidor em relações de consumo.",
    fullDescription:
      "O Código de Defesa do Consumidor protege os direitos nas relações de consumo. Nosso escritório orienta consumidores em situações de práticas abusivas, cobranças indevidas, produtos com defeito e demais questões consumeristas.",
    demands: [
      "Cobranças indevidas e negativação indevida",
      "Produtos com defeito ou serviços mal prestados",
      "Descumprimento de oferta e publicidade enganosa",
      "Problemas com compras online",
      "Questões bancárias e financeiras",
      "Planos de saúde",
    ],
    howWeHelp:
      "Analisamos a situação do consumidor à luz da legislação aplicável, orientando sobre os direitos e as medidas cabíveis para cada caso.",
    faq: [
      {
        question: "Fui negativado indevidamente. O que posso fazer?",
        answer:
          "A negativação indevida pode gerar direito à reparação por danos morais e materiais. É importante reunir documentos que comprovem a irregularidade para análise jurídica.",
      },
      {
        question: "Qual o prazo para trocar um produto com defeito?",
        answer:
          "Para produtos não duráveis, o prazo é de 30 dias; para duráveis, 90 dias. O fornecedor tem 30 dias para resolver o problema após a reclamação.",
      },
      {
        question: "O que é vício oculto?",
        answer:
          "É um defeito que não é perceptível no momento da aquisição e se manifesta posteriormente. O prazo para reclamação começa a contar a partir da constatação do defeito.",
      },
    ],
  },
  {
    name: "Direito Empresarial",
    slug: "direito-empresarial",
    icon: "Building2",
    shortDescription:
      "Assessoria para empresas em questões societárias, contratuais e de compliance.",
    fullDescription:
      "O Direito Empresarial envolve todas as questões jurídicas relacionadas à atividade empresarial. Nosso escritório oferece assessoria para empresas de todos os portes, desde a constituição até questões complexas de governança e compliance.",
    demands: [
      "Constituição e alteração de empresas",
      "Elaboração de contratos empresariais",
      "Recuperação judicial e falência",
      "Questões societárias e conflitos entre sócios",
      "Compliance e governança corporativa",
      "Due diligence em aquisições e fusões",
    ],
    howWeHelp:
      "Oferecemos assessoria jurídica preventiva e estratégica, auxiliando na tomada de decisões e na mitigação de riscos empresariais.",
    faq: [
      {
        question: "Qual o melhor tipo societário para minha empresa?",
        answer:
          "A escolha depende de fatores como porte da empresa, número de sócios, atividade exercida e planejamento tributário. Cada caso requer análise individualizada.",
      },
      {
        question: "O que é compliance empresarial?",
        answer:
          "São práticas e políticas adotadas pela empresa para garantir conformidade com leis, regulamentos e normas internas, reduzindo riscos legais e reputacionais.",
      },
      {
        question: "Como resolver conflitos entre sócios?",
        answer:
          "Existem diversas vias, como mediação, arbitragem e dissolução parcial da sociedade. A melhor abordagem depende da natureza do conflito e do contrato social vigente.",
      },
    ],
  },
  {
    name: "Direito Imobiliário",
    slug: "direito-imobiliario",
    icon: "Home",
    shortDescription:
      "Orientação em compra, venda, locação e questões registrais de imóveis.",
    fullDescription:
      "O Direito Imobiliário abrange todas as questões jurídicas relacionadas a bens imóveis. Nosso escritório assessora em transações imobiliárias, contratos de locação, questões registrais e conflitos envolvendo propriedades.",
    demands: [
      "Compra e venda de imóveis",
      "Contratos de locação",
      "Usucapião",
      "Questões de condomínio",
      "Regularização de imóveis",
      "Due diligence imobiliária",
    ],
    howWeHelp:
      "Realizamos análise documental completa, orientamos sobre riscos e auxiliamos em todas as etapas das transações imobiliárias.",
    faq: [
      {
        question: "O que verificar antes de comprar um imóvel?",
        answer:
          "É essencial analisar a matrícula atualizada, certidões negativas do vendedor, regularidade fiscal do imóvel e eventual existência de ônus ou gravames.",
      },
      {
        question: "O que é usucapião?",
        answer:
          "É uma forma de aquisição de propriedade pela posse prolongada do imóvel, desde que cumpridos os requisitos legais específicos de cada modalidade.",
      },
      {
        question: "Quais são os direitos do inquilino?",
        answer:
          "A Lei do Inquilinato (Lei 8.245/91) estabelece diversos direitos, como preferência na compra do imóvel, garantia de moradia e limites para reajustes e denúncia do contrato.",
      },
    ],
  },
  {
    name: "Direito Tributário",
    slug: "direito-tributario",
    icon: "Receipt",
    shortDescription:
      "Assessoria em questões fiscais, planejamento tributário e defesa administrativa.",
    fullDescription:
      "O Direito Tributário trata das relações entre contribuintes e o fisco. Nosso escritório oferece orientação em planejamento tributário, defesa administrativa e judicial em matéria fiscal, buscando eficiência e conformidade.",
    demands: [
      "Planejamento tributário",
      "Defesa em processos administrativos fiscais",
      "Recuperação de tributos pagos indevidamente",
      "Consultoria sobre regimes tributários",
      "Parcelamento de débitos fiscais",
      "Análise de incentivos fiscais",
    ],
    howWeHelp:
      "Oferecemos análise técnica das obrigações tributárias, identificando oportunidades legais de redução da carga tributária e estratégias de defesa.",
    faq: [
      {
        question: "O que é planejamento tributário?",
        answer:
          "É a organização da atividade empresarial ou profissional visando a otimização da carga tributária por meios legais, dentro dos limites previstos na legislação.",
      },
      {
        question: "Posso recuperar tributos pagos a mais?",
        answer:
          "Sim, em determinadas situações é possível requerer a restituição ou compensação de valores recolhidos indevidamente ou a maior, respeitados os prazos legais.",
      },
      {
        question: "Qual regime tributário é melhor para minha empresa?",
        answer:
          "A escolha entre Simples Nacional, Lucro Presumido e Lucro Real depende do faturamento, atividade e estrutura de custos da empresa. Cada caso exige análise específica.",
      },
    ],
  },
  {
    name: "Direito Digital",
    slug: "direito-digital",
    icon: "Monitor",
    shortDescription:
      "Proteção de dados, LGPD, crimes digitais e contratos eletrônicos.",
    fullDescription:
      "O Direito Digital abrange as questões jurídicas relacionadas ao uso de tecnologia e à internet. Nosso escritório orienta sobre proteção de dados, adequação à LGPD, crimes cibernéticos e contratos eletrônicos.",
    demands: [
      "Adequação à LGPD",
      "Crimes cibernéticos e golpes digitais",
      "Contratos de tecnologia e SaaS",
      "Remoção de conteúdo da internet",
      "Proteção de dados pessoais",
      "Termos de uso e políticas de privacidade",
    ],
    howWeHelp:
      "Oferecemos orientação especializada na interface entre direito e tecnologia, auxiliando pessoas e empresas a navegarem o ambiente digital com segurança jurídica.",
    faq: [
      {
        question: "O que é a LGPD?",
        answer:
          "A Lei Geral de Proteção de Dados (Lei 13.709/2018) regulamenta o tratamento de dados pessoais no Brasil, estabelecendo direitos dos titulares e obrigações para quem coleta e trata dados.",
      },
      {
        question: "Fui vítima de golpe na internet. O que fazer?",
        answer:
          "É importante registrar boletim de ocorrência, preservar todas as evidências (prints, e-mails, comprovantes) e buscar orientação jurídica para avaliar as medidas cabíveis.",
      },
      {
        question: "Minha empresa precisa se adequar à LGPD?",
        answer:
          "Sim, toda empresa que coleta ou trata dados pessoais precisa se adequar à LGPD, independentemente do porte. A adequação envolve medidas técnicas, organizacionais e jurídicas.",
      },
    ],
  },
  {
    name: "Direito Contratual",
    slug: "direito-contratual",
    icon: "FileText",
    shortDescription:
      "Elaboração, revisão e análise de contratos de todas as naturezas.",
    fullDescription:
      "O Direito Contratual é fundamental nas relações jurídicas, garantindo segurança para todas as partes envolvidas. Nosso escritório atua na elaboração, revisão e análise de contratos, assegurando clareza e proteção jurídica.",
    demands: [
      "Elaboração de contratos personalizados",
      "Revisão e análise de contratos existentes",
      "Contratos de prestação de serviços",
      "Contratos de parceria e joint ventures",
      "Distratos e rescisões contratuais",
      "Cláusulas especiais e penalidades",
    ],
    howWeHelp:
      "Elaboramos e revisamos contratos com linguagem clara e juridicamente precisa, garantindo que os interesses das partes estejam devidamente protegidos.",
    faq: [
      {
        question: "Por que preciso de um advogado para elaborar um contrato?",
        answer:
          "Um contrato bem elaborado previne litígios futuros, protege os interesses das partes e garante segurança jurídica. Modelos genéricos podem não atender às particularidades de cada situação.",
      },
      {
        question: "Posso alterar um contrato depois de assinado?",
        answer:
          "Sim, por meio de aditivos contratuais, desde que haja concordância entre as partes. Alterações unilaterais podem caracterizar descumprimento contratual.",
      },
      {
        question: "O que acontece se uma das partes descumprir o contrato?",
        answer:
          "O descumprimento pode gerar obrigação de indenizar, aplicação de multas previstas no contrato e possibilidade de rescisão, conforme as cláusulas acordadas e a legislação aplicável.",
      },
    ],
  },
];
