'use client'

import { useToast } from '@/src/components/ui/use-toast'
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
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { useMutation } from '@apollo/client'
import { LandlordSignUp, VerifyCodeByEmail } from '@/graphql/mutation'
import { signIn } from '@/src/auth/signIn'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
    code: z.string().min(6, {
        message: 'Code must be 6 characters long',
    }),
})

export function LandlordsSignupOTP({ formData }: any) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            code: '',
        },
    })
    const router = useRouter()
    const { t } = useTranslation()
    const { toast } = useToast()

    console.log(form.getValues().code)
    const [verifyCode] = useMutation(VerifyCodeByEmail)
    const [signupLandlords] = useMutation(LandlordSignUp)

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async () => {
        try {
            const { code } = form.getValues()
            const { email, password, confirmPassword, firstname, lastname } = formData.getValues()
            const { data, errors } = await verifyCode({
                variables: {
                    input: {
                        code,
                        email,
                    },
                },
            })
            console.log(code)
            if (data?.verifyCodeByEmail.status === 'VALID') {
                const { data, errors } = await signupLandlords({
                    variables: {
                        input: {
                            firstname,
                            lastname,
                            email,
                            password,
                            confirmPassword,
                        },
                    },
                })
                if (data) {
                    signIn(data?.landlordSignUp?.jwt)
                    router.push('/roommates')
                } else if (errors) {
                    if (errors[0]?.message === 'USER__EXISTS_WITH_EMAIL') {
                        form.setError('code', { message: 'USER__EXISTS_WITH_EMAIL' })
                    }
                }
            } else if (data?.verifyCodeByEmail.status === 'INVALID') {
                form.setError('code', { message: t('expired') })
            } else if (data?.verifyCodeByEmail.status === 'NOT_FOUND') {
                form.setError('code', { message: t('incorrect code') })
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            toast({
                title: 'An error occurred',
                description: 'Please try again later.',
            })
        }
    }

    return (
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
    )
}
