'use client'
import { getPropertyById } from '@/graphql/query'
import { Language } from '@/graphql/typesGraphql'
import { Call, Location, PhoneIcon, PropertySqm } from '@/src/components/svgs'
import { useQuery } from '@apollo/client'
import { useParams } from 'next/navigation'

export default function ClientWrapper() {
    const params = useParams()
    const locale = params.locale
    const id = params.id as string
    const { data, error } = useQuery(getPropertyById, {
        variables: {
            lang: locale as Language,
            id: id,
        },
    })

    return (
        <main className="flex min-h-screen w-full flex-col gap-10  px-6 py-10 lg:px-[280px]">
            <div className="flex w-full flex-col gap-4 rounded-lg border border-[#E3E3E3] px-4 py-8 shadow-xl md:flex-row">
                <div>
                    <div className="flex w-full flex-col gap-2">
                        <span className="text-lg">
                            {data?.getProperty?.translations &&
                                data?.getProperty?.translations[0].title}
                        </span>
                        <span className="text-sm text-[#838CAC]">
                            {data?.getProperty?.propertyType?.translations[0].name}
                        </span>
                        <span className="text-base">{data?.getProperty?.price} $</span>
                    </div>
                    <div className="flex w-auto flex-col gap-2">
                        <div className="flex flex-row items-center gap-1">
                            <Location className="h-4 w-4" />
                            <span className="text-base">{data?.getProperty?.street}</span>
                        </div>
                        <div className="flex w-auto items-center gap-1 rounded-md bg-mainGreen p-2 text-white ">
                            <Call className="fill-white" />
                            <span>{data?.getProperty?.contactPhone}</span>
                        </div>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-[#E3E3E3]"></div>
                <div className="flex w-auto flex-col gap-2">
                    <span>ქირაობა ხელმისაწვდომია: {data?.getProperty?.availableFrom}</span>
                    <span>მინიმალური დარჩენის ვადა: {data?.getProperty?.minRentalPeriod}</span>
                    {data?.getProperty?.withDeposit ? (
                        <div className="w-auto bg-[#CFF1E6] p-2">დეპოზიტის გარეშე</div>
                    ) : (
                        <div className="bg-[#CFF1E]">{data?.getProperty?.withDeposit}</div>
                    )}
                </div>
            </div>

            <div className="flex w-full flex-col gap-4 rounded-lg border border-[#E3E3E3] px-4 py-8 shadow-xl md:flex-row">
                <div>
                    <PropertySqm /> <span>ფართი: {data?.getProperty?.area}</span>
                </div>

                <span>{data?.getProperty?.rooms}</span>
                <span>{data?.getProperty?.bedrooms}</span>
                <span>{data?.getProperty?.capacity}</span>
            </div>
        </main>
    )
}
