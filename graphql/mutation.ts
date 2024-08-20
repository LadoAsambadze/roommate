import { TypedDocumentNode, gql } from '@apollo/client'
import {
    Mutation,
    MutationSendCodeBySmsArgs,
    MutationRefreshTokenArgs,
    MutationRoommateSignUpArgs,
    MutationVerifyCodeBySmsArgs,
    MutationRoommateSignInArgs,
    MutationLandlordSignUpArgs,
    SendCodeByEmailInput,
    MutationSendCodeByEmailArgs,
    MutationVerifyCodeByEmailArgs,
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

export const RoommateSignIn: TypedDocumentNode<
    { roommateSignIn: Mutation['roommateSignIn'] },
    MutationRoommateSignInArgs
> = gql`
    mutation RoommateSignIn($input: SignInCredentialsInput!) {
        roommateSignIn(input: $input) {
            accessToken
            refreshToken
            sessionId
        }
    }
`

export const LandlordSignIn: TypedDocumentNode<
    { roommateSignIn: Mutation['roommateSignIn'] },
    MutationRoommateSignInArgs
> = gql`
    mutation RoommateSignIn($input: SignInCredentialsInput!) {
        landlordSignIn(input: $input) {
            accessToken
            refreshToken
            sessionId
        }
    }
`

export const LandlordSignUp: TypedDocumentNode<
    { landlordSignUp: Mutation['landlordSignUp'] },
    MutationLandlordSignUpArgs
> = gql`
    mutation LandlordSignUp($input: LandlordSignUpInput!) {
        landlordSignUp(input: $input) {
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

export const SendCodeByEmail: TypedDocumentNode<
    { sendCodeByEmail: Mutation['sendCodeByEmail'] },
    MutationSendCodeByEmailArgs
> = gql`
    mutation LandlordSignUp($input: SendCodeByEmailInput!) {
        sendCodeByEmail(input: $input) {
            status
        }
    }
`
export const VerifyCodeByEmail: TypedDocumentNode<
    { verifyCodeByEmail: Mutation['verifyCodeByEmail'] },
    MutationVerifyCodeByEmailArgs
> = gql`
    mutation LandlordSignUp($input: VerifyCodeByEmailInput!) {
        verifyCodeByEmail(input: $input) {
            status
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
