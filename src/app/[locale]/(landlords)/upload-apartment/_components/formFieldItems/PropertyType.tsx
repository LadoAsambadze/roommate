import { PropertyTypeObject } from '@/graphql/typesGraphql'
import { ToggleGroup, ToggleGroupItem } from '@/src/components/ui/toggle-group'
import { ControllerRenderProps } from 'react-hook-form'

interface PropertyTypeProps {
    field: ControllerRenderProps<any, 'apartmentType'> // Update based on actual field type
    propertyTypes?: PropertyTypeObject[] | null
}

export default function PropertyType({ field, propertyTypes }: PropertyTypeProps) {
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
            {propertyTypes?.map((item, index) => (
                <ToggleGroupItem key={index} value={item.id}>
                    {item.translations[0]?.name}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    )
}
