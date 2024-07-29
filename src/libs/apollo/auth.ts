// auth.ts

export const setToken = (token: string) => {
    localStorage.setItem('token', token)
  }

  export const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem('refreshToken', refreshToken)
  }

  export const setSessionId = (sessionId: string) => {
    localStorage.setItem('sessionId', sessionId)
  }

  export const getToken = () => {
    return localStorage.getItem('token')
  }

  export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken')
  }

  export const getSessionId = () => {
    return localStorage.getItem('sessionId')
  }

  export const removeAllTokens = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('sessionId')
  }