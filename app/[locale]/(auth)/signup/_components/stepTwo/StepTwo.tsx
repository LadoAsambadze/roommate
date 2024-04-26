/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/ui/button'

import Select from 'react-select'
// import arroLeft from '../public/newImages/arrow-left.svg'
// import Image from 'next/image'
import { DropdownIndicator, customStyles } from '@/components/shared/Select/SelectUI'
import { SignupRangePicker } from '../../../../../../components/shared/datePickers/SignupRangePicker'
import { useTranslation } from 'react-i18next'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import StepTwoValidator from './StepTwoValidator'
import { FormDataPropsTwo } from './types'
import Loading from '../../loading'
import { useEffect, useState } from 'react'

export default function StepTwo({
    questions,
    setStep,
    formData,
    step,
    next,
    updateFormData,
    submit,
}: {
    questions: any
    setStep: (value: number) => void
    formData: FormDataPropsTwo
    step: number
    next: string
    updateFormData: (newData: FormDataPropsTwo) => void
    submit: () => Promise<void>
}) {
    const { t } = useTranslation()
    const form = StepTwoValidator({ questions, formData })
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handleSubmit = async () => {
        if (step < 3) {
            setStep(step + 1)
        }
        if (step === 3) {
            submit()
        }
    }

    const updateUseForm = async (data: any) => {
        const { answeredQuestions } = formData
        const updatedData = { ...answeredQuestions, ...data }
        updateFormData({ ...formData, answeredQuestions: updatedData })
    }

    return (
        <>
            {isClient ? (
                <main className="flex flex-col  items-center p-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            {questions.map((item: any) => {
                                return (
                                    <>
                                        <div className="mb-4 mt-4">
                                            {item.uiFieldInfo &&
                                                item.uiFieldInfo.input.type === 'text' && (
                                                    <FormField
                                                        control={form.control}
                                                        name={item.id}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="leading-5">
                                                                    {item.translations[0].title}
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        onChange={(e) => {
                                                                            updateUseForm({
                                                                                [item.id]:
                                                                                    e.target.value,
                                                                            })
                                                                            field.onChange(e)
                                                                        }}
                                                                        value={field.value}
                                                                        type="text"
                                                                        hasError={
                                                                            !!form.formState.errors[
                                                                                item.id
                                                                            ]
                                                                        }
                                                                        isSuccess={
                                                                            !form.formState.errors[
                                                                                item.id
                                                                            ] &&
                                                                            form.formState
                                                                                .touchedFields[
                                                                                item.id
                                                                            ] &&
                                                                            field.value !== ''
                                                                        }
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                )}
                                        </div>
                                        <div className="mb-4 mt-4">
                                            {item.uiFieldInfo &&
                                                item.uiFieldInfo.input.type === 'textarea' && (
                                                    <FormField
                                                        control={form.control}
                                                        name={item.id}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="leading-5">
                                                                    {item.translations[0].title}
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <textarea
                                                                        className="w-full rounded-md border border-[#828bab] px-3 py-2 text-sm  focus:border-2 focus:border-[#c5758a] focus:outline-none"
                                                                        rows={4}
                                                                        {...field}
                                                                        onChange={(e) => {
                                                                            updateUseForm({
                                                                                [item.id]:
                                                                                    e.target.value,
                                                                            })
                                                                            field.onChange(e)
                                                                        }}
                                                                        value={field.value}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                )}
                                        </div>
                                        <div className="mb-4 mt-4">
                                            {item.uiFieldInfo &&
                                                item.uiFieldInfo.input.type === 'numeric' && (
                                                    <FormField
                                                        control={form.control}
                                                        name={item.id}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="leading-5">
                                                                    {item.translations[0].title}
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        onChange={(e) => {
                                                                            updateUseForm({
                                                                                [item.id]:
                                                                                    e.target.value,
                                                                            })
                                                                            field.onChange(e)
                                                                        }}
                                                                        value={field.value}
                                                                        type="number"
                                                                        min="1"
                                                                        inputMode="numeric"
                                                                        hasError={
                                                                            !!form.formState.errors[
                                                                                item.id
                                                                            ]
                                                                        }
                                                                        isSuccess={
                                                                            !form.formState.errors[
                                                                                item.id
                                                                            ] &&
                                                                            form.formState
                                                                                .touchedFields[
                                                                                item.id
                                                                            ] &&
                                                                            field.value !== ''
                                                                        }
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                )}
                                        </div>
                                        {item.uiFieldInfo &&
                                            item.uiFieldInfo.input.type === 'select' && (
                                                <FormField
                                                    control={form.control}
                                                    name={item.id}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="leading-5 ">
                                                                {item.translations[0].title}
                                                            </FormLabel>
                                                            <Select
                                                                placeholder={t('select')}
                                                                components={{ DropdownIndicator }}
                                                                styles={customStyles}
                                                                {...field}
                                                                isMulti={
                                                                    item.uiFieldInfo.input
                                                                        .variant === 'multiple'
                                                                }
                                                                options={item.answers.map(
                                                                    (answer: any) => ({
                                                                        questionId: item.id,
                                                                        value: answer.id,
                                                                        label: answer
                                                                            .translations[0].title,
                                                                    })
                                                                )}
                                                                onChange={(value) => {
                                                                    field.onChange(value)
                                                                    updateUseForm({
                                                                        [item.id]: value,
                                                                    })
                                                                }}
                                                            />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}

                                        {item.uiFieldInfo &&
                                            item.uiFieldInfo.input.type === 'button' && (
                                                <FormField
                                                    control={form.control}
                                                    name={item.id}
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col">
                                                            <FormLabel className="leading-5">
                                                                {item.translations[0].title}
                                                            </FormLabel>
                                                            <SignupRangePicker
                                                                id={item.id}
                                                                updateUseForm={updateUseForm}
                                                                field={field}
                                                            />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}
                                    </>
                                )
                            })}
                            <div className="mt-8 flex flex-col items-start justify-between ">
                                <Button className="mt-4 w-full" size="lg" type="submit">
                                    {next}
                                </Button>
                                <div
                                    className="pointer mt-6 flex flex-row items-center text-base"
                                    onClick={() => setStep(step - 1)}
                                >
                                    {/* <Image width={24} height={24} src={arroLeft} alt="Arrow back" /> */}
                                    <p className="ml-4 leading-6 text-[#838CAC]">{t('back')}</p>
                                </div>
                            </div>
                        </form>
                    </Form>
                </main>
            ) : (
                <Loading />
            )}
        </>
    )
}