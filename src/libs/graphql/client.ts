import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { auth } from '../auth/auth'

const httpLink = new HttpLink({
    uri: `https://test-api.roommategeorgia.ge/graphql`,
})

const authLink = setContext(async () => {
    const session = await auth()

    const token = session.accessToken
  

    return {
        headers: {
            authorization: `Bearer ${token}`,
        },
    }
})

export const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
    })
})
