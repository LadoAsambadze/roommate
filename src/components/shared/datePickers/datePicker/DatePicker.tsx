import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { CalendarIcon } from 'lucide-react'
import { PopoverContent } from '@radix-ui/react-popover'
import { cn } from '@/src/utils/cn'
import { format } from 'date-fns'
import './styles.css'
import { Button } from '@/src/components/ui/button'
import { Popover, PopoverTrigger } from '@/src/components/ui/popover'
import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'

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
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'flex h-[38px] w-full justify-start rounded-lg border border-[#828bab] px-3 py-2 text-left font-normal hover:bg-white focus:outline-[#3dae8c] md:w-full',
                        !date && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className="mb-[1px] mr-2 h-4 w-4 " />
                    {date ? (
                        formatDate(date, 'LLL dd, y')
                    ) : (
                        <span className="text-muted-foreground ">{t('chooseDate')}</span>
                    )}
                </Button>
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
    )
}
