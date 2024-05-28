/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/src/utils/cn'

import { Calendar } from '../../ui/calendar'

import { useTranslation } from 'react-i18next'
import { Button } from '../../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'

export function BirthDatePicker({ field }: any) {
    const [date, setDate] = React.useState<Date>(field.value)
    const { t } = useTranslation()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'flex h-10 w-full justify-start rounded-lg border border-[#828bab] px-3  py-2 text-left font-normal hover:bg-white  focus:outline-[#3dae8c] md:w-full',
                        !date && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className="mb-[1px] mr-2 h-4 w-4 " />
                    {date ? (
                        format(date, 'LLL dd, y')
                    ) : (
                        <span className="text-muted-foreground ">{t('chooseDate')}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    classNames={{
                        caption_label: 'hidden',
                        nav_button_previous: 'hidden',
                        nav_button_next: 'hidden',
                    }}
                    captionLayout="dropdown-buttons" // Renders dropdowns for years and months
                    fromYear={1960}
                    toYear={2005}
                    mode="single"
                    selected={date}
                    onSelect={(newDate: any) => {
                        const formattedDate = format(newDate, 'yyyy-MM-dd')
                        field.onChange(formattedDate.toString())
                        setDate(newDate)
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
