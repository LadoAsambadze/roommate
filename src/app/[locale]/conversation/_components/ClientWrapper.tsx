'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { useRouter } from 'next/router'
import ConversationsList from '../_components/ConversationsList'
import { getConversationsForUserQuery } from '../gql/graphqlStatements'
import { ConversationStatus } from '../gql/graphql'
import Conversation from '../_components/Conversation'
import { RouterQuery } from '../types'
import { useMediaQuery } from 'react-responsive'
import { twilioConnectionStateVar } from '../store/twilioVars'
import { TwilioDisconnectionAlertDialog } from '../_components/TwilioDisconnectionAlertDialog'
import { MEDIA_QUERY } from '../constants'
import { LIMIT, OFFSET } from '@/src/constants/pagination'

const ClientWrapper = () => {
    const [request, setRequest] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const media = useMediaQuery({
        query: MEDIA_QUERY,
    })

    const router = useRouter()
    const { id }: RouterQuery = router.query

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
        if (data?.getConversationsForUser.list.length) {
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
        if (filteredConversationsByStatus.length && !id && media) {
            router.replace(`/conversation?id=${filteredConversationsByStatus[0].id}`, undefined, {
                shallow: true,
            })
        }

        if (filteredConversationsByStatus.length && id) {
            router.replace(`/conversation?id=${id}`, undefined, {
                shallow: true,
            })
        }
    }, [filteredConversationsByStatus])

    useEffect(() => {
        if (filteredConversationsByStatus.length && id) {
            router.replace(`/conversation?id=${filteredConversationsByStatus[0].id}`, undefined, {
                shallow: true,
            })
        }
        if (!filteredConversationsByStatus.length && id) {
            router.replace(`/conversation`, undefined, {
                shallow: true,
            })
        }
    }, [request])

    useEffect(() => {
        if (!media) {
            if (id) {
                setMobileOpen(true)
            } else if (!id) {
                setMobileOpen(false)
            }
        }
    }, [media, id])

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
                        key={id}
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
