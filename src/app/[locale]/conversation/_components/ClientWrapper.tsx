'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { useRouter, useSearchParams } from 'next/navigation'
import ConversationsList from '../_components/ConversationsList'

import Conversation from '../_components/Conversation'
import { useMediaQuery } from 'react-responsive'
import { TwilioDisconnectionAlertDialog } from '../_components/TwilioDisconnectionAlertDialog'
import { MEDIA_QUERY } from '../constants'
import { LIMIT, OFFSET } from '@/src/constants/pagination'
import { twilioConnectionStateVar } from '@/src/conversation/twilioVars'
import { getConversationsForUserQuery } from '@/graphql/query'
import { ConversationStatus } from '@/graphql/typesGraphql'

const ClientWrapper = () => {
    const [request, setRequest] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const media = useMediaQuery({
        query: MEDIA_QUERY,
    })

    const router = useRouter()
    const searchParams = useSearchParams()
    const conversationIdFromParam = searchParams.get('id')

    const twilioConnectionState = useReactiveVar(twilioConnectionStateVar)

    const { data, fetchMore: fetchMoreConversationsForUser } = useQuery(
        getConversationsForUserQuery,
        {
            variables: {
                pagination: {
                    offset: OFFSET,
                    limit: LIMIT,
                },
            },
        }
    )

    const filteredConversationsByStatus = useMemo(() => {
        if (data?.getConversationsForUser?.list?.length) {
            if (request) {
                return data.getConversationsForUser.list.filter(
                    (conversation) => conversation.status !== ConversationStatus.Accepted
                )
            }

            return data.getConversationsForUser.list.filter(
                (conversation) => conversation.status === ConversationStatus.Accepted
            )
        }

        return []
    }, [data, request])

    useEffect(() => {
        if (filteredConversationsByStatus.length && !conversationIdFromParam && media) {
            router.replace(`/conversation?id=${filteredConversationsByStatus[0].id}`)
        }

        if (filteredConversationsByStatus.length && conversationIdFromParam) {
            router.replace(`/conversation?id=${conversationIdFromParam}`)
        }
    }, [filteredConversationsByStatus])

    useEffect(() => {
        if (filteredConversationsByStatus.length && conversationIdFromParam) {
            router.replace(`/conversation?id=${filteredConversationsByStatus[0].id}`)
        }
        if (!filteredConversationsByStatus.length && conversationIdFromParam) {
            router.replace(`/conversation`)
        }
    }, [request])

    useEffect(() => {
        if (!media) {
            if (conversationIdFromParam) {
                setMobileOpen(true)
            } else if (!conversationIdFromParam) {
                setMobileOpen(false)
            }
        }
    }, [media, conversationIdFromParam])

    const isTwilioConnectionDown =
        twilioConnectionState === 'disconnected' || twilioConnectionState === 'denied'

    return (
        <>
            <TwilioDisconnectionAlertDialog open={isTwilioConnectionDown} />
            <main className="flex h-full w-full flex-col overflow-hidden overscroll-none md:h-screen ">
                <div className="relative flex h-full flex-grow flex-row overflow-hidden bg-[#F5F5F5] md:px-20 md:pt-6 xl:px-24">
                    <ConversationsList
                        data={data?.getConversationsForUser}
                        request={request}
                        setRequest={setRequest}
                        mobileOpen={mobileOpen}
                        setMobileOpen={setMobileOpen}
                        conversations={filteredConversationsByStatus}
                        pageInfo={data?.getConversationsForUser?.pageInfo ?? null}
                        fetchMoreConversationsForUser={fetchMoreConversationsForUser}
                    />
                    <Conversation
                        key={conversationIdFromParam}
                        mobileOpen={mobileOpen}
                        setMobileOpen={setMobileOpen}
                        setRequest={setRequest}
                    />
                </div>
            </main>
        </>
    )
}

export default ClientWrapper
