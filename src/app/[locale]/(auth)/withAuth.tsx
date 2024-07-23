// app/auth/withAuth.tsx
'use client'

import { useAuth } from './AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
    return function WithAuth(props: P) {
        const { isAuthenticated } = useAuth()
        const router = useRouter()

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/signin')
            }
        }, [isAuthenticated, router])

        if (!isAuthenticated) {
            return null // or a loading spinner
        }

        return <WrappedComponent {...props} />
    }
}
