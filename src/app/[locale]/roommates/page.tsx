import initTranslations from '@/src/libs/i18n/i18n'
import ClientWrapper from './_components/ClientWrapper'
import { getClient } from '@/src/libs/graphql/client'
import { GetFilteredUsersQuery } from '@/graphql/query'
import { redirect } from 'next/navigation'
import { auth } from '@/src/libs/auth/auth'
import { Language } from '@/graphql/typesGraphql'

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
    const server = getClient()

    try {
        const response = await server.query({
            query: GetFilteredUsersQuery,
            variables: {
                pagination: {
                    offset: 0,
                    limit: 10,
                },
                locale: 'ka' as Language,
                filters: [
                    {
                        questionId: '15',
                        answerIds: ['1'],
                    },
                ],
            },
        })

        console.log(response.data)
    } catch (error) {
        return null
    }

    return <ClientWrapper />
}
