import { prisma } from "@/lib/prisma";
import {
  defaultWebsiteSettings,
  getSettingDefinition,
  settingsDefinitions,
  type SettingKey,
  type WebsiteSettings,
} from "@/lib/site-settings-schema";

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  try {
    const settings = await prisma.siteSetting.findMany({
      select: {
        key: true,
        value: true,
      },
    });

    return settings.reduce(
      (acc, setting) => {
        if (setting.key in acc) {
          acc[setting.key as SettingKey] = setting.value;
        }
        return acc;
      },
      { ...defaultWebsiteSettings }
    );
  } catch {
    return { ...defaultWebsiteSettings };
  }
}

export async function upsertWebsiteSettings(
  values: Partial<Record<SettingKey, string>>
) {
  const entries = Object.entries(values).filter(([key]) =>
    Boolean(getSettingDefinition(key))
  ) as [SettingKey, string][];

  if (entries.length === 0) return;

  await prisma.$transaction(
    entries.map(([key, value]) => {
      const definition = getSettingDefinition(key)!;

      return prisma.siteSetting.upsert({
        where: { key },
        update: {
          value,
          type: definition.type,
          group: definition.group,
          label: definition.label,
          description: definition.description || null,
        },
        create: {
          key,
          value,
          type: definition.type,
          group: definition.group,
          label: definition.label,
          description: definition.description || null,
        },
      });
    })
  );
}

export async function ensureWebsiteSettings() {
  const existing = await prisma.siteSetting.findMany({
    select: { key: true },
  });
  const existingKeys = new Set(existing.map((setting) => setting.key));

  const missing = settingsDefinitions.filter(
    (setting) => !existingKeys.has(setting.key)
  );

  if (missing.length === 0) return;

  await upsertWebsiteSettings(
    missing.reduce(
      (acc, setting) => {
        acc[setting.key as SettingKey] = setting.defaultValue;
        return acc;
      },
      {} as Partial<Record<SettingKey, string>>
    )
  );
}
