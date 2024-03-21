import Link from "next/link";
import initTranslations from "../i18n";

import ExampleClientComponent from "@/components/ExaplmeClientComponent";
import { BankIcon } from "@/components/svg";

const i18nNamespaces = ["home"];

async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <main>
      <h1>{t("hello")}</h1>

      <Link href="/about">{t("hello")}</Link>
      <ExampleClientComponent />
      <div className="w-20 h-20 flex items-center justify-center">
        <BankIcon className="" />
      </div>
    </main>
  );
}

export default Home;
