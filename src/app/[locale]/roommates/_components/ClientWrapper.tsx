'use client'

import React, { useState } from 'react'
import Filter from './filter/Filter'
import UserCard from './userCard/UserCard'
import MobileFilter from './filter/MobileFilter'
import { FilterIcon } from '@/components/svgs'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loading from '../../loading'

export default function ClientWrapper() {
    const [isOpen, setIsOpen] = useState(false)
    const { data: session, status } = useSession()
    const router = useRouter()
    if (status === 'loading') {
        return <Loading />
    }

    if (!session) {
        router.push('/signin')
        return null
    }
    return (
        <>
            <main className="flex min-h-screen w-full flex-col  gap-4  md:gap-6 md:px-24 md:py-10 xl:flex-row">
                <div className="h-auto w-full px-6 pt-4 sm:pl-32  md:pl-24 lg:pl-0 xl:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex  flex-row items-center  rounded-lg border border-[#838CAC] bg-[#F2F5FF] px-4 py-2 "
                    >
                        <FilterIcon className="h-6 w-6" />
                        <span className="ml-2 text-sm text-[#838CAC]">Filter</span>
                    </button>
                </div>
                <div className="hidden h-full w-1/4 xl:block">
                    <Filter isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
                <MobileFilter isOpen={isOpen} setIsOpen={setIsOpen} />

                <div className="hidden h-screen w-[1px] bg-[#E3E3E3] xl:block"></div>
                <UserCard />
            </main>
        </>
    )
}
