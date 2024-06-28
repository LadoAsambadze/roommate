import { getClient } from '@/src/libs/apollo/rscClient'
import ClientWrapper from './_components/ClientWrapper'
import { getCountriesQuery, getGendersQuery, getQuestionsWithAnswersQuery } from '@/graphql/query'
import { CountryObject, GenderObject, Language, QuestionObject } from '@/graphql/typesGraphql'

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

    const countries = countriesResponse?.data?.getCountries as CountryObject[]
    const genders = gendersResponse?.data.getGenders as GenderObject[]
    const questions = questionsWithAnswersResponse?.data.getQuestionsWithAnswers as QuestionObject[]

    console.log(questions)

    return (
        <>
            <ClientWrapper countries={countries} genders={genders} questions={questions} />
        </>
    )
}
