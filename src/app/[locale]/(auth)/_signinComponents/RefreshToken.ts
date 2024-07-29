import { ValidateTokenMutation } from '@/graphql/mutation'
import {
    getRefreshToken,
    getSessionId,
    removeAllTokens,
    setRefreshToken,
    setSessionId,
    setToken,
} from '@/src/libs/apollo/auth'
import { client } from '@/src/libs/apollo/client'

export const refreshTokens = async (): Promise<boolean> => {
    const refreshToken = getRefreshToken()
    const sessionId = getSessionId()

    if (!refreshToken || !sessionId) {
        removeAllTokens()
        return false
    }

    try {
        const { data } = await client().mutate({
            mutation: ValidateTokenMutation,
            variables: {
                input: {
                    sessionId,
                    refreshToken,
                },
            },
        })
        setToken(data.signIn.accessToken)
        setRefreshToken(data.signIn.refreshToken)
        setSessionId(data.signIn.sessionId)
        return true
    } catch (error) {
        console.error('Token refresh error:', error)
    }

    removeAllTokens()
    return false
}
