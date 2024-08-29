import { TypedDocumentNode, gql } from '@apollo/client'
import {
    Query,
    QueryGetCountriesArgs,
    QueryGetGendersArgs,
    QueryGetPaginatedFilteredRoommatesArgs,
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

export const getUserQuery: TypedDocumentNode<{ me: Query['me'] }> = gql`
    query Me {
        me {
            id
            email
            phone
            firstname
            lastname
            birthDate
            genderId
            countryId
            profileImage
            userTypes
            createdAt
        }
    }
`

export const getQuestionsWithAnswersQuery: TypedDocumentNode<
    { getQuestionsWithAnswers: Query['getQuestionsWithAnswers'] },
    QueryGetQuestionsWithAnswersArgs
> = gql`
    query GetQuestionsWithAnswers($lang: Language, $getFor: QuestionsWithAnswersFor) {
        getQuestionsWithAnswers(lang: $lang, getFor: $getFor) {
            id
            step
            name
            position
            answers {
                id
                questionId

                translations {
                    id
                    lang
                    title
                }
            }

            uiFieldInfo {
                otherInput {
                    type
                    variant
                    renderAs
                }
                input {
                    type
                    variant
                    renderAs
                }
                filterInput {
                    type
                    variant
                    renderAs
                }
            }

            translations {
                id
                lang
                title
            }
        }
    }
`

export const GetPaginatedFilteredRoommatesQuery: TypedDocumentNode<
    { getPaginatedFilteredRoommates: Query['getPaginatedFilteredRoommates'] },
    QueryGetPaginatedFilteredRoommatesArgs
> = gql`
    query GetPaginatedFilteredRoommates(
        $pagination: PaginationInput
        $locale: Language
        $filters: [FilterInput!]
    ) {
        getPaginatedFilteredRoommates(pagination: $pagination, locale: $locale, filters: $filters) {
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
                profileImage
                createdAt
                districtNames
                budget
                bio
                age
                isFavourite
            }
        }
    }
`

export type GetPropertiesDataProps = {
    getPropertyAmenities: Query['getPropertyAmenities']
    getPropertyTypes: Query['getPropertyTypes']
    getHousingStatuses: Query['getHousingStatuses']
    getHousingConditions: Query['getHousingConditions']
    getHousingHeatingTypes: Query['getHousingHeatingTypes']
    getHousingLivingSafeties: Query['getHousingLivingSafeties']
    getPropertyDeposits: Query['getPropertyDeposits']
}
export const GetPropertiesData: TypedDocumentNode<GetPropertiesDataProps> = gql`
    query GetProperties($locale: Language) {
        getPropertyAmenities(locale: $locale) {
            id
            translations {
                id
                name
                lang
            }
        }
        getPropertyTypes(locale: $locale) {
            id
            translations {
                id
                name
                lang
            }
        }
        getHousingStatuses(locale: $locale) {
            id
            translations {
                id
                name
                lang
            }
        }
        getHousingConditions(locale: $locale) {
            id
            translations {
                id
                name
                lang
            }
        }
        getHousingHeatingTypes(locale: $locale) {
            id
            translations {
                id
                name
                lang
            }
        }
        getHousingLivingSafeties(locale: $locale) {
            id
            translations {
                id
                name
                lang
            }
        }
        getPropertyDeposits(locale: $locale) {
            id
            amount
            percentage
            currency
            translations {
                id
                description
                lang
            }
        }
    }
`
