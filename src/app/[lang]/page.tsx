import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import ProcessSection from "@/components/ProcessSection";
import Products from "@/components/Products";
import Teaser from "@/components/Teaser";
import Testimonials from "@/components/Testimonials";
import { getTranslation } from "@/i18n/server";
import { languages } from "@/i18n/settings";
import { Metadata } from "next";

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const { t } = await getTranslation(lang, "translation");
  return {
    title: `Quanor - ${t('hero.title')} `,
    description: t('hero.subtitle'),
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <>
      <Hero lang={lang} />
      <ProcessSection lang={lang} />
      <Teaser lang={lang} />
      <Products lang={lang} />
      <Testimonials lang={lang} />
      <About lang={lang} />
      <Contact lang={lang} />
    </>
  );
}


