'use client'

import { useTranslation } from 'react-i18next'
import { UserIcon } from '../svgs'
import LangChoose from './components/LangChoose'

export default function Header() {
    const { t } = useTranslation()

    return (
        <header className="flex  w-full flex-row items-center justify-between bg-headerBg px-6 py-3 shadow-md sm:px-16  md:px-20 md:py-3 xl:px-24 xl:py-6">
            <div className="pointer hidden items-center xl:flex">Here Will Be Logo</div>
            <div className="pointer flex  items-center xl:hidden">Here Will be Logo</div>
            <div className="flex flex-row items-center">
                <span className="mr-4 hidden  cursor-pointer   rounded-lg md:block md:text-xs  xl:text-base">
                    {t('findRoommate')}
                </span>

                <span className="mr-4  hidden cursor-pointer rounded-lg md:block md:text-xs xl:text-base">
                    {t('rentApartment')}
                </span>
                <div className="mr-2  flex cursor-pointer items-center rounded-lg bg-[#F2F5FF] p-2 xl:mr-4 xl:px-3 xl:py-2">
                    <div className="relative h-3 w-3 cursor-pointer xl:h-5 xl:w-5">
                        <UserIcon className="h-full w-full" />
                    </div>
                    <span className="ml-2 text-xs  xl:text-base">
                        <span>{t('authorization')}</span>
                    </span>
                </div>

                <LangChoose
                    className="cursor-pointer rounded-lg bg-[#f2f5ff] p-2 text-xs  md:mr-2 lg:mr-4 lg:p-2 lg:text-base"
                    spanClassname="text-xs xl:text-base"
                />
                {/* <div
                    className="pointer relative hidden  h-8 w-8 rounded-lg bg-[#f2f5ff] p-0  md:block md:px-2 md:pt-[6px]  lg:h-10  lg:w-10"
                    onClick={(e) => {
                        const href = user ? '/profile' : 'login'
                        handleLinkClick(e, href)
                    }}
                >
                    <Image src={Bell} alt="Bell Icon" />
                    {!!user?.notifications?.length && (
                        <div className="bg-primaryBeta absolute -right-3 -top-3 flex  h-7 w-7 items-center justify-center rounded-full text-xs  font-semibold text-white">
                            {user.notifications.length}
                        </div>
                    )}
                </div>
                <div className="ml-2 block md:hidden">
                    <BurgerMenu />
                </div> */}
            </div>
        </header>
    )
}
