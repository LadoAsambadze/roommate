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
    })

    return apolloClient
}
