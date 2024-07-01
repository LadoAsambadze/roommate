'use client'
import { useEffect, useState } from 'react'
import Filter from './filter/Filter'
import UserCard from './userCard/UserCard'
import { FilterIcon } from '@/src/components/svgs'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'next/navigation'
import { FilterInput } from '@/graphql/typesGraphql'
import { useLockBodyScroll } from '@/src/components/hooks/useLockBodyScroll'

export default function ClientWrapper() {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const searchParams = useSearchParams()
    const [transformedParams, setTransformedParams] = useState<FilterInput[]>([])
    useLockBodyScroll(isOpen)
    useEffect(() => {
        const searchObject = Object.fromEntries(searchParams.entries())
        const transformedParams = Object.entries(searchObject)
            .map(([key, value]) => {
                if (key.startsWith('range_')) {
                    return {
                        questionId: key.replace('range_', ''),
                        dataRange: value.split(','),
                    }
                } else if (key.startsWith('answer_')) {
                    return {
                        questionId: key.replace('answer_', ''),
                        answerIds: value.split(','),
                    }
                }
                return null
            })
            .filter((item) => item !== null) as FilterInput[]
        setTransformedParams(transformedParams)
    }, [searchParams, isOpen])

    return (
        <>
            <main className="relative flex min-h-screen w-full  flex-col  lg:flex-row lg:gap-4 lg:px-20  lg:py-10 xl:px-24">
                <div className="flex h-auto w-full justify-start px-6 pt-6 sm:px-16 md:px-20 md:pt-10    lg:hidden lg:px-0">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex  flex-row items-center   rounded-lg border border-[#838CAC] bg-[#F2F5FF] px-4 py-2 "
                    >
                        <FilterIcon className="h-6 w-6" />
                        <span className="ml-2 text-sm text-[#838CAC]">{t('filter')}</span>
                    </button>
                </div>
                <div className="hidden h-full lg:block lg:w-1/2 xl:w-[30%] ">
                    <Filter
                        transformedParams={transformedParams}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                </div>
                {isOpen ? (
                    <Filter
                        transformedParams={transformedParams}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                ) : null}
                <div className="hidden h-screen w-[1px] bg-[#E3E3E3] xl:block"></div>
                <UserCard transformedParams={transformedParams} />
            </main>
        </>
    )
}
