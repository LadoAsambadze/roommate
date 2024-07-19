import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { PopoverContent } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { Popover, PopoverTrigger } from '@/src/components/ui/popover'
import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/src/components/ui/drawer'
import CalendarButton from './CalendarButton'
import { Button } from '@/src/components/ui/button'
import 'react-calendar/dist/Calendar.css'
import './styles.css'

type ValuePiece = Date | null
type DateValue = ValuePiece | [ValuePiece, ValuePiece]

interface FieldProps {
    value: DateValue
    onChange: (value: string | [string, string]) => void
}

interface DatePickerProps {
    field: FieldProps
    rangeType: boolean
    id: string | null
    updateUseForm: (data: any) => Promise<void>
}

export function DatePicker({ field, rangeType, id, updateUseForm }: DatePickerProps) {
    const { t } = useTranslation()

    const [date, setDate] = useState<DateValue>(field.value)
    const [locale, setLocale] = useState<any>(null)

    const params = useParams()
    const userLocale = params.locale

    const dateSelectHandler = (newDate: DateValue) => {
        if (newDate instanceof Date) {
            const formattedDate = format(newDate, 'yyyy-MM-dd')
            field.onChange(formattedDate)
            setDate(newDate)
        } else if (
            Array.isArray(newDate) &&
            newDate[0] instanceof Date &&
            newDate[1] instanceof Date &&
            typeof id === 'string'
        ) {
            const formattedDateFirst = format(newDate[0], 'yyyy-MM-dd')
            const formattedDateSecond = format(newDate[1], 'yyyy-MM-dd')
            field.onChange([formattedDateFirst, formattedDateSecond])
            setDate(newDate)
            updateUseForm({
                [id]: [formattedDateFirst, formattedDateSecond],
            })
        }
    }

    useEffect(() => {
        async function loadLocale() {
            let localeModule
            switch (userLocale) {
                case 'ka':
                    localeModule = await import('date-fns/locale/ka')
                    break
                default:
                    localeModule = await import('date-fns/locale/en-US')
                    break
            }
            setLocale(localeModule.default)
        }
        loadLocale()
    }, [userLocale])

    const formatDate = (date: Date, formatStr: string) => {
        return format(date, formatStr, { locale })
    }

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="hidden md:block">
                        <CalendarButton date={date} locale={locale} />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="z-50 w-auto p-0">
                    <Calendar
                        selectRange={rangeType}
                        onChange={dateSelectHandler}
                        value={date}
                        formatYear={(_, date) => formatDate(date, 'LLLL yyyy')}
                        formatMonthYear={(_, date) => formatDate(date, 'LLLL yyyy')}
                        formatDay={(_, date) => formatDate(date, 'dd')}
                        formatLongDate={(_, date) => formatDate(date, 'PPPP')}
                        formatMonth={(_, date) => formatDate(date, 'LLLL')}
                        formatShortWeekday={(_, date) => formatDate(date, 'EEE')}
                        formatWeekday={(_, date) => formatDate(date, 'EEEE')}
                    />
                </PopoverContent>
            </Popover>
            <Drawer>
                <DrawerTrigger className="mt-2 block w-full md:hidden">
                    <div>
                        <CalendarButton date={date} locale={locale} />
                    </div>
                </DrawerTrigger>
                <DrawerContent>
                    <Calendar
                        onChange={dateSelectHandler}
                        selectRange={rangeType}
                        value={date}
                        formatYear={(_, date) => formatDate(date, 'LLLL yyyy')}
                        formatMonthYear={(_, date) => formatDate(date, 'LLLL yyyy')}
                        formatDay={(_, date) => formatDate(date, 'dd')}
                        formatLongDate={(_, date) => formatDate(date, 'PPPP')}
                        formatMonth={(_, date) => formatDate(date, 'LLLL')}
                        formatShortWeekday={(_, date) => formatDate(date, 'EEE')}
                        formatWeekday={(_, date) => formatDate(date, 'EEEE')}
                    />
                    <DrawerClose>
                        <Button variant="default" type="button" className="mb-10 w-4/5">
                            {t('save')}
                        </Button>
                    </DrawerClose>
                </DrawerContent>
            </Drawer>
        </>
    )
}
