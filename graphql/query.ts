import { TypedDocumentNode, gql } from '@apollo/client'
import {
    Query,
    QueryGetCountriesArgs,
    QueryGetFilteredUsersArgs,
    QueryGetGendersArgs,
    QueryGetQuestionsWithAnswersArgs,
} from './typesGraphql'

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
    query GetQuestionsWithAnswers($lang: Language, $getFor: QuestionsWithAnswersFor) {
        getQuestionsWithAnswers(lang: $lang, getFor: $getFor) {
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

export const getFilteredUsersQuery: TypedDocumentNode<
    { getFilteredUsers: Query['getFilteredUsers'] },
    QueryGetFilteredUsersArgs
> = gql`
    query GetFilteredUsers(
        $pagination: PaginationInput
        $locale: Language
        $filters: [FilterInput!]
    ) {
        getFilteredUsers(pagination: $pagination, locale: $locale, filters: $filters) {
            pageInfo {
                hasNextPage
                hasPrevious
                offset
                limit
                total
                page
            }
            list {
                id
                firstname
                lastname
                age
                profileImage
                createdAt
                updatedAt
                isFavourite
                cardInfo {
                    districtNames
                    budget
                    bio
                }
            }
        }
    }
`
