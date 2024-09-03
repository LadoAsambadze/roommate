'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import DesktopConversation from './DesktopConversation'
import MobileConversation from './MobileConversation'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Client, Conversation } from '@twilio/conversations'
import { useMediaQuery } from 'react-responsive'
import { ConversationStatus, ConversationWithUserObject } from '@/graphql/typesGraphql'
import { MEDIA_QUERY } from '../constants'
import { twilioClientVar, twilioConnectionStateVar } from '@/src/conversation/twilioVars'
import { getConversationsForUserQuery } from '@/graphql/query'

const ConversationComponent = ({ mobileOpen, setMobileOpen, setRequest }: any) => {
    const [conversation, setConversation] = useState<ConversationWithUserObject | null>(null)
    const [conversationResource, setConversationResource] = useState<Conversation | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const media = useMediaQuery({
        query: MEDIA_QUERY,
    })

    const twilioClient = useReactiveVar(twilioClientVar)
    const twilioClientState = useReactiveVar(twilioConnectionStateVar)

    // Conversations for user is already fetching or fetched from useNotifications hook
    // So this is why it is fetched from cache
    const { data } = useQuery(getConversationsForUserQuery, {
        fetchPolicy: 'cache-only',
    })

    const searchParams = useSearchParams()
    const conversationIdFromParam = searchParams.get('id')

    const updateRequest = (conversation: ConversationWithUserObject) => {
        if (conversation.status === ConversationStatus.Requested) {
            setRequest(true)
        } else if (conversation.status === ConversationStatus.Accepted) {
            setRequest(false)
        }
    }

    const updateConversation = (conversations: ConversationWithUserObject[], id: string) => {
        const conversation = conversations.find((conversation) => conversation.id === id)

        if (conversation) setConversation(conversation)
    }

    const getConversationResource = async (twilioClient: Client, sid: string) => {
        try {
            const conversationResourceResponse = await twilioClient.peekConversationBySid(sid)

            setConversationResource(conversationResourceResponse)
        } catch (error) {
            console.log({ error })
        }
    }

    /*
     * useEffects start
     */
    useEffect(() => {
        if (data?.getConversationsForUser?.list?.length && conversationIdFromParam) {
            updateConversation(data.getConversationsForUser.list, conversationIdFromParam)
        }
    }, [data, conversationIdFromParam])

    useEffect(() => {
        if (conversation) {
            updateRequest(conversation)
        }
    }, [conversation])

    useEffect(() => {
        if (conversation && twilioClient && twilioClientState === 'connected') {
            getConversationResource(twilioClient, conversation.sid)
        }
    }, [conversation, twilioClientState])

    useEffect(() => {
        setIsLoading(false)
    }, [media])
    return (
        <>
            {isLoading ? (
                <div className="flex h-full w-full items-center justify-center">...Loading</div>
            ) : media ? (
                <DesktopConversation
                    conversationResource={conversationResource}
                    conversation={conversation}
                    setRequest={setRequest}
                />
            ) : (
                <MobileConversation
                    conversationResource={conversationResource}
                    conversation={conversation}
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                    setRequest={setRequest}
                />
            )}
        </>
    )
}

export default ConversationComponent
