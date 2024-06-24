import Image from 'next/image'
import Avatar from '../../../../../../public/images/MaleAvatar.jpg'
import { Heart, Location, Sms } from '@/src/components/svgs'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { DataProps } from '../../types'
import Pagination from '@/src/components/shared/pagination/Pagination'

export default function UserCard({ data }: DataProps) {
    const { t } = useTranslation()
    return (
        <>
            <section className="flex min-h-screen w-full flex-col items-center justify-center gap-6 px-6 sm:px-32 md:w-auto md:px-24  lg:px-0">
                {data.list &&
                    data.list.map((item, index) => (
                        <div
                            key={index}
                            className="flex h-auto  w-full flex-col gap-6  overflow-hidden rounded-lg bg-[#FFFFFF]  shadow-md  lg:h-[232px] lg:w-full lg:flex-row lg:p-4 xl:w-[770px] "
                        >
                            <Link href="/roommates/1">
                                <Image
                                    src={item?.profileImage ? item?.profileImage : Avatar}
                                    width={400}
                                    height={600}
                                    className="h-[200px] w-full rounded-lg  object-cover lg:h-full  lg:w-[332px]"
                                    alt="test"
                                />
                            </Link>
                            <div
                                id="inside"
                                className="flex h-full w-full flex-col gap-4 p-4 pb-3 pt-4 lg:p-0"
                            >
                                <div className="flex h-auto w-full flex-row  items-center justify-between">
                                    <div className="flex flex-row  items-center gap-1 ">
                                        <span className="text-base font-semibold md:text-sm">
                                            {item.firstname} -
                                        </span>
                                        <span className="text-sm text-[#838CAC]">
                                            {item.age} {t('yearsOld')}
                                        </span>
                                    </div>
                                    <button className="flex flex-row items-center rounded-md bg-[#0A7CFF] px-3 py-2">
                                        <Sms className="h-4 w-4" />
                                        <span className="ml-2 text-sm text-white">
                                            {t('sendMessage')}
                                        </span>
                                    </button>
                                </div>
                                <div className="hidden h-[1px] w-full bg-[#E3E3E3] md:block"></div>

                                <span className=" line-clamp-1 h-full overflow-clip text-ellipsis  text-sm md:line-clamp-2">
                                    {item?.cardInfo?.bio}
                                </span>
                                <div className="flex h-auto w-full flex-row  items-center justify-between">
                                    <div className="flex w-full flex-row gap-2 ">
                                        <span className="text-sm text-[#838CAC]">
                                            {t('userBudget')}
                                        </span>
                                        <span className="text-sm">
                                            {item?.cardInfo?.budget}$ / {t('perMonth')}
                                        </span>
                                    </div>
                                </div>
                                <div className="h-[1px] w-full bg-[#E3E3E3]"></div>
                                <div className="flex h-auto w-full flex-row items-center justify-between">
                                    <div className="flex w-full flex-row items-center gap-3 ">
                                        <Location className="h-5 w-5" />

                                        <div className="w-3/4">
                                            <span className=" line-clamp-1 w-full  text-ellipsis text-sm">
                                                {item?.cardInfo?.districtNames}
                                            </span>
                                        </div>
                                    </div>
                                    <div className=" flex cursor-pointer flex-row items-center gap-3 ">
                                        <Heart />
                                        <span className="text-sm">{t('fav')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                <Pagination data={data} />
            </section>
        </>
    )
}
