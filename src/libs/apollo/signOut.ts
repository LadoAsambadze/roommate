import { removeAllTokens } from './auth'

export const signOutHandler = () => {
    removeAllTokens()
    window.location.href = '/'
}
