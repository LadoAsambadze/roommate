import { ApolloLink, DefaultContext, HttpLink, Observable } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'
import { onError } from '@apollo/client/link/error'
import { exceptionCodes } from '@/src/constants/errors'
import { refreshTokens } from '@/src/auth/refreshTokens'
import { getAccessToken, removeAllTokens } from '@/src/auth/auth'

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

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
        const unauthenticatedError = graphQLErrors.some(
            (graphQLError) => graphQLError.extensions?.code === exceptionCodes.unauthenticated
        )

        if (unauthenticatedError) {
            return new Observable((observer) => {
                try {
                    refreshTokens().then((tokenRefreshed) => {
                        if (!tokenRefreshed) {
                            removeAllTokens()
                        } else {
                            const accessToken = getAccessToken()

                            operation.setContext({
                                headers: {
                                    ...operation.getContext().headers,
                                    authorization: `Bearer ${accessToken}`,
                                },
                            })

                            const subscriber = {
                                next: observer.next.bind(observer),
                                error: observer.error.bind(observer),
                                complete: observer.complete.bind(observer),
                            }

                            forward(operation).subscribe(subscriber)
                        }
                    })
                } catch (error) {
                    observer.error(error)
                }
            })
        }
    }
})

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
})

const restLink = new RestLink({ uri: process.env.NEXT_PUBLIC_REST_API })

const links = ApolloLink.from([authLink, errorLink, restLink, httpLink])

export { authLink, httpLink, restLink, links }
