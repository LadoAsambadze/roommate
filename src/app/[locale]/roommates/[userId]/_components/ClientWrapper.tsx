'use client'

import { useState } from 'react'
import {
    Calendar,
    Check,
    Heart,
    Like,
    Location,
    Minus,
    Pets,
    Sex,
    Verified,
    Wallet,
} from '@/src/components/svgs'
import Avatar from '@images/UniversalAvatar.webp'
import { withAuth } from '@/src/auth/withAuth'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { getRoommate } from '@/graphql/query'
import { Language } from '@/graphql/typesGraphql'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import SendMessageButton from '@/src/components/shared/sendMessageButton/SendMessageButton'
import ConversationWindow from '@/src/components/shared/conversationWindow/ConversationWindow'
import { cn } from '@/src/utils/cn'

const ClientWrapper = () => {
    const [isOpenedConversationWindow, setIsOpenedConversationWindow] = useState(false)

    const { t } = useTranslation('roommates')

    const params = useParams<{
        userId: string
        locale?: Language
    }>()

    const locale = params.locale
    const userId = params.userId

    const { data, loading, error } = useQuery(getRoommate, {
        variables: {
            id: userId,
            lang: locale,
        },
    })

    const user = data?.getRoommate
    const fullName = user?.firstname && user?.lastname ? `${user?.firstname} ${user?.lastname}` : ''

    return (
        <>
            {isOpenedConversationWindow && (
                <ConversationWindow
                    setIsOpen={setIsOpenedConversationWindow}
                    name={user?.firstname ?? ''}
                    participantId={userId}
                    avatar={user?.profileImage ?? ''}
                />
            )}
            <main className="w-full bg-[#F5F5F5]">
                <div className="mx-auto flex h-fit max-w-[1100px] flex-col md:gap-6 md:px-20 md:py-8">
                    <section className="flex h-full w-full flex-col md:h-[280px] md:flex-row md:gap-3">
                        <div className="relative h-[300px] w-full overflow-hidden md:h-full md:rounded-lg md:shadow-sm">
                            <Image
                                fill
                                style={{ objectFit: 'cover' }}
                                src={user?.profileImage ? user?.profileImage : Avatar}
                                alt="Fallback Avatar"
                            />
                        </div>
                        <div className="z-10 -mt-5 flex h-auto w-full flex-col overflow-scroll overscroll-none rounded-t-3xl bg-[#FFFFFF] md:mt-0 md:rounded-xl md:border md:border-[#E3E3E3] md:shadow-sm">
                            <div className="p-6">
                                <div className="flex w-full flex-row items-start justify-between">
                                    <p className="text-base font-semibold md:text-sm">
                                        <span>{fullName}</span>
                                        <span> - </span>
                                        <span>{user?.age ?? ''}</span>
                                        <span>&nbsp;</span>
                                        <span>{t('yearsOld')}</span>
                                    </p>
                                    <Heart className="h-6 w-6 cursor-pointer" />
                                </div>
                                <p className="text-sm italic text-[#838CAC]">
                                    {user?.createdAt ? format(user.createdAt, 'dd.MM.yyyy') : ''}
                                </p>
                            </div>
                            <div className="px-6 md:px-0">
                                <div className="w-full border-b border-[#E3E3E3]"></div>
                            </div>
                            <div className="flex w-full flex-row items-center justify-between p-6">
                                <span className="text-sm text-[#838CAC]">{t('leaveMessage')}</span>
                                <SendMessageButton
                                    userId={userId}
                                    setIsOpenedConversationWindow={setIsOpenedConversationWindow}
                                />
                            </div>
                            <div className="px-6 md:px-0">
                                <div className="w-full border-b border-[#E3E3E3]"></div>
                            </div>
                            <div className="p-6">
                                <p className="mb-4 text-sm text-[#838CAC]">{t('aboutMe')}</p>
                                <p className="text-sm">
                                    შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და
                                    ტიპოგრაფიული ნაწარმის, შემთხვევითად გენერირებული ტექსტი ეხმარება
                                    დიზაინერებს და ტიპოგრაფიული ნაწარმის.
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="bg-[#FFFFFF] px-6 md:hidden md:px-0">
                        <div className="w-full border-b border-[#E3E3E3]"></div>
                    </div>

                    <section className="flex h-full w-full flex-col gap-6 bg-[#FFFFFF] p-6 md:flex-row md:flex-wrap md:justify-start md:gap-8 md:rounded-xl md:border md:border-[#E3E3E3] md:shadow-sm">
                        <div className="flex w-auto flex-row items-start">
                            <Wallet className="h-6 w-6" />
                            <div className="ml-4 flex flex-col">
                                <span className="mb-2 text-sm text-[#838CAC]">
                                    {t('userBudget')}
                                </span>
                                <span className="text-sm">500$ / თვეში</span>
                            </div>
                        </div>
                        <div className="flex w-auto flex-row items-start">
                            <Calendar className="h-6 w-6" />
                            <div className="ml-4 flex flex-col">
                                <span className="mb-2 text-sm text-[#838CAC]">
                                    {t('available')}
                                </span>
                                <span className="text-sm">2 აპრილი 2024</span>
                            </div>
                        </div>
                        <div className="flex w-auto flex-row items-start">
                            <Calendar className="h-6 w-6" />
                            <div className="ml-4 flex flex-col">
                                <span className="mb-2 text-sm text-[#838CAC]">{t('duration')}</span>
                                <span className="text-sm">6 თვით</span>
                            </div>
                        </div>
                        <div className="flex w-auto flex-row items-start">
                            <Location className="h-6 w-6" />
                            <div className="ml-4 flex flex-col">
                                <span className="mb-2 text-sm text-[#838CAC]">{t('location')}</span>
                                <span className="text-sm">გოთუას #2</span>
                            </div>
                        </div>
                    </section>

                    <div className="bg-[#FFFFFF] px-6 md:hidden md:px-0">
                        <div className="w-full border-b border-[#E3E3E3]"></div>
                    </div>

                    <section className="flex h-full w-full flex-col gap-6 bg-[#FFFFFF] p-6 md:flex-row md:flex-wrap md:justify-start md:gap-8 md:rounded-xl md:border md:border-[#E3E3E3] md:shadow-sm">
                        <div className="flex w-auto flex-row items-start">
                            <Pets className="h-6 w-6" />
                            <div className="ml-4 flex flex-col">
                                <span className="mb-2 text-sm text-[#838CAC]">{t('pet')}</span>
                                <span className="text-sm">5 თხა</span>
                            </div>
                        </div>
                        <div className="flex w-auto flex-row items-start">
                            <Like className="h-6 w-6" />
                            <div className="ml-4 flex flex-col">
                                <span className="mb-2 text-sm text-[#838CAC]">
                                    {t('interests')}
                                </span>
                                <span className="text-sm">ხატვა, ცეკვა</span>
                            </div>
                        </div>
                        <div className="flex w-auto flex-row items-start md:max-w-96">
                            <Like className="h-6 w-6" />
                            <div className="ml-4 flex flex-col">
                                <span className="mb-2 text-sm text-[#838CAC]">
                                    {t('university')}
                                </span>
                                <span className="text-sm">ილიას სახელმწიფო უნივერსიტეტი</span>
                            </div>
                        </div>
                        <div className="flex w-auto flex-row items-start ">
                            <Sex className="h-6 w-6" />
                            <div className="ml-4 flex flex-col">
                                <span className="mb-2 text-sm text-[#838CAC]">{t('roommate')}</span>
                                <span className="text-sm">ყველა</span>
                            </div>
                        </div>
                    </section>

                    <section className="h-full w-full rounded-xl bg-[#FFFFFF] p-6 md:p-0">
                        <div className="rounded-t-xl bg-[#838CAC] px-8 py-4">
                            <p className="text-base font-bold text-white">{t('inSearch')}</p>
                        </div>

                        <div className="grid h-full w-full auto-rows-fr grid-cols-1 rounded-b-xl border-x border-b border-[#E3E3E3] p-6 shadow-sm md:grid-cols-3">
                            <div className="flex flex-row">
                                <Check className="h-6 w-6" />
                                <span className="ml-1.5">generated text</span>
                            </div>
                            <div className="flex flex-row">
                                <Minus className="h-6 w-6" />
                                <span className="ml-1.5">generated text generated text</span>
                            </div>
                            <div className="flex flex-row">
                                <Minus className="h-6 w-6" />
                                <span className="ml-1.5">generated text generated text</span>
                            </div>
                            <div className="flex flex-row">
                                <Minus className="h-6 w-6" />
                                <span className="ml-1.5">generated text generated text</span>
                            </div>
                            <div className="flex flex-row">
                                <Minus className="h-6 w-6" />
                                <span className="ml-1.5">generated text generated text</span>
                            </div>
                        </div>
                    </section>

                    <section className="h-full w-full rounded-xl bg-[#FFFFFF] p-6 md:p-0">
                        <div
                            className={cn(
                                { 'rounded-xl bg-red-500 shadow-sm': !user?.verified },
                                { 'rounded-t-xl bg-[#52A630]': user?.verified },
                                'flex h-auto w-full items-center gap-2 px-4 py-2'
                            )}
                        >
                            <Verified className="h-6 w-6" />
                            <span className="text-sm text-white">
                                {!user?.verified ? t('userNotVerified') : t('verifiedUser')}
                            </span>
                        </div>
                        {user?.verified && (
                            <div className="flex h-full w-full flex-row rounded-b-xl border-x border-b border-[#E3E3E3] p-6 shadow-sm md:flex-row">
                                <Check className="h-6 w-6" />
                                <span className="ml-1.5">{t('idCard')}</span>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </>
    )
}

export default withAuth(ClientWrapper)
