'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/src/components/ui/form'
import UploadValidator from './validator/UploadValidator'
import StaticRentDatePicker from './formFieldItems/StaticRentDatePicker'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client'
import { GetPropertiesData } from '@/graphql/query'
import { useParams } from 'next/navigation'
import FullDynamicToggle from './formFieldItems/FullDynamicToggle'
import StaticRentMonthSelect from './formFieldItems/StaticRentMonthSelect'
import StaticNumericToggle from './formFieldItems/StaticNumericToggle'
import StaticSelectNumeric from './formFieldItems/StaticSelectNumeric'
import FullDynamicSelect from './formFieldItems/FullDynamicSelect'
import { Input } from '@/src/components/ui/input'
import { Checkbox } from '@/src/components/ui/checkbox'
import FullDynamicCheckbox from './formFieldItems/FullDynamicCheckbox'
import StaticPetStatusRadio from './formFieldItems/StaticPetStatusRadio'
import StaticPartyStatusRadio from './formFieldItems/StaticPartyStatusRadio'
import FullDynamicSelectDeposit from './formFieldItems/FullyDynamicSelectDeposit'
import StaticDepositRadio from './formFieldItems/StaticDepositRadio'
import MultiImageUploader from './formFieldItems/MultiImageUploader'
import { SendCodeBySms, UpsertProperty, VerifyCodeBySms } from '@/graphql/mutation'
import { Button } from '@/src/components/ui/button'
import { VerificationCodeValidityStatus } from '@/graphql/typesGraphql'
import { useEffect, useState } from 'react'
import DescriptionTextarea from './formFieldItems/DescriptionTextarea'
import TitleTextarea from './formFieldItems/TitleTextarea'
import Loading from '../../../loading'
import { withAuth } from '@/src/auth/withAuth'
import { UploadDialog } from './dialogWindow/UploadDialog'
import PhoneInput, { Value as E164Number } from 'react-phone-number-input'

