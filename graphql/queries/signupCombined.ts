import { gql } from '@apollo/client'

export  const signupCombinedQuery = gql`
    query CombinedQuery($locale: Language, $getCountriesLocale2: Language, $lang: Language) {
        getGenders(locale: $locale) {
            id
            translations {
                id
                lang
                sex
            }
        }
        getCountries(locale: $getCountriesLocale2) {
            id
            alpha2Code
            position
            translations {
                id
                lang
                name
            }
        }
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
