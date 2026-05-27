// ============================================
// Termos de Uso
// ============================================

import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { getWebsiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos e condições de uso do site.",
};

export default async function TermosDeUsoPage() {
  const settings = await getWebsiteSettings();

  return (
    <>
      <section className="bg-page surface-grid py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="mb-5 inline-flex rounded-full border border-border bg-white/75 px-3 py-1 text-xs font-semibold text-navy shadow-sm backdrop-blur">
            Documento institucional
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-foreground text-balance sm:text-5xl">
            Termos de Uso
          </h1>
          <p className="text-muted-foreground">Ultima atualizacao: {settings.terms_last_updated}</p>
        </div>
      </section>

      <section className="bg-page py-14 sm:py-20">
        <Container size="narrow">
          <div className="rounded-3xl border border-border bg-white/90 p-6 shadow-premium backdrop-blur sm:p-10">
            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-a:text-gold-dark text-muted-foreground">
            <h2>1. Sobre Este Site</h2>
            <p>
              Este site é de propriedade e operado pelo <strong>{settings.office_name}</strong>,
              com sede em {settings.city}/{settings.state}.
              Ao acessar e utilizar este site, você concorda com os termos aqui estabelecidos.
            </p>

            <h2>2. Natureza Informativa</h2>
            <p>
              Todo o conteúdo disponibilizado neste site — incluindo artigos, textos
              sobre áreas de atuação e materiais informativos — possui caráter exclusivamente
              informativo e educativo. <strong>Nenhum conteúdo substitui a consulta jurídica
              individualizada</strong> a um profissional habilitado.
            </p>

            <h2>3. Ausência de Relação Advogado-Cliente</h2>
            <p>
              O acesso a este site, o envio de formulários ou mensagens, e a leitura de
              conteúdos <strong>não criam, por si só, uma relação advogado-cliente</strong>.
              Essa relação somente se constitui após a formalização de contrato de prestação
              de serviços jurídicos.
            </p>

            <h2>4. Publicidade e Ética</h2>
            <p>
              Este site foi desenvolvido em conformidade com as normas de publicidade
              profissional da advocacia brasileira, especialmente:
            </p>
            <ul>
              <li>Código de Ética e Disciplina da OAB (Resolução nº 02/2015)</li>
              <li>Provimento nº 205/2021 do Conselho Federal da OAB</li>
              <li>Estatuto da Advocacia (Lei nº 8.906/1994)</li>
            </ul>
            <p>
              Não realizamos captação ativa de clientela, não utilizamos linguagem
              apelativa e não prometemos resultados em qualquer situação.
            </p>

            <h2>5. Propriedade Intelectual</h2>
            <p>
              Todos os textos, imagens, logotipos e demais conteúdos presentes neste site
              são protegidos por direitos autorais. A reprodução total ou parcial depende
              de autorização prévia e expressa, com a devida atribuição de crédito.
            </p>

            <h2>6. Formulários e Dados</h2>
            <p>
              Ao preencher formulários neste site, você declara que as informações fornecidas
              são verdadeiras e que concorda com a nossa{" "}
              <a href="/politica-de-privacidade" className="text-gold hover:underline">
                Política de Privacidade
              </a>.
            </p>

            <h2>7. Responsabilidade</h2>
            <p>
              O {settings.office_name} não se responsabiliza por decisões tomadas com base
              exclusivamente nas informações gerais disponíveis neste site. Cada caso
              jurídico possui particularidades que exigem análise profissional detalhada.
            </p>

            <h2>8. Links Externos</h2>
            <p>
              Este site pode conter links para sites de terceiros. Não nos responsabilizamos
              pelo conteúdo, políticas ou práticas de sites externos.
            </p>

            <h2>9. Alterações</h2>
            <p>
              Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento,
              sendo que as alterações entram em vigor imediatamente após publicação nesta página.
            </p>

            <h2>10. Contato</h2>
            <p>
              Para dúvidas sobre estes termos:
            </p>
            <ul>
              <li>E-mail: {settings.contact_email}</li>
              <li>Telefone: {settings.phone}</li>
            </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
