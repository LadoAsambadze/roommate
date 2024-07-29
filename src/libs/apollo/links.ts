import { ApolloLink, DefaultContext, HttpLink } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'

const authLink = new ApolloLink((operation, forward) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
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
