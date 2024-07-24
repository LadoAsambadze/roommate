// app/auth/withAuth.tsx
'use client'


import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from './AuthContext'

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
    return function WithAuth(props: P) {
        const { isAuthenticated } = useAuth()
        const router = useRouter()

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/signup')
            }
        }, [isAuthenticated, router])

        if (!isAuthenticated) {
            return null // or a loading spinner
        }

        return <WrappedComponent {...props} />
    }
}
