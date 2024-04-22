'use client'

import { useTranslation } from 'react-i18next'
import { Bell, Logo, UserIcon } from '../svgs'
import LangChoose from './components/LangChoose'
import MobileNavBar from './components/MobileNavBar'
import Link from 'next/link'

export default function Header() {
    const { t } = useTranslation()

    return (
        <header className="flex  w-full flex-row items-center justify-between bg-headerBg px-6 py-3 shadow-md sm:px-16  md:px-20 md:py-3 xl:px-24 xl:py-6">
            <Link href="/">
                <Logo className="h-6  w-[120px] cursor-pointer md:h-7 md:w-[140px] xl:block xl:h-10 xl:w-[200px]" />
            </Link>
            <div className="flex flex-row items-center">
                <Link href="/signup">
                    <span className="mr-4 hidden   cursor-pointer   rounded-lg md:block md:text-xs  xl:text-base">
                        {t('findRoommate')}
                    </span>
                </Link>

                <span className="mr-4  hidden cursor-pointer rounded-lg md:block md:text-xs xl:text-base">
                    {t('rentApartment')}
                </span>
                <div className="mr-2  flex cursor-pointer flex-row items-center rounded-lg bg-[#F2F5FF] p-2 xl:mr-4 xl:px-3 xl:py-2">
                    <UserIcon className=" h-4 w-4 fill-[#838CAC] xl:h-5 xl:w-5" />
                    <Link href="/login">
                        <span className="ml-1 text-xs  text-[#838CAC] xl:text-base">
                            <span>{t('authorization')}</span>
                        </span>
                    </Link>
                </div>

                <LangChoose
                    className="cursor-pointer rounded-lg bg-[#f2f5ff] p-2 text-xs   md:mr-2 lg:mr-4 lg:p-2 lg:text-base"
                    spanClassname="text-xs xl:text-base text-[#838CAC]"
                />
                <div className=" hidden h-8  w-8 cursor-pointer rounded-lg bg-[#f2f5ff] md:flex md:items-center md:justify-center  lg:h-10 lg:w-10">
                    <Bell className=" h-4 w-4 fill-[#838CAC] lg:h-5 lg:w-5" />
                </div>
                <div className="ml-2 block md:hidden">
                    <MobileNavBar />
                </div>
            </div>
        </header>
    )
}
