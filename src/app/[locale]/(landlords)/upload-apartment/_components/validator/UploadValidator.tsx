import { GetPropertiesDataProps } from '@/graphql/query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function UploadValidator({ data }: { data?: GetPropertiesDataProps }) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    const apartmentTypeValues = data?.getPropertyTypes?.map((item) => item.id) || []
    const propertyAmenityValues = data?.getPropertyAmenities?.map((item) => item.id) || []
    const propertyHeatingValues = data?.getHousingHeatingTypes?.map((item) => item.id) || []

    const FormSchema = z.object({
        apartmentType: z.enum(apartmentTypeValues as [string, ...string[]]),
        date: z.string().regex(dateRegex, { message: 'Invalid date format. Use YYYY-MM-DD' }),
        minRentMonth: z.coerce.number().positive(),
        apartmentRooms: z.coerce.number().int().positive(),
        bathroomsInProperty: z.coerce.number().int().positive(),
        bathroomsInBedroom: z.coerce.number().int().positive(),
        floorAmount: z.coerce.number().int().positive(),
        flatFloor: z.coerce.number().int().positive(),
        status: z.string().min(1, { message: 'Status is required' }),
        condition: z.string().min(1, { message: 'Condition is required' }),
        address: z.string().min(1, { message: 'Address is required' }),
        cadastralCode: z.string().min(1, { message: 'Cadastral code is required' }),
        showCadastral: z.boolean().optional(),
        propertyAmenities: z.array(z.enum(propertyAmenityValues as [string, ...string[]])).min(1),
        propertyHeating: z.array(z.enum(propertyHeatingValues as [string, ...string[]])).min(1),
    })

    type FormSchemaType = z.infer<typeof FormSchema>

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            apartmentType: undefined,
            date: undefined,
            minRentMonth: undefined,
            apartmentRooms: undefined,
            bathroomsInProperty: undefined,
            bathroomsInBedroom: undefined,
            floorAmount: undefined,
            flatFloor: undefined,
            status: undefined,
            condition: undefined,
            address: undefined,
            cadastralCode: undefined,
            showCadastral: false,
            propertyAmenities: [],
            propertyHeating: [],
        },
    })

    return form
}
