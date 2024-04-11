import TranslationsProvider from '@/libs/TranslationsProvider'
import { ApolloWrapper } from '@/libs/apollo-provider'
import initTranslations from '../../utils/i18n'
// import localfont from 'next/font/local'
import { ReactNode } from 'react'
import { dir } from 'i18next'
import './globals.css'
import Header from '@/components/header/Header'
import { Noto_Sans_Georgian } from 'next/font/google'
import Footer from '@/components/footer/Footer'

const georgian = Noto_Sans_Georgian({ subsets: ['latin'] })
// const firaGo = localfont({
//     src: [
//         {
//             path: '../../public/fonts/FiraGO-Regular.otf',
//             weight: '400',
//         },
//         {
//             path: '../../public/fonts/FiraGO-Medium.otf',
//             weight: '500',
//         },
//     ],
//     variable: '--font-firaGo',
// })

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: ReactNode
    params: { locale: string }
}) {
    const i18nNamespaces = ['home', 'shared', 'signup']
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
