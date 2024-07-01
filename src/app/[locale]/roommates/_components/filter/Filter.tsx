import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { FilterRangePicker } from '@/src/components/shared/datePickers/FilterRangePicker'
import { Slider } from '@/src/components/ui/slider'
import { FilterInput, Language, QuestionsWithAnswersFor } from '@/graphql/typesGraphql'
import { getQuestionsWithAnswersQuery } from '@/graphql/query'
import { useQuery } from '@apollo/client'
import { Button } from '@/src/components/ui/button'
import { useParams, usePathname, useRouter } from 'next/navigation'
import FilterSelectComponent from '@/src/components/shared/datePickers/FilterSelectComponent'

type RangeDataProps = {
    questionId: string
    dataRange: string[] | string
}
type AnswerIdProps = {
    questionId: string
    answerIds: string[] | string
}

type FilterComponentProps = {
    transformedParams: FilterInput[]
    isOpen: boolean
}

export default function Filter({ transformedParams, isOpen }: FilterComponentProps) {
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
        } else if (existingIndex !== -1 && dataRange.length === 0) {
            setRanges((prevQueries) => prevQueries.filter((item) => item.questionId !== questionId))
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
                setAnswers((prevAnswers) => {
                    const index = prevAnswers.findIndex(
                        (answer) => answer.questionId === obj.questionId
                    )
                    if (index !== -1) {
                        return prevAnswers.map((answer) =>
                            answer.questionId === obj.questionId ? (obj as AnswerIdProps) : answer
                        )
                    } else {
                        return [...prevAnswers, obj as AnswerIdProps]
                    }
                })
            } else if (obj.dataRange && obj.questionId) {
                setRanges((prevRanges) => {
                    const index = prevRanges.findIndex(
                        (range) => range.questionId === obj.questionId
                    )
                    if (index !== -1) {
                        return prevRanges.map((range) =>
                            range.questionId === obj.questionId ? (obj as RangeDataProps) : range
                        )
                    } else {
                        return [...prevRanges, obj as RangeDataProps]
                    }
                })
            }
        })
    }, [transformedParams, isOpen])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <>
            <section className="h-full w-full  flex-col gap-6 bg-white p-0  md:flex ">
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

                                        <FilterSelectComponent
                                            key={key}
                                            answers={answers}
                                            questionId={item.id}
                                            answersId={item.answers}
                                            setAnswers={setAnswers}
                                            isMulti={
                                                item.uiFieldInfo.filterInput.type === 'multiple'
                                            }
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
                                                isOpen={isOpen}
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
                                            <label className=" w-full text-sm">
                                                {item.translations && item.translations[0]?.title}
                                            </label>
                                            <Slider
                                                isOpen={isOpen}
                                                key={key}
                                                questionId={item.id}
                                                ranges={ranges}
                                                rangeChangeHandler={rangeChangeHandler}
                                            />
                                        </>
                                    )}
                            </div>
                        ))}
                <Button variant="filter" className="mt-6 w-full " onClick={filterUpdateHandler}>
                    {t('searchBtn')}
                </Button>
                <Button
                    variant="filter"
                    className=" w-full bg-neutral-400 hover:bg-neutral-500  "
                    onClick={filterClearHandler}
                >
                    {t('clearFilters')}
                </Button>
            </section>
        </>
    )
}
