'use client'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/src/components/ui/form'
import UploadValidator from './validator/UploadValidator'
import RentDatePicker from './formFieldItems/RentDatePicker'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
import { GetPropertiesData } from '@/graphql/query'
import { useParams } from 'next/navigation'
import PropertyType from './formFieldItems/PropertyType'
import MinRentMonths from './formFieldItems/MinRentMonths'
import ApartmentRooms from './formFieldItems/ApartmentRooms'
import BathroomsInBedroom from './formFieldItems/BathroomsInBedroom'
import BathroomsInProperty from './formFieldItems/BathroomsInProperty'

export default function ClientWrapper() {
    const params = useParams()
    const locale = params.locale
    const { t } = useTranslation()

    const { data } = useQuery(GetPropertiesData, {
        variables: { locale: locale },
    })

    const form = UploadValidator({ data })
    console.log(form.getValues())
    const onSubmit = () => {
        console.log('done')
        console.log(form.getValues())
    }

    return (
        <main className="flex min-h-screen w-full items-start justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex h-full w-full flex-col gap-6 border-slate-900 p-6 md:w-2/3 md:border md:px-10 md:py-10"
                >
                    <FormField
                        control={form.control}
                        name="apartmentType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex w-full justify-start text-base">
                                    {t('apartmentType')}
                                </FormLabel>
                                <PropertyType
                                    field={field}
                                    propertyTypes={data?.getPropertyTypes}
                                />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col gap-4">
                        <FormLabel className="flex w-full justify-start text-base">
                            {t('availability')}
                        </FormLabel>
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex w-full justify-start text-sm">
                                        {t('rentDate')}
                                    </FormLabel>
                                    <FormControl>
                                        <RentDatePicker field={field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="minRentMonth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex w-full justify-start text-sm">
                                    {t('minRentMonth')}
                                </FormLabel>
                                <FormControl>
                                    <MinRentMonths field={field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="apartmentRooms"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex w-full justify-start text-base">
                                    {t('apartmentRooms')}
                                </FormLabel>
                                <ApartmentRooms field={field} />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col gap-4">
                        <FormLabel className="flex w-full justify-start text-base">
                            {t('bathroomsAmount')}
                        </FormLabel>
                        <div className="flex flex-row gap-40">
                            <FormField
                                control={form.control}
                                name="bathroomsInProperty"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex w-full justify-start  text-sm">
                                            {t('inApartment')}
                                        </FormLabel>
                                        <FormControl>
                                            <BathroomsInBedroom field={field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bathroomsInBedroom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex w-full justify-start  text-sm">
                                            {t('inBedroom')}
                                        </FormLabel>
                                        <FormControl>
                                            <BathroomsInProperty field={field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <button type="submit">ატვირთვა</button>
                </form>
            </Form>
            <div className="flex flex-col"></div>
        </main>
    )
}
