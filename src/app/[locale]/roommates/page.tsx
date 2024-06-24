import initTranslations from '@/src/libs/i18n/i18n'
import ClientWrapper from './_components/ClientWrapper'
import { getClient } from '@/src/libs/graphql/client'
import { getFilteredUsersQuery } from '@/graphql/query'
import { redirect } from 'next/navigation'
import { auth } from '@/src/libs/auth/auth'
import { FilterWithPaginationObject, Language } from '@/graphql/typesGraphql'

interface QueryProps {
    page: string
}

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

export default async function Roommates({
    params: { locale },
    searchParams,
}: {
    params: { locale: string }
    searchParams: QueryProps
}) {
    const session = await auth()
    if (!session) {
        return redirect('/signin')
    }

    const server = getClient()
    const params = searchParams
    const currentPage = params.page ? parseInt(params.page, 10) : 1
    const limit = 10
    const offset = (currentPage - 1) * limit

    const response = await server.query({
        fetchPolicy: 'cache-first',
        query: getFilteredUsersQuery,
        variables: {
            pagination: {
                offset,
                limit,
            },
            locale: locale as Language,
            filters: [
                {
                    questionId: '15',
                    answerIds: ['1'],
                },
            ],
        },
    })

    const filteredUsers = response?.data?.getFilteredUsers as FilterWithPaginationObject

    return <ClientWrapper data={filteredUsers} />
}
