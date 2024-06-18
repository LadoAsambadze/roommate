'use client'
import MobileCover from '../../../public/images/CoverDesktop.jpg'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

export default function CoverSection() {
    const { t } = useTranslation()
    return (
        <>
            <section className="relative w-full px-6 pb-2  pt-6 sm:px-16  md:px-20 xl:px-24">
                <Image
                    src={MobileCover}
                    alt="123"
                    className="h-[300px] w-full rounded-md  object-cover "
                />

                <div className="absolute top-0 flex  h-full flex-col justify-center overflow-hidden rounded-xl pl-4 md:pl-8">
                    <p className=" text-xl  font-medium leading-10 text-[#FFFFFF] lg:text-4xl ">
                        {t('coverHeader')}
                    </p>
                    <div className=" mt-4 hidden flex-row  gap-x-7 md:flex xl:mt-12">
                        <Link href={false ? '/search' : '/signup'}>
                            <Button className="w-auto md:text-base  ">{t('findRoommate')}</Button>
                        </Link>
                        <Link href="/houseSearch">
                            <Button className="w-auto md:text-base">{t('rentApartment')}</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
