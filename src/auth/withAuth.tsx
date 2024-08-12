import { useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { getAccessToken } from './authHelpers'
import Loading from '@/src/app/[locale]/loading'
import { refreshTokens } from './refreshTokens'
import { isTokenExpired } from '../utils/isTokenExpired'
import { useRouter } from 'next/navigation'
import { isAuthenticatedVar } from './isAuthenticatedVar'

export const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const router = useRouter()
        const [isValidating, setIsValidating] = useState(true)
        const isAuthenticated = useReactiveVar(isAuthenticatedVar)

        useEffect(() => {
            async function checkAuth() {
                const accessToken = getAccessToken()

                if (!accessToken || isTokenExpired(accessToken)) {
                    await refreshTokens()
                }

                setTimeout(() => setIsValidating(false), 100)
            }

            checkAuth()
        }, [])

        useEffect(() => {
            if (!isAuthenticated.valid) {
                router.replace('/?modal=signinChooseType')
            }
        }, [isAuthenticated.valid])

        if (isValidating) {
            return <Loading />
        }

        return <WrappedComponent {...props} />
    }
}
