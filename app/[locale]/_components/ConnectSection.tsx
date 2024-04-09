'use client'

import FirstBg from '../../../public/images/ConnectFirstBg.jpg'
import SecondBg from '../../../public/images/ConnectSecondBg.jpg'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

export default function ConnectSection() {
    const { t } = useTranslation()
    return (
        <section className="mt-12 flex w-full flex-col px-6 sm:px-16 md:flex-row md:gap-10  md:px-20  xl:flex-row xl:px-24 ">
            <div className="relative mt-4 h-60 w-full overflow-hidden rounded-xl xl:h-full  xl:w-[90%] xl:bg-[#f2f5ff]">
                <div className="absolute inset-0 bg-connectFirstBg bg-cover bg-center bg-no-repeat  xl:hidden"></div>
                <div className="absolute inset-0 flex flex-row items-center justify-between  rounded-xl bg-[#5e666ebf] bg-opacity-50 p-10 md:py-[10%] xl:relative xl:items-end xl:bg-[#f2f5ff] xl:py-4 xl:pl-12 xl:pr-4 ">
                    <div className="flex h-full w-full flex-col items-start justify-between overflow-hidden xl:w-1/2  xl:pb-20 xl:pr-14">
                        <h1 className="z-50  font-semibold text-[#fff] xl:text-xl   xl:text-[#484848]">
                            {t('partnersHead1')}
                        </h1>
                        <p className="z-50 mt-4 overflow-auto text-xs text-[#fff] xl:text-base xl:text-[#484848] ">
                            {t('partnersText1')}
                        </p>
                        <Button className="mt-7 text-xs   ">{t('startSearch')}</Button>
                    </div>
                    <div className="hidden w-1/2 xl:block">
                        <Image src={FirstBg} className="h-auto max-w-full object-cover" alt="123" />
                    </div>
                </div>
            </div>
            <div className="relative mt-4 h-60 w-full overflow-hidden rounded-xl xl:h-full  xl:w-[90%] xl:bg-[#f2f5ff]">
                <div className="absolute inset-0 bg-connectSecondBg bg-cover bg-center bg-no-repeat  xl:hidden"></div>
                <div className="absolute inset-0 flex flex-row items-center  justify-between rounded-xl bg-[#5e666ebf] bg-opacity-50 p-10 md:py-[10%] xl:relative xl:items-end xl:bg-[#f2f5ff] xl:py-4 xl:pl-12 xl:pr-4">
                    <div className="flex  h-full flex-col items-start justify-between overflow-hidden  xl:w-1/2   xl:pb-20  xl:pr-14">
                        <h1 className="z-50  font-semibold text-[#fff] xl:text-xl   xl:text-[#484848]">
                            {t('partnersHead2')}
                        </h1>
                        <p className="z-50 mt-4 overflow-auto text-xs text-[#fff] xl:text-base xl:text-[#484848] ">
                            {t('partnersText2')}
                        </p>
                        <Link target="_blank" href="https://form.jotform.com/240432625356049">
                            <Button className="mt-7 text-xs">{t('leaveFlat')}</Button>
                        </Link>
                    </div>
                    <div className="hidden w-1/2 xl:block">
                        <Image
                            src={SecondBg}
                            className="h-auto max-w-full object-cover"
                            alt="123"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
