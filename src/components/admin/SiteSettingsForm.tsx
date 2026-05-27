"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { SettingsSection } from "@/components/admin/SettingsSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  settingGroups,
  settingsDefinitions,
  type WebsiteSettings,
} from "@/lib/site-settings-schema";

interface SiteSettingsFormProps {
  initialSettings: WebsiteSettings;
}

export function SiteSettingsForm({ initialSettings }: SiteSettingsFormProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const groupedSettings = useMemo(
    () =>
      settingGroups.map((group) => ({
        ...group,
        settings: settingsDefinitions.filter(
          (setting) => setting.group === group.id
        ),
      })),
    []
  );

  function updateValue(key: keyof WebsiteSettings, value: string) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Não foi possível salvar.");
        return;
      }

      toast.success(result.message || "Configurações atualizadas.");
    } catch {
      toast.error("Erro de conexão ao salvar configurações.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[260px_1fr]">
      <aside className="xl:sticky xl:top-28 xl:self-start">
        <div className="rounded-2xl border border-border/80 bg-white/90 p-3 shadow-premium backdrop-blur">
          <p className="px-2 pb-3 text-xs font-semibold uppercase text-muted-foreground">
            Seções
          </p>
          <nav className="space-y-1">
            {groupedSettings.map((group) => (
              <a
                key={group.id}
                href={`#settings-${group.id}`}
                className="block rounded-xl px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-mist"
              >
                {group.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <div className="space-y-6">
        <div className="sticky top-[73px] z-20 rounded-2xl border border-border/80 bg-white/90 p-4 shadow-premium backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Central de configuração do site
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Alterações alimentam páginas públicas, SEO, contato, blog e
                rodapé.
              </p>
            </div>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <Save className="mr-2 size-4" />
              )}
              Salvar configurações
            </Button>
          </div>
        </div>

        {groupedSettings.map((group) => (
          <SettingsSection
            key={group.id}
            id={`settings-${group.id}`}
            title={group.label}
            description={group.description}
            className="scroll-mt-28"
          >
            <div className="grid gap-5 md:grid-cols-2">
              {group.settings.map((setting) => {
                const value = settings[setting.key as keyof WebsiteSettings] || "";
                const fieldId = `setting-${setting.key}`;
                const isTextarea = setting.type === "textarea";

                return (
                  <div
                    key={setting.key}
                    className={isTextarea ? "space-y-2 md:col-span-2" : "space-y-2"}
                  >
                    <Label htmlFor={fieldId} className="font-semibold">
                      {setting.label}
                    </Label>
                    {setting.description && (
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {setting.description}
                      </p>
                    )}
                    {isTextarea ? (
                      <Textarea
                        id={fieldId}
                        value={value}
                        rows={setting.key.includes("content") ? 8 : 4}
                        onChange={(event) =>
                          updateValue(
                            setting.key as keyof WebsiteSettings,
                            event.target.value
                          )
                        }
                      />
                    ) : (
                      <Input
                        id={fieldId}
                        value={value}
                        type={
                          setting.type === "email" ||
                          setting.type === "url" ||
                          setting.type === "tel"
                            ? setting.type
                            : "text"
                        }
                        onChange={(event) =>
                          updateValue(
                            setting.key as keyof WebsiteSettings,
                            event.target.value
                          )
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </SettingsSection>
        ))}
      </div>
    </form>
  );
}
