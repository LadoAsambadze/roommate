/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import 'react-phone-number-input/style.css'
import { useTranslation } from 'react-i18next'
import { QuestionObject } from '@/graphql/typesGraphql'

type StepTwoValidatorProps = {
    formData: any
    questions?: QuestionObject[] | null
}
export default function QuestionsStepValidator({ questions, formData }: StepTwoValidatorProps) {
    const { t } = useTranslation()

    const formSchema = z.object(
        questions &&
            questions.reduce((acc: any, item: any) => {
                if (item.uiFieldInfo) {
                    let fieldSchema
                    if (item.uiFieldInfo.input.variant === 'multiple') {
                        fieldSchema = z
                            .array(
                                z.object({
                                    questionId: z.string().min(1, { message: t('filsRequire') }),
                                    value: z.string().min(1, { message: t('filsRequire') }),
                                    label: z.string().min(1, { message: t('filsRequire') }),
                                })
                            )
                            .min(1, { message: t('filsRequire') })
                    } else if (item.uiFieldInfo.input.variant === 'single') {
                        fieldSchema = z
                            .object({
                                questionId: z
                                    .string()
                                    .min(1, { message: t('filsRequire') })
                                    .optional(),
                                value: z
                                    .string()
                                    .min(1, { message: t('filsRequire') })
                                    .optional(),
                                label: z
                                    .string()
                                    .min(1, { message: t('filsRequire') })
                                    .optional(),
                            })
                            .refine((obj) => Object.keys(obj).length >= 1, {
                                message: t('filsRequire'),
                            })
                    } else if (item.uiFieldInfo.input.variant === 'calendar') {
                        fieldSchema = z.array(z.string()).min(1, { message: t('filsRequire') })
                    } else if (
                        item.uiFieldInfo.input.type === 'text' ||
                        item.uiFieldInfo.input.type === 'numeric' ||
                        item.uiFieldInfo.input.type === 'textarea'
                    ) {
                        if (item.uiFieldInfo.input.required === true) {
                            fieldSchema = z.string().min(1, { message: t('filsRequire') })
                        } else {
                            fieldSchema = z.string().min(0)
                        }
                    }
                    if (item.uiFieldInfo.input.required === false) {
                        acc[item.id] = fieldSchema?.optional()
                    } else {
                        acc[item.id] = fieldSchema
                    }
                }
                return acc
            }, {})
    )

    const defaultValues = {
        ...questions?.reduce((acc: any, item: any) => {
            if (item.uiFieldInfo) {
                if (formData.answeredQuestions && item.uiFieldInfo.input.variant === 'multiple') {
                    acc[item?.id] = formData.answeredQuestions[item.id] || null
                } else if (
                    formData.answeredQuestions &&
                    item.uiFieldInfo.input.variant === 'single'
                ) {
                    acc[item.id] = formData.answeredQuestions[item.id]
                        ? formData.answeredQuestions[item.id]
                        : null
                } else if (
                    formData.answeredQuestions &&
                    item.uiFieldInfo.input.variant === 'calendar'
                ) {
                    acc[item.id] = formData.answeredQuestions[item.id]
                        ? formData.answeredQuestions[item.id]
                        : []
                } else {
                    acc[item.id] =
                        (formData.answeredQuestions && formData.answeredQuestions[item.id]) || ''
                }
            }
            return acc
        }, {}),
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    })
    return form
}
