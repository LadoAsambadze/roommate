import { gql } from '@apollo/client'

export const query = gql`
    query GetFlats {
        flats @rest(type: "Flat", path: "flats") {
            data {
                id
                title
                street
                price
                images {
                    thumb
                    original
                }
                description
            }
        }
    }
`
