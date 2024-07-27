import { ApolloLink, DefaultContext, HttpLink } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'

const authLink = new ApolloLink((operation, forward) => {
    if (typeof window !== 'undefined') {
        // const token = localStorage.getItem('token')
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExMTQsImlhdCI6MTcyMjA4NDQzMiwiZXhwIjoxNzIyMDkxNjMyfQ.u8l1XyXXpF8bl0Lg0gir6TOIwow04fNnvfMzxhB5Q2E'
        if (token) {
            operation.setContext(({ headers }: DefaultContext) => ({
                headers: {
                    ...headers,
                    authorization: `Bearer ${token}`,
                },
            }))
        }
    }
    return forward(operation)
})

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
})

const restLink = new RestLink({ uri: process.env.NEXT_PUBLIC_REST_API })

const links = ApolloLink.from([authLink, restLink, httpLink])

export { authLink, httpLink, restLink, links }
