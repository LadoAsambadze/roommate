import { gql } from '@apollo/client'

export const sms_send = gql`
    mutation SendCode($input: SendSmsCodeInput!) {
        sendCode(input: $input)
    }
`
