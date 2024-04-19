/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useTranslation } from 'react-i18next'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'

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
    return (
        <>
            <div className={cn(' hidden gap-2 md:grid', className)}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            type="button"
                            id="date"
                            variant={'outline'}
                            className={cn(
                                'flex h-[48px] w-full justify-start rounded-lg border border-[#828bab]  px-3  py-2 text-left font-normal outline-none hover:bg-white md:w-full'
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
                            onSelect={(newDate) => {
                                if (newDate?.from && newDate?.to) {
                                    field.onChange([
                                        format(newDate.from, 'yyyy-MM-dd'),
                                        format(newDate.to, 'yyyy-MM-dd'),
                                    ])
                                    if (id !== undefined) {
                                        updateUseForm({
                                            [id]: [
                                                format(newDate.from, 'yyyy-MM-dd'),
                                                format(newDate.to, 'yyyy-MM-dd'),
                                            ],
                                        })
                                    }
                                }

                                setDate(newDate)
                            }}
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
                            'flex h-[48px] w-full justify-start rounded-lg border border-[#828bab] px-3 py-2  text-left font-normal outline-none hover:bg-white md:hidden md:w-full'
                        )}
                    >
                        <div className="p   flex h-[48px] flex-row items-center justify-center text-sm">
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
                        className="flex flex-row justify-center"
                        initialFocus
                        numberOfMonths={2}
                        mode="range"
                        pagedNavigation
                        defaultMonth={new Date()}
                        selected={date}
                        onSelect={(newDate) => {
                            if (newDate?.from && newDate?.to) {
                                field.onChange([
                                    format(newDate.from, 'yyyy-MM-dd'),
                                    format(newDate.to, 'yyyy-MM-dd'),
                                ])
                                if (id !== undefined) {
                                    updateUseForm({
                                        [id]: [
                                            format(newDate.from, 'yyyy-MM-dd'),
                                            format(newDate.to, 'yyyy-MM-dd'),
                                        ],
                                    })
                                }
                            }

                            setDate(newDate)
                        }}
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
