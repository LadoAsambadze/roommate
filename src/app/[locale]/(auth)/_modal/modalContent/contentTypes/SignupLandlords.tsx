import PhoneInput from '@/src/components/shared/phoneInput/PhoneInput'
import { ArrowLeft, AuthSmsIcon, Call, GoogleIcon } from '@/src/components/svgs'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
    landlordsSignupSchema,
    SignupLandlordsFormValues,
} from '../validators/landlordsSignupValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { SigninFormValues } from '../validators/roommatesSigninValidator'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form'
import { LandlordSignUp, SendCodeByEmail } from '@/graphql/mutation'
import { useMutation } from '@apollo/client'
import { LandlordsSignupOTP } from '../verifyCode/LandlordsSignupOTP'
type SignupLandlordsProps = {
    signupChoosTypeHandler: () => void
}

export default function SignupLandlords({ signupChoosTypeHandler }: SignupLandlordsProps) {
    const [signupMethod, setSignupMethod] = useState<string | null>(null)
    const { t } = useTranslation()

    const form = useForm<SignupLandlordsFormValues>({
        resolver: zodResolver(landlordsSignupSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })


    const [sendCode] = useMutation(SendCodeByEmail)

    const onSendCode: SubmitHandler<SignupLandlordsFormValues> = async () => {
        const { email } = form.getValues()
        const { data, errors } = await sendCode({
            variables: { input: { email } },
        })

        if (data) {
            setSignupMethod(data.sendCodeByEmail.status)
        }

        // if (data?.roommateSignIn) {
        //     signIn(data.roommateSignIn)
        //     router.push('/roommates')
        // } else if (errors) {
        //     if (errors[0]?.extensions?.code === 'BAD_REQUEST') {
        //         if (errors[0].extensions?.errorCode === 'USER__NOT_FOUND') {
        //             form.setError('identifier', { message: t('userNotFound') })
        //         } else if (errors[0].extensions?.errorCode === 'PASSWORD__INCORRECT') {
        //             form.setError('password', { message: t('incorrectPassword') })
        //         } else if (errors[0]?.extensions?.errorCode === 'IDENTIFIER__INVALID:PHONE') {
        //             form.setError('identifier', { message: t('enterPhone') })
        //         }
        //     }
        // }
    }

    return (
        <>
            {!signupMethod ? (
                <div className="flex flex-col gap-4">
                    <button
                        className="flex cursor-pointer flex-row items-center gap-1 outline-none"
                        onClick={signupChoosTypeHandler}
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span className="mb-1 text-xs text-[#838CAC]">{t('back')}</span>
                    </button>
                    <h1 className="text-center text-xl  text-textColor">
                        რეგისტრაცია ლენდლორდებისთვის
                    </h1>
                    <button
                        onClick={() => setSignupMethod('email')}
                        className="flex h-10 flex-row items-center justify-center gap-4 rounded-lg border border-[#838CAC] outline-none hover:border-hoverGreen"
                    >
                        <AuthSmsIcon className="h-6 w-6" />
                        <span>Continue with Email</span>
                    </button>
                    <button
                        onClick={() => setSignupMethod('phone')}
                        className=" flex h-10 flex-row items-center justify-center gap-4 rounded-lg border border-[#838CAC] outline-none hover:border-hoverGreen"
                    >
                        <Call className="h-6 w-6" />
                        <span>Continue with phone</span>
                    </button>
                </div>
            ) : signupMethod === 'email' || signupMethod === 'phone' ? (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSendCode)}
                        className="grid w-full grid-cols-1 gap-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('name')}</FormLabel>
                                    <Input
                                        value={field.value}
                                        onChange={(e) => field.onChange(e)}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('surname')}</FormLabel>
                                    <Input
                                        value={field.value}
                                        onChange={(e) => field.onChange(e)}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('password')}</FormLabel>
                                    <Input
                                        value={field.value}
                                        onChange={(e) => field.onChange(e)}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('confirmPassword')}</FormLabel>
                                    <Input
                                        value={field.value}
                                        onChange={(e) => field.onChange(e)}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {signupMethod === 'email' ? (
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('mail')}</FormLabel>
                                        <Input
                                            value={field.value}
                                            onChange={(e) => field.onChange(e)}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : signupMethod === 'phone' ? (
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('phoneNumber')}</FormLabel>
                                        <PhoneInput
                                            type="number"
                                            defaultCountry="GE"
                                            international
                                            value={undefined}
                                            field={undefined}
                                            labels={undefined}
                                            form={undefined}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : null}

                        <Button type="submit" className="mt-3 w-full">
                            {t('verify')}
                        </Button>
                        <button
                            className="flex cursor-pointer flex-row items-center gap-1 outline-none"
                            onClick={() => setSignupMethod(null)}
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="mb-1 text-xs text-[#838CAC]">{t('back')}</span>
                        </button>
                    </form>
                </Form>
            ) : signupMethod === 'SUCCESS' || signupMethod === 'ALREADY_SENT' ? (
                <LandlordsSignupOTP form={form} />
            ) : null}
        </>
    )
}
