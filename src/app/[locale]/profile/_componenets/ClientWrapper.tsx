'use client'
import ProfileNavBar from './profileNavBar/ProfileNavBar'
import { withAuth } from '@/src/auth/withAuth'

function ClientWrapper() {
    return (
        <main className="mt-1 flex min-h-screen w-full flex-col items-center bg-[#F5F5F5] px-6 pb-8 pt-6 md:flex-row md:items-start md:gap-6 md:px-24">
            <ProfileNavBar />
            <div className="hidden h-screen w-[1px] bg-[#E5E5E5] md:block"></div>
        </main>
    )
}

export default withAuth(ClientWrapper)