function ClientWrapper() {
    const [getCodeButtonClicked, setGetCodeButtonClicked] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const params = useParams()
    const locale = params.locale

    const { t } = useTranslation()

    const [uploadProperty] = useMutation(UpsertProperty)

    const [smsSend] = useMutation(SendCodeBySms, {
        fetchPolicy: 'network-only',
    })

    const [smsCheck] = useMutation(VerifyCodeBySms, {
        fetchPolicy: 'network-only',
    })

    const { data } = useQuery(GetPropertiesData, {
        variables: { locale: locale },
        fetchPolicy: 'no-cache',
    })

    const form = UploadValidator({
        data,
    })

    const { trigger, formState, getValues, setError, watch, setValue, control, handleSubmit } = form

    const getCodeHandler = async () => {
        await trigger(['phone'])
        const phoneError = formState.errors.phone

        if (phoneError) {
            setOpenAlert(true)
            setAlertMessage('validNumber')
        }

        setGetCodeButtonClicked(true)

        const { data: smsSendData, errors } = await smsSend({
            variables: {
                input: {
                    phone: getValues('phone') ?? '',
                },
            },
        })

        if (smsSendData?.sendCodeBySms?.status === 'ALREADY_SENT') {
            setError('code', { message: t('codeAlreadySent') })
        }
    }

    const onSubmit = async () => {
        try {
            const { data: codeData, errors: codeErrors } = await smsCheck({
                variables: {
                    input: {
                        phone: watch('phone') ?? '',
                        code: getValues('code') ?? '',
                    },
                },
            })

            if (
                codeErrors ||
                codeData?.verifyCodeBySms?.status !== VerificationCodeValidityStatus.Valid
            ) {
                setError('code', { message: t('invalidCode') })
            }

            const formValues = getValues()
            const withDeposit = formValues.propertyDepositId ? true : formValues.withDeposit

            const { data, errors } = await uploadProperty({
                variables: {
                    input: {
                        id: null,
                        withDeposit: withDeposit,
                        totalFloors: getValues('totalFloors'),
                        floor: getValues('floor'),
                        titles: getValues('titles'),
                        street: getValues('street'),
                        rooms: getValues('rooms'),
                        propertyTypeId: getValues('propertyTypeId'),
                        propertyDepositId: getValues('propertyDepositId'),
                        propertyAmenityIds: getValues('propertyAmenityIds'),
                        price: getValues('price'),
                        petAllowed: getValues('petAllowed'),
                        partyAllowed: getValues('partyAllowed'),
                        minRentalPeriod: getValues('minRentalPeriod'),
                        imageUploadFiles: getValues('imageUploadFiles'),
                        housingStatusId: getValues('housingStatusId'),
                        housingLivingSafetyIds: getValues('housingLivingSafetyIds'),
                        housingHeatingTypeIds: getValues('housingHeatingTypeIds'),
                        housingConditionId: getValues('housingConditionId'),
                        hideCadastralCode: getValues('hideCadastralCode'),
                        descriptions: getValues('descriptions'),
                        contactPhone: getValues('phone'),
                        contactName: getValues('contactName'),
                        capacity: getValues('capacity'),
                        cadastralCode: getValues('cadastralCode'),
                        bathroomsInProperty: getValues('bathroomsInProperty'),
                        bathroomsInBedroom: getValues('bathroomsInBedroom'),
                        availableFrom: getValues('availableFrom'),
                        area: getValues('area'),
                    },
                },
            })
            if (data?.upsertProperty) {
                setOpenAlert(true)
                setAlertMessage('success')
            }
            if (errors) {
                setOpenAlert(true)
                setAlertMessage('requiredFields')
                const errorCodes = errors[0]?.extensions?.errorCode

                if (
                    Array.isArray(errorCodes) &&
                    errorCodes.includes('AVAILABLE_FROM__MIN_DATE:TODAY')
                ) {
                    setError('availableFrom', {
                        type: 'manual',
                        message: t('availableFromError'),
                    })
                }
            }
        } catch (error) {
            console.error('Error during submission:', error)
        }
    }

    const checkErrorsHandler = async () => {
        await trigger()
        if (!formState.isValid) {
            setOpenAlert(true)
            setAlertMessage('requiredFields')
        }
    }

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'withDeposit' && value.withDeposit === false) {
                setValue('propertyDepositId', null, { shouldValidate: true })
                trigger('propertyDepositId')
            }
            if (name === 'totalFloors' && typeof value.floor === 'number') {
                trigger(['floor'])
            }

            if (name === 'titles') {
                trigger('titles')
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, setValue, trigger, formState])

    return (
        <>
            {openAlert && (
                <UploadDialog
                    setOpenAlert={setOpenAlert}
                    openAlert={openAlert}
                    alertMessage={alertMessage}
                />
            )}

            <main className="flex min-h-screen w-full flex-col items-center justify-start overflow-hidden py-5">
                {!data ? (
                    <Loading />
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex h-full w-full flex-col gap-6 overflow-auto rounded-md p-6 md:w-2/3 md:px-10 md:py-10"
                        >
                            <FormField
                                control={control}
                                name="propertyTypeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('apartmentType')}</FormLabel>
                                        <FullDynamicToggle
                                            field={field}
                                            data={data?.getPropertyTypes}
                                        />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-4">
                                <FormLabel className="-mb-2 text-sm md:text-base">
                                    {t('availability')}
                                </FormLabel>
                                <FormField
                                    control={control}
                                    name="availableFrom"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs md:text-sm">
                                                {t('availableFrom')}
                                            </FormLabel>
                                            <FormControl>
                                                <StaticRentDatePicker field={field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="minRentalPeriod"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs md:text-sm">
                                                {t('minRentMonth')}
                                            </FormLabel>
                                            <FormControl>
                                                <StaticRentMonthSelect field={field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={control}
                                name="rooms"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('apartmentRooms')}</FormLabel>
                                        <StaticNumericToggle field={field} />
                                    </FormItem>
                                )}
                            />
                            <div className="flex w-full flex-col gap-4">
                                <FormLabel>{t('bathroomsAmount')}</FormLabel>
                                <div className="flex w-full flex-row gap-2 md:gap-56">
                                    <FormField
                                        control={control}
                                        name="bathroomsInProperty"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs md:text-sm">
                                                    {t('inApartment')}
                                                </FormLabel>
                                                <FormControl>
                                                    <StaticSelectNumeric field={field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="bathroomsInBedroom"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs md:text-sm">
                                                    {t('inBedroom')}
                                                </FormLabel>
                                                <FormControl>
                                                    <StaticSelectNumeric field={field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex w-full flex-row items-end gap-2 md:gap-56">
                                <FormField
                                    control={control}
                                    name="totalFloors"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm md:text-base">
                                                {t('floorAmount')}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    min="0"
                                                    type="number"
                                                    onWheel={(event) => event.currentTarget.blur()}
                                                    className="h-10 w-full md:w-28"
                                                    onChange={(e) =>
                                                        field.onChange(Number(e.target.value))
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="floor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm md:text-base">
                                                {t('flatFloor')}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    min="0"
                                                    type="number"
                                                    onWheel={(event) => event.currentTarget.blur()}
                                                    className="h-10 w-full md:w-28"
                                                    onChange={(e) =>
                                                        field.onChange(Number(e.target.value))
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex  flex-col gap-6 md:flex-row md:gap-24">
                                <FormField
                                    control={control}
                                    name="housingStatusId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm md:text-base">
                                                {t('status')}
                                            </FormLabel>
                                            <FormControl>
                                                <FullDynamicSelect
                                                    field={field}
                                                    data={data?.getHousingStatuses}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="housingConditionId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex w-full justify-start  text-sm">
                                                {t('condition')}
                                            </FormLabel>
                                            <FormControl>
                                                <FullDynamicSelect
                                                    field={field}
                                                    data={data?.getHousingConditions}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex w-full justify-start  text-sm">
                                            {t('address')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t('addressDetails')}
                                                min="0"
                                                className="h-10 text-xs md:text-sm"
                                                onChange={(value) => field.onChange(value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="cadastralCode"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>{t('cadastralCode')}</FormLabel>
                                        <span className="text-xs text-[#838CAC] ">
                                            {t('cadastralDetails')}
                                        </span>
                                        <FormControl>
                                            <Input
                                                min="0"
                                                className="mt-2 h-10 text-xs md:text-sm"
                                                onChange={(value) => field.onChange(value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <FormField
                                            control={control}
                                            name="hideCadastralCode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox
                                                                field={field}
                                                                onCheckedChange={(checked) =>
                                                                    field.onChange(checked)
                                                                }
                                                            />
                                                            <label className=" text-xs font-medium leading-none text-[#838CAC] peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                                {t('hideCadastralCode')}
                                                            </label>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="propertyAmenityIds"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('propertyAmenities')}</FormLabel>
                                        <FormControl>
                                            <FullDynamicCheckbox
                                                field={field}
                                                data={data?.getPropertyAmenities}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="housingHeatingTypeIds"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('propertyHeating')}</FormLabel>
                                        <FormControl>
                                            <FullDynamicCheckbox
                                                field={field}
                                                data={data?.getHousingHeatingTypes}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="housingLivingSafetyIds"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('propertySafety')}</FormLabel>
                                        <FormControl>
                                            <FullDynamicCheckbox
                                                field={field}
                                                data={data?.getHousingLivingSafeties}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="capacity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('maxPersonLiving')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                min="0"
                                                type="number"
                                                onWheel={(event) => event.currentTarget.blur()}
                                                className="h-10 w-full md:w-28"
                                                onChange={(e) =>
                                                    field.onChange(Number(e.target.value))
                                                }
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="petAllowed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('petStatus')}</FormLabel>
                                        <FormControl>
                                            <StaticPetStatusRadio field={field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="partyAllowed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('partyStatus')}</FormLabel>
                                        <FormControl>
                                            <StaticPartyStatusRadio field={field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex w-full flex-col gap-4 md:flex-row">
                                <FormField
                                    control={control}
                                    name="area"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('area')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    min="0"
                                                    step="any"
                                                    type="number"
                                                    onWheel={(event) => event.currentTarget.blur()}
                                                    className="h-10 w-full md:w-40"
                                                    onChange={(event) =>
                                                        field.onChange(
                                                            parseFloat(event.target.value)
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('price')}</FormLabel>
                                            <div className="flex w-full flex-row items-center gap-2 md:gap-0">
                                                <FormControl>
                                                    <Input
                                                        min="0"
                                                        step="any"
                                                        type="number"
                                                        onWheel={(event) =>
                                                            event.currentTarget.blur()
                                                        }
                                                        className="h-10 w-full md:w-40"
                                                        onChange={(event) => {
                                                            field.onChange(
                                                                parseFloat(event.target.value)
                                                            )
                                                        }}
                                                    />
                                                </FormControl>
                                                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-mainGreen text-base text-white md:w-11">
                                                    $
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="relative flex w-full flex-col items-center gap-4 md:w-full lg:flex-row">
                                <FormField
                                    control={control}
                                    name="withDeposit"
                                    render={({ field }) => (
                                        <FormItem className="md:w-full lg:w-full">
                                            <FormControl className="w-full">
                                                <StaticDepositRadio field={field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex w-full flex-row items-center gap-2">
                                    <FormField
                                        control={control}
                                        name="propertyDepositId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <FullDynamicSelectDeposit
                                                        field={field}
                                                        form={form}
                                                        data={data?.getPropertyDeposits}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-mainGreen text-base text-white md:w-9">
                                        $
                                    </div>
                                </div>
                            </div>

                            <TitleTextarea form={form} />
                            <DescriptionTextarea form={form} />

                            <FormField
                                control={control}
                                name="imageUploadFiles"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('profileImage')}</FormLabel>
                                        <MultiImageUploader field={field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex w-full flex-col gap-4">
                                <FormLabel>{t('contactInfo')}</FormLabel>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={control}
                                        name="contactName"
                                        render={({ field }) => (
                                            <FormItem className="w-full md:w-full">
                                                <FormLabel className="text-xs md:text-sm">
                                                    {t('name')}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="h-[38px] w-full"
                                                        onChange={(value) => field.onChange(value)}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="w-full md:w-full">
                                                <FormLabel className="text-xs md:text-sm">
                                                    {t('phone')}
                                                </FormLabel>
                                                <FormControl>
                                                    <PhoneInput
                                                        className="w-full"
                                                        defaultCountry="GE"
                                                        international
                                                        value={field?.value}
                                                        labels={undefined}
                                                        form={form}
                                                        onChange={(contactPhone: E164Number) => {
                                                            field.onChange(contactPhone)
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="code"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs md:text-sm">
                                                    {t('fillCode')}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        value={field.value}
                                                        getCode
                                                        setPhoneFormat={undefined}
                                                        getCodeButtonClicked={getCodeButtonClicked}
                                                        onGetCodeClick={getCodeHandler}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <Button onClick={checkErrorsHandler} type="submit" className="w-full">
                                {t('upload')}
                            </Button>
                        </form>
                    </Form>
                )}
            </main>
        </>
    )
}

export default withAuth(ClientWrapper)
