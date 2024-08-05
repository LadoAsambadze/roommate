import { RefreshTokenMutation } from '@/graphql/mutation'
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
            mutation: RefreshTokenMutation,
            variables: {
                input: {
                    sessionId,
                    refreshToken,
                },
            },
        })
        if (data) {
            setToken(data.refreshToken.accessToken)
            setRefreshToken(data.refreshToken.refreshToken)
            setSessionId(data.refreshToken.sessionId)
            return true
        }
    } catch (error) {
        console.error('Token refresh error:', error)
        removeAllTokens()
    }

    return false
}
