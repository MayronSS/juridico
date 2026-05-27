// ============================================
// Home — Página Principal Completa
// ============================================

import { HeroSection } from "@/components/sections/HeroSection";
import { AreasSection } from "@/components/sections/AreasSection";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { getWebsiteSettings } from "@/lib/site-settings";

export default async function HomePage() {
  const settings = await getWebsiteSettings();

  return (
    <>
      <HeroSection settings={settings} />
      <AreasSection />
      <AboutPreviewSection settings={settings} />
      <HowItWorksSection />
      <BlogPreviewSection settings={settings} />
      <FaqSection />
      <FinalCtaSection settings={settings} />
    </>
  );
}
