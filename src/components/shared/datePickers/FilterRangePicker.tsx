/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/src/utils/cn'
import { useTranslation } from 'react-i18next'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Button } from '../../ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '../../ui/drawer'
import { Calendar } from '../../ui/calendar'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    setFilterDataBefore?: any
    id?: string
    filterDataBefore?: any // Assuming setFilterData can be of any type
}

export const FilterRangePicker: React.FC<Props> = ({
    className,
    setFilterDataBefore,
    filterDataBefore,
    id,
}: Props) => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    })
    const { t } = useTranslation()
    return (
        <>
            <div className={cn(' hidden gap-2 md:grid', className)}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={'outline'}
                            className={cn(
                                'flex h-[48px] w-full justify-start rounded-lg border border-[#828bab] px-3   py-2 text-left font-normal outline-none hover:bg-white md:w-full'
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
                                    <span className="text-muted-foreground">{t('chooseDate')}</span>
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
                                    const filtered = {
                                        questionId: id,
                                        dataRange: [
                                            format(newDate.from, 'yyyy-MM-dd'),
                                            format(newDate.to, 'yyyy-MM-dd'),
                                        ],
                                    }

                                    // Create a new array based on the current filterData
                                    const newFilterData = [...filterDataBefore]

                                    // Find the index of the item with the same questionId
                                    const index = newFilterData.findIndex(
                                        (item) => item.questionId === id
                                    )

                                    if (index !== -1) {
                                        // Replace the existing item
                                        newFilterData[index] = filtered
                                    } else {
                                        // Add the new item
                                        newFilterData.push(filtered)
                                    }

                                    // Update the state
                                    setFilterDataBefore(newFilterData)
                                }
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
                            if (newDate?.from && newDate?.to) {
                                const filtered = {
                                    questionId: id,
                                    dataRange: [
                                        format(newDate.from, 'yyyy-MM-dd'),
                                        format(newDate.to, 'yyyy-MM-dd'),
                                    ],
                                }

                                // Create a new array based on the current filterData
                                const newFilterData = [...filterDataBefore]

                                // Find the index of the item with the same questionId
                                const index = newFilterData.findIndex(
                                    (item) => item.questionId === id
                                )

                                if (index !== -1) {
                                    // Replace the existing item
                                    newFilterData[index] = filtered
                                } else {
                                    // Add the new item
                                    newFilterData.push(filtered)
                                }

                                // Update the state
                                setFilterDataBefore(newFilterData)
                            }
                            setDate(newDate)
                        }}
                    />
                    <DrawerClose>
                        <Button variant="default" className="w-4/5">
                            Submit
                        </Button>
                    </DrawerClose>
                </DrawerContent>
            </Drawer>
        </>
    )
}
