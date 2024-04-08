import MultiStepCard from './_components/MultiStepCard'
import { getClient } from '@/libs/client'
import { SearchParams } from '@/types/types'
import { signup_combined } from '@/graphql/queries/suspenses/signupCombined'



export default async function Signup(searchParams: SearchParams) {
    const client = getClient()
    const locale = searchParams.params.locale || 'ka'

    const data = await client.query({
        query: signup_combined,
        variables: { locale: locale, lang: locale, getCountriesLocale2: locale },
    })

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
