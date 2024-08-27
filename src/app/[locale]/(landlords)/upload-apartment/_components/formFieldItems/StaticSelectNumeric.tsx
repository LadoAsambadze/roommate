import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/src/components/ui/shadcnSelect'
import { useTranslation } from 'react-i18next'

export default function StaticSelectNumeric({ field }: any) {
    const { t } = useTranslation()

    const handleSelectChange = (value: string) => {
        field.onChange(value)
        console.log(value)
    }
    return (
        <Select onValueChange={handleSelectChange} defaultValue={field.value}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="-" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Array.from({ length: 10 }, (_, index) => (
                        <SelectItem value={index.toString()}>{index}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
