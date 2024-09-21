'use client'
import ProfileNavBar from './profileNavBar/ProfileNavBar'
import { withAuth } from '@/src/auth/withAuth'
import Verification from './verification/Verification'
import { useSearchParams } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'

function ClientWrapper() {
    const isMobile = useMediaQuery({
        query: ' (max-width: 768px)',
    })

    const searchParams = useSearchParams()

    const verification = searchParams.get('verification')

    return (
        <main className="mt-1 flex min-h-screen w-full flex-col  items-center overflow-scroll bg-[#F5F5F5] px-6 pb-8 pt-6 md:flex-row md:items-start md:gap-6 md:px-24">
            {verification === 'true' && isMobile ? <Verification /> : <ProfileNavBar />}
        </main>
    )
}

export default withAuth(ClientWrapper)
