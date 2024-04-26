'use client'

import React, { useState } from 'react'
import Filter from './filter/Filter'
import UserCard from './userCard/UserCard'
import { Button } from '@/components/ui/button'
import MobileFilter from './filter/MobileFilter'

export default function PageWrapper() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <main className="flex min-h-screen w-full flex-col  gap-4  md:flex-row md:gap-6 md:px-24 md:py-10">
                <div className="h-auto w-full px-6 pt-4 sm:px-32 md:hidden">
                    <Button onClick={() => setIsOpen(!isOpen)} className="  flex md:hidden">
                        Filter
                    </Button>
                </div>
                <div className="hidden h-full w-1/4 md:block">
                    <Filter isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
                <MobileFilter isOpen={isOpen} setIsOpen={setIsOpen} />

                <div className="hidden h-screen w-[1px] bg-[#E3E3E3] md:block"></div>
                <UserCard />
            </main>
        </>
    )
}
