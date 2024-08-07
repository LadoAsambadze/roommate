'use client'

import { useTranslation } from 'react-i18next'
import { Bell2, Logo, UserIcon2 } from '../svgs'
import LangChoose from './components/LangChoose'
import MobileNavBar from './components/MobileNavBar'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useCallback, useEffect, useState } from 'react'
import { refreshTokens } from '@/src/auth/refreshTokens'
import { signOutHandler } from '@/src/auth/signOut'
import { useRouter, useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function Header() {
    const { t } = useTranslation()
    const [refreshStatus, setRefreshStatus] = useState<boolean | null>(null)

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const authModalHandler = useCallback(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.set('modal', 'signinChooseType')
        const search = current.toString()
        const query = search ? `?${search}` : ''
        router.push(`${pathname}${query}`)
    }, [searchParams, router, pathname])

    useEffect(() => {
        const refresh = async () => {
            const status = await refreshTokens()
            setRefreshStatus(status)
        }
        refresh()
    }, [])
    return (
        <>
            <header className="flex  w-full flex-row items-center justify-between bg-headerBg px-6 py-3 shadow-md   sm:px-16  md:px-20 md:py-3 xl:px-24 xl:py-6">
                <Link href="/">
                    <Logo className="h-6  w-[120px] cursor-pointer md:h-7 md:w-[140px] xl:block xl:h-10 xl:w-[200px]" />
                </Link>
                <div className="flex flex-row items-center">
                    <Link href="/landlords">
                        <button className="mr-4 hidden rounded-lg md:block md:text-xs  xl:text-base">
                            landlords
                        </button>
                    </Link>
                    <Link href="/roommates">
                        <button className="mr-4 hidden rounded-lg md:block md:text-xs  xl:text-base">
                            {t('findRoommate')}
                        </button>
                    </Link>
                    <Link href="#">
                        <button className="mr-4  hidden  rounded-lg md:block md:text-xs xl:text-base">
                            {t('rentApartment')}
                        </button>
                    </Link>

                    {refreshStatus ? (
                        <Button onClick={signOutHandler}>Log out</Button>
                    ) : (
                        <button
                            onClick={authModalHandler}
                            className="mr-2 flex flex-row items-center rounded-lg bg-[#F2F5FF] p-2 xl:mr-4 xl:px-3 xl:py-2"
                        >
                            <UserIcon2 className="h-4 w-4 fill-[#838CAC] xl:h-6 xl:w-6" />
                            <span className="ml-1 text-xs text-[#838CAC] xl:text-base">
                                {t('auth')}
                            </span>
                        </button>
                    )}

                    <LangChoose
                        className="cursor-pointer rounded-lg bg-[#f2f5ff] p-2 text-xs   md:mr-2 lg:mr-4 lg:p-2 xl:text-base"
                        spanClassname="text-xs xl:text-base text-[#838CAC]"
                    />
                    <button className=" hidden h-full  rounded-lg bg-[#f2f5ff] p-2 md:flex md:items-center md:justify-center  ">
                        <Bell2 className=" h-4 w-4 fill-[#838CAC] xl:h-6 xl:w-6" />
                    </button>
                    <button className="ml-2 block md:hidden">
                        <MobileNavBar />
                    </button>
                </div>
            </header>
        </>
    )
}
