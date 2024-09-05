'use client'

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useRouter, useSearchParams } from 'next/navigation'
import { useVirtualizer } from '@tanstack/react-virtual'

import { Howl } from 'howler'

import {
    ConversationStatus,
    ConversationWithUserObject,
    PaginationInfoObject,
} from '@/graphql/typesGraphql'
import { MEDIA_QUERY } from '../constants'
import { LIMIT } from '@/src/constants/pagination'
import { Spinner } from '@/src/components/ui/spinner'
import { cn } from '@/src/utils/cn'

const sound = new Howl({
    src: ['./../sound.mp3'],
})

type Props = {
    request: boolean
    setRequest: Dispatch<SetStateAction<boolean>>
    setMobileOpen: Dispatch<SetStateAction<boolean>>
    conversations: ConversationWithUserObject[] | []
    pageInfo: PaginationInfoObject | null
    // FIXME: because argument and return types is not fully typed, autosuggestion is not working
    fetchMoreConversationsForUser: Function
    data: any // need type
    mobileOpen: boolean
}

const CONVERSATION_BOX_ESTIMATE_HEIGHT = 80

export default function ConversationsList({
    request,
    setRequest,
    setMobileOpen,
    conversations,
    pageInfo,
    data,
    fetchMoreConversationsForUser,
}: Props) {
    const parentDomRef = useRef<HTMLDivElement>(null)

    const router = useRouter()

    const searchParams = useSearchParams()
    const conversationIdFromParam = searchParams.get('id')

    const [requestMessage, setRequestMessage] = useState(false)
    const media = useMediaQuery({ query: MEDIA_QUERY })

    const virtualizer = useVirtualizer({
        count: pageInfo?.hasNextPage ? conversations.length + 1 : conversations.length,
        getScrollElement: () => parentDomRef.current,
        estimateSize: () => CONVERSATION_BOX_ESTIMATE_HEIGHT,
        overscan: 5,
    })

    const handleClickConversation = (conversationId: string) => {
        if (conversationId !== conversationIdFromParam) {
            router.push(`/conversation?id=${conversationId}`)
        }
        if (!media) {
            setMobileOpen(true)
        }
    }

    const chatClickHandler = () => {
        setRequest(false)
    }

    const requestClickHandler = () => {
        setRequest(true)
    }

    useEffect(() => {
        const [lastVirtualItem] = [...virtualizer.getVirtualItems()].reverse()

        if (!lastVirtualItem) {
            return
        }

        if (lastVirtualItem.index >= conversations.length - 1 && pageInfo?.hasNextPage) {
            fetchMoreConversationsForUser({
                variables: {
                    pagination: {
                        offset: conversations.length,
                        limit: LIMIT,
                    },
                },
            })
        }
    }, [pageInfo?.hasNextPage, virtualizer.getVirtualItems(), conversations.length])

    useEffect(() => {
        const hasUnreadMessages = conversations.some((item: any) => item?.unreadMessagesCount > 0)
        if (hasUnreadMessages) {
            sound.play()
        }
    }, [conversations])

    useEffect(() => {
        const hasRequested =
            data &&
            data.list.some(
                (item: { status: ConversationStatus; unreadMessagesCount: number }) =>
                    (item?.status === ConversationStatus.Requested ||
                        item?.status === ConversationStatus.Rejected) &&
                    item?.unreadMessagesCount > 0
            )

        if (hasRequested) {
            setRequestMessage(true)
        } else {
            setRequestMessage(false)
        }
    }, [data, request])

    useEffect(() => {
        const filteredAccepts = data?.list?.filter(
            (item: { status: ConversationStatus }) => item.status === ConversationStatus.Accepted
        )

        const filteredRequestsRejects = data?.list?.filter(
            (item: { status: ConversationStatus }) =>
                item.status === ConversationStatus.Rejected ||
                item.status === ConversationStatus.Requested
        )

        if (filteredAccepts?.length === 0 && filteredRequestsRejects?.length !== 0) {
            setRequest(true)
        }
    }, [data])

    return (
        <section className="flex w-full flex-col items-start rounded-md  border-[gray] bg-[#FFFFFF]  md:w-[100px] md:border-b-4 lg:w-[400px]">
            <div className="block w-full">
                <div className="flex flex-row items-center justify-start gap-6 px-6 py-2 md:flex-col lg:flex-row">
                    <span
                        className={cn(
                            'cursor-pointer',
                            !request && 'text-[#0A7CFF]',
                            request && 'text-[#838CAC]'
                        )}
                        onClick={chatClickHandler}
                    >
                        chat
                    </span>
                    <span
                        className={cn(
                            'relative cursor-pointer',
                            request && 'text-[#0A7CFF]',
                            !request && 'text-[#838CAC]'
                        )}
                        onClick={requestClickHandler}
                    >
                        request
                        {requestMessage && (
                            <div className="absolute   -right-5 -top-2 z-50 ">
                                <svg
                                    width="20px"
                                    height="18px"
                                    viewBox="0 0 24 24"
                                    fill="#ccdffc"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />

                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            opacity="0.15"
                                            d="M20 4H4V16H7V21L12 16H20V4Z"
                                            fill="#0A7CFF"
                                        />
                                        <path
                                            d="M8 10H8.01M12 10H12.01M16 10H16.01M4 4H20V16H12L7 21V16H4V4Z"
                                            stroke="#0A7CFF"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </g>
                                </svg>
                            </div>
                        )}
                    </span>
                </div>
                <div className="h-[1px] w-full bg-[#E3E3E3]"></div>
            </div>
            <div className="w-full overflow-auto " ref={parentDomRef}>
                <div
                    className="relative w-full"
                    style={{
                        height: `${virtualizer.getTotalSize()}px`,
                    }}
                >
                    {virtualizer.getVirtualItems().map((virtualRow) => {
                        const isLoaderRow = virtualRow.index > conversations.length - 1

                        const conversation = conversations[virtualRow.index]

                        return (
                            <>
                                {isLoaderRow ? (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <Spinner size="small" />
                                    </div>
                                ) : (
                                    <div
                                        key={virtualRow.index}
                                        data-index={virtualRow.index}
                                        ref={virtualizer.measureElement}
                                        className={cn(
                                            'absolute flex w-full cursor-pointer flex-row items-center justify-center border-b-2 border-[#E3E3E3] px-6 py-2 md:p-0 lg:justify-between lg:px-4 lg:py-2',
                                            conversation?.id === conversationIdFromParam
                                                ? 'bg-[#e7e7fe]'
                                                : ''
                                        )}
                                        style={{
                                            transform: `translateY(${virtualRow.start}px)`,
                                        }}
                                        onClick={() =>
                                            !isLoaderRow
                                                ? handleClickConversation(conversation.id)
                                                : {}
                                        }
                                    >
                                        <div className="relative flex  h-full w-full  flex-row  items-center justify-start md:justify-center md:py-2 lg:justify-start lg:py-0">
                                            <div className="relative h-10 w-10 overflow-hidden rounded-[50%]">
                                                {conversation?.user?.profileImage ? (
                                                    <img
                                                        src={conversation?.user?.profileImage}
                                                        alt="User Avatar"
                                                        className=" h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <img
                                                        src="./../newImages/default-avatar.png"
                                                        alt="Fallback Avatar"
                                                        className=" h-full w-full object-cover"
                                                    />
                                                )}
                                            </div>

                                            {!!conversation.unreadMessagesCount && (
                                                <div
                                                    id="#tablet"
                                                    className="absolute left-12 hidden  h-5 w-5 items-center justify-center rounded-full bg-[#DB0505] text-[10px] text-white md:flex lg:hidden"
                                                >
                                                    {conversation.unreadMessagesCount}
                                                </div>
                                            )}

                                            <div className="ml-6 flex h-full flex-col  items-center justify-center md:hidden lg:flex">
                                                <span className="text-[14px] font-semibold text-[#484848]">
                                                    {conversation?.user?.firstname ?? ''}
                                                </span>
                                                {/* <span className="text-[#838CAC] text-xs mt-1">
                          last message or active now 
                        </span> */}
                                            </div>
                                        </div>
                                        {!!conversation.unreadMessagesCount && (
                                            <div className="flex h-5 w-5 items-center  justify-center rounded-full bg-[#DB0505] md:hidden lg:flex">
                                                <span className="text-center text-[10px] text-white">
                                                    {conversation.unreadMessagesCount}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}