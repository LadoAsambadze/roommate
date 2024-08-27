import { ToggleGroup, ToggleGroupItem } from '@/src/components/ui/toggle-group'

export default function ApartmentRooms({ field }: any) {
    return (
        <ToggleGroup
            className="justify-start"
            type="single"
            value={field.value}
            onValueChange={(value) => {
                if (value) {
                    field.onChange(value)
                }
            }}
        >
            {Array.from({ length: 10 }, (_, index) => (
                <ToggleGroupItem key={index + 1} value={(index + 1).toString()}>
                    {index + 1}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    )
}
