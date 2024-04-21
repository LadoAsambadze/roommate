import MultiStepCard from './_components/multiStepCard/MultiStepCard'
import { getClient } from '@/libs/graphql/client'
import { signup_combined } from '@/graphql/queries/suspenses/signupCombined'

export default async function Signup({ params }: { params: { locale?: string } }) {
    const client = getClient()
    const locale = params.locale || 'ka'
    const variables = {
        locale: locale,
        lang: locale,
        getCountriesLocale2: locale,
    }
    const data = await client.query({
        query: signup_combined,
        variables,
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
