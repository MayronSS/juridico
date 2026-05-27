import { redirect } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { auth } from "@/lib/auth";
import { getWebsiteSettings } from "@/lib/site-settings";

export default async function ConfiguracoesPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/admin");
  }

  const settings = await getWebsiteSettings();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <AdminPageHeader
        eyebrow="Central do site"
        title="Configurações"
        description="Edite informações institucionais, SEO, home, contato, blog, cabeçalho e rodapé sem alterar código."
      />
      <SiteSettingsForm initialSettings={settings} />
    </div>
  );
}
