import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
} from '@/src/components/ui/pagination'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { DataProps } from '../../types'

export function RoommatesPagination({ data }: DataProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )
    return (
        <Pagination>
            <PaginationContent>
                {data?.pageInfo?.hasPrevious && (
                    <PaginationItem>
                        <Link href={pathname + '?' + createQueryString('page', '5')}>
                            <button>previouse</button>
                        </Link>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                {data?.pageInfo?.hasNextPage && (
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}
