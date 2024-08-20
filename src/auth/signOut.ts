import { removeAllTokens } from './authHelpers'
import { isAuthenticatedVar } from './isAuthenticatedVar'

export const signOutHandler = () => {
    removeAllTokens()
    isAuthenticatedVar({ checking: false, valid: false })
}
