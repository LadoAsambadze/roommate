'use client'

import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { ApolloLink, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext(async () => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            authorization: `Bearer ${token}`,
        },
    }
})

function makeClient() {
    const httpLink = new HttpLink({
        uri: 'https://test-api.roommategeorgia.ge/graphql',
    })

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      authLink.concat(httpLink),
                  ])
                : authLink.concat(httpLink),
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ApolloWrapper({ children }: any) {
    return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
