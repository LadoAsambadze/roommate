'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/src/utils/cn'
import { Calendar } from '../../ui/calendar'
import { useTranslation } from 'react-i18next'
import { Button } from '../../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { useState } from 'react'

interface Field {
    value: Date | undefined
    onChange: (date: string | null) => void
}

type DatePickerProps = {
    field?: Field
}

export function DatePicker({ field }: DatePickerProps) {
    const [date, setDate] = useState<Date | undefined>(field?.value)

    const { t } = useTranslation()

    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate)
        if (field) {
            const formattedDate = newDate ? format(newDate, 'yyyy-MM-dd') : null
            field.onChange(formattedDate)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'flex h-[38px] w-full justify-start rounded-lg border border-[#828bab] px-3 py-2 text-left font-normal hover:bg-white focus:outline-[#3dae8c] md:w-full',
                        !date && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className="mb-[1px] mr-2 h-4 w-4" />
                    {date ? (
                        format(date, 'LLL dd, y')
                    ) : (
                        <span className="text-muted-foreground">{t('chooseDate')}</span>
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
                    captionLayout="dropdown-buttons"
                    fromYear={1960}
                    toYear={2009}
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => handleDateChange(newDate)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
