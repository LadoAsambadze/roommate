import { useEffect, useState } from 'react'
import { useReactiveVar, useQuery } from '@apollo/client'
import { getAccessToken } from './authHelpers'
import Loading from '@/src/app/[locale]/loading'
import { refreshTokens } from './refreshTokens'
import { isTokenExpired } from '../utils/isTokenExpired'
import { useRouter, usePathname, useParams } from 'next/navigation'
import { isAuthenticatedVar } from './isAuthenticatedVar'
import { getUserQuery } from '@/graphql/query'
import { UserType } from '@/graphql/typesGraphql'

export const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const router = useRouter()
        const pathname = usePathname()
        const params = useParams()
        const locale = params.locale
        const [isValidating, setIsValidating] = useState(true)
        const isAuthenticated = useReactiveVar(isAuthenticatedVar)
        const { data: user, loading: userLoading } = useQuery(getUserQuery)

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
            } else if (
                !userLoading &&
                user?.me.userTypes.includes(UserType.Landlord) &&
                pathname === `/${locale}/roommates`
            ) {
                router.replace('/landlords')
            } else if (!userLoading && user?.me.userTypes.includes(UserType.Roommate)) {
                router.replace('/roommates')
            } else if (!userLoading && user?.me.userTypes.includes(UserType.Landlord)) {
                router.replace('/landlords')
            }
        }, [isAuthenticated.valid, user, userLoading, pathname])

        if (isValidating || userLoading) {
            return <Loading />
        }

        return <WrappedComponent {...props} />
    }
}
