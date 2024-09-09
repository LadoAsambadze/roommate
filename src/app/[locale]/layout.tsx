import TranslationsProvider from '@/src/libs/i18n/TranslationsProvider'
import { ApolloWrapper } from '@/src/libs/apollo/wrapper'
import initTranslations from '@/src/libs/i18n/i18n'
import { ReactNode } from 'react'
import { dir } from 'i18next'
import './globals.css'
import Header from '@/src/components/header/Header'
import { Noto_Sans_Georgian } from 'next/font/google'
import Footer from '@/src/components/footer/Footer'
import { ModalWrapper } from './(auth)/_modal/ModalWrapper'
import { AuthWrapper } from '@/src/auth/authWrapper'
import TwilioClientWrapper from '@/src/conversation/TwilioClientWrapper'

const georgian = Noto_Sans_Georgian({ subsets: ['latin'] })

export async function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'ka' }]
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const i18nNamespaces = ['meta']

    const { t } = await initTranslations(locale, i18nNamespaces)
    return {
        title: {
            default: t('title'),
            template: '%s | roommate website ',
        },
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            locale: locale,
            url: 'roommate.ge',
            siteName: 'roommate',
        },
    }
}

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: ReactNode
    modal: ReactNode
    params: { locale: string }
}) {
    const i18nNamespaces = [
        'home',
        'shared',
        'signup',
        'profile',
        'roommates',
        'signin',
        'uploadApartment',
        'conversation',
    ]

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
                        <AuthWrapper>
                            <TwilioClientWrapper>
                                <Header />
                                <ModalWrapper />

                                {children}
                                <Footer />
                            </TwilioClientWrapper>
                        </AuthWrapper>
                    </ApolloWrapper>
                </TranslationsProvider>
            </body>
        </html>
    )
}
