import {
    Query,
    QueryGetCountriesArgs,
    QueryGetGendersArgs,
    QueryGetQuestionsWithAnswersArgs,
} from '@/graphql/types/graphql'
import { TypedDocumentNode, gql } from '@apollo/client'

export const getGendersQuery: TypedDocumentNode<
    { getGenders: Query[`getGenders`] },
    QueryGetGendersArgs
> = gql`
    query GetGenders($locale: Language) {
        getGenders(locale: $locale) {
            id
            translations {
                id
                lang
                sex
            }
        }
    }
`

export const getCountriesQuery: TypedDocumentNode<
    { getCountries: Query['getCountries'] },
    QueryGetCountriesArgs
> = gql`
    query GetCountries($locale: Language) {
        getCountries(locale: $locale) {
            id
            alpha2Code
            position
            translations {
                id
                lang
                name
            }
        }
    }
`

export const getQuestionsWithAnswersQuery: TypedDocumentNode<
    { getQuestionsWithAnswers: Query['getQuestionsWithAnswers'] },
    QueryGetQuestionsWithAnswersArgs
> = gql`
    query GetQuestionsWithAnswers($lang: Language) {
        getQuestionsWithAnswers(lang: $lang) {
            answers {
                id
                questionId
                translations {
                    id
                    lang
                    title
                }
            }
            position
            uiFieldInfo
            id
            translations {
                id
                lang
                title
            }
        }
    }
`
