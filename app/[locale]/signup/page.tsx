import MultiStepCard from './_components/MultiStepCard'
import { getClient } from '@/libs/client'
import { SearchParams } from '@/types/types'
import { signupCombinedQuery } from '@/graphql/queries/signupCombined'

export default async function Signup(searchParams: SearchParams) {
    const client = getClient()
    const locale = searchParams.params.locale || 'ka'
    const { data } = await client.query({ query: signupCombinedQuery, variables: { locale } })

    return (
        <>
            <MultiStepCard
                countries={data?.data?.getCountries}
                gender={data?.data?.getGenders}
                questions={data?.data?.getQuestionsWithAnswers}
            />
        </>
    )
}
