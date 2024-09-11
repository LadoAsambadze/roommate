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
import PhoneInput from '@/src/components/shared/phoneInput/PhoneInput'
import MultiImageUploader from './formFieldItems/MultiImageUploader'
import { SendCodeBySms, UpsertProperty, VerifyCodeBySms } from '@/graphql/mutation'
import { Button } from '@/src/components/ui/button'
import { VerificationCodeValidityStatus } from '@/graphql/typesGraphql'
import { useState } from 'react'
import DescriptionTextarea from './formFieldItems/DescriptionTextarea'
import TitleDescription from './formFieldItems/TitleDescription'
import Loading from '../../../loading'
import { withAuth } from '@/src/auth/withAuth'

function ClientWrapper() {
    const params = useParams()
    const locale = params.locale
    const { t } = useTranslation()

    const [getCodeButtonClicked, setGetCodeButtonClicked] = useState(false)
    const [phoneFormat, setPhoneFormat] = useState(false)
    const [uploaded, setUploaded] = useState(false)

    const [uploadProperty] = useMutation(UpsertProperty)
    const [smsSend] = useMutation(SendCodeBySms, {
        fetchPolicy: 'network-only',
    })
    const [smsCheck] = useMutation(VerifyCodeBySms, {
        fetchPolicy: 'network-only',
    })
    const { data } = useQuery(GetPropertiesData, {
        variables: { locale: locale },
    })

    const form = UploadValidator({ data })

    const getCodeHandler = () => {
        form.handleSubmit(async () => {
            setGetCodeButtonClicked(true)

            const { data, errors } = await smsSend({
                variables: {
                    input: {
                        phone: form.watch('phone') ?? '',
                    },
                },
            })
            if (data?.sendCodeBySms?.status === 'ALREADY_SENT') {
                form.setError('code', { message: t('codeAlreadySent') })
            }
        })()
    }

    const onSubmit = async () => {
        try {
            const { data: codeData, errors: codeErrors } = await smsCheck({
                variables: {
                    input: {
                        phone: form.watch('phone') ?? '',
                        code: form.getValues('code') ?? '',
                    },
                },
            })

            if (
                codeErrors ||
                codeData?.verifyCodeBySms?.status !== VerificationCodeValidityStatus.Valid
            ) {
                form.setError('code', { message: t('invalidCode') })
                return
            }

            
            const { data, errors } = await uploadProperty({
                variables: {
                    input: {
                        withDeposit: form.getValues('withDeposit'),
                        totalFloors: form.getValues('totalFloors'),
                        titles: form.getValues('titles'),
                        street: form.getValues('street'),
                        rooms: form.getValues('rooms'),
                        propertyTypeId: form.getValues('propertyTypeId'),
                        propertyDepositId: form.getValues('propertyDepositId'),
                        propertyAmenityIds: form.getValues('propertyAmenityIds'),
                        price: form.getValues('price'),
                        petAllowed: form.getValues('petAllowed'),
                        partyAllowed: form.getValues('partyAllowed'),
                        minRentalPeriod: form.getValues('minRentalPeriod'),
                        imageUploadFiles: form.getValues('imageUploadFiles'),
                        id: null,
                        housingStatusId: form.getValues('housingStatusId'),
                        housingLivingSafetyIds: form.getValues('housingLivingSafetyIds'),
                        housingHeatingTypeIds: form.getValues('housingHeatingTypeIds'),
                        housingConditionId: form.getValues('housingConditionId'),
                        hideCadastralCode: form.getValues('hideCadastralCode'),
                        floor: form.getValues('minRentalPeriod'),
                        descriptions: form.getValues('descriptions'),
                        contactPhone: form.getValues('phone'),
                        contactName: form.getValues('contactName'),
                        capacity: form.getValues('capacity'),
                        cadastralCode: form.getValues('cadastralCode'),
                        bathroomsInProperty: form.getValues('bathroomsInProperty'),
                        bathroomsInBedroom: form.getValues('bathroomsInBedroom'),
                        availableFrom: form.getValues('availableFrom'),
                        area: form.getValues('area'),
                    },
                },
            })

        } catch (error) {
            console.error('Error during submission:', error)
        }
    }


    return (
        <>
            <main className="flex min-h-screen w-full  flex-col items-center justify-start overflow-hidden py-5">
                <h1 className="py-5 text-center text-xl">ატვირთე ბინა</h1>
                {!data ? (
                    <Loading />
                ) : !uploaded ? (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex h-full w-full flex-col gap-6 overflow-auto rounded-md  border border-gray-400 p-6 md:w-2/3 md:px-10 md:py-10"
                        >
                            <FormField
                                control={form.control}
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
                                    control={form.control}
                                    name="availableFrom"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs md:text-sm">
                                                {t('availableFrom')}
                                            </FormLabel>
                                            <FormControl>
                                                <StaticRentDatePicker field={field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
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
                                control={form.control}
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
                                        control={form.control}
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
                                        control={form.control}
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
                                    control={form.control}
                                    name="totalFloors"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm md:text-base">
                                                {t('floorAmount')}
                                            </FormLabel>
                                            <FormControl>
                                                <StaticSelectNumeric field={field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="floor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm md:text-base">
                                                {t('flatFloor')}
                                            </FormLabel>
                                            <FormControl>
                                                <StaticSelectNumeric field={field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex  flex-col gap-6 md:flex-row md:gap-24">
                                <FormField
                                    control={form.control}
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
                                    control={form.control}
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
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex w-full justify-start  text-sm">
                                            {t('address')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ქუჩის დასახელება, ნომერი"
                                                min="0"
                                                className="h-10 text-xs md:text-sm"
                                                onChange={(value) => field.onChange(value)}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cadastralCode"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>{t('cadastralCode')}</FormLabel>
                                        <span className="text-xs text-[#838CAC] ">
                                            საკადასტრო კოდის ჩაწერით გაიზრდება სანდოობა, უძრავი
                                            ქონების საკადასტო შეგიძლიათ ნახოთ ვებგვერდზე
                                        </span>
                                        <FormControl>
                                            <Input
                                                min="0"
                                                className="mt-2 h-10 text-xs md:text-sm"
                                                onChange={(value) => field.onChange(value)}
                                            />
                                        </FormControl>
                                        <FormField
                                            control={form.control}
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
                                control={form.control}
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
                                control={form.control}
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
                                control={form.control}
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
                                control={form.control}
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
                                control={form.control}
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
                                control={form.control}
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
                                    control={form.control}
                                    name="area"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('area')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    min="0"
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
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('price')}</FormLabel>
                                            <div className="flex w-full flex-row items-center gap-2 md:gap-0">
                                                <FormControl>
                                                    <Input
                                                        min="0"
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

                            <div className="relative flex w-full  flex-col items-center gap-4 md:w-full lg:flex-row">
                                <FormField
                                    control={form.control}
                                    name="withDeposit"
                                    render={({ field }) => (
                                        <FormItem className="md:w-full lg:w-full">
                                            <FormControl className="w-full ">
                                                <StaticDepositRadio field={field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex w-full flex-row items-center gap-2 ">
                                    <FormField
                                        control={form.control}
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
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex h-9 w-9 items-center  justify-center rounded-md bg-mainGreen text-base text-white md:w-9">
                                        $
                                    </div>
                                </div>
                            </div>

                            <TitleDescription form={form} />
                            <DescriptionTextarea form={form} />
                            <FormField
                                control={form.control}
                                name="imageUploadFiles"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('profileImage')}</FormLabel>
                                        <MultiImageUploader field={field} />
                                    </FormItem>
                                )}
                            />
                            <div className="flex w-full flex-col gap-4">
                                <FormLabel>{t('contactInfo')}</FormLabel>
                                <div className=" grid  gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
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
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="w-full md:w-full">
                                                <FormLabel className="text-xs md:text-sm">
                                                    {t('phone')}
                                                </FormLabel>
                                                <FormControl>
                                                    <PhoneInput
                                                        className="w-full"
                                                        type="number"
                                                        defaultCountry="GE"
                                                        international
                                                        field={field}
                                                        labels={undefined}
                                                        form={form}
                                                        onChange={(contactPhone: string) => {
                                                            form.setValue('phone', contactPhone)
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
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
                                                        setPhoneFormat={setPhoneFormat}
                                                        getCodeButtonClicked={getCodeButtonClicked}
                                                        onGetCodeClick={getCodeHandler}
                                                    />
                                                </FormControl>
                                                {phoneFormat &&
                                                field.value !== undefined &&
                                                field.value !== '' ? (
                                                    <FormMessage />
                                                ) : null}
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <Button className="w-full">ატვირთვა</Button>
                        </form>
                    </Form>
                ) : (
                    <div>succesfuly uploaded</div>
                )}
            </main>
        </>
    )
}

export default withAuth(ClientWrapper)
