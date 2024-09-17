import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/src/components/ui/shadcnSelect'

export default function StaticSelectNumeric({ field }: any) {
    const handleSelectChange = (value: string) => {
        field.onChange(parseFloat(value))
    }
    return (
        <Select onValueChange={handleSelectChange} defaultValue={field.value}>
            <SelectTrigger className="w-full md:w-[120px]">
                <SelectValue placeholder="-" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Array.from({ length: 10 }, (_, index) => (
                        <SelectItem value={index.toString()} key={index}>
                            {index}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
