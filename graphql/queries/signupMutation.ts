import { gql } from '@apollo/client'

export const signupMutation = gql`
    mutation SignUp($userAndAnsweredQuestions: UserAndAnsweredQuestionsInput!) {
        signUp(userAndAnsweredQuestions: $userAndAnsweredQuestions) {
            accessToken
        }
    }
`
