/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/src/components/ui/button'
import { SignupRangePicker } from '../rangePicker/SignupRangePicker'
import { useTranslation } from 'react-i18next'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import StepTwoValidator from './DynamicQuestionsValidator'
import { ArrowLeft } from '@/src/components/svgs'
import { Language, QuestionObject } from '@/graphql/typesGraphql'
import { getQuestionsWithAnswersQuery } from '@/graphql/query'
import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client'
import Select from '@/src/components/ui/select'

type StepTwoProps = {
    step: number
    next: string
    formData: any
    setStep: (value: number) => void
    updateFormData: (newData: any) => void
    submit: () => Promise<void>
}

export default function DynamicQuestionsStep({
    step,
    next,
    formData,
    setStep,
    updateFormData,
    submit,
}: StepTwoProps) {
    const { t } = useTranslation()
    const params = useParams()
    const locale = params.locale as Language
    const { data: questionsData } = useQuery(getQuestionsWithAnswersQuery, {
        variables: {
            lang: locale,
        },
    })

    const questions = questionsData?.getQuestionsWithAnswers?.filter((item: QuestionObject) => {
        if (step === 2) {
            return item.position > 0
        } else if (step === 3) {
            return item.position < 1
        }
    })

    const form = StepTwoValidator({ questions, formData })

    const updateUseForm = async (data: any) => {
        const { answeredQuestions } = formData
        const updatedData = { ...answeredQuestions, ...data }
        updateFormData({ ...formData, answeredQuestions: updatedData })
    }

    const handleSubmit = async () => {
        if (step < 3) {
            setStep(step + 1)
        }
        if (step === 3) {
            submit()
        }
    }

    return (
        <>
            <main className="flex flex-col  items-center p-2">
                <Form {...form}>
                    <form className="w-full" onSubmit={form.handleSubmit(handleSubmit)}>
                        {questions &&
                            questions.map((item) => {
                                return (
                                    <>
                                        <div className="mb-4 mt-4 w-full">
                                            {item.uiFieldInfo.input.type === 'text' && (
                                                <FormField
                                                    control={form.control}
                                                    name={item.id}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="leading-5">
                                                                {item?.translations &&
                                                                    item.translations[0]?.title}
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
                                            {item.uiFieldInfo.input.type === 'textarea' && (
                                                <FormField
                                                    control={form.control}
                                                    name={item.id}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="leading-5">
                                                                {item.translations &&
                                                                    item.translations[0].title}
                                                            </FormLabel>
                                                            <FormControl>
                                                                <textarea
                                                                    spellCheck="false"
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
                                            {item.uiFieldInfo.input.type === 'numeric' && (
                                                <FormField
                                                    control={form.control}
                                                    name={item.id}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="leading-5">
                                                                {item.translations &&
                                                                    item.translations[0].title}
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
                                                                    onWheel={(event) =>
                                                                        event.currentTarget.blur()
                                                                    }
                                                                    min={1}
                                                                    type="number"
                                                                    inputMode="numeric"
                                                                    className="number-input"
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
                                        {item.uiFieldInfo.input.type === 'select' && (
                                            <FormField
                                                control={form.control}
                                                name={item.id}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="leading-5 ">
                                                            {item.translations &&
                                                                item.translations[0].title}
                                                        </FormLabel>
                                                        <Select
                                                            placeholder={t('select')}
                                                            {...field}
                                                            isMulti={
                                                                item.uiFieldInfo.input.variant ===
                                                                'multiple'
                                                            }
                                                            options={
                                                                item.answers
                                                                    ? item.answers.map(
                                                                          (answer: any) => ({
                                                                              questionId: item.id,
                                                                              value: answer.id,
                                                                              label:
                                                                                  answer
                                                                                      .translations[0]
                                                                                      ?.title || '',
                                                                          })
                                                                      )
                                                                    : []
                                                            }
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

                                        {item.uiFieldInfo.input?.type === 'button' && (
                                            <FormField
                                                control={form.control}
                                                name={item.id}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel className="leading-5">
                                                            {item.translations &&
                                                                item.translations[0].title}
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
                                className="mt-6 flex cursor-pointer flex-row items-center text-base"
                                onClick={() => setStep(step - 1)}
                            >
                                <ArrowLeft className="h-6 w-6" />
                                <p className="ml-4 leading-6 text-[#838CAC]">{t('back')}</p>
                            </div>
                        </div>
                    </form>
                </Form>
            </main>
        </>
    )
}