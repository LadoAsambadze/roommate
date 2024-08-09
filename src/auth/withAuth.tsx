import { useEffect, useState } from 'react'
import { getAccessToken, removeAllTokens } from './auth'
import { useRouter } from 'next/navigation'
import Loading from '@/src/app/[locale]/loading'
import { refreshTokens } from './refreshTokens'
import { isTokenExpired } from '../utils/isTokenExpired'

export const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const router = useRouter()
        const [isValidating, setIsValidating] = useState(true)

        useEffect(() => {
            async function checkAuth() {
                const accessToken = getAccessToken()

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
