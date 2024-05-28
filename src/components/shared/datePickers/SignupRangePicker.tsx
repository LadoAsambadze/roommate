/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { cn } from '@/src/utils/cn'
import { Button } from '@/src/components/ui/button'
import { Calendar } from '@/src/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover'
import { useTranslation } from 'react-i18next'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/src/components/ui/drawer'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    setFilterData?: any
    updateUseForm?: any
    field?: any
    id?: string
    filterData?: any
}

export const SignupRangePicker: React.FC<Props> = ({
    className,
    updateUseForm,
    field,
    id,
}: Props) => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: field.value[0],
        to: field.value[1],
    })
    const { t } = useTranslation()

    const handleDateChange = (newDate: DateRange | undefined) => {
        setDate(newDate)

        if (newDate?.from && newDate?.to) {
            const formattedFrom = format(newDate.from, 'yyyy-MM-dd')
            const formattedTo = format(newDate.to, 'yyyy-MM-dd')
            field.onChange([formattedFrom, formattedTo])
            if (id !== undefined) {
                updateUseForm({
                    [id]: [formattedFrom, formattedTo],
                })
            }
        } else {
            field.onChange([])
            if (id !== undefined) {
                updateUseForm({
                    [id]: [],
                })
            } else {
                updateUseForm(undefined)
            }
        }
    }

    return (
        <>
            <div className={cn('hidden gap-2 md:grid', className)}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            type="button"
                            id="date"
                            variant={'outline'}
                            className={cn(
                                'flex h-[38px] w-full justify-start rounded-lg border border-[#828bab] px-3 py-2 text-left font-normal hover:bg-white md:w-full'
                            )}
                        >
                            <div className="p flex h-[48px] flex-row items-center justify-center text-sm">
                                <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, 'LLL dd, y')} -{' '}
                                            {format(date.to, 'LLL dd, y')}
                                        </>
                                    ) : (
                                        format(date.from, 'LLL dd, y')
                                    )
                                ) : (
                                    <span>{t('chooseDate')}</span>
                                )}
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            numberOfMonths={2}
                            mode="range"
                            pagedNavigation
                            defaultMonth={new Date()}
                            selected={date}
                            onSelect={handleDateChange}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <Drawer>
                <DrawerTrigger className="mt-2 w-full">
                    <Button
                        type="button"
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'flex h-[48px] w-full justify-start rounded-lg border border-[#828bab] px-3 py-2 text-left font-normal outline-none hover:bg-white md:hidden md:w-full'
                        )}
                    >
                        <div className="p flex h-[48px] flex-row items-center justify-center text-sm">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, 'LLL dd, y')} -{' '}
                                        {format(date.to, 'LLL dd, y')}
                                    </>
                                ) : (
                                    format(date.from, 'LLL dd, y')
                                )
                            ) : (
                                <span>{t('chooseDate')}</span>
                            )}
                        </div>
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <Calendar
                        className="flex flex-row justify-center "
                        initialFocus
                        numberOfMonths={2}
                        mode="range"
                        pagedNavigation
                        defaultMonth={new Date()}
                        selected={date}
                        onSelect={handleDateChange}
                    />
                    <DrawerClose>
                        <Button variant="default" type="button" className="w-4/5">
                            Submit
                        </Button>
                    </DrawerClose>
                </DrawerContent>
            </Drawer>
        </>
    )
}
