import { Label } from '@/src/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group'

import { useTranslation } from 'react-i18next'

export default function StaticDepositRadio({ field }: any) {
    const { t } = useTranslation()
    return (
        <RadioGroup
            className="w-full"
            value={field.value ? 'true' : 'false'}
            onValueChange={(value) => field.onChange(value === 'true')}
        >
            <div className="flex w-full flex-col gap-6 md:gap-20 items-start md:flex-row md:items-center ">
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="false" id="withoutDeposit" />
                    <Label
                        htmlFor="withoutDeposit"
                        className="text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {t('withoutDeposit')}
                    </Label>
                </div>
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="true" id="withDeposit" />
                    <Label
                        htmlFor="withDeposit"
                        className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {t('withDeposit')}
                    </Label>
                </div>
            </div>
        </RadioGroup>
    )
}
