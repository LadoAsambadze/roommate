'use client'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/src/components/ui/form'
import UploadValidator from './validator/UploadValidator'
import StaticRentDatePicker from './formFieldItems/StaticRentDatePicker'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
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

export default function ClientWrapper() {
    const params = useParams()
    const locale = params.locale
    const { t } = useTranslation()

    const { data } = useQuery(GetPropertiesData, {
        variables: { locale: locale },
    })

    const form = UploadValidator({ data })

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
                                <FullDynamicToggle field={field} data={data?.getPropertyTypes} />
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
                                        <StaticRentDatePicker field={field} />
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
                                    <StaticRentMonthSelect field={field} />
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
                                <StaticNumericToggle field={field} />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col gap-4">
                        <FormLabel className="flex w-full justify-start text-base">
                            {t('bathroomsAmount')}
                        </FormLabel>
                        <div className="flex flex-row gap-20">
                            <FormField
                                control={form.control}
                                name="bathroomsInProperty"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex w-full justify-start  text-sm">
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
                                        <FormLabel className="flex w-full justify-start  text-sm">
                                            {t('inBedroom')}
                                        </FormLabel>
                                        <FormControl>
                                            <StaticSelectNumeric field={field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-row gap-20">
                            <FormField
                                control={form.control}
                                name="floorAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex w-full justify-start  text-sm">
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
                                name="flatFloor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex w-full justify-start  text-sm">
                                            {t('flatFloor')}
                                        </FormLabel>
                                        <FormControl>
                                            <StaticSelectNumeric field={field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-20">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex w-full justify-start  text-sm">
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
                            name="condition"
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
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex w-full justify-start  text-sm">
                                    {t('address')}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="h-10"
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
                            <FormItem>
                                <FormLabel className="flex w-full justify-start text-sm">
                                    {t('cadastralCode')}
                                </FormLabel>
                                <span className="text-xs text-[#838CAC]">
                                    საკადასტრო კოდის ჩაწერით გაიზრდება სანდოობა, უძრავი ქონების
                                    საკადასტო შეგიძლიათ ნახოთ ვებგვერდზე
                                </span>
                                <FormControl>
                                    <Input
                                        className="h-10"
                                        onChange={(value) => field.onChange(value)}
                                    />
                                </FormControl>
                                <FormField
                                    control={form.control}
                                    name="showCadastral"
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
                        name="propertyAmenities"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex w-full justify-start text-sm">
                                    {t('propertyAmenities')}
                                </FormLabel>
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
                        name="propertyHeating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex w-full justify-start text-sm">
                                    {t('propertyHeating')}
                                </FormLabel>
                                <FormControl>
                                    <FullDynamicCheckbox
                                        field={field}
                                        data={data?.getHousingHeatingTypes}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <button type="submit">ატვირთვა</button>
                </form>
            </Form>
            <div className="flex flex-col"></div>
        </main>
    )
}
