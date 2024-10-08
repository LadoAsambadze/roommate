'use client'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/src/components/ui/carousel'
import { BankIcon } from '@/src/components/svgs'
import { useTranslation } from 'react-i18next'

export default function SuggestSection() {
    const { t } = useTranslation()
    const data = [
        {
            header: t('whyUs1'),

            image: BankIcon,
        },
        {
            header: t('whyUs2'),

            image: BankIcon,
        },
        {
            header: t('whyUs3'),

            image: BankIcon,
        },
        {
            header: t('whyUs4'),

            image: BankIcon,
        },
    ]

    return (
        <section className="flex w-full flex-col items-start bg-[#FFF6E4] p-6 sm:px-16 md:px-20 lg:flex-row lg:items-center lg:py-12 xl:px-24">
            <div className="flex flex-col items-start lg:w-2/3 ">
                <h1 className="font-bgCaps text-2xl   text-[#484848] lg:text-[28px]">
                    {t('whyUsLandlord')}
                </h1>
            </div>
            <Carousel
                opts={{
                    align: 'start',
                }}
                className="mt-6 w-full p-0 lg:hidden"
            >
                <CarouselContent className="pr-10 lg:pr-16">
                    {data.map((item, index) => (
                        <CarouselItem key={index} className="w-full md:basis-1/2 lg:w-1/2">
                            <div className="flex h-full w-full flex-col items-start rounded-xl bg-[#c0dbfc] py-4 pl-4 pr-8">
                                <item.image alt="Bank Icon" className="h-8 w-8" />
                                <p className="mt-4 text-xs font-semibold">{item.header}</p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden md:block">
                    <CarouselPrevious />
                </div>
                <div className="hidden md:block">
                    <CarouselNext />
                </div>
            </Carousel>
            <div className="hidden  w-full grid-cols-2 gap-6 lg:grid ">
                {data.map((item, index) => (
                    <div
                        className="flex flex-col items-start justify-start rounded-xl border-b-[3px] border-[#B57100] bg-[#fff] py-8  pl-8 pr-14"
                        key={index}
                    >
                        <item.image alt="Bank Icon" className="h-12 w-12" />
                        <h1 className="mt-6 text-left font-semibold">{item.header}</h1>
                    </div>
                ))}
            </div>
        </section>
    )
}
