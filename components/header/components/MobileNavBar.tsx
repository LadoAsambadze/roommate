'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import { BurgerIcon, EmailIcon, PhoneIcon } from '@/components/svgs'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SocialIcons } from '@/components/shared/SocialIcons'

export default function MobileNavBar() {
    const { t } = useTranslation()
    const pathname = usePathname()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <BurgerIcon />
            </SheetTrigger>
            <SheetContent className="flex max-h-screen w-72 flex-col items-start overflow-y-auto bg-[#F2F5FF] px-6 pb-14 pt-3">
                <div className="mt-20 flex flex-col gap-y-6 text-[14px]">
                    <span
                        className="text-xs"
                        style={{ fontWeight: pathname === '/' ? 'bold' : '' }}
                    >
                        {t('main')}
                    </span>
                    <span
                        className="text-xs"
                        style={{ fontWeight: pathname === '/search' ? 'bold' : '' }}
                    >
                        {t('findRoommate')}
                    </span>
                    <span
                        className="text-xs"
                        style={{
                            fontWeight: pathname === '/houseSearch' ? 'bold' : '',
                        }}
                    >
                        {t('rentApartment')}
                    </span>
                    <span className="text-xs">{t('becomePartner')}</span>
                    <span className="text-xs">{t('faq')}</span>
                    <span className="text-xs">{t('howItWorks')}</span>
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
