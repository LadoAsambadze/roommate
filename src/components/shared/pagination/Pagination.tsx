import React, { useCallback } from 'react'
import ReactPaginate from 'react-paginate'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FilterWithPaginationObject } from '@/graphql/typesGraphql'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from '../../svgs'

type DataProps = {
    data: FilterWithPaginationObject
}

export default function Pagination({ data }: DataProps) {
    const { t } = useTranslation()
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const totalItems = data?.pageInfo.total
    const itemsPerPage = data?.pageInfo.limit
    const pageCount = Math.ceil(totalItems / itemsPerPage)

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )
    const handlePageChange = (selectedPage: number) => {
        const nextPage = selectedPage + 1
        router.push(pathname + '?' + createQueryString('page', String(nextPage)))
    }

    return (
        <>
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                previousLabel={
                    <div className="flex h-full w-full items-center rounded-sm p-1 text-sm hover:bg-slate-300">
                        <ArrowRight className="mr-1 sm:h-5 sm:w-5 w-4 h-4 rotate-180" />
                        <span>{t('prev')}</span>
                    </div>
                }
                nextLabel={
                    <div className="flex  h-full items-center rounded-sm  p-1 text-sm hover:bg-slate-300">
                        <span>{t('next')}</span>
                        <ArrowRight className=" w-4 h-4 sm:h-5 sm:w-5" />
                    </div>
                }
                onPageChange={({ selected }) => handlePageChange(selected)}
                previousClassName="text-sm"
                containerClassName="flex flex-row gap-2 w-full justify-center items-center"
                pageClassName="h-full items-center justify-center flex px-2 hover:bg-slate-300 cursor-pointer border border-[gray] rounded-sm text-sm"
            />
        </>
    )
}
