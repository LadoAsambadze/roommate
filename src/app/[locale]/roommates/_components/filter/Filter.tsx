/* eslint-disable @typescript-eslint/no-explicit-any */
import { DropdownIndicator, customStyles } from '@/src/components/shared/select/SelectUI'
import Select from 'react-select'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { FilterRangePicker } from '@/src/components/shared/datePickers/FilterRangePicker'
import { Slider } from '@/src/components/ui/slider'
import { Language, QuestionsWithAnswersFor } from '@/graphql/typesGraphql'
import { getQuestionsWithAnswersQuery } from '@/graphql/query'
import { useQuery } from '@apollo/client'
import { Button } from '@/src/components/ui/button'
import { useParams } from 'next/navigation'

export default function Filter() {
    const { t } = useTranslation()
    const params = useParams()
    const locale = params.locale
    const [key, setKey] = useState(0)
    console.log(setKey)
    const [filterDataBefore, setFilterDataBefore] = useState([])
    const { loading, error, data } = useQuery(getQuestionsWithAnswersQuery, {
        variables: {
            lang: locale as Language,
            getFor: 'FILTER' as QuestionsWithAnswersFor,
        },
    })
    const QuestionsWithAnswers = data?.getQuestionsWithAnswers

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <>
            <section className="h-full w-full  flex-col gap-6 bg-white p-0  md:flex ">
                <button className=" cursor-pointer text-right hover:text-[#535050] hover:underline">
                    {t('clearFilters')}
                </button>
                {QuestionsWithAnswers &&
                    [...QuestionsWithAnswers]
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
                                            // options={item.answers && item.answers.map((answer) => ({
                                            //     questionId: item.id,
                                            //     value: answer.id,
                                            //     label: answer.translations[0].title,
                                            // }))}
                                            // onChange={(value: any) => {
                                            //     setFilterDataBefore((prevFilterData) => {
                                            //         const newFilterData = [...prevFilterData]
                                            //         const existingIndex = newFilterData.findIndex(
                                            //             (item) =>
                                            //                 item.questionId === value.questionId
                                            //         )
                                            //         if (
                                            //             item.uiFieldInfo.filterInput.variant ===
                                            //             'multiple'
                                            //         ) {
                                            //             if (existingIndex !== -1) {
                                            //                 const existingAnswerIndex =
                                            //                     newFilterData[
                                            //                         existingIndex
                                            //                     ].answerIds.findIndex(
                                            //                         (id) => id === value.value
                                            //                     )
                                            //                 if (existingAnswerIndex !== -1) {
                                            //                     newFilterData[
                                            //                         existingIndex
                                            //                     ].answerIds.splice(
                                            //                         existingAnswerIndex,
                                            //                         1
                                            //                     )
                                            //                 } else {
                                            //                     newFilterData[
                                            //                         existingIndex
                                            //                     ].answerIds.push(value.value)
                                            //                 }
                                            //             } else {
                                            //                 newFilterData.push({
                                            //                     questionId: value.questionId,
                                            //                     answerIds: [value.value],
                                            //                 })
                                            //             }
                                            //         } else {
                                            //             if (existingIndex !== -1) {
                                            //                 newFilterData[existingIndex].answerIds =
                                            //                     [value.value]
                                            //             } else {
                                            //                 newFilterData.push({
                                            //                     questionId: value.questionId,
                                            //                     answerIds: [value.value],
                                            //                 })
                                            //             }
                                            //         }
                                            //         return newFilterData
                                            //     })
                                            // }}
                                        />
                                    </>
                                )}
                                {item.uiFieldInfo.filterInput.type === 'button' && (
                                    <>
                                        <label className="w-full text-sm">
                                            {item.translations && item.translations[0]?.title}
                                        </label>
                                        <FilterRangePicker
                                            key={key}
                                            filterDataBefore={filterDataBefore}
                                            setFilterDataBefore={setFilterDataBefore}
                                            id={item.id}
                                            className="mt-2 w-full"
                                        />
                                    </>
                                )}
                                {item.uiFieldInfo.filterInput.type === 'numeric' && (
                                    <>
                                        <label className="mb-4 w-full text-sm">
                                            {item.translations && item.translations[0]?.title}
                                        </label>
                                        <Slider
                                            key={key}
                                            id={item.id}
                                            filterDataBefore={filterDataBefore}
                                            setFilterDataBefore={setFilterDataBefore}
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                <Button variant="default" className="mt-6 ">
                    {t('searchBtn')}
                </Button>
            </section>
        </>
    )
}
