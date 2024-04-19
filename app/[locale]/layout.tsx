import TranslationsProvider from '@/libs/i18next/TranslationsProvider'
import { ApolloWrapper } from '@/libs/graphql/apollo-provider'
import initTranslations from '../../libs/i18next/i18n'
import { ReactNode } from 'react'
import { dir } from 'i18next'
import './globals.css'
import Header from '@/components/header/Header'
import { Noto_Sans_Georgian } from 'next/font/google'
import Footer from '@/components/footer/Footer'

export default async function RootLayout({
    children,

    params: { locale },
}: {
    children: ReactNode

    params: { locale: string }
}) {
    const i18nNamespaces = ['home', 'shared', 'signup']
    const georgian = Noto_Sans_Georgian({ subsets: ['latin'] })
    const { resources } = await initTranslations(locale, i18nNamespaces)

    return (
        <html lang={locale} dir={dir(locale)} className={georgian.className}>
            <body>
                <TranslationsProvider
                    namespaces={i18nNamespaces}
                    locale={locale}
                    resources={resources}
                >
                    <ApolloWrapper>
                        <Header />
                        {children}
                        <Footer />
                    </ApolloWrapper>
                </TranslationsProvider>
            </body>
        </html>
    )
}
