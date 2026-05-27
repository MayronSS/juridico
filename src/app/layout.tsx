import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getDefaultMetadata, getLegalServiceSchema } from "@/lib/seo";
import { getWebsiteSettings } from "@/lib/site-settings";
import { auth } from "@/lib/auth";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWebsiteSettings();
  return getDefaultMetadata(settings);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, settings] = await Promise.all([auth(), getWebsiteSettings()]);
  const userRole = session?.user?.role;

  return (
    <html
      lang="pt-BR"
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-page">
        <ClerkProvider localization={ptBR}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(getLegalServiceSchema(settings)),
            }}
          />
          <Header userRole={userRole} settings={settings} />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
          <WhatsAppButton
            number={settings.whatsapp_number}
            message={settings.whatsapp_message}
          />
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              duration: 5000,
            }}
          />
        </ClerkProvider>
      </body>
    </html>
  );
}
