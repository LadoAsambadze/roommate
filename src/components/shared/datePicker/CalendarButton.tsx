import { Button } from '@/src/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/src/utils/cn'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

type ValuePiece = Date | null
type DateValue = ValuePiece | [ValuePiece, ValuePiece]
type CalendarButtonProps = {
    date?: DateValue
    locale: any
}

const CalendarButton = ({ date, locale }: CalendarButtonProps) => {
    const { t } = useTranslation()
    const formatDate = (date: Date, formatStr: string) => {
        return format(date, formatStr, { locale })
    }

    return (
        <Button
            type="button"
            variant={'outline'}
            className={cn(
                'flex h-[38px] w-full justify-start rounded-lg border border-[#828bab] px-3 py-2 text-left font-normal hover:bg-white focus:outline-[#3dae8c] md:w-full',
                !date && 'text-muted-foreground'
            )}
        >
            <CalendarIcon className="mb-[1px] mr-2 h-4 w-4 " />
            {Array.isArray(date) ? (
                date[0] ? (
                    date[1] ? (
                        <>
                            {format(date[0], 'LLL dd, y')} -{format(date[1], 'LLL dd, y')}
                        </>
                    ) : (
                        format(date[0], 'LLL dd, y')
                    )
                ) : (
                    <span className="text-placeholderColor">{t('chooseDate')}</span>
                )
            ) : date ? (
                formatDate(date, 'LLL dd, y')
            ) : (
                <span className="text-muted-foreground ">{t('chooseDate')}</span>
            )}
        </Button>
    )
}

export default CalendarButton
