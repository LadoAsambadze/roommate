import { useInitializeTwilioClient } from './useInitializeTwilioClient'
import { useInitializeConversationNotification } from './useConversationNotification'

export default function TwilioClientWrapper({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    useInitializeTwilioClient()
    useInitializeConversationNotification()

    return <>{children}</>
}
