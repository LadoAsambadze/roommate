import { gql } from '@apollo/client'

export const sms_send = gql`
    mutation Mutation($input: CheckSmsCodeDto!) {
        checkCode(input: $input)
    }
`
