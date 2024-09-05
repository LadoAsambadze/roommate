'use client'
import { getProperiesList } from '@/graphql/query'
import { Language, PaginatedFilteredPropertiesObject } from '@/graphql/typesGraphql'
import Pagination from '@/src/components/shared/pagination/Pagination'
import {
    ActiveStatus,
    Door,
    Edit,
    InactiveStatus,
    Location,
    Square,
    Trash,
    Wallet,
} from '@/src/components/svgs'
import { useQuery } from '@apollo/client'
import CoverImage from '@images/ApartmentCover.png'
import Image from 'next/image'
import { useParams, useSearchParams } from 'next/navigation'

export default function ClientWrapper() {
    const params = useParams()
    const locale = params.locale as Language
    const searchParams = useSearchParams()
    const page = searchParams.get('page') || '1'
    const currentPage = parseInt(page, 10)
    const limit = 10
    const offset = (currentPage - 1) * limit

    const { data, error } = useQuery(getProperiesList, {
        variables: {
            pagination: {
                limit,
                offset,
            },
            lang: locale,
        },
    })

    if (error) {
        console.error('Error fetching properties:', error)
        return <div>Error loading properties</div>
    }

    const paginatedData = data?.getProperties as PaginatedFilteredPropertiesObject

    return (
        <main className="flex min-h-screen w-full flex-col items-center gap-10 bg-[#F5F5F5]  px-6 py-10 md:flex-row md:items-start md:px-20">
            <div className="  h-[400px] w-[450px] bg-[gray] ">filter</div>
            <div className="hidden min-h-screen w-[1px] bg-gray-200 md:block"></div>
            <div className="grid  w-full  flex-col items-center  gap-10 md:w-auto md:grid-cols-2">
                {data?.getProperties?.list?.map((item, index) => (
                    <div className="flex w-full flex-col gap-4 md:w-[320px]">
                        <div
                            key={index}
                            className="flex w-full flex-col overflow-hidden rounded-md bg-[#FFFFFF] shadow-md"
                        >
                            <Image
                                width={320}
                                height={180}
                                alt="propert image"
                                className="h-[200px] w-full object-cover"
                                src={item.images && item.images[0].thumb}
                            />
                            <div className="flex w-full flex-col gap-4 px-4  py-6">
                                <div className="flex w-full justify-between">
                                    <h1 className="text-base font-bold">
                                        <span>{item?.price} ₾</span>
                                    </h1>
                                    {true ? (
                                        <div className="flex items-center gap-1 rounded-md bg-[#CFF1E6] px-2 py-1">
                                            <span className="text-xs ">აქტიური</span>
                                            <ActiveStatus className="h-4 w-4 fill-mainGreen" />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 rounded-md bg-[#FFDEDE] px-2 py-1">
                                            <span className="text-xs text-[red] ">ვადაგასული</span>
                                            <InactiveStatus className="h-3 w-3 fill-[red]" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex w-full justify-between">
                                    <div className="flex w-full flex-row items-center gap-1">
                                        <Door className="h-4 w-4 md:h-6 md:w-6" />
                                        <span>ოთახების :</span>
                                        {item.rooms}
                                    </div>
                                    <div
                                        className="flex w-full flex-row  items-center gap-1
                                    "
                                    >
                                        <Square className="h-4 w-4 md:h-6 md:w-6" />
                                        <span>ფართი :</span>
                                        {item.area}
                                    </div>
                                </div>
                                <div
                                    className="flex w-full flex-col
                                "
                                >
                                    <div className="flex w-full flex-row items-center justify-start gap-1">
                                        <Location className="h-4 w-4 md:h-6 md:w-6" />
                                        <span className="line-clamp-1 text-ellipsis">
                                            მისამართი :{item.street}
                                        </span>
                                    </div>
                                    <div className="hidden  w-1/2 flex-row items-center justify-start gap-1 md:hidden">
                                        <Wallet className="h-4 w-4 md:h-6 md:w-6" />
                                        <span>ფასი:</span>
                                        {item.price}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <Pagination data={paginatedData} />
            </div>
        </main>
    )
}
