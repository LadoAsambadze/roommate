import { getClient } from '@/src/libs/apollo/rscClient'
import ClientWrapper from './_components/ClientWrapper'
import { getQuestionsWithAnswersQuery } from '@/graphql/query'
import { Language, QuestionObject } from '@/graphql/typesGraphql'

export default async function Signup({ params }: { params: { locale: Language } }) {
    const server = getClient()

    const questionsWithAnswersResponse = await server.query({
        query: getQuestionsWithAnswersQuery,
        variables: {
            lang: params.locale as Language,
        },
    })

    const questions = questionsWithAnswersResponse?.data.getQuestionsWithAnswers as QuestionObject[]

    return (
        <>
            <ClientWrapper questions={questions} />
        </>
    )
}
