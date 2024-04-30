'use client'

import { useSession } from 'next-auth/react'

import { useRouter } from 'next/navigation'
import Loading from '../loading'
export default function Client() {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === 'loading') {
        return <Loading />
    }

    if (!session) {
        router.push('/') // Use `router.replace` for permanent redirect
        return null // Return null to prevent rendering content
    }

    return <div>client</div>
}
