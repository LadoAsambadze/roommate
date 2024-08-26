'use client'

import { useTranslation } from 'react-i18next'
import { Bell2, Logo, UserIcon2 } from '../svgs'
import LangChoose from './components/LangChoose'
import MobileNavBar from './components/MobileNavBar'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useApolloClient, useQuery, useReactiveVar } from '@apollo/client'
import { isAuthenticatedVar } from '@/src/auth/isAuthenticatedVar'
import { getUserQuery } from '@/graphql/query'
import { signOutHandler } from '@/src/auth/signOut'

export default function Header() {
    const { t } = useTranslation()

    const [isClient, setIsClient] = useState(false)
    const [isLoadingUser, setIsLoadingUser] = useState(true) // New state to track user data loading
    const authStatus = useReactiveVar(isAuthenticatedVar)

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { data: user, loading: userLoading } = useQuery(getUserQuery, {
        skip: !authStatus.valid,
    })

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        setIsLoadingUser(false)
    }, [userLoading])

    const signinModalHandler = useCallback(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.set('modal', 'signinChooseType')
        const search = current.toString()
        const query = search ? `?${search}` : ''
        router.push(`${pathname}${query}`)
    }, [searchParams, router, pathname])

    const signupModalHandler = useCallback(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.set('modal', 'signupChooseType')
        const search = current.toString()
        const query = search ? `?${search}` : ''
        router.push(`${pathname}${query}`)
    }, [searchParams, router, pathname])

    const renderAuthSection = () => {
        if (!isClient || isLoadingUser) {
            return <div>Loading...</div>
        }

        if (authStatus.checking) {
            return <div>Loading...</div>
        }

        if (authStatus.valid && user) {
            return (
                <>
                    <button className="hidden flex-row items-center rounded-lg bg-[#F2F5FF] p-2 md:flex   xl:px-3 xl:py-2">
                        <UserIcon2 className="h-4 w-4 fill-[#838CAC] xl:h-6 xl:w-6" />
                        <span className="ml-1 text-xs text-[#838CAC] xl:text-base">
                            {user.me.firstname}
                        </span>
                    </button>
                    <button
                        onClick={signOutHandler}
                        className="hidden flex-row items-center rounded-lg bg-[#F2F5FF] p-2 md:flex   xl:px-3 xl:py-2"
                    >
                        <span className="ml-1 text-xs text-[#838CAC] xl:text-base">
                            {t('signOut')}
                        </span>
                    </button>
                </>
            )
        }

        if (!authStatus.valid) {
            return (
                <>
                    <button
                        onClick={signupModalHandler}
                        className="hidden flex-row items-center rounded-lg bg-[#F2F5FF] p-2 md:flex xl:px-3 xl:py-2"
                    >
                        <UserIcon2 className="h-4 w-4 fill-[#838CAC] xl:h-6 xl:w-6" />
                        <span className="ml-1 text-xs text-[#838CAC] xl:text-base">
                            {t('signUp')}
                        </span>
                    </button>

                    <button
                        onClick={signinModalHandler}
                        className="hidden flex-row items-center rounded-lg bg-[#F2F5FF] p-2 md:flex xl:px-3 xl:py-2"
                    >
                        <UserIcon2 className="h-4 w-4 fill-[#838CAC] xl:h-6 xl:w-6" />
                        <span className="ml-1 text-xs text-[#838CAC] xl:text-base">
                            {t('auth')}
                        </span>
                    </button>
                </>
            )
        }
    }

    return (
        <>
            <header className="flex  w-full flex-row items-center justify-between bg-headerBg px-6 py-3 shadow-md   sm:px-16  md:px-20 md:py-3 xl:px-24 xl:py-6">
                <Link href="/">
                    <Logo className="h-6  w-[120px] cursor-pointer md:h-7 md:w-[140px] xl:block xl:h-10 xl:w-[200px]" />
                </Link>

                <div className="flex flex-row items-center gap-2 md:gap-4">
                    {renderAuthSection()}

                    <LangChoose
                        className="cursor-pointer rounded-lg bg-[#f2f5ff] p-2 text-xs    lg:p-2 xl:text-base"
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
