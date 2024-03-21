import Link from "next/link";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import ExampleClientComponent from "@/components/ExaplmeClientComponent";

const i18nNamespaces = ["home"];

async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <main>
      <h1>{t("hello")}</h1>

      <Link href="/about">{t("hello")}</Link>
      <ExampleClientComponent />
    </main>
  );
}

export default Home;
