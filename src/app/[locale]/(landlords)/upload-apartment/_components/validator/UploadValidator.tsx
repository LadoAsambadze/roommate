import { GetPropertiesDataProps } from '@/graphql/query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function UploadValidator({ data }: { data?: GetPropertiesDataProps }) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    const apartmentTypeValues = data?.getPropertyTypes?.map((item) => item.id) || []
    // Ensure apartmentTypeValues is a non-empty array
    const apartmentTypeEnum =
        apartmentTypeValues.length > 0
            ? ([apartmentTypeValues[0], ...apartmentTypeValues.slice(1)] as [string, ...string[]])
            : ([] as unknown as [string, ...string[]])

    const FormSchema = z.object({
        apartmentType: z
            .enum(apartmentTypeEnum)
            .nullish()
            .refine((val) => val !== null && val !== undefined),

        date: z.string().min(1).regex(dateRegex),
        minRentMonth: z.string().min(1),
        apartmentRooms: z.string().min(1),
        bathroomsInProperty: z.string().min(1),
        bathroomsInBedroom: z.string().min(1),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            apartmentType: undefined,
            date: undefined,
            minRentMonth: undefined,
            apartmentRooms: undefined,
            bathroomsInProperty: undefined,
            bathroomsInBedroom: undefined,
        },
    })

    return form
}
