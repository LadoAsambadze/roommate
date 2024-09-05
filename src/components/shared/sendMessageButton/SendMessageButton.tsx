import { checkConversationExistence } from '@/src/conversation/conversationUtils'
import { Sms } from '../../svgs'
import { RoommateWithAdditionalInfoObject } from '@/graphql/typesGraphql'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Dispatch, SetStateAction } from 'react'

type Props = {
    user: RoommateWithAdditionalInfoObject
    setIsOpenedConversationWindow: Dispatch<SetStateAction<boolean>>
}

const SendMessageButton = ({ user, setIsOpenedConversationWindow }: Props) => {
    const router = useRouter()
    const { t } = useTranslation()

    const handleOpenConversationWindow = async () => {
        const conversation = await checkConversationExistence(String(user.id))

        if (conversation) {
            router.push(`/conversation?id=${conversation.id}`)
        } else {
            setIsOpenedConversationWindow(true)
        }
    }

    return (
        <button
            className="flex flex-row items-center rounded-md bg-[#0A7CFF] px-3 py-2"
            onClick={handleOpenConversationWindow}
        >
            <Sms className="h-4 w-4" />
            <span className="ml-2 text-sm text-white">{t('sendMessage')}</span>
        </button>
    )
}

export default SendMessageButton
