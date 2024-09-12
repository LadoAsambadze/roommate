import { PropertyDepositObject } from '@/graphql/typesGraphql'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/src/components/ui/shadcnSelect'
import { useTranslation } from 'react-i18next'

type ApartmentStatusProps = {
    field: any
    data?: PropertyDepositObject[] | null
    form: any
}

export default function FullDynamicSelectDeposit({ field, data, form }: ApartmentStatusProps) {
    const { t } = useTranslation()

    const handleSelectChange = (value: string) => {
        field.onChange(value)
    }
    const depositStatus = form.getValues('withDeposit')

    return (
        <Select
            disabled={!depositStatus}
            onValueChange={handleSelectChange}
            defaultValue={field.value}
        >
            <SelectTrigger className="w-full text-start md:w-52 ">
                <SelectValue placeholder="-" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data?.map((item, index) => (
                        <SelectItem
                            className="text-start"
                            key={index}
                            value={
                                item.amount
                                    ? item.amount.toString()
                                    : item.translations && item.translations[0]
                                      ? item.translations[0].id
                                      : 'No description available'
                            }
                        >
                            {item.amount
                                ? item.amount
                                : item.translations && item.translations[0]
                                  ? item.translations[0].description
                                  : 'No description available'}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
