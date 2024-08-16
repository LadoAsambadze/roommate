import { TypedDocumentNode, gql } from '@apollo/client'
import {
    Mutation,
    MutationSendCodeBySmsArgs,
    MutationRefreshTokenArgs,
    MutationRoommateSignUpArgs,
    MutationVerifyCodeBySmsArgs,
    MutationSignInArgs,
} from './typesGraphql'

export const SendCodeMutation: TypedDocumentNode<
    { sendCode: Mutation['sendCodeBySms'] },
    MutationSendCodeBySmsArgs
> = gql`
    mutation SendCode($input: SendCodeInput!) {
        sendCode(input: $input)
    }
`

export const CheckCodeMutation: TypedDocumentNode<
    { checkCode: Mutation['verifyCodeBySms'] },
    MutationVerifyCodeBySmsArgs
> = gql`
    mutation CheckCode($input: CheckCodeInput!) {
        checkCode(input: $input)
    }
`

export const RoommateSignUpMutation: TypedDocumentNode<
    { roommateSignUp: Mutation['roommateSignUp'] },
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
            userTypes
            createdAt
            jwt {
                accessToken
                refreshToken
                sessionId
            }
        }
    }
`

export const SignInMutation: TypedDocumentNode<{ signIn: Mutation['signIn'] }, MutationSignInArgs> =
    gql`
        mutation SignIn($input: SignInCredentialsInput!) {
            signIn(input: $input) {
                accessToken
                refreshToken
                sessionId
            }
        }
    `

export const RefreshTokenMutation: TypedDocumentNode<
    { refreshToken: Mutation['refreshToken'] },
    MutationRefreshTokenArgs
> = gql`
    mutation RefreshToken($input: RefreshTokenInput!) {
        refreshToken(input: $input) {
            accessToken
            refreshToken
            sessionId
        }
    }
`
