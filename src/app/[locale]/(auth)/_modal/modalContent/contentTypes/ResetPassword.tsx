import { ArrowLeft } from '@/src/components/svgs'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { useState } from 'react'
import { InputOTPForm } from '../verifyCode/ResetPasswordOTP'
import { useTranslation } from 'react-i18next'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { RoommateResetPassword } from '@/graphql/mutation'
import { useMutation } from '@apollo/client'

type ResetPasswordProps = {
    signinRoommatesHandler: () => void
    signinLandlordsHandler: () => void
    modalType: string
}

const phoneFormFormSchema = z.object({
    phone: z.string().min(6, {
        message: 'required',
    }),
})
export default function ResetPassword({
    signinRoommatesHandler,
    signinLandlordsHandler,
    modalType,
}: ResetPasswordProps) {
    const { t } = useTranslation()
    const [resetPassword, setResetPassword] = useState(false)
    const [newPassword, setNewPassword] = useState(false)

    const phoneForm = useForm<z.infer<typeof phoneFormFormSchema>>({
        resolver: zodResolver(phoneFormFormSchema),
        defaultValues: {
            phone: '',
        },
    })

    const [resetPasswordRoommates] = useMutation(RoommateResetPassword)

    const identifier =
        modalType === 'resetPasswordRoommates'
            ? phoneForm.getValues().phone
            : phoneForm.getValues().phone

    const phoneFormSubmit = async () => {
        if (modalType === 'resetPasswordRoommates') {
            const { data, errors } = await resetPasswordRoommates({
                variables: { input: { identifier: phoneForm.getValues().phone } },
            })

            if (errors) {
                if (errors[0].extensions?.errorCode === 'USER__NOT_FOUND') {
                    phoneForm.setError('phone', { message: 'მომხარებელი არ მოიძებნა' })
                } else if (
                    errors[0].extensions?.errorCode === 'IDENTIFIER__INVALID:EMAIL_OR_PHONE'
                ) {
                    phoneForm.setError('phone', { message: 'IDENTIFIER__INVALID:EMAIL_OR_PHONE' })
                } else if (errors[0].extensions?.errorCode === 'IDENTIFIER__INVALID:PHONE') {
                    phoneForm.setError('phone', { message: 'IDENTIFIER__INVALID:PHONE' })
                }
            } else if (data) {
                if (
                    data?.roommateSendResetPasswordVerificationCode?.status ===
                        'SUCCESSFULLY_SEND' ||
                    data?.roommateSendResetPasswordVerificationCode?.status === 'ALREADY_SENT'
                ) {
                    setResetPassword(true)
                } else {
                    if (data?.roommateSendResetPasswordVerificationCode?.status === 'SEND_FAILED') {
                        phoneForm.setError('phone', { message: 'ar gaigzavna' })
                    }
                }
            }
        }
    }
    return (
        <>
            {!resetPassword && !newPassword ? (
                <>
                    <div className="flex w-full justify-start">
                        <button
                            className="flex cursor-pointer flex-row items-center gap-1 outline-none"
                            onClick={
                                modalType === 'resetPasswordRoommates'
                                    ? signinRoommatesHandler
                                    : signinLandlordsHandler
                            }
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="mb-1 text-xs text-[#838CAC]">{t('back')}</span>
                        </button>
                    </div>
                    <div className="grid w-full grid-cols-1 gap-y-6">
                        <h1 className="text-center text-base">პაროლის აღდგენა</h1>
                        <Form {...phoneForm}>
                            <form onSubmit={phoneForm.handleSubmit(phoneFormSubmit)}>
                                <FormField
                                    control={phoneForm.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('phoneNum')}</FormLabel>
                                            <Input
                                                value={field.value}
                                                onChange={(e) => field.onChange(e)}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="mt-3 w-full">
                                    {t('getCode')}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </>
            ) : resetPassword && !newPassword ? (
                <div className="flex w-full flex-col items-center  gap-6 text-sm">
                    <div className="flex w-full justify-start">
                        <button
                            className="flex cursor-pointer flex-row items-center gap-1 outline-none"
                            onClick={() => setResetPassword(false)}
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="mb-1 text-xs text-[#838CAC]">{t('back')}</span>
                        </button>
                    </div>
                    <InputOTPForm
                        setNewPassword={setNewPassword}
                        modalType={modalType}
                        identifier={identifier}
                    />
                </div>
            ) : null}
        </>
    )
}
