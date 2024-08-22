'use client'

import { Button } from '@/src/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/src/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/src/components/ui/input-otp'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { Dispatch, SetStateAction, useState } from 'react'
import { useMutation } from '@apollo/client'
import { VerifyCodeByEmail, VerifyCodeBySms } from '@/graphql/mutation'
import { ArrowLeft } from '@/src/components/svgs'
import { Label } from '@/src/components/ui/label'
import { Input } from '@/src/components/ui/input'

type otpType = {
    setNewPassword: Dispatch<SetStateAction<boolean>>
    modalType: string
    identifier: string
}

const FormSchema = z.object({
    code: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.',
    }),
})

export function InputOTPForm({ setNewPassword, identifier, modalType }: otpType) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            code: '',
        },
    })

    const { t } = useTranslation()
    const [otpType, setOtpType] = useState(false)
    const [verifyCodeSms] = useMutation(VerifyCodeBySms)
    const [verifyCodeEmail] = useMutation(VerifyCodeByEmail)

    const onSubmit = async () => {
        if (modalType === 'resetPasswordRoommates') {
            const { data, errors } = await verifyCodeSms({
                variables: { input: { code: form.getValues().code, phone: identifier } },
            })
            if (data) {
                setOtpType(true)
            }
        } else if (modalType === 'resetPasswordLandlords') {
            const { data, errors } = await verifyCodeEmail({
                variables: { input: { code: form.getValues().code, email: identifier } },
            })
            if (data) {
                setOtpType(true)
            }
        }
    }

    return (
        <>
            {!otpType ? (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className=" flex w-full flex-col items-center space-y-6 "
                    >
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex w-full justify-center py-6">
                                        <span className="text-center leading-6">
                                            {t('codeSentOn')} <br /> 555 135856 <br />
                                            {t('fillField')}
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup className="flex w-full justify-center gap-4">
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">
                            {t('verify')}
                        </Button>
                    </form>
                </Form>
            ) : otpType ? (
                <div className="flex w-full flex-col items-start gap-6">
                    <div className="flex w-full justify-start">
                        <button
                            className="flex cursor-pointer flex-row  items-center gap-1 outline-none"
                            onClick={() => {
                                setOtpType(false)
                            }}
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="mb-1 text-xs text-[#838CAC]">უკან</span>
                        </button>
                    </div>
                    <div className="flex w-full justify-center">
                        <h1>პაროლის აღდგენა</h1>
                    </div>
                    <form className="flex w-full flex-col items-start gap-4">
                        <Label htmlFor="newpassword" className="text-sm">
                            ახალი პაროლი
                        </Label>
                        <Input placeholder={'ახალი პაროლი'} />
                        <Label htmlFor="newpassword" className="text-sm">
                            დაადასტურე პაროლი
                        </Label>
                        <Input placeholder={' დაადასტურე პაროლი'} />
                        <Button type="submit" className="w-full">
                            შენახვა
                        </Button>
                    </form>
                </div>
            ) : null}
        </>
    )
}
