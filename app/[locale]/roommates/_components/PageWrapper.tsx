'use client'

import React, { useState } from 'react'
import Filter from './filter/Filter'
import UserCard from './userCard/UserCard'
import MobileFilter from './filter/MobileFilter'
import { FilterIcon } from '@/components/svgs'

export default function PageWrapper() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <main className="flex min-h-screen w-full flex-col  gap-4  xl:flex-row md:gap-6 md:px-24 md:py-10">
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
