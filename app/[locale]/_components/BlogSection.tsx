'use client'

import { Button } from '@/components/ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import BlogFirst from '../../../public/images/BlogFirst.png'
import BlogSecond from '../../../public/images/BlogSecond.png'
import BlogThirth from '../../../public/images/BlogThirth.png'
import { useMediaQuery } from 'react-responsive'

export default function BlogSection() {
    const { t } = useTranslation()
    const data = [
        {
            header: t('blogHeader1'),
            text: t('blogText1'),
            image: BlogFirst,
            buttonText: t('findMore'),
            link: 'https://www.roommate.blog/',
            width: 110,
            height: 200,
        },
        {
            header: t('blogHeader2'),
            text: t('blogText2'),
            image: BlogSecond,
            buttonText: t('findMore'),
            link: 'https://www.roommate.blog/post/a-comprehensive-guide-to-accommodation-options-and-prices-for-international-students-in-tbilisi-geo',
            width: 157,
            height: 144,
        },
        {
            header: t('blogHeader3'),
            text: t('blogText3'),
            image: BlogThirth,
            buttonText: t('findMore'),
            link: 'https://www.roommate.blog/',
            width: 200,
            height: 144,
        },
    ]

    const dragMedia = useMediaQuery({
        query: '(min-width: 0px) and (max-width: 1280px)',
    })
    return (
        <section className="my-12 flex h-full w-full flex-col items-start px-6 sm:px-16 md:px-20 lg:my-24 xl:px-24">
            <h1 className="text-2xl text-[#484848]">{t('blogMainHead')}</h1>

            <Carousel
                opts={{
                    align: 'start',
                    watchDrag: dragMedia,
                }}
                className="mt-6 w-full p-0  "
            >
                <CarouselContent className="pr-6  lg:pr-16 xl:pr-0">
                    {data.map((item, index) => (
                        <CarouselItem key={index} className="w-full md:basis-1/2 xl:basis-1/3">
                            <div className="relative flex  h-full w-full flex-row  overflow-hidden rounded-xl bg-[#c0dbfc]   pb-10 pl-5 pr-[70px] pt-4 sm:pr-20 lg:pb-10 lg:pl-8 lg:pr-[140px] lg:pt-8 ">
                                <div className="flex flex-col">
                                    <span className="text-base font-semibold">{item.header}</span>
                                    <div className="mt-2 flex h-full  flex-col justify-end md:mt-2 md:justify-end">
                                        <span className="z-50 text-xs ">{item.text}</span>
                                        <Link href={item.link}>
                                            <Button className="bottom-0 z-50 mt-4 w-32 text-xs">
                                                {item.buttonText}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <Image
                                    className="absolute -right-4 bottom-0 md:right-0"
                                    width={item.width}
                                    height={item.height}
                                    src={item.image}
                                    alt="123"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden md:block xl:hidden">
                    <CarouselPrevious />
                </div>
                <div className="hidden md:block xl:hidden">
                    <CarouselNext />
                </div>
            </Carousel>
        </section>
    )
}
