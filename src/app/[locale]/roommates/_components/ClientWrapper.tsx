'use client'
import { useEffect, useState } from 'react'
import Filter from './filter/Filter'
import UserCard from './userCard/UserCard'
import { FilterIcon } from '@/src/components/svgs'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'next/navigation'
import { FilterInput } from '@/graphql/typesGraphql'

export default function ClientWrapper() {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const searchParams = useSearchParams()
    const [transformedParams, setTransformedParams] = useState<FilterInput[]>([])
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
            <main className="relative flex min-h-screen w-full  px-6 sm:px-14 flex-col gap-4 py-6 md:py-10 lg:flex-row lg:px-20">
                <div className="h-auto w-full flex justify-start   lg:hidden lg:pl-0">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex  flex-row items-center  rounded-lg border border-[#838CAC] bg-[#F2F5FF] px-4 py-2 "
                    >
                        <FilterIcon className="h-6 w-6" />
                        <span className="ml-2 text-sm text-[#838CAC]">{t('filter')}</span>
                    </button>
                </div>
                <div className="hidden h-full lg:block lg:w-1/2 xl:w-[30%] ">
                    <Filter transformedParams={transformedParams} isOpen={isOpen} />
                </div>
                {isOpen ? (
                    <section className="fixed  h-full w-full  gap-6 bg-white p-6 sm:px-16  md:px-20 lg:hidden ">
                        <div className="flex h-auto w-full flex-col items-end justify-center">
                            <button className="flex" onClick={() => setIsOpen(!isOpen)}>
                                close icon
                            </button>
                        </div>
                        <Filter transformedParams={transformedParams} isOpen={isOpen} />
                    </section>
                ) : null}
                <div className="hidden h-screen w-[1px] bg-[#E3E3E3] xl:block"></div>
                <UserCard transformedParams={transformedParams} />
            </main>
        </>
    )
}
