'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import { BurgerIcon, EmailIcon, PhoneIcon } from '@/src/components/svgs'
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet'
import { SocialIcons } from '@/src/components/shared/socialIcons/SocialIcons'

export default function MobileNavBar() {
    const { t } = useTranslation()
    const pathname = usePathname()
    const localePattern = /^\/(en|ka)(\/|$)/
    const pathnameWithoutLocale = pathname.replace(localePattern, '/')

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="h-4 w-4">
                    <BurgerIcon className="h-full w-full" />
                </div>
            </SheetTrigger>
            <SheetContent className="flex max-h-screen w-72 flex-col items-start overflow-y-auto bg-[#F2F5FF] px-6 pb-14 pt-3">
                <div className="mt-10 flex flex-col gap-y-6 text-[14px]">
                    <SheetTrigger asChild>
                        <Link href="/">
                            <span
                                className="text-xs"
                                style={{ fontWeight: pathnameWithoutLocale === '/' ? 'bold' : '' }}
                            >
                                {t('main')}
                            </span>
                        </Link>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                        <Link href="?modal=signinChooseType">
                            <span className="text-xs">{t('signIn')}</span>
                        </Link>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                        <Link href="?modal=signupChooseType">
                            <span className="text-xs">{t('signUp')}</span>
                        </Link>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                        <span
                            className="text-xs"
                            style={{ fontWeight: pathnameWithoutLocale === '/login' ? 'bold' : '' }}
                        >
                            {t('findRoommate')}
                        </span>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                        <span
                            className="text-xs"
                            style={{
                                fontWeight: pathnameWithoutLocale === '/#' ? 'bold' : '',
                            }}
                        >
                            {t('rentApartment')}
                        </span>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                        <span className="text-xs">{t('becomePartner')}</span>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                        <span className="text-xs">{t('faq')}</span>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                        <span className="text-xs">{t('howItWorks')}</span>
                    </SheetTrigger>
                </div>
                <Link href="tel:+995599976385">
                    <div className="mt-[150px] flex flex-row">
                        <PhoneIcon />
                        <p className="ml-3 text-[14px] text-[#484848]">599 976 385</p>
                    </div>
                </Link>
                <Link href="mailto:info@roommate.ge">
                    <div className="-mt-2 mb-2 flex flex-row">
                        <EmailIcon />
                        <p className="ml-3  text-[14px] text-[#484848]">info@rommate.ge</p>
                    </div>
                </Link>
                <SocialIcons />
                <div className="h-[2px] w-full bg-[#DADDE7]"></div>
            </SheetContent>
        </Sheet>
    )
}
