import { gql } from '@apollo/client'

export const signup_submit = gql`
    mutation SignUp($userAndAnsweredQuestions: UserAndAnsweredQuestionsInput!) {
        signUp(userAndAnsweredQuestions: $userAndAnsweredQuestions) {
            accessToken
        }
    }
`
