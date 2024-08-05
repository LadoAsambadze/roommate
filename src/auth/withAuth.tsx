import { useEffect, useState } from 'react'
import { getToken, removeAllTokens } from './auth'
import { useRouter } from 'next/navigation'
import Loading from '@/src/app/[locale]/loading'
import { refreshTokens } from './refreshTokens'
import { jwtDecode } from 'jwt-decode'

const isTokenExpired = (token: string): boolean => {
    try {
        const decodedToken: any = jwtDecode(token)
        if (!decodedToken.exp) return true
        return decodedToken.exp * 1000 < Date.now()
    } catch (error) {
        return true
    }
}

export const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const router = useRouter()
        const [isValidating, setIsValidating] = useState(true)

        useEffect(() => {
            async function checkAuth() {
                const accessToken = getToken()

                if (!accessToken || isTokenExpired(accessToken)) {
                    const refreshed = await refreshTokens()
                    if (!refreshed) {
                        router.replace('/signup')
                        removeAllTokens()
                        return
                    }
                }

                setIsValidating(false)
            }

            checkAuth()
        }, [router])

        if (isValidating) {
            return <Loading />
        }

        return <WrappedComponent {...props} />
    }
}
