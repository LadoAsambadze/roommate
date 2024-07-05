import { getClient } from '@/src/libs/apollo/rscClient'
import ClientWrapper from './_components/ClientWrapper'
import { getGendersQuery, getQuestionsWithAnswersQuery } from '@/graphql/query'
import { GenderObject, Language, QuestionObject } from '@/graphql/typesGraphql'

export default async function Signup({ params }: { params: { locale: Language } }) {
    const server = getClient()

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

    const genders = gendersResponse?.data.getGenders as GenderObject[]
    const questions = questionsWithAnswersResponse?.data.getQuestionsWithAnswers as QuestionObject[]

    // console.log(questions)

    return (
        <>
            <ClientWrapper  genders={genders} questions={questions} />
        </>
    )
}
