import React, { useCallback } from 'react'
import ReactPaginate from 'react-paginate'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FilterWithPaginationObject } from '@/graphql/typesGraphql'

interface DataProps {
    data: FilterWithPaginationObject
}

export default function Pagination({ data }: DataProps) {
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
        console.log(createQueryString('page', String(nextPage)))
    }

    return (
        <>
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                previousLabel={'Previous'}
                nextLabel={'Next'}
                onPageChange={({ selected }) => handlePageChange(selected)}
                previousClassName=" bg-[red] text-sm"
                containerClassName="flex flex-row gap-2 px-6"

            />
        </>
    )
}
