// import React from 'react'
// import FooterLogo from '../public/newImages/footer-logo.svg'
// import FooterLogoDesk from '../public/newImages/footer-logo-desk.svg'
// import Image from 'next/image'
// import FooterPhone from '../public/newImages/footer-phone.svg'

// import Footeremail from '../public/newImages/footer-email.svg'

// import Link from 'next/link'

// import { useRouter } from 'next/router'
// import { useTranslation } from 'react-i18next'
// import { SocialIcons } from '../shared/SocialIcons'
// import { useParams, usePathname } from 'next/navigation'

export default function Footer() {
    // const { t } = useTranslation()
    // const params = useParams()
    // const pathname = usePathname()


    return (
        <div className="flex h-full w-full flex-col pt-12">
            {/* <div className="flex flex-col px-6 sm:px-16 md:flex-row md:items-start md:justify-between md:px-20 xl:px-24">
                <div>
                    <div className=" relative h-10  w-60 md:hidden">
                        <Image src={FooterLogo} layout="fill" objectFit="cover" />
                    </div>
                    <div className=" relative hidden  h-12 w-60 md:block">
                        <Image src={FooterLogoDesk} layout="fill" objectFit="cover" />
                    </div>
                </div>
                <div className="mt-8 flex flex-col  gap-y-4 md:mt-0">
                    <Link href="/">
                        <p
                            className="pointer  text-xs hover:underline "
                            style={{ fontWeight: router.pathname === '/' ? 'bold' : '' }}
                        >
                            {t('main')}
                        </p>
                    </Link>
                    <div className="grid gap-y-4 lg:grid-cols-2 lg:gap-x-20">
                        <Link href={user ? '/search' : '/signup'}>
                            <p
                                className="pointer text-xs hover:underline"
                                style={{
                                    fontWeight: router.pathname === '/search' ? 'bold' : '',
                                }}
                            >
                                {t('roommateFind')}
                            </p>
                        </Link>
                        <Link href="/houseSearch">
                            <p
                                className="pointer text-xs hover:underline"
                                style={{
                                    fontWeight: router.pathname === '/houseSearch' ? 'bold' : '',
                                }}
                            >
                                {t('rentApartment')}
                            </p>
                        </Link>
                        <p className="pointer text-xs hover:underline">{t('becomePartner')}</p>
                        <a target="_blank" rel="noopener noreferrer" href="https://roommate.blog/">
                            <p className="pointer text-xs hover:underline"> {t('blog')}</p>
                        </a>
                        <p className="pointer text-xs hover:underline">{t('howItWorks')}</p>
                    </div>
                </div>
                <div className="mt-8 flex flex-col md:mt-0 ">
                    <h1 className="text-xs font-semibold">{t('contact')}</h1>
                    <div className="mt-4 grid  grid-cols-2 gap-4 md:grid-cols-1 ">
                        <Link href="tel:+995599976385">
                            <div className="pointer flex  flex-row items-center rounded-lg bg-[#F2F5FF] px-2 py-3">
                                <Image src={FooterPhone} width={16} height={16} />
                                <p className="ml-2 text-xs">599 976 385</p>
                            </div>
                        </Link>
                        <Link href="mailto:info@roommate.ge">
                            <div className="pointer flex  flex-row items-center rounded-lg bg-[#F2F5FF] px-2 py-3">
                                <Image src={Footeremail} width={16} height={16} />
                                <p className="ml-2 text-xs">info@roommate.ge</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mt-6 hidden h-[1px]  w-full bg-[#7D7D7D] lg:block  "></div>
            <div className="flex flex-col px-6 sm:px-16 md:px-20 md:py-4 lg:flex-row lg:items-center lg:justify-between xl:px-24">
                <div className=" hidden flex-row gap-x-4 lg:flex">
                    <Link
                        target="_blank"
                        href={
                            params.locale === 'ka'
                                ? 'https://roommategeorgia.ge/imgs/%E1%83%AC%E1%83%94%E1%83%A1%E1%83%94%E1%83%91%E1%83%98%20%E1%83%93%E1%83%90%20%E1%83%9E%E1%83%98%E1%83%A0%E1%83%9D%E1%83%91%E1%83%94%E1%83%91%E1%83%98%20&%20%E1%83%93%E1%83%90%E1%83%91%E1%83%A0%E1%83%A3%E1%83%9C%E1%83%94%E1%83%91%E1%83%98%E1%83%A1%20%E1%83%9E%E1%83%9D%E1%83%9A%E1%83%98%E1%83%A2%E1%83%98%E1%83%99%E1%83%90.pdf'
                                : 'https://roommategeorgia.ge/en/Terms%20&%20Conditions%20&%20Payment%20&%20Refund%20Policy.pdf'
                        }
                    >
                        <p className=" pointer text-xs">{t('terms')}</p>
                    </Link>
                    <div className="h-3 w-[1px] bg-[#7D7D7D]"></div>
                    <Link
                        target="_blank"
                        href={
                            params.locale === 'ka'
                                ? 'https://roommategeorgia.ge/imgs/%E1%83%9E%E1%83%94%E1%83%A0%E1%83%A1%E1%83%9D%E1%83%9C%E1%83%90%E1%83%9A%E1%83%A3%E1%83%A0%E1%83%98%20%E1%83%9B%E1%83%9D%E1%83%9C%E1%83%90%E1%83%AA%E1%83%94%E1%83%9B%E1%83%94%E1%83%91%E1%83%98%E1%83%A1%20%E1%83%93%E1%83%90%E1%83%AA%E1%83%95%E1%83%98%E1%83%A1%20%E1%83%9E%E1%83%9D%E1%83%9A%E1%83%98%E1%83%A2%E1%83%98%E1%83%99%E1%83%90.pdf'
                                : 'https://roommategeorgia.ge/en/Personal%20Data%20Processing%20Policy%20(1).pdf'
                        }
                    >
                        <p className=" pointer text-xs">{t('confidencial')}</p>
                    </Link>
                </div>
                <div className="mt-8 flex flex-col md:mt-0 lg:order-2 ">
                    <div className="mt-4 lg:mt-0">
                        <SocialIcons />
                    </div>
                </div>
                <div className="mt-8 h-[1px] w-full bg-[#7D7D7D] lg:mt-0 lg:hidden "></div>
            </div>
            <div className="mt-4 flex flex-row items-center  justify-around bg-[#F2F5FF] px-6 py-4 sm:px-16 md:px-20 lg:justify-center xl:px-24 ">
                <p className=" text-[8px]">Copyrighyt 2024</p>
                <div className="h-3 w-[1px] bg-[#7D7D7D] lg:hidden"></div>
                <p className=" pointer text-[8px] lg:hidden">{t('terms')}</p>
                <div className="h-3 w-[1px] bg-[#7D7D7D] lg:hidden"></div>
                <p className=" pointer text-[8px] lg:hidden">{t('confidencial')}</p>
            </div> */}
        </div>
    )
}
