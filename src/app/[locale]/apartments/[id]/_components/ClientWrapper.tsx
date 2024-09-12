'use client'
import { getPropertyById } from '@/graphql/query'
import { Language } from '@/graphql/typesGraphql'
import {
    Call,
    Checkbox,
    Location,
    PhoneIcon,
    PropertyBed,
    PropertyDoor,
    PropertyLedder,
    PropertySqm,
} from '@/src/components/svgs'
import { Card, CardContent } from '@/src/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/src/components/ui/carousel'
import { useQuery } from '@apollo/client'
import { Check } from 'lucide-react'
import Image from 'next/image'
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
        <main className="flex min-h-screen w-full flex-col gap-10  px-6 pb-10 pt-5 lg:px-[280px]">
            <Carousel className="w-full">
                <CarouselContent>
                    {data?.getProperty?.images &&
                        data?.getProperty?.images.map((item, index) => (
                            <CarouselItem key={index}>
                                <div className="relative flex justify-center p-0">
                                    {/* Background Layer */}
                                    <div
                                        className="absolute inset-0 z-0"
                                        style={{
                                            backgroundImage: `url(${item.thumb})`,
                                            backgroundSize: '150%', // Zoomed-in background
                                            backgroundPosition: 'center',
                                            filter: 'blur(10px)', // Blur effect
                                            transform: 'scale(1.2)', // Slight zoom
                                        }}
                                    />
                                    {/* Foreground Image */}
                                    <CardContent className="relative z-10 flex aspect-square h-[500px] w-auto items-center justify-center p-0">
                                        <Image
                                            fill
                                            src={item.original}
                                            alt={`Image ${index}`}
                                            className="h-full w-full"
                                        />
                                    </CardContent>
                                </div>
                            </CarouselItem>
                        ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <div className="flex w-full flex-col gap-4 rounded-lg border border-[#E3E3E3] px-4 py-8 shadow-lg md:flex-col md:p-8">
                <div className="flex w-full flex-col items-start  gap-2 md:flex-row md:gap-40">
                    <div className="flex w-full flex-col gap-2 md:w-1/2 md:gap-4">
                        <span className="text-lg">
                            {data?.getProperty?.translations &&
                                data?.getProperty?.translations[0].title}
                        </span>
                        <span className="text-sm text-[#838CAC]">
                            {data?.getProperty?.propertyType?.translations[0].name}
                        </span>
                        <span className="md:text-base">{data?.getProperty?.price} $ </span>
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-auto md:gap-4">
                        <div className="flex flex-row  items-center  gap-2">
                            <Location className="h-4 w-4" />
                            <span className="text-base">{data?.getProperty?.street}</span>
                        </div>
                        <div className="flex w-full md:w-auto">
                            <div className="flex w-full cursor-pointer  items-center gap-2 rounded-md bg-mainGreen px-4 py-2  text-white  md:w-auto">
                                <a
                                    href={`tel:${data?.getProperty?.contactPhone}`}
                                    className="flex items-center gap-2"
                                >
                                    <Call className="h-5 w-5 fill-white" />
                                    <span className=" text-sm md:text-base">
                                        {data?.getProperty?.contactPhone}
                                    </span>
                                </a>
                            </div>
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
                        <div className="bg-[#CFF1E]">
                            {data?.getProperty?.propertyDeposit?.amount}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid h-auto  w-full grid-cols-1 gap-4 rounded-lg border border-[#E3E3E3] p-4 shadow-lg md:grid-cols-3 md:gap-y-8  md:p-8">
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <PropertySqm className="h-5 w-5" />
                    <span className="md:text-sm">ფართი: {data?.getProperty?.area}</span>
                </div>
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <PropertyDoor className="h-5 w-5" />
                    <span className="md:text-sm">ოთახები: {data?.getProperty?.rooms}</span>
                </div>
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <PropertyBed className="h-5 w-5" />
                    <span className="md:text-sm">საძინებელი: {data?.getProperty?.bedrooms}</span>
                </div>
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <PropertyDoor className="h-5 w-5" />
                    <span className="md:text-sm">ტევადობა: {data?.getProperty?.bedrooms}</span>
                </div>
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <PropertyLedder className="h-5 w-5" />
                    <span className="md:text-sm">
                        სართულები: {data?.getProperty?.totalFloors}/{data?.getProperty?.floor}
                    </span>
                </div>
            </div>
            <div className="flex h-auto w-full flex-col gap-2 rounded-lg border border-[#E3E3E3] p-4 shadow-lg md:gap-4 md:p-8 ">
                <h2 className="text-base md:text-lg">აღწერა</h2>
                <p className="text-sm">
                    {data?.getProperty?.translations &&
                        data?.getProperty?.translations[0].description}
                </p>
            </div>
            <div className="flex h-auto w-full flex-col gap-2 rounded-lg border  border-[#E3E3E3] p-4 shadow-lg md:gap-6 md:p-8 ">
                <h2 className="text-base md:text-lg">მახასიათებლები</h2>
                <div className="grid-cols-1 gap-y-3 md:grid md:grid-flow-row md:auto-rows-auto md:grid-cols-3  md:grid-rows-[repeat(auto-fill,minmax(0,1fr))]">
                    {data?.getProperty?.propertyAmenities?.map((item, index) => (
                        <div
                            className="mb-2 flex w-full flex-row items-center gap-2 md:mb-0"
                            key={index}
                        >
                            <Checkbox className="h-4 w-4 md:h-5 md:w-5" />
                            <span className="md:text-sm">{item.translations[0].name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex w-full flex-col gap-4 overflow-hidden rounded-lg border  border-[#E3E3E3] pb-8 shadow-lg md:pb-8">
                <div className="w-full bg-mainGreen px-8  py-3 text-white">
                    საცხოვრებლად უსაფრთხო გარემო
                </div>
                {data?.getProperty?.housingLivingSafeties?.map((item, index) => (
                    <div
                        className="flex w-full flex-row items-center gap-2 px-4 md:px-8"
                        key={index}
                    >
                        <Check className="min-h-6 min-w-6 text-mainGreen" />
                        <span>{item.translations[0].name}</span>
                    </div>
                ))}
            </div>
        </main>
    )
}
