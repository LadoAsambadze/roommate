import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { PopoverContent } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import './styles.css'
import { Popover, PopoverTrigger } from '@/src/components/ui/popover'
import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/src/components/ui/drawer'
import CalendarButton from './CalendarButton' // Adjust the import path as needed
import { Button } from '@/src/components/ui/button'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export function Test({ field }: any) {
    const { t } = useTranslation()
    const [value, onChange] = useState<Value>(new Date())
    const [date, setDate] = useState<Date | null>(null)
    const [locale, setLocale] = useState<any>(null)
    const params = useParams()
    const userLocale = params.locale

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
                        onChange={onChange}
                        value={value}
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
                        onChange={onChange}
                        value={value}
                        formatYear={(_, date) => formatDate(date, 'LLLL yyyy')}
                        formatMonthYear={(_, date) => formatDate(date, 'LLLL yyyy')}
                        formatDay={(_, date) => formatDate(date, 'dd')}
                        formatLongDate={(_, date) => formatDate(date, 'PPPP')}
                        formatMonth={(_, date) => formatDate(date, 'LLLL')}
                        formatShortWeekday={(_, date) => formatDate(date, 'EEE')}
                        formatWeekday={(_, date) => formatDate(date, 'EEEE')}
                    />
                    <DrawerClose>
                        <Button variant="default" type="button" className="w-4/5">
                            {t('save')}
                        </Button>
                    </DrawerClose>
                </DrawerContent>
            </Drawer>
        </>
    )
}
