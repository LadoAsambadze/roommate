import i18nConfig from "@/i18nConfig";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Noto_Serif_Georgian, Roboto } from "next/font/google";
import { ReactNode } from "react";
import { Sansita } from "next/font/google";

import { dir } from "i18next";
import TranslationsProvider from "@/components/translation/TranslationsProvider";
import initTranslations from "../i18n";
import localfont from "next/font/local";
import { Fira_Sans } from "next/font/google";
import { Italianno } from "next/font/google";

const italianno = Italianno({
  subsets: ["latin"],
  weight: "400",
});

const roboto = Noto_Serif_Georgian({
  subsets: ["latin"],
  weight: "400",
});

const firaGo = localfont({
  src: [
    {
      path: "../../public/fonts/FiraGO-Regular.otf",
      weight: "400",
    },
  ],
  variable: "--font-firaGo",
});

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const i18nNamespaces = ["home"];
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const fontClass = locale === "ka" ? roboto.className : italianno.className;
  return (
    <html lang={locale} dir={dir(locale)} className={fontClass}>
      <body>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          {children}
        </TranslationsProvider>
      </body>
    </html>
  );
}
