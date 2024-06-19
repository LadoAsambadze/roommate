'use client'

import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { ApolloLink, HttpLink } from '@apollo/client'

function makeClient() {
    const httpLink = new HttpLink({
        uri: 'https://test-api.roommategeorgia.ge/graphql',
        fetchOptions: { cache: 'cache-first' },
    })

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      httpLink,
                  ])
                : httpLink,
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ApolloWrapper({ children }: any) {
    return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
