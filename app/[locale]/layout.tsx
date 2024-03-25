import './globals.css'
import { ReactNode } from 'react'
import { dir } from 'i18next'
import TranslationsProvider from '@/components/translation/TranslationsProvider'
import initTranslations from '../../components/translation/i18n'
import localfont from 'next/font/local'

const firaGo = localfont({
    src: [
        {
            path: '../../public/fonts/FiraGO-Regular.otf',
            weight: '400',
        },
        {
            path: '../../public/fonts/FiraGO-Medium.otf',
            weight: '500',
        },
    ],
    variable: '--font-firaGo',
})

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: ReactNode
    params: { locale: string }
}) {
    const i18nNamespaces = ['home']
    const { resources } = await initTranslations(locale, i18nNamespaces)

    return (
        <html lang={locale} dir={dir(locale)} className={firaGo.className}>
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
    )
}
