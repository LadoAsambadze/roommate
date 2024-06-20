import { TypedDocumentNode, gql } from '@apollo/client'
import {
    Mutation,
    MutationCheckCodeArgs,
    MutationSendCodeArgs,
    MutationSignUpArgs,
} from './typesGraphql'

export const SendCodeMutation: TypedDocumentNode<
    { sendCode: Mutation['sendCode'] },
    MutationSendCodeArgs
> = gql`
    mutation SendCode($input: SendSmsCodeInput!) {
        sendCode(input: $input)
    }
`

export const CheckCodeMutation: TypedDocumentNode<
    { checkCode: Mutation['checkCode'] },
    MutationCheckCodeArgs
> = gql`
    mutation CheckCode($input: CheckSmsCodeInput!) {
        checkCode(input: $input)
    }
`

export const SignupMutation: TypedDocumentNode<{ signUp: Mutation['signUp'] }, MutationSignUpArgs> =
    gql`
        mutation SignUp($userAndAnsweredQuestions: UserAndAnsweredQuestionsInput!) {
            signUp(userAndAnsweredQuestions: $userAndAnsweredQuestions) {
                accessToken
            }
        }
    `
