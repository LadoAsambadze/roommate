import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";

const i18nNamespaces = ["home"];

async function About({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <main>
      <h1>{t("hello")}</h1>
    </main>
  );
}

export default About;
