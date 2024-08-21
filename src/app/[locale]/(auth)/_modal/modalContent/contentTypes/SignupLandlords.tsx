import PhoneInput from '@/src/components/shared/phoneInput/PhoneInput'
import { ArrowLeft, AuthSmsIcon, Call } from '@/src/components/svgs'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form'
import { SendCodeByEmail, SendCodeBySms } from '@/graphql/mutation'
import { useMutation } from '@apollo/client'
import { LandlordsSignupOTP } from '../verifyCode/LandlordsSignupOTP'
import { landlordsSignupValidator } from '../validators/landlordsSignupValidator'
type SignupLandlordsProps = {
    signupChoosTypeHandler: () => void
}

export default function SignupLandlords({ signupChoosTypeHandler }: SignupLandlordsProps) {
    const [signupMethod, setSignupMethod] = useState<string | null>(null)
    const { t } = useTranslation()
    const form = landlordsSignupValidator()

    const [sendCodeEmail] = useMutation(SendCodeByEmail)
    const [sendCodeSms] = useMutation(SendCodeBySms)

    const handleSubmit = async () => {
        console.log('check')
        if (signupMethod === 'email') {
            const { email } = form.getValues()
            const { data, errors } = await sendCodeEmail({
                variables: { input: { email } },
            })

            if (data) {
                if (
                    data.sendCodeByEmail?.status === 'SUCCESS' ||
                    data.sendCodeByEmail?.status === 'ALREADY_SENT'
                ) {
                    setSignupMethod('verifyCodeByEmail')
                }
            }
        } else if (signupMethod === 'phone') {
            console.log('1231231')
            const { phone } = form.getValues()
            const { data, errors } = await sendCodeSms({
                variables: { input: { phone } },
            })

            console.log(phone)

            if (data) {
                if (
                    data.sendCodeByPhone.status === 'SUCCESS' ||
                    data.sendCodeByPhone?.status === 'ALREADY_SENT'
                ) {
                    setSignupMethod('veryifyCodeBySms')
                }
            }
        }
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
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="grid w-full grid-cols-1 gap-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('name')}</FormLabel>
                                    <Input
                                        hasError={
                                            !!form.formState.errors.firstname &&
                                            form.formState.dirtyFields.firstname
                                        }
                                        isSuccess={
                                            !form.formState.errors.firstname &&
                                            form.formState.dirtyFields.firstname
                                        }
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
                                        hasError={
                                            !!form.formState.errors.lastname &&
                                            form.formState.dirtyFields.lastname
                                        }
                                        isSuccess={
                                            !form.formState.errors.lastname &&
                                            form.formState.dirtyFields.lastname
                                        }
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
                                        type="password"
                                        hasError={
                                            !!form.formState.errors.password &&
                                            form.formState.dirtyFields.password
                                        }
                                        isSuccess={
                                            !form.formState.errors.password &&
                                            form.formState.dirtyFields.password
                                        }
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
                                        type="password"
                                        hasError={
                                            !!form.formState.errors.confirmPassword &&
                                            form.formState.dirtyFields.confirmPassword
                                        }
                                        isSuccess={
                                            !form.formState.errors.confirmPassword &&
                                            form.formState.dirtyFields.confirmPassword
                                        }
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
                                            hasError={
                                                !!form.formState.errors.email &&
                                                form.formState.dirtyFields.email
                                            }
                                            isSuccess={
                                                !form.formState.errors.email &&
                                                form.formState.dirtyFields.email
                                            }
                                            value={field.value}
                                            onChange={(e) => field.onChange(e)}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : signupMethod === 'phone' ? (
                            <div className="relative">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('phoneNumber')}</FormLabel>
                                            <PhoneInput
                                                type="number"
                                                defaultCountry="GE"
                                                international
                                                field={field}
                                                labels={undefined}
                                                form={form}
                                                value={field.value}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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
            ) : signupMethod === 'verifyCodeByEmail' || signupMethod === 'verifyCodeBySms' ? (
                <LandlordsSignupOTP signupMethod={signupMethod} formData={form} />
            ) : null}
        </>
    )
}
