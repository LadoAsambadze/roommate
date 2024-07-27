import { TypedDocumentNode, gql } from '@apollo/client'
import {
    Mutation,
    MutationCheckCodeArgs,
    MutationRoommateSignUpArgs,
    MutationSendCodeArgs,
} from './typesGraphql'

export const SendCodeMutation: TypedDocumentNode<
    { sendCode: Mutation['sendCode'] },
    MutationSendCodeArgs
> = gql`
    mutation SendCode($input: SendCodeInput!) {
        sendCode(input: $input)
    }
`

export const CheckCodeMutation: TypedDocumentNode<
    { checkCode: Mutation['checkCode'] },
    MutationCheckCodeArgs
> = gql`
    mutation CheckCode($input: CheckCodeInput!) {
        checkCode(input: $input)
    }
`

export const RoommateSignUpMutation: TypedDocumentNode<
    { signUp: Mutation['roommateSignUp'] },
    MutationRoommateSignUpArgs
> = gql`
    mutation RoommateSignUp($input: SignUpInput!) {
        roommateSignUp(input: $input) {
            id
            email
            phone
            firstname
            lastname
            birthDate
            genderId
            countryId
            profileImage

            createdAt
            jwt {
                accessToken
                refreshToken
                sessionId
            }
        }
    }
`
