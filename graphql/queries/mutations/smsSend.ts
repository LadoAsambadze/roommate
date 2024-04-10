import { gql } from '@apollo/client'

export const sms_send = gql`
    mutation Mutation($input: SendSmsCodeDto!) {
        sendCode(input: $input)
    }
`
