'use client'

import { useState } from 'react'
import Filter from './filter/Filter'
import UserCard from './userCard/UserCard'
import MobileFilter from './filter/MobileFilter'
import { FilterIcon } from '@/src/components/svgs'
import { DataProps } from '../types'

export default function ClientWrapper({ data }: DataProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <main className="flex min-h-screen w-full flex-col  gap-4  md:gap-6 md:px-20 md:py-10 lg:flex-row">
                <div className="h-auto w-full px-6 pt-4 sm:pl-32  md:pl-24 lg:hidden lg:pl-0">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex  flex-row items-center  rounded-lg border border-[#838CAC] bg-[#F2F5FF] px-4 py-2 "
                    >
                        <FilterIcon className="h-6 w-6" />
                        <span className="ml-2 text-sm text-[#838CAC]">Filter</span>
                    </button>
                </div>
                <div className="hidden h-full lg:block lg:w-1/3 xl:w-1/4">
                    <Filter isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
                <MobileFilter isOpen={isOpen} setIsOpen={setIsOpen} />

                <div className="hidden h-screen w-[1px] bg-[#E3E3E3] xl:block"></div>
                <UserCard data={data} />

            </main>
        </>
    )
}
