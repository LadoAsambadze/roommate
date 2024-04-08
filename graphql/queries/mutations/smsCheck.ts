import { gql } from '@apollo/client'

export const sms_check = gql`
    mutation Mutation($input: CheckSmsCodeDto!) {
        checkCode(input: $input)
    }
`
