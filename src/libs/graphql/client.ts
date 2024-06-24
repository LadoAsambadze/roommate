import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({
    uri: `https://test-api.roommategeorgia.ge/graphql`,
})

const authLink = setContext(async () => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjU1NzU2NTAzMSIsInN1YiI6MjcsImlhdCI6MTcxOTA4NDQ1MiwiZXhwIjoxNzIxNjc2NDUyfQ.QiIDyd1cK7Ry8a-iXwpNhine3YNj7XxgVnLCebTDYKk'

    if (token) {
        return {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    }
})

export const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
    })
})
