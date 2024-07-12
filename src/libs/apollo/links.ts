import { ApolloLink, DefaultContext, HttpLink } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'

const authLink = new ApolloLink((operation, forward) => {
    const authToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjU1NzU2NTAzMSIsInN1YiI6MjcsImlhdCI6MTcxOTA4NDQ1MiwiZXhwIjoxNzIxNjc2NDUyfQ.QiIDyd1cK7Ry8a-iXwpNhine3YNj7XxgVnLCebTDYKk'

    if (authToken) {
        operation.setContext(({ headers }: DefaultContext) => {
            return {
                headers: {
                    ...headers,
                    authorization: authToken ? `Bearer ${authToken}` : '',
                },
            }
        })
    }

    return forward(operation)
})

const httpLink = new HttpLink({
    uri: 'https://test-api.roommategeorgia.ge/graphql',
})

const restLink = new RestLink({ uri: 'https://api.roommategeorgia.ge/' })

const links = ApolloLink.from([authLink, restLink, httpLink])

export { authLink, httpLink, restLink, links }
