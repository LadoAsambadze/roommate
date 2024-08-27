'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/src/components/ui/form'
import { ToggleGroup, ToggleGroupItem } from '@/src/components/ui/toggle-group'
import UploadValidator from './validator/UploadValidator'
import DatePicker from './DatePicker'
import { useTranslation } from 'react-i18next'

export default function ClientWrapper() {
    const form = UploadValidator()
    const { t } = useTranslation()

    const onSubmit = () => {
        console.log('done')
        console.log(form.getValues())
    }

    return (
        <main className="flex min-h-screen w-full items-start justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex h-full w-full flex-col gap-5 border-slate-900 p-6 md:w-2/3 md:border md:px-10 md:py-10"
                >
                    <FormField
                        control={form.control}
                        name="apartmentType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex w-full justify-start pb-2">
                                    {t('apartmentType')}
                                </FormLabel>
                                <FormControl>
                                    <ToggleGroup
                                        className="justify-start"
                                        type="single"
                                        value={field.value}
                                        onValueChange={(value) => {
                                            if (value) field.onChange(value)
                                        }}
                                    >
                                        <ToggleGroupItem value="ბინა">ბინა</ToggleGroupItem>
                                        <ToggleGroupItem value="კერძო სახლი">
                                            კერძო სახლი
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="ოთახი">ოთახი</ToggleGroupItem>
                                        <ToggleGroupItem value="სტუდენტური სასტუმრო">
                                            სტუდენტური სასტუმრო
                                        </ToggleGroupItem>
                                    </ToggleGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex w-full justify-start pb-2">
                                    {t('rentDate')}
                                </FormLabel>
                                <FormControl>
                                    <DatePicker field={field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <button type="submit">1123123123</button>
                </form>
            </Form>
            <div className="flex flex-col"></div>
        </main>
    )
}
