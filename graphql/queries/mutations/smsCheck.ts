import { gql } from '@apollo/client'

export const sms_check = gql`
    mutation SendCode($input: CheckSmsCodeInput!) {
        checkCode(input: $input)
    }
`
