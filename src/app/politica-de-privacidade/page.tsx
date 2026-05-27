// ============================================
// Política de Privacidade — LGPD
// ============================================

import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { getWebsiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade e Proteção de Dados Pessoais em conformidade com a LGPD.",
};

export default async function PoliticaPrivacidadePage() {
  const settings = await getWebsiteSettings();

  return (
    <>
      <section className="bg-page surface-grid py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="mb-5 inline-flex rounded-full border border-border bg-white/75 px-3 py-1 text-xs font-semibold text-navy shadow-sm backdrop-blur">
            Documento institucional
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-foreground text-balance sm:text-5xl">
            Política de Privacidade
          </h1>
          <p className="text-muted-foreground">Ultima atualizacao: {settings.privacy_last_updated}</p>
        </div>
      </section>

      <section className="bg-page py-14 sm:py-20">
        <Container size="narrow">
          <div className="rounded-3xl border border-border bg-white/90 p-6 shadow-premium backdrop-blur sm:p-10">
            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-a:text-gold-dark text-muted-foreground">
            <h2>1. Introdução</h2>
            <p>
              O <strong>{settings.office_name}</strong> respeita a sua privacidade e está comprometido
              com a proteção dos dados pessoais coletados por meio deste site, em conformidade
              com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
            </p>

            <h2>2. Dados Pessoais Coletados</h2>
            <p>Coletamos os seguintes dados pessoais quando você preenche nossos formulários:</p>
            <ul>
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone</li>
              <li>Cidade e estado (opcional)</li>
              <li>Tipo de pessoa (física ou jurídica)</li>
              <li>Área jurídica de interesse</li>
              <li>Descrição da situação jurídica</li>
            </ul>
            <p>
              Também coletamos automaticamente dados como endereço IP e informações do
              navegador para fins de segurança e prevenção de fraudes.
            </p>

            <h2>3. Finalidade do Tratamento</h2>
            <p>Os dados pessoais coletados são utilizados exclusivamente para:</p>
            <ul>
              <li>Realizar contato inicial para análise preliminar da demanda jurídica</li>
              <li>Responder a solicitações e dúvidas enviadas pelo formulário</li>
              <li>Manter registro histórico de interações para gestão interna</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>

            <h2>4. Base Legal</h2>
            <p>
              O tratamento dos dados pessoais é realizado com base no consentimento do titular
              (art. 7º, I, da LGPD), manifestado por meio do aceite expresso no formulário
              de contato, e na legítima expectativa do titular ao solicitar atendimento
              jurídico (art. 7º, IX).
            </p>

            <h2>5. Compartilhamento de Dados</h2>
            <p>
              Os dados pessoais <strong>não são compartilhados</strong> com terceiros para fins
              comerciais ou de marketing. O compartilhamento poderá ocorrer apenas:
            </p>
            <ul>
              <li>Para cumprimento de obrigação legal ou regulatória</li>
              <li>Com prestadores de serviços essenciais (hospedagem, e-mail), mediante contratos de proteção de dados</li>
              <li>Mediante autorização expressa do titular</li>
            </ul>

            <h2>6. Retenção dos Dados</h2>
            <p>
              Os dados pessoais são armazenados pelo tempo necessário ao cumprimento da finalidade
              para a qual foram coletados, respeitando os prazos legais aplicáveis. Dados de
              leads que não evoluírem para contrato são eliminados em até 12 meses.
            </p>

            <h2>7. Direitos do Titular</h2>
            <p>Nos termos da LGPD, você tem direito a:</p>
            <ul>
              <li>Confirmar a existência de tratamento de dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a eliminação dos dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
              <li>Solicitar portabilidade dos dados</li>
            </ul>
            <p>
              Para exercer seus direitos, entre em contato pelo e-mail:{" "}
              <a href={`mailto:${settings.contact_email}`} className="text-gold hover:underline">
                {settings.contact_email}
              </a>
            </p>

            <h2>8. Segurança</h2>
            <p>
              Adotamos medidas técnicas e administrativas para proteger seus dados pessoais
              contra acessos não autorizados, alteração, divulgação ou destruição não autorizada,
              incluindo criptografia em trânsito (HTTPS), controle de acesso e monitoramento.
            </p>

            <h2>9. Cookies</h2>
            <p>
              Este site utiliza cookies essenciais para funcionamento e cookies analíticos
              para melhorar a experiência do usuário. Você pode desativar cookies nas
              configurações do seu navegador, mas isso pode afetar o funcionamento do site.
            </p>

            <h2>10. Alterações nesta Política</h2>
            <p>
              Esta Política de Privacidade poderá ser atualizada periodicamente. Alterações
              significativas serão comunicadas por meio deste site.
            </p>

            <h2>11. Contato</h2>
            <p>
              Para dúvidas sobre esta política ou sobre o tratamento de dados pessoais,
              entre em contato:
            </p>
            <ul>
              <li>E-mail: {settings.contact_email}</li>
              <li>Telefone: {settings.phone}</li>
              <li>
                Endereço: {settings.address},{" "}
                {settings.city}/{settings.state}
              </li>
            </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
