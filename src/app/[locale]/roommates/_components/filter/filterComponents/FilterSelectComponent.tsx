import Select from 'react-select'
import { DropdownIndicator, customStyles } from '@/src/components/shared/select/SelectUI'
import { useTranslation } from 'react-i18next'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AnswerObject } from '@/graphql/typesGraphql'

type Option = { value: string; label: string }
type AnswerIdProps = {
    questionId: string
    answerIds: string[] | string
}
type FilterSelectComponentProps = {
    questionId: string
    answersId?: AnswerObject[] | null
    answers: AnswerIdProps[]
    isMulti?: boolean
    setAnswers: Dispatch<SetStateAction<AnswerIdProps[]>>
}

export default function FilterSelectComponent({
    questionId,
    answersId,
    answers,
    setAnswers,
    isMulti = false,
}: FilterSelectComponentProps) {
    const { t } = useTranslation()
    const [selectedValue, setSelectedValue] = useState<Option | Option[] | null>(null)

    useEffect(() => {
        const matchingQuestion = answers.find((answer) => answer.questionId === questionId)

        if (matchingQuestion) {
            if (Array.isArray(matchingQuestion.answerIds)) {
                const defaultOptions = matchingQuestion.answerIds
                    .map((answerId) => {
                        const matchedAnswer =
                            answersId && answersId.find((answer) => answer.id === answerId)
                        return matchedAnswer
                            ? {
                                  value: matchedAnswer.id,
                                  label: matchedAnswer.translations[0].title,
                              }
                            : null
                    })
                    .filter(Boolean)

                setSelectedValue(
                    isMulti ? (defaultOptions as Option[]) : (defaultOptions[0] as Option)
                )
            } else {
                const matchedAnswer =
                    answersId &&
                    answersId.find((answer) => answer.id === matchingQuestion.answerIds)
                setSelectedValue(
                    matchedAnswer
                        ? {
                              value: matchedAnswer.id,
                              label: matchedAnswer.translations[0].title,
                          }
                        : null
                )
            }
        } else {
            setSelectedValue(null)
        }
    }, [questionId, answers, answersId, isMulti])

    const selectedOptionsHandler = (
        questionId: string,
        selectedOptions: string | string[] | Option | Option[]
    ) => {
        if (Array.isArray(selectedOptions)) {
            if (
                selectedOptions.every((option) => typeof option === 'object' && 'value' in option)
            ) {
                selectChangeHandler(
                    questionId,
                    (selectedOptions as Option[]).map((option) => option.value)
                )
            } else {
                selectChangeHandler(questionId, selectedOptions as string[])
            }
        } else if (
            typeof selectedOptions === 'object' &&
            selectedOptions &&
            'value' in selectedOptions
        ) {
            selectChangeHandler(questionId, selectedOptions.value)
        } else if (typeof selectedOptions === 'string') {
            selectChangeHandler(questionId, selectedOptions)
        }
    }

    const selectChangeHandler = (questionId: string, answerIds: string | string[]) => {
        const existingQuery = answers.find((query) => query.questionId === questionId)
        if (existingQuery) {
            setAnswers((prevQueries) => {
                const updatedQueries = prevQueries.map((query) =>
                    query.questionId === questionId ? { ...query, answerIds } : query
                )
                return updatedQueries
            })
        } else {
            setAnswers((prevQueries) => [...prevQueries, { questionId, answerIds }])
        }
    }

    return (
        <>
            <Select
                styles={customStyles}
                components={{ DropdownIndicator }}
                className="mt-2 w-full cursor-pointer text-sm"
                placeholder={t('select')}
                isMulti={isMulti}
                value={selectedValue}
                options={
                    answersId
                        ? answersId.map((answer) => ({
                              value: answer.id,
                              label: answer.translations[0].title,
                          }))
                        : undefined
                }
                onChange={(selectedOptions: unknown) => {
                    selectedOptionsHandler(
                        questionId,
                        selectedOptions as string | string[] | Option | Option[]
                    )
                }}
            />
        </>
    )
}
