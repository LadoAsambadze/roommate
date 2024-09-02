import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Send from '../../public/newImages/send.svg'
import ArrowLeft from '../../public/newImages/arrow-left-chat.svg'
import MessagesList from './MessagesList'
import { Conversation, ConversationUpdateReason } from '@twilio/conversations'
import { useApolloClient, useMutation, useReactiveVar } from '@apollo/client'
import AutosizeTextarea from 'react-textarea-autosize'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { twilioClientVar } from '@/src/conversation/twilioVars'
import { useTranslation } from 'react-i18next'
import { ConversationStatus, ConversationWithUserObject } from '@/graphql/typesGraphql'
import {
    updateConversationResourceStateMutation,
    updateConversationStatusMutation,
} from '@/graphql/mutation'
import { getConversationsForUserQuery } from '@/graphql/query'

type Props = {
    mobileOpen: boolean
    setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
    conversationResource: Conversation
    conversation: ConversationWithUserObject
    setRequest: any
}

export default function MobileConversation({
    mobileOpen,
    setMobileOpen,
    conversationResource,
    conversation,
    setRequest,
}: Props) {
    const [message, setMessage] = useState('')

    const headerRef = useRef<HTMLDivElement>(null)
    const amIUpdaterOfConversationStatus = useRef(null)

    const client = useApolloClient()
    const twilioClient = useReactiveVar(twilioClientVar)

    const router = useRouter()

    const { t } = useTranslation('common')
    const [updateConversationStatus, { loading }] = useMutation(updateConversationStatusMutation, {
        onCompleted: (response) => {
            client.cache.updateQuery({ query: getConversationsForUserQuery }, (data) => {
                if (!data?.getConversationsForUser?.list) return data

                const updatedList = data.getConversationsForUser.list.map((userConversation) =>
                    userConversation.id === conversation.id
                        ? { ...userConversation, status: response.updateConversationStatus }
                        : userConversation
                )

                const updatedConversationIndex = updatedList.findIndex(
                    (userConversation) => userConversation.id === conversation.id
                )

                let reorderedList = updatedList
                if (updatedConversationIndex > 0) {
                    const [updatedConversation] = updatedList.splice(updatedConversationIndex, 1)
                    reorderedList = [updatedConversation, ...updatedList]
                }

                return {
                    ...data,
                    getConversationsForUser: {
                        ...data.getConversationsForUser,
                        list: reorderedList,
                    },
                }
            })
        },
    })

    const [updateConversationResourceState] = useMutation(updateConversationResourceStateMutation)

    const updateConversationStatusInCache = (data: {
        conversation: Conversation
        updateReasons: ConversationUpdateReason[]
    }) => {
        const { conversation, updateReasons } = data

        if (
            updateReasons.includes('state') &&
            conversation &&
            !amIUpdaterOfConversationStatus.current
        ) {
            client.cache.updateQuery(
                {
                    query: getConversationsForUserQuery,
                },
                (data) => {
                    if (data?.getConversationsForUser) {
                        const updateConversations = data.getConversationsForUser.list.map(
                            (conversationObject) => {
                                if (conversation.sid === conversation.sid) {
                                    return {
                                        ...conversationObject,
                                        user: {
                                            ...conversationObject.user,
                                            conversationStatus:
                                                conversation.state.current === 'active'
                                                    ? ConversationStatus.Accepted
                                                    : ConversationStatus.Rejected,
                                        },
                                    }
                                }

                                return conversationObject
                            }
                        )

                        return {
                            ...data,
                            getConversationsForUser: {
                                ...data.getConversationsForUser,
                                list: updateConversations,
                            },
                        }
                    }
                }
            )

            amIUpdaterOfConversationStatus.current = null
        }
    }

    const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value)
    }

    const handleSendMessage = () => {
        if (
            conversationResource &&
            message.length &&
            conversation?.user.conversationStatus !== ConversationStatus.Rejected
        ) {
            conversationResource.sendMessage(message)
            setMessage('')
        }
    }

    const handleBackNavigation = () => {
        setMobileOpen(false)
        router.push('conversation/', undefined, {
            shallow: true,
        })
    }

    const handleAcceptClick = () => {
        setRequest(false)

        amIUpdaterOfConversationStatus.current = true

        updateConversationStatus({
            variables: {
                conversationId: conversation.id,
                status: ConversationStatus.Accepted,
            },
        })

        if (conversationResource.state.current === 'inactive') {
            updateConversationResourceState({
                variables: {
                    sid: conversationResource.sid,
                    state: 'active',
                },
            })
        }
    }

    const handleRejectClick = async () => {
        amIUpdaterOfConversationStatus.current = true

        updateConversationStatus({
            variables: {
                conversationId: conversation.id,
                status: ConversationStatus.Rejected,
            },
        })

        if (conversationResource.state.current === 'active') {
            updateConversationResourceState({
                variables: {
                    sid: conversationResource.sid,
                    state: 'inactive',
                },
            })
        }
    }

    // listen conversation status change
    useEffect(() => {
        if (twilioClient) {
            twilioClient.addListener('conversationUpdated', updateConversationStatusInCache)
        }

        ;() => {
            if (twilioClient) {
                return twilioClient.removeListener(
                    'conversationUpdated',
                    updateConversationStatusInCache
                )
            }
        }
    }, [twilioClient])

    const containerHeight = headerRef.current?.clientHeight
        ? `calc(100% - ${headerRef.current.clientHeight}px)`
        : '100%'

    const participantFullName =
        conversation?.user?.firstname && conversation?.user?.lastname
            ? `${conversation.user.firstname} ${conversation.user.lastname}`
            : 'User'

    return (
        <>
            <section
                className={clsx(
                    'fixed top-0 z-50  h-full w-screen flex-col overflow-y-hidden overscroll-none bg-[#FFFFFF]',
                    mobileOpen ? 'flex' : 'hidden'
                )}
            >
                <div
                    ref={headerRef}
                    className="flex w-full flex-row items-center  justify-between px-6 pb-4 pt-4 shadow-md "
                >
                    <div className="flex flex-row items-center ">
                        <div onClick={handleBackNavigation} className="mr-4">
                            <Image src={ArrowLeft} alt="avatar" />
                        </div>

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
                        <div className="ml-4 flex flex-col justify-between">
                            <span>{participantFullName}</span>
                            {/* <span>active now</span> */}
                        </div>
                    </div>
                </div>
                {(() => {
                    if (conversation?.status === ConversationStatus.Accepted) {
                        return (
                            <div
                                className="flex w-full flex-col justify-end px-4  py-2 pt-5"
                                style={{
                                    height: containerHeight,
                                }}
                            >
                                <MessagesList
                                    conversationResource={conversationResource}
                                    conversation={conversation}
                                />
                                {conversation &&
                                conversation?.user?.conversationStatus !==
                                    ConversationStatus.Rejected ? (
                                    <div className="flex h-auto w-full flex-row items-center px-3 py-4">
                                        <AutosizeTextarea
                                            placeholder="send message"
                                            className="scrollable-content inset-0 mr-2 max-h-20 w-full rounded-xl border border-[gray]  px-3 py-2 text-[14px] focus:outline-[#838CAC]"
                                            value={message}
                                            onChange={handleMessageChange}
                                        />

                                        <Image
                                            src={Send}
                                            width={24}
                                            height={24}
                                            alt="send message"
                                            className="cursor-pointer"
                                            onClick={handleSendMessage}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex h-auto w-full flex-row items-center justify-center px-3 py-4 text-center text-sm ">
                                        {t('rejected')}
                                    </div>
                                )}
                            </div>
                        )
                    }

                    if (
                        conversation?.status === ConversationStatus.Requested ||
                        conversation?.status === ConversationStatus.Rejected
                    ) {
                        return (
                            <div
                                className="flex w-full  flex-col justify-end  p-5 pt-4"
                                style={{
                                    height: containerHeight,
                                }}
                            >
                                <MessagesList
                                    conversationResource={conversationResource}
                                    conversation={conversation}
                                />
                                {conversationResource && (
                                    <div
                                        style={{
                                            backgroundColor:
                                                conversation?.status ===
                                                ConversationStatus.Requested
                                                    ? '#838CAC'
                                                    : '#c25744',
                                        }}
                                        className=" flex w-full flex-col items-center rounded-lg p-6"
                                    >
                                        <span className="text-sm text-[#FFFFFF]">
                                            {conversation?.status === ConversationStatus.Requested
                                                ? t('acceptReject', {
                                                      receiverName: participantFullName,
                                                  })
                                                : t('rejectedMessages', { participantFullName })}
                                        </span>
                                        <div className="mt-6 flex w-full flex-row items-center justify-center gap-4">
                                            <button
                                                className="w-full rounded-xl bg-white px-10 py-2 text-sm text-[#838CAC]"
                                                disabled={loading}
                                                onClick={handleAcceptClick}
                                            >
                                                {t('accept')}
                                            </button>
                                            {conversation?.status ===
                                                ConversationStatus.Requested && (
                                                <button
                                                    className="w-full rounded-xl border border-[#FFFFFF] px-10 py-2 text-sm text-[#FFFFFF]"
                                                    disabled={loading}
                                                    onClick={handleRejectClick}
                                                >
                                                    {t('reject')}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    }

                    if (conversation?.status === ConversationStatus.Rejected) {
                        return 'rejected'
                    }

                    return <></>
                })()}
            </section>
        </>
    )
}
