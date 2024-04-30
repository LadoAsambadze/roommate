/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useTranslation } from 'react-i18next'


// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export default function ApartmentSection({ flats }: any) {
    const { t } = useTranslation()


    return (
        <>
            <section>
                <h1 className="pb-6 pl-6 pt-12 text-2xl text-[#484848] sm:px-16 md:px-20  lg:pb-7 lg:pt-12 xl:px-24 ">
                    {t('findAffordable')}
                </h1>
                <div className="relative flex w-full   flex-col items-start  pb-8  pl-6 sm:px-16  md:px-20 xl:px-24">
                    <Carousel
                        opts={{
                            align: 'start',
                        }}
                        className="w-full p-0   "
                    >
                        <CarouselContent className=" pr-12 lg:pr-16">
                            {flats &&
                                flats?.map((item: any) => (
                                    <CarouselItem
                                        key={item}
                                        className="pointer w-full  sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                    >
                                        <div className="border-1  flex w-full flex-col items-start  justify-start  overflow-auto text-ellipsis whitespace-nowrap  rounded-xl ">
                                            <div className="w-full  overflow-hidden rounded-t-xl">
                                                <div
                                                    style={{
                                                        height: '214px',
                                                        position: 'relative',
                                                    }}
                                                >
                                                    {/* <img
                                                        src={item.images[0].original}
                                                        style={{
                                                            objectFit: 'cover',
                                                            width: '100%',
                                                            height: '100%',
                                                        }}
                                                    /> */}
                                                </div>
                                            </div>

                                            <div className="relative flex  w-full flex-col px-4 pb-4 pt-7">
                                                <h1 className=" text-xl font-bold text-[#484848]">
                                                    {item.price} ₾/ {t('InMonth')}
                                                </h1>
                                                <div className="mt-4 flex  flex-row items-center">
                                                    <div className="flex flex-row items-center">
                                                        {/* <Image src={Door} width={24} height={24} /> */}
                                                        <p className="ml-2 text-sm text-[#484848]">
                                                            {t('room')}: {item.room}
                                                        </p>
                                                    </div>
                                                    <div className="ml-10 flex flex-row items-center">
                                                        {/* <Image
                                                            src={Square}
                                                            width={24}
                                                            height={24}
                                                        /> */}
                                                        <p className="ml-2 text-sm text-[#484848]">
                                                            {t('area')} - {item.area}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-2 flex flex-row items-center">
                                                    {/* <Image src={Location} width={24} height={24} /> */}
                                                    <p className="ml-2 text-sm text-[#484848]">
                                                        {item?.district?.title}
                                                    </p>
                                                </div>
                                                <div className="absolute -top-5 right-4">
                                                    {/* <Image src={Cursor} width={40} height={40} /> */}
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                        </CarouselContent>
                        {/*
            {media ? null : <CarouselPrevious />}
            {media ? null : <CarouselNext />} */}
                    </Carousel>
                    <Link href="/houseSearch">
                        <p className="text pointer absolute -bottom-5 right-24 hidden text-sm text-[#484848] underline md:block">
                            {t('viewAll')}
                        </p>
                    </Link>
                    <Link href="/houseSearch">
                        <div className="mt-6 flex w-[92%] items-center justify-center rounded-md border border-[#838CAC]  py-2 text-sm text-[#838CAC] md:hidden">
                            {t('viewAll')}
                        </div>
                    </Link>
                </div>
            </section>
        </>
    )
}
