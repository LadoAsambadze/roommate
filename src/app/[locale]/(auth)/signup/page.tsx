import { getClient } from '@/src/libs/graphql/client'
import {
    getCountriesQuery,
    getGendersQuery,
    getQuestionsWithAnswersQuery,
} from '@/graphql/queries/suspenses/signupCombined'
import ClientWrapper from './_components/ClientWrapper'
import { Language } from '@/graphql/types/graphql'

export default async function Signup({ params }: { params: { locale: string } }) {
    const server = getClient()

    const countriesResponse = await server.query({
        query: getCountriesQuery,
        variables: {
            locale: params.locale as Language,
        },
    })

    const gendersResponse = await server.query({
        query: getGendersQuery,
        variables: {
            locale: params.locale as Language,
        },
    })

    const questionsWithAnswersResponse = await server.query({
        query: getQuestionsWithAnswersQuery,
        variables: {
            lang: params.locale as Language,
        },
    })

    const countries = countriesResponse?.data.getCountries
    const genders = gendersResponse?.data.getGenders
    const questions = questionsWithAnswersResponse?.data.getQuestionsWithAnswers

    return (
        <>
            <ClientWrapper countries={countries} genders={genders} questions={questions} />
        </>
    )
}
