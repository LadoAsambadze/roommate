import { ApolloLink, DefaultContext, HttpLink } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'


const authLink = new ApolloLink((operation, forward) => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjU1NzU2NTAzMSIsInN1YiI6MjcsImlhdCI6MTcxOTA4NDQ1MiwiZXhwIjoxNzIxNjc2NDUyfQ.QiIDyd1cK7Ry8a-iXwpNhine3YNj7XxgVnLCebTDYKk'

    if (token) {
        operation.setContext(({ headers }: DefaultContext) => ({
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        }))
    }

    return forward(operation)
})


const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
})

const restLink = new RestLink({ uri: process.env.NEXT_PUBLIC_REST_API })

const links = ApolloLink.from([authLink, restLink, httpLink])

export { authLink, httpLink, restLink, links }
