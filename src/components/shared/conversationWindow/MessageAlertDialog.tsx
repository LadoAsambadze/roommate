'use client'

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/src/components/ui/alert-dialog'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/src/components/ui/button'
import successIcon from '../../../../public/svg/Success.svg'
import errorIcon from '../../../../public/svg/Error.svg'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { MessageSendStatusType } from '@/src/types/conversation'

type Props = {
    feedback: string
    alertType: MessageSendStatusType
    setIsOpen: (param: boolean) => void
}

export function MessageAlertDialog({ feedback, setIsOpen, alertType }: Props) {
    const [openAlert, setOpenAlert] = useState(true)

    const router = useRouter()

    const { t } = useTranslation('conversation')

    const getModalType = () => {
        switch (alertType) {
            case 'messageSendSuccess':
                return {
                    text: t('keepSearch'),
                    href: '/search',
                    img: successIcon,
                }
            case 'messageSendError':
                return {
                    text: t('checkMessages'),
                    href: '/conversation',
                    img: errorIcon,
                }
            default:
                return {
                    text: t('supportTeam'),
                    href: 'https://www.facebook.com/RoommateGeorgia.ge',
                    img: errorIcon,
                    target: '_blank',
                    cancel: t('cancel'),
                }
        }
    }

    const handleClose = () => {
        setOpenAlert(false)
        setIsOpen(false)
        if (type.cancel) {
            window.open(type.href, '_blank')
        } else {
            router.push(type.href)
        }
    }

    const type = getModalType()

    return (
        <AlertDialog open={openAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <Image src={type.img} width={100} height={100} alt={''} />
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        {feedback}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {type.cancel && (
                        <Button
                            onClick={() => {
                                setOpenAlert(false)
                                setIsOpen(false)
                            }}
                            className="mt-4 w-auto text-xs sm:mt-0 md:text-sm lg:w-auto lg:text-sm "
                        >
                            {type.cancel}
                        </Button>
                    )}
                    <Button
                        className="w-auto text-xs  md:text-sm lg:text-sm "
                        onClick={handleClose}
                    >
                        {type.text}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
