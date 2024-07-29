import { useEffect, useState } from 'react'
import { getToken } from './auth'
import { refreshTokens } from '@/src/app/[locale]/(auth)/_signinComponents/RefreshToken'
import { useRouter } from 'next/navigation'
import Loading from '@/src/app/[locale]/loading'

export const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const router = useRouter()
        const [isValidating, setIsValidating] = useState(true)

        useEffect(() => {
            async function checkAuth() {
                const token = getToken()
                if (!token) {
                    const refreshed = await refreshTokens()
                    if (!refreshed) {
                        router.replace('/signup')
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
