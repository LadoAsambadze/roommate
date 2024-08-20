import { ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support'
import { links } from './links'
import { NormalizedCacheObject } from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

export function client() {
    if (apolloClient) {
        return apolloClient
    }

    apolloClient = new ApolloClient({
        cache: new InMemoryCache(),
        link: links,
        defaultOptions: {
            watchQuery: {
                errorPolicy: 'all',
            },
            query: {
                errorPolicy: 'all',
            },
            mutate: {
                errorPolicy: 'all',
            },
        },
    })

    return apolloClient
}
