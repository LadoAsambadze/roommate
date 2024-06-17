/* eslint-disable @typescript-eslint/no-explicit-any */
import { Error } from '@/src/components/svgs'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/src/components/ui/alert-dialog'
import { Button } from '@/src/components/ui/button'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export function SignupAlert({ alertIsOpen, alertType, setAlertIsOpen }: any) {
    const { t } = useTranslation()
    const handleClose = () => {
        setAlertIsOpen(false)
    }
    const handleClickOutside = (event: any) => {
        event.stopPropagation()
    }

    function getAlertMessage() {
        switch (alertType) {
            case 'PHONE_EXISTS':
                return { text: t('phoneExist') }
            case 'EMAIL_EXISTS':
                return { text: t('emailExist') }
            case 'ERROR':
                return { text: t('serverError') }
            default:
                return { text: null }
        }
    }

    const alertMessage = getAlertMessage()

    return (
        <AlertDialog open={alertIsOpen}>
            <div onClick={handleClose}>
                <AlertDialogContent onClick={handleClickOutside}>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex  justify-center text-7xl">
                            <Error />
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            {alertMessage.text}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button
                            className="w-auto text-xs  md:text-sm lg:text-sm "
                            onClick={handleClose}
                        >
                            {t('close')}
                        </Button>
                        {alertType && alertType === 'ERROR' && (
                            <Link
                                href="https://www.facebook.com/share/E3WJ5xzYtAQ4itRd/?mibextid=WC7FNe"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    className="w-auto text-xs md:text-sm lg:text-sm"
                                    onClick={handleClose}
                                >
                                    {t('supportTeam')}
                                </Button>
                            </Link>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </div>
        </AlertDialog>
    )
}
