import initTranslations from '@/src/libs/i18n/i18n'
import ClientWrapper from './_components/ClientWrapper'
import { redirect } from 'next/navigation'
import { auth } from '@/src/libs/auth/auth'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const i18nNamespaces = ['meta']
    const { t } = await initTranslations(locale, i18nNamespaces)
    return {
        title: t('roommate'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            locale: locale,
            url: 'rommate.ge',
            siteName: 'roommate',
        },
    }
}

export default async function Roommates() {
    const session = await auth()
    if (!session) {
        return redirect('/signin')
    }

    return <ClientWrapper />
}
