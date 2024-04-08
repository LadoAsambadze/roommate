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

export default function BlogSection() {
    const { t } = useTranslation()
    const data = [
        {
            header: t('blogHeader1'),
            text: t('blogText1'),
            image: BlogFirst,
            buttonText: t('findMore'),
            link: 'https://www.roommate.blog/',
            width: 157,
            height: 144,
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
            width: 157,
            height: 144,
        },
    ]
    // const media = useMediaQuery({
    //     query: '(min-width: 768px) and (max-width: 1280px)',
    // })
    // const dragMedia = useMediaQuery({
    //     query: '(min-width: 0px) and (max-width: 1280px)',
    // })
    return (
        <section className="my-12 flex h-full w-full flex-col items-start px-6 sm:px-16 md:px-20 lg:my-24 xl:px-24">
            <h1 className="text-2xl text-[#484848]">{t('blogMainHead')}</h1>

            <Carousel
                opts={{
                    align: 'start',
                    watchDrag: true,
                }}
                className="mt-6 w-full p-0  "
            >
                <CarouselContent className="  pr-10  lg:pr-16 xl:pr-0">
                    {data.map((item, index) => (
                        <CarouselItem key={index} className="w-full md:basis-1/2 xl:basis-1/3">
                            <div className="relative flex  h-full w-full flex-row justify-between overflow-hidden rounded-xl bg-[#c0dbfc]   pb-10 pl-6 pr-20 pt-4 lg:pb-10 lg:pl-8 lg:pr-[140px] lg:pt-8 ">
                                <div className='flex flex-col'>
                                    <span className="text-base font-semibold">{item.header}</span>
                                    <div className="mt-4 flex  h-full flex-col justify-between">
                                        <span className="z-50 text-xs ">{item.text}</span>
                                        <Link href={item.link}>
                                            <Button className="bottom-0 z-50 mt-4 w-32 text-xs">
                                                {item.buttonText}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <Image
                                    className=" bottom-0 right-0"
                                    width={157}
                                    height={50}
                                    src={item.image}
                                    alt="123"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden xl:block">
                    <CarouselPrevious />
                </div>
                <div className="hidden xl:block">
                    <CarouselNext />
                </div>
            </Carousel>
        </section>
    )
}
