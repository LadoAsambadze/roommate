'use client'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { cn } from '@/src/utils/cn'
import { useTranslation } from 'react-i18next'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Button } from '../../ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '../../ui/drawer'
import { Calendar } from '../../ui/calendar'
import { useEffect, useState } from 'react'

type RangeDataProps = {
    questionId: string
    dataRange: string[] | string
}

type FilterRangePickerProps = {
    className: string
    questionId: string
    ranges: RangeDataProps[]
    rangeChangeHandler: (questionId: string, dataRange: string[]) => void
}

export const FilterRangePicker = ({
    className,
    questionId,
    ranges,
    rangeChangeHandler,
}: FilterRangePickerProps) => {
    const { t } = useTranslation()

    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    })
    const [formattedDateArray, setFormattedDateArray] = useState<string[] | undefined>([])
    const formatDate = (date: Date | undefined): string | undefined => {
        return date ? format(date, 'yyyy-MM-dd') : undefined
    }

    const updateRangeHandler = () => {
        if (formattedDateArray && formattedDateArray.every((date) => date !== undefined)) {
            rangeChangeHandler(questionId, formattedDateArray as string[])
        } else if (!date) {
            rangeChangeHandler(questionId, [])
        }
    }

    useEffect(() => {
        if (date?.from && date?.to) {
            const formattedData = date ? [formatDate(date.from), formatDate(date.to)] : undefined
            const filteredData =
                formattedData &&
                (formattedData.filter((dateString) => dateString !== undefined) as string[])
            setFormattedDateArray(filteredData)
        } else {
            setFormattedDateArray(undefined)
        }
    }, [date])

    const matchingQuestion = ranges.find((item) => item.questionId === questionId)

    useEffect(() => {
        if (matchingQuestion) {
            console.log(matchingQuestion.dataRange)
            setDate({
                from: new Date(matchingQuestion.dataRange[0]),
                to: new Date(matchingQuestion.dataRange[1]),
            })
        }
    }, [matchingQuestion])

    return (
        <>
            <div className={cn('hidden gap-2 md:grid', className)}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={'outline'}
                            className={cn(
                                'flex h-[48px] w-full justify-start rounded-lg border border-[#828bab] px-3 py-2 text-left font-normal outline-none hover:bg-white md:w-full'
                            )}
                        >
                            <div className="p flex h-[48px] flex-row items-center justify-center text-sm">
                                <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                                {date?.from && date?.to ? (
                                    <>
                                        {format(date?.from, 'LLL dd, yyyy')} -
                                        {format(date?.to, 'LLL dd, yyyy')}
                                    </>
                                ) : (
                                    <span className="text-muted-foreground">{t('chooseDate')}</span>
                                )}
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto p-0"
                        align="start"
                        onBlur={updateRangeHandler}
                    >
                        <Calendar
                            initialFocus
                            numberOfMonths={2}
                            mode="range"
                            pagedNavigation
                            defaultMonth={new Date()}
                            selected={date}
                            onSelect={(newDate) => {
                                setDate(newDate)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <Drawer>
                <DrawerTrigger className="mt-2 w-full md:hidden">
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'flex h-[48px] w-full justify-start rounded-lg border border-[#828bab] px-3  py-2  text-left font-normal outline-none hover:bg-white md:hidden md:w-full'
                        )}
                    >
                        <div className="flex h-[48px] flex-row items-center justify-center text-sm">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                            {date?.from && date?.to ? (
                                <>
                                    {format(date.from, 'LLL dd, yyyy')} -
                                    {format(date.to, 'LLL dd, yyyy')}
                                </>
                            ) : (
                                <span className="text-muted-foreground">{t('chooseDate')}</span>
                            )}
                        </div>
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <Calendar
                        className="flex flex-row justify-center"
                        initialFocus
                        numberOfMonths={2}
                        mode="range"
                        pagedNavigation
                        defaultMonth={new Date()}
                        selected={date}
                        onSelect={(newDate) => {
                            setDate(newDate)
                        }}
                    />
                    <DrawerClose>
                        <Button variant="default" className="w-4/5" onClick={updateRangeHandler}>
                            {t('submit')}
                        </Button>
                    </DrawerClose>
                </DrawerContent>
            </Drawer>
        </>
    )
}
