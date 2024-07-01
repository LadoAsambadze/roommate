'use client'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { cn } from '@/src/utils/cn'
import { useTranslation } from 'react-i18next'
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/src/components/ui/drawer'
import { Calendar } from '@/src/components/ui/calendar'
import { useEffect, useState } from 'react'
import { Button } from '@/src/components/ui/button'

type RangeDataProps = {
    questionId: string
    dataRange: string[] | string
}

type FilterRangePickerProps = {
    className: string
    questionId: string
    ranges: RangeDataProps[]
    rangeChangeHandler: (questionId: string, dataRange: string[]) => void
    isOpen: boolean
}

export const FilterRangePicker = ({
    className,
    questionId,
    ranges,
    isOpen,
    rangeChangeHandler,
}: FilterRangePickerProps) => {
    const { t } = useTranslation()
    const [formattedDateArray, setFormattedDateArray] = useState<string[] | undefined>([])
    const matchingQuestion = ranges.find((item) => item.questionId === questionId)
    const [date, setDate] = useState<DateRange | undefined>({ from: undefined, to: undefined })

    const formatDate = (date: Date | undefined): string | undefined => {
        return date ? format(date, 'yyyy-MM-dd') : undefined
    }
    const updateRangeHandler = () => {
        rangeChangeHandler(questionId, formattedDateArray || [])
    }

    useEffect(() => {
        if (date?.from && date?.to) {
            const formattedData = [formatDate(date.from), formatDate(date.to)]
            setFormattedDateArray(formattedData.filter(Boolean) as string[])
        } else {
            setFormattedDateArray(undefined)
        }
    }, [date])

    useEffect(() => {
        if (matchingQuestion && matchingQuestion?.dataRange?.length > 0)
            setDate({
                from: new Date(matchingQuestion.dataRange[0]),
                to: new Date(matchingQuestion.dataRange[1]),
            })
    }, [isOpen, matchingQuestion])

    return (
        <>
            <div className={cn('hidden gap-2 md:grid', className)}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={'outline'}
                            className={cn(
                                'flex h-[38px] w-full justify-start rounded-lg border border-[#828bab] px-3  py-2 text-left font-normal hover:bg-white  focus:outline-[#3dae8c] md:w-full',
                                !date && 'text-muted-foreground'
                            )}
                        >
                            <div className="p flex h-[48px] flex-row items-center justify-center text-sm">
                                <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                                {formattedDateArray && date?.from && date?.to ? (
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
                            'flex h-[38px] w-full justify-start rounded-lg border border-[#828bab] px-3  py-2 text-left font-normal hover:bg-white  focus:outline-[#3dae8c] md:w-full',
                            !date && 'text-muted-foreground'
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