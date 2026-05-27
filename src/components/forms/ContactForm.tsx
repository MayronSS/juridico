// ============================================
// Formulário de Contato — React Hook Form + Zod
// ============================================
"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  contactFormSchema,
  type ContactFormData,
  LEGAL_AREAS,
  PERSON_TYPES,
  BRAZILIAN_STATES,
} from "@/lib/validations";
import Link from "next/link";

export function ContactForm({
  disclaimerText,
}: {
  disclaimerText?: string;
}) {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      personType: "FISICA",
      city: "",
      state: "",
      legalArea: "",
      message: "",
      lgpdAccepted: false,
    },
  });

  const lgpdAccepted = useWatch({
    control,
    name: "lgpdAccepted",
  });

  async function onSubmit(data: ContactFormData) {
    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Limite de envios atingido", {
            description: result.error,
          });
        } else if (response.status === 400 && result.errors) {
          result.errors.forEach(
            (err: { field: string; message: string }) => {
              toast.error(`Erro em ${err.field}`, {
                description: err.message,
              });
            }
          );
        } else {
          toast.error("Erro ao enviar", {
            description: result.error || "Tente novamente.",
          });
        }
        return;
      }

      setIsSuccess(true);
      reset();
      toast.success("Mensagem enviada!", {
        description: result.message,
      });
    } catch {
      toast.error("Erro de conexão", {
        description: "Verifique sua internet e tente novamente.",
      });
    }
  }

  // Tela de sucesso
  if (isSuccess) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/90 px-6 py-12 text-center shadow-premium">
        <div className="mb-6 inline-flex rounded-full bg-emerald-600 p-4 text-white">
          <CheckCircle2 className="size-10" />
        </div>
        <h3 className="mb-4 text-2xl font-semibold leading-tight text-foreground">
          Mensagem enviada com sucesso!
        </h3>
        <p className="mx-auto mb-6 max-w-md text-muted-foreground">
          Recebemos sua mensagem e entraremos em contato pelos canais informados.
          Agradecemos pela confiança.
        </p>
        <p className="mb-8 text-xs text-muted-foreground">
          O envio desta mensagem não cria automaticamente uma relação advogado-cliente.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsSuccess(false)}
        >
          Enviar nova mensagem
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nome */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Nome completo <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Seu nome completo"
          {...register("name")}
          className={cn(errors.name && "border-destructive")}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email + Telefone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">
            E-mail <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register("email")}
            className={cn(errors.email && "border-destructive")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">
            Telefone (com DDD) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(00) 00000-0000"
            {...register("phone")}
            className={cn(errors.phone && "border-destructive")}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Tipo de pessoa */}
      <div className="space-y-2">
        <Label>
          Tipo de pessoa <span className="text-destructive">*</span>
        </Label>
        <Select
          defaultValue="FISICA"
          onValueChange={(value) =>
            setValue("personType", value as "FISICA" | "JURIDICA")
          }
        >
          <SelectTrigger className={cn("w-full", errors.personType && "border-destructive")}>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {PERSON_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.personType && (
          <p className="text-sm text-destructive">{errors.personType.message}</p>
        )}
      </div>

      {/* Cidade + Estado */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            placeholder="Sua cidade"
            {...register("city")}
          />
        </div>
        <div className="space-y-2">
          <Label>Estado (UF)</Label>
          <Select
            onValueChange={(value) => setValue("state", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {BRAZILIAN_STATES.map((uf) => (
                <SelectItem key={uf} value={uf}>
                  {uf}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Área jurídica */}
      <div className="space-y-2">
        <Label>
          Área jurídica de interesse <span className="text-destructive">*</span>
        </Label>
        <Select onValueChange={(value) => setValue("legalArea", value)}>
          <SelectTrigger className={cn("w-full", errors.legalArea && "border-destructive")}>
            <SelectValue placeholder="Selecione a área" />
          </SelectTrigger>
          <SelectContent>
            {LEGAL_AREAS.map((area) => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.legalArea && (
          <p className="text-sm text-destructive">{errors.legalArea.message}</p>
        )}
      </div>

      {/* Mensagem */}
      <div className="space-y-2">
        <Label htmlFor="message">
          Descreva brevemente sua situação{" "}
          <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Descreva sua situação de forma breve. Não inclua dados sensíveis como senhas ou documentos completos."
          rows={5}
          {...register("message")}
          className={cn(errors.message && "border-destructive")}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      {/* Checkbox LGPD */}
      <div className="space-y-2">
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface-soft p-4">
          <Checkbox
            id="lgpdAccepted"
            checked={lgpdAccepted === true}
            onCheckedChange={(checked: boolean | "indeterminate") =>
              setValue("lgpdAccepted", checked === true)
            }
            className="mt-0.5"
          />
          <label
            htmlFor="lgpdAccepted"
            className="block text-sm text-muted-foreground leading-relaxed cursor-pointer font-normal"
          >
            Declaro que li e aceito a{" "}
            <Link
              href="/politica-de-privacidade"
              target="_blank"
              className="text-gold hover:underline font-medium"
            >
              Política de Privacidade
            </Link>{" "}
            e autorizo o tratamento dos meus dados pessoais para fins de contato
            jurídico, nos termos da LGPD (Lei nº 13.709/2018).{" "}
            <span className="text-destructive">*</span>
          </label>
        </div>
        {errors.lgpdAccepted && (
          <p className="text-sm text-destructive">
            {errors.lgpdAccepted.message}
          </p>
        )}
      </div>

      {/* Aviso jurídico */}
      <div className="rounded-2xl border border-border bg-surface-soft p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Aviso importante:</strong>{" "}
          {disclaimerText ||
            "O envio deste formulário não cria automaticamente uma relação advogado-cliente. As informações aqui compartilhadas serão utilizadas exclusivamente para análise preliminar e posterior contato. Não inclua documentos ou dados sensíveis neste campo."}
        </p>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Enviar Mensagem
          </>
        )}
      </Button>
    </form>
  );
}
