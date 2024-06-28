import { DropdownIndicator, customStyles } from '@/src/components/shared/select/SelectUI'
import Select from 'react-select'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { FilterRangePicker } from '@/src/components/shared/datePickers/FilterRangePicker'
import { Slider } from '@/src/components/ui/slider'
import { FilterInput, Language, QuestionsWithAnswersFor } from '@/graphql/typesGraphql'
import { getQuestionsWithAnswersQuery } from '@/graphql/query'
import { useQuery } from '@apollo/client'
import { Button } from '@/src/components/ui/button'
import { useParams, usePathname, useRouter } from 'next/navigation'

type RangeDataProps = {
    questionId: string
    dataRange: string[] | string
}
type AnswerIdProps = {
    questionId: string
    answerIds: string[] | string
}
type Option = { value: string }

type FilterComponentProps = {
    transformedParams: FilterInput[]
}
export default function Filter({ transformedParams }: FilterComponentProps) {
    const { t } = useTranslation()
    const params = useParams()
    const router = useRouter()
    const pathname = usePathname()
    const locale = params.locale
    const [key, setKey] = useState(0)
    const [ranges, setRanges] = useState<RangeDataProps[]>([])
    const [answers, setAnswers] = useState<AnswerIdProps[]>([])
    const { loading, error, data } = useQuery(getQuestionsWithAnswersQuery, {
        variables: {
            lang: locale as Language,
            getFor: 'FILTER' as QuestionsWithAnswersFor,
        },
    })

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
        const existingIndex = answers.findIndex((query) => query.questionId === questionId)
        if (existingIndex !== -1) {
            setAnswers((prevQueries) => {
                const updatedQueries = [...prevQueries]
                updatedQueries[existingIndex] = {
                    ...updatedQueries[existingIndex],
                    answerIds: answerIds,
                }
                return updatedQueries
            })
        } else {
            setAnswers((prevQueries) => [
                ...prevQueries,
                { questionId: questionId, answerIds: answerIds },
            ])
        }
    }

    const rangeChangeHandler = (questionId: string, dataRange: string[]) => {
        const existingIndex = ranges.findIndex((query) => query.questionId === questionId)
        if (existingIndex !== -1) {
            setRanges((prevQueries) => {
                const updatedQueries = [...prevQueries]
                updatedQueries[existingIndex] = {
                    ...updatedQueries[existingIndex],
                    dataRange: dataRange,
                }
                return updatedQueries
            })
        } else {
            setRanges((prevQueries) => [
                ...prevQueries,
                { questionId: questionId, dataRange: dataRange },
            ])
        }
    }

    const filterUpdateHandler = () => {
        const params = new URLSearchParams()
        ranges.forEach((query) => {
            if (query.dataRange && query.dataRange.length > 0 && Array.isArray(query.dataRange)) {
                params.set(`range_${query.questionId}`, query.dataRange.join(','))
            } else {
                params.delete(`range_${query.questionId}`)
            }
        })

        answers.forEach((query) => {
            if (query.answerIds && query.answerIds.length > 0) {
                if (Array.isArray(query.answerIds)) {
                    params.set(`answer_${query.questionId}`, query.answerIds.join(','))
                } else {
                    params.set(`answer_${query.questionId}`, query.answerIds)
                }
            }
        })
        router.push(pathname + '?' + params.toString())
    }

    const filterClearHandler = () => {
        setKey((prevKey) => prevKey + 1)
        setRanges([])
        setAnswers([])
        router.push(pathname)
    }

    useEffect(() => {
        transformedParams.forEach((obj) => {
            if (obj.answerIds && obj.questionId) {
                setAnswers([obj as AnswerIdProps])
            } else if (obj.dataRange && obj.questionId) {
                setRanges([obj as RangeDataProps])
            }
        })
    }, [transformedParams])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <>
            <section className="h-full w-full  flex-col gap-6 bg-white p-0  md:flex ">
                <button
                    className=" cursor-pointer text-right hover:text-[#535050] hover:underline"
                    onClick={filterClearHandler}
                >
                    {t('clearFilters')}
                </button>
                {data?.getQuestionsWithAnswers &&
                    [...data?.getQuestionsWithAnswers]
                        .sort((a, b) => {
                            if (a.uiFieldInfo.filterInput.type === 'numeric') return 1
                            if (b.uiFieldInfo.filterInput.type === 'numeric') return -1
                            return 0
                        })
                        .map((item) => (
                            <div key={item.id}>
                                {item.uiFieldInfo.filterInput.type === 'select' && (
                                    <>
                                        <label className="w-full text-sm">
                                            {item.translations && item?.translations[0].title}
                                        </label>
                                        <Select
                                            key={key}
                                            styles={customStyles}
                                            components={{ DropdownIndicator }}
                                            className="mt-2 w-full text-sm"
                                            placeholder={t('select')}
                                            isMulti={
                                                item.uiFieldInfo.filterInput.variant === 'multiple'
                                            }
                                            defaultValue={() => {
                                                const matchingQuestion = answers.find(
                                                    (answer) => answer.questionId === item.id
                                                )

                                                if (
                                                    matchingQuestion &&
                                                    Array.isArray(matchingQuestion.answerIds)
                                                ) {
                                                    const defaultOptions =
                                                        matchingQuestion.answerIds
                                                            .map((answerId) => {
                                                                const matchedAnswer =
                                                                    item.answers &&
                                                                    item.answers.find(
                                                                        (answer) =>
                                                                            answer.id === answerId
                                                                    )
                                                                return matchedAnswer
                                                                    ? {
                                                                          value: matchedAnswer.id,
                                                                          label: matchedAnswer
                                                                              .translations[0]
                                                                              .title,
                                                                      }
                                                                    : null
                                                            })
                                                            .filter(Boolean) // Remove null values

                                                    return defaultOptions
                                                }
                                                return []
                                            }}
                                            options={
                                                item.answers
                                                    ? item.answers.map((answer) => ({
                                                          questionId: item.id,
                                                          value: answer.id,
                                                          label: answer.translations[0].title,
                                                      }))
                                                    : undefined
                                            }
                                            onChange={(selectedOptions: unknown) => {
                                                selectedOptionsHandler(
                                                    item.id,
                                                    selectedOptions as
                                                        | string
                                                        | string[]
                                                        | Option
                                                        | Option[]
                                                )
                                            }}
                                        />
                                    </>
                                )}
                                {item.uiFieldInfo.filterInput.type === 'button' &&
                                    item.uiFieldInfo.filterInput.renderAs === 'range' && (
                                        <>
                                            <label className="w-full text-sm">
                                                {item.translations && item.translations[0]?.title}
                                            </label>
                                            <FilterRangePicker
                                                key={key}
                                                className="mt-2 w-full"
                                                rangeChangeHandler={rangeChangeHandler}
                                                questionId={item.id}
                                                ranges={ranges}
                                            />
                                        </>
                                    )}
                                {item.uiFieldInfo.filterInput.type === 'numeric' &&
                                    item.uiFieldInfo.filterInput.renderAs === 'range' && (
                                        <>
                                            <label className="mb-4 w-full text-sm">
                                                {item.translations && item.translations[0]?.title}
                                            </label>
                                            <Slider
                                                key={key}
                                                questionId={item.id}
                                                rangeChangeHandler={rangeChangeHandler}
                                            />
                                        </>
                                    )}
                            </div>
                        ))}
                <Button variant="default" className="mt-6 " onClick={filterUpdateHandler}>
                    {t('searchBtn')}
                </Button>
            </section>
        </>
    )
}
