import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { upsertWebsiteSettings } from "@/lib/site-settings";
import { getSettingDefinition, type SettingKey } from "@/lib/site-settings-schema";
import { websiteSettingsUpdateSchema } from "@/lib/validations";

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Permissao insuficiente." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = websiteSettingsUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados invalidos.", errors: parsed.error.issues },
        { status: 400 }
      );
    }

    const values = Object.entries(parsed.data.settings).reduce(
      (acc, [key, value]) => {
        if (getSettingDefinition(key)) {
          acc[key as SettingKey] = value.trim();
        }
        return acc;
      },
      {} as Partial<Record<SettingKey, string>>
    );

    await upsertWebsiteSettings(values);

    revalidatePath("/", "layout");
    revalidatePath("/sobre");
    revalidatePath("/contato");
    revalidatePath("/blog");
    revalidatePath("/politica-de-privacidade");
    revalidatePath("/termos-de-uso");

    return NextResponse.json({
      success: true,
      message: "Configuracoes do site atualizadas.",
    });
  } catch (error) {
    console.error("Erro ao atualizar configuracoes do site:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
