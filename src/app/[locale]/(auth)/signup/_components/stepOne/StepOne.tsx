/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useParams } from 'next/navigation'
import { StepOneValidator } from './StepOneValidator'
import { useTranslation } from 'react-i18next'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'
import Select from 'react-select'
import StyledSelect from '@/src/components/shared/select/reactSelect'
import { DropdownIndicator, customStyles } from '@/src/components/shared/select/selectUI'
import Image from 'next/image'
import PhoneInput from '../../../../../../components/shared/phoneInput/PhoneInput'
import { BirthDatePicker } from '@/src/components/shared/datePickers/BirthDatePicker'
import Loading from '../../loading'
import { CheckCodeMutation, SendCodeMutation } from '@/graphql/mutation'
import { CountryObject, GenderObject } from '@/graphql/typesGraphql'

type StepOneProps = {
    countries: CountryObject[]
    genders: GenderObject[]
    step: number
    formData: any
    setStep: Dispatch<SetStateAction<number>>
    updateFormData: (newData: any) => void
}

export default function StepOne({
    countries,
    genders,
    step,
    formData,
    setStep,
    updateFormData,
}: StepOneProps) {
    const form = StepOneValidator({ formData })
    const params = useParams()
    const { t } = useTranslation()
    const [clicked, setClicked] = useState(false)
    const labels = params.locale === 'ka' ? undefined : undefined
    const [smsCheck] = useMutation(CheckCodeMutation, {
        fetchPolicy: 'network-only',
    })
    const [smsSend] = useMutation(SendCodeMutation, {
        fetchPolicy: 'network-only',
    })
    const [isClient, setIsClient] = useState(false)
    const [phoneFormat, setPhoneFormat] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (step !== 1) {
        return null
    }

    const handleSubmit = async (data: any) => {
        const modifiedFormData = {
            ...data,
        }
        const modifedForCode = {
            ...data,
            code: Number(data.code),
        }
        updateFormData(modifiedFormData)

        try {
            const response = await smsCheck({
                variables: {
                    input: {
                        phone: form.watch('phone') ?? '',
                        code: modifedForCode.code,
                    },
                },
            })

            if (response?.data?.checkCode === 'VALID') {
                setStep(2)
            } else if (response?.data?.checkCode === 'INVALID') {
                form.setError('code', { message: t('codeExpired') })
            } else if (response?.data?.checkCode === 'NOT_FOUND') {
                form.setError('code', { message: t('incorrectCode') })
            }
        } catch (error) {
            form.setError('code', { message: t('fillCode') })
        }
    }

    const getCodeHandler = async () => {
        await form.handleSubmit(async () => {
            setClicked(true)
            try {
                const response = await smsSend({
                    variables: {
                        input: {
                            phone: form.watch('phone') ?? '',
                        },
                    },
                })

                if (response?.data?.sendCode === 'ALREADY_SENT') {
                    form.setError('code', { message: t('codeAlreadySent') })
                }
            } catch (error) {
                console.error('GraphQL error:', error)
            }
        })()
    }

    return (
        <>
            <StyledSelect
                showFocusBorder={true}
                isMulti={true}
                options={[
                    { value: 1, label: 'option 1' },
                    { value: 2, label: 'option 2' },
                    { value: 3, label: 'option 3' },
                    { value: 4, label: 'option 4' },
                    { value: 5, label: 'option 5' },
                    { value: 6, label: 'option 6' },
                ]}
            />
            {isClient ? (
                <main className="flex flex-col  items-center ">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className=" w-full">
                            <div className="mb-3 grid grid-cols-1 items-start gap-x-6 gap-y-6 md:grid-cols-2 lg:justify-center">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('name')}</FormLabel>
                                            <Input
                                                type="string"
                                                {...field}
                                                value={field.value || undefined}
                                                hasError={
                                                    !!form.formState.errors.firstname &&
                                                    form.formState.dirtyFields.firstname
                                                }
                                                isSuccess={
                                                    !form.formState.errors.firstname &&
                                                    form.formState.dirtyFields.firstname
                                                }
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    form.trigger('firstname')
                                                }}
                                            />
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
                                                type="string"
                                                {...field}
                                                value={field.value || undefined}
                                                hasError={
                                                    !!form.formState.errors.lastname &&
                                                    form.formState.dirtyFields.lastname
                                                }
                                                isSuccess={
                                                    !form.formState.errors.lastname &&
                                                    form.formState.dirtyFields.lastname
                                                }
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    form.trigger('lastname')
                                                }}
                                            />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="countryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('country')}</FormLabel>
                                            <Select
                                                {...field}
                                                styles={customStyles}
                                                components={{ DropdownIndicator }}
                                                placeholder={t('selectCountry')}
                                                onChange={(value) => {
                                                    field.onChange(value)
                                                }}
                                                options={countries
                                                    ?.sort((a: any, b: any) => {
                                                        if (a?.position === 1) return -1
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
                                                    }))}
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
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('gender')}</FormLabel>
                                            <Select
                                                {...field}
                                                styles={customStyles}
                                                components={{ DropdownIndicator }}
                                                placeholder={t('selectGender')}
                                                onChange={(value) => {
                                                    field.onChange(value)
                                                }}
                                                options={genders?.map((gender: any) => ({
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
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('age')}</FormLabel>
                                            <BirthDatePicker field={field} />
                                            {field.value !== undefined && field.value !== '' && (
                                                <FormMessage />
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('mail')}</FormLabel>
                                            <Input
                                                type="email"
                                                placeholder={t('optional')}
                                                {...field}
                                                value={field.value || undefined}
                                                hasError={
                                                    !!form.formState.errors.email &&
                                                    form.formState.dirtyFields.email
                                                }
                                                isSuccess={
                                                    !form.formState.errors.email &&
                                                    form.formState.dirtyFields.email
                                                }
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    form.trigger('email')
                                                }}
                                            />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('Password')}</FormLabel>

                                            <Input
                                                type="password"
                                                {...field}
                                                value={field.value || undefined}
                                                hasError={
                                                    !!form.formState.errors.password &&
                                                    form.formState.dirtyFields.password
                                                }
                                                isSuccess={
                                                    !form.formState.errors.password &&
                                                    form.formState.dirtyFields.password
                                                }
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    form.trigger('password')
                                                }}
                                            />

                                            {field.value !== undefined && field.value !== '' && (
                                                <FormMessage />
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('PasswordRepeat')}</FormLabel>

                                            <Input
                                                type="password"
                                                {...field}
                                                value={field.value || undefined}
                                                hasError={
                                                    !!form.formState.errors.confirmPassword &&
                                                    form.formState.dirtyFields.confirmPassword
                                                }
                                                isSuccess={
                                                    !form.formState.errors.confirmPassword &&
                                                    form.formState.dirtyFields.confirmPassword
                                                }
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    form.trigger('confirmPassword')
                                                }}
                                            />

                                            {field.value !== undefined && field.value !== '' && (
                                                <FormMessage />
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('Phonenumber')}</FormLabel>
                                            <div onClick={() => setPhoneFormat(false)}>
                                                <PhoneInput
                                                    type="number"
                                                    field={field}
                                                    labels={labels}
                                                    defaultCountry="GE"
                                                    international
                                                    value={field.value}
                                                    form={form}
                                                    onChange={(phone: string) => {
                                                        form.setValue('phone', phone)
                                                    }}
                                                />
                                            </div>
                                            {phoneFormat &&
                                            field.value !== undefined &&
                                            field.value !== '' ? (
                                                <FormMessage />
                                            ) : null}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('fillCode')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    value={field.value || undefined}
                                                    getCode
                                                    setPhoneFormat={setPhoneFormat}
                                                    clicked={clicked}
                                                    onGetCodeClick={getCodeHandler}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                onClick={() => setPhoneFormat(true)}
                                className="mt-4 w-full"
                                size="lg"
                                type="submit"
                            >
                                {t('next')}
                            </Button>
                        </form>
                    </Form>
                </main>
            ) : (
                <Loading />
            )}
        </>
    )
}
