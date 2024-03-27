'use client'

import { useSuspenseQuery } from '@apollo/client'
import { gql } from '@apollo/client'

const query = gql`
    query ExampleQuery($locale: Language) {
        getGenders(locale: $locale) {
            id
            translations {
                id
                sex
                lang
            }
        }
    }
`

export default function Test() {
    const { data } = useSuspenseQuery(query)

    console.log('this', data)
    return <div>test client component</div>
}
