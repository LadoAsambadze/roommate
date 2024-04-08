'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'next/navigation'
import { StepOneValidator } from '../validations/StepOneValidator'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { sms_check } from '@/graphql/queries/mutations/smsCheck'
import { sms_send } from '@/graphql/queries/mutations/smsSend'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import Select from 'react-select'
import { BirthDatePicker } from '@/components/shared/BirthDatePicker'
import { DropdownIndicator, customStyles } from '@/components/shared/SelectUI'
import Image from 'next/image'

export default function StepOne({ countries, gender, setStep, updateFormData, formData }: any) {
    const form = StepOneValidator({ formData })
    const params = useParams()
    const { t } = useTranslation()
    const [clicked, setClicked] = useState(false)
    const labels = params.locale === 'ka' ? undefined : undefined
    const [smsCheck] = useMutation(sms_check)
    const [smsSend] = useMutation(sms_send)
    console.log('ha', gender)

    const handleSubmit = async (data: any) => {
        const modifiedFormData = {
            ...data,
        }
        const modifedForCode = {
            ...data,
            code: Number(data.code),
        }
        updateFormData(modifiedFormData)

        const input = {
            phone: form.watch('phone'),
            code: modifedForCode.code,
        }

        try {
            const response = await smsCheck({ variables: input })
            if (response.data.data.checkCode === 'VALID') {
                setStep(2)
            } else if (response.data.data.checkCode === 'INVALID') {
                form.setError('code', { message: t('codeExpired') })
            } else if (response.data.data.checkCode === 'NOT_FOUND') {
                form.setError('code', { message: t('incorrectCode') })
            }
        } catch (error) {
            form.setError('code', { message: t('fillCode') })
        }
    }

    const getCodeHandler = async () => {
        await form.handleSubmit(async () => {
            setClicked(true)
            const input = {
                phone: form.watch('phone'),
            }
            try {
                const response = await smsSend({ variables: input })
                if (response.data.data.sendCode === 'ALREADY_SENT') {
                    form.setError('code', { message: t('codeAlreadySent') })
                }
            } catch (error) {
                console.error('GraphQL error:', error)
            }
        })()
    }

    return (
        <>
            <main className="flex flex-col  items-center ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className=" w-full">
                        <div className="mb-3  grid grid-cols-1 items-start gap-x-6 gap-y-6 md:grid-cols-2 lg:justify-center">
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }: any) => (
                                    <FormItem>
                                        <FormLabel>{t('name')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                hasError={form.formState.errors.firstname}
                                                isSuccess={
                                                    !form.formState.errors.firstname &&
                                                    form.formState.touchedFields.firstname &&
                                                    field.value !== ''
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }: any) => (
                                    <FormItem>
                                        <FormLabel>{t('surname')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                hasError={form.formState.errors.lastname}
                                                isSuccess={
                                                    !form.formState.errors.lastname &&
                                                    form.formState.touchedFields.lastname &&
                                                    field.value !== ''
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="countryId"
                                render={({ field }: any) => (
                                    <FormItem>
                                        <FormLabel>{t('country')}</FormLabel>
                                        <Select
                                            {...field}
                                            styles={customStyles}
                                            components={{ DropdownIndicator }}
                                            placeholder={t('selectCountry')}
                                            onChange={(value: any) => {
                                                field.onChange(value)
                                            }}
                                            options={
                                                countries &&
                                                countries
                                                    .sort((a: any, b: any) => {
                                                        if (a.position === 1) return -1
                                                        if (b.position === 1) return 1
                                                        return 0
                                                    })
                                                    .map((country: any) => ({
                                                        value: country.id,
                                                        label: (
                                                            <div className="flex w-full items-center">
                                                                <Image
                                                                    src={`https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg`}
                                                                    width={22}
                                                                    height={16}
                                                                    alt={
                                                                        country?.translations[0]
                                                                            ?.name
                                                                    }
                                                                />
                                                                <span>&nbsp; &nbsp;</span>
                                                                {country?.translations[0]?.name}
                                                            </div>
                                                        ),
                                                    }))
                                            }
                                            filterOption={(option: any, inputValue: string) =>
                                                option.label.props.children[2]
                                                    .toLowerCase()
                                                    .startsWith(inputValue.toLowerCase())
                                            }
                                        />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="genderId"
                                render={({ field }: any) => (
                                    <FormItem>
                                        <FormLabel>{t('gender')}</FormLabel>
                                        <Select
                                            {...field}
                                            styles={customStyles}
                                            components={{ DropdownIndicator }}
                                            placeholder={t('selectGender')}
                                            onChange={(value: any) => {
                                                field.onChange(value)
                                            }}
                                            options={gender?.map((gender: any) => ({
                                                value: gender.id,
                                                label: gender?.translations[0].sex,
                                            }))}
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="birthDate"
                                render={({ field }: any) => (
                                    <FormItem>
                                        <FormLabel>{t('age')}</FormLabel>
                                        <FormControl>
                                            <BirthDatePicker field={field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }: any) => (
                                    <FormItem>
                                        <FormLabel>{t('mail')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }: any) => (
                                    <FormItem>
                                        <FormLabel>{t('Password')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                {...field}
                                                hasError={form.formState.errors.password}
                                                isSuccess={
                                                    !form.formState.errors.password &&
                                                    form.formState.touchedFields.password &&
                                                    field.value !== ''
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }: any) => (
                                    <FormItem>
                                        <FormLabel>{t('PasswordRepeat')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                {...field}
                                                hasError={!!form.formState.errors.confirmPassword}
                                                isSuccess={
                                                    !form.formState.errors.confirmPassword &&
                                                    form.formState.touchedFields.confirmPassword &&
                                                    field.value !== ''
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }: any) => (
                                    <FormItem>
                                        <FormLabel>{t('Phonenumber')}</FormLabel>
                                        <FormControl>
                                            <PhoneInputWithCountrySelect
                                                {...field}
                                                labels={labels}
                                                defaultCountry="GE"
                                                international
                                                value={field.value}
                                                onChange={(phone) => {
                                                    form.setValue('phone', phone)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }: any) => (
                                    <FormItem>
                                        <FormLabel>{t('fillCode')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                getCode
                                                clicked={clicked}
                                                onGetCodeClick={getCodeHandler}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className="mt-4" variant="default" size="default" type="submit">
                            {t('next')}
                        </Button>
                    </form>
                </Form>
            </main>
        </>
    )
}
